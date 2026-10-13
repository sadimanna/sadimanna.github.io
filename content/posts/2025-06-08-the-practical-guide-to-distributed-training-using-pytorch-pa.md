---
title: "The Practical Guide to Distributed Training using PyTorch — Part 1: On a Single Node using torch.mul"
date: 2025-06-08
categories: ["Distributed Training", "PyTorch"]
permalink: /blog/the-practical-guide-to-distributed-training-using-pytorch-pa/
canonical_url: https://medium.com/@mannasiladittya/the-complete-guide-to-distributeddataparallel-ddp-training-in-pytorch-14545cd21f9c
tags: [deep-learning, pytorch, distributed-training, gpu]
---
---

![](/images/blog/the-practical-guide-to-distributed-training-using-pytorch-pa/img1.jpeg)

Training deep learning models efficiently often requires leveraging multiple GPUs. PyTorch’s DistributedDataParallel (DDP) is the go-to solution for scalable multi-GPU training, but it comes with its own set of challenges.

In this in-depth guide, we’ll cover:  
✅ Debugging the “Grad strides” warning  
✅ When and why to use *`SyncBatchNorm`*  
✅ Handling *`DistributedSampler`* vs. *`shuffle`* in *`DataLoader`*  
✅ The role of *`init\_process\_group`* and how to configure it  
✅ Why *`destroy\_process\_group`* is crucial  
✅ Setting CUDA\_VISIBLE\_DEVICES correctly  
✅ A full DDP training loop with best practices

Let’s dive in!

---

### 1. “Grad strides do not match bucket view strides” — Causes & Fixes


```text
Warning: Grad strides do not match bucket view strides. This may indicate grad was not created according to the gradient layout contract, or that the param’s strides changed since DDP was constructed. This is not an error, but may impair performance.
grad.sizes() = [1024, 1024, 1, 1], strides() = [1024, 1, 1024, 1024]
bucket_view.sizes() = [1024, 1024, 1, 1], strides() = [1024, 1, 1, 1] (function operator())
```


### What’s Happening?

When using DDP, PyTorch groups gradients into buckets for efficient communication (all-reduce operations). If the memory layout (strides) of gradients doesn’t match the bucket’s expected layout, PyTorch performs an unnecessary memory copy, slowing down training.

### Why Does This Happen?

* Non-contiguous tensors (e.g., after slicing, reshaping, permute, transpose, view or custom operations).
* Custom parameter initialization that disrupts memory alignment.
* Model architecture quirks (e.g., some RNNs or attention layers).

### How to Fix It?

1. Force contiguous tensors before DDP:


```text
tensor = tensor.contiguous()  # Ensures memory alignment
```


2. Adjust bucket size (default: 25MB) to reduce fragmentation:


```text
model = DDP(model, bucket_cap_mb=10)  # Smaller bucket size
```


3. Check model parameters for unintended non-contiguity:


```text
for param in model.parameters(): 
    if not param.is_contiguous(): 
        param.data = param.data.contiguous()
```


---

### 2. Why Use `SyncBatchNorm` in DDP?

### The Problem with Regular BatchNorm

* In DDP, each GPU computes local batch statistics (mean & variance).
* This leads to inconsistent normalization across GPUs, harming convergence.

### Solution: `SyncBatchNorm`

* Synchronizes batch statistics across all GPUs.
* Ensures consistent normalization, especially useful when:  
  - Batch size per GPU is small.  
  - Training vision models (CNNs) where BatchNorm is critical.

### How to Use It?


```text
model = torch.nn.SyncBatchNorm.convert_sync_batchnorm(model) 
model = DDP(model, device_ids=[rank])
```


*A* [*discussion*](https://discuss.pytorch.org/t/distributeddataparallel-and-convert-sync-batchnorm/161070) *on PyTorch forums regarding the usage of convert\_sync\_batchnorm before or after wrapping the model in DDP*

Note:

* Adds communication overhead (slows training slightly).
* Only needed if BatchNorm is crucial for your model.

---

### 3. `DistributedSampler` vs. `shuffle` in `DataLoader` — The Right Way

### The Problem

* DDP requires non-overlapping data splits across GPUs.
* Using *`shuffle=True`* in *`DataLoader`* breaks this partitioning.

### The Solution

* Always use *`DistributedSampler`* and disable *`shuffle`* in *`DataLoader`*:


```text
sampler = DistributedSampler(dataset, shuffle=True) 
# Controls shuffling globally 
dataloader = DataLoader(dataset, batch_size=bs, sampler=sampler, shuffle=False)
```


The ‘*shuffle*’ argument in ‘*DistributedSampler’* is set to True by default

> **Why?**

* *`DistributedSampler`* ensures each GPU gets a unique subset.
* Setting *`shuffle=True`* in *`DataLoader`* would corrupt the data distribution.

---

### 4. `init\_process\_group` — The Heart of DDP Setup

### Why Do We Need It?

* Initializes inter-process communication (IPC) for DDP.
* Defines the backend (*`nccl`* for GPU, *`gloo`* for CPU).

### Key Parameters


```text
torch.distributed.init_process_group(backend="nccl",         # "nccl" for GPU), "gloo" (CPU/multi-node) 
                                    init_method="env://",   # Uses `MASTER_ADDR` and `MASTER_PORT` 
                                    world_size=world_size,  # Total # of processes (GPUs × nodes)
```


### When to Call It?

* After setting *`CUDA\_VISIBLE\_DEVICES`* (if restricting GPUs).
* Before wrapping the model with DDP.

### How to do the DDP setup?


```python
from torch.distributed import init_process_group
def ddp_setup(rank: int, world_size: int):
    """
    Args:
    rank: Unique identifier of each process
    world_size: Total number of processes
    """
    os.environ[“MASTER_ADDR”] = “localhost”
    os.environ[“MASTER_PORT”] = “12355”
    torch.cuda.set_device(rank) # Setting device for the process
    init_process_group(backend="nccl", rank=rank, world_size=world_size)
```


---

### 5. Why `destroy\_process\_group` is Essential

### The Problem

* Without cleanup, processes may hang or leave ports open.
* Can cause resource leaks and port conflicts in subsequent runs.

### The Solution

Always call:


```text
torch.distributed.destroy_process_group()
```


Best Practice:

* Use a *`try-finally`* block to ensure cleanup:


```text
try: 
    train() 
finally: 
    destroy_process_group()
```


### Bonus: Setting `CUDA\_VISIBLE\_DEVICES` Correctly

To control which devices are used in DDP:


```python
import os 
os.environ["CUDA_VISIBLE_DEVICES"] = "0,1,2,3"  # Only use GPUs 0-3
```


If we want to use only two GPUs, then we can set


```python
import os
os.environ["CUDA_VISIBLE_DEVICES"] = "2,3"  # Only use GPUs 2 and 3
```


In that case, ‘*cuda:2*’ will get assigned ***rank 0*** and ‘*cuda:3*’ will get assigned ***rank 1***.

#### Why?

* Prevents PyTorch from seeing all GPUs on a node.
* Ensures each process gets a unique GPU (critical for DDP).

---

### Full DDP Training Loop Example

Here’s a complete, production-ready DDP training script:


```python
import os 
import torch 
import torch.distributed as dist 
import torch.multiprocessing as mp 
from torch.nn.parallel import DistributedDataParallel as DDP 
from torch.utils.data import DataLoader, DistributedSampler 
from torchvision.datasets import CIFAR10 
from torchvision.transforms import ToTensor 
from torchvision.models import resnet18  

def ddp_setup(rank, world_size): 
    os.environ['MASTER_ADDR'] = 'localhost' 
    os.environ['MASTER_PORT'] = '12355' 
    torch.cuda.set_device(rank)
    dist.init_process_group("nccl", rank=rank, world_size=world_size)

def cleanup(): 
    dist.destroy_process_group()  

def train(rank, world_size): 
    # Setup DDP
    ddp_setup(rank, world_size) 

    # Model + DDP 
    model = resnet18().to(rank)
    model = torch.nn.SyncBatchNorm.convert_sync_batchnorm(model)
    model = DDP(model, device_ids=[rank]) 

    # Dataset + DistributedSampler 
    dataset = CIFAR10(root='./data', train=True, transform=ToTensor(), download=True) 
    sampler = DistributedSampler(dataset, num_replicas=world_size, rank=rank, shuffle=True) 
    dataloader = DataLoader(dataset, batch_size=64, sampler=sampler, shuffle=False) 
    
    # Optimizer 
    optimizer = torch.optim.Adam(model.parameters(), lr=1e-3) 
    criterion = torch.nn.CrossEntropyLoss() 

    # Training loop 
    for epoch in range(10):  
        sampler.set_epoch(epoch)  # Ensures shuffling each epoch 
        for batch_idx, (data, target) in enumerate(dataloader): 
            data, target = data.to(rank), target.to(rank) 
            optimizer.zero_grad() 
            output = model(data) 
            loss = criterion(output, target) 
            loss.backward() 
            optimizer.step() 
            if batch_idx % 100 == 0 and rank == 0:  # Only print from master 
                print(f"Epoch {epoch}, Batch {batch_idx}, Loss: {loss.item():.4f}") 
     cleanup() 

if __name__ == "__main__": 
    os.environ['CUDA_VISIBLE_DEVICES'] = "0,1,2,3"
    world_size = torch.cuda.device_count()

    # If you want to use only a few particular GPU devices
    # os.environ['CUDA_VISIBLE_DEVICES'] = "2,3"
    # world_size = 2

    mp.spawn(train, args=(world_size,), nprocs=world_size, join=True)
```


---

### Key Takeaways from the Code

✔ *`setup()`* initializes DDP with *`init\_process\_group`*.  
✔ *`DistributedSampler`* ensures correct data partitioning.  
✔ *`sampler.set\_epoch(epoch)`* reshuffles data each epoch.  
✔ *`cleanup()`* prevents resource leaks.

---

### Another Bonus: What does `join=True` do in torch.multiprocessing.spawn?

In *`torch.multiprocessing.spawn()`*, *`join=True`* means:

1. The main process will block (wait) until all spawned training processes complete.
2. If any process crashes, it ensures proper cleanup before continuing.

### Why It’s Important

1. Prevents Zombie Processes

* Without *`join=True`*, the main process might exit while child processes are running, leaving them orphaned.
* This can cause GPU memory leaks or hanging processes.

2. Ensures Clean Shutdown

* If one GPU process fails (e.g., OOM error), *`join=True`* ensures all other processes are terminated gracefully via *`destroy\_process\_group()`*.

3. Safeguards Against Resource Leaks

* PyTorch’s NCCL backend requires coordinated process shutdown. *`join=True`* guarantees this.

### What Happens If You Set `join=False`?

* The main process would continue executing while training runs in the background.
* This is rarely what you want — your script might exit prematurely or cause undefined behaviour.

### Practical Example: Why `join=True` Matters

#### Imagine this scenario without *`join=True`*:

1. Your training script starts 4 GPU processes.
2. The main Python process exits immediately (since it’s not waiting).
3. The 4 GPU processes keep running, but:

* Logs/outputs may not appear.
* Ctrl+C won’t kill them (zombie processes).
* You might need *`kill -9`* to stop them.

#### With *`join=True`*, the main process waits, and:

* You see all the logs.
* Ctrl+C propagates to all processes.
* Cleanup (like *`destroy\_process\_group()`*) runs reliably.

---

### Final Thoughts

DDP is powerful but nuanced. By following these best practices — gradient bucketing, *`SyncBatchNorm`*, proper *`DataLoader`* setup, and process management — you can scale PyTorch training efficiently across multiple GPUs.

Got questions? Drop them below! 🚀

---
*Originally published on [Medium](https://medium.com/@mannasiladittya/the-complete-guide-to-distributeddataparallel-ddp-training-in-pytorch-14545cd21f9c).*

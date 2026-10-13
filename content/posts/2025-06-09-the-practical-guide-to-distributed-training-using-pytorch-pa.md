---
title: "The Practical Guide to Distributed Training using PyTorch — Part 2: On a Single Node using Torchrun"
date: 2025-06-09
permalink: /blog/the-practical-guide-to-distributed-training-using-pytorch-pa/
canonical_url: https://medium.com/@mannasiladittya/the-practical-guide-to-distributed-training-using-pytorch-part-2-on-a-single-node-using-torchrun-9e794baa0410
tags: [deep-learning, pytorch, distributed-training, torchrun, gpu]
---
---

![](/images/blog/the-practical-guide-to-distributed-training-using-pytorch-pa/img1.jpeg)

### Introduction

Training deep learning models can be slow, especially when dealing with large datasets or complex architectures. Distributed training helps speed up the process by splitting the workload across multiple GPUs. PyTorch provides powerful tools like *`torchrun`* (replacing *`torch.distributed.launch`*) to make this easier.

In this guide, we’ll cover:  
✅ What is distributed training?  
✅ Why use *`torchrun`*?  
✅ Step-by-step code breakdown  
✅ Key command-line arguments explained  
✅ How data is split across GPUs  
✅ Common pitfalls & fixes

---

### 1. What is Distributed Training?

Instead of training on a single GPU, distributed training splits the work across multiple GPUs (even on a single machine). There are two main approaches:

1. **Data Parallelism** — Each GPU gets a subset of data, processes it, and the gradients are averaged.
2. **Model Parallelism** — Different parts of the model run on different GPUs (used for huge models).

Here, we focus on Data Parallelism using PyTorch’s *`DistributedDataParallel`* (DDP).

---

### 2. Why Use `torchrun`?

Previously, *`torch.distributed.launch`* was used, but *`torchrun`* (introduced in PyTorch 1.9+) is now the recommended way because:  
✔ Handles worker failures better  
✔ Automatically sets *`RANK`* and *`WORLD\_SIZE`*  
✔ Supports elastic training (resuming failed workers)

---

### 3. Step-by-Step Code Implementation

### Step 1: Basic Training Script (`train.py`)

Let’s write a simple distributed training script.


```python
import os 
import torch 
import torch.distributed as dist 
import torch.nn as nn 
import torch.optim as optim 
from torch.nn.parallel import DistributedDataParallel as DDP 
from torch.utils.data import DataLoader, DistributedSampler 
from torchvision.datasets import FakeData 
from torchvision.transforms import ToTensor  
os.environ["CUDA_VISIBLE_DEVICES"=','.join(map(str, [0,1,2,3]))
```


---

### Step 2: Running with `torchrun`

Now, launch the script on 2 GPUs (on a single machine):


```text
torchrun \ 
    --nproc_per_node=2 \  # Use 2 GPUs 
    --nnodes=1 \          # Single machine 
    --rdzv_id=123 \       # Unique job ID 
    --rdzv_backend=c10d \ # PyTorch's backend 
    --rdzv_endpoint=localhost:29500 \  # Master node 
    train.py
```


---

### 4. Key Arguments Explained


```text
— nproc_per_node     Number of GPUs per machine
— nnodes             Total machines (1 for single-node)
— rdzv_id            Unique job identifier
— rdzv_backend       Coordination backend (`c10d` is default)
— rdzv_endpoint      `Master node address`
```


---

### 5. How Data is Split Across GPUs

* *`DistributedSampler`* ensures each GPU gets a unique subset of data.
* Without it, all GPUs would process the same data, resulting in wasted resources.
* *`sampler.set\_epoch(epoch)`* reshuffles data each epoch for better randomness.
* No need to pass *`num\_replicas`*/*`rank`* — PyTorch reads them from the environment.

---

### 6. Common Pitfalls & Fixes

### ❌ Error: “NCCL error” or “CUDA not available”

Fix:

* Ensure *`backend=”nccl”`* (for NVIDIA GPUs).
* Check *`CUDA\_VISIBLE\_DEVICES`* matches available GPUs.

### ❌ Error: “Address already in use”

Fix:

* Change *` — rdzv\_endpoint`* port (e.g., *`localhost:29501`*).

### ❌ Slow Training

Fix:

* Increase *`batch\_size`* per GPU.
* Use *`pin\_memory=True`* in *`DataLoader`* for faster transfers.

### ❌ Warning: “GPU memory not freed”

Fix:

* Cause: Missing *`cleanup()`*.
* Fix: Always call *`dist.destroy\_process\_group()`* at the end.

---

### Advantages of using torchrun:

1. Automatic Environment Variables

*`****torchrun****`* sets these automatically:

* *`RANK`*: Global process ID (0 to *`WORLD\_SIZE-1`*)
* *`LOCAL\_RANK`*: GPU index on the current node (0 to *`nproc\_per\_node-1`*)
* *`WORLD\_SIZE`*: Total number of processes

*`dist.init\_process\_group(backend=”nccl”)`* automatically reads:

* *`RANK`* from *`os.environ[“RANK”]`*
* *`WORLD\_SIZE`* from *`os.environ[“WORLD\_SIZE”]`*
* Connection details from *`MASTER\_ADDR:MASTER\_PORT`*

2. Simplified *`setup()`* Function

* No longer requires arguments
* Uses *`LOCAL\_RANK`* for GPU assignment (more intuitive than global *`RANK`*)

3. Removed Redundant Parameter Passing

* *`DistributedSampler`* now reads directly from *`os.environ`*

### 7. Conclusion

✅ *`torchrun`* simplifies distributed training compared to older methods.  
✅ DDP + DistributedSampler ensures efficient data-parallel training.  
✅ Always set *`sampler.set\_epoch()`* for proper shuffling.

By relying on *`torchrun`*’s environment management, you:   
✅ Eliminate boilerplate  
✅ Reduce bugs  
✅ Ensure compatibility with PyTorch’s best practices

Now you can scale your PyTorch training across multiple GPUs with just a few extra lines of code! 🚀

---

### Next Steps

* Try multi-node training (across multiple machines) in Part 3.

Happy distributed training! 🎉

---
*Originally published on [Medium](https://medium.com/@mannasiladittya/the-practical-guide-to-distributed-training-using-pytorch-part-2-on-a-single-node-using-torchrun-9e794baa0410).*

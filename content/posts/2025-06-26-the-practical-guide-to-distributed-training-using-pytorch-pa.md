---
title: "The Practical Guide to Distributed Training using PyTorch — Part 4: On Multiple Nodes using SLURM"
date: 2025-06-26
permalink: /blog/the-practical-guide-to-distributed-training-using-pytorch-pa/
canonical_url: https://medium.com/@mannasiladittya/the-practical-guide-to-distributed-training-using-pytorch-part-4-on-multiple-nodes-using-slurm-83cf306a3373
tags: [deep-learning, pytorch, distributed-training, slurm, hpc]
---
---

![](/images/blog/the-practical-guide-to-distributed-training-using-pytorch-pa/img1.jpeg)

In this article, we’ll explore how to perform distributed training on multiple nodes using SLURM (Simple Linux Utility for Resource Management), a popular job scheduler in high-performance computing (HPC) environments. We’ll provide a full-scale example of setting up and running a distributed training job with SLURM, along with common errors and their solutions.

### Table of Contents

1. Introduction to SLURM
2. Full-Scale Example Without Torchrun

* 2.1. Writing the Training Script
* 2.2. Creating the SLURM Job Script
* 2.3. Running the Job

3. Full-Scale Example With Torchrun

* 3.1. Writing the Training Script
* 3.2. Creating the SLURM Job Script
* 3.3. Running the Job

4. Caveats and Best Practices

5. Conclusion

### 1. Introduction to SLURM

SLURM is widely used in HPC clusters to manage and schedule jobs across multiple nodes. When combined with PyTorch’s distributed training tools (e.g., *`torch.distributed`*), SLURM provides an efficient way to scale deep learning workloads across GPUs and nodes. However, setting up distributed training with SLURM can introduce unique challenges due to the complexity of resource management and inter-node communication.

### 2. Full-Scale Example Without Torchrun

### 2.1. Writing the Training Script

Below is a complete PyTorch training script that supports distributed training using *`torch.distributed`* and *`DistributedDataParallel`* (DDP).


```python
import os 
import torch 
import torch.distributed as dist 
import torch.nn as nn 
import torch.optim as optim 
from torch.nn.parallel import DistributedDataParallel as DDP 
from torch.utils.data import DataLoader, DistributedSampler 
from torchvision import datasets, transforms 

def setup(rank, world_size): 
  """Initialize the process group for distributed training. """
  dist.init_process_group(backend="nccl", init_method="env://", rank=rank, world_size=world_size) 

def cleanup(): 
  """ Destroy the process group after training is complete. """ 
  dist.destroy_process_group() 

class ToyModel(nn.Module): 
  """ A simple linear model for demonstration purposes. """
  def __init__(self): super(ToyModel, self).__init__() 
    self.net = nn.Linear(784, 10) 

  def forward(self, x): 
    return self.net(x) 


def train(rank, world_size, args): 
  """ Train the model using DistributedDataParallel. """

  # Step 1: Initialize the process group 
  setup(rank, world_size) 

  # Step 2: Create the model and move it to the appropriate device 
  device = torch.device(f"cuda:{rank % torch.cuda.device_count()}") 
  model = ToyModel().to(device) 
  ddp_model = DDP(model, device_ids=[rank % torch.cuda.device_count()]) 

  # Step 3: Define loss function and optimizer 
  loss_fn = nn.CrossEntropyLoss() 
  optimizer = optim.SGD(ddp_model.parameters(), lr=0.001) 

  # Step 4: Prepare dataset and dataloader 
  transform = transforms.Compose([transforms.ToTensor(), transforms.Normalize((0.5,), (0.5,))]) 
  train_dataset = datasets.MNIST(root=args.data_dir, train=True, transform=transform, download=True) 
  sampler = DistributedSampler(train_dataset, num_replicas=world_size, rank=rank) 
  train_loader = DataLoader(train_dataset, batch_size=args.batch_size, sampler=sampler) 
  
  # Step 5: Training loop 
  for epoch in range(args.epochs): 
    sampler.set_epoch(epoch) 
    for data, labels in train_loader: 
      data, labels = data.to(device), labels.to(device) 
      optimizer.zero_grad() 
      outputs = ddp_model(data.view(data.size(0), -1)) 
      loss = loss_fn(outputs, labels) 
      loss.backward() 
      optimizer.step() 
    if rank == 0: 
      print(f”Epoch {epoch}, Loss: {loss.item()}”) 

  # Step 6: Clean up the process group 
  cleanup() 

if __name__ == "__main__": 
  import argparse 
  parser = argparse.ArgumentParser(description="Distributed Training with PyTorch and SLURM") 
  parser.add_argument("--data_dir", type=str, default="./data", help=”Directory for storing data”) 
  parser.add_argument("--batch_size", type=int, default=64, help="Batch size for training") 
  parser.add_argument("--epochs", type=int, default=10, help="Number of epochs") 

  args = parser.parse_args() # Retrieve rank and world size from environment variables 
  rank = int(os.environ[“SLURM_PROCID”]) 
  world_size = int(os.environ[“SLURM_NTASKS”]) 

  # Start the training process 
  train(rank, world_size, args)
```


### 2.2. Creating the SLURM Job Script

Here’s an example SLURM job script (*`submit\_job.sh`*) that allocates resources, sets up the environment, and launches the distributed training job:


```text
#!/bin/bash 
#SBATCH --job-name=pytorch_distributed #SBATCH — nodes=2 
#SBATCH --ntasks-per-node=4 
#SBATCH --gres=gpu:4 
#SBATCH --time=01:00:00 
#SBATCH --output=output_%j.log 
#SBATCH --error=error_%j.log 

# Load necessary modules 
module load cuda/11.8 
module load python/3.9 

# Set environment variables 
export MASTER_ADDR=$(scontrol show hostname $SLURM_NODELIST | head -n 1) 
export MASTER_PORT=12345 
export WORLD_SIZE=$SLURM_NTASKS 
export RANK=$SLURM_PROCID 

# Activate Python environment (if using one) 
source /path/to/venv/bin/activate 

# Install dependencies (if not pre-installed) 
pip install torch torchvision torchaudio 

# Run the training script 
srun python train.py --data_dir ./data --batch_size 64 --epochs 10
```


### 2.3. Running the Job

To submit the job to the SLURM scheduler, use the following command:


```text
sbatch submit_job.sh
```


### Full-Scale Example With Torchrun

### 3.1. Writing the Training Script

Below is a complete PyTorch training script that supports distributed training using *`torch.distributed`* and *`DistributedDataParallel`* (DDP). This script will be executed by *`torchrun`*.


```python
import os 
import torch 
import torch.distributed as dist 
import torch.nn as nn 
import torch.optim as optim 
from torch.nn.parallel import DistributedDataParallel as DDP 
from torch.utils.data import DataLoader, DistributedSampler 
from torchvision import datasets, transforms 

def setup(): 
  """Initialize the process group for distributed training. """
  dist.init_process_group(backend=”nccl”, init_method=”env://”) 

def cleanup(): 
  """Destroy the process group after training is complete. """
  dist.destroy_process_group() 

class ToyModel(nn.Module): 
  """A simple linear model for demonstration purposes. """
  def __init__(self): 
    super(ToyModel, self).__init__() 
    self.net = nn.Linear(784, 10) 

  def forward(self, x): 
    return self.net(x) 

  def train(args): 
    """Train the model using DistributedDataParallel. """
    # Step 1: Retrieve rank and world size from environment variables 
    rank = int(os.environ[“RANK”]) 
    world_size = int(os.environ[“WORLD_SIZE”]) 
    # Step 2: Initialize the process group 
    setup() 
    # Step 3: Create the model and move it to the appropriate device 
    device = torch.device(f"cuda:{rank % torch.cuda.device_count()}") 
    model = ToyModel().to(device) 
    ddp_model = DDP(model, device_ids=[rank % torch.cuda.device_count()]) 
    # Step 4: Define loss function and optimizer 
    loss_fn = nn.CrossEntropyLoss() 
    optimizer = optim.SGD(ddp_model.parameters(), lr=0.001) 
    # Step 5: Prepare dataset and dataloader 
    transform = transforms.Compose([transforms.ToTensor(), transforms.Normalize((0.5,), (0.5,))]) 
    train_dataset = datasets.MNIST(root=args.data_dir, train=True, transform=transform, download=True) 
    sampler = DistributedSampler(train_dataset, num_replicas=world_size, rank=rank) 
    train_loader = DataLoader(train_dataset, batch_size=args.batch_size, sampler=sampler) 
    # Step 6: Training loop 
    for epoch in range(args.epochs): 
      sampler.set_epoch(epoch) 
      for data, labels in train_loader: 
        data, labels = data.to(device), labels.to(device) 
        optimizer.zero_grad() 
        outputs = ddp_model(data.view(data.size(0), -1)) 
        loss = loss_fn(outputs, labels) 
        loss.backward() 
        optimizer.step() 
      if rank == 0: 
        print(f"Epoch {epoch}, Loss: {loss.item()}") 
    # Step 7: Clean up the process group 
    cleanup() 

if __name__ == “__main__”: 
  import argparse 
  parser = argparse.ArgumentParser(description="Distributed Training with PyTorch and SLURM") 
  parser.add_argument("--data_dir", type=str, default="./data", help="Directory for storing data") 
  parser.add_argument("--batch_size", type=int, default=64, help="Batch size for training") 
  parser.add_argument("--epochs", type=int, default=10, help="Number of epochs") 
  args = parser.parse_args() 
  # Start the training process 
  train(args)
```


### 3.2. Creating the SLURM Job Script with `torchrun`

Here’s an example SLURM job script (*`submit\_job.sh`*) that allocates resources, sets up the environment, and launches the distributed training job using *`torchrun`*.


```text
#!/bin/bash 
#SBATCH --job-name=pytorch_distributed 
#SBATCH --nodes=2 
#SBATCH --ntasks-per-node=4 
#SBATCH --gres=gpu:4 
#SBATCH --time=01:00:00 
#SBATCH --output=output_%j.log 
#SBATCH --error=error_%j.log 
# Load necessary modules 
module load cuda/11.8 
module load python/3.9 
# Set environment variables 
export MASTER_ADDR=$(scontrol show hostname $SLURM_NODELIST | head -n 1) 
export MASTER_PORT=12345 
# Activate Python environment (if using one) 
source /path/to/venv/bin/activate 
# Install dependencies (if not pre-installed) 
pip install torch torchvision torchaudio 
# Run the training script with torchrun 
srun torchrun \
      --nnodes=2 \ 
      --nproc_per_node=4 \
      --rdzv_id=$SLURM_JOB_ID \
      --rdzv_backend=c10d \
      --rdzv_endpoint=$MASTER_ADDR:$MASTER_PORT \ 
      train.py --data_dir ./data --batch_size 64 --epochs 10
```


### 3.3. Running the Job

To submit the job to the SLURM scheduler, use the following command:


```text
sbatch submit_job.sh
```


#### Key Steps:

1. Job Allocation: SLURM allocates 2 nodes with 4 GPUs each (*` — nodes=2`*, `*— ntasks-per-node=4`*).
2. Environment Setup: The *`MASTER\_ADDR`* and *`MASTER\_PORT`* are set dynamically based on the allocated nodes.
3. Process Launching: *`srun`* launches the training script on all allocated GPUs, with each process assigned a unique *`RANK`*.
4. Process Launching: *`srun`* launches *`torchrun`*, which automatically assigns ranks and initializes the process group for distributed training.

### 4. Caveats and Best Practices

### 4.1. Environment Consistency

* Use shared file systems or containers (e.g., Docker or Singularity) to ensure consistent environments across nodes.

### 4.2. Network Latency

* Optimize NCCL settings for better performance:


```text
export NCCL_SOCKET_IFNAME=ib0 
export NCCL_IB_DISABLE=0
```


### 4.3. Checkpointing

Save model weights periodically to handle failures:


```text
torch.save(model.state_dict(), "checkpoint.pth")
```


### 4.4. Resource Contention

Use ` — exclusive` to isolate your job from other users’ jobs:


```text
#SBATCH --exclusive
```


### 4.5. Debugging Distributed Jobs

Use SLURM’s logging features to capture output from all nodes:


```text
#SBATCH --output=output_%j.log 
#SBATCH --error=error_%j.log
```


### 5. Conclusion

This full-scale example demonstrates how to set up and run distributed training on multiple nodes using SLURM with and without `torchrun`. By combining SLURM’s resource management capabilities with `torchrun`’s simplicity, you can efficiently scale your deep learning workloads across multiple GPUs and nodes. If you encounter issues, consult the official [PyTorch documentation]<https://pytorch.org/docs/stable/distributed.html>

Happy training!

---
*Originally published on [Medium](https://medium.com/@mannasiladittya/the-practical-guide-to-distributed-training-using-pytorch-part-4-on-multiple-nodes-using-slurm-83cf306a3373).*

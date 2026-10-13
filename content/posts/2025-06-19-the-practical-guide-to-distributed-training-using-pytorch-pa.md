---
title: "The Practical Guide to Distributed Training using PyTorch — Part 3: On Multiple Nodes using…"
date: 2025-06-19
categories: ["Distributed Training", "PyTorch"]
permalink: /blog/the-practical-guide-to-distributed-training-using-pytorch-pa/
canonical_url: https://medium.com/@mannasiladittya/the-practical-guide-to-distributed-training-using-pytorch-part-3-on-multiple-nodes-using-c07b6dcf4001
tags: [deep-learning, pytorch, distributed-training, multi-node]
---
---

![](/images/blog/the-practical-guide-to-distributed-training-using-pytorch-pa/img1.jpeg)

Distributed training is a critical technique for scaling machine learning models across multiple GPUs and nodes. In this article, we’ll focus on how to perform distributed training using PyTorch on multiple nodes with the help of *`torchrun`*. We’ll cover every step in detail, explain why each step is necessary, and discuss common errors users may encounter along with their solutions.

> Check out the previous articles in this series (if you need to)  
> **Part 1**

[**The Practical Guide to Distributed Training using PyTorch — Part 1: On a Single Node using…**  
*On a Single Node using torch.multi-processing*medium.com](https://medium.com/the-owl/the-complete-guide-to-distributeddataparallel-ddp-training-in-pytorch-14545cd21f9c "https://medium.com/the-owl/the-complete-guide-to-distributeddataparallel-ddp-training-in-pytorch-14545cd21f9c")

> Part 2

[**The Practical Guide to Distributed Training using PyTorch — Part 2: On a Single Node using Torchrun**  
*On a Single Node using torchrun*medium.com](https://medium.com/the-owl/the-practical-guide-to-distributed-training-using-pytorch-part-2-on-a-single-node-using-torchrun-9e794baa0410 "https://medium.com/the-owl/the-practical-guide-to-distributed-training-using-pytorch-part-2-on-a-single-node-using-torchrun-9e794baa0410")

---

### Table of Contents

1. Introduction to Distributed Training
2. Setting Up Your Environment

* 2.1. Hardware and Network Requirements
* 2.2. Software Dependencies

3. Understanding torchrun

4. Step-by-Step Guide to Distributed Training

* 4.1. Writing the Training Script
* 4.2. Configuring the Cluster
* 4.3. Launching the Training Job with *`torchrun`*

5. Common Errors and Solutions

6. Conclusion

---

### Introduction to Distributed Training

Training deep learning models on large datasets can be computationally expensive and time-consuming. To address this, distributed training splits the workload across multiple GPUs or even multiple machines (nodes). This approach reduces training time significantly and allows you to train larger models that would otherwise not fit into the memory of a single GPU.

In this article, we’ll focus on data parallelism, where the dataset is split across multiple devices, and each device computes gradients independently. These gradients are then synchronized across devices to update the model parameters.

PyTorch provides several tools for distributed training, including *`torch.distributed`* and *`torchrun`*. The latter simplifies the process of launching distributed jobs across multiple nodes.

---

### Setting Up Your Environment

Before diving into distributed training, ensure your environment is properly configured.

### 2.1. Hardware and Network Requirements

* Multiple GPUs: Each node should have at least one GPU. Ideally, use GPUs with high bandwidth (e.g., NVIDIA A100).
* High-Speed Network: Use a low-latency, high-bandwidth network (e.g., InfiniBand or 10GbE) to minimize communication overhead between nodes.
* Shared File System: Ensure all nodes can access the same file system for storing datasets, checkpoints, and logs.

### 2.2. Software Dependencies

* PyTorch: Install the latest version of PyTorch with CUDA support:


```bash
pip install torch torchvision torchaudio
```


* NCCL: Install NVIDIA Collective Communications Library (NCCL) for efficient GPU-to-GPU communication.
* SSH Access: Ensure passwordless SSH is set up between nodes for seamless communication.

---

### Understanding `torchrun`

*`torchrun`* is a utility provided by PyTorch to simplify the process of launching distributed training jobs. It handles tasks like assigning ranks to processes, setting up the master address, and managing worker processes.

Key features of *`torchrun`*:

* Automatically assigns ranks and world sizes.
* Supports both single-node and multi-node setups.
* Handles failures gracefully by restarting failed processes.

---

### Step-by-Step Guide to Distributed Training

### 4.1. Writing the Training Script

Start by writing a training script that supports distributed training. Below is an example:


```python
import os 
import torch 
import torch.distributed as dist 
import torch.nn as nn
```


#### Why Is This Necessary?

* Process Group Initialization: The *`dist.init\_process\_group`* function initializes the communication backend (in this case, NCCL) and sets up the distributed environment.
* DistributedDataParallel (DDP): Wrapping the model with *`DDP`* ensures that each GPU trains on its subset of data while synchronizing gradients across GPUs.
* Master Process Logging: Only the master process (rank 0) prints logs to avoid redundant output.

---

### 4.2. Configuring the Cluster

To run the script on multiple nodes, you need to configure the cluster:

1. Assign IP Addresses: Choose one node as the master and note its IP address.
2. Set Environment Variables:

* *`MASTER\_ADDR`*: IP address of the master node.
* *`MASTER\_PORT`*: Port for communication (default is 29500).

For example, on the master node:


```text
export MASTER_ADDR='192.168.0.1' 
export MASTER_PORT=29500
```


On the worker node:


```text
export MASTER_ADDR='192.168.0.1' 
export MASTER_PORT=29500
```


---

### 4.3. Launching the Training Job with `torchrun`

Use *`torchrun`* to launch the training job.

**On the Master Node:**


```text
torchrun \
--nnodes=2 \
--node_rank=0
--nproc_per_node=4 \
--rdzv_id=12345 \
--rdzv_backend=c10d \
--rdzv_endpoint=$MASTER_ADDR:$MASTER_PORT \
train.py
```


**On the Worker Node:**


```text
torchrun \
--nnodes=2 \
--node_rank=1
--nproc_per_node=2 \
--rdzv_id=12345 \
--rdzv_backend=c10d \
--rdzv_endpoint=$MASTER_ADDR:$MASTER_PORT \
train.py
```


Parameters Explained:

* `--nnodes`: Number of nodes in the cluster.
* `— node_rank`: Unique identifier for the current node (0 for the master node, 1 for the worker node, etc.).
* `— nproc_per_node`: Number of processes per node (usually equal to the number of GPUs per node).
* `— rdzv_id`: Unique rendezvous ID for synchronization.
* `— rdzv_backend`: Backend for rendezvous (e.g., *`c10d`*).
* `— rdzv_endpoint`: Master node’s IP and port.

#### How `torchrun` Works:

* *`torchrun`* automatically assigns a unique *`RANK`* to each process and calculates the *`WORLD\_SIZE`* based on the total number of processes (*`nnodes \* nproc\_per\_node`*).
* Each process retrieves its *`RANK`* and *`WORLD\_SIZE`* from the environment variables (*`os.environ[“RANK”]`* and *`os.environ[“WORLD\_SIZE”]`*).

### Handling Nodes with Different Numbers of GPUs

In distributed training, it’s common for nodes to have different numbers of GPUs. This is known as heterogeneous GPU setups. *`torchrun`* supports such configurations by allowing each node to specify its own *` — nproc\_per\_node`* value, which corresponds to the number of GPUs available on that node.

#### How It Works:

1. **Node-Specific Configuration**: Each node runs its own *`torchrun`* command with a unique *` — nproc\_per\_node`* value based on the number of GPUs it has. For example:

* Master node (4 GPUs): *` — nproc\_per\_node=4`*
* Worker node (2 GPUs): *` — nproc\_per\_node=2`*

2. **Global Process Group**: Despite the varying number of GPUs, *`torchrun`* automatically assigns a global rank (*`RANK`*) to each process across all nodes. The total number of processes (*`WORLD\_SIZE`*) is calculated as the sum of all *` — nproc\_per\_node`* values.

3. **Load Balancing**: PyTorch’s *`DistributedDataParallel`* (DDP) ensures that the workload is distributed evenly across all processes, regardless of the number of GPUs per node. Each process trains on its own GPU and synchronizes gradients with others.

---

### Common Errors and Solutions

### Error 1: `NCCL\_ERROR: unhandled cuda error`

Cause: Mismatched CUDA versions or NCCL library issues.

Solution: Ensure all nodes use the same CUDA and NCCL versions. Reinstall NCCL if necessary.

---

### Error 2: `RuntimeError: Address already in use`

Cause: Another process is using the specified *`MASTER\_PORT`*.

Solution: Change the *`MASTER\_PORT`* to an unused value.

---

### Error 3: `ConnectionRefusedError: [Errno 111] Connection refused`

Cause: Incorrect *`MASTER\_ADDR`* or firewall blocking the port.

Solution: Verify the master node’s IP and ensure the port is open.

---

### Error 4: `TimeoutError: Timed out initializing process group`

Cause: Slow network or unreachable nodes.

Solution: Check network connectivity and increase the timeout using *`init\_method`*.

---

### Conclusion

Distributed training on multiple nodes using PyTorch and *`torchrun`* is a powerful way to scale your machine learning workflows. By following the steps outlined in this guide, you can efficiently distribute your training workload across multiple GPUs and nodes. Be mindful of potential errors and their solutions to ensure a smooth training process.

Happy training!

---
*Originally published on [Medium](https://medium.com/@mannasiladittya/the-practical-guide-to-distributed-training-using-pytorch-part-3-on-multiple-nodes-using-c07b6dcf4001).*

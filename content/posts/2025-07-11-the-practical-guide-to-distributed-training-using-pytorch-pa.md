---
title: "The Practical Guide to Distributed Training using PyTorch — Part 5: Distributing Everything using…"
date: 2025-07-11
categories: ["Distributed Training", "Deep Learning"]
permalink: /blog/the-practical-guide-to-distributed-training-using-pytorch-pa/
canonical_url: https://medium.com/@mannasiladittya/the-practical-guide-to-distributed-training-using-pytorch-part-5-distributing-everything-using-a6a0b8e83bb9
tags: [deep-learning, pytorch, distributed-training, fsdp, deepspeed]
---
---

![](/images/blog/the-practical-guide-to-distributed-training-using-pytorch-pa/img1.jpeg)

Welcome back to our series on distributed training with PyTorch! In previous installments, we explored the fundamentals, culminating in a deep dive into *`DistributedDataParallel`* (DDP) in [Part 3](https://medium.com/the-owl/the-practical-guide-to-distributed-training-using-pytorch-part-3-on-multiple-nodes-using-c07b6dcf4001) and [Part 4](https://medium.com/the-owl/the-practical-guide-to-distributed-training-using-pytorch-part-4-on-multiple-nodes-using-slurm-83cf306a3373) of our series. DDP is a powerhouse, but it has one fundamental limitation: your entire model, its gradients, and its optimizer states must fit into the memory (VRAM) of a single GPU.

In the era of Large Language Models (LLMs) and massive vision transformers with hundreds of billions of parameters, this limitation is no longer theoretical — it’s a hard wall. So, what do you do when your model is simply too big for any single device?

You distribute *everything*. Welcome to **Fully Sharded Data Parallelism** (FSDP).

### What is FSDP, and Why Do We Need It?

FSDP is a paradigm shift from DDP. Instead of replicating the entire model on each GPU, FSDP shards (or partitions) the model’s parameters, gradients, and optimizer states across all the GPUs in your distributed group.

Let’s visualize the difference:

* **DDP**: Imagine four workers building a car. Each worker has a complete, identical copy of the massive car blueprint. They work on their assigned car part and then average their findings. The problem? If the blueprint is too big to fit in one worker’s station, the whole operation fails.
* **FSDP**: Now, imagine the same four workers. Instead of a full blueprint, each worker gets only one-quarter of it. Worker 1 gets the engine schematics, Worker 2 the chassis, and so on. When a worker needs to assemble a part that requires information from another’s blueprint section, they quickly communicate to get just the necessary piece, use it, and then discard it.

This “**just-in-time**” fetching of model parameters is the magic of FSDP. It dramatically reduces the peak memory footprint on each GPU, allowing you to train models that are orders of magnitude larger than what would fit on a **single device**.

### How FSDP Works: The Intricate Dance of Communication

FSDP’s memory savings come from a clever sequence of communication operations (*`all\_gather`*, *`reduce\_scatter`*) that are precisely timed with computation.

Here’s a simplified step-by-step breakdown of a forward and backward pass for a single FSDP-wrapped layer:

1. **Initial State**: Each GPU (let’s say we have 4) holds only its 1/4 shard of the model’s parameters. The memory usage is low.

2. **Forward Pass**:

* **All-Gather**: Just before the *`forward()`* method of a specific layer is called, FSDP triggers an *`all\_gather`* operation. All GPUs share their parameter shards for *that specific layer*, so each GPU momentarily reconstructs the full parameters for just that layer.
* **Computation**: The forward pass for that layer is executed on the full parameters.
* **Discard**: Immediately after the forward pass is complete, the gathered, non-local parameter shards are discarded. The GPU’s memory is freed, returning to its low state. This process repeats layer by layer.

3. **Backward Pass**:

* The process happens in reverse. To compute the gradients for a layer, we first need its full parameters.
* **All-Gather**: Again, an *`all\_gather`* operation reconstructs the full parameters for the current layer.
* **Gradient Computation**: The backward pass is executed, calculating the gradients for the full layer.
* **Reduce-Scatter**: This is the key step. Instead of each GPU holding the full gradients, a *`reduce\_scatter`* operation is performed. It averages the gradients across all GPUs and shards them simultaneously. Each GPU ends up with only its corresponding shard of the final, averaged gradient.
* **Discard**: The full parameters and non-local gradient shards are discarded, freeing memory.

This dance ensures that the full parameters for any given layer only exist in VRAM for the brief moment they are needed for computation. The optimizer states are also sharded, so each GPU only needs to store and update the states corresponding to its parameter shard.

### The Practical Guide: Implementing FSDP

Let’s get our hands dirty. The good news is that if you’re familiar with DDP, the transition to FSDP is surprisingly manageable.

#### Step 1: Standard Distributed Setup

This part is identical to DDP. You need to initialize the process group.


```python
import os 
import torch 
import torch.distributed as dist 
from torch.distributed.fsdp import FullyShardedDataParallel as FSDP 
from torch.distributed.fsdp.wrap import size_based_auto_wrap_policy 
import functools  

def setup(): 
    # These variables are set by torchrun 
    local_rank = int(os.environ["LOCAL_RANK"]) 
    rank = int(os.environ["RANK"]) 
    world_size = int(os.environ["WORLD_SIZE"]) 
    dist.init_process_group("nccl", rank=rank, world_size=world_size) 
    torch.cuda.set_device(local_rank)  

# Call this at the beginning of your script 
setup()
```


#### Step 2: The FSDP Wrapper and Auto-Wrapping

This is where things change. Instead of wrapping your model with *`DDP`*, you wrap it with *`FSDP`*. However, for FSDP to work optimally, it needs to know *how* to group layers into sharding units. This is done via an *`auto\_wrap\_policy`*.

The most common policy is *`size\_based\_auto\_wrap\_policy`*, which groups layers together until they exceed a certain size threshold. For Transformer-based models, there is also a *`transformer\_auto\_wrap\_policy`*.


```python
from my_models import MyLargeTransformer 
# Your model definition  
# Define the auto-wrap policy 
# This tells FSDP to create a new FSDP unit for any layer (and its children) 
# that has more than 100M parameters. Adjust this value based on your model. 
auto_wrap_policy = functools.partial(size_based_auto_wrap_policy, 
                                    min_num_params=100_000_000  )  

# Instantiate your model 
# CRITICAL: For very large models, instantiate on the 'meta' device first 
# to avoid OOM on rank 0 before sharding. 
with torch.device("meta"): 
    model = MyLargeTransformer(vocab_size=50000, d_model=4096, nhead=32, num_layers=24)  

# Wrap the model with FSDP 
# The model is now sharded across all available GPUs. 
fsdp_model = FSDP(model, auto_wrap_policy=auto_wrap_policy)
```


#### Step 3: The Optimizer (The Critical Order)

This is the most common point of failure for beginners. You MUST create the optimizer *after* wrapping the model with FSDP.

FSDP replaces the model’s parameters with special *`FlatParameter`* objects. The optimizer needs to be initialized with these sharded parameters, not the original full ones.


```text
# WRONG - This will fail! 
# optimizer = torch.optim.Adam(model.parameters(), lr=1e-4) 
# fsdp_model = FSDP(model, ...)  

# CORRECT 
fsdp_model = FSDP(model, ...) 
# Wrap first 
optimizer = torch.optim.Adam(fsdp_model.parameters(), lr=1e-4) 
# Then create optimizer
```


#### Step 4: Saving and Loading Checkpoints

You cannot use a simple *`torch.save(model.state\_dict())`* on rank 0. Why? Because rank 0 only has its *shard* of the model, not the whole thing! FSDP provides specific contexts for handling state dicts.

There are two main strategies:

1. Full State Dict: Gathers the entire model onto a single rank (usually rank 0) and saves it as a single file. This is simple but can cause OOM on the CPU if the model is enormous.
2. Sharded State Dict: Each rank saves its shard as a separate file. This is the most memory-efficient and scalable method.


```python
from torch.distributed.fsdp import StateDictType, FullStateDictConfig, ShardedStateDictConfig  
# --- SAVING --- 
# Option 1: Full State Dict (saved only on rank 0) 
if dist.get_rank() == 0: 
    print("Saving full model checkpoint...") 

# Define the policy for gathering the full state dict 
full_state_dict_config = FullStateDictConfig(offload_to_cpu=True, rank0_only=True) 
with FSDP.state_dict_type(fsdp_model, StateDictType.FULL_STATE_DICT, full_state_dict_config): 
    cpu_state = fsdp_model.state_dict() 
    if dist.get_rank() == 0: 
        torch.save(cpu_state, "full_model_checkpoint.pt")  

# Option 2: Sharded State Dict (each rank saves its part) 
print(f"Saving sharded model checkpoint on rank {dist.get_rank()}...") 

# Define the policy for sharded state dict 
sharded_state_dict_config = ShardedStateDictConfig(offload_to_cpu=True) 
with FSDP.state_dict_type(fsdp_model, StateDictType.SHARDED_STATE_DICT, sharded_state_dict_config): 
    sharded_state = fsdp_model.state_dict() 
    # Each rank saves its own shard 
    torch.save(sharded_state, f"sharded_checkpoint_rank-{dist.get_rank()}.pt")   

# --- LOADING --- 
# Loading follows a similar pattern. You must wrap the model in FSDP before loading the state dict.  

# Option 1: Loading from a Full State Dict 
# Define the same FSDP model structure 
with torch.device("meta"): 
    model_to_load = MyLargeTransformer(...) 

fsdp_model_load = FSDP(model_to_load, ...)  

# Load the full state dict on rank 0 and then scatter it 
full_state_dict_config = FullStateDictConfig(offload_to_cpu=True, rank0_only=True) 
with FSDP.state_dict_type(fsdp_model_load, StateDictType.FULL_STATE_DICT, full_state_dict_config): 
    if dist.get_rank() == 0: 
        state_dict = torch.load("full_model_checkpoint.pt") 
        fsdp_model_load.load_state_dict(state_dict) 
    # All ranks wait for rank 0 to finish loading and scattering 
    dist.barrier()   

# Option 2: Loading from a Sharded State Dict 
# This is generally more robust and memory-efficient 
sharded_state_dict_config = ShardedStateDictConfig(offload_to_cpu=True) 
with FSDP.state_dict_type(fsdp_model_load, StateDictType.SHARDED_STATE_DICT, sharded_state_dict_config): 
    state_dict = { 
        "model": fsdp_model_load.state_dict(), 
        # You can also save and load optimizer state here 
        } 
    # Each rank loads its own shard 
    dist_checkpoint.load_state_dict( 
        state_dict, 
        storage_reader=dist_checkpoint.FileSystemReader(f"sharded_checkpoint_rank-{dist.get_rank()}.pt"), 
    ) 
    fsdp_model_load.load_state_dict(state_dict["model"])
```


*Note: The sharded checkpointing API has evolved. The modern approach uses `torch.distributed.checkpoint` which is more robust. For the latest best practices, always consult the official PyTorch documentation:* [*https://pytorch.org/docs/stable/fsdp.html.*](https://pytorch.org/docs/stable/fsdp.html.*)

### Common Errors and Their Solutions

1. **Error: *`OutOfMemoryError: CUDA out of memory`* during model instantiation.**

* Cause: You are trying to create the full, multi-billion parameter model on a single GPU (rank 0) before FSDP has a chance to shard it.
* Solution: Use the *`torch.device(“meta”)`* context manager. This creates a “skeleton” of the model without allocating any storage. FSDP can then take this skeleton and materialize the sharded parameters directly on each target GPU, bypassing the initial OOM.

2. **Error: Optimizer errors or *`ValueError: optimzier got different parameter groups`*.**

* Cause: You created the optimizer before wrapping the model with *`FSDP`*.
* Solution: Always follow the correct order: 1. *`model = MyModel(…)`*, 2. *`fsdp\_model = FSDP(model, …)`*, 3. *`optimizer = Adam(fsdp\_model.parameters(), …)`*.

3. **Error: Training is extremely slow.**

* Cause: This can be complex, but a common reason is a suboptimal *`auto\_wrap\_policy`* or no policy at all. If you wrap the entire model as one giant FSDP unit, you lose the fine-grained communication/computation overlap.
* Solution: Use an *`auto\_wrap\_policy`*. For Transformers, *`transformer\_auto\_wrap\_policy`* is highly recommended. For other architectures, experiment with *`size\_based\_auto\_wrap\_policy`* and adjust the *`min\_num\_params`* to match your model’s structure. Also, ensure your GPUs have a fast interconnect (e.g., NVLink).

4. **Error: Incorrect state dict is saved or loaded.**

* Cause: Using a naive *`torch.save(model.state\_dict())`*.
* Solution: You must use the *`FSDP.state\_dict\_type`* context manager. For very large models, prefer the *`SHARDED\_STATE\_DICT`* strategy to avoid memory bottlenecks on a single rank.

5. **Feature: How to save even more memory?**

* Solution: FSDP supports *`cpu\_offload`*. By passing *`cpu\_offload=CPUOffload(offload\_params=True)`* to the FSDP wrapper, it will offload sharded parameters, gradients, and optimizer states to CPU RAM when they are not being used in the forward/backward pass. This comes at the cost of increased data transfer over the PCIe bus, so it will slow down training, but it allows for training even larger models.

### Conclusion

Fully Sharded Data Parallelism is the key that unlocks training for truly massive models in PyTorch. By moving beyond the replication strategy of DDP and embracing a sharding-first approach, FSDP allows you to pool the VRAM of all your GPUs into a single, massive virtual memory space.

While it introduces new complexities, particularly around model instantiation and checkpointing, the core concepts are a logical extension of the distributed principles we’ve already learned. By understanding the FSDP “dance” of gathering and scattering data, using the correct initialization and saving patterns, and carefully configuring wrapping policies, you can break through the memory wall and train the next generation of state-of-the-art models.

---
*Originally published on [Medium](https://medium.com/@mannasiladittya/the-practical-guide-to-distributed-training-using-pytorch-part-5-distributing-everything-using-a6a0b8e83bb9).*

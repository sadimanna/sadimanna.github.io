---
title: "How Slurm Assigns GPUs to Your Jobs"
date: 2025-07-23
permalink: /blog/how-slurm-assigns-gpus-to-your-jobs/
canonical_url: https://medium.com/@mannasiladittya/how-slurm-assigns-gpus-to-your-jobs-and-what-cuda-visible-devices-means-40037ef2356c
tags: [slurm, hpc, gpu, cluster-computing]
---
---

![](/images/blog/how-slurm-assigns-gpus-to-your-jobs/img1.jpeg)

If you’re running machine learning or scientific workloads on a high-performance computing (HPC) cluster, you’ve probably encountered the [Slurm workload manager](https://slurm.schedmd.com/). One of Slurm’s most useful features is the ability to request GPUs for your job with a simple command-line option:


```text
sbatch --gres=gpu:1 myscript.sh
```


But what actually happens behind the scenes when you ask for a GPU? How does Slurm decide which GPU you get? And how does your code know which one to use?

Let’s break it down.

---

### Slurm’s GPU Assignment: The Basics

When you submit a job requesting a GPU, Slurm looks at the available GPUs on each node and selects one that isn’t already in use. By default, it picks the lowest-numbered free GPU (for example, GPU 0 if it’s available).

Suppose your node has four GPUs (numbered 0 to 3), and GPUs 0 and 1 are busy. Slurm will assign your job to GPU 2.

However, Slurm achieves this by setting the `CUDA_VISIBLE_DEVICES` environment variable so that your job sees only the allocated GPU(s), which may be numbered starting from 0 inside your job’s environment. The actual assignment behaviour can vary depending on the system's configuration and specific submission options.

When **Slurm** assigns jobs to GPUs, it performs several checks to ensure resources are allocated properly and fairly. Here’s what happens:

### 1. Resource Availability

* Slurm checks each node for GPUs that are available (not currently allocated to running jobs).
* It considers the count and type of GPUs requested in your job’s `--gres` specification.

### 2. Scheduling Policies

* Slurm follows the scheduling policies set by the cluster administrator (such as priorities, fairshare, partition constraints, and job exclusivity).
* If you specify a particular partition or constraint (e.g., certain GPU models), Slurm filters nodes accordingly.

### 3. GPU Allocation

* For each node under consideration, Slurm examines which GPUs (by their GRES indices, usually corresponding to physical PCI bus numbers or system numbering) are currently free.
* If you request more than one GPU, Slurm checks for the requested quantity of contiguous or available GPUs.

### 4. Concurrent Usage

* Slurm ensures that a specific GPU is not assigned to multiple jobs simultaneously unless the cluster is configured to allow GPU sharing (rare).

### 5. Constraints and Affinity

* If you specify additional constraints (e.g., GPU type, memory, or node property), Slurm checks these against available nodes.
* If using advanced bindings (`--gpu-bind`), Slurm checks whether those specific bindings are available.

### 6. Environment Preparation

* Once allocation is determined, Slurm sets environment variables (most commonly `CUDA_VISIBLE_DEVICES`) in the job’s runtime environment so your code only "sees" the assigned GPU(s).

### 7. Resource Accounting

* Slurm updates its resource management records so that other jobs know which GPUs are now in use.

---

### The Magic of `CUDA\_VISIBLE\_DEVICES`

Here’s where things get really helpful for users: Slurm automatically sets the *`CUDA\_VISIBLE\_DEVICES`* environment variable for your job. This variable tells CUDA-aware software (like PyTorch or TensorFlow) which GPU(s) it should “see.”

Continuing our example, if you’re assigned GPU 2, Slurm sets:


```text
CUDA_VISIBLE_DEVICES=2
```


Inside your job, when your code refers to “GPU 0,” it’s actually using the node’s GPU 2! This mapping helps keep jobs isolated from each other, so you don’t accidentally use someone else’s GPU.

---

### Can You Choose a Specific GPU?

By default, no — you get whatever GPU Slurm assigns. Some clusters support advanced options for more control, but in general, Slurm’s automatic assignment is designed to maximize resource utilization and keep things simple for users.

### Explanation:

#### 1. Native Behaviour

* With the usual `#SBATCH --gres=gpu:1`, Slurm allocates any available GPU(s) on the node.
* Slurm decides which GPUs to give based on scheduling and current usage, usually picking the lowest-numbered free GPU(s).

#### 2. Why Can’t You Select a Specific GPU Directly?

* This keeps resource allocation fair and automated.
* Selecting a specific device (e.g., always GPU 2) could cause contention, fragmentation, or idle resources.
* Most clusters do **not** permit direct selection for users.

#### 3. Workarounds & Options

* **Inside Your Job Script:**  
  You can try to target a specific GPU by setting


```text
export CUDA_VISIBLE_DEVICES=2
```


* However, this only works **if** Slurm actually assigned you that GPU. Otherwise, you might end up with no valid GPU or cause conflicts.
* **Advanced Slurm Configuration:**  
  On clusters with Slurm **20.02 or newer,** and if the administrator enables GPU binding, you can use:


```text
#SBATCH --gpu-bind=map_gpu:2
```


* But this depends on cluster configuration and may not be available.
* **Administrators:**  
  System admins **can** set up node features or GRES with custom mapping, but this is rarely given to regular users because it can lead to inefficient use of resources.

---

#### What I did when I was using a cluster with 8 A100 GPUs


```text
CUDA_VISIBLE_DEVICES=2 sbatch my_script.sh
```


---

### Key Takeaways

* Slurm picks a free GPU for you when you request one.
* It sets *`CUDA\_VISIBLE\_DEVICES`* so your code only sees the GPU you’ve been assigned.
* You usually don’t need to worry about which physical GPU you get — just use GPU 0 in your code, and Slurm handles the mapping.

So next time you submit a GPU job with Slurm, you can rest easy — your code is running on the GPU Slurm picked just for you, and *`CUDA\_VISIBLE\_DEVICES`* is making sure everything stays tidy and efficient behind the scenes.

---

*Happy computing!*

---
*Originally published on [Medium](https://medium.com/@mannasiladittya/how-slurm-assigns-gpus-to-your-jobs-and-what-cuda-visible-devices-means-40037ef2356c).*

---
title: "Quick Tips #1: How to obtain environment information using PyTorch"
date: 2022-01-25
categories: ["PyTorch", "Developer Tools"]
permalink: /blog/quick-tips-1-how-to-obtain-environment-information-using-pyt/
canonical_url: https://medium.com/@mannasiladittya/quick-tips-1-how-to-obtain-environment-information-using-pytorch-a6a8e03f4422
tags: [python, pytorch, cuda, troubleshooting]
---
---

via Terminal

![](/images/blog/quick-tips-1-how-to-obtain-environment-information-using-pyt/img1.png)

[Source](https://www.clipartmax.com/middle/m2i8d3N4b1K9G6G6_bright-light-bulb-vector-light-bulb-vector/)

### Just run


```text
python -m torch.utils.collect_env
```


### Output


```text
Collecting environment information…
PyTorch version: 1.9.1+cu111
Is debug build: False
CUDA used to build PyTorch: 11.1
ROCM used to build PyTorch: N/A
```



```text
OS: Ubuntu 20.04 LTS (x86_64)
GCC version: (Ubuntu 9.3.0–17ubuntu1~20.04) 9.3.0
Clang version: Could not collect
CMake version: Could not collect
Libc version: glibc-2.31
```



```text
Python version: 3.8 (64-bit runtime)
Python platform: Linux-5.8.0–38-generic-x86_64-with-glibc2.29
Is CUDA available: True
CUDA runtime version: 10.0.130
GPU models and configuration: GPU 0: GeForce RTX 2080 Ti
Nvidia driver version: 450.102.04
cuDNN version: Probably one of the following:
/usr/lib/x86_64-linux-gnu/libcudnn.so.7.6.5
/usr/lib/x86_64-linux-gnu/libcudnn.so.8.0.0
/usr/lib/x86_64-linux-gnu/libcudnn_adv_infer.so.8.0.0
/usr/lib/x86_64-linux-gnu/libcudnn_adv_train.so.8.0.0
/usr/lib/x86_64-linux-gnu/libcudnn_cnn_infer.so.8.0.0
/usr/lib/x86_64-linux-gnu/libcudnn_cnn_train.so.8.0.0
/usr/lib/x86_64-linux-gnu/libcudnn_ops_infer.so.8.0.0
/usr/lib/x86_64-linux-gnu/libcudnn_ops_train.so.8.0.0
HIP runtime version: N/A
MIOpen runtime version: N/A
```



```text
Versions of relevant libraries:
[pip3] numpy==1.19.0
[pip3] torch==1.9.1+cu111
[pip3] torchaudio==0.9.1
[pip3] torchvision==0.10.1+cu111
[conda] Could not collect
```


---

Clap and Share if you like this post. Follow for more “Quick Tips” like this.

---
*Originally published on [Medium](https://medium.com/@mannasiladittya/quick-tips-1-how-to-obtain-environment-information-using-pytorch-a6a8e03f4422).*

---
title: "Installing detectron2 in 9 easy steps"
date: 2023-08-24
categories: ["Computer Vision", "Developer Tools"]
permalink: /blog/installing-detectron2-in-9-easy-steps/
canonical_url: https://medium.com/@mannasiladittya/install-detectron2-73d9447d3652
tags: [detectron2, docker, wsl2, computer-vision, pytorch]
---
---

![](/images/blog/installing-detectron2-in-9-easy-steps/img1.jpeg)

Image generated using Bing

When installing detectron2, we often face an error saying that there is a ***mismatch between the CUDA version with which PyTorch (say, 11.7) was compiled and the CUDA version available in the system (say, 12.1)***.

***A possible solution*** is to use a **Docker** container

---

In this article, we will go through the steps to set up a **Docker** container inside the **Windows Subsystem for Linux (WSL2)** on **Windows 11**.

## Step-by-Step Installation

### Step 1: Install WSL2 on Windows

Install **WSL2** on **Windows**Follow the steps given[**here**](https://learn.microsoft.com/en-us/windows/wsl/install)**.**

### Step 2: Install Docker Desktop

Install **Docker Desktop** on **Windows**Follow the steps given[**here**](https://docs.docker.com/desktop/install/windows-install/)**.**

### Step 3: Pull CUDA Docker Image


```bash
docker pull nvcr.io/nvidia/cuda:11.7.0-base-ubuntu22.04
```


### Step 4: Run the Docker Container


```bash
docker run -it --gpus all nvcr.io/nvidia/cuda:11.7.0-base-ubuntu22.04
```


### Step 5: Update and Upgrade Packages


```text
apt-get update && apt-get upgrade
```


### Step 6: Install Python 3.x


```bash
apt install python3
```


> Seventh: Install pip because you will need it


```bash
apt install python3-pip
```


> Eight: Install the required libraries

For ***opencv*** dependencies, run the following command first:


```text
apt-get install ffmpeg libsm6 libxext6
```


otherwise, when importing ***detectron2,*** an **ImportError** like


```text
ImportError: libGL.so.1: cannot open shared object file: No such file or directory
```


will occur. If you install ***libgl1*** after seeing this error, you will get


```text
ImportError: libgthread-2.0.so.0: cannot open shared object file: No such file or directory
```


when you try to import ***detectron2*** again. I did not face any issues when installing ***opencv***, but when importing ***detectron2*** later, the above errors occurred.

To install the required libraries, run


```text
python3 -m pip install numpy matplotlib scikit-learn scikit-image opencv-python opencv-contrib-python …
```


To install PyTorch, run


```text
python3 -m pip install torch==1.13.1+cu117 torchvision==0.14.1+cu117 torchaudio==0.13.1 --extra-index-url https://download.pytorch.org/whl/cu117
```


> Ninth: Install detectron2

First, install ***git***


```bash
apt install git
```


Then install detectron2


```text
python3 -m pip install 'git+https://github.com/facebookresearch/detectron2.git'
```


> Save this Container as an Image

Run


```bash
docker ps
```


to check the container ID. To commit the changes to the container, run


```bash
docker commit [CONTAINED ID] [REPOSITORY[:TAG]]
```


In my case, the command was


```bash
docker commit 870b62170e7e detectron2_cuda11.7.0-ubuntu22.04
```


> Check the newly created Image by running


```bash
docker images
```


> Stop the running container and start the new image


```bash
docker run -it --gpus all detectron2_cuda11.7.0-ubuntu22.04
```


There you go! Now the installed libraries won’t vanish every time you remove the container and can be used on other systems as well!

**Additional Features**:

> NVIDIA Driver

Using


```text
--gpus=all
```


is essential; otherwise, the following error will occur:


```text
AssertionError: Found no NVIDIA driver on your system. 
Please check that you have an NVIDIA GPU and 
installed a driver from http://www.nvidia.com/Download/index.aspx
```


> To access a directory on the host system from within the docker container use **bind mounts**


```bash
docker run -it --gpus all --mount type=bind,src=/path/to/directory,target=/path detectron2_cuda11.7.0-ubuntu22.04
```


Now, you can access all the files in the source directory on the host system.

> To enable the ***nvidia-smi*** tool in the container, enable the ***utility*** driver capability


```bash
docker run -it --gpus 'all,capabilities=compute,utility' --mount type=bind,src=/path/to/directory,target=/path detectron2_cuda11.7.0-ubuntu22.04
```


---

Clap and share if you like this article. Subscribe for more articles like this.

---
*Originally published on [Medium](https://medium.com/@mannasiladittya/install-detectron2-73d9447d3652).*

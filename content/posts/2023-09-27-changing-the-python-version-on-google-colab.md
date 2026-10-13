---
title: "Changing the Python version on Google Colab"
date: 2023-09-27
permalink: /blog/changing-the-python-version-on-google-colab/
canonical_url: https://medium.com/@mannasiladittya/changing-the-python-version-on-google-colab-245fd510d3ae
tags: [python, colab, linux, troubleshooting]
---
---

![](/images/blog/changing-the-python-version-on-google-colab/img1.jpeg)

If you log in to Colab (as of the date of writing this article), the Python version we get is 3.10. However, we may require a different version of Python to reproduce the results of a paper because of the dependency of a library. Let’s see how we can do that in some simple steps.

## Step 1: Update Apt Packages


```text
!apt-get update -y
```


## Step 2: Install Python Version

Suppose we want to install Python-3.8


```text
!apt-get install python3.8 python3.8-distutils
```


## Step 3: Configure Update-Alternatives


```text
!update-alternatives --install /usr/bin/python3 python3 /usr/bin/python3.8 1
```


## Step 4: Verify Python Version


```text
!update-alternatives --config python3
```


## Step 5: Install and Upgrade Pip


```text
!apt-get install python3-pip
!python3 -m pip install --upgrade pip --user
```


Now you are good to go!

---

If we don't install **python3.8-distutils**, then we will get the error shown below when upgrading ***pip.***


```text
ModuleNotFoundError: No module named ‘distutils.cmd’
```


---
*Originally published on [Medium](https://medium.com/@mannasiladittya/changing-the-python-version-on-google-colab-245fd510d3ae).*

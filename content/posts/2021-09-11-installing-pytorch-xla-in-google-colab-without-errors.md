---
title: "Installing PyTorch XLA in Google Colab without errors!!"
date: 2021-09-11
permalink: /blog/installing-pytorch-xla-in-google-colab-without-errors/
canonical_url: https://medium.com/@mannasiladittya/installing-pytorch-xla-in-google-colab-without-35d37d1d03c6
tags: [pytorch, colab, tpu, deep-learning]
---
---

![](/images/blog/installing-pytorch-xla-in-google-colab-without-errors/img1.png)

Source : [Here](https://jax.readthedocs.io/en/latest/notebooks/XLA_in_Python.html)

Very often people working on Google Colab, try installing **torch-xla** using the following command:


```text
!pip install cloud-tpu-client==0.10 https://storage.googleapis.com/tpu-pytorch/wheels/torch_xla-1.9-cp37-cp37m-linux_x86_64.whl
```


**EDIT**:

As of 14th September 2021, the **torch-xla-1.9** wheel has been fixed, as reported in the GitHub Issue tab ([**#3121**](https://github.com/pytorch/xla/issues/3121)).

So, now anyone can just use


```text
!pip install cloud-tpu-client==0.10 https://storage.googleapis.com/tpu-pytorch/wheels/torch_xla-1.9-cp37-cp37m-linux_x86_64.whl
```


it without any errors!!

---

But if errors like the one mentioned below occur again, you know what to do!

And when trying to import torch\_xla, we get the following error:


```text
--------------------------------------------------------------------
```



```text
ImportError                       Traceback (most recent call last)
```



```text
<ipython-input-3-5bff978a6cc6> in <module>()
      2 import torch.nn as nn
      3 import torchvision
----> 4 import torch_xla
      5 import torch_xla.core.xla_model as xm
      6 import torch_xla.debug.metrics as met
```



```text
/usr/local/lib/python3.7/dist-packages/torch_xla/__init__.py in <module>()
     99 from ._patched_functions import _apply_patches
    100 from .version import __version__
--> 101 import _XLAC
    102 
    103
```



```text
ImportError: /usr/local/lib/python3.7/dist-packages/_XLAC.cpython-37m-x86_64-linux-gnu.so: undefined symbol: _ZNK2at10TensorBase8data_ptrIN3c107complexIfEEEEPT_v
```


> How do we deal with the error?

As of now, it seems that we can get rid of this error by simply downgrading PyTorch to **torch-1.8.2+cpu**

To match the versions, we need to install **torch-xla-1.8**


```text
!pip install cloud-tpu-client==0.10 https://storage.googleapis.com/tpu-pytorch/wheels/torch_xla-1.8-cp37-cp37m-linux_x86_64.whl
```


After this, importing **torch\_xla,** gives


```text
WARNING:root:Waiting for TPU to be start up with version pytorch-1.8
WARNING:root:Waiting for TPU to be start up with version pytorch-1.8
WARNING:root:TPU has started up successfully with version pytorch-1.8
```


### References

1. <https://github.com/pytorch/xla/issues/3121>

---
*Originally published on [Medium](https://medium.com/@mannasiladittya/installing-pytorch-xla-in-google-colab-without-35d37d1d03c6).*

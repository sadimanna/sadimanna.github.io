---
title: "Automating Ablation Studies of Deep Learning Models using Batch Script"
date: 2023-10-09
permalink: /blog/automating-ablation-studies-of-deep-learning-models-using-ba/
canonical_url: https://medium.com/@mannasiladittya/automating-ablation-studies-of-deep-learning-models-using-batch-script-968981870329
tags: [deep-learning, ablation-study, automation, batch-script]
---
---

![](/images/blog/automating-ablation-studies-of-deep-learning-models-using-ba/img1.jpeg)

In this article, we will look at a short example of how we can automate running ablation study experiments on our deep learning models using batch scripts in Windows.

> Step 1

Create a ***.bat*** file in your editor

> Step 2: Identify the hyper-parameters you want to sweep over in your experiments

For this article, let us consider the hyper-parameter to be λ. Also, we would like to see the effect of batch size for each λ value.


```text
@echo off
setlocal EnableDelayedExpansion
set lambda=2 10 50 100
set bs=128 256 512
set /a exprun = 1
for %%i in (%lambda%) do (
    for %%j in (%bs%) do (
        echo lambda=%%i/100
        echo bs=%%j
        set /a exprun=!exprun!+1
        echo !exprun!
        python train.py --lambda %%i --bs %%j --run !exprun!
    )
)
endlocal
```


In the above code, we pass the arguments ***lambda*** and ***bs*** to the python file ***trian.py*** and also increment our experiment number counter ***exprun.***

#### for loop


```text
for %%i in (%lambda%) do (
...
)
```


Iterates over the elements in the list ***lambda***

#### set


```text
set /a exprun = 1
```


Sets the value ***1*** to the environment variable ***exprun.***

Using **/a** sets `<string>` to a numerical expression that is evaluated.

**setlocal**

Detailed explanation can be found here <https://ss64.com/nt/setlocal.html>

You can find more about Batch scripting here: <https://en.wikibooks.org/wiki/Windows_Batch_Scripting>

---

Clap, share and follow if you find this article helpful.

---
*Originally published on [Medium](https://medium.com/@mannasiladittya/automating-ablation-studies-of-deep-learning-models-using-batch-script-968981870329).*

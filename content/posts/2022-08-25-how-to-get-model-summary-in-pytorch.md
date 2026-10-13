---
title: "How to get Model Summary in PyTorch"
date: 2022-08-25
permalink: /blog/how-to-get-model-summary-in-pytorch/
canonical_url: https://medium.com/@mannasiladittya/how-to-get-model-summary-in-pytorch-57db7824d1e3
tags: [deep-learning, pytorch, model-summary, torchinfo]
---
---

![](/images/blog/how-to-get-model-summary-in-pytorch/img1.png)

Unlike **Keras**, there is no method in **PyTorch** ***nn.Module*** class to calculate the number of trainable and non-trainable parameters in a model and show the model summary layer-wise. Studying several posts on Stack Overflow, I have figured out three ways to do that. In this post, I am going to summarize those three methods I know of to calculate the number of trainable and non-trainable parameters in a PyTorch model.

### 1. Manually

There does exist a simple method using ***numel*(Ref:** [**Stack Overflow**](https://stackoverflow.com/questions/49201236/check-the-total-number-of-parameters-in-a-pytorch-model))


```python
from prettytable import PrettyTable
```



```python
def count_parameters(model):
    table = PrettyTable([“Modules”, “Parameters”])
    total_params = 0
    for name, parameter in model.named_parameters():
        if not parameter.requires_grad: continue
        params = parameter.numel()
        table.add_row([name, params])
        total_params+=params
    print(table)
    print(f”Total Trainable Params: {total_params}”)
    return total_params
```


For ResNet18, the above function outputs the number of parameters like this


```text
+------------------------------+------------+ 
|           Modules            | Parameters | 
+------------------------------+------------+ 
|         conv1.weight         |    9408    | 
|          bn1.weight          |     64     | 
|           bn1.bias           |     64     | 
|    layer1.0.conv1.weight     |   36864    | 
|     layer1.0.bn1.weight      |     64     | 
|      layer1.0.bn1.bias       |     64     |
.
.
.
|          fc.weight           |   512000   | 
|           fc.bias            |    1000    | 
+------------------------------+------------+ 
Total Trainable Params: 11689512
```


So, the output is in a parameter-wise manner, and we can see the **trainable** parameters for each parameter that exists in the model.

### 2. Using torchsummary

Now, there exists one library called ***torchsummary***,which can be used to print out the trainable and non-trainable parameters in a Keras-like manner for PyTorch models. It is very user-friendly with minimal syntax. The current version is **1.5.1** and it is installed by default when installing the torch library.  
It is available [**here**](https://pypi.org/project/torch-summary/)**.**

You can install it using


```text
python -m pip install torchsummary
```


if not already installed.

#### Import


```python
from torchsummary import summary
```


Suppose the model you are using is a simple ResNet18 model


```text
model = torchvision.models.resnet18().cuda()
```


Then, the model summary is obtained by


```text
summary(model, input_size = (3, 64, 64), batch_size = -1)
```


There is another argument ‘***device***’ which is set to ‘**cuda**’ by default.

The output will look like this


```text
— — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — Layer (type)               Output Shape                  Param # ================================================================ Conv2d-1               [-1, 64, 112, 112]                  9,408 
BatchNorm2d-2          [-1, 64, 112, 112]                    128 
ReLU-3                 [-1, 64, 112, 112]                      0 
MaxPool2d-4              [-1, 64, 56, 56]                      0 
Conv2d-5                 [-1, 64, 56, 56]                 36,864
.
.
.
AdaptiveAvgPool2d-67      [-1, 512, 1, 1]                      0            Linear-68                      [-1, 1000]                513,000 ================================================================ Total params: 11,689,512 
Trainable params: 11,689,512 
Non-trainable params: 0 
---------------------------------------------------------------- Input size (MB): 0.57 
Forward/backward pass size (MB): 62.79 
Params size (MB): 44.59 
Estimated Total Size (MB): 107.96 
----------------------------------------------------------------
```


Now, if your model looks something like this where the base model has several branches and each takes a different input,


```python
class Model(torch.nn.Module):
    def __init__(self):
        super().__init__()
        self.resnet1 = torchvision.models.resnet18().cuda()
        self.resnet2 = torchvision.models.resnet18().cuda()
        self.resnet3 = torchvision.models.resnet18().cuda()
    
    def forward(self, *x):
        out1 = self.resnet1(x[0])
        out2 = self.resnet2(x[1])
        out3 = self.resnet3(x[2])
        out = torch.cat([out1, out2, out3], dim = 0)
        return out
```


That is the input to your model is a list of tensors, then to obtain the model summary,


```text
summary(Model().cuda(), input_size = [(3, 64, 64)]*3)
```


The output will be similar to the previous one but will be a bit confusing since the ***torchsummary*** library squeezes the summary of each constituent ResNet module into one single summary file without any proper distinguishable boundary between the summaries of two consecutive modules.

### 3. Using torchinfo

> previously torch-summary

It may look like it is the same library as the previous one. But it is not. In fact, it is the best of all three methods I am showing here, in my opinion. The current version is **1.7.0.** It is available [**here**](https://pypi.org/project/torchinfo/).

You can install it using


```text
python -m pip install torchinfo
```


This library also has a function named ***summary.*** But it comes with many more options and that is what makes it better. The arguments are **model** (*nn.module*), **input\_size** (*Sequence of Sizes*), **input\_data** (*Sequence of Tensors*), **batch\_dim** (*int*), **cache\_forward\_pass** (*bool*), **col\_names** (*Iterable*[*str*]), **col\_width** (*int*), **depth** (*int*), **device** (*torch.Device*), **dtypes** (*List*[*torch.dtype*]), **mode** (*str*), **row\_settings** (*Iterable*[*str*]), **verbose** (*int*) and **\*\*kwargs**.

Using ***torchinfo.summary*** we can get a lot of information by giving currently supported options from (“*input\_size*”, “*output\_size*”, “*num\_params*”, “*kernel\_size*”, “*mult\_adds*”, “*trainable*” ) as input for the argument **col\_names.**

If we run the following line of code


```python
import torchinfo
```



```text
torchinfo.summary(model, (3, 224, 224), batch_dim = 0, col_names = (“input_size”, “output_size”, “num_params”, “kernel_size”, “mult_adds”), verbose = 0)
```


Change the **verbose** to 1 if not using Jupyter Notebook or Google Colab.

The output of the above code snippet looks like this

A stark difference is observed when we print the summary of **Model** using ***torchinfo.summary****.* The following line of code


```text
torchinfo.summary(Model().cuda(), [(3, 64, 64)]*3, batch_dim = 0, col_names = (“input_size”, “output_size”, “num_params”, “kernel_size”, “mult_adds”), verbose = 0)
```


yields the following output

The default of the **depth** argument is 3 in ***torchinfo.summary***. We can see that the constituent ResNet modules are easily distinguishable and the constituent modules are presented in a hierarchical fashion. This is what makes this library better for these types of models in my opinion.

---

Clap and share if you like this post. Follow for more posts like this.

---
*Originally published on [Medium](https://medium.com/@mannasiladittya/how-to-get-model-summary-in-pytorch-57db7824d1e3).*

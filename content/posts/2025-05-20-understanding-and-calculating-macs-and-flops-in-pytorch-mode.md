---
title: "Understanding and Calculating MACs and FLOPs in PyTorch Models"
date: 2025-05-20
categories: ["Deep Learning", "Model Efficiency"]
permalink: /blog/understanding-and-calculating-macs-and-flops-in-pytorch-mode/
canonical_url: https://medium.com/@mannasiladittya/understanding-and-calculating-flops-in-pytorch-models-c609cb83ac3a
tags: [deep-learning, pytorch, model-profiling, flops, performance]
---
---

![](/images/blog/understanding-and-calculating-macs-and-flops-in-pytorch-mode/img1.jpeg)

As the complexity of deep learning models grows, understanding their computational demands becomes increasingly important. One key metric used to assess this is the number of **FL**oating **P**oint **O**perations per **S**econd (FLOPs). FLOPs provide an estimate of the computational cost of running a model, which can be crucial for optimizing performance, particularly when deploying models to resource-constrained environments. In this blog post, we’ll explore how to calculate FLOPs for a PyTorch model using the *`****torchprofile****`* and ‘***calflops’*** libraries.

### What are FLOPs?

FLOPs represent the number of arithmetic operations required to execute a model. This includes operations like additions, multiplications, and other basic arithmetic computations. By understanding FLOPs, you can gain insights into the efficiency and performance of your model, enabling informed decisions about model optimization and deployment.

### Why Calculate FLOPs?

1. **Optimization**: Knowing the FLOPs can guide you in optimizing your model for faster inference times.
2. **Resource Allocation**: Helps in determining the computational resources needed for model deployment.
3. **Comparison**: Allows you to compare different models or architectures in terms of computational complexity.

### Calculating FLOPs with `torchprofile`

To calculate FLOPs in PyTorch, we can use the *`****torchprofile****`* library, which provides an easy-to-use interface for profiling PyTorch models. Here’s a step-by-step guide on how to do it.

### Step 1: Install `torchprofile`

First, you’ll need to install the *`torchprofile`* library. This can be easily done using pip:


```bash
pip install torchprofile
```


### Step 2: Define Your Model

Ensure your model is defined as a subclass of *`nn.Module`* and has an implemented *`forward`* method. Here’s an example of a simple convolutional neural network:


```python
import torch 
import torch.nn as nn  
class SimpleModel(nn.Module):
    def __init__(self):
        super(SimpleModel, self).__init__()
        self.conv1 = nn.Conv2d(3, 16, kernel_size=3, stride=1, padding=1)
        self.conv2 = nn.Conv2d(16, 32, kernel_size=3, stride=1, padding=1)
        self.fc1 = nn.Linear(32  32  32, 10)
    def forward(self, x):
        x = self.conv1(x)
        x = self.conv2(x)
        x = x.view(x.size(0), -1)
        x = self.fc1(x)
        return x
```


### Step 3: Calculate FLOPs

With your model defined, you can now use *`torchprofile`* to calculate FLOPs. Here’s how to do it:


```python
import torchprofile  

# Create an instance of the model 
model = SimpleModel()  

# Create a dummy input tensor with the appropriate shape 
input_tensor = torch.randn(1, 3, 32, 32)  

# Example for a 32x32 RGB image  
# Use torchprofile to calculate FLOPs 
macs = torchprofile.profile_macs(model, input_tensor)
```


#### For Multiple Inputs

Utilise the ‘*args*’ argument in the ***profile\_macs*** function


```python
import torchprofile  

# Create an instance of the model 
model = SimpleModel()  

# Create a dummy input tensor with the appropriate shape 
input_tensor = torch.randn(1, 3, 32, 32)  

# Example for two32x32 RGB image input
# Use torchprofile to calculate FLOPs 
macs = torchprofile.profile_macs(model, args= (input_tensor, input_tensor))
```


### Key Points:

* Input Shape: Ensure the input tensor matches the expected input shape of your model. Typically, a batch size of 1 is used for MACs calculation.
* Multiple input is also supported through the *args* argument.

### Calculating FLOPS with ‘calflops’

*`calflops`* is another library that can be used to calculate the number of floating-point operations (FLOPs) for PyTorch models. It provides a simple interface to estimate FLOPs and the number of parameters in a model.

### Step 1. Installation

First, you need to install the *`calflops`* library. As of my last update, it might not be available on PyPI directly, so you may need to install it from its repository if it’s hosted on platforms like GitHub. Here’s a general way to do it:


```bash
pip install calflops
```


### Step 2. Define Model

Already done above, so we will skip this step.

### Step 3: Calculate FLOPs

Calflops provides many features, among which calculating FLOPs of an HF model using an access token is the most interesting. However, we will leave that exploration to the user and focus on a simple model here, for introduction.


```python
import calflops
batch_size = 1
input_shape = (batch_size, 3, 224, 224)
flops, macs, params = calflops.calculate_flops(model=model, 
                                      input_shape=input_shape,
                                      output_as_string=True,
                                      output_precision=4)
print("Model FLOPs:%s   MACs:%s   Params:%s \n" %(flops, macs, params))
```


There are also provisions for outputting a full report with detailed analysis in ***calflops*** library, which makes it better than ***torchprofile***.


```text
 — — — — — — — — — — — — — — — — — — — Calculate Flops Results — — — — — — — — — — — — — — — — — — -
Notations:
number of parameters (Params), number of multiply-accumulate operations(MACs),
number of floating-point operations (FLOPs), floating-point operations per second (FLOPS),
fwd FLOPs (model forward propagation FLOPs), bwd FLOPs (model backward propagation FLOPs),
default model backpropagation takes 2.00 times as much computation as forward propagation.
Total Training Params: 14.57 M 
fwd MACs: 12.48 GMACs
fwd FLOPs: 25.03 GFLOPS
fwd+bwd MACs: 37.44 GMACs
fwd+bwd FLOPs: 75.08 GFLOPS
```


Similar to torchprofile, if the model requires multiple inputs, it can be provided using ***args*** (**list**) or ***kwargs*** (**dict**) arguments.

### Conclusion

Calculating FLOPs is a valuable step in understanding the computational demands of your models. Whether you’re comparing different architectures or preparing a deployment model, knowing the FLOPs can provide critical insights into your model’s performance and efficiency.

By integrating FLOPs calculation into your workflow, you can ensure that your models are not only accurate but also efficient, paving the way for successful deployment in real-world applications.

---
*Originally published on [Medium](https://medium.com/@mannasiladittya/understanding-and-calculating-flops-in-pytorch-models-c609cb83ac3a).*

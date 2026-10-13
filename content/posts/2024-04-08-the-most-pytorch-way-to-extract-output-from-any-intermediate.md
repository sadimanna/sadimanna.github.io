---
title: "The most PyTorch way to extract output from any intermediate layer in a pre-trained model"
date: 2024-04-08
categories: ["Deep Learning", "PyTorch"]
permalink: /blog/the-most-pytorch-way-to-extract-output-from-any-intermediate/
canonical_url: https://medium.com/@mannasiladittya/extracting-output-from-intermediate-layer-in-any-pretrained-model-the-pytorch-way-b201926a1eec
tags: [deep-learning, pytorch, feature-extraction, torchvision]
---
---

![](/images/blog/the-most-pytorch-way-to-extract-output-from-any-intermediate/img1.jpeg)

## Overview of Feature Extraction

The architecture is not the same for all the models. The classes and the functions used are all different. The structure of the code for all the models is quite different. That is why creating a common code for extracting outputs from intermediate layers for all the models seems a little difficult. Also, to get an idea about the modules in the pre-trained models, it is better to have some knowledge about the source code. This will make it easier for the readers to specify the names of the layers from which one wants to obtain output, properly. However, it is not a necessity.

> If the reader needs to first learn about how to use hooks in PyTorch to extract features from intermediate layers, then please look at this article given below.

[**Using forward\_hooks to Extract Intermediate Layer Outputs from a Pre-trained ResNet Model in…**  
*Here we are again with the fourth article in the “Feature Extraction” series. This article will describe another method…*medium.com](https://medium.com/the-owl/using-forward-hooks-to-extract-intermediate-layer-outputs-from-a-pre-trained-model-in-pytorch-1ec17af78712 "https://medium.com/the-owl/using-forward-hooks-to-extract-intermediate-layer-outputs-from-a-pre-trained-model-in-pytorch-1ec17af78712")

---

There is a built-in class in the ***torchvision*** library which allows us to obtain features from any intermediate layer of a Sequential Pytorch model. This class, **IntermediateLayerGetter**,can be used as a wrapper on any backbone, provided the modules in the backbone are executed sequentially, and no module is reused in the forward method.

This shrinks our problem of obtaining multi-level / multi-scale hierarchical features from any backbone network to a *one-liner*.

This class only takes two arguments:

1. The backbone instance from which we will extract the features
2. a Dictionary containing the names of the modules from which the outputs will be returned as the key of the dict, and the value of the dictionary is the name of the returned activation.

---

## Using IntermediateLayerGetter in PyTorch

An elementary example is given in the documentation itself. First, you need to import ***IntermediateLayerGetter*** from ***torchvision.models.\_utils***


```python
from torchvision.models._utils import IntermediateLayerGetter
```


Then let us initialize a pre-trained model


```text
>>> bb = torchvision.models.resnet18(weights=ResNet18_Weights.DEFAULT)
```


Now, if we want to extract features from the layers `layer1` and `layer3` in ResNet18, we need to pass the dictionary `{'layer1':'feat1', 'layer3':'feat2'}` to the argument `return_layers`, where `'feat1'` and `'feat2'` are the new names of the returned features.


```text

>>> new_bb = IntermediateLayerGetter(bb, {‘layer1’: ‘feat1’, ‘layer3’: ‘feat2’})
```


There you go. You get a new backbone which will return features from `layer1` and `layer3` of ResNet18, in just one line.

Now, let us have a look at the output.


```text
>>> out = new_bb(torch.rand(1, 3, 224, 224))
>>> print(out[‘feat1’].shape)
>>> torch.Size([1, 64, 56, 56])
>>> print(out[‘feat3’].shape)
>>> torch.Size([1, 256, 14, 14])
```


## Limitations with VGG Architectures Furthermore, in models where any module is executed mroe than once during the forward pass, this will not work. So, let us look at an improved version with an example.

In the Pytorch code for VGG, all the convolutional layers are clubbed inside a single `nn.Sequential` object, hence, **IntermediateLayerGetter** won’t be able to get features from an intermediate convolutional layer.

*Readers can follow this article to extract intermediate outputs from VGG-type architecture*

[**Extracting Features from an Intermediate Layer of a Pretrained VGG-Net in PyTorch**  
*This article is the third one in the “Feature Extraction” series. The last two articles were about extracting features…*medium.com](https://medium.com/the-owl/extracting-features-from-an-intermediate-layer-of-a-pretrained-vgg-net-in-pytorch-43f801866a2e "https://medium.com/the-owl/extracting-features-from-an-intermediate-layer-of-a-pretrained-vgg-net-in-pytorch-43f801866a2e")

However, the approach taken in the above post involves truncating the model itself up to the layer from which we need the output. Also, this approach does not allow the user to take outputs from multiple layers. We can avoid such truncating of the architecture and single intermediate output by modifying the **IntermediateLayerGetter** class a little.

The first `Sequential` object of the VGG looks like this


```text
Sequential( 
(0): Conv2d(3, 64, kernel_size=(3, 3), stride=(1, 1), padding=(1, 1))
```


## Handling Nested Sub-modules

Suppose, we want to obtain output from convolutional layer **(10)** in the above `Sequential` object. **We need to do iteration over another sub-level of the layers.**

This exact problem is already solved in this repository. It fetches the layer using ***getattr*** methodin **Python** by smartly using the separator ‘**.**’ in the layer names to iterate over all the children sub-modules recursively in each module of the backbone. A ***hook*** is then attached to the layer to obtain the output from the desired layers.

[**GitHub - sebamenabar/Pytorch-IntermediateLayerGetter: Simple easy to use module to get the…**  
*Simple easy to use module to get the intermediate values/activations from chosen Pytorch submodules. Supports submodule…*github.com](https://github.com/sebamenabar/Pytorch-IntermediateLayerGetter/tree/master "https://github.com/sebamenabar/Pytorch-IntermediateLayerGetter/tree/master")

The readers can have a look at the code. However, the readers need to be aware of the elements in model architecture and how it is coded in PyTorch.

The code in the repo given above also solves the multiple-call problem in the PyTorch version of the IntermediateLayerGetter. In case, a module is called multiple times, all the output versions are stored.

---

Clap and share if you like the post.

---
*Originally published on [Medium](https://medium.com/@mannasiladittya/extracting-output-from-intermediate-layer-in-any-pretrained-model-the-pytorch-way-b201926a1eec).*

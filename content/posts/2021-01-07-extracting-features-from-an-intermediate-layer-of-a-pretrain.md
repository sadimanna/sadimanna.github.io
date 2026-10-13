---
title: "Extracting Features from an Intermediate Layer of a Pretrained VGG-Net in PyTorch"
date: 2021-01-07
categories: ["Deep Learning", "PyTorch"]
permalink: /blog/extracting-features-from-an-intermediate-layer-of-a-pretrain/
canonical_url: https://medium.com/@mannasiladittya/extracting-features-from-an-intermediate-layer-of-a-pretrained-vgg-net-in-pytorch-43f801866a2e
tags: [deep-learning, pytorch, computer-vision, vgg, feature-extraction]
---
---

![](/images/blog/extracting-features-from-an-intermediate-layer-of-a-pretrain/img1.png)

256 feature maps of dimension 56X56 taken as an output from the 4th layer in VGG-11

This article is the third one in the “Feature Extraction” series. The last two articles (Part 1: [Hard](https://medium.com/the-owl/extracting-features-from-an-intermediate-layer-of-a-pretrained-model-in-pytorch-c00589bda32b) and Part 2: [Easy](https://medium.com/the-owl/extracting-features-from-an-intermediate-layer-of-a-pretrained-model-in-pytorch-easy-way-62631c7fa8f6)) were about extracting features from intermediate layers in ***ResNet*** in ***PyTorch***. In this article, we are going to see how to extract features from an intermediate layer from a ***VGG Net***. As I mentioned in the previous article, one may need to look at the [source code](https://github.com/pytorch/vision/blob/master/torchvision/models/vgg.py) first to have an idea about what to import and which functions to modify.

### Library Imports

### Importing VGG and other required functions


```python
from torchvision.models.vgg import *
from torchvision.models.vgg import model_urls, cfgs
```


‘***\_\_all\_\_***’ does not contain ***model\_urls*** and ***cfgs*** dictionaries, so those two dictionaries have been imported separately. Otherwise, one can create them in the working file also.


```text
cfgs: Dict[str, List[Union[str, int]]] = {
```



```text
‘A’: [64,‘M’,128,‘M’,256,256,‘M’,512,512,‘M’,512,512,‘M’],
 
‘B’: [64,64,‘M’,128,128,‘M’,256,256,‘M’,512,512,'M’,512,512,‘M’],
```



```text
‘D’: [64,64,‘M’,128,128,‘M’,256,256,256,‘M’,512,512,512,‘M’,512,512,512,‘M’],
```



```text
‘E’: [64,64,‘M’,128,128,‘M’,256,256,256,256,‘M’,512,512,512,512,‘M’,512, 512,512,512,‘M’],}
```


### Create a new VGG class

We will create a new VGG class which will give us the output from the layer we want. We can do this in two ways. We can create a subclass of VGG and override the forward method of the VGG class like we did for [ResNet](https://medium.com/the-owl/extracting-features-from-an-intermediate-layer-of-a-pretrained-model-in-pytorch-easy-way-62631c7fa8f6) or we can just create another class without inheriting the VGG class.

### Main Module

We create another class in which we can pass information about which model we want to use as the backbone and which layer we want to take the output from, and accordingly, a model ‘***self.vgg***’ will be created. Also, we can add other layers according to our need (like LSTM or ConvLSTM) to the new VGG model. Also, care must be taken that the dictionary ***kwargs*** is initialized and there is a key ‘***init\_weights***’ in it otherwise we can get a ***KeyError*** ifwe set ***pretrained*** **=** **False.**

The ***make\_layers*** method returns an ***nn.Sequential*** object with layers up to the layer we want the output from. The ***\_vgg*** method creates an instance of the modified VGG model (***newVGG***) and then initializes the layers with pre-trained weights.

So, how do we initialize the model in this case? The method ***load\_state\_dict*** offers an option whether to strictly enforce that the keys in ***state\_dict*** match the keys returned by this module’s method **torch.nn.Module.state\_dict** function. We set ***strict*** to ***False*** to avoid getting error for the missing keys in the ***state\_dict*** of the model.

To obtain the new models we just have to write the following lines


```text
model = NewModel('vgg13', True, 7, num_trainable_layers = 2)
```



```text
model = model.to('cuda:0')
```


This will give us a VGG-13 model which will give us output from the 7th layer and also if we train this model only the last 2 convolutional layers will be fine-tuned. We can also fine-tune all the layers just by setting


```text
num_trainable_layer = -1
```


### Obtaining the output


```text
out = model(x)
out = out.cpu().data.numpy()
```


---

Please clap if you like this post. Any sort of feedback is welcome!

---
*Originally published on [Medium](https://medium.com/@mannasiladittya/extracting-features-from-an-intermediate-layer-of-a-pretrained-vgg-net-in-pytorch-43f801866a2e).*

---
title: "SimCLR in PyTorch"
date: 2021-06-30
categories: ["Self-Supervised Learning", "Deep Learning"]
permalink: /blog/simclr-in-pytorch/
canonical_url: https://medium.com/@mannasiladittya/simclr-in-pytorch-5f290cb11dd7
tags: [deep-learning, pytorch, self-supervised-learning, simclr, computer-vision]
---
---

SimCLR or Simple Framework for Contrastive Learning of Visual Representations is a State-of-the-art Self-supervised Representation Learning Framework.

#### The SimCLR [paper](https://arxiv.org/pdf/2002.05709.pdf) presents several contributions:

1. Unsupervised representation learning benefits from stronger augmentations.
2. Introducing a trainable MLP after the base encoder improves the quality of the learned representations.
3. Representation learning with contrastive cross-entropy loss benefits from normalized embeddings and an appropriately adjusted temperature parameter.
4. Contrastive learning benefits from larger batch sizes and longer training compared to its supervised counterpart. Like supervised learning, contrastive learning benefits from deeper and wider networks.

#### The framework consists of four parts:

1. A ***stochastic data augmentation module*** that transforms any given data example randomly resulting in two correlated views of the same example. This pair is considered to be a positive pair. The authors apply three simple augmentations: ***Random Cropping*** followed by ***Resize*** back to the original size, ***Random Color Distortions*** and ***Random Gaussian Blur***.
2. A ***base encoder f*(.)** that extracts representation vectors from augmented data examples.
3. A ***small neural network projection head g*(.)** that maps representations to space where contrastive loss is applied.
4. A ***Contrastive Loss*** ***function*** defined for a contrastive prediction task.

![](/images/blog/simclr-in-pytorch/img1.png)

The SimCLR framework. Source: Paper

The contrastive loss function is defined as:

![](/images/blog/simclr-in-pytorch/img2.png)

Source: paper

---

#### Some points to be noted:

* In the original paper, the authors used multiple GPUs and large batch sizes to obtain state-of-the-art performance. Also, the authors used ImageNet dataset consisting of over 1 million images.
* However, because of the unavailability of such high-spec hardware with the author of this article, the implementation presented here is going to be run only on one GPU and with a batch size of only **128**. Also, we will be using the **CIFAR10** dataset. The authors of the original paper also ran the **SimCLR** on **CIFAR10**, so it will be possible to compare the performance of our implementation with theirs.
* The optimizer that we are going to be using is **LARS,** with a learning rate of **0.2**. The learning rate schedule is also going to be the same as mentioned in the paper, i.e. a **linear warmup** for **10** epochs and then a cosine decay schedule. Readers can take the liberty to change the optimizer as per their requirements.
* The code has been run for **100** epochs on **Tesla V100 GPU** on **Google Colab Pro**. The time taken for each epoch of pretraining is **3.5 mins** approx. On **Tesla P100 GPU** it takes about **4.5 mins** approx for each epoch.
* The augmentations applied are *random horizontal flipping*, *random cropping and resizing*, and *color distortion*.

---

#### Import Libraries

#### Set Seed for reproducibility

#### Download CIFAR10 Dataset

#### Building DataLoader

> Reading the Dataset

Let, the training and validation split be 80:20. Without many complications, let us consider the ‘***batch-5***’ of the **CIFAR10** dataset as the validation set and the rest as the training set. We also calculate the channel-wise mean and standard deviation of the pixel values on the training split.


```text
trimages = images[:40000]
valimages = images[40000:]
trlabels = labels[:40000]
vallabels = labels[40000:]
```



```text
MEAN = np.mean(trimages/255.0,axis=(0,2,3),keepdims=True)
STD = np.std(trimages/255.0,axis=(0,2,3),keepdims=True)
```



```python
print(MEAN)
>>> [[[[0.49145363]]    [[0.48206213]]    [[0.44622512]]]]
```



```python
print(STD)
>>> [[[[0.24716829]]    [[0.24370658]]    [[0.26169213]]]]
```


> DataGenerator

> DataLoader

In the above code snippets, you change anything according to your needs. A sample of a single batch of inputs is shown below.

![](/images/blog/simclr-in-pytorch/img9.jpeg)![](/images/blog/simclr-in-pytorch/img10.jpeg)

However, there is another easy method shown in the Pytorch tutorials which can be used to make the DataLoaders.

#### Model

* The Identity module gives output what it takes as input.
* The LinearLayer module gives a single Linear layer followed by an optional BatchNormalization layer.
* The ProjectionHead module gives a linear or non-linear projection head according to the argument passed.
* The PreModel module gives the model to be used for pre-training, i.e. the **base encoder f(.)** with an **MLP g(.)** on top of it. The class PreModel uses **ResNet50**. However, this can be modified according to your need and can even be made customizable with some little extra work.

---

#### Loss Function

The Loss function code has been taken from this [repo](https://github.com/Spijkervet/SimCLR) ([Spijkervet](https://github.com/Spijkervet)/[SimCLR](https://github.com/Spijkervet/SimCLR)) and modified slightly. People working on multiple GPUs can refer to the repo for additional help.

#### Optimizer

The LARS optimizer implementation is also taken from [Spijkervet](https://github.com/Spijkervet)/[SimCLR](https://github.com/Spijkervet/SimCLR). However, some issues which were raised on the repo has been fixed in the code below. This implementation is also similar to the Tensorflow implementation in [google-research](https://github.com/google-research)/[simclr](https://github.com/google-research/simclr).

> Optimizer, Scheduler and Loss function declaration

#### Some extra functions

### Training

#### Pretraining Result

Plotting the features after dimensionality reduction using TSNE after 100 epochs of pretraining looks like the plot shown below.

![](/images/blog/simclr-in-pytorch/img18.png)

Loss curve

![](/images/blog/simclr-in-pytorch/img19.png)

TSNE-fied features from the output of the base encoder after 100 epochs of training.

---

### Create Downstream model

In the code snippet below it is shown that the parameters of the pre-trained model are frozen. This is the case in Linear Evaluation. However, if anyone wants to finetune the whole model, then change `p.requires_grad = False` to `p.requires_grad = True`.

Also, it can be seen that the projector is discarded in the downstream task here.

#### DataGenerator for the Downstream task

In the downstream task, no augmentation except RandomResizedCrop has been used. Also, you can just use the DataLoader as shown in the PyTorch CIFAR10 tutorial. [Link](https://pytorch.org/tutorials/beginner/blitz/cifar10_tutorial.html)

#### Some more declarations

### Downstream Training

#### Downstream Training Results

![](/images/blog/simclr-in-pytorch/img24.png)![](/images/blog/simclr-in-pytorch/img25.png)

(a) Loss (b) Training Accuracy

### Downstream Inference

The pre-trained model achieved approx 85% by linear evaluation in the downstream classification task. The authors of the original SimCLR paper achieved around 84% by linear evaluation on CIFAR10. However, the ResNet encoder used in this implementation was not trained from scratch. Rather, the weights were initialized to ImageNet trained weights. The performance may differ if one uses randomly initialized weights.

The Jupyter Notebook can found [here](https://github.com/sadimanna/simclr_pytorch).

---

Please give the article a clap if you like it!!

---
*Originally published on [Medium](https://medium.com/@mannasiladittya/simclr-in-pytorch-5f290cb11dd7).*

---
title: "Research Roundtable [Day 1][Paper 2] — Big Self-Supervised Models are Strong Semi-Supervised…"
date: 2024-08-28
categories: ["Self-Supervised Learning", "Deep Learning"]
permalink: /blog/research-roundtable-day-1-paper-2-big-self-supervised-models/
canonical_url: https://medium.com/@mannasiladittya/research-roundtable-day-1-paper-2-big-self-supervised-models-are-strong-semi-supervised-fd5d4cdb8b2f
tags: [deep-learning, self-supervised-learning, simclr, paper-review]
---
---

![](/images/blog/research-roundtable-day-1-paper-2-big-self-supervised-models/img1.jpeg)

In this article, we will discuss the major contributions of the paper “Big Self-Supervised Models are Strong Semi-Supervised Learners” which is simply termed as SimCLRv2, an improved version of SimCLR.

## Major Changes Made to SimCLR

1. **Larger ResNet models**: The largest model used in SimCLR was ResNet50(x4). In SimCLRv2, the authors pre-trained ResNet152(x3) with and without selective kernel (+SK) convolutional layers.
2. **Increase capacity of Projection layer**: The capacity of the non-linear network ***g***(·) (a.k.a. projection head) is also increased, by making it deeper. Furthermore, instead of throwing away g(·) entirely after pretraining as in SimCLR, the authors fine-tune from a middle layer. This small change yields a significant improvement for both linear evaluation and fine-tuning with only a few labelled examples.
3. **Memory Bank**: The authors also incorporate the memory mechanism from MoCo, which designates a memory network (with a moving average of weights for stabilization) whose output will be buffered as negative examples. However, this addition does not improve the performance much (~1%) in linear evaluation.

## Key Findings

1. **Bigger self-supervised models are more label efficient**: Empirical results suggest that for semi-supervised learning (via the task-agnostic use of unlabeled data), the fewer the labels, the more it is possible to benefit from a bigger model. Bigger self-supervised models are more label efficient, performing significantly better when fine-tuned on only a few labelled examples, even though they have more capacity to potentially overfit.
2. **Extra capacity not always necessary**: Although big models are important for learning general (visual) representations, the extra capacity may not be necessary when a specific target task is concerned. Therefore, with the task-specific use of unlabeled data, the predictive performance of the model can be further improved and transferred into a smaller network.
3. **Bigger/Deeper Projection Heads Improve Representation Learning**: A deeper projection head not only improves the representation quality measured by linear evaluation but also improves semi-supervised performance when fine-tuning from a middle layer of the projection head.
4. **Distillation Using Unlabeled Data Improves Semi-Supervised Learning**: Distillation with unlabeled examples improves fine-tuned models in two ways: (1) when the student model has a smaller architecture than the teacher model, it improves the model efficiency by transferring task-specific knowledge to a student model, (2) even when the student model has the same architecture as the teacher model (excluding the projection head after ResNet encoder), self-distillation can still meaningfully improve the semi-supervised learning performance. To obtain the best performance for smaller ResNets, the big model is self-distilled before distilling it into smaller models.

## Experimental Results

![](/images/blog/research-roundtable-day-1-paper-2-big-self-supervised-models/img2.png)![](/images/blog/research-roundtable-day-1-paper-2-big-self-supervised-models/img3.png)
## Implementations & Repositories

1. Tensorflow:

* <https://github.com/google-research/simclr>
* <https://github.com/manmeet3/Medical-SSL-SimCLRv2>

2. Keras

* <https://github.com/travishsu/keras-simCLRv2>

3. PyTorch:

* <https://github.com/kaipak/SimCLRv2-PyTorch>
* <https://github.com/qnguyen3/simclr_v2>

---

Please add in the comments, if the reader feels that any point is not mentioned in this article.

---
*Originally published on [Medium](https://medium.com/@mannasiladittya/research-roundtable-day-1-paper-2-big-self-supervised-models-are-strong-semi-supervised-fd5d4cdb8b2f).*

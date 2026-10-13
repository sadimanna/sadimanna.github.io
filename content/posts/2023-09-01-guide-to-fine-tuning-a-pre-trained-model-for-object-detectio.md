---
title: "Guide to fine-tuning a Pre-trained model for Object Detection tasks with Faster RCNN using…"
date: 2023-09-01
permalink: /blog/guide-to-fine-tuning-a-pre-trained-model-for-object-detectio/
canonical_url: https://medium.com/@mannasiladittya/guide-to-fine-tuning-a-pre-trained-model-for-object-detection-tasks-with-faster-rcnn-using-e2e7e190105b
tags: [deep-learning, detectron2, object-detection, faster-rcnn, computer-vision]
---
---

![](/images/blog/guide-to-fine-tuning-a-pre-trained-model-for-object-detectio/img1.jpeg)

In this article, we will be going through the steps needed to fine-tune a **pre-trained** model for **object detection** tasks using ***Faster RCNN*** as the baseline framework using ***Detectron2***. This article will be a little different from conventional articles, as we won’t be going through millions of lines of code. Instead, we will only be going through the steps to follow.

In this article, we do not assume any specific type pre-trained model. The model can be supervised, semi-supervised, or self-supervised. However, the structure of the model object in the pre-training stage would matter, as the saved weights’ keys would depend on it. For example, in the case of SSL trained using [***lightly-ai***](https://github.com/lightly-ai/lightly) library, the keys in the weights dictionary start with ‘***backbone.***’, whereas the keys supported by ***detectron2*** have a different naming convention. The dictionary keys in the saved weights can be seen by inspecting the ***torchvision*** version of the **ResNet50** model given here

[**detectron2/MODEL\_ZOO.md at main · facebookresearch/detectron2**  
*Detectron2 is a platform for object detection, segmentation and other visual recognition tasks. …*github.com](https://github.com/facebookresearch/detectron2/blob/main/MODEL_ZOO.md#imagenet-pretrained-models "https://github.com/facebookresearch/detectron2/blob/main/MODEL_ZOO.md#imagenet-pretrained-models")

---

## Step-by-Step Fine-Tuning Guide

### Step 1: Installation

For detailed instructions on how to install **Detectron2**, check

[**Installing detectron2 in 9 easy steps**  
*using Docker inside WSL in Windows 11*medium.com](https://medium.com/the-owl/install-detectron2-73d9447d3652 "https://medium.com/the-owl/install-detectron2-73d9447d3652")

### Step 2: Dataset Preparation

**Detectron2** has built-in support for a few datasets. The datasets are assumed to exist in a directory specified by the environment variable `DETECTRON2_DATASETS`. Under this directory, ***detectron2*** will look for datasets in the structure described below, if needed.


```text
$DETECTRON2_DATASETS/
  coco/
  lvis/
```


You can set the location for built-in datasets by   
`export DETECTRON2_DATASETS=/path/to/datasets`. If left unset, the default is `./datasets` relative to your current working directory.


```text
VOC20{07,12}/
  Annotations/
```


You may need to set this every time you restart the session. One way is to put it in a ***.bashrc*** file.

### Step 3: Convert Pre-trained Weights to Detectron2 Format

**Detectron2** provides a file to convert model weights saved from ***torchvision*** models. The link is provided below.

However, some modifications may be needed depending on the structure of the model object definition in the pre-training stage as stated earlier. Several examples can be seen in the repository for [MoCo](https://github.com/facebookresearch/moco/blob/main/detection/convert-pretrain-to-detectron2.py) and [DETR](https://github.com/facebookresearch/detr/blob/master/d2/converter.py). While the basic structure of the code will remain the same, some additional logic needs to be added to handle the varying hierarchical structures of the models.

[**detectron2/tools/convert-torchvision-to-d2.py at main · facebookresearch/detectron2**  
*Detectron2 is a platform for object detection, segmentation and other visual recognition tasks. …*github.com](https://github.com/facebookresearch/detectron2/blob/main/tools/convert-torchvision-to-d2.py "https://github.com/facebookresearch/detectron2/blob/main/tools/convert-torchvision-to-d2.py")

### Step 4: Model Training

**Detectron2** also provides several training scripts in the link given below.

[**detectron2/tools/train\_net.py at main · facebookresearch/detectron2**  
*Detectron2 is a platform for object detection, segmentation and other visual recognition tasks. …*github.com](https://github.com/facebookresearch/detectron2/blob/main/tools/train_net.py "https://github.com/facebookresearch/detectron2/blob/main/tools/train_net.py")

The training can be run by the following example command. Here, we pass the path to the config file, the converted pre-trained weights, and the number of GPUs to be used. The converted pre-trained weights can be passed using the argument **MODEL.WEIGHTS,** as shown below.

During training, you can modify any hyper-parameter in the configuration file by passing it as an argument or adding it directly to the ***.yaml*** file. It is to be noted that the training configurations are set for 8-GPU training. Hence, for training on 1 GPU, we need to set the parameters **SOLVER.IMS\_PER\_BATCH** to **2** and **SOLVER.BASE\_LR** to **0.0025**.


```text
python train_net.py --config-file configs/pascal_voc_R_50_C4_24k_model.yaml \
--num-gpus 1 MODEL.WEIGHTS pretrained_ckpts/model_epoch199.pkl \
--SOLVER.IMS_PER_BATCH 2 --SOLVER.BASE_LR 0.0025
```


N***ote:*** *However, on my desktop, running with a batch size of 2 required about 7 GB of memory. And I found that an LR of 0.01 performed better than 0.0025. You also need to change the* **SOLVER.MAX\_ITER** *argument if the batch size is decreased. I increased it to 150K from 24K with the LR decayed at steps 100K and 120K by 0.1 multiplicative factor. The hyperparameter values are subject to change depending on your application.*

We can also use ***pytorch-lightning*** for training the **FasterRCNN** model using the ***lightning\_train\_net.py*** file in the ***detectron2/tools*** directory. When using ***PyTorch Lightning*** trainer, refer to this issue for some minor changes in the training script.

[**Missing argument in SimpleTrainer.write\_metrics in training script using pytorch-lightning · Issue…**  
*Instructions To Reproduce the 🐛 Bug: Full runnable code or full changes you made: diff --git…*github.com](https://github.com/facebookresearch/detectron2/issues/5076 "https://github.com/facebookresearch/detectron2/issues/5076")

You can refer to this article for tips on training FasterRCNN using both PyTorch Lightning and conventional training loops with automatic mixed precision.

[**Train FasterRCNN faster with 16-bit precision in Detectron2**  
*One of the features of Detectron2 is that it is faster than its previous versions. Now, with the release of the…*medium.com](https://medium.com/the-owl/train-fasterrcnn-faster-with-16-bit-precision-in-detectron2-a2d644b91ef5 "https://medium.com/the-owl/train-fasterrcnn-faster-with-16-bit-precision-in-detectron2-a2d644b91ef5")

### Step 5: Evaluation

To evaluate the model, we need to pass the argument given below with the above command. One such example is


```text
python train_net.py --config-file configs/pascal_voc_R_50_C4_24k_model.yaml \
 --num-gpus 1 --eval_only MODEL.WEIGHTS /path/to/checkpoint_file
```


It is necessary to use ***— — eval-only*** before **MODEL.WEIGHTS.**

### Step 6: Inference Demo

For the inference demo, a nice explanation of how to do it step by step is given in the detectron2 repo itself. You can find it in the link given below.

[**detectron2/GETTING\_STARTED.md at main · facebookresearch/detectron2**  
*Detectron2 is a platform for object detection, segmentation and other visual recognition tasks. …*github.com](https://github.com/facebookresearch/detectron2/blob/main/GETTING_STARTED.md#inference-demo-with-pre-trained-models "https://github.com/facebookresearch/detectron2/blob/main/GETTING_STARTED.md#inference-demo-with-pre-trained-models")

---

Clap and Share if you like this article. Follow for more.

---
*Originally published on [Medium](https://medium.com/@mannasiladittya/guide-to-fine-tuning-a-pre-trained-model-for-object-detection-tasks-with-faster-rcnn-using-e2e7e190105b).*

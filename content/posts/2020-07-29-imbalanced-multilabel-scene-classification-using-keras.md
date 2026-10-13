---
title: "Imbalanced Multilabel Scene Classification using Keras"
date: 2020-07-29
categories: ["Deep Learning", "Computer Vision"]
permalink: /blog/imbalanced-multilabel-scene-classification-using-keras/
canonical_url: https://medium.com/@mannasiladittya/imbalanced-multilabel-image-classification-using-keras-fbd8c60d7a4b
tags: [deep-learning, keras, computer-vision, classification]
---
---

![](/images/blog/imbalanced-multilabel-scene-classification-using-keras/img1.jpeg)

Image [source](https://businessingmag.com/843/entrepreneuring/creating-perfect-worklife-imbalance/)

***Imbalanced*** classfication refers to the classification tasks in which the distribution of samples among the different classes are unequal. Generally, in an imbalanced classification task, the degree of imbalance can range from slight imbalance to severe imbalance, like in cases where there are only 1 example in a class. This type of tasks are very challenging and often the minority class is the more important class. Most of the classification algorithms are based on dataset which have almost balanced data distribution for all the classes. Hence, these conventional algorithms perform very badly on imbalanced datasets.

***Multilabel*** classification is different from ***Multiclass*** classification. In multiclas classification, each sample belongs to only one of the many classes. But in ***Multilabel*** classification, a single sample may belong to more than one class.

---

The data set that we are using for this project is the ***Multi-instance Multi-Label Learning*** dataset, available [here](http://www.lamda.nju.edu.cn/data_MIMLimage.ashx).

This package contains two parts:

* The “**original**” part contains 2000 natural scene images.
* The “**processed**” part contains data sets for multi-instance multi-label learning.

The image data set consists of 2,000 natural scene images, where a set of labels is assigned to each image. The number of images belonging to more than one class (e.g. *sea+sunset*) comprises over 22% of the data set, many combined classes (e.g. *mountains+sunset +trees*) are extremely rare. On average, each image is associated with 1.24 class labels. Overall, there are 5 distinct labels, ***desert***, ***mountains***, ***sea***, ***sunset***, ***trees***.

The “**processed**” part of this package contains the multi-instance multi-label data (in MATLAB format) obtained from the natural scene images. This file can be read using `scipy.io.loadmat` and then converted into a dataframe for ease of use. The `target` column contains the labels and the `class_names` field contains the class names.

Now, let us try our hands on the task. In this post we will be using Keras. However, most of the part, like processing the data and making the Data Generator (Data Loader in PyTorch) will be similar when using PyTorch. Only the code for the building the model and training will be different. Rest of the part is just simple python!

The whole code was run on Google Colab, so a few paths and linux commands need to changed before running on a local machine.

> Importing Necessary Libraries

> Data Download and Extraction

> Data Processing

To deal with the ***Multilabel*** problem, we create a separate column for the labels obtained from ***Label Powerset*** transformation of the original labels.

After this step the DataFrame `data_df` looks like this

![](/images/blog/imbalanced-multilabel-scene-classification-using-keras/img5.jpeg)

#### Result of the last line of the above code snippet

![](/images/blog/imbalanced-multilabel-scene-classification-using-keras/img6.png)

As it is very much evident that the data set at our hand is highly imbalanced if we look at the histogram created from the transformed labels.

#### Histogram for each individual label

Before splitting the dataset into training and validation dataset

![](/images/blog/imbalanced-multilabel-scene-classification-using-keras/img8.png)

The individual labels are also imbalanced.

> Data Splitting

The histogram plot of the ***Powerset*** labels in the training and validation set are shown below. We can see that some powerset labels are not present at all in the training set but are present in the validation set. These samples will really test the capability of the model.

![](/images/blog/imbalanced-multilabel-scene-classification-using-keras/img10.png)![](/images/blog/imbalanced-multilabel-scene-classification-using-keras/img11.png)

After splitting the dataset, the data distribution in the training set `train_df` is shown with the histogram plot of the individual labels.

![](/images/blog/imbalanced-multilabel-scene-classification-using-keras/img12.png)

In this dataset, there are certain combinations of the 5 labels (for example, *mountains+sunset+trees*)which contain only one example. To deal with the imbalance, we do ***Random Oversampling*** of the training dataset on the ***Powerset*** labels.

> Oversampling

Histogram of the Powerset labels after oversampling

![](/images/blog/imbalanced-multilabel-scene-classification-using-keras/img14.png)

Histogram of the individual class labels after oversampling

![](/images/blog/imbalanced-multilabel-scene-classification-using-keras/img15.png)

As, we can clearly observe that after oversampling according to the proportions of the ***Powerset*** labels, the individual classes are still imbalanced. So, for training the CNN model, we will be using ***Weighted Loss*** during the training procedure.

For each label (say, ***desert***), we will consider **occurence** (1) and **non-occurence** (0) of the label, as two classes. ***Occurence*** being the **positive** and **minority** class, and ***Non-occurence*** is considered as the **negative** and **majority** class.

> Calculating Class weights

For calculating class weights, we follow the same principle as is followed in `scikit-learn`.

> Calculating the Image Dimensions

Next, we need to create a ***Data Generator***

> Data Generator

> Checking the data

Declare a dummy data generator

`tdg = DataGeneratorKeras(True,True,preprocess_input,16)`

Call the `__getitem__(0)` method to obtain 16 images and labels.

The output looks like

![](/images/blog/imbalanced-multilabel-scene-classification-using-keras/img19.png)

From the above image we can say that the image outputs from the data generator are consistent with our requirements.

> Creating the train and validation data generators

> Creating the Model


```text
Model: “sequential” _________________________________________________________________ Layer (type)                Output Shape                Param # ================================================================= resnet50 (Model)            (None, 2048)                23587712 _________________________________________________________________ dense (Dense)               (None, 5)                   10245 ================================================================= Total params: 23,597,957 
Trainable params: 23,544,837 
Non-trainable params: 53,120 _________________________________________________________________
```


> Custom Loss Function for imbalanced classes

> Compile Model


```text
Epoch 1/10 loss: 2.5940 - binary_accuracy: 0.7481 - auc: 0.8399 - val_loss: 2.2787 - val_binary_accuracy: 0.7620 - val_auc: 0.8596 Epoch 2/10 loss: 1.5246 - binary_accuracy: 0.8951 - auc: 0.9629 - val_loss: 1.8206 - val_binary_accuracy: 0.8422 - val_auc: 0.9189 Epoch 3/10 lss: 1.1148 - binary_accuracy: 0.9292 - auc: 0.9814 - val_loss: 1.5445 - val_binary_accuracy: 0.8755 - val_auc: 0.9392 Epoch 4/10 loss: 0.8195 - binary_accuracy: 0.9487 - auc: 0.9893 - val_loss: 1.2648 - val_binary_accuracy: 0.8891 - val_auc: 0.9506 Epoch 5/10 loss: 0.6824 - binary_accuracy: 0.9586 - auc: 0.9928 - val_loss: 1.6201 - val_binary_accuracy: 0.9036 - val_auc: 0.9589 Epoch 6/10 loss: 0.5583 - binary_accuracy: 0.9655 - auc: 0.9952 - val_loss: 1.0191 - val_binary_accuracy: 0.9120 - val_auc: 0.9587 Epoch 7/10 loss: 0.4702 - binary_accuracy: 0.9719 - auc: 0.9961 - val_loss: 1.0357 - val_binary_accuracy: 0.9203 - val_auc: 0.9654 Epoch 8/10 loss: 0.4685 - binary_accuracy: 0.9749 - auc: 0.9967 - val_loss: 0.9998 - val_binary_accuracy: 0.9250 - val_auc: 0.9647 Epoch 9/10 loss: 0.3911 - binary_accuracy: 0.9773 - auc: 0.9974 - val_loss: 0.8011 - val_binary_accuracy: 0.9260 - val_auc: 0.9664 Epoch 10/10 loss: 0.3445 - binary_accuracy: 0.9804 - auc: 0.9976 - val_loss: 1.0636 - val_binary_accuracy: 0.9281 - val_auc: 0.9711
```


> Plotting the metrics

The plots are given below

![](/images/blog/imbalanced-multilabel-scene-classification-using-keras/img25.png)![](/images/blog/imbalanced-multilabel-scene-classification-using-keras/img26.png)![](/images/blog/imbalanced-multilabel-scene-classification-using-keras/img27.png)

We can see that there is slight overfitting, which can be regularized with proper techniques.

> Performance Metrics

![](/images/blog/imbalanced-multilabel-scene-classification-using-keras/img28.jpeg)

The code for obtaining the above result can be found [here](https://medium.com/the-owl/uncertainty-in-evaluation-metrics-f13f787b8daa).

[**Uncertainty in Evaluation Metrics**  
*For Classification Models!!!!*medium.com](https://medium.com/the-owl/uncertainty-in-evaluation-metrics-f13f787b8daa "https://medium.com/the-owl/uncertainty-in-evaluation-metrics-f13f787b8daa")

The code is also available in the notebook link provided at the end of this article. The code is not given here because it is too long.

> ROC curves, PR curves and the confusion matrices.

![](/images/blog/imbalanced-multilabel-scene-classification-using-keras/img29.png)![](/images/blog/imbalanced-multilabel-scene-classification-using-keras/img30.png)![](/images/blog/imbalanced-multilabel-scene-classification-using-keras/img31.png)

Labels are arranged in the order : ***desert***, ***mountains***, ***sea***, ***sunset***, ***trees***.

> Visualizing some predictions on the Validation set

![](/images/blog/imbalanced-multilabel-scene-classification-using-keras/img32.png)

Prediction results on the rare combinations from the Validation set

![](/images/blog/imbalanced-multilabel-scene-classification-using-keras/img33.png)

Prediction results

The first image contains the prediction results of the combinations which are very rarely represented in the training set. The second image contains the predicitons results from random images in the Validation Set. It can be observed that all the labels in the rare combinations are not correctly predicted. With better training strategies, the results can improve.

[**sadimanna/hobby\_projects**  
*Permalink Dismiss GitHub is home to over 50 million developers working together to host and review code, manage…*github.com](https://github.com/sadimanna/hobby_projects/blob/master/Imbalanced_Multilabel_Classification.ipynb "https://github.com/sadimanna/hobby_projects/blob/master/Imbalanced_Multilabel_Classification.ipynb")

---

Clap if you like the post or think that it will prove helpful to other learners!

---
*Originally published on [Medium](https://medium.com/@mannasiladittya/imbalanced-multilabel-image-classification-using-keras-fbd8c60d7a4b).*

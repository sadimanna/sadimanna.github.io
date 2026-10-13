---
title: "Keras vs PyTorch"
date: 2020-07-24
permalink: /blog/keras-vs-pytorch/
canonical_url: https://medium.com/@mannasiladittya/keras-vs-pytorch-27332ca13d22
tags: [deep-learning, pytorch, keras, python]
---
---

![](/images/blog/keras-vs-pytorch/img1.png)

**Keras** and **PyTorch** are both very good libraries for Machine Learning. One cannot be said to be better than the other. Both have their respective advantages ad disadvantages. In this post, we are going to see two different ways to do the same classification task, the **Keras** way and the **PyTorch** way.

The dataset that we will be using is the ***Concrete Crack Detecction Dataset.*** The dataset is available [here](https://data.mendeley.com/datasets/5y9wdsg2zt/2) or can be downloaded just by clicking this [link](https://md-datasets-public-files-prod.s3.eu-west-1.amazonaws.com/b60351e5-29e8-49a6-a83f-1e275aea6622).

Let’s download and unzip the dataset first

## Setup and Imports

## Data Preparation

In this section we will create a **Data Loader** in **PyTorch** and a **Data Generator** in **Keras**. Both essentially serve the same purpose. To ensure that each batch contains the same number of positive and negative samples we will arrange the labels in the pattern 1 0 1 0 1 0 . . ., that is each batch will contain a positive and negative sample alternatively.

### PyTorch Data Loader

### Keras Data Generator

We can also build a custom Data Generator in Keras, which is similar in structure to the Dataset class in PyTorch.

Unlike PyTorch, we don’t need a separate Data Loader like object in Keras. The above custom Data Generator `DataGeneratorKeras` can be viewed as `DataLoader(DatasetPyTorch())`.

Before proceeding further, it should be mentioned that the above Data Loader (or Generator) are tailored for the dataset we are using. For other datasets, we have to modify the code in `__init__()` part according to our need.

The images in the dataset can be split into training and validation set before passing them to the Data Generator (or Loader) by creating a dataframe `filenames_df` with the filenames of the files stored in `all_files` and then using `train_test_split` from `scikit-learn` to obtain the splits. We will obtain two dataframes, one for training set (`train_df`) and the other for validation set (`validation_df`). These dataframes can then be used to sample training and validation images in each epoch, within the respective data generators. An advantage of using dataframe is that the training set can be shuffled after each epoch, when using the custom approach.

As shown in the above code examples, we are dividing the dataset (filenames stored in `all_files`) into training and validation sets in 75:25 ratio. We can also create a dataframe (say, `train_df` from the filenames in `self.all_files` when `train = True`, and `valid_df` when `train=False`) to store the filenames and labels in the training set and similarly for the validation set. This too will enable us to shuffle the training set after each epoch.

Another thing to note here, since we are using ResNet50 model in this post, we have used the `preprocess_input` function in Keras and similarly Normalized the inputs in PyTorch. In case of using any other model, it is advisable to check what preprocessing was applied to the inputs while training the model in the original paper.

Next, we will train a pre-trained ResNet50 model on our dataset in Keras.

Let’s see how to build a model in **Keras,** using a pre-trained ResNet50 model as the base model. We will also train the model using Adam optimizer.

If we want to fine tune the model, we can set `fine_tuning = True`. In our case, we will keep `fine_tuning = False`. Since, we are posing this problem as a 2-class classification problem, we will be using Categorical Cross Entropy loss. However, we can also use Binary Cross Entropy loss, with sigmoid activation in the last layer.

The above code yielded a training accuracy of 98% after training for only 1 epoch.

## Model Training: PyTorch vs Keras

In the PyTorch approach, we use a ResNet18 model. In Pytorch, we don’t need to explicitly specify whether a softmax or a sigmoid needs to applied. The library decides that on it own depending on the Loss function used. With this model we obtained a validation accuracy of 96% after 2 epochs.

Training a model in Keras may look simpler, but when you will need a custom training loop, then the `tf.GradientTape()` comes into the picture. Let’s see an example with a custom training loop.

If we look at the custom training loop of Keras, we can see that, the training loop of PyTorch and Keras bear resemblance to each other. Both follow the same steps : *Predict the output, Calculate the Loss, Compute the gradients, Update the weights*. Only difference is that in PyTorch, the phase of operation, training or validation needs to be specified but using `model.train()` and `model.eval()`, which is not explicitly needed in Keras, when using custom training loop.

We can say that there is not much difference between the ways the two libraries are used, like the API for the layers or the Data Loader/ Generators. However, PyTorch operations bear a lot of similarity with NumPy, which makes it more Pythonic, intuitive to use and also easy to debug. Keras (tf.Keras) also has its own advantages, like portability, ease of model deployment, and of course, TensorBoard.

## Summary & Conclusion

As said earlier, both have their own advantages and disadvantages, and one cannot be ruled out or claimed to be better than the other. It depends on the person using it and the purpose it is being used for.

---

Please clap if you found it useful for you or feel that it will be of help to others.

---
*Originally published on [Medium](https://medium.com/@mannasiladittya/keras-vs-pytorch-27332ca13d22).*

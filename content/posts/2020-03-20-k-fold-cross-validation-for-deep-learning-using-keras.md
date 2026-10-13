---
title: "K-Fold Cross Validation for Deep Learning using Keras"
date: 2020-03-20
categories: ["Deep Learning", "Machine Learning"]
permalink: /blog/k-fold-cross-validation-for-deep-learning-using-keras/
canonical_url: https://medium.com/@mannasiladittya/k-fold-cross-validation-in-keras-3ec4a3a00538
tags: [deep-learning, keras, machine-learning, cross-validation]
---
---

*with a little help from scikit-learn*

Machine Learning models often fails to generalize well on data it has not been trained on. Sometimes, it fails miserably, sometimes it gives somewhat better than miserable performance. To be sure that the model can perform well on unseen data, we use a re-sampling technique, called **Cross-Validation**.

We often follow a simple approach of splitting the data into 3 parts, namely, ***Train***, ***Validation*** and ***Test*** sets. But this technique does not generally work well for cases when we don’t have a large datasets. When we have limited data, dividing the dataset into Train and Validation sets may casue some data points with useful information to be excluded from the training procedure, and the model fails to learn the data distrubution properly.

## What is K-Fold Cross Validation?

![](/images/blog/k-fold-cross-validation-for-deep-learning-using-keras/img1.png)

K-Fold CV gives a model with less bias compared to other methods. In K-Fold CV, we have a paprameter ‘***k***’. This parameter decides how many folds the dataset is going to be divided. Every fold gets chance to appears in the training set (***k-1***) times, which in turn ensures that every observation in the dataset appears in the dataset, thus enabling the model to learn the underlying data distribution better.

The value of ‘***k***’ used is generally between 5 or 10. The value of ‘***k***’ should not be too low or too high. If the value of ‘***k***’ is too low (say ***k*** = 2), we will have a highly biased model. This case is similar to that of splitting the dataset into training and validation sets, hence the bias will be high and variance low. If the value of ‘***k***’ is large (say ***k*** = ***n*** (the number of observations)), then this approach is called **Leave One Out CV** (**LOOCV**). In this case, bias will be low but the variance will be high and the model will overfit, resulting in the model to fail in generalizing over the test set.

Another approach is to shuffle the dataset just once prior to splitting the dataset into ***k*** folds, and then split, such that the **ratio** of the observations in each class remains the same in each fold. Also the test set does not overlap between consecutive iterations. This approach is called ***Stratified K-Fold CV***. This approach is useful for imbalanced datasets.

## Implementation in Keras

### 1. Importing Required Libraries

Importing Required Libraries

Here, we are assuming that all the images in Train set are in the folder ***train*** and the labels of corresponding image files are in a csv file, say ***training\_labels.csv***, which has two columns, ***filename*** and ***label***.

![](/images/blog/k-fold-cross-validation-for-deep-learning-using-keras/img3.jpeg)

Sample image for training\_labels.csv

The column ***filename*** either contains only the name of the image file or the whole path to the image file. In case it does not contain the whole file path, otherwise we have to pass the path to the directory in which the images are stored as the ***directory*** argument. If one wants to use the method ***flow\_from\_directory***, then one have to move image files in and out of the folders for each class for any two of the ***k*** folds, ***k*** number of times, since this method requires the images belonging to one class are present in respective folders under a single master directory. Hence, we can add the path to the image file names, in the csv files.

### 2. Reading Labels and Creating Splits

Reading the training\_labels.csv and creating instances of KFold and StratifiedKFold classes from sklearn

We don’t need to create **X**, because as mentioned in the documentation page for [**StratifiedKFold**](https://scikit-learn.org/stable/modules/generated/sklearn.model_selection.StratifiedKFold.html) , it is sufficient to provide only the labels **Y** to generate the splits and hence we can put `np.zeros(n_samples)` instead of **X**.

### 3. Setting Up ImageDataGenerator


```text
idg = ImageDataGenerator(width_shift_range=0.1,
                         height_shift_range=0.1,
                         zoom_range=0.3,
                         fill_mode='nearest',
                         horizontal_flip = True,
                         rescale=1./255)
```


It can be seen, that the ***validation\_split*** argument is not given any value as we will be creating the validation set using one of the ***k*** splits.

We also need to save the best model in each fold.

### 4. Helper Function for Model Checkpointing


```python
def get_model_name(k):
    return 'model_'+str(k)+'.h5'
```


### 5. Training Across K Folds

This piece of code is shown only for ***K-Fold*** CV. For ***Stratified K-Fold*** CV, just replace ***kf*** with ***skf.***

***create\_new\_model***() function return a model for each of the ***k*** iterations. New data generators are created in each iteration as the training data and the validation data changes. ***checkpoint*** callback is also created with each iteration because to save the best model ineach iteration, we need to give a different file name for the model file in each iteration, otherwise it will be overwritten by the files in the successive iterations. For evaluating the model in each iteration, the weights of the best model is loaded before the ***model***.***evaluate***() is run. The performance of the models on the validation set is stored at the end.

We can now get the average performance of the model from the list **VALIDATION\_ACCURACY**.

## References

1. [*https://en.wikipedia.org/wiki/Cross-validation\_(statistics)*](https://en.wikipedia.org/wiki/Cross-validation_%28statistics%29)
2. [*https://scikit-learn.org/stable/modules/cross\_validation.html#cross-validation*](https://scikit-learn.org/stable/modules/cross_validation.html#cross-validation)
3. [*https://machinelearningmastery.com/k-fold-cross-validation/*](https://machinelearningmastery.com/k-fold-cross-validation/)
4. [*https://medium.com/@vijayabhaskar96/tutorial-on-keras-imagedatagenerator-with-flow-from-dataframe-8bd5776e45c1*](https://medium.com/@vijayabhaskar96/tutorial-on-keras-imagedatagenerator-with-flow-from-dataframe-8bd5776e45c1)
5. [*https://keras.io/preprocessing/image/*](https://keras.io/preprocessing/image/)

---
*Originally published on [Medium](https://medium.com/@mannasiladittya/k-fold-cross-validation-in-keras-3ec4a3a00538).*

---
title: "Evaluation Metrics Part 1"
date: 2020-06-20
categories: ["Machine Learning", "Data Science"]
permalink: /blog/evaluation-metrics-part-1/
canonical_url: https://medium.com/@mannasiladittya/evaluation-metrics-e32d66cd5588
tags: [machine-learning, data-science, evaluation-metrics, statistics]
---
---

![](/images/blog/evaluation-metrics-part-1/img1.jpeg)

Image [Source](https://www.google.com/url?sa=i&url=https%3A%2F%2Fhatrabbits.com%2Fen%2Fevaluate-brainstorm-ideas%2F&psig=AOvVaw3kFzuueGWrUAbpauhyWvNr&ust=1592774291429000&source=images&cd=vfe&ved=0CA0QjhxqFwoTCIjDheWokeoCFQAAAAAdAAAAABAE)

When building a statistical or machine learning model, it is very important to evaluate the model. Evaluation metrics are used to evaluate the quality of the machine learning model and comprise an essential part of any project. To make improvements to our model, to achieve desirable performance, it is necessary to use such metrics to get feedback, to have an idea about the robustness or the generlization capability of the model.

> **Let us first look into some metrics which are often used to express other metrics easily**

#### True Positive (TP)

Number of samples which are predicted positive and are also labeled as positive.

#### True Negative (TN)

Number of samples which are predicted negative and are also labeled as negative.

#### False Positive (FP)

> Type-I error

Number of samples which are predicted positive but are actually labeled negative.

#### False Negative (FN)

> Type-II error

Number of samples which are predicted negative but are actually labeled positive.

![](/images/blog/evaluation-metrics-part-1/img6.png)

PICTORIAL REPRESENTATION

#### Confusion Matrix

![](/images/blog/evaluation-metrics-part-1/img7.png)

Image [Source](https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.researchgate.net%2Ffigure%2FModified-Confusion-Matrix-Table-for-Accuracy-Prediction-of-24_fig4_319183193&psig=AOvVaw1ogbgqQsxk3Qxs5p-54Hrh&ust=1592773259977000&source=images&cd=vfe&ved=0CA0QjhxqFwoTCLCMqI-lkeoCFQAAAAAdAAAAABAV)

Confusion matrix is a table used to describe the performance of a classification model. Confusion matrix is composed of four parts, TP,TN,FP,FN (which have already been discussed). It is very useful for measuring these evaluation metrics.

### ***Accuracy***

*Accuracy* is the proportion of the samples predicted correctly. It is one of the most common metric used. *Accuracy* can be expressed in terms of above four metrics as:

![](/images/blog/evaluation-metrics-part-1/img9.png)

Accuracy

However, this metric doesn’t prove to be very useful in case of imbalanced dataset. Suppose, in a dataset, there are psotive and negative samples in the ration of 83 : 17. And the model you build, predicts positive for all samples, then for your model, TP, TN, FP, FN values are 83, 0, 17 and 0 respectively. The accuracy of the model is then calculated to be 83%. However, this model you built does not predict any of the negative samples correctly, and this is not at all desirable.

Two metrics which can resolve this issue we can face when using accuracy, by providing with a different outlook towards the problem at hand, are ***Precision*** and ***Recall.***

So, what is this different outlook?

#### Precision

> Positive Predictive Value

Precision is the proportion of the samples which are truly positive out of all the positively predicted samples. It actually gives us the fraction of samples which were correctly predicted, out of all the positively predicted samples.

![](/images/blog/evaluation-metrics-part-1/img10.png)

Precision

#### Recall

> Probability of Detection

Recall is the proportion of the samples which are correctly predicted positive out of all the actually positively labeled samples. That is, it gives us the fraction of the positively labeled samples which have been correclty predicted by the model.

![](/images/blog/evaluation-metrics-part-1/img12.png)

Recall

#### Sensitivity

> True Positive Rate, Power

***Sensitivity*** is same as ***Recall***.

![](/images/blog/evaluation-metrics-part-1/img14.png)

Sensitivity

#### Specificity

> True Negative Rate

***Specificity*** is the proportion of negatively labeled samples which are predicted correctly, that is, predicted negative.

![](/images/blog/evaluation-metrics-part-1/img15.png)

specificity

#### F1 Score

*F1 score* is the weighted Harmonic Mean of *Precision* and *Recall*. In case of imbalanced dataset, *F1 score* is a good evaluation metric to be used, as it also takes into account FP and FN, along with TP and TN.

General formula for F-score is

![](/images/blog/evaluation-metrics-part-1/img17.png)

F1-score or balanced F-score is expressed as

![](/images/blog/evaluation-metrics-part-1/img18.png)

#### Precision-Recall Curve

A precision-recall curve shows the relation between precision and recall for every possible threshold value. Recall is plotted along the x-axis and Precision is plotted along the y-axis. One important note about PR curve is that TN is not used in making the PR curve.

![](/images/blog/evaluation-metrics-part-1/img20.png)

Image [Source](https://www.google.com/url?sa=i&url=http%3A%2F%2Fscikit-learn.org%2Fstable%2Fauto_examples%2Fmodel_selection%2Fplot_precision_recall.html&psig=AOvVaw10-N0n8lqe4botnE1_vkEh&ust=1592771999719000&source=images&cd=vfe&ved=0CA0QjhxqFwoTCMDozZ6gkeoCFQAAAAAdAAAAABAD)

---

Check out Part [2](https://medium.com/@mannasiladittya/evaluation-metrics-part-2-756e380cd7f3), [3](https://medium.com/the-owl/evaluation-metrics-part-3-47c315e07222) and [4](https://medium.com/the-owl/uncertainty-in-evaluation-metrics-f13f787b8daa) for more on Evaluation Metrics and how to measure uncertainty related to evaluation metrics.

---

Part 2 :

[**Evaluation Metrics Part 2**  
*Explained and Implemented!!*medium.com](https://medium.com/@mannasiladittya/evaluation-metrics-part-2-756e380cd7f3 "https://medium.com/@mannasiladittya/evaluation-metrics-part-2-756e380cd7f3")

Part 3 :

[**Evaluation Metrics Part 3**  
*ROC Curve and AUC score Explained and Implemented!!!*medium.com](https://medium.com/the-owl/evaluation-metrics-part-3-47c315e07222 "https://medium.com/the-owl/evaluation-metrics-part-3-47c315e07222")

Part 4 :

[**Uncertainty in Evaluation Metrics**  
*Explained and Implemented!!!!*medium.com](https://medium.com/the-owl/uncertainty-in-evaluation-metrics-f13f787b8daa "https://medium.com/the-owl/uncertainty-in-evaluation-metrics-f13f787b8daa")

---
*Originally published on [Medium](https://medium.com/@mannasiladittya/evaluation-metrics-e32d66cd5588).*

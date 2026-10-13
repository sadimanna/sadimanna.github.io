---
title: "An elegant way to split a Dataset into Train, Validation, and Test splits in Batch Script"
date: 2023-06-09
categories: ["Data Science", "Developer Tools"]
permalink: /blog/an-elegant-way-to-split-a-dataset-into-train-validation-and/
canonical_url: https://medium.com/@mannasiladittya/an-elegant-way-to-split-a-dataset-into-train-val-and-test-splits-in-batch-script-db61c108ea35
tags: [batch-script, data-science, dataset-split, windows]
---
---

![](/images/blog/an-elegant-way-to-split-a-dataset-into-train-validation-and/img1.png)

Researchers and Engineers alike, often use `train_test_split` from `scikit-learn` or pre-defined splits to split a dataset into train, validation, or test sets.

In the post linked below, we can see how to split a dataset into the train, validation, and test splits using Shell script.

[**An elegant way to split a Dataset into Train, Validation, and Test splits in Shell Script**  
*Researchers and Engineers alike, often use train\_test\_split from scikit-learn library or rely on existing split…*medium.com](https://medium.com/the-owl/an-elegant-way-to-split-a-dataset-into-train-validation-and-test-splits-in-shell-script-3abc2491f20e "https://medium.com/the-owl/an-elegant-way-to-split-a-dataset-into-train-validation-and-test-splits-in-shell-script-3abc2491f20e")

#### However, we cannot run shell script in Windows unless converted to Batch script.

So, let’s see how to do the same operations in the Batch script.

Firstly, let’s see how to split images in a single folder into train, val, and test folders.

We considered a train: val: test split of 25:25:50. So, the values indicated by `train_split` , `valid_split` and `test_split` are the cumulative values. The code in line 26, outputs a random number between 0 and 99 which is used to split the images into train, val, or test folders.

To split the labels or masks corresponding to the images in the train, val, or test splits,

Repeat the above for the other splits as well.

### To split a dataset with subfolders for each class

We need to iterate over the subfolders and move an image to either of the three splits.

Let us see how we can do that

If there are labels associated with each sample, then those can also be split according to the previous snippet.

---

Clap and Share if you like the post. Follow for more.

---
*Originally published on [Medium](https://medium.com/@mannasiladittya/an-elegant-way-to-split-a-dataset-into-train-val-and-test-splits-in-batch-script-db61c108ea35).*

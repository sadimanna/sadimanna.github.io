---
title: "Creating a TF Dataset using a Data Generator"
date: 2021-08-21
categories: ["Deep Learning", "TensorFlow"]
permalink: /blog/creating-a-tf-dataset-using-a-data-generator/
canonical_url: https://medium.com/@mannasiladittya/creating-a-tf-dataset-using-a-data-generator-5e5564609e64
tags: [deep-learning, tensorflow, data-pipeline, python]
---
---

![](/images/blog/creating-a-tf-dataset-using-a-data-generator/img1.png)

Source : [GitHub](https://camo.githubusercontent.com/c04e16c05de80dadbdc990884672fc941fdcbbfbb02b31dd48c248d010861426/68747470733a2f2f7777772e74656e736f72666c6f772e6f72672f696d616765732f74665f6c6f676f5f736f6369616c2e706e67)

In this article, we are going to build a ***tf.data.Dataset*** from a **data generator**. This data generator will perform *data fetching*, *pre-processing*, *augmentations* within itself.

We will be using the ***array*** dataset for this article, that is, the data and labels are stored in an array. If the dataset can’t be stored in an array, we can create a DataFrame from the filenames and use it in place of the data array. By changing some methods, this generator can be adapted to any dataset.

One important feature of the generator is that it should be callable. For this, we need the method ***\_\_call\_\_.***

Let us look at a sample code for creating such a Generator

#### Instantiate a Generator


```text
dg = ArrayDataset(‘train’, tr_x, tr_y, mean, std, transforms)
```


**mean** and **std** will depend on the dataset and **transforms** is a function passed to augment the data.

#### Instantiate a Dataset


```text
ot = (tf.float32, tf.int64)
os = (tf.TensorShape([tr_x.shape[1:]), tf.TensorShape([]))
ds = tf.data.Dataset.from_generator(dg, 
                                    output_types = ot, 
                                    output_shapes = os)
ds = ds.batch(BATCH_SIZE)
```


To use this Dataset in training, we can just iterate over it like


```text
for batch in ds:
    x,y = batch
    # Training step
```


---

Here is the link to the Colab notebook  
<https://colab.research.google.com/drive/1pH9NKhAHT40ygOOf4bwld8j221r9SRq_?usp=sharing>

---

Clap if you find this post useful. Comment your feedback, if any.

---
*Originally published on [Medium](https://medium.com/@mannasiladittya/creating-a-tf-dataset-using-a-data-generator-5e5564609e64).*

---
title: "The Art of Loading Custom Objects and Functions in Keras"
date: 2023-08-28
categories: ["Deep Learning", "Frameworks"]
permalink: /blog/the-art-of-loading-custom-objects-and-functions-in-keras/
canonical_url: https://medium.com/@mannasiladittya/the-art-of-loading-custom-objects-and-functions-in-keras-6fdea8ed52b9
tags: [deep-learning, keras, tensorflow, model-saving]
---
---

![](/images/blog/the-art-of-loading-custom-objects-and-functions-in-keras/img1.jpeg)

In the articles mentioned below,

[**Weighted Categorical Cross-Entropy Loss in Keras**  
*In this article, we will be looking at the implementation of the Weighted Categorical Cross-Entropy loss.*medium.com](https://medium.com/the-owl/weighted-categorical-cross-entropy-loss-in-keras-edaee1df44ee "https://medium.com/the-owl/weighted-categorical-cross-entropy-loss-in-keras-edaee1df44ee")

and

[**Weighted Binary Cross-Entropy Loss in Keras**  
*While there are several implementations to calculate weighted binary and cross-entropy losses widely available on the…*medium.com](https://medium.com/the-owl/weighted-binary-cross-entropy-losses-in-keras-e3553e28b8db "https://medium.com/the-owl/weighted-binary-cross-entropy-losses-in-keras-e3553e28b8db")

We saw how to save custom objects by registering them to a global list.

*Disclaimer*: All the codes in the articles mentioned above and in this article were done in **TFv2.12** and **Keras-2.12.0** in a Kaggle Notebook environment. Updated frameworks may behave differently.

> But, will we face any issues if we try to load our model in an entirely different script or notebook? Or resume training in the same notebook later?

Suppose you have used two custom objects in your model, one custom loss object and a custom learning rate scheduler. Also, suppose you have used ***tf.keras.optimizers.Adam*** as the optimizer. I noticed during my implementation that, if you use ***model.save***(‘*model\_name.keras*’) to save your model, the optimizer will be treated as a custom object. (*Probably will publish a separate article explaining that, but for now, let us go with it.*)

If the model is saved using ***model.save***(‘*model\_name.keras*’), then the model needs to be loaded with ***keras.models.load\_model***(...). Before loading the model, the custom loss object and the custom learning rate scheduler need to be defined in the training notebook or script. As ***tf.keras.optimizers.Adam*** is already a built-in object; it need not be defined again. Rather, we can pass it as a custom object to the ***keras.models.load\_model*** function, like this:


```text
model = keras.models.load_model(‘path/to/saved/model’, custom_objects = {“Custom>Adam”: tf.keras.optimizers.Adam})
```


Since the other custom objects were already registered when saving the model, they need not be passed into the ***custom\_objects*** dictionary.

The final structure goes as follows:

> For Training


```text
#### Training
tf.keras.saving.get_custom_objects().clear()
```


> For Inference


```python
### Inference
tf.keras.saving.get_custom_objects().clear()

#### Custom Loss Function
@tf.keras.saving.register_keras_serializable(name=”weighted_binary_crossentropy”)
def weighted_binary_crossentropy(target, output, weights):
    ...

@tf.keras.saving.register_keras_serializable(name=”WeightedBinaryCrossentropy”)
class WeightedBinaryCrossentropy:
    def __init__(
    ...

#### Custome LR Scheduler
@tf.keras.saving.register_keras_serializable(name=”Cosine Decay”)
class CosineDecay:
    def __init__(
    ...

model = tf.keras.models.load_model(‘path/to/model’, custom_objects = {“Custom>Adam”: tf.keras.optimizers.Adam})
```


If any model from other packages, like ***keras\_cv,*** is used, then that needs to be passed into the ***custom\_objects*** dictionary too. I faced some custom module serializing related issues when saving a model that used the ResNet backbone from ***keras\_cv***.

---

However, using the **SavedModel** format is different from the high-level ***.keras*** format. Quoting TF documentation

> The key difference between high-level `.keras`/HDF5 formats and the low-level **SavedModel** format is that the `.keras`/HDF5 formats uses object configs to save the model architecture, while SavedModel saves the execution graph. Thus, SavedModels are able to save custom objects like subclassed models and custom layers without requiring the original code. However, debugging low-level SavedModels can be more difficult as a result, and we recommend using the high-level `.keras` format instead due to its name-based, Keras-native nature.

To save the model in the **SavedModel** format, we can just use the same method ***model.save***(‘*saved\_folder*/*modelname*’) and load using ***tf.keras.models.load\_model***. This is a workaround when using the custom objects, as it saves the graph altogether. In the next post, we will explore in detail the differences between **SavedModel** and the***.keras/h5*** format.

---

Clap and share if you liked the article. Follow for more.

---
*Originally published on [Medium](https://medium.com/@mannasiladittya/the-art-of-loading-custom-objects-and-functions-in-keras-6fdea8ed52b9).*

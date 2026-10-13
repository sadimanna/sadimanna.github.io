---
title: "Statistical Learning Theory Part 4"
date: 2021-06-21
categories: ["Machine Learning", "Mathematics"]
permalink: /blog/statistical-learning-theory-part-4/
canonical_url: https://medium.com/@mannasiladittya/statistical-learning-theory-part-4-f79408cdbf44
tags: [machine-learning, statistical-learning, mathematics, vapnik]
---
---

![](/images/blog/statistical-learning-theory-part-4/img1.jpeg)

Image Credits: [Source](https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.freepik.com%2Ffree-photos-vectors%2Fpattern&psig=AOvVaw1ghdDrLc9a2nwAKIW0PUmm&ust=1624381304173000&source=images&cd=vfe&ved=0CAoQjRxqFwoTCJDWpoeaqfECFQAAAAAdAAAAABAD)

Suppose, we have data distributed according to the probability distribution function **P(*x*).** An element ***x*** appears randomly and independently according to the distribution **P(*x*).**

Again, suppose you are the *supervisor.* You classify and label each such element ***x*** into ***k*** classes. We denote the distribution according to which the supervisor, that is, you carry out the classification, using **P(*ω*|*x*),** where **ω** ∈ {**0**, **1**,..,**k-1**}.

## Pattern Recognition Problem Formulation

In a Pattern Recognition problem, neither the data distribution **P(*x*)**, nor the conditional probability distribution **P(ω|*x*)** is known. But, we do have the empirical data ***x*** and if **P(*x*)** and **P(ω|*x*)** exist, then **P(ω, *x*) = P(ω|*x*).P(*x*)** alsoexists.

## The Risk Functional

From the [previous article](https://medium.com/the-owl/statistical-learning-theory-part-3-e313539fe13c) in this series

[**Statistical Learning Theory Part 3**  
*Approaches to the Learning Problem Part 1*medium.com](https://medium.com/the-owl/statistical-learning-theory-part-3-e313539fe13c "https://medium.com/the-owl/statistical-learning-theory-part-3-e313539fe13c")

we can learn that in the problem of risk minimization from empirical data, the objective is to select a function **g\*(*z*)** based on a criterion,from a set of functions {**g**(***z***)}such that the **RISK**

> **R(g(*z*)) = ∫ L(*z*,g(*z*)) dF(*z*)**

is minimized (where **F(*z*)** is the probability distribution function on ***Z*** ).

Reformulating the risk functional in the parametric form, we get

> **R(*α*) = ∫ Q(*z*,*α*) dF(*z*), α ∈ Λ**

where,

> Q(z,α) = L(z,g(z,α))

is called the **Loss function.**

---

Now, for the pattern recognition problems, the set of functions **g(*x*,α)** will be such that they take only values from the set **{0, 1, …, k-1}.** Also, note that the empirical data consisting of a random independent sample of pairs

![](/images/blog/statistical-learning-theory-part-4/img2.png)

is given.

## Simplest Loss Function for Classification

Consider the simplest loss function

![](/images/blog/statistical-learning-theory-part-4/img3.png)

where, **L**(***ω***,**g**(***x***,***α***)) = 1 if ***ω*** ≠ **g** and 0 otherwise. This loss function does not contribute to the total risk if the decision given by the function **g**(***x***,***α***) is correct but adds 1 for every incorrect decision made.

The problem of pattern recognition is to minimize the risk functional

> R(α) = ∫ L(ω, g(x,α)) dF(ω, x)

over the set of functions **g**(***x***,**α**), **α** ∈ **Λ** and the given empirical data.

The above expression for the risk functional actually denotes the probability of classification error for any decision rule **g**(***x***,***α***).

### Derivation and Joint Distribution

Since, **F**(***ω***,***x***) is the cumulative joint distribution function

![](/images/blog/statistical-learning-theory-part-4/img4.png)

since ω takes only discrete values from the set {0, 1, .., k-1}.

So, we can write **dF**(***ω***,***x***) as

![](/images/blog/statistical-learning-theory-part-4/img5.png)

Thus, the risk functional **R**(**α**) can be written as

![](/images/blog/statistical-learning-theory-part-4/img6.png)

For a chosen ***α***, **g**(***x***,***α***) gives the decisions on the random independent samples of empirical data. If all the decisions of the function **g**(***x***,***α***) are wrong, the risk functional value becomes equal to **F**(***k-1***,**∞**), i.e. **1**. Otherwise, we can say that **R**(***α***) ≤ **1**. This follows the rule of probability.

---

For a binary classification problem and for a single sample ***x*** (let’s say this is a positive sample, i.e. ***ω*** = **1**), if the sample is misclassified then,

> **R**(***α***) = **L**(**1**, **g**(***x***,***α***)). ***f***(1,x) + **L**(**0**, **g**(***x***,***α***)). ***f***(0,x) = ***f***(1***,x***) = 1

Had the decision rule correctly classified the sample ***x***, then

> R(α) = L(1, g(x,α)). f(1,x) + L(0, g(x,α)). f(0,x) = f(0,x) = 0

---

However, the joint distribution are not this simple in real-life data and often have multivariate properties. The discrete values will be replaced by probability values in the above equations.

---

The problem of pattern recognition can thus be reduced to a problem of risk minimization based on the empirical data even though the Cumulative Joint Distribution Function **F**(***ω***,***x***) is unknown.

---

## Restrictions on Loss Functions

The set of loss functions **Q**(**z**,**α**) is not arbitrary and follows the following restrictions:

1. The vector ***z*** consists of **n+1** coordinates: coordinate **ω,** which takes on only a finite number of values and **n** coordinates which form the **n**-dimensional vector ***x.  
   z* = [ω , *x*]**
2. The set of functions **Q**(**z**,**α**), **α** ∈ **Λ**, is given by **L**(***ω***, **g**(***z***,***α***)) and takes only finite values.

This specific feature of the risk minimization problem characterizes the pattern recognition problem.

---

Next, we will look into the problem of regression estimation.

---

## Reference

Vapnik, V. N. (1998). *Statistical Learning Theory*. Wiley-Interscience.

---

Please clap on this story if you like it!!

For the previous articles in this series click the links below

[**Statistical Learning Theory Part 1**  
*Introduction to Statistical Learning Theory*medium.com](https://medium.com/the-owl/statistical-learning-theory-part-1-aa00d522557e "https://medium.com/the-owl/statistical-learning-theory-part-1-aa00d522557e")

[**Statistical Learning Theory Part 2**  
*Approaches to the Learning Problem Part 0*medium.com](https://medium.com/the-owl/statistical-learning-theory-part-2-b5a0df4bebf5 "https://medium.com/the-owl/statistical-learning-theory-part-2-b5a0df4bebf5")

[**Statistical Learning Theory Part 3**  
*Approaches to the Learning Problem Part 1*medium.com](https://medium.com/the-owl/statistical-learning-theory-part-3-e313539fe13c "https://medium.com/the-owl/statistical-learning-theory-part-3-e313539fe13c")

---
*Originally published on [Medium](https://medium.com/@mannasiladittya/statistical-learning-theory-part-4-f79408cdbf44).*

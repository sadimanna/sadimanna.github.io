---
title: "Statistical Learning Theory Part 1"
date: 2020-06-25
permalink: /blog/statistical-learning-theory-part-1/
canonical_url: https://medium.com/@mannasiladittya/statistical-learning-theory-part-1-aa00d522557e
tags: [machine-learning, statistical-learning, mathematics, probability]
---
---

![](/images/blog/statistical-learning-theory-part-1/img1.png)

[source](https://statisticallearningtheory.wordpress.com/home/)

### Introduction

In the 1920s, Fisher described different problems of estimating functions from given data as the problems of parameter estimation of specific models and suggested the Maximum Likelihood method for estiamting the unknown parameters in all these models.

Glivenko and Cantelli proved that the empirical distribution function converges to the actual distribution function and Kolmogorov found the asymptotically exact rate of this convergence to be exponentially fast and independent of the unknown distribution function.

These two events gave birth to two main approaches to statistical inference, Parametric and Non-parametric inference. Parametric inference aims to create simple statistical methods of inference that can be used for solving real-life problems. Non-parametric inference, on the other hand, aims to find one inductive method for any problem of statistical inference.

The parametric inference is based on the assumption that the processes generating the stochastic properties of the data and the function whose finite parameters needs to be estimated are known to the person handling the data and for this one adopts the Maximum Likelihood method.

Non-parametric inference, on the other hand, assumes that one does not have a priori information about the process or the function to be approximated, and thus finding a method for approximating the function from the data is necessary.

The three beliefs that form the basis of the classical parametric paradigm are:

1. *To find a functional dependency from the data, it is possible to find a set of functions, linear in their parameters, that contains a good approximation to the desired function, and the number of free parameters describing this set is small.*
2. *The statistical law underlying the stochastic component of most real-life problems involving a large number of random components is described by the normal law.*
3. *The Maximum Likelihood method is a good tool for estimating parameters.*

However, the parametric inference paradigm has its own shortcomings.

1. *Curse of Dimensionality: Increasing the number of dimensions increases the required amount of computational resources exponentially.*
2. *Statistical components of Real-life problems distributions are described by only classical statistical distribution functions.*
3. *The maximum Likelihood method does not perform best for some simple problems of density estimation.*

In 1958, after F. Rosenblatt suggested the **Perceptron** for solving simple learning problems, several different learning machines were suggested. The general induction principle that these machines implemented was the so-called ***Empirical Risk Minimization*** (ERM) principle. The ERM principle suggests a decision rule (an indicator function) that minimizes the number of training errors.

However, the issues which drove the development of the ERM theory, that is, to describe **the necessary and sufficient conditions for which the ERM method defines functions that** **converge to the** **best possible solution with an increasing number of observations** and to estimate **both the probability of error for the function that minimizes the empirical risk on the given set of training examples and how close this probability (*of error*) is to the smallest possible for the given set of functions**. The resulting theorems described the Qualitative model and the Generalization ability of the ERM principle respectively.

To construct the general theory of the ERM method for pattern recognition, a generalization of the **Glivenko-Cantelli-Kolmogorov theory** was made:

1. *For any given set of events, to determine whether the uniform law of large numbers holds.*
2. *If uniform convergence holds, to find the bounds for the* ***nonasymptotic*** *rate of uniform convergence*.

These bounds are generalizations of Kolmogorov’s bound in two respects :

1. *They must be valid for a finite number of observations.*
2. *They must be valid for any set of events.*

This theory gave rise to the concept of capacity for a set of events (a set of indicator functions). Out of these, the concept of the ***VC dimension*** is of particular importance. **VC dimension** of a set of events characterizes the variability of the set of events. Both the necessary and sufficient conditions of consistency and the rate of convergence of the ERM principle depend on the capacity of the set of events implemented by the learning machine.

For any level of confidence, an equivalent form of the bounds for the rate of uniform convergence define bounds on the probability of the test error *simultaneously for all functions of the learning machine* as a function of the number of training errors, of the VC Dimension of the set of functions implemented by the learning machine and of the number of observations. Achieving this form of bounds has two requirements — to minimize the number of training error and to use a set of functions with a small **VC dimension.** The above two requirements are contradictory. That is, to minimize the number of training errors, one needs to choose from a wide set of functions, rather than a narrow set with a small **VC dimension**. Hence, finding the best-guaranteed solution requires making a compromise between the *accuracy of approximation of the training data* and the *capacity (***VC dimension***) of the set of functions*, that is used to minimize the number of errors. This idea of minimizing the test error by making a trade-off between these two factors was formalized by introducing a new induction principle, known as the ***Structured Risk Minimization*** principle.

Two important points in connection with the capacity concept :

1. *Capacity determines both the necessary and sufficient conditions for consistency of learning processes and the rate of convergence of learning processes and thus reflects intrinsic properties of inductive inference.*
2. *Naive notions of complexity do not reflect capacity properly.*

In many real-life problems, the goal is to find the values of an unknown function only at points of interest (test set). To do this, first, we find an estimation of the function from a given set of functions using inductive inference, and then we use that function to evaluate the values of the unknown function at the points of interest. Thus, we solve a problem that is more general in nature than we need to solve. But in cases where we have a limited amount of data, we cannot estimate the values of the function at all points of its domain but can estimate the values of the unknown function reasonably well at given points of interest. This type of inference is called ***transductive inference***.

---

IF YOU LIKED THE ARTICLE AND WANT TO READ MORE ON THE TOPIC, PLEASE CLICK THE LINKS BELOW

[**Statistical Learning Theory Part 2**  
*Approaches to the Learning Problem Part 0*medium.com](https://medium.com/the-owl/statistical-learning-theory-part-2-b5a0df4bebf5 "https://medium.com/the-owl/statistical-learning-theory-part-2-b5a0df4bebf5")

[**Statistical Learning Theory Part 3**  
*Approaches to the Learning Problem Part 1*medium.com](https://medium.com/the-owl/statistical-learning-theory-part-3-e313539fe13c "https://medium.com/the-owl/statistical-learning-theory-part-3-e313539fe13c")

---

### Reference

*Statistical Learning Theory* by**Vladimir N. Vapnik**

---
*Originally published on [Medium](https://medium.com/@mannasiladittya/statistical-learning-theory-part-1-aa00d522557e).*

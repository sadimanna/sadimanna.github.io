---
title: "Solving Integer Partitioning Problem using Python"
date: 2020-09-08
categories: ["Algorithms", "Python"]
permalink: /blog/solving-integer-partitioning-problem-using-python/
canonical_url: https://medium.com/@mannasiladittya/integer-partition-problem-3b231a9ba8e1
tags: [python, algorithms, mathematics, combinatorics]
---
---

![](/images/blog/solving-integer-partitioning-problem-using-python/img1.png)

Partitioning 5 into integers

### What is Integer Partitioning Problem?

In **Number Theory** and **Combinatorics**, the partition of a positive integer ***N*** into a multiset of positive integers, such that the elements sum to N. The number of partitions of the positive integer ***N*** is denoted by ***pₙ***.

> The partitions of 5 are :

> 5

> 3 + 2

> 4 + 1

> 3 + 1 + 1

> 2 + 2 + 1

> 2 + 1 + 1 + 1

> 1 + 1 + 1 + 1 + 1

> Thus ***p₅*** = 7

The number of partitions can be found using Generating Functions **GF**(***x***). In fact, the total number of partitions ***pₙ*** is equal to the co-efficient of ***xⁿ*** in **GF**(***x***)

The number of times a certain part is included in a partition formation is reflected in the generating function. Thus for any number of repetitions of any part ***k*** the generating function for ***k*** becomes

![](/images/blog/solving-integer-partitioning-problem-using-python/img2.png)

For all such parts, we multiply the individual generating functions, to get

![](/images/blog/solving-integer-partitioning-problem-using-python/img3.png)

The above one is an infinite product. If we want a particular coefficent ***pₙ*** we need only multiply out these factors involving ***x*** to a power ***n*** or less and are only finitely many of these terms.

To get a finite product, we can calculate the generating function by multiplying polynomials which are finite geometric series. The factor for each part ***k*** is expressed as

![](/images/blog/solving-integer-partitioning-problem-using-python/img4.png)
> For example, in the partition of the integer ***5***, the factor corresponding to ***1*** is

![](/images/blog/solving-integer-partitioning-problem-using-python/img5.png)
> We know that 5 can be partitioned into two 2s and one 1. And it is quite evident that 5 cannot contain more than two 2s. Thus, the highest power of ***x²*** in the factor for 2 need not contain terms greater than (***x²***)***²***. The factor corresponding to 2 will be ***1*** ***+*** ***x²*** ***+*** ***x⁴***.

> If we revisit the above argument, we can also say that 5 cannot contain three or more than three 2s. This statement is same as discarding the terms which account for three or more than three 2s from the factor which accounts for “any number of repetitions of 2” . Thus the above statemet can be expressed as

![](/images/blog/solving-integer-partitioning-problem-using-python/img6.png)

Thus, the Generating Function can be expressed as

![](/images/blog/solving-integer-partitioning-problem-using-python/img7.png)
> Find the number of ways 8 can be partitioned into integers

1. 8 can contain exactly eight 1s
2. 8 can contain exactly four 2s
3. 8 can contain maximum two 3s
4. 8 can contain exactly two 4s
5. 8 can contain maximum one 5
6. 8 can contain maximum one 6
7. 8 can contain maximum one 7
8. 8 can contain exactly one 8

Thus, the Generating Function can be expressed as

![](/images/blog/solving-integer-partitioning-problem-using-python/img8.png)

The co-efficient of ***x⁸*** in the above expression is the number of ways 8 can be partitioned into integers, that is ***pₙ*** = 22

> Another application of Integer Partitioning Problem

#### How many different ways Rs. 200 can be made using denominations of Rs. 1, Rs. 2, Rs. 5, Rs. 10, Rs. 20, Rs. 50, Rs. 100 and Rs. 200?

This problem is the same as the above problems. Here, we have to partition 200 into some specific integers. So, we have to consider the factors of only those integers in the Generating function.

The factor for ***Rs. 1*** is (***1+ x + x²*** ***+*** ***x³*** ***+*** … ***+*** ***x¹⁹⁹*** ***+*** ***x²⁰⁰***)

The factor for ***Rs. 2*** is (***1+ x² + x⁴ + x⁶ + … + x¹⁹⁸ + x²⁰⁰***)

The factor for ***Rs. 5*** is (***1 + x⁵ + x¹⁰ + x¹⁵ + … + x¹⁹⁵ + x²⁰⁰***)

The factor for ***Rs. 10*** is (***1 + x¹⁰ + x²⁰ + x³⁰ + … + x¹⁹⁰ + x²⁰⁰***)

The factor for ***Rs. 20*** is (***1 + x²⁰ + x⁴⁰ + x⁶⁰ + … + x¹⁸⁰ + x²⁰⁰***)

The factor for ***Rs. 50*** is (***1 + x⁵⁰ + x¹⁰⁰ + x¹⁵⁰ + x²⁰⁰***)

The factor for ***Rs. 100*** is (***1 + x¹⁰⁰ + x²⁰⁰***)

The factor for ***Rs. 200*** is (***1 + x²⁰⁰***)

The generating function is the product of all the above factors

(***1 + x + x² +…+x²⁰⁰***) (***1 + x² + x⁴ +…+x²⁰⁰***)(***1+x⁵+x¹⁰+…+x²⁰⁰***)(***1+x¹⁰+x²⁰+…+x²⁰⁰***)(***1+x²⁰+x⁴⁰+…+x²⁰⁰***)(***1+x⁵⁰+..+x²⁰⁰***)(***1+x¹⁰⁰+x²⁰⁰***)(***1+x²⁰⁰***)

The number of ways ***Rs. 200*** can be partitioned with the given denominations is **73682**, that is ***p₂₀₀*** = **73682**

> Code for generating **Generating Functions** in Python

---

References :

1. <https://math.berkeley.edu/~mhaiman/math172-spring10/partitions.pdf>
2. <https://www.whitman.edu/mathematics/cgt_online/book/section03.03.html>
3. Discrete Mathematics and Its Applications — Kenneth Rosen

---
*Originally published on [Medium](https://medium.com/@mannasiladittya/integer-partition-problem-3b231a9ba8e1).*

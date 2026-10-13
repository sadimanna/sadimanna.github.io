---
title: "QR Factorization: Gram-Schmidt Algorithm"
date: 2022-11-25
permalink: /blog/qr-factorization-gram-schmidt-algorithm/
canonical_url: https://medium.com/@mannasiladittya/qr-factorization-gram-schmidt-algorithm-84b5fc16e98c
tags: [linear-algebra, mathematics, python, algorithms]
---
---

![](/images/blog/qr-factorization-gram-schmidt-algorithm/img1.png)

Source: [Link](https://www.oreilly.com/library/view/mastering-numerical-computing/9781788993357/35a1dc40-7e82-491c-b956-f93a7288ca88.xhtml)

**QR Factorization** is a method to decompose any matrix M with **linearly independent columns**, as the **product of two matrices Q and R**, where Q is a matrix with **orthonormal columns** and R is an **upper triangular matrix with non-zero diagonal elements**.

![](/images/blog/qr-factorization-gram-schmidt-algorithm/img2.png)![](/images/blog/qr-factorization-gram-schmidt-algorithm/img3.png)

such that

![](/images/blog/qr-factorization-gram-schmidt-algorithm/img4.png)![](/images/blog/qr-factorization-gram-schmidt-algorithm/img5.png)

M has dimensions (m, n). Hence, Q has dimensions (m, n) and R has dimensions (n, n). If **m = n**, then Q is orthogonal.

### Gram-Schmidt Algorithm

This algorithm is used to determine if a list of **m**-vectors a1,  
 . . . , ak is linearly independent. The length of vector **ak** is **m**.

![](/images/blog/qr-factorization-gram-schmidt-algorithm/img6.png)

Source: “Introduction to Applied Linear Algebra Vectors, Matrices, and Least Squares”, Boyd, Vandenberghe

Now, this algorithm is used to calculate the Q and R matrices from M column by column under the assumption that the columns of M are linearly independent.

### Code

To compute **Q** and **R** from **M** using Python, we can follow the following steps.


```python
import numpy as np
import math
```



```python
def print_TableForm(A, name, step):
 print(‘ — — — — — — — -’)
 print(‘ ‘+name+’ @ Step: ‘+str(step))
 print(‘ — — — — — — — -’)
 pprint(Matrix(A))
```



```python
if __name__ == ‘__main__’:
  M = np.array([[-1, -1, 1],[1, 3, 3],[-1, -1, 5],[1, 3, 7]])
  print('QR Factorization of M:')
  print_TableForm(M, ‘M’, 0)
  m, n = M.shape
  Q = np.zeros((m,n))
  R = np.zeros((n,n))
  print_TableForm(Q, ‘Q’, 0)
  print_TableForm(R, ‘R’, 0)
  for k in range(1,n+1):
    c = k-1
    R[:k,[c]] = Q[:,:k].T @ M[:,[c]] 
    v = M[:,[c]] — Q[:,:k] @ R[:k,[c]] 
    R[c,c] = np.linalg.norm(v)
    Q[:,[c]] = v / R[c,c] 
    print_TableForm(Q, ‘Q’, k)
    print_TableForm(R, ‘R’, k)
```



```text
QR Factorization of M:
 — — — — — — — -
 M @ Step: 0
 — — — — — — — -
⎡-1 -1 1⎤
⎢       ⎥
⎢ 1  3 3⎥
⎢       ⎥
⎢-1 -1 5⎥
⎢       ⎥
⎣1   3 7⎦
 — — — — — — — -
 Q @ Step: 0
 — — — — — — — -
⎡0 0 0⎤
⎢     ⎥
⎢0 0 0⎥
⎢     ⎥
⎢0 0 0⎥
⎢     ⎥
⎣0 0 0⎦
 — — — — — — — -
 R @ Step: 0
 — — — — — — — -
⎡0 0 0⎤
⎢     ⎥
⎢0 0 0⎥
⎢     ⎥
⎣0 0 0⎦
 — — — — — — — -
 Q @ Step: 1
 — — — — — — — -
⎡-0.5 0 0⎤
⎢        ⎥
⎢ 0.5 0 0⎥
⎢        ⎥
⎢-0.5 0 0⎥
⎢        ⎥
⎣ 0.5 0 0⎦
 — — — — — — — -
 R @ Step: 1
 — — — — — — — -
⎡2.0 0 0⎤
⎢       ⎥
⎢ 0  0 0⎥
⎢       ⎥
⎣ 0  0 0⎦
 — — — — — — — -
 Q @ Step: 2
 — — — — — — — -
⎡-0.5 0.5 0⎤
⎢          ⎥
⎢ 0.5 0.5 0⎥
⎢          ⎥
⎢-0.5 0.5 0⎥
⎢          ⎥
⎣ 0.5 0.5 0⎦
 — — — — — — — -
 R @ Step: 2
 — — — — — — — -
⎡2.0 4.0 0⎤
⎢         ⎥
⎢ 0  2.0 0⎥
⎢         ⎥
⎣ 0  0   0⎦
 — — — — — — — -
 Q @ Step: 3
 — — — — — — — -
⎡-0.5 0.5 -0.5⎤
⎢             ⎥
⎢ 0.5 0.5 -0.5⎥
⎢             ⎥
⎢-0.5 0.5 0.5 ⎥
⎢             ⎥
⎣ 0.5 0.5 0.5 ⎦
 — — — — — — — -
 R @ Step: 3
 — — — — — — — -
⎡2.0 4.0 2.0⎤
⎢           ⎥
⎢ 0  2.0 8.0⎥
⎢           ⎥
⎣ 0   0  4.0⎦
```


So, we can see that the matrix M is decomposed perfectly into two matrices Q and R. However, there are some issues related to this method. We will discuss those in the next post. Stay Tuned.

---

If you liked the post, clap, follow and don’t forget to share!!

---
*Originally published on [Medium](https://medium.com/@mannasiladittya/qr-factorization-gram-schmidt-algorithm-84b5fc16e98c).*

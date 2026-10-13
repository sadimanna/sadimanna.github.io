---
title: "Quick Tips #2: Try Plotting an All 1s 2D Array in Matplotlib"
date: 2022-10-21
permalink: /blog/quick-tips-2-try-plotting-an-all-1s-2d-array-in-matplotlib/
canonical_url: https://medium.com/@mannasiladittya/quick-tips-2-try-plotting-an-all-ones-2d-array-in-matplotlib-83ae6d1a8a23
tags: [python, matplotlib, data-visualization, numpy]
---
---

Did you try it?

Here’s the code snippet!!


```python
import matplotlib.pyplot as plt
import numpy as np
```



```text
img1 = np.ones((128,128)) #2D Array of 1s
```



```text
plt.imshow(img1, cmap = 'gray')
plt.show()
```


What did you get?

Is it the same as the image shown below?

![](/images/blog/quick-tips-2-try-plotting-an-all-1s-2d-array-in-matplotlib/img1.png)

Now, let us replace a 32x32 block of the array with zeros and try plotting again using the same code!


```text
img1[21:21+32, 10:10+32] = 0 
# Since, at the time of writing this post, the date is 21/10/2022
```



```text
plt.imshow(img1)
plt.show()
```


The image we get from this plot is given below.

![](/images/blog/quick-tips-2-try-plotting-an-all-1s-2d-array-in-matplotlib/img2.png)

Do you see any difference in behaviour?

When using data with values between 0 and 1, the show method understands the data range is [0,1]. But, when the data having all 1s is plotted, the range of the data cannot be evaluated. Hence, the array containing all ones (1 in the range [0,1]) is evaluated as 1 (0x00000001) in the range [0 (0x00000000), 255 (0x11111111)]. Hence, the disparity in the images plotted.

To solve this issue, you can just use the arguments `vmin` and `vmax` in the method `imshow` .

Now, let’s try the code below,


```text
plt.imshow(img1, cmap = 'gray', vmin = 0.0, vmax = 1.0)

plt.show()
```


The output obtained is given below

![](/images/blog/quick-tips-2-try-plotting-an-all-1s-2d-array-in-matplotlib/img3.png)

Did you see the change?

---

### Another Easy Method

Convert the 2D array into (H, W, C) format


```text
img1 = np.repeat(np.expand_dims(np.ones((128,128)),2),3,2)
plt.imshow(img1)
plt.show()
```


---

Clap if you liked this post. Share and Follow for more posts like this.

---
*Originally published on [Medium](https://medium.com/@mannasiladittya/quick-tips-2-try-plotting-an-all-ones-2d-array-in-matplotlib-83ae6d1a8a23).*

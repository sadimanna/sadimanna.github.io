---
title: "Profiling different algorithms using the built-in timeit module in Python"
date: 2024-12-27
categories: ["Python", "Performance"]
permalink: /blog/profiling-different-algorithms-using-the-built-in-timeit-mod/
canonical_url: https://medium.com/@mannasiladittya/profiling-different-algorithms-using-the-built-in-timeit-module-in-python-c63ae2190ba9
tags: [python, profiling, performance, algorithms, benchmarking]
---
---

![](/images/blog/profiling-different-algorithms-using-the-built-in-timeit-mod/img1.jpeg)

As a developer or data scientist, understanding the performance of your algorithms is crucial. Python’s *timeit* module is a powerful tool for measuring execution time, allowing you to compare different implementations and make informed decisions about which algorithm to use. In this blog post, we’ll explore how to use *timeit* to profile different algorithms, using sorting methods and random sampling as examples.

1. Introduction to ***timeit***

The ***timeit*** module provides a simple way to time small bits of Python code. It runs a statement multiple times and provides the total execution time. This approach helps to average out any small fluctuations in execution time due to system load or other factors.

1. Basic Usage of ***timeit***

Here’s a simple example of how to use ***timeit***:


```python
import timeit  
# Code to be timed 
code_to_test = ''' 
sum([i2 for i in range(1000)]) 
'''  
# Run the code 10000 times and measure the total time 
execution_time = timeit.timeit(code_to_test, number=10000)  
print(f"Execution time: {execution_time:.6f} seconds")
```


To see how we can use ***timeit***, let us go through some examples.

> Profiling Sorting Algorithms

Let’s compare three sorting algorithms: bubble sort, quick sort, and Python’s built-in sort. We’ll use ***timeit*** to measure their performance:


```python
import timeit 
import random  
# Define the algorithms 
def bubble_sort(arr):     
    n = len(arr)     
    for i in range(n):         
        for j in range(0, n-i-1):             
            if arr[j] > arr[j+1]:                 
                arr[j], arr[j+1] = arr[j+1], arr[j]     
    return arr  

def quick_sort(arr):     
    if len(arr) <= 1:         
        return arr     
    pivot = arr[len(arr) // 2]     
    left = [x for x in arr if x < pivot]     
    middle = [x for x in arr if x == pivot]     
    right = [x for x in arr if x > pivot]     
    return quick_sort(left) + middle + quick_sort(right)  

def python_sort(arr):     
    return sorted(arr)  

# Setup: create a list of random numbers 
setup_code = ''' 
    import random arr = [random.randint(1, 1000) for _ in range(1000)] 
    '''  

# Define the code to be timed for each algorithm 
bubble_sort_code = 'bubble_sort(arr.copy())' 
quick_sort_code = 'quick_sort(arr.copy())' 
python_sort_code = 'python_sort(arr.copy())'  

# Run the timing tests 
number = 100  

# number of times to run each test  
bubble_time = timeit.timeit(bubble_sort_code, setup=setup_code, globals=globals(), number=number) 
quick_time = timeit.timeit(quick_sort_code, setup=setup_code, globals=globals(), number=number) 
python_time = timeit.timeit(python_sort_code, setup=setup_code, globals=globals(), number=number)  

# Print results 
print(f"Bubble Sort time: {bubble_time:.6f} seconds") 
print(f"Quick Sort time: {quick_time:.6f} seconds") 
print(f"Python's built-in sort time: {python_time:.6f} seconds")
```


The output looks like this on a 64-bit Intel Core i7 CPU with 16GB RAM.


```text
Bubble Sort time: 6.080904 seconds
Quick Sort time: 0.140343 seconds
Python’s built-in sort time: 0.006618 seconds
```


> Profiling Random Sampling Methods

[**The Trifecta of Random Sampling: Comparing Built-in Random, NumPy, and PyTorch**  
medium.com](https://medium.com/the-owl/the-trifecta-of-random-sampling-comparing-built-in-random-numpy-and-pytorch-4a0db5fe1f32 "https://medium.com/the-owl/the-trifecta-of-random-sampling-comparing-built-in-random-numpy-and-pytorch-4a0db5fe1f32")

Now, let’s profile different random sampling methods using NumPy, PyTorch, and Python’s random library:


```python
import timeit 
import numpy as np
```


The output looks like this on a desktop with an Intel Xeon CPU.


```text
NumPy time: 0.146145 seconds
PyTorch time (CPU): 0.056417 seconds
Random library time: 0.331543 seconds
```


> Tips for Effective Profiling

* Use the ‘**setup**’ parameter in ***timeit.timeit***() to prepare any necessary data or imports.
* Use the ‘**globals**’ parameter if your functions are defined in the global scope.
* Adjust the ‘**number**’ parameter based on how long your algorithms take to run.
* Run your tests multiple times and average the results for more reliable measurements.
* Be aware of factors that can affect timing, such as system load and Python’s garbage collection.

> Interpreting the Results

When interpreting the results, remember that the fastest algorithm isn’t always the best choice. Consider other factors such as:

* *Space complexity*
* *Code readability and maintainability*
* *Specific use cases and data characteristics*
* *Scalability for larger datasets*

> Conclusion

Profiling your algorithms with ***timeit*** is a valuable skill for any Python developer. It allows you to make data-driven decisions about which algorithms to use in your projects. Remember, while timing is important, it’s just one aspect of algorithm selection. Always consider the broader context of your project when choosing between different implementations.

By mastering the use of ***timeit***, you’ll be better equipped to optimize your code and create more efficient Python programs. Happy profiling!

---

Clap and Follow if you like this article.

---
*Originally published on [Medium](https://medium.com/@mannasiladittya/profiling-different-algorithms-using-the-built-in-timeit-module-in-python-c63ae2190ba9).*

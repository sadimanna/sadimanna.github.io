---
title: "Row by Row: A Guide to Iterating Over Pandas DataFrames with iterrows() and loc[]"
date: 2025-05-01
categories: ["Data Science", "Python"]
permalink: /blog/row-by-row-a-guide-to-iterating-over-pandas-dataframes-with/
canonical_url: https://medium.com/@mannasiladittya/row-by-row-a-guide-to-iterating-over-pandas-dataframes-with-iterrows-and-loc-7541d16213cf
tags: [python, pandas, data-science, data-manipulation]
---
---

![](/images/blog/row-by-row-a-guide-to-iterating-over-pandas-dataframes-with/img1.jpeg)

Generated using Grok

Pandas DataFrames are a powerful tool for data analysis and manipulation. However, when working with large datasets, it’s often necessary to iterate over the rows of a DataFrame to perform specific operations. In this article, we’ll explore two common methods for iterating over Pandas DataFrames: *`****iterrows()****`* and *`****loc[]****`*. We’ll discuss each method's benefits and use cases, and provide examples to help you get started.

#### Method 1: *iterrows()*

***iterrows()*** is a built-in Pandas function that allows you to iterate over the rows of a DataFrame. This method returns an iterator that yields the index and the row values of the DataFrame. Here’s an example:


```python
import pandas as pd
# create a sample DataFrame
df = pd.DataFrame({'A': [1, 2, 3], 'B': [4, 5, 6]}) 
# iterate over rows using iterrows() 
for index, row in df.iterrows():
    print(index, row)
```


This will output:


```text
0    A    1
     B    4 
Name: 0, dtype: int64
1    A    2 
     B    5 
Name: 1, dtype: int64 
2    A    3 
     B    6 
Name: 2, dtype: int64
```


***iterrows()*** is a convenient method for iterating over DataFrames, especially when you need to access both the index and the row values.

#### Method 2: *loc[]*

***loc[]*** is a label-based indexing method that allows you to access specific rows and columns of a DataFrame. You can use *`****loc[]****`* to iterate over the rows of a DataFrame by specifying the row indices. Here’s an example:


```python
import pandas as pd  
# create a sample DataFrame 
df = pd.DataFrame({'A': [1, 2, 3], 'B': [4, 5, 6]})  
# iterate over rows using loc[] 
for i in range(len(df)):     
    row = df.loc[i]
    print(row)
```


This will output:


```text
A    1 
B    4 
Name: 0, dtype: int64 
A    2 
B    5 
Name: 1, dtype: int64 
A    3 
B    6 
Name: 2, dtype: int64
```


***loc[]*** is a flexible method that allows you to access specific rows and columns of a DataFrame. It’s especially useful when you need to perform operations on specific subsets of the data.

#### Conclusion

In this article, we’ve explored two common methods for iterating over Pandas DataFrames: *`****iterrows()****`* and *`****loc[]****`*. Both methods have their benefits and use cases, and can be used to perform a wide range of operations on your data. Whether you’re working with small or large datasets, these methods can help you to efficiently iterate over your data and perform the operations you need.

Which method to use?

* We can use *`****iterrows()****`* when we need to access both the index and the row values of the DataFrame.
* We can use *`****loc[]****`* when we need to access specific rows and columns of the DataFrame, or when we need to perform operations on specific subsets of the data.

By mastering these two methods, you’ll be able to efficiently iterate over your Pandas DataFrames and perform the operations you need to extract insights from your data.

---

Clap and Share if you find this article helpful.

---
*Originally published on [Medium](https://medium.com/@mannasiladittya/row-by-row-a-guide-to-iterating-over-pandas-dataframes-with-iterrows-and-loc-7541d16213cf).*

---
title: "How to save both ‘logs’ and ‘print’ statement outputs in the same file using Python?"
date: 2024-04-11
categories: ["Python", "Developer Tools"]
permalink: /blog/how-to-save-both-logs-and-print-statement-outputs-in-the-sam/
canonical_url: https://medium.com/@mannasiladittya/how-to-save-logs-and-print-statement-outputs-in-the-same-file-using-python-cf15d336fb9f
tags: [python, logging, debugging, io]
---
---

![](/images/blog/how-to-save-both-logs-and-print-statement-outputs-in-the-sam/img1.jpeg)

Logs and Python

---

> While doing one experiment, I needed to save the logs and the print statement outputs, in the same log file. Both the logs and print statement outputs were being printed in the terminal, and no file was being saved. While it is fairly easy to use the Python [logging](https://docs.python.org/3/library/logging.html) library to instantiate a StreamHandler or FileHandler with the logger, redirecting the print statement outputs to the same file was not easy, and requires expertise I didn’t have. After searching the web for a while, I came across two resources, one on the blog [Electric Monk](https://www.electricmonk.nl/log/2011/08/14/redirect-stdout-and-stderr-to-a-logger-in-python/), and another on [StackOverflow](https://stackoverflow.com/questions/11124093/redirect-python-print-output-to-logger). While I later found out, that there are other resources of a similar nature, but combining these two seemed to work for me. Hence, in this article, I am going to present the piece that worked for me.

---

First, we will define a wrapper for the Python logger, named ***StreamToLogger***.


```python
import logging
import sys


class StreamToLogger(object):
    """
    Fake file-like stream object that redirects writes to a logger instance.
    """
    def __init__(self, logger, log_level=logging.INFO):
        self.logger = logger
        self.log_level = log_level
        self.linebuf = ''

    def write(self, buf):
        temp_linebuf = self.linebuf + buf
        self.linebuf = ''
        for line in temp_linebuf.splitlines(True):
            if line[-1] == '\n':
                self.logger.log(self.log_level, line.rstrip())
            else:
                self.linebuf += line

    def flush(self):
        if self.linebuf != '':
            self.logger.log(self.log_level, self.linebuf.rstrip())
        self.linebuf = ''
```


Then, we are going to instantiate a logger and set up the basic configurations we would like the logs to be in.

#### **Logger Instantiation**


```text
logger = logging.getLogger('logs')
```


#### Instantiate FileHandler


```text
logger.handlers = []
fh = logging.FileHandler(filename=f’{BASE_PATH}/out.log’, mode = ‘a’)
formatter = logging.Formatter(‘[%(levelname).1s] %(name)s >> “%(message)s”’)
fh.setFormatter(formatter)
logger.addHandler(fh)
logger.setLevel("WARNING")
```


For redirecting the ***print*** statement outputs to the ***log*** file, we are going to wrap the logger in the ***StreamToLogger*** object


```text
wrapped_logger = StreamToLogger(logger, logging.INFO)
```


Finally, we need to set STDOUT to the wrapped logger


```text
sys.stdout = wrapped_logger
```


Now, we can save both logs and print statement outputs to a single file.


```python
logger.info("Logger instantiated")
print("Print statement logging to file")
```


We can test if it works by printing the lines that have been appended to the text file. However, we first need to restore the functionality of ***sys.stdout***.


```python
sys.stdout = sys.__stdout__
with open(‘./log2.txt’) as f:
  l = f.readlines()
  for line in l:
    print(line)
```


***sys.\_\_stdout\_\_*** stores the original values of ***sys.stdout***.

For **IPython** kernels, however, we need to run


```text
oldstdout = sys.stdout
```


before assigning the ***wrapped\_logger*** to ***sys.stdout***. And then restore it before executing any print statements.


```python
sys.stdout = oldstdout
with open('./log2.txt') as f:
  l = f.readlines()
  for line in l:
  print(line)
```


The output should look like this


```text
[I] logs >> “Logger instantiated” 
[I] logs >> “Print statement logging to file”
```


> A note from the StackOverflow answer:

From the io.TextIOWrapper docs: On output, if a newline is **None**, any '**\n**' characters written are translated to the system default line separator. By default ***sys.stdout.write()*** expects '**\n**' newlines and then translates them, so this is still cross-platform.

---

Readers can have a look at the complete example here

The code is also available in [Colab](https://colab.research.google.com/drive/1daOjwE5bREhZX9Mof2Tdy_7BRrf89Rx5?usp=sharing%5C).

---

There are other such codes available on the web to do the same job, like [streamtologger](https://github.com/phohenecker/stream-to-logger/tree/master). However, the `flush()` is not implemented which may cause issues. But the idea is the same.

---

Clap and share if you like this post.

---
*Originally published on [Medium](https://medium.com/@mannasiladittya/how-to-save-logs-and-print-statement-outputs-in-the-same-file-using-python-cf15d336fb9f).*

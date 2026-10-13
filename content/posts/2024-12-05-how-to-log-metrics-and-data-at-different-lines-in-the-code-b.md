---
title: "How to log metrics and data at different lines in the code but at the same time-step using Wandb"
date: 2024-12-05
categories: ["MLOps", "Machine Learning"]
permalink: /blog/how-to-log-metrics-and-data-at-different-lines-in-the-code-b/
canonical_url: https://medium.com/@mannasiladittya/how-to-log-metrics-and-data-at-different-places-in-the-code-but-at-the-same-time-step-using-wandb-bdd329062cdb
tags: [wandb, mlops, logging, deep-learning]
---
---

![](/images/blog/how-to-log-metrics-and-data-at-different-lines-in-the-code-b/img1.png)

When working on machine learning projects, monitoring and logging metrics is crucial for understanding model performance and debugging. Weights & Biases (W&B) is one of the most powerful tools for tracking experiments, visualizing results, and collaborating with team members. Sometimes, you may want to log metrics from different places in your code but ensure they are logged at the same time-step. This blog will guide you through achieving this using W&B in Python.

### Prerequisites

Before we dive in, make sure you have the following:

* Python installed on your system.
* W&B library installed. You can install it using pip:


```bash
pip install wandb
```


* A W&B account. You can sign up for free at Weights & Biases.

### Setting Up W&B

First, let’s set up W&B in your Python script. You need to initialize a W&B run to start logging metrics.


```python
import wandb  
# Initialize a W&B run 
wandb.init(project='your_project_name', entity='your_wandb_username')
```


Replace “*your\_project\_name”* with the name of your project and “*your\_wandb\_username”* with your W&B username.

### Logging Metrics with ‘step’ argument in wandb.log()

To log metrics at different places in your code but ensure they are logged at the same time-step, you can use the `step` argument in `wandb.log` method.

Here’s an example:


```python
import wandb 
import time  
# Initialize a W&B run 
wandb.init(project='your_project_name', entity='your_wandb_username')  
# Simulate some training process 
for epoch in range(10):     
  # Simulate training metrics     
  train_loss = 0.1 * (10 - epoch)     
  train_accuracy = epoch * 10          
  # Log training metrics     
  wandb.log({'train_loss':train_loss},step=epoch)
  wandb.log({'train_accuracy':train_accuracy},step=epoch)
  # Simulate validation metrics     
  time.sleep(1)  
  # Simulate validation delay     
  val_loss = 0.1 * (10 - epoch) + 1.1     
  val_accuracy = epoch * 9          
  # Log validation metrics    
  wandb.log({'val_loss': val_loss, 'val_accuracy': val_accuracy}, step=epoch)
```


### Logging Metrics with ‘commit’ argument in wandb.log()

To log metrics at different places in your code but ensure they are logged at the same time-step, you can also use the `commit` argument in `wandb.log()`. If set to `True`, finalize and upload the step. If set to `False`, then accumulate data for the step.

Here’s an example:


```python
import wandb 
import time  
# Initialize a W&B run 
wandb.init(project='your_project_name', entity='your_wandb_username')  
# Simulate some training process 
for epoch in range(10):     
  # Simulate training metrics     
  train_loss = 0.1 * (10 - epoch)     
  train_accuracy = epoch * 10          
  # Log training metrics     
  wandb.log({'train_loss':train_loss,'train_accuracy':train_accuracy},commit=False)          
  # Simulate validation metrics     
  time.sleep(1)  
  # Simulate validation delay     
  val_loss = 0.1 * (10 - epoch) + 1.1     
  val_accuracy = epoch * 9          
  # Log validation metrics    
  wandb.log({'val_loss': val_loss, 'val_accuracy': val_accuracy})
```


### Logging Metrics from Different Functions

If you have a more complex codebase with metrics being computed in different functions, you can still log them at the same time-step by passing the *`step`* parameter.

### Using ‘step’ argument in wandb.log()


```python
import wandb
# Initialize a W&B run 
wandb.init(project='your_project_name', entity='your_wandb_username')  
def log_training_metrics(epoch, train_loss, train_accuracy):
    wandb.log({'train_loss': train_loss, 'train_accuracy': train_accuracy}, step=epoch)  
def log_validation_metrics(epoch, val_loss, val_accuracy):
    wandb.log({'val_loss': val_loss, 'val_accuracy': val_accuracy}, step=epoch)  
# Simulate some training process 
for epoch in range(10):
    # Simulate training metrics
    train_loss = 0.1 * (10 - epoch)
    train_accuracy = epoch * 10 
    log_training_metrics(epoch, train_loss, train_accuracy)
    # Simulate validation metrics
    val_loss = 0.1 * (10 - epoch) + 1.1
    val_accuracy = epoch * 9 
    log_validation_metrics(epoch, val_loss, val_accuracy)
```


### Using ‘commit’ argument in wandb.log()


```python
import wandb
# Initialize a W&B run 
wandb.init(project='your_project_name', entity='your_wandb_username')  
def log_training_metrics(train_loss, train_accuracy, commit=True):
    wandb.log({'train_loss': train_loss, 'train_accuracy': train_accuracy}, commit=commit)  
def log_validation_metrics(val_loss, val_accuracy, commit=True):
    wandb.log({'val_loss': val_loss, 'val_accuracy': val_accuracy}, commit=commit)  
# Simulate some training process 
for epoch in range(10):
    # Simulate training metrics
    train_loss = 0.1 * (10 - epoch)
    train_accuracy = epoch * 10 
    log_training_metrics(train_loss, train_accuracy, False)
    # Simulate validation metrics
    val_loss = 0.1 * (10 - epoch) + 1.1
    val_accuracy = epoch * 9 
    log_validation_metrics(val_loss, val_accuracy)
```


---

Clap, Share and Subscribe if you liked this content!

---
*Originally published on [Medium](https://medium.com/@mannasiladittya/how-to-log-metrics-and-data-at-different-places-in-the-code-but-at-the-same-time-step-using-wandb-bdd329062cdb).*

---
title: "Managing Your Machine Learning Workflow with Weights & Biases Artifacts"
date: 2024-11-22
permalink: /blog/managing-your-machine-learning-workflow-with-weights-biases/
canonical_url: https://medium.com/@mannasiladittya/managing-your-machine-learning-workflow-with-weights-biases-artifacts-1577b6a58319
tags: [wandb, mlops, artifacts, machine-learning, experiment-tracking]
---
---

![](/images/blog/managing-your-machine-learning-workflow-with-weights-biases/img1.jpeg)

Weights & Biases (W&B) offers a powerful feature called Artifacts, which allows you to version and track datasets, models, and other files crucial to your machine learning workflow. In this blog post, we’ll explore how to use W&B Artifacts to save and manage various types of files.

### Prerequisites

Before we dive in, make sure you have W&B installed. You can install it using pip:


```bash
pip install wandb
```


### 1. Saving Datasets

You can save datasets as artifacts to ensure that the exact versions used in your experiments are tracked and reproducible.


```python
import wandb  
# Initialize a new run 
wandb.init(project="your-project-name", name="your-run-name")  
# Create an artifact for the dataset 
dataset_artifact = wandb.Artifact('dataset-name', type='dataset')  
# Add the dataset files or directories to the artifact 
dataset_artifact.add_file('path/to/your/dataset.csv') 
# or 
dataset_artifact.add_dir('path/to/your/dataset-directory')  
# Log the artifact 
wandb.log_artifact(dataset_artifact)
```


### 2. Saving Models

You can save trained models as artifacts to keep track of different versions and enable easy retrieval for inference or further training.


```python
import wandb  
# Initialize a new run 
wandb.init(project="your-project-name", name="your-run-name")  
# Train your model and save it 
model.save('path/to/your/model.h5')  
# Create an artifact for the model 
model_artifact = wandb.Artifact('model-name', type='model')  
# Add the model file to the artifact 
model_artifact.add_file('path/to/your/model.h5')  
# Log the artifact 
wandb.log_artifact(model_artifact)
```


### 3. Saving Intermediate Results

Intermediate results, such as preprocessed data, feature sets, or intermediate model checkpoints, can be saved as artifacts.


```python
import wandb  
# Initialize a new run 
wandb.init(project="your-project-name", name="your-run-name")  
# Save intermediate results 
preprocessed_data.to_csv('path/to/preprocessed_data.csv')  
# Create an artifact for the intermediate results 
intermediate_artifact = wandb.Artifact('preprocessed-data', type='preprocessed-data')  # Add the intermediate result file to the artifact 
intermediate_artifact.add_file('path/to/preprocessed_data.csv') 
# Log the artifact 
wandb.log_artifact(intermediate_artifact)
```


### 4. Saving Configuration Files

You can save configuration files, such as YAML or JSON files, that contain hyperparameters or other settings used in your experiments.


```python
import wandb  
# Initialize a new run 
wandb.init(project="your-project-name", name="your-run-name")  
# Create an artifact for the configuration file 
config_artifact = wandb.Artifact('config', type='config')  
# Add the configuration file to the artifact 
config_artifact.add_file('path/to/your/config.yaml')  
# Log the artifact 
wandb.log_artifact(config_artifact)
```


### 5. Saving Custom Objects

You can save any custom objects or files that are important for your experiments, such as custom scripts, evaluation results, or visualizations.


```python
import wandb  
# Initialize a new run 
wandb.init(project="your-project-name", name="your-run-name")  
# Save custom objects 
with open('path/to/custom_object.pkl', 'wb') as f:     
    pickle.dump(custom_object, f)  
# Create an artifact for the custom object 
custom_object_artifact = wandb.Artifact('custom-object', type='custom')  
# Add the custom object file to the artifact 
custom_object_artifact.add_file('path/to/custom_object.pkl')  
# Log the artifact 
wandb.log_artifact(custom_object_artifact)
```


### 6. Saving Source Code

You can save your source code as an artifact to ensure reproducibility.


```python
import wandb  
# Initialize a new run
wandb.init(project="your-project-name", name="your-run-name")  
# Create an artifact for the source code 
code_artifact = wandb.Artifact('source-code', type='code')  
# Add the source code files or directory to the artifact 
code_artifact.add_dir('path/to/your/source/code')  
# Log the artifact 
wandb.log_artifact(code_artifact)
```


### Example: Using Artifacts for Dataset and Model

Here’s a complete example that shows how to use artifacts for saving both a dataset and a trained model.


```python
import wandb  
# Initialize a new run 
wandb.init(project="your-project-name", name="your-run-name")  
# Dataset Artifact 
dataset_artifact = wandb.Artifact('dataset', type='dataset') 
dataset_artifact.add_file('path/to/dataset.csv') 
wandb.log_artifact(dataset_artifact)  
# Train your model 
model = train_model(...)  
# Save the trained model 
model.save('path/to/model.h5')  
# Model Artifact 
model_artifact = wandb.Artifact('trained-model', type='model') 
model_artifact.add_file('path/to/model.h5') 
wandb.log_artifact(model_artifact)
```


By using W&B Artifacts, you can ensure that all important files and objects in your machine learning workflow are versioned, tracked, and easily accessible, enabling better reproducibility and collaboration.

---
*Originally published on [Medium](https://medium.com/@mannasiladittya/managing-your-machine-learning-workflow-with-weights-biases-artifacts-1577b6a58319).*

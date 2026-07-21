---
title: "Understanding Federated Learning: Privacy-Preserving Distributed Training"
date: "2026-07-15"
categories: ["Machine Learning", "Federated Learning"]
tags: ["privacy", "distributed-systems", "pytorch", "transformers", "deep-learning"]
excerpt: "A comprehensive guide to Federated Learning — how it enables collaborative model training without sharing raw data, its mathematical foundations, and practical implementation with PyTorch."
---

## Introduction

Federated Learning (FL) is a machine learning paradigm that enables multiple participants to collaboratively train a shared model **without exchanging their local data**. First introduced by McMahan et al. (2017) at Google, FL has since become a cornerstone of privacy-preserving AI.

In this post, we will explore the mathematical foundations, key algorithms, and practical considerations for deploying FL systems.

## The Core Problem

Traditional machine learning requires centralizing all training data:

$$\min_{\theta} \frac{1}{N} \sum_{i=1}^{N} \mathcal{L}(f_\theta(x_i), y_i)$$

where $\mathcal{L}$ is the loss function, $f_\theta$ is the model parameterized by $\theta$, and $(x_i, y_i)$ are individual data points.

However, data centralization raises critical concerns:

- **Privacy**: Sensitive medical or financial records cannot be shared
- **Regulation**: GDPR and HIPAA impose strict data transfer constraints
- **Communication**: Raw data transfer may be prohibitively expensive
- **Ownership**: Data holders may be unwilling to share proprietary datasets

## FedAvg: The Foundation Algorithm

The **Federated Averaging (FedAvg)** algorithm addresses this by keeping data local:

$$\theta_{t+1} = \sum_{k=1}^{K} \frac{n_k}{n} \theta_{t+1}^k$$

where $K$ is the number of clients, $n_k$ is the number of samples at client $k$, $n = \sum_k n_k$, and $\theta_{t+1}^k$ is the locally updated model at client $k$.

### Implementation

Here's a simplified FedAvg implementation in PyTorch:

```python
import torch
import torch.nn as nn
from typing import List, Dict
from copy import deepcopy

class FedAvgServer:
    """Federated Averaging Server."""
    
    def __init__(self, global_model: nn.Module):
        self.global_model = global_model
    
    def aggregate(self, client_models: List[nn.Module], 
                  weights: List[float]) -> None:
        """Weighted average of client model parameters."""
        global_dict = self.global_model.state_dict()
        
        for key in global_dict.keys():
            global_dict[key] = torch.zeros_like(global_dict[key])
            for model, w in zip(client_models, weights):
                global_dict[key] += w * model.state_dict()[key]
        
        self.global_model.load_state_dict(global_dict)
    
    def distribute(self) -> nn.Module:
        """Send global model to a client."""
        return deepcopy(self.global_model)


class FedAvgClient:
    """Federated Averaging Client."""
    
    def __init__(self, model: nn.Module, dataloader, 
                 lr: float = 0.01, local_epochs: int = 5):
        self.model = model
        self.dataloader = dataloader
        self.optimizer = torch.optim.SGD(
            model.parameters(), lr=lr
        )
        self.criterion = nn.CrossEntropyLoss()
        self.local_epochs = local_epochs
    
    def train(self) -> nn.Module:
        """Perform local training rounds."""
        self.model.train()
        
        for epoch in range(self.local_epochs):
            for batch_x, batch_y in self.dataloader:
                self.optimizer.zero_grad()
                output = self.model(batch_x)
                loss = self.criterion(output, batch_y)
                loss.backward()
                self.optimizer.step()
        
        return self.model
```

### The Communication Round

Each FL round follows this protocol:

| Step | Action | Location |
|------|--------|----------|
| 1 | Server distributes global model | Server → Clients |
| 2 | Clients train on local data | Each Client |
| 3 | Clients send updated weights | Clients → Server |
| 4 | Server aggregates updates | Server |

## Challenges in Heterogeneous Settings

### Non-IID Data Distribution

In practice, data across clients is rarely identically distributed. The **divergence** between local and global optima can be characterized by:

$$\Gamma = \mathcal{L}^* - \sum_{k=1}^{K} \frac{n_k}{n} \mathcal{L}_k^*$$

where $\mathcal{L}^*$ and $\mathcal{L}_k^*$ are the global and local optimal losses respectively.

### Convergence Guarantees

Under certain assumptions (L-smooth, $\mu$-strongly convex), FedAvg converges at rate:

$$\mathbb{E}[\mathcal{L}(\theta_T)] - \mathcal{L}^* \leq \mathcal{O}\left(\frac{1}{T}\right) + \mathcal{O}\left(\frac{E \sigma^2}{K}\right)$$

where $T$ is the number of rounds, $E$ is local epochs, and $\sigma^2$ is the variance of stochastic gradients.

## Security Considerations

While FL avoids sharing raw data, model updates can still leak information:

```python
# Example: Gradient inversion attack (simplified)
def gradient_inversion(gradient, model, num_iterations=300):
    """Reconstruct training data from gradients."""
    dummy_data = torch.randn_like(original_data, 
                                   requires_grad=True)
    dummy_label = torch.randn_like(original_label, 
                                    requires_grad=True)
    
    optimizer = torch.optim.LBFGS(
        [dummy_data, dummy_label], lr=0.1
    )
    
    for i in range(num_iterations):
        def closure():
            optimizer.zero_grad()
            dummy_output = model(dummy_data)
            dummy_loss = criterion(dummy_output, dummy_label)
            dummy_gradient = torch.autograd.grad(
                dummy_loss, model.parameters(), 
                create_graph=True
            )
            # Minimize distance between real and dummy gradients
            grad_diff = sum(
                ((dg - rg) ** 2).sum() 
                for dg, rg in zip(dummy_gradient, gradient)
            )
            grad_diff.backward()
            return grad_diff
        
        optimizer.step(closure)
    
    return dummy_data
```

> **Key Insight**: Differential privacy and secure aggregation are essential complements to FL for robust privacy guarantees.

## Conclusion

Federated Learning represents a paradigm shift in how we approach collaborative machine learning. By keeping data local and only sharing model updates, FL enables training across organizational boundaries while preserving privacy.

Key takeaways:

1. **FedAvg** remains the foundational algorithm, but modern variants address its limitations
2. **Data heterogeneity** is the primary challenge in real-world deployments
3. **Security** requires additional mechanisms beyond the FL framework itself
4. **Communication efficiency** can be improved through compression and sparse updates

---

*This post is part of a series on privacy-preserving machine learning. Next: [Self-Supervised Learning in Medical Imaging](/blog/self-supervised-learning-medical-imaging/).*

---
title: "Cross-Dataset Label Mapping with Vision–Language Embeddings"
date: 2026-02-25
permalink: /blog/cross-dataset-label-mapping-with-vision-language-embeddings/
canonical_url: https://medium.com/the-owl/cross-dataset-label-mapping-with-vision-language-embeddings-0616d1177f0f
tags: [deep-learning, vision-language-model, transformers, ai, computer-vision]
---
![](/images/blog/cross-dataset-label-mapping-with-vision-language-embeddings/img1.jpeg)

When working with multiple visual datasets (e.g., CIFAR-10 and ImageNet), a common challenge is **aligning label spaces** across datasets. Labels may be semantically related but not identical: for example, *“automobile”* in CIFAR-10 corresponds to multiple fine-grained categories such as *“sports car”*, *“pickup truck”*, or *“minivan”* in ImageNet.

This problem can be formulated as a **cross-dataset label mapping task**:

> *Given a set of source dataset labels and a set of target dataset labels, identify the most semantically aligned target labels for each source label.*

Such mappings are useful for:

* zero-shot transfer,
* dataset harmonization,
* label space adaptation,
* and analyzing semantic leakage or robustness in multimodal attacks and defences.

### Why Vision–Language Models for Label Mapping?

A naive solution would embed labels using a generic language model (e.g., BERT) and compare them in text embedding space. However, this approach fails to capture **visual semantics**: BERT is trained on text-only objectives and organizes words by linguistic co-occurrence, not by how concepts appear in images.

Vision–Language Models (VLMs) such as **CLIP, SigLIP, and ALIGN** are trained on paired image–text data. Their text encoders therefore, produce embeddings that reflect **visual similarity**. This makes them particularly suitable for cross-dataset label alignment in vision-centric tasks.

### A Practical Pipeline for Cross-Dataset Label Mapping

We outline a simple three-step pipeline:

1. Convert class names into natural language prompts.
2. Embed each class using a VLM text encoder and average across prompts.
3. Match source and target classes via cosine similarity in the embedding space.

### Reference Implementation (CLIP Example)

### 1. Text Feature Extractor


```python
from transformers import CLIPTokenizer, CLIPTextModel
import torch
import torch.nn.functional as F

class VLTextProjector:
    def __init__(self, compute_device="cuda"):
        self.tokenizer = CLIPTokenizer.from_pretrained("openai/clip-vit-base-patch32")
        self.encoder = CLIPTextModel.from_pretrained("openai/clip-vit-base-patch32").to(compute_device)
        self.device = compute_device
        self.encoder.eval()
    @torch.no_grad()
    def project(self, phrase_batch):
        batch = self.tokenizer(
            phrase_batch,
            return_tensors="pt",
            padding=True,
            truncation=True,
            max_length=self.tokenizer.model_max_length,
        ).to(self.device)
        rep = self.encoder(**batch).pooler_output
        return rep
```


### 2. Label Encoding with Prompt Averaging


```python
@torch.no_grad()
def build_label_embeddings(label_set, prompt_bank, projector):
    vectors = []
    for lbl in label_set:
        phrasing = [p.format(lbl.replace("_", " ")) for p in prompt_bank]
        feats = projector.project(phrasing)
        feats = F.normalize(feats, dim=-1)
        proto = F.normalize(feats.mean(dim=0), dim=-1)
        vectors.append(proto)
    return torch.stack(vectors, dim=0)
```


### 3. Cross-Dataset Matching


```python
def retrieve_semantic_neighbors(src_vectors, tgt_vectors, tgt_labels, k=5):
    scores = src_vectors @ tgt_vectors.T
    top_vals, top_ids = scores.topk(k, dim=-1)
    aligned = []
    for i in range(src_vectors.size(0)):
        candidates = []
        for r in range(k):
            j = top_ids[i, r].item()
            candidates.append((tgt_labels[j], top_vals[i, r].item()))
        aligned.append(candidates)
    return aligned
```


### 4. Example Usage


```python
vlm_encoder = VLTextProjector(compute_device="cuda")
prompt_templates = [
    "a photo of a {}",
    "an image of a {}",
    "a close-up photo of a {}",
    "a picture of a {}",
]
source_label_vecs = build_label_embeddings(cifar10_classes, prompt_templates, vlm_encoder)
target_label_vecs = build_label_embeddings(imagenet_classes, prompt_templates, vlm_encoder)
label_alignment = retrieve_semantic_neighbors(
    source_label_vecs, target_label_vecs, imagenet_classes, k=5
)
for src_name, matches in zip(cifar10_classes, label_alignment):
    print(f"\nSource label: {src_name}")
    for rank, (tgt_name, sim) in enumerate(matches, 1):
        print(f"  {rank}. {tgt_name} (similarity={sim:.3f})")
```


### Why Vanilla BERT Is Unsuitable for This Task

The cross-dataset label mapping task is inherently **vision-centric**: we care about whether two labels refer to visually similar concepts. BERT, however:

* is trained with text-only objectives,
* encodes linguistic similarity rather than visual similarity,
* and lacks grounding in image statistics.

As a result, BERT-based embeddings often produce misleading label alignments for visual datasets. In contrast, CLIP-like models embed labels in a space shaped by **visual co-occurrence and appearance**, making them far more reliable for cross-dataset label mapping.

### Takeaway

Cross-dataset label mapping can be formulated as a nearest-neighbour retrieval problem in a **vision–language embedding space**. By embedding class names using VLM text encoders and comparing them via cosine similarity, we obtain a principled, zero-shot mechanism to align heterogeneous label spaces across datasets such as CIFAR-10 and ImageNet.

---

[Cross-Dataset Label Mapping with Vision–Language Embeddings](https://medium.com/the-owl/cross-dataset-label-mapping-with-vision-language-embeddings-0616d1177f0f) was originally published in [The Owl](https://medium.com/the-owl) on Medium, where people are continuing the conversation by highlighting and responding to this story.

---
*Originally published on [Medium](https://medium.com/the-owl/cross-dataset-label-mapping-with-vision-language-embeddings-0616d1177f0f).*

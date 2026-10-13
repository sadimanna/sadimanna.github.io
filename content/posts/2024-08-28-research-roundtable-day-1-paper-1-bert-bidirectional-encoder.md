---
title: "Research Roundtable [Day 1][Paper 1]— BERT: Bidirectional Encoder Representations from Transformers"
date: 2024-08-28
categories: ["Natural Language Processing", "Deep Learning"]
permalink: /blog/research-roundtable-day-1-paper-1-bert-bidirectional-encoder/
canonical_url: https://medium.com/@mannasiladittya/paper-reading-club-day-1-paper-1-bert-bidirectional-encoder-representations-from-transformers-b4c0d9a3a5ef
tags: [nlp, bert, transformers, paper-review, deep-learning]
---
---

![](/images/blog/research-roundtable-day-1-paper-1-bert-bidirectional-encoder/img1.jpeg)

In this article, we will review the paper which introduced **BERT** in ***Language Models***. This article is part of a new series of paper review articles, where we will identify the most salient points and contributions of a paper and summarise them in the form of an article.

> Please feel free to add any other points that are not mentioned below in the comments.

The major points of the paper mentioned above can be summarized as follows:

## Motivation

* The major limitation is the contemporary standard language models were unidirectional, and this limited the choice of architectures that can be used during pre-training.
* For example, in OpenAI GPT, the authors use a left-to-right architecture, where every token can only attend to previous tokens in the self-attention layers of the Transformer (Vaswani et al., 2017).
* Such restrictions are sub-optimal for sentence-level tasks and could be very harmful when applying finetuning-based approaches to token-level tasks such as question answering, where it is crucial to incorporate context from both directions.

## What Does BERT Do?

* BERT alleviates the previously mentioned unidirectionality constraint by using a “*masked language model*” (MLM) pre-training objective, inspired by the Cloze task (Taylor, 1953).
* The “*masked language model*” randomly masks some of the tokens from the input, and the objective is to predict the original vocabulary ID of the masked word based only on its context.
* Unlike left-to-right language model pre-training, the MLM objective enables the representation to fuse the left and the right context, which allows pre-training of a deep bidirectional Transformer.
* In addition to the masked language model, a “*next sentence prediction*” task was also used that jointly pretrains text-pair representations.

## Architecture

* BERT’s model architecture is a multi-layer bidirectional Transformer encoder based on the original implementation described in Vaswani et al. (2017) and released in the tensor2tensor library.

## Data Processing

* To make BERT handle a variety of down-stream tasks, our input representation can unambiguously represent both a single sentence and a pair of sentences (e.g., Question, Answer) in one token sequence
* Throughout this work, a “sentence” can be an arbitrary span of contiguous text, rather than an actual linguistic sentence.
* A “sequence” refers to the input token sequence to BERT, which may be a single sentence or two sentences packed together.
* WordPiece embeddings (Wu et al., 2016) with a 30,000-token vocabulary are used.
* For the pre-training corpus, the authors use BooksCorpus (800M words) (Zhu et al., 2015) and English Wikipedia (2,500M words).
* For Wikipedia, only the text passages are extracted and the rest is ignored. It is critical to use a document-level corpus rather than a shuffled sentence-level corpus such as the Billion Word Benchmark (Chelba et al., 2013) to extract long contiguous sequences.

### [SEP] Token

* Sentence pairs are packed together into a single sequence. We differentiate the sentences in two ways. First, we separate them with a special token ([SEP]). Second, we add a learned embedding to every token indicating whether it belongs to sentence A or sentence B.

### [CLS] Token

* The first token of every sequence is always a special classification token ([CLS]). The final hidden state corresponding to this token is used as the aggregate sequence representation for classification tasks.

### Token Representation

* For a given token, its input representation is constructed by summing the corresponding token, segment, and position embeddings.

![](/images/blog/research-roundtable-day-1-paper-1-bert-bidirectional-encoder/img2.png)
## Pre-training Objectives

* Unlike Peters et al. (2018a) and Radford et al. (2018), traditional left-to-right or right-to-left language models are not used to pre-train BERT. Instead, we pre-train BERT using two unsupervised tasks, mentioned below.

### Task 1: Masked LM (MLM)

* To train a deep bidirectional representation, some percentage of the input tokens are simply masked at random, and then those masked tokens are predicted. This procedure is described as a “masked LM” (MLM), although it is often referred to as a Cloze task in the literature (Taylor, 1953).
* In this case, the final hidden vectors corresponding to the mask tokens are fed into an output softmax over the vocabulary, as in a standard LM.

### Task 2: Next Sentence Prediction (NSP)

* To train a model that understands sentence relationships, the authors pre-train for a binarized next-sentence prediction task that can be trivially generated from any monolingual corpus.
* Specifically, when choosing the sentences A and B for each pretraining example, 50% of the time B is the actual next sentence that follows A (labelled as **IsNext**), and 50% of the time it is a random sentence from the corpus (labelled as **NotNext**).
* The [CLS] token is used for next-sentence prediction (NSP).
* To fine-tune on **GLUE**, the first input token C ([CLS]) is used as the aggregate representation and the only new parameters introduced during fine-tuning are classification layer weights W, with K as the number of labels. The standard classification loss is calculated with C and W, i.e., log(softmax(CW^T )).

---
*Originally published on [Medium](https://medium.com/@mannasiladittya/paper-reading-club-day-1-paper-1-bert-bidirectional-encoder-representations-from-transformers-b4c0d9a3a5ef).*

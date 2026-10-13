---
title: "Writing Multi-Line Commands Across Operating Systems"
date: 2025-12-31
permalink: /blog/writing-multi-line-commands-across-operating-systems/
canonical_url: https://medium.com/@mannasiladittya/writing-multi-line-commands-across-operating-systems-2800e41b0abd
tags: [bash, powershell, command-line, cross-platform, shell]
---
---

![](/images/blog/writing-multi-line-commands-across-operating-systems/img1.jpeg)

Modern machine learning workflows often rely on long command-line invocations: training scripts with dozens of flags, Docker runs, evaluation pipelines, and inference jobs. Writing these commands on a single line quickly becomes unreadable and error-prone.

Fortunately, every major operating system supports **multi-line command composition** — but with different syntax and best practices.

This article provides a **clear, OS-specific guide** to writing multi-line commands in:

* **Windows Batch** (`.bat`, `.cmd`)
* **PowerShell** (Windows, macOS, Linux)
* **Bash / Zsh** (Linux and macOS)

All examples are short, realistic, and ML-oriented.

---

### 1. Windows Batch Scripts (`.bat`, `.cmd`)

### Line continuation using caret (`^`)

In classic Windows batch scripting, the caret (`^`) is the line-continuation character.


```text
python train.py ^
    --dataset chestxray ^
    --epochs 50 ^
    --batch-size 16 ^
    --lr 0.0001 ^
    --output runs\exp1
```


#### Rules to remember

* The caret **must be the final character** on the line
* No trailing spaces after `^`
* Comments on the same line will break the continuation

This is the **standard and recommended** approach in batch scripts.

---

### Grouping multiple commands

Parentheses group related commands, but do **not** split a single command.


```text
(
    echo Starting training
    python preprocess.py
    python train.py --config configs\train.yaml
    echo Training finished
)
```


Common in `IF` and `FOR` blocks.

---

### Managing long ML commands using variables

Useful when commands are reused:


```text
set TRAIN_CMD=python train.py --epochs 50 --batch-size 16
%TRAIN_CMD% --lr 0.0001 --dataset chestxray
```


Inside loops, enable delayed expansion:


```text
setlocal EnableDelayedExpansion
set TRAIN_CMD=python train.py ^
    --epochs 50 ^
    --batch-size 16
!TRAIN_CMD! --lr 0.0001
```


---

### 2. PowerShell (Windows, macOS, Linux)

PowerShell is a modern shell with object-aware semantics.

### Backtick (`) continuation (use with care)


```text
python train.py `
    --dataset chestxray `
    --epochs 50 `
    --batch-size 16 `
    --lr 0.0001
```


⚠️ The backtick must be the last character. Trailing whitespace breaks the command.

---

### Recommended: argument arrays (robust and clean)

This is the **preferred PowerShell pattern** for ML workflows.


```text
$cmd = @(
    "python", "train.py",
    "--dataset", "chestxray",
    "--epochs", "50",
    "--batch-size", "16",
    "--lr", "0.0001"
)
& $cmd
```


Benefits:

* No quoting issues
* Safe argument passing
* Easy to modify programmatically

---

### Example: Docker-based ML training


```text
$dockerCmd = @(
    "docker", "run", "--rm",
    "-v", "${PWD}:/workspace",
    "pytorch/pytorch:2.1.0-cuda11.8-cudnn8-runtime",
    "python", "train.py",
    "--epochs", "20"
)
& $dockerCmd
```


---

### 3. Bash (Linux and macOS)

### Backslash (`\`) line continuation

The most common Bash pattern.


```text
python train.py \
    --dataset chestxray \
    --epochs 50 \
    --batch-size 16 \
    --lr 0.0001 \
    --output runs/exp1
```


Rules:

* Backslash must be the final character
* No trailing spaces

---

### Recommended: array-based command execution

This is **best practice** for non-trivial ML scripts.


```text
cmd=(
  python train.py
  --dataset chestxray
  --epochs 50
  --batch-size 16
  --lr 0.0001
)

"${cmd[@]}"
```


Advantages:

* Correct argument handling
* No accidental word splitting
* Easy logging and debugging

---

### Example: model evaluation


```text
eval_cmd=(
  python evaluate.py
  --checkpoint runs/exp1/best.ckpt
  --split test
  --metrics dice iou
)

"${eval_cmd[@]}"
```


---

### 4. Zsh (macOS Default Shell)

macOS defaults to **Zsh**, which is largely Bash-compatible.

### Backslash continuation


```text
python infer.py \
    --model runs/exp1/best.ckpt \
    --input images/sample.png \
    --output preds/sample_mask.png
```


---

### Array-based invocation (recommended)


```text
infer_cmd=(
  python infer.py
  --model runs/exp1/best.ckpt
  --input images/sample.png
  --output preds/sample_mask.png
)

"${infer_cmd[@]}"
```


This is the cleanest approach for macOS-based ML development.

---

### 5. Cross-Platform Summary


```text
| OS / Shell    | Continuation | Best Practice      |
| ------------- | ------------ | ------------------ |
| Windows Batch | `^`          | Caret continuation |
| PowerShell    | `` ` ``      | Argument arrays    |
| Linux (Bash)  | `\`          | Arrays             |
| macOS (Zsh)   | `\`          | Arrays             |
```


---

### 6. Practical Recommendations

* Avoid one-line mega commands
* Prefer **arrays** where supported
* Never leave trailing whitespace after continuation characters
* Do not mix shell syntaxes
* For CI/CD and reproducible ML, clarity matters more than brevity

---

### Closing Thoughts

Multi-line commands are not just a cosmetic improvement — they directly affect the **correctness, portability, and maintainability** of ML pipelines. As workflows increasingly span Windows laptops, macOS development machines, Linux servers, and cloud CI systems, understanding OS-specific shell behaviour is essential.

If you routinely work with:

* ML training and evaluation pipelines
* Docker or containerized workloads
* HPC or Slurm job launchers
* Cross-platform CI/CD workflows

Then mastering these patterns will save you time and prevent subtle, hard-to-debug failures.

---

*If you found this useful, consider bookmarking it, clapping or sharing it with colleagues who routinely fight with long command lines.*

---
*Originally published on [Medium](https://medium.com/@mannasiladittya/writing-multi-line-commands-across-operating-systems-2800e41b0abd).*

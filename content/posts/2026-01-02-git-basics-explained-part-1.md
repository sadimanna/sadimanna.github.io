---
title: "Git Basics Explained — Part 1"
date: 2026-01-02
permalink: /blog/git-basics-explained-part-1/
canonical_url: https://medium.com/@mannasiladittya/git-basics-explained-part-1-eea0bab9e1b4
tags: [git, version-control, github, tutorial]
---
---

![](/images/blog/git-basics-explained-part-1/img1.jpeg)

Version control is an essential skill for every developer, researcher, or data scientist. **Git** is the most widely used version control system, allowing you to track changes, collaborate safely, and manage project history efficiently.

This article walks through **core Git concepts and commands**, explaining **what each does**, **how it is used**, **real examples**, **common beginner mistakes**, and **best practices**.

---

### 1. What Is Git?

**Git** is a **distributed version control system** that records changes to files over time. Each developer has a full copy of the repository, including its entire history.

### Why Git Matters

* Tracks changes in code and documents
* Enables collaboration without overwriting work
* Allows rollback to previous versions
* Supports branching and experimentation

---

### 2. Initializing a Repository (`git init`)

### What It Does

Creates a new Git repository in your project directory.

### Example


```text
mkdir my_project
cd my_project
git init
```


This creates a hidden `.git/` directory that stores all version control metadata.

### Common Mistakes

* Initializing Git **inside another Git repository**
* Deleting the `.git` folder accidentally

### Best Practices

* Initialize Git **once per project**
* Run `ls -a` to confirm `.git` exists

---

### 3. Cloning an Existing Repository (`git clone`)

### What It Does

Creates a local copy of a remote repository (e.g., from GitHub).

### Example


```bash
git clone https://github.com/user/repo.git
```


### When to Use

* Starting work on an existing project
* Contributing to open-source repositories

### Common Mistakes

* Editing files **before understanding the project structure**
* Cloning into an unintended directory

### Best Practices

* Read the `README.md` first
* Clone repositories in a dedicated `projects/` folder

---

### 4. Checking Repository Status (`git status`)

### What It Does

Shows the current state of the working directory and staging area.

### Example


```bash
git status
```


### Output Tells You

* Modified files
* Staged files
* Untracked files

### Common Mistakes

* Forgetting to run `git status` before committing

### Best Practices

* Run `git status` **frequently**
* Treat it as your “sanity check” command

---

### 5. Tracking Files (`git add`)

### What It Does

Moves changes from the **working directory** to the **staging area**.

### Examples


```bash
git add file.txt
git add .
```


### Common Mistakes

* Using `git add .` blindly
* Accidentally staging large or sensitive files

### Best Practices

* Stage files **intentionally**
* Use:


```bash
git add file1.py file2.py
```


---

### 6. Committing Changes (`git commit`)

### What It Does

Records a snapshot of staged changes in the repository history.

### Example


```bash
git commit -m "Add initial data preprocessing script"
```


### Common Mistakes

* Vague messages like `"update"` or `"fix"`
* Committing too many unrelated changes at once

### Best Practices

* Write **clear, descriptive commit messages**
* Follow a pattern:


```text
Short summary (50 chars max)
```



```text
Optional detailed explanation
```


---

### 7. Viewing History (`git log`)

### What It Does

Displays the commit history.

### Example


```bash
git log --oneline
```


### Use Case

* Understanding project evolution
* Debugging when a bug was introduced

### Common Mistakes

* Ignoring commit history completely

### Best Practices

* Use `--oneline` for readability
* Learn to search logs later with `--grep`

---

### 8. Ignoring Files (`.gitignore`)

### What It Does

Prevents certain files from being tracked.

### Example `.gitignore`


```text
__pycache__/
*.log
.env
data/
```


### Common Mistakes

* Adding `.gitignore` **after** committing files
* Forgetting to ignore large datasets

### Best Practices

* Create `.gitignore` **early**
* Never commit secrets (API keys, passwords)

---

### 9. Branching (`git branch`, `git checkout`, `git switch`)

### What It Does

Branches allow parallel development.

### Example


```bash
git branch feature-x
git switch feature-x
```


### Why Branches Matter

* Isolate experiments
* Avoid breaking the main codebase

### Common Mistakes

* Doing all work on `main`
* Forgetting which branch you are on

### Best Practices

* Keep `main` stable
* Use descriptive branch names:


```text
feature/login-ui
bugfix/memory-leak
```


---

### 10. Merging Branches (`git merge`)

### What It Does

Combines changes from one branch into another.

### Example


```bash
git switch main
git merge feature-x
```


### Common Mistakes

* Merging without pulling latest changes
* Panic when conflicts appear

### Best Practices

* Commit before merging
* Resolve conflicts **line by line**, not blindly

---

### 11. Working with Remote Repositories (`git push`, `git pull`)

### Pushing Changes


```bash
git push origin main
```


### Pulling Updates


```bash
git pull origin main
```


### Common Mistakes

* Forgetting to pull before pushing
* Force pushing (`--force`) without understanding consequences

### Best Practices

* Pull frequently
* Avoid force push on shared branches

---

### 12. Common Beginner Git Mistakes (Summary)

* Forgetting to commit changes
* Writing poor commit messages
* Tracking unnecessary files
* Working directly on `main`
* Ignoring merge conflicts

---

### 13. Git Best Practices for Beginners

* Commit early and often
* Keep commits small and focused
* Use `.gitignore`
* Check `git status` regularly
* Learn Git incrementally — don’t rush

---

### Conclusion

Git is not just a tool — it is a **workflow discipline**. Mastering Git basics early will save you hours of debugging, collaboration issues, and lost work later.

Once you are comfortable with these fundamentals, you can explore:

* Rebase
* Stashing
* Tags
* GitHub workflows and pull requests

***Coming Soon in Part 2…***

---
*Originally published on [Medium](https://medium.com/@mannasiladittya/git-basics-explained-part-1-eea0bab9e1b4).*

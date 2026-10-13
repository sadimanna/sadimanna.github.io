---
title: "How to Remove Large Files from Git History"
date: 2026-01-29
permalink: /blog/how-to-remove-large-files-from-git-history/
canonical_url: https://medium.com/@mannasiladittya/how-to-remove-large-files-from-git-history-05f5fa177de1
tags: [git, git-filter-repo, github, troubleshooting]
---
---

![](/images/blog/how-to-remove-large-files-from-git-history/img1.jpeg)

In a previous post, we discussed why adding a folder to `.gitignore` doesn’t retroactively stop Git from tracking it. The fix was straightforward:


```bash
git rm -r --cached outputs/
git commit
git push
```


After doing this, everything *looked* correct.  
On another machine, a simple `git pull` showed files being deleted.

So a natural question follows:

> ***If this worked, why do we ever need*** `git filter-repo`***?***

This post explains **why both behaviours are correct**, what problem each one solves, and how to safely clean large files from Git history **without breaking your repository**.

---

### Why `git rm --cached` does work

When you run:


```bash
git rm -r --cached outputs/
git commit
```


You create a new commit that says:

> *“From now on, these files no longer exist.”*

Git is **state-based**, not file-based.  
Each commit defines the *desired final state* of the repository.

So when another machine runs:


```bash
git pull
```


Git applies that state and correctly deletes the files locally.

That’s why it *appears* to solve the problem — and for the **present state**, it absolutely does.

---

### The critical distinction: present vs history

There are **two separate problems** people often confuse:


```text
|               Question.         | `git rm — cached` | `git filter-repo` |
| — — — — — — — — — — — — — — — — | — — — — — — — — — | — — — — — — — — — |
```


`git rm --cached` fixes the **present**.  
`git filter-repo` fixes the **past**.

---

### Why are deleted files still bloating the repo?

Even after removing files from the latest commit, they still exist in:

* old commits
* old trees
* old blobs

Git never forgets history unless you explicitly rewrite it.

That’s why:

* `git clone` is still slow
* CI pipelines still download large data
* GitHub warns about repo size

---

### When `git rm --cached` is enough

You **do not** need history rewriting if:

* The files were small
* Repo size is acceptable
* You only care about future commits
* You’re not hitting GitHub limits

This is the most common and perfectly valid case.

---

### When you must clean history

You need `git filter-repo` if:

* Large files were committed accidentally
* The repo has become bloated
* Cloning is slow
* GitHub rejects pushes
* You want files permanently erased

In short:

> `git rm --cached` *fixes* ***state***`git filter-repo` *fixes* ***history***

---

### The correct tool: `git filter-repo`

`git filter-repo` is the modern, supported way to rewrite Git history.

### Install


```bash
pip install git-filter-repo
```


---

### Step 1: Analyze repository bloat


```bash
git filter-repo --analyze
```


Check:

* `largest-blobs.txt`
* `path-deleted-sizes.txt`

This tells you exactly what needs removal.

---

### Step 2: Remove a folder from all history

Example: permanently removing `slurm_logs/` everywhere.


```bash
git filter-repo --path slurm_logs/ --invert-paths
```


After this:

* The folder never existed
* Repo size shrinks
* New clones become fast

---

### ⚠️ What happens next (this is where people panic)

After `git filter-repo`, you will likely see:


```text
NOTICE: Removing 'origin' remote
```


And then:


```bash
git push
fatal: No configured push destination
```


This is **expected behaviour**, not an error.

---

### Why `origin` is removed (important safety feature)

Rewriting history changes **every commit hash**.

To prevent accidental destruction of a remote repository, `git filter-repo`:

* Removes the `origin` remote
* Forces you to **explicitly re-add it**
* Makes you consciously acknowledge that you are about to overwrite history

This is deliberate and protective.

---

### How to finish the cleanup safely

### 1️⃣ Re-add the remote


```bash
git remote add origin https://github.com/USERNAME/REPO.git
```


Verify:


```bash
git remote -v
```


---

### 2️⃣ Force-push the rewritten history (required)


```bash
git push --force origin main
```


If you have tags:


```bash
git push --force --tags
```


This permanently replaces the remote history with the cleaned one.

---

### What must collaborators do?

Anyone else with a clone must **not pull normally**.

They must either:


```bash
git clone https://github.com/USERNAME/REPO.git
```


or:


```bash
git fetch --all
git reset --hard origin/main
```


There is no safe merge after history rewriting.

---

### How to verify success


```bash
git log -- slurm_logs/
```


→ no output


```bash
git count-objects -vH
```


→ significantly smaller repo size

---

### A mental model that always works

Think of Git history as a **ledger**, not a trash can.

* Deleting files → adds a new entry
* Rewriting history → rewrites the ledger

Both are valid. They solve different problems.

---

### TL;DR

* `git rm --cached` worked exactly as designed
* That’s why other machines showed deletions
* But the data still lived in history
* `git filter-repo` is only needed when history itself is the problem
* Removing `origin` after filtering is intentional and protective

Once you separate **state** from **history**, Git stops being mysterious and starts being predictable.

---
*Originally published on [Medium](https://medium.com/@mannasiladittya/how-to-remove-large-files-from-git-history-05f5fa177de1).*

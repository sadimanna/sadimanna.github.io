---
title: "Updating your Local Branch from a Specific Remote Branch in Git"
date: 2026-03-17
categories: ["Git", "Version Control"]
permalink: /blog/updating-your-local-branch-from-a-specific-remote-branch-in/
canonical_url: https://medium.com/the-owl/updating-a-specific-local-branch-from-remote-in-git-7fbff63f0ea5
tags: [github, git]
---
![](/images/blog/updating-your-local-branch-from-a-specific-remote-branch-in/img1.png)

Whether you’re collaborating on a feature or just keeping your work in sync, pulling changes to a non-main branch is a daily task for most developers. Here is how to do it cleanly.

### The Standard Approach

If you are already working on your local branch (let’s call it feature-login), You can pull changes directly from the remote version of that branch.


```text
# 1. Switch to your feature branch
git checkout feature-login

# 2. Pull changes from the remote 'origin' into your current branch
git pull origin feature-login
```


**What happens behind the scenes?**  
The git pull command is actually a combination of two actions:

1. **git fetch**: It downloads the new data from the remote repository.
2. **git merge**: It immediately tries to combine those changes into your local files.

### The Cleanest Method: Rebase

If you have local commits that haven’t been pushed yet, a standard pull creates a “**merge commit**.” To keep your history linear and easy to read, use the **rebase** flag.


```text
# Pull and replay your local work on top of the incoming changes
git pull --rebase origin feature-login
```


### The Pro Workflow: Step-by-Step

If you want total control and want to see what’s coming before you merge it, follow this three-step flow:

**1. Update your local “view” of the remote**


```bash
git fetch origin
```


This updates origin/feature-login in your local database, but doesn't touch your code yet.

**2. Compare the differences**


```bash
git log HEAD..origin/feature-login --oneline
```


This shows you exactly which commits are on the server that you don’t have yet.

**3. Bring the changes in**


```bash
git merge origin/feature-login
```


Common Gotchas

* **Merge Conflicts:** If you and a teammate edited the same line, Git will pause. You’ll need to open the files, pick the correct code, and run git commit to finish.
* **Wrong Branch:** Always run git branch before pulling to ensure you aren't accidentally pulling feature code into your main branch.

---

[Updating your Local Branch from a Specific Remote Branch in Git](https://medium.com/the-owl/updating-a-specific-local-branch-from-remote-in-git-7fbff63f0ea5) was originally published in [The Owl](https://medium.com/the-owl) on Medium, where people are continuing the conversation by highlighting and responding to this story.

---
*Originally published on [Medium](https://medium.com/the-owl/updating-a-specific-local-branch-from-remote-in-git-7fbff63f0ea5).*

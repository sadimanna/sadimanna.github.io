---
title: "Unlocking the Power of `%%shell` in Google Colab"
date: 2025-08-01
categories: ["Developer Tools", "Shell"]
permalink: /blog/unlocking-the-power-of-shell-in-google-colab/
canonical_url: https://medium.com/@mannasiladittya/unlocking-the-power-of-shell-in-google-colab-a-hands-on-guide-87d6e2b6d65a
tags: [colab, shell, bash, jupyter, tips]
---
---

![](/images/blog/unlocking-the-power-of-shell-in-google-colab/img1.jpeg)

Google Colab is a fantastic tool for data science, machine learning, and rapid prototyping in Python. While most users are familiar with running Python code in notebook cells, Colab also lets you execute shell commands, giving you the flexibility to interact with your environment just like in a terminal. If you’ve ever needed to install packages, manage files, or run bash scripts, you might have used the handy *`!`* prefix to run shell commands. But did you know Colab offers an even more powerful tool: the ***%%shell*** magic?

In this article, we’ll explore what *`****%%shell****`* is, how it differs from single-line shell commands, and how you can use it to streamline your Colab workflow.

---

### What is `%%shell` in Google Colab?

The *`****%%shell****`* magic is a Colab-specific command that lets you run multi-line shell scripts directly in a notebook cell. Unlike the *`!`* prefix, which is used for single-line shell commands, *`****%%shell****`* allows you to write complex shell scripts, use loops, set environment variables, and chain multiple commands together — just like writing a bash script!

### Example: Listing Files in a Directory

Suppose you want to list all files in a specific directory in your Colab environment. Here’s how you’d do it with *`****%%shell****`*:


```text
%%shell 
cd /content/sample_data 
ls
```


This cell changes the working directory to *`****/content/sample\_data****`* and lists its contents.

---

### Why Use `%%shell` Instead of `!`?

* Multi-line scripts: With *`!`*, you can only run one command per line. With *`%%shell`*, you can write as many lines as you want.
* Shell features: Use loops, conditionals, environment variables, and more.
* Script-like behaviour: It’s like writing a mini bash script right inside your notebook!

### Example: Installing and Verifying a Package


```text
%%shell 
pip install cowsay 
cowsay -t "Hello, Colab!" -c "dragon"
```


This installs the fun *`cowsay`* package and immediately runs it — all in one cell.

---

### When Should You Use `%%shell`?

* Complex command sequences: When you have several shell commands to run together.
* Shell scripting: When you want to use features like *`for`* loops or *`if`* statements.
* Environment setup: When installing software, copying files, or preparing your workspace.

---

### Limitations and Tips

* Colab-specific: *`****%%shell****`* is unique to Google Colab. In standard Jupyter notebooks, use *`****%%bash****`* or the *`!`* prefix.
* No persistent working directory: Each *`****%%shell****`* cell starts in the default directory, so always *`cd`* to your target folder within the cell.
* Sharing variables: Python and shell cells don’t share variables directly. If you need to pass data, write to a file from Python and read it in the shell, or vice versa.

---

### Best Practices

1. Create Directories If Needed


```text
!mkdir -p /content/my_data
```


2. Use Absolute Paths. Always use full paths like *`****/content/my\_data****`* to avoid confusion.

3. Combine Commands


```text
%%shell    
cd /content/my_data    
wget https://example.com/data.csv
ls -lh
```


---

#### Jupyter Notebook (local)

* ❌ *`****%%shell****`* is not standard in classic Jupyter Notebook or JupyterLab.
* On many Jupyter setups, the equivalent is *`!`* (for single-line shell commands) or *`****%%bash****`* (for multi-line shell scripts).
* Use *`****%%bash****`* instead:


```text
%%bash       
cd /some/folder       
ls
```


---

### Conclusion

The *`****%%shell****`* magic in Google Colab is a powerful feature that bridges the gap between Python and shell scripting, making your notebooks more flexible and capable. Whether you’re setting up your environment, running system commands, or just exploring your files, *`****%%shell****`* gives you the full power of the shell right inside your notebook.

Try it out in your next Colab project and see how it can simplify your workflow!

---
*Originally published on [Medium](https://medium.com/@mannasiladittya/unlocking-the-power-of-shell-in-google-colab-a-hands-on-guide-87d6e2b6d65a).*

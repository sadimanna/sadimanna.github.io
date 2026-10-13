---
title: "How to run Shell scripts in Windows"
date: 2023-01-31
categories: ["Developer Tools", "Shell"]
permalink: /blog/how-to-run-shell-scripts-in-windows/
canonical_url: https://medium.com/@mannasiladittya/how-to-run-shell-scripts-in-windows-87371211028e
tags: [windows, shell-script, bash, command-line]
---
---

![](/images/blog/how-to-run-shell-scripts-in-windows/img1.jpeg)

[Source](https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.reddit.com%2Fr%2Flinuxmasterrace%2Fcomments%2Fiihl28%2Ftux_peeping_into_windows_wallpaper%2F&psig=AOvVaw3SEHe4dt-tCB4Zx9Gqpoz9&ust=1675266248877000&source=images&cd=vfe&ved=0CBAQjRxqFwoTCLDgsZ-T8vwCFQAAAAAdAAAAABAE)

## Running Shell Scripts on Windows

> YES, we can. But that will require a bit of work.

### 1. Using Bash on Windows (Git Bash, Cygwin, MinGW)

Installing Cygwin, MinGW, or Git Bash on Windows and adding the path where it is installed to the Environment variables will allow us to run “.sh” files on Windows from Command Prompt.

### 2. Converting .sh Files to .bat Batch Scripts

“***.bat***” extensions are used for batch scripts, which are also used to automate tasks on Windows. Commands for Shell scripting and Batch scripting are not exactly the same, but commands from shell scripts can be converted for like-to-like commands in batch scripts.

A simple converter can be found here: <https://daniel-sc.github.io/bash-shell-to-bat-converter/>

However, this tool does not support converting loop conversion from shell to batch. Any user can do so by studying the tutorials given below:

1. <https://www.section.io/engineering-education/dive-into-batch-scripting-language/>
2. <https://en.wikibooks.org/wiki/Windows_Batch_Scripting>
3. <https://www.youtube.com/playlist?list=PL8WTXLSrtyWrQ5Tl50zkTeRc3bATyHRbX>
4. <https://www.youtube.com/playlist?list=PL69BE3BF7D0BB69C4>

### Tutorials and Resources

1. <https://www.shellscript.sh/>
2. <https://www.youtube.com/playlist?list=PLS1QulWo1RIYmaxcEqw5JhK3b-6rgdWO_>
3. <https://www.youtube.com/playlist?list=PL7B7FA4E693D8E790>
4. <https://www.youtube.com/playlist?list=PLBf0hzazHTGMJzHon4YXGscxUvsFpxrZT>

---
*Originally published on [Medium](https://medium.com/@mannasiladittya/how-to-run-shell-scripts-in-windows-87371211028e).*

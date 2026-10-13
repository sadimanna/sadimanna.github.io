---
title: "The Smart Way to Copy: How to Use rsync to Exclude Folders, Ignore or Update Existing Files"
date: 2025-10-03
categories: ["Linux", "Developer Tools"]
permalink: /blog/the-smart-way-to-copy-how-to-use-rsync-to-exclude-folders-ig/
canonical_url: https://medium.com/@mannasiladittya/the-smart-way-to-copy-how-to-use-rsync-to-exclude-folders-ignore-or-update-existing-files-132730f78881
tags: [linux, rsync, bash, file-management]
---
---

![](/images/blog/the-smart-way-to-copy-how-to-use-rsync-to-exclude-folders-ig/img1.jpeg)

For those who regularly manage backups, migrate data, or need to move a large number of files, the `rsync` command is an indispensable tool. Unlike a simple `scp` command, `rsync` is built for efficiency and flexibility. With a few simple flags, you can precisely control which files are copied, which are ignored, and which are updated.

This guide will show you how to use `rsync` to handle two common scenarios:

1. Excluding specific folders from a copy operation.
2. Avoiding the overwriting of existing files in the destination.
3. Updating existing files in the destination.

### Excluding specific directories

Let’s say you’re backing up your website directory but want to skip large, unnecessary folders like cached files or git repositories. `rsync` makes this simple with the `--exclude` flag.

**The scenario:**  
You want to copy everything from `~/my_website/` to a backup location, `~/backups/`, but you want to skip the `node_modules/` and `.git/` directories.

**The command:**


```text
rsync -av --exclude 'node_modules/' --exclude '.git/' ~/my_website/ ~/backups/
```


**Breaking it down:**

* `-a`: Activates "archive mode." This is a standard option that ensures a recursive copy while preserving permissions, ownership, and timestamps.
* `-v`: Stands for "verbose," which gives you a clear output of what `rsync` is doing.
* `--exclude 'directory_to_exclude/'`: The key to ignoring a specific folder. The trailing slash `/` is important here, as it ensures that only directories with that name are excluded, not files.
* `~/my_website/`: The source directory. The trailing `/` on the source path tells `rsync` to copy the *contents* of the directory, not the directory itself.
* `~/backups/`: The destination directory.

**For multiple or complex exclusions**, you can create a file (e.g., `exclude_list.txt`) and use the `--exclude-from` flag instead.

### Ignoring existing files

Another common task is adding new files to a destination without overwriting any files that are already there. This is especially useful for an interrupted transfer or when you just want to append to a collection.

**The scenario:**  
You have a set of photos in a source folder, but you’ve already copied some of them to the destination. You want to add any new photos without touching the existing ones.

**The command:**


```text
rsync -av --ignore-existing ~/new_photos/ ~/all_photos/
```


**How it works:**

* `--ignore-existing`: This flag tells `rsync` to skip any file that already exists in the destination directory. This is a more direct approach than `--update` (which only skips files if the destination's modification time is newer), making it perfect for your needs.

#### Putting it all together

You can combine these powerful features into a single command for maximum efficiency.

**The scenario:**  
Copy all new website files to your backup directory, skipping unnecessary build files and leaving existing backups untouched.

**The combined command:**


```text
rsync -av --exclude 'node_modules/' --exclude 'cache/' --ignore-existing ~/my_website/ ~/backups/
```


By mastering these `rsync` flags, you can perform highly specific and efficient file transfers, saving time and avoiding manual cleanup.

### Updating existing files in the destination.

The `-u` or `--update` flag in `rsync` ensures that it will not overwrite any files in the destination directory that are newer than their corresponding source files. It is used to protect newer data at the destination from being accidentally replaced by older versions from the source.

Here’s a breakdown of how it works:

* **Standard** `rsync` **behavior:** By default, `rsync` decides which files to update by comparing the last-modified time and size. If a file in the destination is older or has a different size than the source file, it is updated.
* `rsync` **with** `-u`**:** With the `--update` flag, `rsync` adds another condition. It will only update a file if the source file has a *more recent* modification time. If the destination file has a newer or identical timestamp, the file is skipped.

#### When to use `-u`

The `--update` flag is useful in several scenarios:

* **Preventing downgrades:** If you have manually edited a file on a remote server and then later run a sync operation from your local machine, the `-u` flag prevents the older local version from overwriting your newer remote changes.
* **Multi-directional syncs:** When syncing files between multiple locations, `--update` helps prevent unintentional rollbacks of recent edits.
* **Resuming failed transfers:** While `rsync` has other mechanisms for resuming transfers (like `-P`), combining it with `-u` can ensure that you only transfer files that are actually new or more recent, skipping anything that was already partially or fully copied with a newer timestamp.

#### Example

Imagine a `source` directory and a `destination` directory.

**Directory contents:**


```text
source/
└── file.txt  (last modified: 10:00 AM)

destination/
```


**With the standard** `-a` **(archive) flag,** `rsync` **would run like this:**


```text
rsync -av source/ destination/
```


In this case, `rsync` sees that the destination `file.txt` has a newer timestamp and would **skip** the file, as this is the default behavior when the destination is newer. However, adding the `-u` flag makes this behavior explicit.

**With the** `-u` **flag,** `rsync` **makes this explicit:**


```text
rsync -auv source/ destination/
```


This command will perform the same action, ensuring that files on the destination that are newer are not overwritten.

**Contrast with** `--ignore-existing`**:**  
The `--ignore-existing` flag is different from `-u`. `--ignore-existing` will never overwrite an existing file at the destination, regardless of its modification time. It only copies files that do not exist at all in the destination. The `-u` flag is more flexible and still allows for updates, but only when the source file is newer.

---

Clap and share if you found this post useful.

---
*Originally published on [Medium](https://medium.com/@mannasiladittya/the-smart-way-to-copy-how-to-use-rsync-to-exclude-folders-ignore-or-update-existing-files-132730f78881).*

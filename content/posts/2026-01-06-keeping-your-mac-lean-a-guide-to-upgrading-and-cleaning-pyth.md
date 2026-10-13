---
title: "Keeping Your Mac Lean: A Guide to Upgrading and Cleaning Python (2026 Edition)"
date: 2026-01-06
categories: ["Python", "Developer Tools"]
permalink: /blog/keeping-your-mac-lean-a-guide-to-upgrading-and-cleaning-pyth/
canonical_url: https://medium.com/@mannasiladittya/keeping-your-mac-lean-a-guide-to-upgrading-and-cleaning-python-2026-edition-b03c9e81a182
tags: [macos, python, pyenv, package-management, developer-tools]
---
---

![](/images/blog/keeping-your-mac-lean-a-guide-to-upgrading-and-cleaning-pyth/img1.jpeg)

Managing Python on macOS has evolved. With the release of **Python 3.14** expected in late 2025 and **3.13** currently established as the stable standard, keeping your development environment clean is more critical than ever.

Whether you’re dealing with legacy versions from the official installer or trying to move a project to the latest release using `pyenv`, this guide covers the safest workflows for 2026.

---

### Part 1: Upgrading Python in a pyenv Virtualenv

Virtual environments are essentially “pinned” to the Python binary used at the time of their creation. To upgrade a `pyenv-virtualenv` to a newer version (e.g., 3.12 to 3.13), the gold standard is the **Export-Recreate** method.

#### Step 1: Backup Your Environment

Activate your current environment and export your dependencies.


```text
pyenv activate my-old-env
pip freeze > requirements.txt
pyenv deactivate
```


#### Step 2: Install the New Python Version

Update `pyenv` via [Homebrew](https://brew.sh/) first to ensure the latest versions are available for installation.


```text
brew update && brew upgrade pyenv
pyenv install 3.13.0
```


#### Step 3: Recreate the Environment

Delete the old environment and create a new one using the updated Python version.


```text
pyenv virtualenv-delete my-old-env-name
pyenv virtualenv 3.13.0 my-old-env-name
```


#### Step 4: Restore Dependencies


```text
pyenv activate my-old-env-name
pip install -r requirements.txt

############# OR ################

pyenv activate my-old-env-name
pip install uv
uv pip install -r requirements.txt
```


---

### Part 2: Deleting Old Python Installations

Over time, macOS can become cluttered with Python versions from different sources. Here is how to remove them without breaking your system.

#### 1. Uninstalling via pyenv (The Cleanest Way)

If you used `pyenv` to manage versions, removal is a single command. This safely removes the version directory and updates your shims.

* **Command:** `pyenv uninstall <version_number>`
* **Example:** `pyenv uninstall 3.10.2`

#### 2. Removing Homebrew Versions

Homebrew-installed Python is often a dependency for other tools (like `glib` or `pyenv` itself). Only remove it if you are certain that no other Homebrew packages require it.

* **Command:** `brew uninstall python@<version>`
* **Cleanup:** Run `brew autoremove` to delete orphaned dependencies.

#### 3. Deleting the Official Python.org Installer

If you used the `.pkg` installer from the official website, you must manually delete the framework and application folders.

1. **Applications:** Move the `/Applications/Python X.Y` folder to the Trash.
2. **Frameworks:** Open Terminal and run:  
   `sudo rm -rf /Library/Frameworks/Python.framework/Versions/X.Y`
3. **Symlinks:** Clean up broken links in `/usr/local/bin` using `ls -l /usr/local/bin | grep python` to identify them, then `rm` those specific links.

---

### 2026 Pro-Tip: The “System Python” Rule

**Never** attempt to delete the Python version located at `/usr/bin/python3`. This is a "stub" provided by Apple as part of the Xcode Command Line Tools. Removing or modifying it can cause core macOS utilities and third-party apps like `brew` to fail.

Summary Checklist

* **Check existing versions:** `pyenv versions` or `which -a python3`.
* **Identify the source:** Determine if it’s from Homebrew, `pyenv`, or a manual installer before deleting.
* **Isolate everything:** Use `pyenv-virtualenv` or newer tools like `uv` to ensure your projects never depend on a specific system-wide version.

---
*Originally published on [Medium](https://medium.com/@mannasiladittya/keeping-your-mac-lean-a-guide-to-upgrading-and-cleaning-python-2026-edition-b03c9e81a182).*

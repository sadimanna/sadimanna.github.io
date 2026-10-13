---
title: "Pushing Changes to a New Private Repository: A Step-by-Step Guide"
date: 2025-07-28
permalink: /blog/pushing-changes-to-a-new-private-repository-a-step-by-step-g/
canonical_url: https://medium.com/@mannasiladittya/pushing-changes-to-a-new-private-repository-a-step-by-step-guide-cb07ffa872cb
tags: [git, github, version-control]
---
---

![](/images/blog/pushing-changes-to-a-new-private-repository-a-step-by-step-g/img1.jpeg)

Are you working on a project and want to push your changes to a new private repository? Look no further! In this article, we'll walk you through the process of creating a new private repository and pushing your changes to it.

#### Step 1: Create a New Private Repository

To start, you'll need to create a new private repository on GitHub. Follow these simple steps:

**Method 1: Create a Repository using GitHub Website**

- Log in to your GitHub account and click on the "+" button in the top-right corner.  
- Select "New repository" from the dropdown menu.  
- Fill in the required information, such as repository name and description.  
- Make sure to select "Private" as the repository type.  
- Click on "Create repository" to create your new private repository.

**Method 2: Create a Repository via Terminal**

* Open your terminal and run the following command to create a new repository:


```text
gh repo create <repo-name> --private
```


* Replace `<repo-name>` with the name of your repository

If you haven’t installed the GitHub CLI, you can do so by following the instructions [here](https://github.com/cli/cli#installation).

#### Step 2: Add the New Repository as a Remote

Once you've created your new private repository, you'll need to add it as a remote to your local repository. Here's how:

- Open your terminal and navigate to your local repository.  
- Run the following command to add the new repository as a remote:


```bash
git init
git remote add new-repo https://github.com/user-name/repo-name.git
```


- Replace `<new-repo-url>` with the URL of your new private repository.

#### Step 3: Verify the Remotes

To verify that the new repository has been added correctly, run the following command:


```bash
git remote -v
```


This will display a list of all the remotes associated with your local repository. Make sure your new private repository is listed.

#### Step 4: Push Changes to the New Repository

Finally, it's time to push your changes to the new private repository. Run the following command:


```bash
git add .
git commit -m "First Commit"
git push -u new-repo <branch-name>
```


- Replace `<branch-name>` with the name of the branch you want to push (e.g., `main` or `master`).

#### Example


```bash
git remote add new-repo https://github.com/your-username/new-repo-name.git
git remote -v
git push -u new-repo main
```


That's it! Your changes should now be pushed to your new private repository. If you encounter any issues or need further assistance, feel free to ask.

#### **Tips and Variations**

- Make sure to replace `<new-repo-url>` and `<branch-name>` with the actual values for your repository.  
- If you're using SSH authentication, use the SSH URL for your repository instead of the HTTPS URL.  
- You can also use `git push --all` to push all branches to the new repository.

By following these simple steps, you can easily push your changes to a new private repository. Happy coding!

---
*Originally published on [Medium](https://medium.com/@mannasiladittya/pushing-changes-to-a-new-private-repository-a-step-by-step-guide-cb07ffa872cb).*

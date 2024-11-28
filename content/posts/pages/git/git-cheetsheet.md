
---
title: "Git Commands and Configuration Guide" #this is tile and title for social share
date: 2024-10-18
description: "A comprehensive guide for configuring Git, managing repositories, and handling Git workflows." #description for social share
ShowToc: true
#tocopen: true
categories: ["Git"]
tags: ["Git", "Version Control", "Development"] #this is keyword
summary: "A brief tutorial on github recipe and git command" #this come in post
images: ["/images/gitcheetsheet.png"]  #for social share
---

<!-- 
#![Git Cheetsheet  This is lt text](/images/gitcheetsheet.png)
-->



## 1. Configure Git

To set up your Git username and email globally on your machine:

```bash
git config --global user.name "username"        # Set your Git username
git config --global user.email "email"          # Set your Git email
git config --list                               # Display the current Git configuration (username and email)
```

---

## 2. Git Status and Git Clone

Clone a remote repository to your local machine:

```bash
git clone <url>                                 # Copy repository to the local machine
```

Check the status of your local repository:

```bash
git status                                     # Show the current status of the repository
```

### Git Status Breakdown:
- **untracked**: A new file that has not been added or committed.
- **unstaged**: A file that has been added but not committed.
- **unchanged**: No changes have been made.
- **changed**: Changes have been made but not yet added or committed.

---

## 3. Git Add and Commit

Add specific files or all changes and commit them:

```bash
git add <filename>                             # Add a specific file to the staging area
git add .                                      # Add all changes (modified and untracked files)
git commit -m "Your commit message"            # Commit the changes with a message
```

---

## 4. Push Local Repo to Remote

To upload your local repository changes to the remote repository:

```bash
git push [alias] [branch]                      # Push changes to a specific alias and branch
git remote add <alias> <url>                   # Add a remote alias (e.g., 'origin')
git push -u [alias] [branch]                   # Save the alias and branch for future pushes
```

---

## 5. Git Initialization

Initialize a new Git repository:

```bash
git init                                       # Initialize a new Git repository
```

---

## 6. Git Branches

Manage Git branches with the following commands:

```bash
git branch                                    # List all local branches
git branch -m <oldbranch> <newbranch>          # Rename a branch
git checkout <branchname>                      # Switch to another branch
git checkout -b <branchname>                   # Create and switch to a new branch
git branch -d <branchname>                     # Delete a branch (ensure you're not on it)
git diff <branchname>                          # Compare the current branch with another
```

---

## 7. Git Merge

Merge changes from one branch into another:

```bash
git merge <branchname>                         # Merge changes from <branchname> into the current branch
```

---

## 8. Pull Request and Syncing Changes

To pull updates from the remote repository to your local one:

```bash
git pull                                      # Pull the latest changes from the remote repository
git pull [alias] [branch]                     # Pull changes from a specific alias and branch
```

---

## 9. Undoing Changes

### If You Have Only Added Changes:

```bash
git reset <filename>                          # Unstage a file from the staging area
git reset                                     # Unstage all files that have been added
```

### If You Have Committed Changes:

```bash
git reset HEAD~1                              # Undo the last commit (one step back)
git reset <commit_hash>                       # Reset to a specific commit hash
git reset --hard <commit_hash>                # Hard reset to a commit and reflect changes in your editor
git log                                       # View all commit hashes and logs
```

---

## 10. Forking Repositories

When contributing to open-source projects, you can fork a repository, which creates a copy of the repo under your GitHub account. Afterward, you can make changes and submit a pull request:

```bash
# Fork a repository on GitHub and clone it locally
git clone <forked_repo_url>                   # Clone your forked repository
```

---
Make changes, commit them, and push to your fork. Finally, create a pull request on GitHub to merge your changes into the original repository.


---

## IF ANY CONCEPT IS LAGGING THEN:
[Watch this helpful video](https://www.youtube.com/watch?v=Ez8F0nW6S-w)

---


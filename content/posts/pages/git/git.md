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
# Git Cheat Sheet

*Last updated: August 12, 2025*

## Introduction

Git is a version control system that allows you to track changes in files and collaborate with others. This cheat sheet provides a quick reference for common Git commands.

## Commands Overview

### 1. Initializing a Repository

```bash
git init                      # Initialize a new Git repository in the current directory
```

**Why use it:** To start tracking changes in a new project.

### 2. Git Status

```bash
git status                    # Show the current status of the repository
```

**Git status breakdown:**
- **untracked**: A new file that has not been added or committed
- **unstaged**: A file that has been added but not committed
- **unchanged**: No changes have been made
- **changed**: Changes have been made but not yet added or committed

### 3. Git Ignore

Git ignore is used to specify files or directories that should not be tracked by Git. Create a `.gitignore` file in your repository and list the files or patterns to ignore.

```bash
# Example .gitignore content
*.log                         # Ignore all log files
*.tmp                         # Ignore all temporary files
node_modules/                 # Ignore the node_modules directory
```

### 4. Git Lifecycle

The Git lifecycle consists of several stages:
- **Working Directory**: Where you make changes to files
- **Staging Area**: Where you stage changes before committing
- **Repository**: Where committed changes are stored

**What git add does:**
- Moves changes from the working directory to the staging area

**What git commit does:**
- Moves changes from the staging area to the repository, creating a new commit

Here git add prepares what changes will be included in the next commit, while git commit finalizes those changes and saves them in the repository history.

#### git add – Stage changes

**Purpose:** To prepare specific changes (modified files) to be included in the next commit. It moves changes from the working directory ➝ to the staging area. Think of it as selecting what you want to save.

#### git commit – Save staged changes

**Purpose:** To permanently record the staged changes into the project's history. It moves changes from the staging area ➝ to the repository (the actual Git history). Each commit has a message and a snapshot of what was staged.

### 5. Git Add

Git add is used to move changes from the working directory to the staging area. This prepares the changes to be committed later. You can add specific files or all changes.

```bash
git add <filename>            # Add a specific file to the staging area
git add .                     # Add all changes (modified and untracked files)
```

### 6. Git Reset

Once you have done `git add`, it moves changes to the staging area. But if you want to undo that, you can use `git reset` to unstage changes.

```bash
git reset <filename>          # Unstage a specific file
git reset                     # Unstage all changes
```

### 7. Git Commit

Git commit is used to move changes from the staging area to the repository, creating a new commit with a message describing the changes.

```bash
git commit -m "Your commit message"    # Commit the changes with a message
```

Every commit creates a snapshot of the project at that point in time, allowing you to track changes and revert if necessary.

> **Tip:** To add and commit changes in one step, you can use:
> ```bash
> git commit -am "Your commit message"   # Add and commit changes in one step
> ```

### 8. Git Log

Git log is used to view the commit history of the repository. It shows a list of commits with their messages, authors, and dates.

```bash
git log                       # Show the commit history
```

### 9. Git Remote

Since Git is often used for collaboration, you can connect your local repository to a remote repository (like GitHub or GitLab) to share changes with others. To connect your local repository to a remote repository, you can use git remote commands.

```bash
git remote -v
```

**Output:**
```
origin https://github.com/username/repo.git (fetch)
origin https://github.com/username/repo.git (push)
```

### 10. Git Remote Add

To add a remote repository, use the following command:

```bash
git remote add <alias> <url>  # Add a remote alias (e.g., 'origin')
```

`<alias>` is a short name for the remote repository and `<url>` is the URL of the remote repository.

### 11. Git Push

Git push is used to upload your local repository changes to the remote repository. You can specify the remote alias and branch you want to push to.

```bash
git push [alias] [branch]                    # Push changes to a specific alias and branch
git push -u [alias] [branch]                 # Save the alias and branch for future pushes
```

**Example:**
```bash
git push origin master                       # Push changes to the 'master' branch on 'origin'
```

When we use the `-u` flag, it sets the upstream branch for the current branch, allowing you to use `git push` without specifying the remote and branch in future pushes and git pull will automatically know which remote branch to pull from:

```bash
git push
git pull
```

### 12. Syncing with Remote

When collaborating with others, it's important to keep your local repository in sync with the remote repository.

Since other team members might add features or fix bugs and push those changes to the same remote repository and branch, after you clone the repository, you need to ensure your local copy stays up to date. This way, your local repository contains both your changes and the updates made by others working on the same project.

**For example:** Imagine you and your team members are working on different features. You clone the repository and start adding your new feature by making changes locally. Meanwhile, your friend is also working on a different feature. Your friend finishes their work first and pushes those changes to the remote repository, while you have only partially completed your work.

To keep your local repository synchronized with the remote one — which now contains your friend's updates — you need to sync or update your local repository. This ensures your local copy has the latest remote repository data along with your own ongoing changes.

#### 12.1 Git Fetch

git fetch downloads the latest changes from the remote repository without merging them into your current local branch. It updates your remote-tracking branches, giving you a view of the latest changes on the remote.

```bash
git fetch
```

**Example:** Suppose you cloned a remote repository. Meanwhile, a collaborator also cloned the same repository, made some changes, and pushed them to the remote branch. By running git fetch, you download those remote changes. However, your current branch remains unchanged until you explicitly merge those changes.

#### 12.2 Git Merge

**Prerequisite:** You should commit or stash your local changes before merging to avoid conflicts.

After fetching, you can merge the changes from the remote branch into your current local branch:

```bash
git merge origin/main
```

Replace `main` with the appropriate branch name.
Replace `origin` with the name of your remote repository (commonly `origin`).

This command applies the changes fetched from the remote branch (`origin/main`) into your local branch, updating your working copy with the latest changes. Such that your local branch now contains both your changes and the updates made by your collaborator.

### 13. Git Pull

**Prerequisite:** You should commit or stash your local changes before pulling.

Instead of using `git fetch` followed by `git merge`, you can use `git pull`, which combines both commands into one. It fetches the latest changes from the remote repository and merges them into your current branch.

```bash
git pull [alias] [branch]     # Pull changes from a specific alias and branch
git pull origin main          # Pull changes from the 'main' branch on 'origin'
```

But if you have used `git push -u [alias] [branch]` once before, you can simply use:

```bash
git pull                      # Pull changes from the default remote and branch
```

### 14. Merge Conflicts

When performing a pull or merge, you may encounter a merge conflict if changes in the remote branch overlap with your local changes. This occurs when Git cannot automatically merge changes from different sources because they affect the same lines in a file.

**If no conflict occurs:**
Git will automatically merge the changes and create a new commit to update your local branch.

**If a conflict occurs:**
Git will pause the merge and mark the conflicting sections in the affected files.

You must:
1. Open the files and manually resolve the conflicts
2. Stage the resolved files
3. Commit the changes

> **Note:** Git will not automatically commit the merge if there are conflicts. You must resolve them first.

### 15. Git Clone

Git clone is used to create a local copy of a remote repository. It downloads the entire repository, including its history, branches, and files.

```bash
git clone <url>               # Clone a remote repository
```

`<url>` is the URL of the remote repository you want to clone.

## 16. Git Branch

When collaborating with others, different team members often work on different features or fixes simultaneously. To keep work organized and prevent conflicts, Git uses **branches** to isolate changes. Each branch acts like a separate workspace where developers can work independently without affecting the main codebase until their changes are ready to be merged.

**Example:**
- The main branch is called `main`
- Alice wants to add a login page, so she creates a branch called `feature-login`
- Bob wants to fix a navigation bar issue, so he creates a branch called `bugfix-header`

Both Alice and Bob can work on their respective branches without impacting the `main` branch or each other's work. Once their changes are tested and reviewed, their branches can be merged back into `main`.

> **Note:** Branches are like separate workspaces within the same repository, allowing you to develop features or fixes independently.

### 16.1 Show All Branches

To list all local branches in your repository:

```bash
git branch
```

**Example output:**
```
  main
* master
```

The `*` indicates the branch you are currently on.

### 16.2 Create a New Branch

To create a new branch:

```bash
git branch <branch-name>
```

**Example:**
```bash
git branch new-feature
```

This creates a new branch named `new-feature`.

### 16.3 Rename a Branch

To rename the current branch:

```bash
git branch -m <new-branch-name>
```

**Example:**
```bash
git branch -m new-feature
```

This renames the current branch to `new-feature`.

### 16.4 Delete a Branch

To delete a branch:

```bash
git branch -d <branch-name>    # Safe delete; only if fully merged
git branch -D <branch-name>    # Force delete; even if not merged
```

### 16.5 Switch to Another Branch

To switch from your current branch to another:

```bash
git checkout <branch-name>
```

## How Branching Works — Step by Step Example

Imagine you have a main branch called `master` and want to add a new feature.

1. You create a new branch `new-feature` based on `master`. This means `new-feature` starts as an exact copy of `master`

2. You switch to the `new-feature` branch:
   ```bash
   git checkout new-feature
   ```

3. You make changes in `new-feature` and commit them. These changes **do not affect** the `master` branch.

4. When you switch back to `master`:
   ```bash
   git checkout master
   ```
   You will **not see** the changes made in `new-feature`. Your `master` branch remains unchanged.

5. Similarly, if you modify the `master` branch and commit changes there, these changes **will not automatically appear** in the `new-feature` branch. Each branch is independent until you explicitly merge changes between them.

6. You can continue working on both branches independently without affecting each other.

### Summary

- Branches provide isolated workspaces
- Changes in one branch do **not** affect others until merged
- Changes committed on `master` do not show up in other branches like `new-feature` unless merged
- This allows parallel development without conflicts
- When ready, branches are merged back to the main branch (`main` or `master`)

## 17. Combining Branches

### 17.1 Git Merge

To merge changes from one branch into another. I.e., combining the work done in different branches into a single branch.

```bash
git merge <branch-name>       # Merge changes from <branch-name> into the current branch
```

### 17.2 Abort a Merge

If you encounter issues during a merge and want to abort it:

```bash
git merge --abort             # Abort the current merge process
```

> **Note:** This command works only when there is a merge conflict. If there is no merge conflict, it will not work.
> 
> This command can be used in the middle of a merge process to stop the merge and return to the state before the merge started.
> 
> This means it can be used between git merge and git commit, if you want to stop the merge process and return to the state before the merge started.

### 17.3 Example of Merging Branches

Suppose I have a master branch and a feature branch called `feature-xyz`. I made changes in both branches and now I want to combine the changes from `feature-xyz` into `master`.

1. First, switch to the `master` branch:
   ```bash
   git checkout master
   ```

2. Then, merge the `feature-xyz` branch into `master`:
   ```bash
   git merge feature-xyz
   ```

## 18. Contributing to Open Source

Contributing to open source projects is a great way to improve your skills and collaborate with others. Here's how you can get started:

1. **Find a Project**: Look for open source projects that interest you on platforms like GitHub, GitLab, or Bitbucket.

2. **Fork the Repository**: Create a personal copy of the repository by forking it. This allows you to make changes without affecting the original project.

3. **Clone Your Fork**: Clone your forked repository to your local machine using:
   ```bash
   git clone <your-fork-url>
   ```

4. **Create a Branch**: Before making changes, create a new branch for your work:
   ```bash
   git checkout -b <your-branch-name>
   ```

5. **Make Changes**: Edit the files, add new features, or fix bugs in your branch.

6. **Stage and Commit**: Stage your changes and commit them with a descriptive message:
   ```bash
   git add .
   git commit -m "Description of changes"
   ```

7. **Push Changes**: Push your changes to your forked repository:
   ```bash
   git push origin <your-branch-name>
   ```

8. **Create a Pull Request**: Go to the original repository and create a pull request (PR) from your branch. This notifies the project maintainers about your changes and allows them to review and merge your work.

9. After your PR is reviewed and approved, it will be merged into the main project. You can then delete your branch if it's no longer needed.

## 19. Going Back in History

As git is a version control system, it allows you to go back in history and view or revert to previous versions of your files. To go back to the previous commit:

### 19.1 Git Reset

This command will allow you to go back to the previous commit and discard all changes made after that commit.

```bash
git reset --hard <commit-hash>
```

> **Note:** commit-hash can be found using `git log` command, which shows the commit history along with their hashes.

It will remove all changes made after the specified commit and reset the working directory to that state.

**Example:**
```
A -> B -> C -> D (HEAD)
```

If you run `git reset --hard B`, it will reset the working directory to the state of commit B, and the history will look like this:

```
A -> B (HEAD)
```

All logs after B will be removed, and the working directory will be reset to the state of commit B.

### 19.2 Git Revert

**Prerequisite:** You should commit or stash your local changes before reverting.

Git revert is another way to go back in history, but it creates a new commit that undoes the changes made in a specific commit instead of removing the commit from history.

**Example:**
```
A -> B -> C -> D (HEAD)
```

If you run `git revert D`, it will create a new commit that undoes the changes made in commit D, and the history will look like this:

```
A -> B -> C -> D -> E (HEAD)
```

Where E is the new commit that undoes the changes made in commit D.

**Detailed Example:**
```bash
# commit A
a.txt: "Hello "

# commit B
a.txt: "Hello world"

# commit C
a.txt: "Hello World We"

# commit D
a.txt: "Hello World We Love Git"

# Now we run git revert D
git revert D

# commit E
a.txt: "Hello World We"
```

This means instead of removing commit D from history, it creates a new commit E that undoes the changes made in commit D.

Similarly, if we want to undo the change made in one of the previous commits, we can use `git revert` with the commit hash of that commit.

```bash
git revert <commit-hash>      # Revert changes made in a specific commit
```

> **Note:** It only undoes the change made in that commit only, not before commit and after commit.

So `git reset --hard <commit A hash>` is equivalent to `git revert <commit D hash>` `git revert <commit C hash>` `git revert <commit B hash>`. If we do only `git revert <commit B hash>` it will only undo the changes made in commit B and not the changes made in commit C and D.

### Why use git revert instead of git reset?

If we do `git reset --hard <commit A hash>` it will remove all the commits after commit A and reset the working directory to the state of commit A, which means we will lose all the changes made in those commits. But if we use `git revert <commit D hash>` `git revert <commit C hash>` `git revert <commit B hash>` it will create new commits that undo the changes made in those commits without removing them from history, which means we can still see those commits in the history and can refer to them later if needed.

## 20. Git Amend

Git amend is used to modify the last commit. This is useful if you forgot to include a file or want to change the commit message.

**To change the last commit message:**
```bash
git commit --amend -m "New commit message"    # Change the last commit message
```

**To add changes to the last commit:**
```bash
git add <file>                                # Stage the file you want to add
git commit --amend --no-edit                  # Add changes to the last commit without changing the commit message
```

## 21. Configure Git

To configure Git with your name and email, which is important for commit history:

```bash
git config --global user.name "Your Name"    # Set your name
git config --global user.email "email"       # Set your email
git config --list                            # Display the current Git configuration
```
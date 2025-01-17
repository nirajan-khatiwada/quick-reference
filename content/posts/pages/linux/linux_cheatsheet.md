---
title: "Linux Commands and Directories Guide" # Title and title for social share
date: 2024-10-18
description: "A comprehensive guide to commonly used Linux commands and important directories." # Description for social share
ShowToc: true
# tocopen: true
categories: ["Linux"] # This is the category
tags: ["Linux", "Command Line", "Development"] # This is the keyword
summary: "A practical guide to navigating and managing files in Linux." # This comes in the post
images: ["/images/linux-cheetsheet.webp"]  # For social share
---

<!-- 
#![Linux Guide Image](images/linux-cheetsheet.webp)
-->

# Linux Commands and Directories Guide

## Important Directories

- **Default Web Server Root Directory**  
  **Location**: `/var/www/html`  
  This is the standard location for serving web content on Apache.

- **Downloads Folder**  
  **Location**: `/home/username/Downloads`  
  This is where files downloaded from the internet are usually saved by default.

- **Documents Folder**  
  **Location**: `/home/username/Documents`  
  A common directory for storing personal documents and files.

- **Desktop Folder**  
  **Location**: `/home/username/Desktop`  
  This is the location for files and shortcuts displayed on your desktop screen.

---

## Common Commands

### `cd`
Change the current directory to another one.  
**Usage**: `cd [directory]`  
**Example**: `cd /var/www/html` changes to the web server root directory.

---

### `ls`
List files and directories in the current location or specified path.  
**Usage**: `ls [options] [path]`  
**Example**: `ls -l` lists files in a detailed format.

---

### `pwd`
Print the path of the current working directory.  
**Usage**: `pwd`  
This command shows where you are in the filesystem.

---

### `sudo su`
Switch to the superuser (root) account, allowing you to perform administrative tasks.  
**Usage**: `sudo su`  
After entering your password, you'll have root access.

---

### `sudo`
Execute a command with elevated privileges.  
**Usage**: `sudo [command]`  
**Example**: `sudo apt update` runs the update command as an administrator.

---

### `mkdir`
Create a new directory.  
**Usage**: `mkdir [directory name]`  
**Example**: `mkdir new_folder` creates a directory named "new_folder".

---

### `dir`
List files and directories, similar to `ls`.  
**Usage**: `dir [options] [path]`  
This command can be used interchangeably with `ls`.

---

### `mv`
Move or rename files and directories.  
**Usage**: `mv [source] [destination]`  
**Example**: `mv /home/username/Downloads/file.txt /home/username/Documents/` moves the file to a different directory.

---

### `cp`
Copy files or directories.  
**Usage**: `cp [source] [destination]`  
**Example**: `cp /home/username/Downloads/file.txt /home/username/Documents/` copies the file.

---

### `rm`
Remove files or directories.  
**Usage**: `rm [options] [file/directory]`  
**Example**: To remove a directory and its contents, use `rm -r [directory]`.

---

### `touch`
Create an empty file or update the timestamp of an existing file.  
**Usage**: `touch [filename]`  
**Example**: `touch newfile.txt` creates an empty file named "newfile.txt".

---

### `cat`
Display the contents of a file in the terminal.  
**Usage**: `cat [filename]`  
**Example**: `cat file.txt` shows the content of "file.txt".

---

### `gedit`
Open the Gedit text editor to edit files.  
**Usage**: `gedit [filename]`  
**Example**: `gedit notes.txt` opens "notes.txt" for editing.

---

### `kill`
Terminate a process using its process ID (PID).  
**Usage**: `kill [PID]`  
**Example**: `kill 1234` stops the process with the ID 1234.

---

### `top`
Display real-time information about system processes and resource usage.  
**Usage**: `top`  
This command helps monitor system performance.

---

### `pkill`
Terminate a process by its name.
**Usage**: `pkill [process name]`
**Example**: `pkill firefox` stops all Firefox processes.
              `pkill node` stops all Node.js processes.
---

### `nohup`
Run a command immune to hangups (HUP) and continue running even after the terminal is closed.
**Usage**: `nohup [command] &`
**Example**: `nohup python script.py &` runs the Python script in the background.

---

### `apt-get update`
Update the package lists for upgrades and new package installations.  
**Usage**: `apt-get update`  
This command fetches the latest package information.

---

### `apt install path_of_.deb_file`
Install a `.deb` file package.  
**Usage**: `apt install ./filename.deb`  
**Example**: `apt install ./main.deb` installs the specified Debian package.

---

### `apt-get upgrade`
Upgrade all installed packages to their latest versions.  
**Usage**: `apt-get upgrade`  
This command updates your installed software.

---

### `apt-get install package`
Install a specific software package.  
**Usage**: `apt-get install [package]`  
**Example**: `apt-get install vim` installs the Vim text editor.

---

### `man`
Display the manual page for a command, providing detailed information.  
**Usage**: `man [command]`  
**Example**: `man ls` shows the manual for the `ls` command.

---

### `whoami`
Show the currently logged-in user's username.  
**Usage**: `whoami`  
This command is useful for confirming your user identity.

---

### `zip`
Compress a directory and its contents into a zip file.  
**Usage**: `zip -r [filename.zip] [foldername]`  
**Example**: `zip -r archive.zip myfolder` creates a zip file of "myfolder".

---

### `unzip`
Extract files from a zip archive.  
**Usage**: `unzip [filename]`  
**Example**: `unzip archive.zip` extracts files from "archive.zip".

---

### `apt install apache2`
Install the Apache web server.  
**Usage**: `apt install apache2`  
This command sets up Apache on your system.

---

### `service apache2 start`
Start the Apache web server.  
**Usage**: `service apache2 start`  
Use this to begin serving web content.

---

### `service apache2 restart`
Restart the Apache web server.  
**Usage**: `service apache2 restart`  
This is useful for applying configuration changes.

---

### `service apache2 stop`
Stop the Apache web server.  
**Usage**: `service apache2 stop`  
Use this command to halt the server.

---

### `apt install redis`
Install the Redis database server.  
**Usage**: `apt install redis`  
This sets up Redis for use.

---

### `service redis start`
Start the Redis server.  
**Usage**: `service redis start`  
This command activates the Redis service.

---

### `service redis restart`
Restart the Redis server.  
**Usage**: `service redis restart`  
Use this to refresh the Redis service.

---

### `service redis stop`
Stop the Redis server.  
**Usage**: `service redis stop`  
This halts the Redis service.

---

### `apt install mysql-server`
Install the MySQL server.  
**Usage**: `apt install mysql-server`  
This command installs the MySQL database management system.

---

### `chmod`
Change file or directory permissions.  
**Usage**: `chmod [permissions] [file/folder]`  
**Example**: `chmod +rwx file.txt` grants read, write, and execute permissions.  
To remove permissions, use `chmod -r file.txt`.

---

## Important Notes

1. **Folder Names with Spaces**:  
   If a folder name contains spaces, enclose it in double quotes.  
   - `mkdir "New Folder"` creates a single folder named "New Folder".  
   - `mkdir New Folder` creates two separate folders named "New" and "Folder".

2. **Using Wildcards for Operations**:  
   To perform operations on:
   - All files/folders: use `*`.
   - Files with a specific extension (e.g., `.exe`): use `*.exe`.
   - Files/folders starting with "hello": use `hello*`.

3. **Use Relative Paths**:  
   Prefer using relative paths whenever possible to simplify navigation.  
   - **Example**: `mv /home/username/Downloads/index.html /var/www/html/index.html` moves a file to the web server directory.

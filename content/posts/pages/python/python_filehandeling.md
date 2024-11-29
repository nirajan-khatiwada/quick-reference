---
title: "Python Fundamentals: Understanding File Handeling (Part 9)"
date: 2024-11-13
description: "Know The Basics of Python Filehandeling with this comprehensive guide, part of our series on Python programming."
showToc: true
categories: ["Python"]
tags: ["Python", "Programming", "File Handeling", "Tutorial"]
summary: "An in-depth look at File Handeling."
images: ["/images/python.png"]
---


# Python Fundamentals: Understanding File Handeling
In Python programming, file handling is an essential operation that allows you to read, write, and manipulate files on your system. Files are used to store data permanently, and Python provides various functions and methods to work with files efficiently. In this guide, we will explore the basics of file handling in Python, including opening, reading, writing, and closing files.

## 1.Context Manager
Python provides a built-in way to manage resources and ensure that they are properly released when they are no longer needed. This is done using the `with` statement and is known as a context manager. When working with files, it is recommended to use the `with` statement to ensure that the file is properly closed after use.

### 1.1. Using the `with` Statement
The `with` statement in Python is used to create a context manager that automatically takes care of resource management. When working with files, the `with` statement ensures that the file is properly closed after use, even if an error occurs during file operations.

Example:
```python
with open("example.txt", "r") as file:
    data = file.read()
    print(data)
```

## 2. Opening a File
Before you can read or write to a file, you need to open it using the `open()` function. The `open()` function takes two arguments: the file path and the mode in which you want to open the file.

### 2.1. Modes for Opening Files
Python supports various modes for opening files, depending on the operations you want to perform. Some common modes include:
- `r`: Read mode. Opens the file for reading. The file must exist.
- `w`: Write mode. Opens the file for writing. If the file exists, it will be truncated. If the file does not exist, a new file will be created.
- `a`: Append mode. Opens the file for writing. If the file exists, the data will be appended to the end. If the file does not exist, a new file will be created.
- `b`: Binary mode. Opens the file in binary mode.use for image,video,etc as it will not convert the data to text .You can add b to any mode to open the file in binary mode like rb,wb,ab.
- `t`: Text mode. Opens the file in text mode (default).

### 2.2. Opening a File
To open a file, you can use the `open()` function with the desired file path and mode. You can also specify additional parameters such as encoding, buffering, and newline characters.

Example:
```python
# Open a file in read mode
with open("example.txt", "r") as file:
    data = file.read()
    print(data)
```

## 3. Reading from a File
Once you have opened a file, you can read its contents using various methods provided by Python. The most common methods for reading from a file is `read()`.
```python
# Open a file in read mode
with open("example.txt", "r") as file:
    data = file.read()
    print(data)
```

## 4. Writing to a File
To write data to a file, you can use the `write()` method provided by Python. You can write text data to a file using the `write()` method.

- Using w mode:
```python
# Open a file in write mode
with open("example.txt", "w") as file:
    file.write("Hello, World!")
```

- Using a mode:
```python
# Open a file in append mode
with open("example.txt", "a") as file:
    file.write("Hello, World!")
```

## 5.Context Manager

[Reference](https://www.freecodecamp.org/news/context-managers-in-python/)


- Use of Context Manager:
In any programming language, the usage of resources like file operations or database connections is very common. But these resources are limited in supply. Therefore, the main problem lies in making sure to release these resources after usage. If they are not released then it will lead to resource leakage and may cause the system to either slow down or crash. It would be very helpful if users have a mechanism for the automatic setup and teardown of resources. In Python, it can be achieved by the usage of context managers which facilitate the proper handling of resources. 



- What is happened
When the `with` statement is executed, it will automatically call the `__enter__` before entering the code block, and `__exit__` after exiting the code block.

- How to create a context manager
To create a context manager, you need to define a class that implements the `__enter__` and `__exit__` methods. The `__enter__` method is called when the `with` statement is executed, and the `__exit__` method is called after the code block is executed.

Syntax:
```python
class MyContextManager:
    def __init__(self,params):
        # Code to initialize resources
    def __enter__(self):
        # Code to setup resources
        return self


    def __exit__(self, exc_type, exc_value, traceback):
        # Code to release resources
```


Example:
```python
#implementatio of own file handeling context manager
class MeroHandle:
    def __init__(self,filename,mode):
        self.filename = filename
        self.mode = mode
    
    def __enter__(self):
        self.file = open(self.filename,self.mode)
        return self.file
    
    def __exit__(self,exc_type,exc_value,traceback):
        self.file.close()
    
#using the context manager
with MeroHandle("example.txt","r") as file:
    data = file.read()
    print(data)
```

- Normal way of file handeling
```python
try:
    file = open("example.txt","r")
    data = file.read()
    print(data)
    file.close()
except:
    print("Error Occured")
```

- Advantage of context manager Over normal code
When we use normal code shown above then when error occured in try block before file.close() then it will not close the file(i.e file will not be closed) and it will lead to resource leakage .
But when we use context manager then it will automatically close the file just because `__exit__` method is called after the code block is executed whether error occured or not.
but in normal code we can manage this by using finally block but it is not recommended as it is not pythonic way of doing things.

``` python
try:
    file = open("example.txt","r")
    data = file.read()
    print(data)
except:
    print("Error Occured")
finally:
    file.close()
```
This will work but it is not pythonic way of doing things.Just because we have to write whole try,except,finally block for just opening and closing the file. which make code more complex and lengthy.
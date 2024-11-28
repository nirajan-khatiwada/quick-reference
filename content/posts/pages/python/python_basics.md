---
title: "Python Fundamentals: A Beginner's Guide (Part 1)"
date: 2024-11-14
description: "Learn the essential building blocks of Python programming language with this comprehensive guide covering basic concepts and fundamentals."
showToc: true
categories: ["Python"]
tags: ["Python", "Programming", "Basics", "Tutorial"]
summary: "A comprehensive guide to Python programming fundamentals covering core concepts for beginners"
images: ["/images/python.png"]
---

# Python Fundamentals: A Beginner's Guide (Part 1)

## 1. Virtual Environment

A virtual environment is a feature in Python that allows you to install the same package with different versions on the same system. This enables you to work on multiple projects using different versions of the same package.

### 1.1. Installing `venv`

The `venv` module is included in the Python standard library, so you don't need to install it separately. However, if you are using an older version of Python (before 3.3), you can install `virtualenv` using `pip`:
```bash
pip install virtualenv
```

### 1.2. Creating a Virtual Environment

To create a virtual environment, you can use the `venv` module, which is included in the Python standard library. Here's how you can create a virtual environment named `myenv`:
```bash
python -m venv myenv
```

This command creates a new directory named `myenv` that contains the necessary files for the virtual environment.

### 1.3. Activating a Virtual Environment

To activate the virtual environment, you may run the following command:
```bash 
# For Linux/Mac:
source myenv/bin/activate
# For Windows:
myenv\Scripts\activate
```

---

## 2. Python Packages

### 2.1. List All the Python Packages

To list or save all the installed packages in the current environment, you can use the following command using freeze:
```bash
pip freeze # To list all the installed packages
pip freeze > requirements.txt # To save all the installed packages in a file
```

### 2.2. Installing Python Packages

To install a Python package, you can use the `pip install` command followed by the package name. For example, to install the `requests` package, you can run:
```bash
pip install requests
```

### 2.3. Uninstalling Python Packages

To uninstall a Python package, you can use the `pip uninstall` command followed by the package name. For example, to uninstall the `requests` package, you can run:
```bash
pip uninstall requests
```

### 2.4. Run Python Package/Script

To run a python package or script, you can use the following command:
```bash
python -m package_name
```

---

## 3. Python Basics

### 3.1. Running a Python Script

To run a Python script, you can use the following command:
```bash
python script.py
```

### 3.2. Python Indentation

In Python, the code block (body of the function, loop, etc.) starts with a colon (:) and the line following the colon should be indented.
```python
if 5 > 2:
    print("Five is greater than two!") # Indented block
```

### 3.3. Python Comments

There are two types of comments in Python:
```python
# This is a single line comment
""" This is a multiline comment
    This is a multiline comment
    This is a multiline comment
    This is a multiline comment
"""
```

### 3.4. Print Statement

The `print()` function is used to display the output on the console. For example:
```python
print("Hello, World!")
```

### 3.5. Data Types

Python has the following data types:
- int
- float
- str 
- bool
- list
- tuple
- set
- dict
- None
```python
a = 10 # int
b = 10.5 # float
c = "Hello" # str
d = True # bool
e = [1,2,3] # list
f = (1,2,3) # tuple
g = {1,2,3} # set
h = {"name":"John","age":30} # dict
i = None # None
print(type(a)) # <class 'int'>
```

>Note:Use type() function to check the data type of a variable.As it return the class of the variable.

### 3.6. Rules of Variable Declaration

- A variable name must start with a letter or the underscore character.
- A variable name cannot start with a number.
- A variable name can only contain alpha-numeric characters and underscores (A-z, 0-9, and _ ).
- Variable names are case-sensitive (age, Age, and AGE are three different variables).

### 3.7. Type Conversion

You can convert one data type to another using the following functions:
- `int()`: To convert to an integer
- `float()`: To convert to a float
- `str()`: To convert to a string
- `bool()`: To convert to a boolean
- `list()`: To convert to a list
- `tuple()`: To convert to a tuple
- `set()`: To convert to a set
- `dict()`: To convert to a dictionary
```python
a = 10  #a=10
b = float(a) #b=10.0
c = str(a) #c='10'
d = bool(a) #d=True
e = list(c) #e=['1','0']
f = tuple(c) #f=('1','0')
g = set(c) #g={'1','0'}
h = dict(name="John",age=30) or dict([("name","John"),("age",30)]) 
#h={'name':'John','age':30}
```

> **Note:** Python is dynamically typed, which means a variable's data type can be changed.

## 4. Operators

### 4.1. Arithmetic Operators

- `+`: Addition
- `-`: Subtraction
- `*`: Multiplication
- `/`: Division
- `%`: Modulus
- `**`: Power
- `//`: Floor Division
```python
a = 10
b = 3
print(a + b) # 13
print(a - b) # 7
print(a * b) # 30
print(a / b) # 3.3333333333333335
print(a % b) # 1
print(a ** b) # 1000
print(a // b) # 3
```


### 4.2. Assignment Operators

- `=`: Assign value
- `+=`: Add and assign
- `-=`: Subtract and assign
- `*=`: Multiply and assign
- `/=`: Divide and assign
- `%=`: Modulus and assign
- `**=`: Power and assign
- `//=`: Floor Division and assign
```python
a = 10
a += 5 # a = a + 5
a -= 5 # a = a - 5
a *= 5 # a = a * 5
a /= 5 # a = a / 5
a %= 5 # a = a % 5
a **= 5 # a = a ** 5
a //= 5 # a = a // 5
```

### 4.3. Comparison Operators

- `==`: Equal to
- `!=`: Not equal to
- `>`: Greater than
- `<`: Less than
- `>=`: Greater than or equal to
- `<=`: Less than or equal to
```python
    a = 10
    b = 20
    print(a == b) # False
    print(a != b) # True
    print(a > b) # False
    print(a < b) # True
    print(a >= b) # False
    print(a <= b) # True
```


### 4.4. Logical Operators

- `and`: Returns True if both statements are true
- `or`: Returns True if one of the statements is true
- `not`: Reverse the result, returns False if the result is true
```python
a = 10
b = 20
c = 30
print(a < b and b < c) # True
print(a < b or b > c) # True
print(not(a < b and b < c)) # False
```

### 4.5. Identity Operators

- `is`: Returns True if both variables are the same object
- `is not`: Returns True if both variables are not the same object
```python
a = [1,2,3]
b = [1,2,3]
print(a is b) # False
print(a is not b) # True
```


### 4.6. Membership Operators

- `in`: Returns True if a sequence with the specified value is present in the object
- `not in`: Returns True if a sequence with the specified value is not present in the object
```python
a = [1,2,3] #Can be used in list , tuple , set , dict, string
print(1 in a) # True
print(4 not in a) # True
```

### 4.7. Bitwise Operators

- `&`: AND
- `|`: OR
- `^`: XOR
- `~`: NOT
- `<<`: Left Shift
- `>>`: Right Shift
```python
a = 10
b = 4
print(a & b) # 0
print(a | b) # 14
print(a ^ b) # 14
print(~a) # -11
print(a << 2) # 40
print(a >> 2) # 2
```


> **Note:** `is` vs `==`
> - `is` is used to compare the memory location of two objects.
> - `==` is used to compare the values of two objects.
> ```python
> # For Mutable objects (list, dict, set):
> a = [1,2,3]
> b = [1,2,3]
> print(a == b) # True
> print(a is b) # False
>
> # For immutable objects (int, float, string, tuple, None):
> a = 10
> b = 10
> print(a == b) # True
> print(a is b) # True
> c = None
> d = None
> print(c == d) # True
> print(c is d) # True
> ```


## 5.Taking User Input
In Python, you can take user input using the `input()` function. Here's an example:
```python
name = input("Enter your name: ")
print("Hello, " + name)
```
>Note: The `input()` function always returns a string. If you want to convert it to another data type, you can use type conversion functions like `int()`, `float()`, etc.



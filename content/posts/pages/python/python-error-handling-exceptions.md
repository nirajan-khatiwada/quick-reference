---
title: "Python Error Handling: Try, Except & Finally Tutorial"
slug: "python-error-handling-exceptions"
date: 2024-11-16
description: "Write robust Python code by mastering error handling. Learn to use try, except, finally blocks, and raise custom exceptions to manage errors gracefully."
showToc: true
weight: 7
series: ["Python"]
categories: ["Python"]
tags: ["Python", "Programming", "Error Handling", "Tutorial"]
summary: "An in-depth exploration of Python error handling, exceptions, and best practices."
images: ["/images/python.png"]
---

# Python Fundamentals: Understanding Error Handling
In Python programming, error handling is an essential concept that allows you to gracefully manage exceptions and errors that may occur during program execution. By handling errors effectively, you can prevent your program from crashing and provide meaningful feedback to users. In this guide, we will explore the fundamentals of error handling in Python, including exceptions, try-except blocks, and best practices.


## 1. Exceptions
In Python, exceptions are events that occur during the execution of a program that disrupt the normal flow of code. When an exception occurs, the interpreter raises an exception object that can be caught and handled by the program. Exceptions can be caused by various reasons, such as invalid input, file not found, or division by zero.

## 2.What May Cause Exceptions
Exceptions can be caused by various reasons, such as:
- Division by zero
- Invalid input
- File not found
- Syntax errors
- Out of Index of list, tuple , String 
- Key Error in dictionary


## 3.Types of Exceptions
Commonly used exceptions in Python include:
- `ZeroDivisionError`: Raised when division or modulo by zero occurs.
- `ValueError`: Raised when a function receives an argument of the correct type but an inappropriate value.
- `TypeError`: Raised when an operation or function is applied to an object of an inappropriate type.
- `IndexError`: Raised when a sequence subscript is out of range.
- `KeyError`: Raised when a dictionary key is not found.
- `SyntaxError`: Raised when the parser encounters a syntax error.
> Note: All exceptions in Python are subclasses of the `Exception` class.


## 3.Handling Exceptions
To handle exceptions in Python, you can use the `try-except` block, which allows you to catch and handle exceptions gracefully. The `try` block contains the code that may raise an exception, and the `except` block handles the exception if it occurs.The program control will transfer the control to the except block if any exception occurs in the try block but if there is not exception then the control will not transfer to the except block.

### 4.1. Using `try-except` Block
Here's an example of using the `try-except` block to handle exceptions in Python:

syntax:
```python
try:
    # Code that may raise an exception
except ExceptionType as e:
    # Handle the exception
```

Example:
```python
try:
    x = 10 / 0
except Exception as e:
    print("Error: Division by zero")
```

Output:
```bash
Error: Division by zero
```


> Note: if you don't know the type of exception you can use `Exception` to catch all exceptions.
>>If you dont handel exception then it will show error and stop the program.


### 4.2. Finally Block
The `finally` block is used to execute code that should always run, regardless of whether an exception occurs or not. The `finally` block is typically used to release resources or clean up operations that need to be performed after the `try` block, regardless of the outcome Any how the finally block will run. if yout return from the try block then also the finally block will run.

syntax:
```python
try:
    # Code that may raise an exception
except ExceptionType as e:
    # Handle the exception
finally:
    # Code that always runs
```

Example:
```python
try:
    x = 10 / 0
except Exception as e:
    print("Error: Division by zero")
finally:
    print("Cleanup code")
```

Output:
```bash
Error: Division by zero
Cleanup code
```


### 3.5. Raising Exceptions
You can raise exceptions in Python using the `raise` statement. This allows you to create custom exceptions and raise them when needed. You can also raise built-in exceptions to indicate errors or exceptional conditions.

syntax:
```python
raise ExceptionType("Error message")
```

Example:
```python
x = -1

if x < 0:
    raise ValueError("Value cannot be negative")
```

Output:
```bash
ValueError: Value cannot be negative
```

### 3.6. Multiple `except` Blocks
You can use multiple `except` blocks to handle different types of exceptions in Python. This allows you to catch and handle specific exceptions based on their type.

syntax:
```python
try:
    # Code that may raise an exception
except ExceptionType1 as e:
    # Handle ExceptionType1
except ExceptionType2 as e:
    # Handle ExceptionType2
```

Example:
```python
try:
    x = 10 / 0
except ZeroDivisionError as e:
    print("Error: Division by zero")
except ValueError as e:
    print("Error: Invalid value")
```

Output:
```bash
Error: Division by zero
```


### 3.7. Custom Exceptions
You can create custom exceptions in Python by defining a new exception class that inherits from the `Exception` class. Custom exceptions allow you to define specific error conditions for your application and raise them when needed.

syntax:
```python
class CustomException(Exception):
    pass
```

Example:
```python
#Will read about class in oop section
class CustomError(Exception):
    def __init__(self,message,value):
        self.message=message
        self.value=value
    def __str__(self):
        return f"{self.message}\nError code:{self.value}"
    

try:
    x = -1
    if x < 0:
        raise CustomError("Value cannot be negative",1001)
except CustomError as e:
    print(e)
```

> Note: Custom exceptions should inherit from the `Exception` class or one of its subclasses.
> You can simply use:
```python
try:
    #code
except:
    #code


try:
    #code
except Exception as e:
    #code

try:
    #code
except Exception:
    #code

try:
    #code
except:
    #code
finally:
    #code
```



---
title: "Python Fundamentals: Packages, Generators, and Decorators (Part 7)"
date: 2024-11-15
description: "Explore advanced Python topics including packages, generators, and decorators in this comprehensive guide."
showToc: true
categories: ["Python"]
tags: ["Python", "Programming", "Packages", "Generators", "Decorators", "Tutorial"]
summary: "An in-depth exploration of Python packages, generators, and decorators."
images: ["/images/python.png"]
---

# Python Fundamentals: Packages, Generators, and Decorators
In this guide, we will explore advanced Python topics including packages, generators, and decorators. These concepts are essential for writing efficient and maintainable Python code. Let's dive in!

## 1. Python Packages
Python packages are a way of organizing and structuring your code into reusable modules. Packages allow you to group related modules together, making it easier to manage and maintain your codebase. In this section, we will explore how to create and use Python packages.

### 1.1. Creating a Package
To create a Python package, you need to organize your code into a directory structure with a special file called `__init__.py`. This file tells Python that the directory is a package and allows you to import modules from the package.

Example directory structure:
```bash
my_package/
│
├── __init__.py
├── module1.py
└── module2.py
```

### 1.2. Using a Package
To use a Python package, you can import modules from the package using the `import` statement. You can import specific modules or the entire package.

Example:
```python
# Importing a specific module
from my_package import module1

# Using a function from the imported module
module1.my_function()

# Importing the entire package
import my_package

# Using a function from a module within the package
my_package.module2.another_function()

#Importing Function from a module

from my_package.module1 import my_function
my_function()
```

> Note : __init__.py file can be empty or contain initialization code for the package. It will automatically run when the package is imported.


## 1.3 Creating a Subpackage
You can create subpackages within a package to further organize your code. Subpackages are simply packages within packages, allowing you to create a hierarchical structure for your codebase.

Example directory structure:
```bash
my_package/
│
├── __init__.py
├── module1.py
└── subpackage/
    ├── __init__.py
    ├── module3.py
    └── module4.py
```

### 1.4. Using a Subpackage
To use a subpackage, you can import modules from the subpackage using the dot notation.

Example:
```python
# Importing a module from a subpackage
from my_package.subpackage import module3

# Using a function from the imported module
module3.another_function()

# Importing the entire subpackage
import my_package.subpackage

# Using a function from a module within the subpackage
my_package.subpackage.module4.some_function()

#Importing Function from a module

from my_package.subpackage.module3 import another_function

another_function()
```

### 1.5. __name__ == "__main__"
We use the `__name__` variable to check if a script is being run as the main program or being imported as a module. When a script is run as the main program, `__name__` is set to `"__main__"`. This allows you to include code that should only run when the script is executed directly.

For Example:

Structure:
```
Main Directory/
├── main.py
└── package/
    ├── __init__.py
    └── module1.py
```

module1.py:
```python
def my_function():
    print("Hello from module1")

if __name__ == "__main__":
    my_function()
```

When you run `module1.py` directly, the `my_function()` will be executed. However, if you import `module1` into another script, the `my_function()` will not be executed.

For Example:
```python
from package import module1
print("Imported module1")
```

Output:
```bash
Imported module1
```

When use Dont use `if __name__ == "__main__":` in module1.py:
```python
def my_function():
    print("Hello from module1")

my_function()
```

also,
```python
from package import module1
print("Imported module1")
```

Output:
```bash
Hello from module1
Imported module1
```



## 2. Python Generators
Using generator we can instantly return all the values using the `yield` keyword without storing them in memory. This is useful when working with large datasets or infinite sequences.

### 2.1. Creating a Generator
To create a generator in Python, you can use a function with the `yield` keyword. When a function contains the `yield` keyword, it becomes a generator function. The `yield` keyword suspends the function's execution and returns a value to the caller.

Example:
```python
def my_generator():
    yield 1
    yield 2
    yield 3
# Using the generator
gen = my_generator()
print(next(gen))  # Output: 1
print(next(gen))  # Output: 2
print(next(gen))  # Output: 3
```

Example:
```python
#using generator in loop
def generate(n):
    for i in range(n):
        yield i

for i in generate(10):
    print(i)
```

### 3. Python Decorators
Decorators are a powerful feature in Python that allows you to modify or extend the behavior of functions or methods. Decorators are functions that take another function as an argument and return a new function that extends the behavior of the original function.

### 3.1. Creating a Decorator
To create a decorator in Python, you can define a function that takes another function as an argument and returns a new function that extends the behavior of the original function.

Syntax:
```python
def my_decorator(func):
    def wrapper():
        # Code to execute before calling the decorated function
        func()
        # Code to execute after
    return wrapper
```

Example:
```python
def my_decorator(func):
    def wrapper():
        print("Before function call")
        func()
        print("After function call")
    return wrapper

@my_decorator
def say_hello():
    print("Hello!")

say_hello() #call to my_decorator(say_hello)() just because we use @my_decorator
```

Output:
```bash
Before function call
Hello!
After function call
```

Example For decorator :
```python 
def Add_Wrapper(func):
    def wrapper(a,b,c):
        print("Status code is",c)
        return func(a,b)
    return wrapper

@Add_Wrapper
def add(a,b):
    return a+b

print(add(2,3,200))
```

Output:
```bash
Status code is 200
5
```


### 3.2. Decorator with Arguments
You can also create decorators that accept arguments by defining a decorator function that takes arguments and returns a decorator function.

Syntax:
```python
def my_decorator_with_args(arg1, arg2):
    def decorator(func):
        def wrapper():
            # Code to execute before calling the decorated function
            func()
            # Code to execute after
        return wrapper
    return decorator
```

Example:
```python
def my_decorator_with_args(arg1, arg2):
    def decorator(func):
        def wrapper():
            print(f"Decorator arguments: {arg1}, {arg2}")
            func()
        return wrapper
    return decorator    

@my_decorator_with_args("arg1", "arg2")
def say_hello():
    print("Hello!")

say_hello()
```

Output:
```bash
Decorator arguments: arg1, arg2
Hello!
```



##4. Loading .env file
To load we use popular package `python-decouple`.

### Install it using pip:
```bash
pip install python-decouple
```
### `config` function:
Config function is used to load environment variables from a `.env` file.
```python
from decouple import config
config('SECRET_KEY')  # Load the SECRET_KEY from .env file
```

#### `cast` parameter:
Since the data store in the `.env` file is always string, we can use the `cast` parameter to convert it to the desired type.
```python
from decouple import config
config('DEPTH', cast=int)  # Load the DEPTH variable as an integer
config('DEBUG', cast=bool)  # Load the DEBUG variable as a boolean
config('ALLOWED_HOSTS', cast=lambda x: [i.strip() for i in x.split(',')])  # Load the ALLOWED_HOSTS variable as a list
```

#### `default` parameter:
The `default` parameter is used to provide a default value if the environment variable is not found in the `.env` file.
```python
from decouple import config
config('SECRET_KEY', default='default_secret_key')  # Load the SECRET_KEY with a default value
```

### Example of using `config` function:

### Create a `.env` file in the root of your project:
```env
SECRET_KEY=your_secret_key
DEBUG=True
ALLOWED_HOSTS=localhost,
DEPTH=1
```

### Create a `main.py` file in using .env file need to load:
```python
from decouple import config
# Load environment variables from .env file
SECRET_KEY=config('SECRET_KEY', default='')
DEBUG=config('DEBUG', cast=bool, default=False)
ALLOWED_HOSTS=config('ALLOWED_HOSTS', cast=lambda x: [i.strip() for i in x.split(',')], default=['localhost'])
DEPTH=config('DEPTH', cast=int, default=1)
```

### Use the loaded environment variables in your code:
```python
print(f"Secret Key: {SECRET_KEY}")
print(f"Debug Mode: {DEBUG}")
print(f"Allowed Hosts: {ALLOWED_HOSTS}")
print(f"Depth: {DEPTH}")
```










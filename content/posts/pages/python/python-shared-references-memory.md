---
title: "Python Shared References: Mutability & Memory Management"
slug: "python-shared-references-memory"
date: 2024-11-11
description: "Understand Python's memory model. Learn how shared references and mutability impact your code, especially with lists and dictionaries."
showToc: true
weight: 12
series: ["Python"]
categories: ["Python"]
tags: ["Python", "Programming", "References", "Tutorial"]
summary: "An in-depth look at shared references in Python."
images: ["/images/python.png"]
---

# Shared References in Python: How Changes Propagate Across Variables
In Python, variables are references to objects in memory. When you assign a value to a variable, you are creating a reference to the object that holds that value. In some cases, multiple variables can refer to the same object in memory. This is known as a shared reference.

# Mutability and Shared References in Python: How Changes Propagate Across Variables


- List
Lists are mutable, so if two variables reference the same list, changes through one variable will affect the other.
    
    ```python
    # Create a list
    list1 = [1, 2, 3]
    # Create a reference to the list
    list2 = list1
    # Modify the list through one reference
    list2.append(4)
    # Check the original list
    print(list1)  # Output: [1, 2, 3, 4]
    ```
- Dictionary
Dictionaries are mutable as well. If two variables point to the same dictionary, any change made through one will reflect in the other.

    ```python
    # Create a dictionary
    dict1 = {"name": "Alice", "age": 30}
    # Create a reference to the dictionary
    dict2 = dict1
    # Modify the dictionary through one reference
    dict2["age"] = 31
    # Check the original dictionary
    print(dict1)  # Output: {'name': 'Alice', 'age': 31}
    ```

- Set
Sets are mutable, so changes made through one reference will affect the other if two variables point to the same set.

    ```python
    # Create a set
    set1 = {1, 2, 3}
    # Create a reference to the set
    set2 = set1
    # Modify the set through one reference
    set2.add(4)
    # Check the original set
    print(set1)  # Output: {1, 2, 3, 4}
    ```

- Custom Objects

    ```python
    class Person:
        def __init__(self, name, age):
            self.name = name
            self.age = age

    # Create an instance of the Person class
    person1 = Person("Alice", 30)
    # Create a reference to the instance
    person2 = person1
    # Modify the instance through one reference
    person2.age = 31
    # Check the original instance
    print(person1.age)  # Output: 31
    ```


> Note: Mutable objects like lists, dictionaries, sets, and custom objects allow changes to propagate across variables that reference the same object. Immutable objects like integers, strings, and tuples do not exhibit this behavior.



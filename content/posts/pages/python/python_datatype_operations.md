---
title: "Python Fundamentals: Understanding Data Types (Part 2)"
date: 2024-11-19
description: "Dive into the various data types in Python with this detailed guide, part of our comprehensive series on Python programming."
showToc: true
categories: ["Python"]
tags: ["Python", "Programming", "Data Types", "Tutorial"]
summary: "An in-depth look at Python data types, exploring their usage and importance in programming."
images: ["/images/python.png"]
---

# 1. Python Manupulation of Data Types
We have already discussed the basic concepts of Python programming in the previous part of this series. In this part, we will dive deeper into operations and manipulations of different data types in Python.

## 1.1.Numeric Operations
### 1.1.1. `abs()` Function
The `abs()` function returns the absolute value of a number. For example:
```python
num = -10
print(abs(num)) # Output: 10
```

### 1.1.2. `round()` Function
The `round()` function rounds a number to the nearest integer. For example:
```python
num = 3.14159
print(round(num)) # Output: 3
```

### 1.1.3. `ord()` Function
The `ord()` function returns the Unicode code point of a character. For example:
```python
char = 'A'
print(ord(char)) # Output: 65
```

## 1.2. String Operations
String is a sequence of characters enclosed within single, double, or triple quotes. In Python, strings are immutable, meaning they cannot be changed once created. Here are some common string operations:

### 1.2.1. Declaring a String
we can declare a string using single, double, or triple quotes. For example:
```python
str1 = 'Hello, World!' #for single line string
str2 = "Hello, World!" #for single line string
str3 = '''Hello, World! 
        This is a multiline string.'''#for multiline string
```

### 1.2.2. Text Decorators
There are many text decorators available in Python to format strings among them we use `\n` for a new line, `\t` for a tab. For example:
```python
str1 = 'Hello, \nWorld!' #for new line
str2 = "Hello, \tWorld!" #for tab
```

### 1.2.3. String Indexing
The indexing of a string starts from 0 to n-1, where n is the length of the string. For example:
for example:
a="hello"
```python
a = H  e  l  l  o
    0  1  2  3  4
    0 -4 -3 -2 -1     
```

### 1.2.4. Ascessing Characters in a String
We can access characters in a string using the index using `[]`. For example:
```python
str = "Hello, World!"
print(str[0]) # Output: H
print(str[-1]) # Output: !
```
   
### 1.2.5. String Concatenation
We can concatenate two strings using the `+` operator and `*` operator . For example:
```python
str1 = "Hello"
str2 = "World"
print(str1 + str2) # Output: HelloWorld
print(str1 * 3) # Output: HelloHelloHello
```

### 1.2.6. String Slicing
We can slice a string using the syntax `variable[start:end:step]` to get a substring.
>Note: The substring contains characters from `index` start to `end-1`, meaning the character at the `end` index is not included but character at the `start` index is included . The step refers to the increment or jump of the index

For example:
```python
a = "hello"

# Slice from index 1 to the end of the string
print(a[1:])  # ello (Characters from index 1 to the end)

# Slice from the beginning of the string to index 4 (doesn't contain character at index 4)
print(a[:4])  # hell (Characters from index 0 to 3)

# Slice from index 1 to index 4 (doesn't contain character at index 4)
print(a[1:4])  # ell (Characters from index 1 to 3)

# Full slice of the string with default values
print(a[::])  # hello (Default start is 0, end is the string length, step is 1)

# Defining a step value in slicing
# Slice with a step of 2
print(a[::2])  # hlo (Start from index 0 to the end, select every 2nd character)

# Reverse the string using a negative step
print(a[::-1])  # olleh (Reverse the string by stepping backward)

# Combining start, end, and step
print(a[1:4:2])  # el 
#(Start from index 1 to 4 (doesn't contain character at index 4), with a step of 2)

```

### 1.2.7. String Methods
Python provides various built-in methods to manipulate strings. Some of the commonly used string methods are:
- `len()` : Returns the length of the string.
```python
str = "Hello, World!"
print(len(str)) # Output: 13
```
- `replace()` : Replaces a substring with another substring.
```python
str = "Hello, World!"
print(str.replace("World", "Universe")) # Output: Hello, Universe!
```
- `upper()` : Converts the string to uppercase.
```python
str = "Hello, World!"
print(str.upper()) # Output: HELLO, WORLD!
```
- `lower()` : Converts the string to lowercase.
```python
str = "Hello, World!"
print(str.lower()) # Output: hello, world!
```
- `split()` : Splits the string into a list based on the delimiter.
```python
str = "Hello, World!"
print(str.split(",")) # Output: ['Hello', ' World!']
```
`capitalize()` : Converts the first character of the string to uppercase.
```python
str = "hello, world!"
print(str.capitalize()) # Output: Hello, world!
```
-`find()` : Returns the index of the first occurrence of a substring.
```python
str = "Hello, World!"
print(str.find("World")) # Output: 7
print(str.find("e")) # Output: 1
print(str.find("Universe")) # Output: -1
```

- `count()` : Returns the number of occurrences of a substring.
```python
str = "Hello, World!"
print(str.count("l")) # Output: 3
```

- `startswith()` : Returns `True` if the string starts with a specified substring.
```python
str = "Hello, World!"
print(str.startswith("Hello")) # Output: True
```
- `endswith()` : Returns `True` if the string ends with a specified substring.
```python
str = "Hello, World!"
print(str.endswith("World!")) # Output: True
```
- `strip()` : Removes leading and trailing whitespaces from the string. We can also specify the characters to be removed.
```python
str = "  Hello, World!  "
print(str.strip()) # Output: Hello, World!
str = "!!!!!!!!Hello, World!!!!!"
print(str.strip("!")) # Output: Hello, World!

```

- `lstrip()` : Removes leading whitespaces from the string.we can also specify the characters to be removed.
```python
str = "  Hello, World!  "
print(str.lstrip()) # Output: Hello, World!  
str = "!!!!!!!!Hello, World!!!!!"
print(str.lstrip("!")) # Output: Hello, World!!!!!
```

- `rstrip()` : Removes trailing whitespaces from the string.We can also specify the characters to be removed.
```python
str = "  Hello, World!  "
print(str.rstrip()) # Output:   Hello, World!
str = "!!!!!!!!Hello, World!!!!!"
print(str.rstrip("!")) # Output: !!!!!!!!Hello, World
```

### 1.2.8. f-Strings
f-strings are a convenient way to format strings in Python. They allow you to embed expressions inside string literals, using curly braces `{}`. For example:
```python
name = "Alice"
age = 30
print(f"My name is {name} and I am {age} years old.") # Output: My name is Alice and I am 30 years old.
```

### 1.2.9. Raw Strings
Raw strings are used to ignore escape characters in a string. They are prefixed with an `r` or `R`. For example:
```python
path="C:\Users\Alice\Documents"
print(path) # Output: C:UsersAliceDocuments

path = r"C:\Users\Alice\Documents"
print(path) # Output: C:\Users\Alice\Documents
```




> Note:String is immutable in python.
```python
a = "Hello"
a[0] = "h" # Error: 'str' object does not support item assignment

#Instead To change the string value we can use the following method
a='k'+a[1::] # Output: 'kello'
```



## 1.3. List Operations
A list is a collection of items enclosed within square brackets `[]`. Lists are mutable, meaning they can be changed after creation. Here are some common list operations:
Key Points:
- List is mutable in python.
- List support indexing and slicing like string


### 1.3.1. Declaring a List
We can declare a list by enclosing items within square brackets `[]`. For example:
```python
list1 = [1, 2, 3, 4, 5]
list2 = ["apple", "banana", "cherry"]
list3 = [1, "apple", True, 3.14]
```

### 1.3.2 List Concatenation
We can concatenate two or more lists using the `+` operator. For example:
```python
list1 = [1, 2, 3]
list2 = [4, 5, 6]
print(list1 + list2) # Output: [1, 2, 3, 4, 5, 6]
```

### 1.3.3. Mutable property of List
List is mutable in python and its example is shown below:
```python
#for string
a = "Hello"
a[0] = "h" # Error: 'str' object does not support item assignment

#for list
list1 = [1, 2, 3]
list1[0] = 10
print(list1) # Output: [10, 2, 3]
```


### 1.3.4. Built-in List Methods
Python provides various built-in methods to manipulate lists. Some of the commonly used list methods are:

- `len()` : Returns the length of the list.
```python
list1 = [1, 2, 3, 4, 5]
print(len(list1)) # Output: 5
```

- `append()` : Adds an element to the end of the list /Change orginal list does not return anything.
```python
list1 = [1, 2, 3]
list1.append(4)
print(list1) # Output: [1, 2, 3, 4]
```

- `insert()` : Inserts an element at a specified position in the list /Change orginal list does not return anything.
```python
list1 = [1, 2, 3]
list1.insert(1, 4)
print(list1) # Output: [1, 4, 2, 3]
```

- `pop()` : Removes the element at the specified position in the list and returns it. If no index is specified, it removes and returns the last element.
```python
list1 = [1, 2, 3]
print(list1.pop(1)) # Output: 2
print(list1) # Output: [1, 3]
print(list1.pop()) # Output: 3
print(list1) # Output: [1]
```

- `remove()` : Removes the first occurrence of the specified element from the list.
```python
list1 = [1, 2, 3, 2]
list1.remove(2)
print(list1) # Output: [1, 3, 2]
```

-`sort()` : Sorts the list in ascending order.Does not return anything but change the original list.
```python
list1 = [3, 1, 2]
list1.sort()
print(list1) # Output: [1, 2, 3]
```

-`reverse()` : Reverses the order of the list. Does not return anything but change the original list.
```python
list1 = [1, 2, 3]
list1.reverse()
print(list1) # Output: [3, 2, 1]
```

-`count()` : Returns the number of occurrences of a specified element in the list.
```python
list1 = [1, 2, 3, 2]
print(list1.count(2)) # Output: 2
```

-`index()` : Returns the index of the first occurrence of the specified element in the list.
```python
list1 = [1, 2, 3, 2]
print(list1.index(2)) # Output: 1
```

### 1.3.5. List Comprehension
List comprehension is a concise way to create lists from existing lists. There are 3 type of syntax.
- Not using if
```python
list1=[variable for variable in iterable]
```
- Using if only
```python
list1 = [variable for variable in iterable if condition]
```

- Using if else
```python
list1 = [variable if condition else variable for variable in iterable]
```

Traditional way of creating list
```python
list1 = []
for i in range(5):
    list1.append(i)
print(list1) # Output: [0, 1, 2, 3, 4]

```
Using list comprehension
```python
list1 = [i for i in range(5)]
print(list1) # Output: [0, 1, 2, 3, 4]
```

```python
list1 = [i for i in range(5) if i%2==0]
print(list1) # Output: [0, 2, 4]
```

```python
list1 = [i if i%2==0 else i**2 for i in range(5)]
print(list1) # Output: [0, 1, 2, 9, 4]
```







>Note: When you attempt to access an index that is out of range, Python will raise an `IndexError` so put it in try-except block to handle the error.


>Note: The indexing and slicing of list are similar to string.



1.4 Dictionary Operations
A dictionary is a collection of key-value pairs enclosed within curly braces `{}`. Dictionaries are mutable and unordered. Here are some common dictionary operations:

### 1.4.1. Declaring a Dictionary
We can declare a dictionary by specifying key-value pairs within curly braces `{}`. For
example:
```python
dict1 = {"name": "Alice", "age": 30, "city": "New York"}
dict2 = {1: "apple", 2: "banana", 3: "cherry"}
dict3 = {"name": "Alice", "age": 30, "city": "New York", "hobbies": ["reading", "painting"]}
```

### 1.4.2. Accessing Dictionary Elements
We can access dictionary elements using keys. For example:
```python
dict1 = {"name": "Alice", "age": 30, "city": "New York"}
print(dict1["name"]) # Output: Alice
```
### 1.4.3 Adding Dictionary Elements
We can add new key-value pairs to a dictionary by specifying the key and value. For example:
```python
dict1 = {"name": "Alice", "age": 30}
dict1["city"] = "New York"
print(dict1) # Output: {'name': 'Alice', 'age': 30, 'city': 'New York'}
```

### 1.4.4. Updating Dictionary Elements
We can update the value of an existing key in a dictionary. For example:
```python
dict1 = {"name": "Alice", "age": 30, "city": "New York"}
dict1["age"] = 35
print(dict1) # Output: {'name': 'Alice', 'age': 35, 'city': 'New York'}
```

### 1.4.5 Dictionary Methods
Python provides various built-in methods to manipulate dictionaries. Some of the commonly used dictionary methods are:

- `len()` : Returns the number of key-value pairs in the dictionary.
```python
dict1 = {"name": "Alice", "age": 30, "city": "New York"}
print(len(dict1)) # Output: 3
```
- `keys()` : Returns a list of all the keys in the dictionary.
```python
dict1 = {"name": "Alice", "age": 30, "city": "New York"}
print(dict1.keys()) # Output: dict_keys(['name', 'age', 'city'])
```
- `values()` : Returns a list of all the values in the dictionary.
```python
dict1 = {"name": "Alice", "age": 30, "city": "New York"}
print(dict1.values()) # Output: dict_values(['Alice', 30, 'New York'])
```

- `items()` : Returns a list of key-value pairs in the dictionary.
```python
dict1 = {"name": "Alice", "age": 30, "city": "New York"}
print(dict1.items()) # Output: dict_items([('name', 'Alice'), ('age', 30), ('city', 'New York')])
```
-`pop()` : Removes the element with the specified key and returns its value.
```python
dict1 = {"name": "Alice", "age": 30, "city": "New York"}
print(dict1.pop("age")) # Output: 30
print(dict1) # Output: {'name': 'Alice', 'city': 'New York'}
```
-`get()` : Returns the value of the specified key. If the key does not exist, it returns the specified default value.
```python
dict1 = {"name": "Alice", "age": 30, "city": "New York"}
print(dict1.get("age")) # Output: 30
print(dict) # Output: {'name': 'Alice', 'age': 30, 'city': 'New York'}
```

>Note: When you attempt to access a key that does not exist in the dictionary, Python will raise a `KeyError` so put it in try-except block to handle the error or use `get()` method to avoid the error.

### 1.4.6. Nested Dictionaries
A dictionary can contain another dictionary as a value. This is known as a nested dictionary. For example:
```python
dict1 = {
    "person1": {"name": "Alice", "age": 30},
    "person2": {"name": "Bob", "age": 25}
}
print(dict1["person1"]["name"]) # Output: Alice
```

### 1.4.7. Dictionary Comprehension
Dictionary comprehension is a concise way to create dictionaries. For example:
```python
dict1 = {x: x**2 for x in range(5)} # Output: {0: 0, 1: 1, 2: 4, 3: 9, 4: 16}


#using if only
dict1 = {x: x**2 for x in range(5) if x%2==0} # Output: {0: 0, 2: 4, 4: 16}

#using if else
dict1 = {x: x**2 if x%2==0 else x**3 for x in range(5)} # Output: {0: 0, 1: 1, 2: 4, 3: 27, 4: 16}

```

## 1.5. Tuple Operations
A tuple is a collection of items enclosed within parentheses `()`. Tuples are immutable, meaning they similar to python as they cant be changed using indexing as ```a[0]=10``` will give an error. 

### 1.5.1. Declaring a Tuple
We can declare a tuple by enclosing items within parentheses `()`. For example:
```python
tuple1 = (1, 2, 3)
tuple2 = ("apple", "banana", "cherry")
tuple3 = (1, "apple", True, 3.14)
```

### 1.5.2. Accessing Tuple Elements
We can access tuple elements using indexing . For example:
```python
tuple1 = (1, 2, 3)
print(tuple1[0]) # Output: 1
```
### 1.5.3. Slice Tuple
We can slice a tuple using the syntax `variable[start:end:step]` to get a sub-tuple. For example:
```python
tuple1 = (1, 2, 3, 4, 5)
print(tuple1[1:4]) # Output: (2, 3, 4)
```

### 1.5.4. Tuple Methods
Python provides various built-in methods to manipulate tuples. Some of the commonly used tuple methods are:
1. `count()` : Returns the number of occurrences of a specified element in the tuple.
```python
tuple1 = (1, 2, 3, 2)
print(tuple1.count(2)) # Output: 2
```

2. `index()` : Returns the index of the first occurrence of the specified element in the tuple.
```python
tuple1 = (1, 2, 3, 2)
print(tuple1.index(2)) # Output: 1
```

3. `len()` : Returns the length of the tuple.
```python
tuple1 = (1, 2, 3, 2)
print(len(tuple1)) # Output: 4
```

### 1.5.5 concatenation of tuple
We can concatenate two or more tuples using the `+` operator. For example:
```python
tuple1 = (1, 2, 3)
tuple2 = (4, 5, 6)
print(tuple1 + tuple2) # Output: (1, 2, 3, 4, 5, 6)
```

### 1.5.6. Tuple Unpacking
Tuple unpacking allows us to assign multiple variables at once. For example:
```python
tuple1 = (1, 2, 3)
a, b, c = tuple1
d,*e = tuple1
print(a) # Output: 1
print(b) # Output: 2
print(c) # Output: 3
print(d) # Output: 1
print(e) # Output: [2, 3]
```
```python
tuple1 = (1, 2, 3, 4, 5)
a, *b, c = tuple1
print(a) # Output: 1
print(b) # Output: [2, 3, 4]
print(c) # Output: 5
```

> Note:Ascessing and slicing of tuple is similar to list and string.


## 1.6. Boolean Operations
Boolean is a data type that represents one of two values: `True` or `False`. Boolean values are used to evaluate conditions in programming. Here are some common boolean operations:

### 1.6.1. Condition when variable is True
- When a variable has a non-zero value, it is considered `True`.
```python
a = 10
if a:
    print("The value of a is True")
```

- When a string is not empty, it is considered `True`.
```python
a = "Hello"
if a:
    print("The value of a is True")
```

- When a list is not empty, it is considered `True`.
```python
a = [1, 2, 3]
if a:
    print("The value of a is True")
```
- When a dictionary is not empty, it is considered `True`.
```python
a = {"name": "Alice", "age": 30}
if a:
    print("The value of a is True")
```
- When a tuple is not empty, it is considered `True`.
```python
a = (1, 2, 3)
if a:
    print("The value of a is True")
```
- When a set is not empty, it is considered `True`.
```python
a = {1, 2, 3}
if a:
    print("The value of a is True")
```
- When a variable is explicitly set to `True`, it is considered `True`.
```python
a = True
if a:
    print("The value of a is True")
```

### 1.6.2. Condition when variable is False
Those which are not in the above condition are considered as False.

## 1.7. Set Operations
A set is a collection of unique items enclosed within curly braces `{}`. Main Uses of set are:
- To remove duplicate elements from a list.
- To perform mathematical set operations like union, intersection, difference, etc.


### 1.7.1. Declaring a Set
We can declare a set by enclosing items within curly braces `{}` or `set()`. For example:
```python
set1 = {1, 2, 3}
set2 = {"apple", "banana", "cherry"}
set3 = {1, "apple", True, 3.14}
#using set()
set4 = set([1, 2, 3])
set5=set()
```

### 1.7.2. Set Methods
Python provides various built-in methods to manipulate sets. Some of the commonly used set methods are:

-`len()` : Returns the number of elements in the set.
```python
set1 = {1, 2, 3}
print(len(set1)) # Output: 3
```

-`add()` : Adds an element to the set.Doesn't return anything.
```python
set1 = {1, 2, 3}
set1.add(4)
print(set1) # Output: {1, 2, 3, 4}
```

-`clear()` : Removes all elements from the set.Doesn't return anything.
```python
set1 = {1, 2, 3}
set1.clear()
print(set1) # Output: set()
```

-`remove()` : Removes the specified element from the set. If the element is not present, it raises an error.
```python
set1 = {1, 2, 3}
set1.remove(2)
print(set1) # Output: {1, 3}
```

`discard()` : Removes the specified element from the set. If the element is not present, it does not raise an error.
```python
set1 = {1, 2, 3}
set1.discard(2)
print(set1) # Output: {1, 3}
```

-`union()` : Returns a set containing the union of two sets.
```python
set1 = {1, 2, 3}
set2 = {3, 4, 5}
print(set1.union(set2)) # Output: {1, 2, 3, 4, 5}
```

-`intersection()` : Returns a set containing the intersection of two sets.
```python
set1 = {1, 2, 3}
set2 = {3, 4, 5}
print(set1.intersection(set2)) # Output: {3}
```

-`difference()` : Returns a set containing the difference between two sets.
```python
set1 = {1, 2, 3}
set2 = {3, 4, 5}
print(set1.difference(set2)) # Output: {1, 2}
```

-`symmetric_difference()` : Returns a set containing the symmetric difference between two sets.
```python
set1 = {1, 2, 3}
set2 = {3, 4, 5}
print(set1.symmetric_difference(set2)) # Output: {1, 2, 4, 5}
```

-`issubset()` : Returns `True` if all elements of a set are present in another set.
```python
set1 = {1, 2, 3}
set2 = {1, 2, 3, 4, 5}
print(set1.issubset(set2)) # Output: True
```


## 1.8 Used in All iterable

### 1.8.1. `in` Operator
The `in` operator is used to check if an element is present in an iterable. For example:
```python
# in string
str = "Hello, World!"
print("Hello" in str) # Output: True

# in list
list1 = [1, 2, 3, 4, 5]
print(3 in list1) # Output: True

# in tuple
tuple1 = (1, 2, 3, 4, 5)
print(6 in tuple1) # Output: False

# in set
set1 = {1, 2, 3, 4, 5}
print(5 in set1) # Output: True

# in dictionary
dict1 = {"name": "Alice", "age": 30}
print("name" in dict1) # Output: True
```

### 1.8.2. `not in` Operator
The `not in` operator is used to check if an element is not present in an iterable. For example:
```python
# not in string
str = "Hello, World!"
print("Alice" not in str) # Output: True

# not in list
list1 = [1, 2, 3, 4, 5]
print(6 not in list1) # Output: True

# not in tuple
tuple1 = (1, 2, 3, 4, 5)
print(5 not in tuple1) # Output: False

# not in set
set1 = {1, 2, 3, 4, 5}
print(5 not in set1) # Output: False

# not in dictionary
dict1 = {"name": "Alice", "age": 30}
print("name" not in dict1) # Output: False
```

### 1.8.3. `len()` Function
The `len()` function is used to get the length of an iterable. For example:
```python
# for string
str = "Hello, World!"
print(len(str)) # Output: 13

# for list
list1 = [1, 2, 3, 4, 5]
print(len(list1)) # Output: 5

# for tuple
tuple1 = (1, 2, 3, 4, 5)
print(len(tuple1)) # Output: 5

# for set
set1 = {1, 2, 3, 4, 5}
print(len(set1)) # Output: 5

# for dictionary
dict1 = {"name": "Alice", "age": 30}
print(len(dict1)) # Output: 2
```

### 1.8.4. `max()` and `min()` Functions
The `max()` function is used to get the maximum value from an iterable, and the `min()` function is used to get the minimum value for list,string,set and tuples only. for dictionary you can use .keys() or .values() and use it.  For example:
```python
# for list
list1 = [1, 2, 3, 4, 5]
print(max(list1)) # Output: 5
print(min(list1)) # Output: 1

# for tuple
tuple1 = (1, 2, 3, 4, 5)
print(max(tuple1)) # Output: 5
print(min(tuple1)) # Output: 1

# for string
string = "Hello, World!"
print(max(string)) # Output: r
print(min(string)) # Output: ' '

# for set
set1 = {1, 2, 3, 4, 5}
print(max(set1)) # Output: 5
print(min(set1)) # Output: 1
```


### 1.8.5. `join()` Function
The `join()` function is used to concatenate elements of an iterable with a separator. For example:
```python
# for list
list1 = ["apple", "banana", "cherry"]
print(", ".join(list1)) # Output: apple, banana, cherry

# for tuple
tuple1 = ("apple", "banana", "cherry")
print(", ".join(tuple1)) # Output: apple, banana, cherry

# for set
set1 = {"apple", "banana", "cherry"}
print(", ".join(set1)) # Output: apple, banana, cherry

# for string
string = "Hello, World!"
print(", ".join(string)) # Output: H, e, l, l, o, ,,  , W, o, r, l, d, !
```



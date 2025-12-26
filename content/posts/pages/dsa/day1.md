# List Data Structure (Python)

## Introduction

A **list** in Python is an **ordered sequence of heterogeneous elements**. This means:

* Elements maintain insertion order
* Elements can be of **different data types**
* Lists are **mutable** (can be changed after creation)

### Example

```python
lst = ['a', 'apple', 23, 3.14]
```

A list can store integers, strings, floats, functions, and even other lists at the same time.

```python
def hello():
    print("Hello")

another_list = [[1, 2], ['x', 'y'], "Python", hello]
```

## Indexing in Lists

* List indices start from **0**
* First element → index `0`
* Second element → index `1`

```python
lst = [10, 20, 30, 40]
print(lst[0])  # 10
print(lst[2])  # 30
```

---

## Important List Functions

> **Note:** In interviews, do not directly use built-in functions like `sort()` to explain algorithms.

### 1. `append()`

Adds a single element to the end of the list.

```python
lst.append(5)
```

Raw implementation:

```python
def append(lst, value):
    lst += [value]
```


**Time Complexity:** `O(1)`

---

### 2. `insert()`

Inserts an element at a specific index.

```python
lst.insert(index, value)
```

Example:

```python
lst.insert(0, 2)
```

Raw implementation:

```python
def insert(lst, index, value):
    if index < 0 or index > len(lst):
        raise IndexError("insert index out of range")
    
    # Increase list size by 1
    lst += [None]
    
    # Shift elements to the right from the end to the index
    for i in range(len(lst)-1, index, -1):
        lst[i] = lst[i-1]
    
    # Insert the new value
    lst[index] = value
```

* **Time Complexity:** `O(n)`

---

### 3. `remove()`

Removes the first occurrence of a given element.

```python
lst.remove(element)
```

* Raises **runtime error** if element is not found
* **Time Complexity:** `O(n)`

---

### 4. `pop()`

Removes and returns an element from the list.

```python
lst.pop()      # removes last element
lst.pop(2)     # removes element at index 2
```

* `pop()` → `O(1)`
* `pop(k)` → `O(k)` where `k < n`

---

### 5. `reverse()`

Reverses the list in place.

```python
lst.reverse()
```
Raw implementation:
```python
def reverse(lst):
    for x in range(len(lst)//2):
        temp= lst[x]
        lst[x] = lst[len(lst)-1-x]
        lst[len(lst)-1-x]=temp
```

### 6. `sort()`
Sorts the list in ascending order.

```python
lst.sort()
```

### 7. `len()`
Returns the number of elements in the list.

```python
length = len(lst)
```
Raw implementation:

```python
def length(lst):
    count = 0
    for _ in lst:
        count += 1
    return count
```

* **Time Complexity:** `O(n)`

---

## Slicing in Lists

Slicing allows accessing or modifying **multiple elements at once** without using loops.

### Basic Slice Syntax

```python
list[start:end]
```

* Includes `start`
* Excludes `end`

### Examples

```python
lst = [0, 1, 2, 3, 4, 5]
print(lst[1:4])  # [1, 2, 3]
```

#### Omitting Indices

* `list[start:]` → elements from `start` to end
* `list[:end]` → elements from beginning to `end-1`
* `list[:]` → full list

---

## Stepped Indexing

Similar to incrementing in loops.

### Syntax

```python
list[start:stop:step]
```

### Example

```python
lst = [0, 1, 2, 3, 4, 5, 6]
print(lst[::2])    # every second element
print(lst[::-2])  # every second element from end
```

---

## Modifying List Using Slicing

You can update multiple values at once.

```python
arr[start:end] = [new, values]
```

### Example

```python
arr = [10, 20, 30, 40, 50]
arr[1:4] = [45, 21, 83]
# Result: [10, 45, 21, 83, 50]
```

> Python slicing never includes the ending index.

---

## Deleting Elements Using Slicing

Use the `del` keyword.

### Example: Delete elements at even indices

```python
del arr[::2]
```

* Empty start → index `0`
* Empty end → end of list

---

## Negative Indexing

Negative indices access elements from the **end** of the list.

```python
lst[-1]   # last element
lst[-5]   # fifth element from end
```

### Example

```python
lst = [1, 2, 3, 4, 5, 6, 7]
print(lst[-5:-1])  # [3, 4, 5, 6]
```

---

## Slicing in Strings

Strings support slicing because they are sequences of characters.

### Example

```python
s = "somehow"
print(s[:4])   # some
print(s[4:])   # how
```

---

## Key Points to Remember

* Lists are **ordered, mutable, heterogeneous**
* Indexing starts at **0**
* Slicing is **powerful and concise**
* Built-in functions have known **time complexities**
* Slicing works for **lists, tuples, and strings**

---

Questions To Practice:
1. Remove Even Integers from List
2. Merge Two Sorted Lists
3. Find two numbers that add up to a target sum in a list
4. Product of Array Except Self
5. Find Minimum Value in a List
6. First Non-Repeating Integer in a List
7. First second largest in a list 
8. Rotate List
9. Rearrange Positive and Negative Numbers in a List
10. Rearrange List in Max-Min Form
11. Maximum Sublist 



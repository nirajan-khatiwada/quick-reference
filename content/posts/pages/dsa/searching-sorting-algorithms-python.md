---
title: "Searching & Sorting in Python: Linear, Binary & Bubble Sort"
slug: "searching-sorting-algorithms-python"
date: 2024-10-24
description: "Fundamental searching and sorting algorithms in Python. Linear Search, Binary Search, and Bubble Sort explained with code."
showToc: true
weight: 5
series: ["DSA"]
categories: ["DSA", "Python"]
tags: ["Algorithms", "Searching", "Sorting", "Python", "Binary Search"]
summary: "A beginner's guide to essential searching and sorting algorithms in Python, complete with time complexity analysis."
images: ["/images/sorting.png"]
---

Searching and sorting are fundamental concepts in computer science. Searching is the process of finding a specific element in a data structure, while sorting is the process of arranging elements in a specific order (ascending or descending).

This note covers **linear search**, **binary search**, and **bubble sort** with code explanations and step-by-step details.

---

## 1. Linear Search

### Concept

* Linear search traverses the list from start to end.
* Compares each element with the target key.
* Returns `True` if the key is found, `False` otherwise.

### Code

```python
def linear_search(lists, key):
    # Step 1: Traverse each element in the list
    for x in lists:
        # Step 2: Check if current element matches the key
        if x == key:
            return True
    # Step 3: If key is not found after traversal
    return False
```

### Explanation

1. Start from the first element.
2. Compare each element with the key.
3. If a match is found, return `True`.
4. If end of list is reached without a match, return `False`.

**Time Complexity:** O(n)
**Space Complexity:** O(1)

---

## 2. Binary Search

### Concept

* Binary search works on **sorted lists**.
* Divides the list into halves repeatedly to find the key.
* More efficient than linear search for large lists.

### Code

```python
def binary_search(lists, first, last, key):
    # Step 1: Base case - if start index is greater than end
    if first > last:
        return False

    # Step 2: Find middle element
    m = (first + last) // 2

    # Step 3: Check if middle element is the key
    if lists[m] == key:
        return True
    else:
        # Step 4: If middle element is less than key, search right half
        if lists[m] < key:
            return binary_search(lists, m+1, last, key)
        # Step 5: If middle element is greater than key, search left half
        elif lists[m] > key:
            return binary_search(lists, first, m-1, key)
```

### Explanation

1. Calculate the middle index `m`.
2. Compare `lists[m]` with `key`.
3. If equal, return `True`.
4. If `lists[m] < key`, search the right half.
5. If `lists[m] > key`, search the left half.
6. Repeat until the key is found or the sublist is empty.

**Time Complexity:** O(log n)
**Space Complexity:** O(log n) due to recursion

---

## 3. Bubble Sort

### Concept

* Bubble sort repeatedly swaps adjacent elements if they are in the wrong order.
* After each pass, the largest unsorted element moves to its correct position.
* Simple but not efficient for large lists.

### Code

```python
def bubble_sort(lists):
    # Step 1: Traverse the list multiple times
    for x in range(len(lists) - 1):
        # Step 2: Traverse the unsorted part of the list
        for y in range(0, len(lists) - x - 1):
            # Step 3: Swap if the current element is greater than next
            if lists[y] > lists[y+1]:
                temp = lists[y]
                lists[y] = lists[y+1]
                lists[y+1] = temp
```

### Explanation

1. Outer loop controls the number of passes.
2. Inner loop compares adjacent elements.
3. Swap elements if they are in the wrong order.
4. Repeat until the list is sorted.

**Time Complexity:** O(n^2)
**Space Complexity:** O(1)

---

## Summary

| Algorithm     | Best Case | Worst Case | Average Case | Space Complexity |
| ------------- | --------- | ---------- | ------------ | ---------------- |
| Linear Search | O(1)      | O(n)       | O(n)         | O(1)             |
| Binary Search | O(1)      | O(log n)   | O(log n)     | O(log n)         |
| Bubble Sort   | O(n)      | O(n^2)     | O(n^2)       | O(1)             |

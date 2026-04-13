

## 1. Introduction to Recursion

**Recursion** is a programming technique in which a function calls itself directly or indirectly to solve a problem.

It breaks a complex problem into **smaller subproblems of the same type** until a base condition is met.

---

## 2. Key Components of Recursion

Every recursive function must have **two essential parts**:

### a) Base Case
- Condition where recursion stops
- Prevents infinite function calls

### b) Recursive Case
- Function calls itself with a **smaller input**
- Moves the problem toward the base case

---

## 3. How Recursion Works (Call Stack)

- Each recursive call is stored in the **call stack**
- Local variables are stored separately for each call
- When the base case is reached, stack starts **unwinding**

### Stack Behavior:
- Function call → pushed to stack
- Function return → popped from stack

---

## 4. General Structure of a Recursive Function

```python
def recursive_function(parameters):
    if base_condition:
        return value
    else:
        return recursive_function(smaller_parameters)
```

---

## 5. Example 1: Factorial of a Number

### Mathematical Definition:
```
n! = n × (n-1)!
0! = 1
```

### Python Implementation:
```python
def factorial(n):
    if n == 0 or n == 1:
        return 1
    return n * factorial(n - 1)
```

### Dry Run (factorial(4)):
```
factorial(4)
= 4 * factorial(3)
= 4 * 3 * factorial(2)
= 4 * 3 * 2 * factorial(1)
= 4 * 3 * 2 * 1
= 24
```

---

## 6. Example 2: Fibonacci Series

### Definition:
```
fib(n) = fib(n-1) + fib(n-2)
fib(0) = 0, fib(1) = 1
```

### Python Code:
```python
def fibonacci(n):
    if n == 0:
        return 0
    if n == 1:
        return 1
    return fibonacci(n-1) + fibonacci(n-2)
```

---

## 7. Types of Recursion

### 1. Direct Recursion
A function calls itself directly.

```python
def fun(n):
    if n == 0:
        return
    fun(n - 1)
```

---

### 2. Indirect Recursion
Function A calls Function B, and Function B calls Function A.

```python
def A(n):
    if n <= 0:
        return
    B(n - 1)

def B(n):
    if n <= 0:
        return
    A(n - 1)
```

---

### 3. Tail Recursion
- Recursive call is the **last statement**
- Can be optimized by compilers

```python
def tail_fact(n, result=1):
    if n == 0:
        return result
    return tail_fact(n - 1, n * result)
```

---

### 4. Non-Tail Recursion
- Recursive call is not the last operation

```python
def fact(n):
    if n == 0:
        return 1
    return n * fact(n - 1)
```

---

## 8. Recursion Tree

- Used to visualize recursive calls
- Helpful in **time complexity analysis**

Example for `fibonacci(4)`:

```
        fib(4)
       /      \
   fib(3)    fib(2)
    /   \      /   \
fib(2) fib(1) fib(1) fib(0)
```

---

## 9. Time and Space Complexity

### Time Complexity
- Depends on number of recursive calls
- Example:
  - Factorial → **O(n)**
  - Fibonacci (naive) → **O(2ⁿ)**

### Space Complexity
- Depends on recursion depth (stack space)
- Factorial → **O(n)**

---

## 10. Advantages of Recursion

- Simplifies complex problems
- Cleaner and shorter code
- Natural fit for:
  - Tree traversal
  - Graph algorithms
  - Divide and Conquer

---

## 11. Disadvantages of Recursion

- Extra memory due to stack
- Slower than iteration in many cases
- Risk of **stack overflow**

---

## 12. Recursion vs Iteration

| Feature | Recursion | Iteration |
|------|----------|-----------|
| Code Length | Shorter | Longer |
| Memory | More (stack) | Less |
| Speed | Slower | Faster |
| Readability | High | Moderate |

---

## 13. Common Applications of Recursion

- Tree Traversals (Inorder, Preorder, Postorder)
- Graph DFS
- Binary Search
- Tower of Hanoi
- Merge Sort, Quick Sort

---

## 14. Common Mistakes in Recursion

- Missing base case
- Base case never reached
- Large input causing stack overflow
- Redundant recursive calls

---

## 15. Exam-Oriented Short Notes

- Recursion uses **stack memory**
- Base case prevents infinite recursion
- Each recursive call has its own execution context
- Tail recursion is more memory efficient

---

## 16. Conclusion

Recursion is a powerful technique for solving problems that can be divided into smaller subproblems. Proper base cases, optimized recursion, and understanding stack behavior are essential for efficient recursive solutions.

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

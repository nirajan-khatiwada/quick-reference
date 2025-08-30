---
title: "Python & C++ Fundamentals: Inheritance Concepts and Variable Resolution (part 12)"
date: 2024-11-12 
description: "Understanding how inheritance works differently in Python and C++ with detailed examples covering public and private variable resolution."
showToc: true
categories: ["Inheritance Core", ]
tags: ["Python", "C++", "Programming", "Inheritance", "OOP", "Tutorial"]
summary: "An in-depth comparison of inheritance behavior between Python and C++ across different scenarios."
images: ["/images/pythoncpp.png"]
---

# Inheritance Concepts in Python and C++

This document explores inheritance behavior differences between Python and C++ through various examples and cases.

## Case 1: All Public Variables with No Same Public Variable in Derived Class

### Python Implementation

```python
class A:
    def __init__(self):
        self.name = "nirajan"
    
    def display(self):
        print("name is", self.name, "from a")
    
    def change_name(self, new_name):
        self.name = new_name + ' added in a'

class B(A):
    def __init__(self):
        super().__init__()
        self.doc = "rame"
    
    def display_a(self):
        self.display()
        print("name is", self.name, "from a")
        print("doc is", self.doc, "from b")
    
    def change_name_b(self, new_name):
        self.name = new_name + ' added in b'
        self.change_name(new_name)
        self.doc = new_name + ' added in b'

b = B()
b.display_a()
b.change_name_b("newname")
b.display_a()
```

### C++ Implementation

```cpp
#include <iostream>
using namespace std;

class A {
    public:
        string name;
        A() {
            name = "nirajan";
        }
        void display() {
            cout << "name is " << name << " from a" << endl;
        }
        void change_name(string new_name) {
            name = new_name + " added in a";
        }
};

class B: public A {
    public:
        string doc;
        B() {
            doc = "rame";
        }
        void display_a() {
            display();
            cout << "name is " << name << " from a" << endl;
            cout << "doc is " << doc << " from b" << endl;
        }
        void change_name_b(string new_name) {
            name = new_name + " added in b";
            change_name(new_name);
            doc = new_name + " added in b";
        }
};

int main() {
    B b;
    b.display_a();
    b.change_name_b("newname");
    b.display_a();
    return 0;
}
```

### What Happens Here?

When we execute `display_a()`, it first checks if the `display_a()` function exists in class B. If found, it executes that function; otherwise, it looks for the function in class A. Since `display_a()` is found in class B, it executes that function.

Within `display_a()`, the first line calls `display()`. The system looks for this function in class B first. If not found, it searches in class A. Since `display()` is not in class B, it finds and executes the function from class A.

**In Python:**
While executing the display function, when it needs the `name` variable, it first looks for the variable in class B. If not found, it searches in class A.

**In C++:**
While executing the display function, when it needs the `name` variable, it first looks for the variable in the class that the function actually belongs to. Here, the display function belongs to class A, so it looks for the variable in class A, not in class B as in Python.

After finding the variable, the display function prints the variable value. In this case, both Python and C++ print the same value since the `name` variable is not present in class B. Python looks for the variable in class A and finds it there, while C++ looks in class A by default since the display function belongs to class A.

After the `display()` function, the next line of code is `cout << "name is " << name << " from a" << endl;`. Since this is in a function of class B:

**C++ behavior:** Looks for variable `name` in class B first, as it's in a function of class B. If not found, it looks in class A.

**Python behavior:** Always looks in the derived class first, so it searches for variable `name` in class B first. If not found, it looks in class A.

Both then print the value of variable `name` from class A.

The next line `cout << "doc is " << doc << " from b" << endl;` is also in a function of class B, so both C++ and Python find the variable `doc` in class B first and print its value.

## Case 2: Public Variable with Repetition in Derived Class

### Python Implementation

```python
class A:
    def __init__(self):
        self.name = "nirajan"
    
    def display(self):
        print("name is", self.name, "from a")
    
    def change_name(self, new_name):
        self.name = new_name + ' added in a'

class B(A):
    def __init__(self):
        self.name = "rame"
    
    def display_a(self):
        self.display()
        print("name is", self.name, "from b")
    
    def change_name_b(self, new_name):
        self.name = new_name + ' added in b'
        self.change_name(new_name)

b = B()
b.display_b()
b.change_name_b("newname")
b.display_b()
```

### C++ Implementation

```cpp
#include <iostream>
using namespace std;

class A {
    public:
        string name;
        A() {
            name = "nirajan";
        }
        void display() {
            cout << "name is " << name << " from a" << endl;
        }
        void change_name(string new_name) {
            name = new_name + " added in a";
        }
};

class B: public A {
    public:
        string name;
        B() {
            name = "rame";
        }
        void display_a() {
            display();
            cout << "name is " << name << " from b" << endl;
        }
        void change_name_b(string new_name) {
            name = new_name + " added in b";
            change_name(new_name);
        }
};

int main() {
    B b;
    b.display_a();
    b.change_name_b("newname");
    b.display_a();
    return 0;
}
```

### What Happens Here?

Python and C++ behave differently in this case.

**In Python:**
 When we call `display_b()`, it first checks if the function is available in class B. Since it's found in class B, it executes that function. The first line `self.display()` then it again checks for the display function in class B first. If not found, it looks in class A . Since it's not found in class B, it finds and executes the function from class A. While executing the function from class A, Inside the display function, it need variable `name`, so it first looks for the variable in class B. If not found, it looks in class A. Here, it finds the variable `name` in class B and uses that value. So when we call the display function, it prints "name is rame from b". 

 The next line `print("name is", self.name, "from b")` is in a function of class B, so it uses the variable from class B.


 


**In C++:**
When we call `display_a()`, it first checks if the function is available in class B. Since it's found in class B, it executes that function. The first line calls `display()`, which searches for the display function in class B first. If not found, it looks in class A and finds it there, executing the class A function. While executing the function from class A, it uses the variable from class A, not from class B as in Python.

The next line `cout << "name is " << name << " from b" << endl;` is in a function of class B, so it uses the variable from class B.

When changing the name through `change_name_b()`, the first line `name = new_name + " added in b";` uses the variable from class B because it's in a function of class B. The next line `change_name(new_name);` looks for the function in class B first, then in class A, finding and executing the function from class A. While executing the function from class A, it uses the variable from class A, not from class B as in Python.

## Case 3: Private Variable Only in Base Class with No Same Variable in Derived Class

### Python Implementation

```python
class A:
    def __init__(self):
        self.__name = "nirajan"
    
    def display(self):
        print("name is", self.__name, "from a")
    
    def change_name(self, new_name):
        self.__name = new_name + ' added in a'

class B(A):
    def __init__(self):
        super().__init__()
        self.doc = "rame"
    
    def display_b(self):
        self.display()
        print("doc is", self.doc, "from b")
        print("name is", self.__name, "from b")  # will give error
    
    def change_name_b(self, new_name):
        self.__name = new_name + ' added in b'  # will give error
        self.change_name(new_name)
        self.doc = new_name + ' added in b'

b = B()
b.display_b()
b.change_name_b("newname")
b.display_b()
```

### C++ Implementation

```cpp
#include <iostream>
using namespace std;

class A {
    private:
        string name;
    public:
        A() {
            name = "nirajan";
        }
        void display() {
            cout << "name is " << name << " from a" << endl;
        }
        void change_name(string new_name) {
            name = new_name + " added in a";
        }
};

class B: public A {
    public:
        string doc;
        B() {
            doc = "rame";
        }
        void display_a() {
            display();
            cout << "doc is " << doc << " from b" << endl;
            cout << "name is " << name << " from b" << endl;  // will give error
        }
        void change_name_b(string new_name) {
            name = new_name + " added in b";  // will give error
            change_name(new_name);
            doc = new_name + " added in b";
        }
};

int main() {
    B b;
    b.display_a();
    b.change_name_b("newname");
    b.display_a();
    return 0;
}
```

### What Happens Here?

When running the `display_a()` function of class B, the first line `display()` searches for the display function in class B. If not found, it looks in class A, finds it, and executes it. In the `display()` function, we display the private variable of class A because we're using the function from class A.

The next line `cout << "doc is " << doc << " from b" << endl;` prints the variable from class B because it's in a function of class B.

However, the next line `cout << "name is " << name << " from b" << endl;` throws an error because it searches for `name` in class B first. If not found, it looks for the same variable in class A, but since it's a private variable, it's not visible to class B functions. The system can't see the declaration of `name` in class A and throws an error stating that `name` is not declared.

Similarly, when changing the name through `change_name_b()`, the first line `name = new_name + " added in b";` searches for the variable `name` in class B. If not found, it looks in class A, but since it's a private variable, it's not visible to class B functions, causing a "not declared" error.

The next line `change_name(new_name);` looks for the function in class B first, then in class A, finding and executing the function from class A, which uses the variable from class A.

## Case 4: Private Variable in Base Class and Same Private Variable in Derived Class

### Python Implementation

```python
class A:
    def __init__(self):
        self.__name = "nirajan"
    
    def display(self):
        print("name is", self.__name, "from a")
    
    def change_name(self, new_name):
        self.__name = new_name + ' added in a'

class B(A):
    def __init__(self):
        super().__init__()
        self.__name = "rame"
    
    def display_b(self):
        self.display()
        print("name is", self.__name, "from b")
    
    def change_name_b(self, new_name):
        self.__name = new_name + ' added in b'
        self.change_name(new_name)

b = B()
b.display_b()
b.change_name_b("newname")
b.display_b()
```

### C++ Implementation

```cpp
#include <iostream>
using namespace std;

class A {
    private:
        string name;
    public:
        A() {
            name = "nirajan";
        }
        void display() {
            cout << "name is " << name << " from a" << endl;
        }
        void change_name(string new_name) {
            name = new_name + " added in a";
        }
};

class B: public A {
    private:
        string name;
    public:
        B() {
            name = "rame";
        }
        void display_a() {
            display();
            cout << "name is " << name << " from b" << endl;
        }
        void change_name_b(string new_name) {
            name = new_name + " added in b";
            change_name(new_name);
        }
};

int main() {
    B b;
    b.display_a();
    b.change_name_b("newname");
    b.display_a();
    return 0;
}
```

### What Happens Here?

**In C++:**
When we call `display_a()`, it first checks if the function is available in class B. Since it's found in class B (and is public), it executes that function. The first line `display()` checks if the display function is available in class B. If not found, it looks in class A, finds it, and executes the function from class A. While executing the function from class A, it uses the variable from class A, not from class B as in Python.

The next line `cout << "name is " << name << " from b" << endl;` is in a function of class B, so it uses the variable from class B.

**In Python:**
While executing the display function (similar to case 2), it first looks for the `__name` variable in class B. The variable is present in class B but is private, so it's not visible when executing the function from class A. Therefore, it looks for the variable in class A, finds it there, and prints the value of the class A variable. The next line prints the value of the class B variable since it's in a function of class B.

When changing the name through `change_name_b()`, the first line `name = new_name + " added in b";` uses the variable from class B because it's in a function of class B. The next line `change_name(new_name);` looks for the function in class B first, then in class A, finding and executing the function from class A. While executing the function from class A, it uses the variable from class A, not from class B as in Python.

## Key Points

- Private functions can only be accessed from within the same class, not from outside the class
- Variable and function resolution follows different patterns in Python versus C++
- Python tends to look in the derived class first, while C++ considers the scope of the function being executed
- Private variables are not accessible across class boundaries in both languages
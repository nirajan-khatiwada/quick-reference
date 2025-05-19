---
title: "Python Fundamentals: Exploring OOP (Part 12)"
date: 2024-11-10
description: "This is the first part of series Object Oriented Programming in Python"
showToc: true
categories: ["Python"]
tags: ["Python", "Programming", "OOP", "Tutorial"]
summary: "This is the first part of series of Object Oriented Programming in Python"
images: ["/images/python.png"]
---

# Object Oriented Programming in Python

Object oriented programming is a programming paradigm that provides a means of structuring programs so that properties and behaviors are bundled into individual objects. This approach makes code more modular, reusable, and easier to maintain, especially for complex systems.

## 1. Classes and Objects: The Foundation

### 1.1 What is a Class?
Class is a blueprint for creating objects (a particular data structure), providing initial values for state (member variables or attributes), and implementations of behavior (member functions or methods). Think of a class as a template that defines what an object will look like and how it will behave.

### 1.2 What is an Object?
Object is an instance of a class. When class is defined, only the description for the object is defined. Therefore, no memory or storage is allocated. Memory is allocated only when an object is created. Each object has its own copy of the attributes defined in the class.

### 1.3 Creating a Class
We can create a class using the `class` keyword followed by the class name. The class definition can contain class variables, instance variables, methods, and constructors.

Syntax:
```python
class ClassName:
    #code block
```

Example:
```python
class Person:
    name="Nirajan"  # Class attribute shared by all instances 
    age=20          # Class attribute shared by all instances
    classes="Bachelor"  # Class attribute shared by all instances
```

### 1.4 Creating an Object
To create an object of a class, we use the class name followed by parentheses. This calls the constructor method of the class and returns an object.

Syntax:
```python
object_name = ClassName()
```

Example:
```python
person1 = Person()  # Creates an instance of Person class
```

### 1.5 Accessing Class Attributes
We can access the attributes of a class using the dot operator (`.`) followed by the attribute name.

Syntax:
```python
object_name.attribute_name
```

Example:
```python
print(person1.name)  # Output: Nirajan
print(person1.age)  # Output: 20
print(person1.classes)  # Output: Bachelor
```

### 1.6 Modifying Class Attributes
We can modify the attributes of a class using the dot operator (`.`) followed by the attribute name.

Syntax:
```python
object_name.attribute_name = new_value
```

Example:
```python
person1.age = 21  # Modifies the age attribute for person1
print(person1.age)  # Output: 21
```

## 2. Methods: Adding Behavior to Classes

### 2.1 Creating a Member Function
We can create a member function (method) inside a class using the `def` keyword followed by the function name. The first parameter of the method should be `self`, which refers to the current instance of the class.

Syntax:
```python
class ClassName:
    def method_name(self, parameters):
        #code block
```

Example:
```python
class Person:
    name="Nirajan"
    age=20
    classes="Bachelor"

    def display(self):  # Method to display person information
        print(f"Name: {self.name}")
        print(f"Age: {self.age}")
        print(f"Class: {self.classes}")
```

### 2.2 The `self` Parameter
The `self` parameter is a reference to the current instance of the class, and is used to access variables and methods of the class. It is the first parameter of any method in a class. When you call a method on an object, Python automatically passes the object as the first argument to the method.

Example:
```python
class Person:
    name="Nirajan"
    age=20
    classes="Bachelor"

    def display(self):
        print(f"Name: {self.name}")  # Accessing class attribute with self
        print(f"Age: {self.age}")    # Accessing class attribute with self 
        print(f"Class: {self.classes}")  # Accessing class attribute with self
        self.greet()  # Calling another method with self

    def greet(self):
        print("Hello, Welcome to the class")
```

### 2.3 Calling a Member Function
We can call a member function of a class using the dot operator (`.`) followed by the function name and parentheses.

Syntax:
```python
object_name.method_name(arguments)
```

Example:
```python
person1.display()  # Calls the display method for person1 object
```

### 2.4 Nested Member Function
We can call a member function from another member function of the same class using the `self` keyword.

Syntax:
```python
class ClassName:
    def method1(self):
        #code block
        self.method2()  # Calling method2 from method1

    def method2(self):
        #code block
```

Example:
```python
class Person:
    name="Nirajan"
    age=20
    classes="Bachelor"

    def display(self):
        print(f"Name: {self.name}")
        print(f"Age: {self.age}")
        print(f"Class: {self.classes}")
        self.greet()  # Calling the greet method from display method

    def greet(self):
        print("Hello, Welcome to the class")
```

## 3. Constructor: Initializing Objects

A constructor is a special type of method (function) which is used to initialize the instance members of the class. It is called when an object of the class is created. This allows you to set up each object with its specific initial state.

### 3.1 Creating a Constructor
In Python, the constructor method is called `__init__`. It is a special method that is automatically called when an object is created.

Syntax:
```python
class ClassName:
    def __init__(self, parameters):
        #code block
```

Example:
```python
class Person:
    def __init__(self, name, age, classes):
        # Initialize instance attributes with provided values
        self.name = name        # Instance attribute
        self.age = age          # Instance attribute
        self.classes = classes  # Instance attribute

    def display(self):
        print(f"Name: {self.name}")
        print(f"Age: {self.age}")
        print(f"Class: {self.classes}")
```

### 3.2 Creating an Object with Constructor
When an object is created, the constructor method is automatically called with the arguments passed to the class.

Syntax:
```python
object_name = ClassName(arguments)
```

Example:
```python
# Creating a Person object with name, age, and classes values
person1 = Person("Nirajan", 20, "Bachelor")
```

In this example, the `__init__` method is called with "Nirajan", 20, and "Bachelor" as arguments, which initializes the object's attributes.

## 4. Access Specifiers in Python

Access specifiers control the visibility and accessibility of class members (attributes and methods). Understanding access control is important for implementing encapsulation - one of the four pillars of OOP.

### 4.1 Public Members
Public members are accessible from outside the class. They can be accessed using the dot operator (`.`) from outside the class.

Example:
```python
class Person:
    name = "Alice"  # Public member

person1 = Person()
print(person1.name)  # Output: Alice
```

### 4.2 Protected Members
Protected members are accessible within the class and its subclasses. They are denoted by a single underscore (`_`) before the member name.

Example:
```python
class Person:
    _age = 30  # Protected member

class Student(Person):
    def display(self):
        print(self._age)  # Accessing protected member

student1 = Student()
student1.display()  # Output: 30
```

Example of protected variable and method:
```python
class Person:
    _name = "Alice"  # Protected variable

    def _display(self):  # Protected method
        print(f"Name: {self._name}")

class Student(Person):
    def display(self):
        self._display()  # Accessing protected method

student1 = Student()
student1.display()  # Output: Name: Alice
```

### 4.3 Private Members
Private members are accessible only within the class. They are denoted by a double underscore (`__`) before the member name.

Example:
```python
class Person:
    __city = "New York"  # Private member

person1 = Person()
print(person1.__city)  # Error: 'Person' object has no attribute '__city'
```

Example of private variable and method:
```python
class Person:
    __name = "Alice"  # Private variable

    def __display(self):  # Private method
        print(f"Name: {self.__name}")

person1 = Person()
print(person1.__name)  # Error: 'Person' object has no attribute '__name'
person1.__display()  # Error: 'Person' object has no attribute '__display'
```

> Table of Access Specifiers in Python:
| Access Specifier  | Accessible from class  | Accessible from subclass  | Accessible from outside class |
|-------------------|------------------------|---------------------------|-------------------------------|
| Public            | Yes                    | Yes                       | Yes                           |
| Protected         | Yes                    | Yes                       | No                            |
| Private           | Yes                    | No                        | No                            |

## 5. Inheritance in Python

Inheritance is a mechanism in which one class acquires the properties and behavior of another class. The class which inherits the properties and behavior is known as the child class, and the class whose properties and behavior are inherited is known as the parent class.

### 5.1 Creating a Child Class
To create a child class that inherits from a parent class, we specify the parent class in parentheses after the child class name.

Syntax:
```python
class ChildClassName(ParentClassName):
    #code block
```

Example:
```python
class Employee:
    def __init__(self,name,age,id):
        self.name=name
        self.age=age
        self.id=id
    def display(self):
        print(f"Name: {self.name}")
        print(f"Age: {self.age}")
        print(f"ID: {self.id}")

class Manager(Employee):  # Manager inherits from Employee
    def task(self):
        self.display()  # Accessing inherited method
        print("Assigning tasks to employees")

class Developer(Employee):  # Developer inherits from Employee
    def task(self):
        self.display()  # Accessing inherited method
        print("Developing software applications")


manager1 = Manager("Alice", 30, 101)
manager1.task()
developer1 = Developer("Bob", 25, 102)
developer1.task()
```

> Note: Only public and protected members are inherited by the child class. Private members are not inherited by the child class.

### 5.2 The `super()` Method in Python
When a parent class and a child class define a method with the same name, and we create an object of the child class, invoking the method on the child class object will execute the method defined in the child class, not the one in the parent class. To explicitly call the parent class's method, we can use the super() function.

To explicitly invoke the parent class's version of the method, the super() function is used. This is especially useful when the child class's method needs to build upon or extend the functionality of the parent class's method.

Syntax:
```python
super().method_name()
```

Example:
```python
class Person:
    def display(self):
        print("Person class")
    
class Student(Person):
    def display(self):
        super().display()  # Calls the parent class's display method
        print("Student class")

student1 = Student()
student1.display()

# Output:
# Person class
# Student class
```

Example with constructor:
```python
class Person:
    def __init__(self, name, age):
        self.name = name
        self.age = age
    
class Student(Person):
    def __init__(self, name, age, roll):
        super().__init__(name, age)  # Call parent class constructor
        self.roll = roll
    
    def display(self):
        print(f"Name: {self.name}")
        print(f"Age: {self.age}")
        print(f"Roll: {self.roll}")

student1 = Student("Alice", 30, 101)
student1.display()

# Output:
# Name: Alice
# Age: 30
# Roll: 101
```

> Note: Use super() for single inheritance only. For multiple inheritance, use the class name directly.

### 5.3 Method Overriding

Method overriding is a feature of object-oriented programming that allows a subclass to provide a specific implementation of a method that is already provided by its parent class. When a method in a subclass has the same name, same parameters or signature, and same return type as a method in its parent class, then the method in the subclass is said to override the method in the parent class.

Example:
```python
class Person:
    def display(self):
        print("Person class")

class Student(Person):
    def display(self):  # This overrides Person's display method
        print("Student class")

student1 = Student()
student1.display()  # Calls Student's display method, not Person's

# Output: Student class
```

We can also call the parent class's method from the overridden method using the `super()` function:

```python
class Person:
    def display(self):
        print("Person class")

class Student(Person):
    def display(self):
        super().display()  # Or Person.display(self)
        print("Student class")

student1 = Student()
student1.display()

# Output:
# Person class
# Student class
```

### 5.4 Types of Inheritance in Python

Inheritance is a mechanism in which one class acquires the properties and behavior of another class. There are different types of inheritance in Python:

#### 5.4.1 Single Inheritance
In single inheritance, a class inherits from only one parent class.

The pictorial representation of single inheritance is:
```
    A
    |
    B
```

Syntax:
```python
class ParentClass:
    #code block

class ChildClass(ParentClass):
    #code block
```

Example:
```python
class Person:
    def __init__(self, name, age):
        self.name = name
        self.age = age
    def display(self):
        return f"Name: {self.name}, Age: {self.age}"

    def __str__(self):
        return f"Name: {self.name}, Age: {self.age}"

    def __repr__(self):
        return f"Person('{self.name}', {self.age})"

    def __call__(self):
        return f"Name: {self.name}, Age: {self.age}"

class Student(Person):
    def __init__(self, name, age, id):
        super().__init__(name, age)  # or Person.__init__(self, name, age)
        self.id = id
    
    def display(self):
        print(f"ID: {self.id}", super().display())  # or Person.display(self)

student1 = Student("Alice", 30, 101)
student1.display()

# Output:
# ID: 101 Name: Alice, Age: 30
```

#### 5.4.2 Multiple Inheritance
In multiple inheritance, a class inherits from more than one parent class.

The pictorial representation of multiple inheritance is:
```
    A    B
     \  /
      C
```

Syntax:
```python
class ParentClass1:
    #code block

class ParentClass2:
    #code block

class ChildClass(ParentClass1, ParentClass2):
    #code block
```

Example:
```python
class Person:
    def __init__(self, name, age):
        self.name = name
        self.age = age

    def display(self):
        return f"Name: {self.name}, Age: {self.age}"

class Address:
    def __init__(self, city, state):
        self.city = city
        self.state = state
    
    def display(self):
        return f"City: {self.city}, State: {self.state}"

class Student(Person, Address):
    def __init__(self, name, age, id, city, state):
        Person.__init__(self, name, age)
        Address.__init__(self, city, state)
        self.id = id
    
    def display(self):
        print(f"ID: {self.id}", Person.display(self), Address.display(self))

student1 = Student("Alice", 30, 101, "New York", "New York")
student1.display()

# Output:
# ID: 101 Name: Alice, Age: 30 City: New York, State: New York
```

#### 5.4.3 Multilevel Inheritance
In multilevel inheritance, a class inherits from a parent class, and another class inherits from the child class.

The pictorial representation of multilevel inheritance is:
```
    A
    |
    B
    |
    C
```

Syntax:
```python
class ParentClass:
    #code block

class ChildClass(ParentClass):
    #code block

class GrandChildClass(ChildClass):
    #code block
```

Example:
```python
class Person:
    def __init__(self, name, age):
        self.name = name
        self.age = age

    def display(self):
        return f"Name: {self.name}, Age: {self.age}"

class Student(Person):
    def __init__(self, name, age, id):
        super().__init__(name, age)  # or Person.__init__(self, name, age)
        self.id = id
    
    def display(self):
        print(f"ID: {self.id}", super().display())  # or print(f"ID: {self.id}", Person.display(self))

class CollegeStudent(Student):
    def __init__(self, name, age, id, classes):
        super().__init__(name, age, id)  # or Student.__init__(self, name, age, id)
        self.classes = classes
    
    def display(self):
        print(f"Class: {self.classes}", super().display())  # or print(f"Class: {self.classes}", Student.display(self))


student1 = CollegeStudent("Alice", 30, 101, "Bachelor")
student1.display()

# Output:
# Class: Bachelor ID: 101 Name: Alice, Age: 30
```

#### 5.4.4 Hierarchical Inheritance
In hierarchical inheritance, more than one class inherits from a single parent class.

The pictorial representation of hierarchical inheritance is:
```
    A
   / \
  B   C
```

Syntax:
```python
class ParentClass:
    #code block

class ChildClass1(ParentClass):
    #code block

class ChildClass2(ParentClass):
    #code block
```

Example:
```python
class Person:
    def __init__(self, name, age):
        self.name = name
        self.age = age

    def display(self):
        return f"Name: {self.name}, Age: {self.age}"

class Student(Person):
    def __init__(self, name, age, id):
        super().__init__(name, age)  # or Person.__init__(self, name, age)
        self.id = id
    
    def display(self):
        print(f"ID: {self.id}", super().display())  # or print(f"ID: {self.id}", Person.display(self))

class Employee(Person):
    def __init__(self, name, age, emp_id):
        super().__init__(name, age)  # or Person.__init__(self, name, age)
        self.emp_id = emp_id
    
    def display(self):
        print(f"Emp ID: {self.emp_id}", super().display())  # or print(f"Emp ID: {self.emp_id}", Person.display(self))

student1 = Student("Alice", 30, 101)
student1.display()

employee1 = Employee("Bob", 25, 201)
employee1.display()

# Output:
# ID: 101 Name: Alice, Age: 30
# Emp ID: 201 Name: Bob, Age: 25
```

> Note: Hybrid inheritance is a combination of two or more types of inheritance.

## 6. Method Resolution Order (MRO)

Method Resolution Order (MRO) is the order in which methods are resolved in the inheritance hierarchy. It defines the order in which the base classes are searched when executing a method. This is particularly important in multiple inheritance scenarios.

Example:
```python
class C:
    f = "dirajan"

class A(C):
    f = "nirajan"

class B(C):
    f = "kirajan"

class D(A, B):
    pass
    def display(self):
        print(self.f)

d = D()
print(D.__mro__)  # Shows the method resolution order
d.display()
```

Output:
```
(<class '__main__.D'>, <class '__main__.A'>, <class '__main__.B'>, <class '__main__.C'>, <class 'object'>)
nirajan
```

It means Python will search for the attribute or method in the order of D->A->B->C->object. If the attribute/method is not found in D, it will search in A, and so on. But if the attribute/method is found in D, it will not search further in A, B, C, or object.

## 7. Properties - Getters and Setters

Properties provide controlled access to class attributes. They allow you to implement getter and setter methods that act like attributes.

### 7.1 Getters
Getters are methods implemented using the `@property` decorator. They are specially used:
- To act as a value (data) instead of a method
- To access the value of a private attribute without directly accessing it

Syntax:
```python
class ClassName:
    @property
    def method_name(self):
        #code block
```

Example:
```python
class Person:
    def __init__(self, name, age):
        self._name = name  # Protected attribute
        self._age = age    # Protected attribute

    @property
    def display(self):
        return f"Name: {self._name}, Age: {self._age}"

person1 = Person("Nirajan", 20)
print(person1.display)  # Output: Name: Nirajan, Age: 20
# Note: No parentheses used - accessed like an attribute, not a method
```

### 7.2 Setters
Setters are methods implemented using the `@method_name.setter` decorator. They are specially used:
- To set the value of a private attribute without directly setting it
- To perform validation before setting the value of an attribute

Syntax:
```python
class ClassName:
    @method_name.setter
    def method_name(self, value):
        #code block
```

Example:
```python
class Person:
    def __init__(self, name, age):
        self._name = name
        self._age = age

    @property
    def display(self):
        return f"Name: {self._name}, Age: {self._age}"

    @display.setter
    def display(self, value):
        self._name, age_str = value.split(",")
        self._age = int(age_str)

person1 = Person("Nirajan", 20)
print(person1.display)  # Output: Name: Nirajan, Age: 20

person1.display = "Alice, 30"  # Using setter to modify attributes
print(person1.display)  # Output: Name: Alice, Age: 30
```

## 8. Special Methods (Magic/Dunder Methods)

Magic methods, also known as dunder methods (double underscore), are special methods that have double underscores at the beginning and end of their names. They are used to define the behavior of objects and are automatically called when certain operations are performed on objects.

Some of the commonly used magic methods are:

- `__init__`: Constructor method, called when an object is created
- `__str__`: Called by the `str()` built-in function to return a string representation of an object
- `__repr__`: Called by the `repr()` built-in function to return an unambiguous string representation of an object
- `__add__`: Called by the `+` operator to perform addition
- `__len__`: Called by the `len()` built-in function to return the length of an object
- `__call__`: Called when an object is called as a function

> Note: All magic methods can be seen using `dir(object_name)` method, and we can override these methods in our class.

Example of various magic methods:
```python
class Person:
    def __init__(self, name, age):
        self.name = name
        self.age = age

    def __str__(self):
        return f"Name: {self.name}, Age: {self.age}"

    def __repr__(self):
        return f"Person('{self.name}', {self.age})"

    def __add__(self, other):
        return self.age + other.age

    def __len__(self):
        return len(self.name)
    
    def __call__(self):
        return f"Name: {self.name}, Age: {self.age}"

person1 = Person("Alice", 30)
person2 = Person("Bob", 25)

print(person1)  # Output: Name: Alice, Age: 30 (uses __str__)

print(repr(person1))  # Output: Person('Alice', 30) (uses __repr__)

print(person1 + person2)  # Output: 55 (uses __add__)

print(len(person1))  # Output: 5 (uses __len__ to get length of name)

print(person1())  # Output: Name: Alice, Age: 30 (uses __call__)
```

## 9. Operator Overloading

Operator overloading is a feature of object-oriented programming that allows us to define the behavior of operators for user-defined objects. It lets us define how operators like `+`, `-`, `*`, `/`, `==`, `!=`, etc., behave with objects of our class.

To overload an operator, we define the corresponding magic method in the class:

Example:
```python
class Point:
    def __init__(self, x, y):
        self.x = x
        self.y = y

    def __add__(self, other):
        # Define what happens when + is used with Point objects
        x = self.x + other.x
        y = self.y + other.y
        return Point(x, y)

    def __str__(self):
        return f"({self.x}, {self.y})"

point1 = Point(1, 2)
point2 = Point(3, 4)
point3 = point1 + point2  # Uses the __add__ method
print(point3)  # Output: (4, 6)
```

## 10. Static and Class Methods

### 10.1 Static Methods
Static methods are methods that can be called without creating an object of the class. They are defined using the `@staticmethod` decorator and can be called using the class name.

Syntax:
```python
class ClassName:
    @staticmethod
    def method_name(parameters):
        #code block
```

Example:
```python
class Calculator:
    @staticmethod
    def add(a, b):
        return a + b

result = Calculator.add(5, 3)  # Calling static method directly
print(result)  # Output: 8

# Can also call using an object (though not typical)
calculator = Calculator()
result = calculator.add(5, 3)
print(result)  # Output: 8
```

### 10.2 Class Methods
Class methods are methods that are bound to the class rather than an instance. They are defined using the `@classmethod` decorator and receive the class as the first parameter (conventionally named `cls`). They are used to access or modify class variables.

Syntax:
```python
class ClassName:
    @classmethod
    def method_name(cls, parameters):
        #code block
```

Example:
```python
class Company:
    company = "Google"  # Class variable
    
    @classmethod
    def change_company(cls, new_company):
        cls.company = new_company  # Modifies the class variable

print(Company.company)  # Output: Google
Company.change_company("Microsoft")
print(Company.company)  # Output: Microsoft

c1 = Company()
print(c1.company)  # Output: Microsoft
c1.change_company("Apple")
c2 = Company()
print(c2.company)  # Output: Apple
```

## 11. Introspection with `dir()` and `__dict__`

### 11.1 The `dir()` Method
The `dir()` method returns a list of attributes and methods of any object. It provides a way to introspect objects at runtime.

Syntax:
```python
dir(object)
```

Example:
```python
class Person:
    name = "Alice"
    age = 30

person1 = Person()
print(dir(person1))
# Output: ['__class__', '__delattr__', '__dict__', '__dir__', '__doc__', '__eq__', '__format__', '__ge__', '__getattribute__', '__gt__', '__hash__', '__init__', '__init_subclass__', '__le__', '__lt__', '__module__', '__ne__', '__new__', '__reduce__', '__reduce_ex__', '__repr__', '__setattr__', '__sizeof__', '__str__', '__subclasshook__', '__weakref__', 'age', 'name']
```

Example with list:
```python
l = [1, 2, 3]
print(dir(l))
# Output: ['__add__', '__class__', '__class_getitem__', '__contains__', '__delattr__', '__delitem__', '__dir__', '__doc__', '__eq__', '__format__', '__ge__', '__getattribute__', '__getitem__', '__getstate__', '__gt__', '__hash__', '__iadd__', '__imul__', '__init__', '__init_subclass__', '__iter__', '__le__', '__len__', '__lt__', '__mul__', '__ne__', '__new__', '__reduce__', '__reduce_ex__', '__repr__', '__reversed__', '__rmul__', '__setattr__', '__setitem__', '__sizeof__', '__str__', '__subclasshook__', 'append', 'clear', 'copy', 'count', 'extend', 'index', 'insert', 'pop', 'remove', 'reverse', 'sort']
```

### 11.2 The `__dict__` Method
The `__dict__` attribute contains a dictionary of an object's attributes. It provides another way to examine an object's state.

Syntax:
```python
object.__dict__
```

Example:
```python
class Person:
    name = "Alice"
    age = 30

person1 = Person()
print(person1.__dict__)  # Output: {} (empty because no instance attributes set)

person1.name = "Bob"  # Set an instance attribute
print(person1.__dict__)  # Output: {'name': 'Bob'}
```

## 12. Nested Classes

A class can be defined inside another class. Such a class is known as a nested class. Nested classes help organize code and encapsulate related functionality.

### 12.1 Basic Nested Class

Syntax:
```python
class OuterClass:
    class InnerClass:
        #code block
```

Example:
```python
class OuterClass:
    def __init__(self):
        self.name = "Alice"
        self.age = 30

    class InnerClass:
        def display(self, outer):
            print(f"Name: {outer.name}")
            print(f"Age: {outer.age}")

outer1 = OuterClass()
inner1 = outer1.InnerClass()
inner1.display(outer1)

# Output:
# Name: Alice
# Age: 30
```

### 12.2 Creating an Object of the Nested Class

Syntax:
```python
outer_object = OuterClass()
inner_object = outer_object.InnerClass()
```

Example:
```python
class OuterClass:
    def __init__(self):
        self.name = "Alice"
        self.age = 30

    class InnerClass:
        def display(self, outer):
            print(f"Name: {outer.name}")
            print(f"Age: {outer.age}")

outer1 = OuterClass()
inner1 = outer1.InnerClass()
inner1.display(outer1)

# Output:
# Name: Alice
# Age: 30
```

### 12.3 Creating an Object of the Nested Class Inside the Outer Class

```python
class OuterClass:
    def __init__(self):
        self.name = "Alice"
        self.age = 30
        self.inner = self.InnerClass()  # Create InnerClass instance

    class InnerClass:
        def display(self, outer):
            print(f"Name: {outer.name}")
            print(f"Age: {outer.age}")

outer1 = OuterClass()
outer1.inner.display(outer1)

# Output:
# Name: Alice
# Age: 30
```

## 13. Comparison with Other Languages (Not Supported in Python)

### 13.1 Types of Inheritance in C++

Inheritance is a mechanism in which one class acquires the properties and behavior of another class. While Python has a more straightforward inheritance model, other languages like C++ offer more granular control over inheritance:

- **Public Inheritance**: In public inheritance, the public members of the base class become public members of the derived class, and the protected members of the base class become protected members of the derived class.

- **Protected Inheritance**: In protected inheritance, the public members of the base class become protected members of the derived class, and the protected members of the base class become protected members of the derived class while the private members of the base class is not inherited.

- **Private Inheritance**: In private inheritance, the public members of the base class become private members of the derived class, and the protected members of the base class become private members of the derived class while the private members of the base class is not inherited.

Table of Inheritance in C++:
| Inheritance Type | Public Members | Protected Members | Private Members |
|------------------|----------------|-------------------|-----------------|
| Public Inheritance | Public          | Protected         | Not Inherited    |
| Protected Inheritance | Protected     | Protected         | Not Inherited    |
| Private Inheritance | Private        | Private          | Not Inherited    |

This comparison helps understand the differences in how various languages implement OOP concepts.

## Summary

In this tutorial, we've covered the fundamental concepts of Object-Oriented Programming in Python:

1. **Classes and Objects**: The blueprint and instances that form the foundation of OOP
2. **Methods**: Adding behavior to our classes
3. **Constructors**: Initializing objects with specific attributes
4. **Access Specifiers**: Controlling visibility of class members
5. **Inheritance**: Creating class hierarchies for code reuse
6. **Method Resolution Order (MRO)**: Understanding how Python resolves method calls in inheritance hierarchies
7. **Properties (Getters and Setters)**: Controlled access to attributes
8. **Special Methods**: Customizing object behavior
9. **Operator Overloading**: Defining operator behavior for custom objects
10. **Static and Class Methods**: Methods that operate at the class level
11. **Introspection**: Examining objects at runtime
12. **Nested Classes**: Classes within classes
13. **Comparison with Other Languages**: Understanding how Python's approach differs from other OOP languages

By understanding these concepts, you'll be able to design more efficient, maintainable, and powerful Python applications.


## Revision
You can read pdf version of kec publication oop book of BSC.CSIT second semester
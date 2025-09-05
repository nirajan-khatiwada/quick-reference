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
    def __init__(self):
        self.name="Nirajan"  # attribute
        self.age=20         # attribute
        self.classes="Bachelor" # attribute
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
    def __init__(self):
        self.name="Nirajan"
        self.age=20
        self.classes="Bachelor"

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
    def __init__(self):
        self.name="Nirajan"
        self.age=20
        self.classes="Bachelor"

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
    def __init__(self):
        self.name = "Alice"  # Public member
    def display(self):      #public method
        print(f"Name: {self.name}")

person1 = Person()
print(person1.name)  # Output: Alice
person1.display()    # Output: Name: Alice
```

### 4.2 Protected Members
Protected members are accessible within the class and its subclasses. They are denoted by a single underscore (`_`) before the member name.

Example:
```python
class Person:
    def __init__(self):
        self._name = "Alice"  # Protected member
    def _display(self):      # Protected method
        print(f"Name: {self._name}")

class Student(Person):
    def show(self):
        self._display()  # Accessing protected method from subclass
        print(f"Accessing protected member: {self._name}")

student1 = Student()
student1.show()
# Output:
# Name: Alice
# Accessing protected member: Alice


# Note: p1=Person() print(p1._name) #this is incorrect as name is protected and only be used inside class and subclass
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
    def __init__(self):
        self.__name = "Alice"  # Private member

    def __display(self):  # Private method
        print(f"Name: {self.__name}")
    
    def show(self):
        self.__display()  # Accessing private method within the class
        print(f"Accessing private member: {self.__name}") # Accessing private member within the class

person1 = Person()
print(person1.__name)  # Error: 'Person' object has no attribute '__name'
person1.__display()  # Error: 'Person' object has no attribute '__display'
person1.show()  # Correct way to access private members within the class as show() is public

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
```bash
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
```bash
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
```bash
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
```bash
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
```bash
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


For unary operators like negation (`-`), we can overload the `__neg__` method:
```python
class Point:
    def __init__(self, x, y):
        self.x = x
        self.y = y

    def __neg__(self):
        # Define what happens when - is used with Point objects
        return Point(-self.x, -self.y)

    def __str__(self):
        return f"({self.x}, {self.y})"
point1 = Point(1, 2)
point2 = -point1  # Uses the __neg__ method
print(point2)  # Output: (-1, -2)
```


> Note: We can only overload existing operators. We cannot create new operators.

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
Those attribute that is same for all instances of the class are known as class attribute or class variable. for example, if we have a class `Company` and all employees of the company share the same company name, then `company` can be defined as a class attribute.



```python
class ClassName:
    class_variable = value  # Class variable

    def __init__(self, instance_variable):
        self.instance_variable = instance_variable  # Instance variable
```

> Note: For all object the class class_variable will have the same value but instance_variable will have different value for different object.


for example:
```python
class Company:
    company_name = "TechCorp"  # Class variable

    def __init__(self, employee_name):
        self.employee_name = employee_name  # Instance variable

emp1 = Company("Alice")\
emp2 = Company("Bob")
print(emp1.company_name)  # Output: TechCorp
print(emp2.company_name)  # Output: TechCorp
print(emp1.employee_name)  # Output: Alice
print(emp2.employee_name)  # Output: Bob
```
Here `company_name` is a class variable because it is the same for all employees, while `employee_name` is an instance variable because it is unique to each employee.


Since the class variable should be same for all the instance of the class , if we directly change the value of class variable using object then all the instance of the class will not have the same value for the class variable so To change the value of class variable for all the instance of the class we use class method.


using class method:
Example:
```python
class Company:
    company_name = "TechCorp"  # Class variable
    def __init__(self, employee_name):
        self.employee_name = employee_name  # Instance variable
    @classmethod
    def change_company_name(cls, new_name):
        cls.company_name = new_name  # Change class variable for all instances
emp1 = Company("Alice")
emp2 = Company("Bob")
print(emp1.company_name)  # Output: TechCorp
print(emp2.company_name)  # Output: TechCorp
Company.change_company_name("InnoTech")  # Change company name for all instances or `emp1.change_company_name("InnoTech")`
print(emp1.company_name)  # Output: InnoTech
print(emp2.company_name)  # Output: InnoTech
```

without using class method:
```python
class Company:
    company_name = "TechCorp"  # Class variable
    def __init__(self, employee_name):
        self.employee_name = employee_name  # Instance variable
emp1 = Company("Alice")
emp2 = Company("Bob")
print(emp1.company_name)  # Output: TechCorp
print(emp2.company_name)  # Output: TechCorp
emp1.company_name = "InnoTech"  # Change company name using emp1 object
print(emp1.company_name)  # Output: InnoTech
print(emp2.company_name)  # Output: TechCorp (remains unchanged)


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
    def __init__(self):
        self.name = "Alice"
        self.age = 30

person1 = Person()
print(dir(person1))
# Output: ['__class__', '__delattr__', '__dict__', '__dir__', '__doc__', '__eq__', '__format__', '__ge__', '__getattribute__', '__getstate__', '__gt__', '__hash__', '__init__', '__init_subclass__', '__le__', '__lt__', '__module__', '__ne__', '__new__', '__reduce__', '__reduce_ex__', '__repr__', '__setattr__', '__sizeof__', '__str__', '__subclasshook__', '__weakref__', 'age', 'name']
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
    def __init__(self):
        self.name = "Alice"
        self.age = 30
person1 = Person()
print(person1.__dict__)  #{'name': 'Alice', 'age': 30}


person1.name = "Bob"  # Set an instance attribute
print(person1.__dict__)  # {'name': 'Bob', 'age': 30}
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



## 14. How python works internally
# Python Instance Variables and Method Resolution Guide

## Understanding Instance Variable Storage

### Key Concepts:
- **Single Object per Instance**: When you create a class instance, Python creates only ONE object
- **`__dict__` Storage**: All instance attributes are stored in the instance's `__dict__` dictionary
- **Dynamic Creation**: Attributes are created when first assigned, not when accessed
- **Direct Modification**: All attribute changes modify the same `__dict__`

### Basic Example:

```python
class Person:
    def __init__(self, name):
        self.name = name  # Creates "name" key in __dict__

p = Person("Alice")
print(p.__dict__)  # {'name': 'Alice'}

p.age = 25         # Creates "age" key in __dict__
print(p.__dict__)  # {'name': 'Alice', 'age': 25}

p.name = "Bob"     # Modifies existing "name" key
print(p.__dict__)  # {'name': 'Bob', 'age': 25}
```

## How Attribute Assignment and Access Works

### Core Rules:
- **Assignment (`self.attr = value`)**: Always creates/modifies key in instance's `__dict__`
- **Access (`self.attr`)**: Checks instance `__dict__` first, then class hierarchy
- **Missing Attribute**: Accessing non-existent attribute raises `AttributeError`
- **Creating Attribute**: Assigning to non-existent attribute creates new `__dict__` entry

### Example:

```python
class Demo:
    def __init__(self):
        self.x = 10

    def modify(self):
        self.x = self.x * 3    # Modifies existing key
        self.y = 100           # Creates new key

d = Demo()
print(d.__dict__)  # {'x': 10}

d.modify()
print(d.__dict__)  # {'x': 30, 'y': 100}

# This would raise AttributeError:
# print(d.z)  # AttributeError: 'Demo' object has no attribute 'z'

# This creates new attribute:
d.z = 50
print(d.__dict__)  # {'x': 30, 'y': 100, 'z': 50}
```

## Inheritance: One Instance, One `__dict__`

### Key Points:
- **Single `__dict__`**: Child class instance has only ONE `__dict__`
- **Shared Storage**: Parent and child methods modify the SAME `__dict__`
- **No Separate Variables**: Unlike C++, there's no separate storage for parent/child attributes

### Example:

```python
class Parent:
    def __init__(self):
        self.name = "parent"

    def set_parent_attr(self):
        self.parent_var = "from parent"

class Child(Parent):
    def __init__(self):
        super().__init__()
        self.name = "child"        # Overwrites parent's name

    def set_child_attr(self):
        self.child_var = "from child"

c = Child()
print(c.__dict__)  # {'name': 'child'}

c.set_parent_attr()  # Parent method modifies child's __dict__
print(c.__dict__)    # {'name': 'child', 'parent_var': 'from parent'}

c.set_child_attr()
print(c.__dict__)    # {'name': 'child', 'parent_var': 'from parent', 'child_var': 'from child'}
```

## Variable Access Levels: Public, Protected, Private

### Concepts:
- **Public (`self.var`)**: Accessible everywhere
- **Protected (`self._var`)**: Convention for internal use (still accessible)
- **Private (`self.__var`)**: Name mangling applied, creates `_ClassName__var`

### Public and Protected Variables
- **Public variables** (`name`) and **protected variables** (`_name`) are directly shareable between base and derived classes
- They are stored in the instance dictionary with their original names
- No name transformation occurs

### Private Variables - Name Mangling Behavior

#### Instance Variable Storage
- When creating **private instance variables** (`__name`) in base and derived classes, Python applies **name mangling**
- All variables are stored in the **same single `__dict__`** for the instance
- However, private variables get **different keys** due to name mangling

#### Name Mangling Process
- **Base class A**: `__name` becomes `_A__name` in the dictionary
- **Derived class B**: `__name` becomes `_B__name` in the dictionary
- This creates unique keys for each class's private variables

#### Access Mechanism
- When accessing `self.__name` in class A → Python searches for `_A__name` in `__dict__`
- When accessing `self.__name` in class B → Python searches for `_B__name` in `__dict__`
- Same attribute name, different mangled keys, but accessed through the same class functions

### Example:

```python
class AccessDemo:
    def __init__(self):
        self.public = "everyone can see"
        self._protected = "internal use"
        self.__private = "name mangled"

obj = AccessDemo()
print(obj.__dict__)
# {'public': 'everyone can see', '_protected': 'internal use', '_AccessDemo__private': 'name mangled'}

# Accessing:
print(obj.public)      # Works
print(obj._protected)  # Works (but shouldn't be used externally)
# print(obj.__private) # AttributeError
print(obj._AccessDemo__private)  # Works (name mangled form)
```

#### Dictionary Structure Example:
```
instance.__dict__ = {
    'public_var': 'shared',           # Public - same key
    '_protected_var': 'shared',       # Protected - same key  
    '_A__private_var': 'base_value',  # Private in base class
    '_B__private_var': 'derived_value' # Private in derived class
}
```

## Method Resolution Order (MRO) and Function Execution

### Core Concepts:
- **MRO**: Python uses C3 linearization to determine method lookup order
- **Method Lookup**: When calling `self.method()`, Python searches MRO until it finds the method. It first searches function in 1st class of MRO if not found then second and so on
- **Attribute Access in Methods**: Even when executing parent method, `self` refers to the instance
- **Single `__dict__` Rule**: All methods modify the same instance `__dict__`

### Single Inheritance Example:

```python
class A:
    def method(self):
        self.a_var = "from A"
        print(f"A.method, __dict__: {self.__dict__}")

class B(A):
    def method(self):
        self.b_var = "from B"
        print(f"B.method, __dict__: {self.__dict__}")
        super().method()  # Calls A.method

b = B()
print(f"MRO: {B.__mro__}")  # (<class 'B'>, <class 'A'>, <class 'object'>)

b.method()
# Output:
# B.method, __dict__: {'b_var': 'from B'}
# A.method, __dict__: {'b_var': 'from B', 'a_var': 'from A'}
```

### Multiple Inheritance Example:

```python
class Parent1:
    def shared_method(self):
        self.p1_var = "from Parent1"

class Parent2:
    def shared_method(self):
        self.p2_var = "from Parent2"

    def unique_method(self):
        self.unique_var = "from Parent2 unique"

class Child(Parent1, Parent2):
    pass

c = Child()
print(f"MRO: {Child.__mro__}")
# (<class 'Child'>, <class 'Parent1'>, <class 'Parent2'>, <class 'object'>)

c.shared_method()  # Parent1.shared_method wins (MRO order)
print(c.__dict__)  # {'p1_var': 'from Parent1'}

c.unique_method()  # Parent2.unique_method (only one available)
print(c.__dict__)  # {'p1_var': 'from Parent1', 'unique_var': 'from Parent2 unique'}
```

## Summary

### Key Takeaways:
1. **One Instance = One `__dict__`**: All attributes stored in single dictionary
2. **Method Execution**: MRO determines which method runs, but `self` always refers to the instance
3. **All Methods Use Same Storage**: Every method operates on the same instance `__dict__`
4. **Name Mangling**: Private variables (`__var`) become `_ClassName__var` in `__dict__`
5. **MRO Rules**: Left-to-right, depth-first search with C3 linearization for complex hierarchies
6. **Variable Sharing**:
   - **Public/Protected**: Same key names, directly shareable
   - **Private**: Different mangled key names (`_ClassName__varname`), accessed through same class methods but stored separately
7. **Name Mangling Ensures**: Private variable isolation while using unified storage

The fundamental difference from C++ is that Python maintains a single object with one `__dict__` throughout the inheritance hierarchy, while all methods operate on this shared storage space. Name mangling ensures private variable isolation while maintaining the single dictionary approach.

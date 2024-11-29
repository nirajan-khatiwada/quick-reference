---
title: "Python Fundamentals: Exploring OOP (Part 12)"
date: 2024-11-28
description: "This is the first part of series Object Oriented Programming in Python"
showToc: true
categories: ["OOP"]
tags: ["Python", "Programming", "OOP", "Tutorial"]
summary: "This is the first part of series of Object Oriented Programming in Python"
images: ["/images/python.png"]
---

# Object oriented programming in python

Object oriented programming is a programming paradigm that provides a means of structuring programs so that properties and behaviors are bundled into individual objects.

## 1. Class and Object

Class is a blueprint for creating objects (a particular data structure), providing initial values for state (member variables or attributes), and implementations of behavior (member functions or methods).

Object is an instance of a class. When class is defined, only the description for the object is defined. Therefore, no memory or storage is allocated.

### 1.1 Creating a class
We can create a class using the `class` keyword followed by the class name. The class definition can contain class variables, instance variables, methods, and constructors.

Syntax:
```python
class ClassName:
    #code block
```


Example:
```python
class Person:
    name="Nirajan"
    age=20
    classes="Bachelor"
```

### 1.2 Creating an object
To create an object of a class, we use the class name followed by parentheses. This calls the constructor method of the class and returns an object.

Syntax:
```python
object_name = ClassName()
```

Example:
```python
person1 = Person()
```

### 1.3 Accessing class attributes
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

### 1.4 Modifying class attributes
We can modify the attributes of a class using the dot operator (`.`) followed by the attribute name.

Syntax:
```python
object_name.attribute_name = new_value
```

Example:
```python
person1.age = 21
print(person1.age)  # Output: 21
```

### 1.5 Creating a member function
We can create a member function (method) inside a class using the `def` keyword followed by the function name. The first parameter of the method should be `self`, which refers to the current instance of the class.we will see about self in next part.

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

    def display(self):
        print(f"Name: {self.name}")
        print(f"Age: {self.age}")
        print(f"Class: {self.classes}")
```


### 1.6 Calling a member function
We can call a member function of a class using the dot operator (`.`) followed by the function name and parentheses.

Syntax:
```python
object_name.method_name(arguments)
```

Example:
```python
person1.display()
```

### 1.7 Nested member function
We can call a member function from another member function of the same class using the `self` keyword.

Syntax:
```python

class ClassName:
    def method1(self):
        #code block
        self.method2()

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
        self.greet()

    def greet(self):
        print("Hello, Welcome to the class")
```

### 1.8 self parameter
The `self` parameter is a reference to the current instance of the class, and is used to access variables and methods of the class. It is the first parameter of any method in a class.

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

    def display(self):
        print(f"Name: {self.name}")
        print(f"Age: {self.age}")
        print(f"Class: {self.classes}")
        self.greet()

    def greet(self):
        print("Hello, Welcome to the class")
```


## 2. Constructor in Python
A constructor is a special type of method (function) which is used to initialize the instance members of the class. It is called when an object of the class is created.

### 2.1 Creating a constructor
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
        self.name = name
        self.age = age
        self.classes = classes

    def display(self):
        print(f"Name: {self.name}")
        print(f"Age: {self.age}")
        print(f"Class: {self.classes}")
```

### 2.2 Creating an object with constructor
When an object is created, the constructor method is automatically called with the arguments passed to the class.

Syntax:
```python
object_name = ClassName(arguments)
```

Example:
```python
person1 = Person("Nirajan", 20, "Bachelor")
```


## 3. Getters and Setters in Python

### 3.1. Getters
Getters are methods is implementes by using the `@property` decorator. They are specially used 
- to act as an value ie data instead of a method.
- to access the value of a private attribute without directly accessing it.


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
        self._name = name
        self._age = age

    @property
    def display(self):
        return f"Name: {self._name}, Age: {self._age}"

person1 = Person("Nirajan", 20)
print(person1.display)  # Output: Name: Nirajan, Age: 20
```


### 3.2. Setters
Setters are methods is implementes by using the `@method_name.setter` decorator. They are specially used
- to set the value of a private attribute without directly setting it.
- to perform validation before setting the value of an attribute.

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
        self._name, self._age = value.split(",")
        self._age = int(self._age)

person1 = Person("Nirajan", 20)
print(person1.display)  # Output: Name: Nirajan, Age: 20

person1.display = "Alice, 30"
print(person1.display)  # Output: Name: Alice, Age: 30
```


## 4. Inheritance in Python
Inheritance is a mechanism in which one class acquires the properties and behavior of another class. The class which inherits the properties and behavior is known as the child class, and the class whose properties and behavior are inherited is known as the parent class.

### 4.1. Creating a child class
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

class Manager(Employee):# it has all the properties of Employee class so we can access the
# properties of Employee class also its method using object of Manager class
    def task(self):
        self.display()
        print("Assigning tasks to employees")

class Developer(Employee): # it has all the properties of Employee class so we can access
# the properties of Employee class also its method using object of Developer class
    def task(self):
        self.display()
        print("Developing software applications")


manager1 = Manager("Alice", 30, 101)
manager1.task()
developer1 = Developer("Bob", 25, 102)
developer1.task()
```



> Note : Only public and protected members are inherited by the child class. Private members are not inherited by the child class.


## 5.Ascess Specifiers in Python

### 5.1. Public members
Public members are accessible from outside the class. They can be accessed using the dot operator (`.`) from outside the class.

Example:
```python
class Person:
    name = "Alice"  # Public member

person1 = Person()
print(person1.name)  # Output: Alice
```

### 5.2. Protected members
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

Example of protected variable and method
```python
class Person:
    _name = "Alice"  # Protected variable

    def _display(self):  # Protected method
        print(f"Name: {self._name}")

class Student(Person):
    def display(self):
        self._display()  # Accessing protected metho

student1 = Student()
student1.display()  # Output: Name: Alice
```

### 5.3. Private members
Private members are accessible only within the class. They are denoted by a double underscore (`__`) before the member name.

Example:
```python
class Person:
    __city = "New York"  # Private member

person1 = Person()
print(person1.__city)  # Error: 'Person' object has no attribute '__city'
```

Example of private variable and method
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


6. Static Method in Python
Static Method is those method that can be called without creating an object of the class. They are defined using the `@staticmethod` decorator.
They can be called using the class name .
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

result = Calculator.add(5, 3)
print(result)  # Output: 8

#Can call using object also

calculator = Calculator()
result = calculator.add(5, 3)
print(result)  # Output: 8
#this is also valid but it is not recommended
```


7. Class Method in Python
They are defined using the `@classmethod` decorator.The useage of class method is to access the class variable and change class variable.
ie when we change variable using class method it will change for all the object of the class.THey can be called using the class name.

Syntax:
```python
class ClassName:
    @classmethod
    def method_name(cls, parameters):
        #code block
```

Example:
```python
class copany :
    copany="Google"
    @classmethod
    def change_company(cls,new_company):
        cls.copany=new_company

print(copany.copany) #Output: Google
copany.change_company("Microsoft")
print(copany.copany) #Output: Microsoft

c1=copany()
print(c1.copany) #Output: Microsoft
c1.change_company("Apple")
c2=copany()
print(c2.copany) #Output: Applex    
```

8. Dir and __dict__ method in Python
`dir()` method is used to return a list of attributes and methods of any object. It returns a list of valid attributes and methods of the object.

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

Example:
```python
l=[1,2,3]
print(dir(l))
# Output: ['__add__', '__class__', '__class_getitem__', '__contains__', '__delattr__', '__delitem__', '__dir__', '__doc__', '__eq__', '__format__', '__ge__', '__getattribute__', '__getitem__', '__getstate__', '__gt__', '__hash__', '__iadd__', '__imul__', '__init__', '__init_subclass__', '__iter__', '__le__', '__len__', '__lt__', '__mul__', '__ne__', '__new__', '__reduce__', '__reduce_ex__', '__repr__', '__reversed__', '__rmul__', '__setattr__', '__setitem__', '__sizeof__', '__str__', '__subclasshook__', 'append', 'clear', 'copy', 'count', 'extend', 'index', 'insert', 'pop', 'remove', 'reverse', 'sort']
```

`__dict__` method is used to return a dictionary containing the attributes of an object. It returns a dictionary containing the attributes of the object.

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
print(person1.__dict__)

# Output: {'name': 'Alice', 'age': 30}
```


9.`super()` method in Python
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
        super().display()
        print("Student class")

student1 = Student()
student1.display()

# Output:
# Person class
# Student class
``` 

Example:
```python
class Person:
    def __init__(self,name,age):
        self.name=name
        self.age=age
    
class Student(Person):
    def __init__(self,name,age,roll):
        super().__init__(name,age)
        self.roll=roll
    
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

> Note: Use super for single inheritance only. For multiple inheritance, use the class name directly.

10. Magic/dunder methods in Python
Magic methods are special methods that have double underscores at the beginning and end of their names. They are also known as dunder methods (short for "double underscore").
Magic methods are used to define the behavior of objects. They are automatically called when certain operations are performed on objects.

Some of the commonly used magic methods are:

- `__init__`: Constructor method, called when an object is created.
- `__str__`: Called by the `str()` built-in function to return a string representation of an object.
- `__repr__`: Called by the `repr()` built-in function to return an unambiguous string representation of an object.
- `__add__`: Called by the `+` operator to perform addition.
- `__len__`: Called by the `len()` built-in function to return the length of an object.
- `__call__`: Called when an object is called as a function.
> Note : All magic method can be seen using `dir(objectname)` method and we can override the magic method in our class.


example of all method:
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

print(person1)  # Output: Name: Alice, Age: 30

print(repr(person1))  # Output: Person('Alice', 30)


print(person1 + person2)  # Output: 55

print(len(person1))  # Output: 5

print(person1())  # Output: Name: Alice, Age: 30
```


11. Method Overriding 
Method overriding is a feature of object-oriented programming that allows a subclass to provide a specific implementation of a method that is already provided by its parent class. When a method in a subclass has the same name, same parameters or signature, and same return type as a method in its parent class, then the method in the subclass is said to override the method in the parent class.

Example:
```python
class Person:
    def display(self):
        print("Person class")

class Student(Person):
    def display(self):
        print("Student class")

student1 = Student()
student1.display()

# Output: Student class
```
We can also call the parent class's method from the overridden method using the `super()` function.

Example:
```python

class Person:
    def display(self):
        print("Person class")

class Student(Person):
    def display(self):
        super().display() #Or Person.display(self)
        print("Student class")

student1 = Student()
student1.display()

# Output:
# Person class
# Student class
```



12. Operator overloading in Python
Operator overloading is a feature of object-oriented programming that allows us to define the behavior of operators for user-defined objects. It allows us to define the behavior of operators such as `+`, `-`, `*`, `/`, `==`, `!=`, etc., for objects of a class.

To overload an operator, we need to define a special method in the class that corresponds to the operator. These special methods are called magic methods or dunder methods.

Example:
```python
class Point:
    def __init__(self, x, y):
        self.x = x
        self.y = y

    def __add__(self, other):
        x = self.x + other.x
        y = self.y + other.y
        return Point(x, y)

    def __str__(self):
        return f"({self.x}, {self.y})"


point1 = Point(1, 2)
point2 = Point(3, 4)
point3 = point1 + point2
print(point3)  # Output: (4, 6)
```


13. Types of Inheritance in Python
Inheritance is a mechanism in which one class acquires the properties and behavior of another class. There are different types of inheritance in Python:

- Single Inheritance: In single inheritance, a class inherits from only one parent class.

The pictorial representation of single inheritance is:

```
    A
    |
    B
````

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
    def __init__(self,naem,age,id):
        super().__init__(name,age) #or Person.__init__(self,name,age)
        self.id=id
    
    def display(self):
        print(f"ID: {self.id}",super().display()) #or Person.display(self)

student1 = Student("Alice", 30, 101)
student1.display()

# Output:
# ID: 101
# Name: Alice, Age: 30
```

- Multiple Inheritance: In multiple inheritance, a class inherits from more than one parent class.

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
    def __init__(self,city,state):
        self.city=city
        self.state=state
    def display(self):
        return f"City: {self.city}, State: {self.state}"

class Student(Person,Address):
    def __init__(self,name,age,id,city,state):
        Person.__init__(self,name,age)
        Address.__init__(self,city,state)
        self.id=id
    
    def display(self):
        print(f"ID: {self.id}",Person.display(self),Address.display(self))

student1 = Student("Alice", 30, 101,"New York","New York")
student1.display()

# Output:
# ID: 101
# Name: Alice, Age: 30
# City: New York, State: New York
```



- Multilevel Inheritance: In multilevel inheritance, a class inherits from a parent class, and another class inherits from the child class.

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
    def __init__(self,name,age,id):
        super().__init__(name,age) # or Person.__init__(self,name,age)
        self.id=id
    
    def display(self):
        print(f"ID: {self.id}",super().display()) # print(f"ID: {self.id}",Person.display(self))

class CollegeStudent(Student):
    def __init__(self,name,age,id,classes):
        super().__init__(name,age,id) #or Student.__init__(self,name,age,id)
        self.classes=classes
    
    def display(self):
        print(f"Class: {self.classes}",super().display()) #or print(f"Class: {self.classes}",Student.display(self))


student1 = CollegeStudent("Alice", 30, 101,"Bachelor")
student1.display()

# Output:
# Class: Bachelor
# ID: 101
# Name: Alice, Age: 30
```


- Hierarchical Inheritance: In hierarchical inheritance, more than one class inherits from a single parent class.

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
    def __init__(self,name,age,id):
        super().__init__(name,age) #or Person.__init__(self,name,age)
        self.id=id
    
    def display(self):
        print(f"ID: {self.id}",super().display()) #or print(f"ID: {self.id}",Person.display(self))

class Employee(Person):
    def __init__(self,name,age,emp_id):
        super().__init__(name,age) #or Person.__init__(self,name,age)
        self.emp_id=emp_id
    
    def display(self):
        print(f"Emp ID: {self.emp_id}",super().display()) #or print(f"Emp ID: {self.emp_id}",Person.display(self))

student1 = Student("Alice", 30, 101)
student1.display()

employee1 = Employee("Bob", 25, 201)
employee1.display()

# Output:
# ID: 101
# Name: Alice, Age: 30

# Emp ID: 201
# Name: Bob, Age: 25
```

> Note: Hybrid inheritance is a combination of two or more types of inheritance.



# 14. MRO (Method Resolution Order) in Python
Method Resolution Order (MRO) is the order in which methods are resolved in the inheritance hierarchy. It defines the order in which the base classes are searched when executing a method.

for example:
```python
class C:
    f="dirajan"
class A(C):
    f="nirajan"
class B(C):
    f="kirajan"
class D(A,B):
    pass
    def display(self):
        print(self.f)

d=D()
print(D.__mro__)
d.display()
```

Output:
```
(<class '__main__.D'>, <class '__main__.A'>, <class '__main__.B'>, <class '__main__.C'>, <class 'object'>)
nirajan
```

It means it will search for the method in the order of D->A->B->C->object
if the method is not found in the D it will search in A and so on.
but if the method is found in the D it will not search in the A,B,C and object.





# 15.Class Inside a Class in Python

A class can be defined inside another class. The class inside the class is known as
nested class. The nested class can access the attributes and methods of the outer class.

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


# 16. Nested class in Python
A class can be defined inside another class. The class inside the class is known as nested class. The nested class can access the attributes and methods of the outer class.

Syntax:
```python
class OuterClass:
    class InnerClass:
        #code block
```

Creating an object of the nested class:
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

creating an object of the nested class inside the outer class:
```python
class OuterClass:
    def __init__(self):
        self.name = "Alice"
        self.age = 30
        self.inner = self.InnerClass()

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


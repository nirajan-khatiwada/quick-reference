---
title: "Django: Day 5"
date: 2025-01-06
description: "Understand Django model relationships including OneToOne, OneToMany, and ManyToMany. Learn how to define, create, update, and query these relationships."
showToc: true
categories: ["Django"]
tags: ["Django", "Python", "Relationships", "Models", "Backend"]
summary: "Detailed guide on Django model relationships, covering OneToOne, OneToMany, and ManyToMany relations. Essential for managing complex data relationships in Django."
images: ["/images/django-relations.jpg"]
---
# Django Relations

In Django, there are three main types of relationships between models: OneToOne, OneToMany, and ManyToMany.

## Some Important Terms

- **`related_name`**: This attribute is used to define the reverse relation from the related model back to the model that defines the relationship.
- **`on_delete`**: It specifies the behavior to adopt when the object referenced by a foreign key is deleted.

### `on_delete` Options

- **`models.CASCADE`**: When the referenced object is deleted, also delete the objects that have a foreign key to it.
- **`models.PROTECT`**: Prevent deletion of the referenced object by raising a `ProtectedError` exception.
- **`models.SET_NULL`**: Set the foreign key to `NULL` when the referenced object is deleted.
- **`models.SET_DEFAULT`**: Set the foreign key to its default value when the referenced object is deleted.
- **`models.SET()`**: Set the foreign key to the value passed to `SET()` when the referenced object is deleted.
- **`models.DO_NOTHING`**: Do nothing when the referenced object is deleted.

> Note: In most cases, `models.CASCADE` is used.

---

## OneToOne Relation

In a OneToOne relationship, each record of one model is related to exactly one record of another model. For example, a student can have only one student profile, meaning one object cannot be related to multiple objects. If this is attempted, an error will occur.

### Defining OneToOne Relation

You can define a OneToOne relation using `OneToOneField`.

```python
from django.db import models

class Student(models.Model):
    name = models.CharField(max_length=100)
    age = models.IntegerField()

class StudentProfile(models.Model):
    student = models.OneToOneField(Student, on_delete=models.CASCADE, related_name='profile')
    address = models.TextField()
    phone = models.CharField(max_length=15)
```

> **Note**: The `related_name` should be unique in the model. It is used to access the `StudentProfile` object from the `Student` object.

### Creating OneToOne Relation

```python
student = Student.objects.create(name='John', age=20)
profile = StudentProfile.objects.create(student=student, address='New York', phone='1234567890')
```

> You can assign an existing student object to the profile object like this:

```python
student = Student.objects.get(name='John')
profile = StudentProfile.objects.create(student=student, address='New York', phone='1234567890')
```

### Updating OneToOne Relation

```python
student = Student.objects.get(name='John')
profile = student.profile
profile.address = 'California'
profile.save()
```

### Finding the Student Profile by Student Name

- **Way 1** (using the `__` double underscore):

```python
studentprofile = StudentProfile.objects.get(student__name='John')
```

- **Way 2** 

```python
student = Student.objects.get(name='John')
studentprofile = StudentProfile.objects.get(student=student)
```

- **Way 3** (using `related_name`):

```python
student = Student.objects.get(name='John')
studentprofile = student.profile
```

### Accessing the Student Object from the Profile

```python
studentprofile = StudentProfile.objects.get(address='California')
student = studentprofile.student
```

### Related Name in Action

You can use `related_name` to access the related object from the parent object.

```python
class Author(models.Model):
    name = models.CharField(max_length=100)
    age = models.IntegerField()

class Book(models.Model):
    author = models.OneToOneField(Author, on_delete=models.CASCADE, related_name='book')
    title = models.CharField(max_length=100)
```

To access the `Book` object from the `Author` object:

```python
author = Author.objects.get(name='John')
book = author.book
```

---

## OneToMany Relation

In a OneToMany relationship, each record of one model is related to multiple records of another model. For example, a student can have multiple subjects.

### Defining OneToMany Relation

You can define a OneToMany relation using the `ForeignKey` field.

```python
from django.db import models

class Subject(models.Model):
    name = models.CharField(max_length=100)

class Student(models.Model):
    name = models.CharField(max_length=100)
    age = models.IntegerField()
    subjects = models.ForeignKey(Subject, on_delete=models.CASCADE, related_name='students')
```

### Creating OneToMany Relation

```python
subject1 = Subject.objects.create(name='Maths')
student1 = Student.objects.create(name='John', age=20)
student2 = Student.objects.create(name='Doe', age=22)

student1.subjects=subject1
student2.subject=subject1
```

### Updating OneToMany Relation

```python
student = Student.objects.get(name='John')
subject = student.subjects
subject.name = 'Science'
subject.save()
```

### Finding the Student by Subject Name

- **Way 1**:

```python
student = Student.objects.filter(subjects__name='Maths')
```

- **Way 2**:

```python
subject = Subject.objects.get(name='Maths')
students = Student.objects.filter(subjects=subject)
```

- **Way 3** (using `related_name`):

```python
subject = Subject.objects.get(name='Maths')
students = subject.students.all()  # You can use filter() instead of all()
```

### Accessing the Subject Object from the Student Object

```python
student = Student.objects.get(name='John')
subject = student.subjects
```

### Related Name in Action

```python
class Author(models.Model):
    name = models.CharField(max_length=100)
    age = models.IntegerField()

class Book(models.Model):
    author = models.ForeignKey(Author, on_delete=models.CASCADE, related_name='books')
    title = models.CharField(max_length=100)
```

You can access the books associated with an author:

```python
author = Author.objects.get(name='John')
books = author.books.all()
```

---

## ManyToMany Relation

In a ManyToMany relationship, each record of one model is related to multiple records of another model and vice versa. For example, a student can have multiple subjects, and a subject can have multiple students.

> **Note**: The ManyToMany relation does not have an `on_delete` option.

### Defining ManyToMany Relation

You can define a ManyToMany relation using the `ManyToManyField` field.

```python
from django.db import models

class Subject(models.Model):
    name = models.CharField(max_length=100)

class Student(models.Model):
    name = models.CharField(max_length=100)
    age = models.IntegerField()
    subjects = models.ManyToManyField(Subject, related_name='students')
```

### `add()` and `remove()` Methods

- **`add()`**: Adds related objects to the parent object.
- **`remove()`**: Removes related objects from the parent object.

### Creating ManyToMany Relation

```python
subject1 = Subject.objects.create(name='Maths')
subject2 = Subject.objects.create(name='Science')
student1 = Student.objects.create(name='John', age=20)
student1.subjects.add(subject1, subject2)
student2 = Student.objects.create(name='Doe', age=22)
student2.subjects.add(subject1)
```

> Structure:

```bash
John -> Maths, Science
Doe -> Maths
Maths -> John, Doe
Science -> John
```

### Updating ManyToMany Relation

```python
student = Student.objects.get(name='John')
subjects = student.subjects.all()  # Get all subjects of John. You can use filter() instead of all().
subject = subjects[0]
subject.name = 'History'
subject.save()
```

### Finding All Students Corresponding to a Subject

```python
subject = Subject.objects.get(name='Maths')
students = subject.students.all() # You can use filter() instead of all().
```

### Accessing the Subjects from a Student Object

```python
student = Student.objects.get(name='John')
subjects = student.subjects.all() # You can use filter() instead of all().
```
### remove() ManyToMany Relation

```python
student = Student.objects.get(name='John')
subject = Subject.objects.get(name='Maths')
student.subjects.remove(subject)
```
> **Note**: The `remove()` method removes the relation between the student and the subject but does not delete the subject object.

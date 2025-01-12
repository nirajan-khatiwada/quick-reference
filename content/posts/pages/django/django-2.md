---
title: "Django: Day 2"
date: 2025-01-02
description: "Learn Django Models and database concepts including model creation, fields, migrations, and database configuration. Essential guide for working with Django's ORM system."
showToc: true
categories: ["Django"]
tags: ["Django", "Python", "Database", "ORM", "Models", "Backend"]
summary: "Deep dive into Django Models covering field types, model options, database configuration, migrations, and model methods. Essential knowledge for database operations in Django."
images: ["/images/django.jpg"]
---

# 19.Introduction to Django Models
A model is a class that represents a table in our database. Each model is a Python class that subclasses `django.db.models.Model`. Each attribute of the model represents a database field. With all of this, Django gives you an automatically-generated database-access API; see Making queries.

## 19.1 setting up a database
By default, Django uses SQLite as its database. SQLite is included in Python, so you won’t need to install anything else to support your database. When starting a new project, you can specify the database to use by setting the `ENGINE` setting to the appropriate database backend. Here’s the full list of built-in database backends that Django supports:
- `django.db.backends.sqlite3`
- `django.db.backends.postgresql`
- `django.db.backends.mysql`
- `django.db.backends.oracle`

for example, if you want to use mysql as your database you can set the `ENGINE` setting to `django.db.backends.mysql` in the `settings.py` file.

```python
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': 'mydatabase',
        'USER': 'mydatabase',
        'PASSWORD': 'mypassword',
        'HOST': '',
        'PORT': '3306',
    }
}
```
## 19.2 Fields
The most important part of a model – and the only required part of a model – is the list of database fields it defines. Fields are specified by class attributes. Be careful not to choose field names that conflict with the models API like clean, save, or delete.

Filed Types:
Please go to [Django Documentation](https://docs.djangoproject.com/en/5.1/ref/models/fields/#field-types) to see the list of all field types.


## 19.3 Field options
- `null`:If null is set to True, the field will accept empty values. i.e Databse will store NULL values for this field if null=True is set and no value is provided.
```python
name = models.CharField(max_length=100, null=True)
```

- `blank`:If blank is set to True, the field will be allowed to be blank. i.e form validation will allow entry of an empty value if blank=True is set and no value is provided
```python
name = models.CharField(max_length=100, blank=True)
```

> Note that this is different than null. null is purely database-related, whereas blank is validation-related. If a field has blank=True, form validation will allow entry of an empty value.

- `choices`:Used to set the choices for the field.
```python
CHOICES=(('M','MALE'),('F','FEMALE'),('O','OTHER'),)
class Person(models.Model):
    gender=models.CharField(max_length=1,choices=CHOICES)
```

- `default`:The default value for the field .When the model is saved and no value is provided for the field, the default value will be used.
```python
name = models.CharField(max_length=100, default='SOME STRING')
```

- `primary_key`:If True, this field is the primary key for the model.
```python
name = models.CharField(max_length=100, primary_key=True)
```

- `unique`:If True, this field must be unique throughout the table.
```python
name = models.CharField(max_length=100, unique=True)
```

-`db_index`:If True, an index will be created for this field.due to which the query operation like filter,order_by will be faster.
```python
name = models.CharField(max_length=100, db_index=True)
```

-`editable`:If False, the field will not be displayed in the admin or any other forms.
```python
name = models.CharField(max_length=100, editable=False)
```

- `validators`:List of validators to run for this field.We can create custom validators for the field.
```python
from django.core.exceptions import ValidationError
def validate_even(value):
    if value % 2 != 0:
        raise ValidationError(
            ('%(value)s is not an even number'),
            params={'value': value},
        )
class MyModel(models.Model):
    even_field = models.IntegerField(validators=[validate_even])
```

- `verbose_name`:A human-readable name for the field.
```python
name = models.CharField(max_length=100, verbose_name='Full Name')
```


## 19.4 meta class
The `Meta` class inside the model contains metadata. It is used to define metadata for the model class. Some of the metadata options are:
- `abstract`:If True, this model will not be used to create any database table instead it will be used as a base class for other models.for exampple:
```python
class Animal(models.Model):
    breed=models.CharField(max_length=100)
    class Meta:
        abstract=True
class Dog(Animal):
    name=models.CharField(max_length=100)
```
Here `Animal` model will not create any table in the database but `Dog` model will create a table with fields `breed` and `name`.



- `verbose_name`:A human-readable name for the model.
```python
class MyModel(models.Model):
    class Meta:
        verbose_name='My Model'
```

- `verbose_name_plural`:A human-readable plural name for the model.
```python
class MyModel(models.Model):
    class Meta:
        verbose_name_plural='My Models'
```


## 19.5 Simple Model Example
```python
from django.db import models
class Person(models.Model):
    name = models.CharField(max_length=100)
    age = models.IntegerField(default=0)
    class Meta:
        verbose_name='Person'
        verbose_name_plural='Persons'
    class __str__(self):
        return self.name
```

## 19.6 MakeMigration and Migrate
After creating the model we run
- `python manage.py makemigrations` :his command is used to create migrations for changes made to models. It generates a migration file in the migrations folder, which contains the necessary schema changes (e.g., creating or modifying tables) for the model.
- `python manage.py migrate` :This command is used to apply the migrations to the database. It reads the migration files in the migrations folder and updates the database schema by creating or altering the database tables accordingly.
- Use `python manage.py flush` to delete all the data in the database.
- Use `python manage.py shell` to open the python shell with the Django environment.
- Use `python manage.py createsuperuser` to create a superuser for the admin panel.


## 19.7 Using methods in models
To do operation related to the model we can define methods in the model class itself.
```python
from django.db import models
class Person(models.Model):
    name = models.CharField(max_length=100)
    age = models.IntegerField(default=0)
    grade = models.IntegerField(default=0)

    def is_adult(self):
        return self.age>=18
    def is_pass(self):
        return self.grade>=40
    def __str__(self):
        return self.name

```
Now we can use this method in the views or templates.
```python
person=Person.objects.get(id=1)
print(person.is_adult())
print(person.is_pass())
```

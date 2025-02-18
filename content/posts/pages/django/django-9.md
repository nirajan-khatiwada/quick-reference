---
title: "Django : Day 9"
date: 2025-01-10
description: "Learn how to send emails, use middleware, generate tokens, and manage users in Django."
showToc: true
categories: ["Django"]
tags: ["Django", "Python", "Email", "Middleware", "Token", "User Management", "Backend", "Web Development"]
summary: "A comprehensive guide on sending emails, using middleware, generating tokens, and managing users in Django."
images: ["/images/django/django.jpg"]
---

# Sending Email Using Django
Django provide an inbuild support to send email. To send email using DJango you need to configure the email settings in the `settings.py` file.
- `EMAIL_HOST`: The host to use for sending email.
- `EMAIL_PORT`: The port to use for the SMTP server.
- `EMAIL_HOST_USER`: The username to use for the SMTP server.
- `EMAIL_HOST_PASSWORD`: The password to use for the SMTP server.
- `EMAIL_USE_SSL`: Whether to use an SSL (secure) connection.
- `EMAIL_USE_TLS`: Whether to use a TLS (secure) connection


Then we can send email using EmailMultiAlternatives class. This class is used to send email with both HTML and text content. Below is the example to send email using Django.
```python
from django.core.mail import EmailMultiAlternatives
function send_email(request):
    email = EmailMultiAlternatives(
        'Subject here',
        'Here is the message.',
        'ID NAME <sender email>',
        [receiver email]
    )
    email.attach_alternative('<h1>Here is the message.</h1>', "text/html")
    email.send()
    return HttpResponse('Email sent')
```
> Note: Message will be send if the html content is not supported by the email client.

## rendertostring() method
`rendertostring()` method is used to render a template to a string. This method is used to render a template to a string instead of rendering it to an HttpResponse object. Below is the example to render a template to a string.They are specially useful when you want to send the rendered template as an email.
```python
from django.template.loader import rendertostring
def my_view(request):
    context = {'name': 'Alice'}
    output = rendertostring('index.html', context)
    return HttpResponse(output)
```

# Django Middleware
Between each request and response in Django, there is a middleware layer. Middleware is a framework of hooks into Django's request/response processing. It's a light, low-level plugin system for globally altering Django's input or output.There are two level of middleware in django
- **Global Middleware**: Global middleware is applied to all the views in the Django application.
- **Local Middleware**: Local middleware is applied to a specific view in the Django application.

## Defining Middleware
To define a middleware in Django, you need to create a class with the following methods:
- `__init__(self, get_response)`: This method is called when the middleware is initialized. It takes a `get_response` parameter, which is a callable that can be used to get the response from the next middleware in the chain.
- `__call__(self, request)`: This method is called for each request. It takes a `request` parameter, which is the request object. It should return a response object or call the `get_response` callable to get the response from the next middleware in the chain.

```python
class MyMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        # Code to be executed for each request before
        # the view (and later middleware) are called.
        response = self.get_response(request)
        # Code to be executed for each request/response after
        # the view is called.
        return response
```

## Global Middleware
To add this middleware to each request, you need to add the middleware class to the `MIDDLEWARE` setting in the `settings.py` file.
```python
MIDDLEWARE = [
    ...
    'myapp.middleware.MyMiddleware',
    ...
]
```

## Local Middleware
To add this middleware to a specific view, you need to use the `@middleware_classes` decorator on the view function.
```python
from middleware import MyMiddleware

@MyMiddleware
def my_view(request):
    ...
```

In class based view you can use the `middleware_classes` attribute to add the middleware to the view.
```python
from middleware import MyMiddleware
from django.utils.decorators import method_decorator

class MyView(View):
   @method_decorator(MyMiddleware)
    def get(self, request):
        ...
```



# Generating Tokens
There are two types of tokens generator in Django
- **Password Reset Token**: Django provides a built-in password reset token generator that can be used to generate tokens for resetting passwords.
- **Default Token Generator**: Django provides a default token generator that can be used to generate tokens for various purposes.

## Password Reset Token
To generate a password reset token, you can use the `PasswordResetTokenGenerator` class from the `django.contrib.auth.tokens` module. You can create an instance of this class and call the `make_token()` method to generate a token for a user.
```python
from django.contrib.auth.tokens import PasswordResetTokenGenerator

def generate_reset_token(request):
    user = request.user
    token_generator = PasswordResetTokenGenerator().make_token(user)
    return HttpResponse(token)
```

```python
from django.contrib.auth.tokens import PasswordResetTokenGenerator
def check_reset_token(request, token):
    user = request.user
    token_generator = PasswordResetTokenGenerator().check_token(user, token)
    if token_generator:
        return HttpResponse('Token is valid')
    else:
        return HttpResponse('Token is invalid')
```


## Default Token Generator
To generate a default token, you can use the `default_token_generator` from the `django.utils.token` module. You can call the `make_token()` method to generate a token for a user.
```python

from django.contrib.auth.tokens import default_token_generator

def generate_token(request):
    user = request.user
    token = default_token_generator.make_token(user)
    return HttpResponse(token)
```

```python
from django.contrib.auth.tokens import default_token_generator
def check_token(request, token):
    user = request.user
    token_generator = default_token_generator.check_token(user, token)
    if token_generator:
        return HttpResponse('Token is valid')
    else:
        return HttpResponse('Token is invalid')
```


## User object in django
The `User` object in Django is a built-in model that represents a user account.The inbuilt `User` model in Django provides the following fields:
- username
- password
- email
- first_name
- last_name
- is_active
- is_staff
- is_superuser
- date_joined

> `staff` Are the user who can access the admin interface.
>> `superuser` Are the user who have all the permissions in the Django application.
>>> `is_active` Are the user who are active in the Django application.Only active user can login to the Django application.This three fields are boolean fields and have default value `False`.


## Creating a User
TO create a user you can use `create()` method of the `User` model.
```python
from django.contrib.auth.models import User
user = User.objects.create(username='alice',email='alice@gmail.com')
user.set_password('password')
user.save()
```
> Note: `set_password()` method is used to set the password of the user in the hashed format.

> Note: you can use get_user_model() method to get the user model in Django.
```python
from django.contrib.auth import get_user_model
User = get_user_model()
user = User.objects.create(username='alice',username='alice',email='alice@gmail.com')
user.set_password('password')
user.save()
```
## Authenticating a User
TO learn authentication in django be familiar with the following methods
- request.user : The user object of the currently logged in user.
- request.user.is_authenticated : A boolean value that indicates whether the user is authenticated or not.
- request.user.is_staff : A boolean value that indicates whether the user is a staff member or not.
- request.user.is_superuser : A boolean value that indicates whether the user is a superuser or not.

### Authenticate
To authenticate a user, you can use the `authenticate()` method from the `django.contrib.auth` module. This method takes the `request`, `username` and `password` as arguments and returns the user object if the credentials are valid.
```python
from django.contrib.auth import authenticate
user = authenticate(request, username='alice', password='password')
```

### Login
To login a user, you can use the `login()` method from the `django.contrib.auth` module. This method takes the `request` and the user object as arguments and logs in the user.
```python
from django.contrib.auth import login
login(request, user)
```


### Logout
To logout a user, you can use the `logout()` method from the `django.contrib.auth` module. This method takes the `request` as an argument and logs out the user.
```python
from django.contrib.auth import logout
logout(request)
```

## Combination of authenticate(),login() and logout()
```python
from django.contrib.auth import authenticate, login, logout
def login_view(request):
    if request.method == 'POST':
        username = request.POST['username']
        password = request.POST['password']
        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)
            return HttpResponse('User logged in successfully')
        else:
            return HttpResponse('Invalid username or password')
    return render(request, 'login.html')
```

## Protected Views
To protect a view so that only authenticated users can access it, you can use the `login_required` decorator from the `django.contrib.auth.decorators` module.
```python
from django.contrib.auth.decorators import login_required

@login_required(login_url='login')
def protected_view(request):
    return HttpResponse('This is a protected view')
```
> Note: The `login_url` argument is used to redirect the user to the login page if they are not authenticated and `login` is name of the login url.

## Custom User Model
Everytime you create a new Django project, Django creates a default User model for you. But sometimes you may want to customize the User model to add additional fields or change the existing fields.So there are two ways to create a custom user model in Django.
- Using Abstract User(Contains all the fields of the default User model and you can add additional fields to it)
- Using Abstract Base User( Contain the authentication fields only and you can add additional fields to it)


### Using Abstract User
You choose this option if you want to add additional fields to the default .You choose this if you want a small change in the default User model.

## Process to create a custom user model using Abstract User
### Step 1: Create a new model that inherits from AbstractUser
models.py
```python
from django.contrib.auth.models import AbstractUser

class CustomUser(AbstractUser):
    age = models.PositiveIntegerField(null=True, blank=True)
    address = models.CharField(max_length=100, null=True, blank=True)
    phone = models.CharField(max_length=15, null=True, blank=True)
```
> Note : There is existing field and age,address,phone are the additional fields that we have added to the User model.

### Step 2: Update the AUTH_USER_MODEL setting in settings.py
settings.py
```python
AUTH_USER_MODEL = 'myapp.CustomUser'
```
> Note: AUTH_USER_MODEL is used to specify which model to use for the user authentication.`get_user_model()` method is used to get the user model in Django which is specified in the AUTH_USER_MODEL setting.

### Step 3: Create a new migration and apply it
```bash
python manage.py makemigrations
python manage.py migrate
```
### Step 4: Create a new user
```python
from myapp.models import CustomUser
user = CustomUser.objects.create(username='alice',email='alice@gmail.com',age=20,address='New York',phone='1234567890')
user.set_password('password')
user.save()
```

or,

```python
from django.contrib.auth import get_user_model
CustomUser = get_user_model()
user = CustomUser.objects.create(username='alice',email='alice@gmail.com',age=20,address='New York',phone='1234567890')
user.set_password('password')
user.save()
```

### Registering with admin interface
To make the custom user model available in the admin interface, you need to register it with the admin interface.
```python
from django.contrib import admin
from myapp.models import CustomUser
admin.site.register(CustomUser)
```




### Using Abstract Base User
 In Abstract Base user it  contains only the authentication functionality  but no actual fields except`password` and `lastlogin`.

## Process to create a custom user model using Abstract Base User

### Step 1: Create a new model that inherits from AbstractBaseUser

models.py
```python
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager,PermissionsMixin

class CustomUser(AbstractBaseUser,PermissionsMixin):
    email = models.EmailField(unique=True)
    age = models.PositiveIntegerField(null=True, blank=True)
    address = models.CharField(max_length=100, null=True, blank=True)
    phone = models.CharField(max_length=15, null=True, blank=True)
    is_staff = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    objects = CustomUserManager()
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['phone']
    def __str__(self):
        return self.email
```

> Note: `USERNAME_FIELD` is used to specify the field that is used for authentication and `REQUIRED_FIELDS` is used to specify the fields that are required when creating a user using the `createsuperuser` command.
>> Note: AbstractBaseUser only contains `password` and `lastlogin` fields and you need to define the fields that you want to add to the user model.
>>> Note: PermissionMinxing contains the permission fields  `is_superuser`,`groups` and `user_permissions` fields.


### Step 2: Create a new manager class that inherits from BaseUserManager
BaseUserManager is used to create a user and superuser.Django internally uses this manager to create a user and superuser.

models.py
```python
from django.contrib.auth.models import BaseUserManager

class CustomUserManager(BaseUserManager):
    def create_user(self,email,password=None,**extra_fields):
        if not email:
            raise ValueError('The Email field must be set')
        if not password:
            raise ValueError('The Password field must be set')
        email = self.normalize_email(email)
        user = self.model(email=email,**extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user
    def create_superuser(self,email,password=None,**extra_fields):
        extra_fields.setdefault('is_staff',True)
        extra_fields.setdefault('is_superuser',True)
        return self.create_user(email,password,**extra_fields)

```

### Step 3: Update the AUTH_USER_MODEL setting in settings.py
settings.py
```python
AUTH_USER_MODEL = 'myapp.CustomUser'
```

### Step 4: Create a new migration and apply it
```bash
python manage.py makemigrations
python manage.py migrate
```

### Step 5: Setting The Admin Interface using UserAdmin
To make the custom user model available in the admin interface, you need to create a new class that inherits from `UserAdmin` and register it with the admin interface.
```python
from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from myapp.models import CustomUser

class CustomUserAdmin(UserAdmin):
    model = CustomUser
    fieldsets = (
        ("Basic Information", {'fields': ('email', 'password')}),
        ("Personal Information", {'fields': ('age', 'address', 'phone')}),
        ("Permissions", {'fields': ('is_active', 'is_staff', 'is_superuser')}),
    )
    add_fieldsets = (
        ("Basic Information", {'fields': ('email', 'password1', 'password2')}),
        ("Personal Information", {'fields': ('age', 'address', 'phone')}),
        ("Permissions", {'fields': ('is_active', 'is_staff', 'is_superuser')}),
    )
    ordering = ('email',)
    list_display = ('email', 'age', 'address', 'phone', 'is_active', 'is_staff', 'is_superuser')

admin.site.register(CustomUser, CustomUserAdmin)

```


## Custom Authentication In Django
All the authentication in Django is done using the `authenticate()` method from the `django.contrib.auth` module. This method takes the `request`, `username` and `password` as arguments and returns the user object if the credentials are valid.But sometimes you may want to customize the authentication process in Django. You can do this by creating a custom authentication backend.

## Process to create a custom authentication backend

### Step 1: Create a new class that inherits from `BaseBackend` 
You need to create a new class that inherits from `BaseBackend` and implement the `authenticate()` method. This method should take the `request`, `username` and `password` as arguments and return the user object if the credentials are valid.

```python
from django.contrib.auth.backends import BaseBackend
from django.contrib.auth import get_user_model

class CustomBackend(BaseBackend):
    def authenticate(self, request, username=None, password=None):
        User = get_user_model()
        try:
            user = User.objects.get(email=username)
            if user.check_password(password):
                return user
        except User.DoesNotExist:
            return None
    def get_user(self, user_id):
        User = get_user_model()
        try:
            return User.objects.get(pk=user_id)
        except User.DoesNotExist:
            return None
```

### Step 2: Update the AUTHENTICATION_BACKENDS setting in settings.py
You need to update the `AUTHENTICATION_BACKENDS` setting in the `settings.py` file to include the path to the custom authentication backend.
```python
AUTHENTICATION_BACKENDS = [
    'myapp.backends.CustomBackend',
    'django.contrib.auth.backends.ModelBackend',
]
```


### Step 3: Authenticate the user using the custom authentication backend
You can now authenticate the user using the custom authentication backend by calling the `authenticate()` method from the `django.contrib.auth` module.
```python
from django.contrib.auth import authenticate
user = authenticate(request,usernmae='alice',password='password')
```


## Groups in Django
Groups in Django are a way to categorize users into different groups based on their roles or permissions. Each group can have multiple permissions, and each user can belong to multiple groups. Groups are useful for managing permissions and access control in Django applications.

### Creating a Group
To create a group, you can use the `Group` model from the `django.contrib.auth.models` module. You can create an instance of this model and call the `save()` method to save the group to the database.
```python
from django.contrib.auth.models import Group
group = Group(name='Admins')
group.save()
```

### Get Group By Name
To get a group by name, you can use the `get()` method of the `Group` model. This method takes the `name` of the group as an argument and returns the group object if it exists.
```python
from django.contrib.auth.models import Group
group = Group.objects.get(name='Admins')
```

### Adding User TO Group
To add a user to a group, you can use the `user.groups.add()` method. This method takes the group object as an argument and adds the user to the group.
```python
from django.contrib.auth.models import User, Group
user = User.objects.get(username='alice')
group1 = Group.objects.get(name='Admins')
group2 = Group.objects.get(name='Editors')
user.groups.add(group1, group2)
```

### Removing User From Group
To remove a user from a group, you can use the `user.groups.remove()` method. This method takes the group object as an argument and removes the user from the group.
```python
from django.contrib.auth.models import User, Group
user = User.objects.get(username='alice')
group1 = Group.objects.get(name='Admins')
group2 = Group.objects.get(name='Editors')
user.groups.remove(group1, group2)
```

### Clear All The Groups
To remove all the groups from a user, you can use the `user.groups.clear()` method. This method removes all the groups from the user.
```python
from django.contrib.auth.models import User
user = User.objects.get(username='alice')
user.groups.clear()
```

### Get All The Groups Of A User
To get all the groups of a user, you can use the `user.groups.all()` method. This method returns all the groups that the user belongs to.
```python
from django.contrib.auth.models import User
user = User.objects.get(username='alice')
groups = user.groups.all()
```

## Permissions in Django
Permission is given to user so that they can perform certain actions in the Django application from the admin interface.

### Default Permissions
Django provides the following default permissions:
- add_modelname: Allows the user to add new objects of the model.
- change_modelname: Allows the user to change existing objects of the model.
- delete_modelname: Allows the user to delete objects of the model.
- view_modelname: Allows the user to view objects of the model.

### Custom Permissions
Every time the default permissions are not sufficient for the application, you can create custom permissions using the `Permission` model from the `django.contrib.auth.models` or by using the `Meta` class in the model.

#### Using Meta Class

```python
class MyModelName(models.Model):
    # code
    class Meta:
        permissions = [
            ('have_special', 'Have Special Feature'),
        ]
```

#### Using Code
##### Creating a Permission
```python
from django.contrib.auth.models import Permission
from django.contrib.contenttypes.models import ContentType

content_type = ContentType.objects.get_for_model(MyModelName)
permission = Permission.objects.create(
    codename='have_special',
    name='Have Special Feature',
    content_type=content_type,
)
```

### Some Useful Methods of Permission

#### `Get Permission object using codename`
```python
from django.contrib.auth.models import Permission
permission = Permission.objects.get(codename='have_special')
```
#### `Delete Permission`
```python
from django.contrib.auth.models import Permission
permission = Permission.objects.get(codename='have_special')
permission.delete()
```

#### Assigning Permission to User
```python
from django.contrib.auth.models import User, Permission
from myapp.models import User
user = User.objects.get(username='alice')
permission1 = Permission.objects.get(codename='have_special')
permission2 = Permission.objects.get(codename='add_mymodelname')
user.user_permissions.add(permission1, permission2)
```

#### Removing Permission from User
```python
from django.contrib.auth.models import User, Permission
user = User.objects.get(username='alice')
permission1 = Permission.objects.get(codename='have_special')
permission2 = Permission.objects.get(codename='add_mymodelname')
user.user_permissions.remove(permission1, permission2)
```

#### Clear All The Permissions
```python
from django.contrib.auth.models import User
user = User.objects.get(username='alice')
user.user_permissions.clear()
```
#### See All The Permissions Of A User
```python
from django.contrib.auth.models import User
user = User.objects.get(username='alice')
permissions = user.user_permissions.all()
```

### Assigning Permission to Group
```python
from django.contrib.auth.models import Group, Permission
group = Group.objects.get(name='Admins')
permission1 = Permission.objects.get(codename='have_special')
permission2 = Permission.objects.get(codename='add_mymodelname')
group.permissions.add(permission1, permission2)
```

### Removing Permission from Group
```python
from django.contrib.auth.models import Group, Permission
group = Group.objects.get(name='Admins')
permission1 = Permission.objects.get(codename='have_special')
permission2 = Permission.objects.get(codename='add_mymodelname')
group.permissions.remove(permission1, permission2)
```

### See All The Permissions Of A Group
```python
from django.contrib.auth.models import Group
group = Group.objects.get(name='Admins')
permissions = group.permissions.all()
```



### Check whether the user has permission
```python
user.has_perm('myapp.have_special')
```


### Restricting Access to Views
To restrict access to a view based on permissions, you can use the `permission_required` decorator from the `django.contrib.auth.decorators` module.
```python
from django.contrib.auth.decorators import permission_required

@permission_required('myapp.have_special')
def special_view(request):
    return HttpResponse('This is a special view')
```


# This will be enough to learn DRF. I hope you enjoyed this series. If you have any questions or suggestions, feel free to ask. Thank you for reading. Happy coding!🚀🚀🚀



## Model Manager and Custom Model Manager
By default, Django adds a Manager with the name objects to every Django model class. However, if you want to use objects as a field name, or if you want to use a name other than objects for the Manager, you can rename it on a per-model basis. To rename the Manager for a given class, define a class attribute of type models.Manager() on that model.

```python
from django.db import models
class Person(models.Model):
    first_name = models.CharField(max_length=30)
    last_name = models.CharField(max_length=30)
    people = models.Manager()
```

Using this example model, Person.objects will generate an AttributeError exception, but Person.people.all() will provide a list of all Person objects.


## Custom Model Manager
You can use custom managers to add extra manager methods to your models. This is useful for adding custom query methods. For example, to add a method that only give user who are not deleted, you can create a custom manager like this:

```python
from django.db import models
class PersonManager(models.Manager):
    def get_queryset(self):
        return super().get_queryset().filter(deleted=False)
    

class Person(models.Model):
    first_name = models.CharField(max_length=30)
    last_name = models.CharField(max_length=30)
    deleted = models.BooleanField(default=False)
    objects = models.Manager()
    people = PersonManager()
```

> Here Person.objects.all() will return all the objects that is deleted as well as not deleted but Person.people.all() will return only the objects which are not deleted.


## Signals in Django
Signals are used to allow decoupled applications to get notified when certain actions occur elsewhere in the application. In Django, signals are used to allow certain senders to notify a set of receivers when some action has taken place.

### Defining a Signal

```python
from django.db.models.signals import pre_save
from django.dispatch import receiver

@receiver(pre_save, sender=MyModel)
def my_handler(sender, **kwargs):
    # code
```

### Available Signals
- pre_save: This signal is sent just before a model's save() method is called.
- post_save: This signal is sent just after a model's save() method is called.
- pre_delete: This signal is sent just before a model's delete() method is called.
- post_save : This signal is sent just after a model's delete() method is called.
- pre_init: This signal is sent when a model's __init__() method is called.
- post_init: This signal is sent when a model's __init__() method is called.



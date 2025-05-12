---
title: "Django: Day 1"
date: 2025-01-01
description: "A comprehensive guide to Django fundamentals covering project setup, apps, routing, views, and static file handling - essential concepts for learning Django REST Framework."
showToc: true
categories: ["Django"]
tags: ["Django", "Python", "Web Development", "Backend", "Static Files"]
summary: "Master core Django concepts including project structure, app creation, URL routing, views, static files management and more. A foundational guide for Django REST Framework."
images: ["/images/django.jpg"]
---

In this Series we will cover all the concept of django that we need to learn drf(Django Rest Framework)

# 1.Installation of Django
```bash
pip install django
```

# 2.Project and App in Django
Project is the collection of Apps and APP is the individual module of the project.
For Example: A e-commerce website is a project and the modules like products,orders,users,search are the apps.

# 3.Creating a Django Project
To create a project in django we need to run the following command
```bash
django-admin startproject project_name
```

# 4.Folder Structure of Django Project
```bash
project_name
    |__project_name
    |   |__settings.py
    |   |__urls.py
    |   |__wsgi.py
    |   |__asgi.py
    |__manage.py
```
- `settings.py`: This file contains all the settings of the project like installed apps, middleware, database configuration, static files, media files etc.
- `urls.py`: This file contains all the urls of this project. When send a request to the server then this file will decide which view function will be called.
- `wsgi.py`: This file is used for deployment purpose.
- `asgi.py`: This file is used for deployment purpose.
- `manage.py`: This file is used to run the server, create apps, create superuser etc.


# 5.Running the Server
To run the server we need to run the following command
```bash
python manage.py runserver
```

# 6.Creating a Django App
To create a app in django we need to run the following command
```bash
python manage.py startapp app_name
```

# 7.Folder Structure of Django App
```bash
app_name
    |__migrations
    |__admin.py
    |__apps.py
    |__models.py
    |__tests.py
    |__views.py
```
- `migrations`: This folder contains all the migrations files.
- `admin.py`: This file is used to register the models in the admin panel.
- `apps.py`: This file is used to configure the app.
- `models.py`: This file is used to create the models.
- `tests.py`: This file is used to write the test cases.
- `views.py`: This file is used to write the views.


# 8.Registering the App in the Project
To register the app in the project we need to add the app name in the `INSTALLED_APPS` list in the `settings.py` file.
```python
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'app_name',
]
```

# 9. Why register the app in the project?
Here are the reasons:
-`makemigrations` and `migrate` commands will work for the app.
if we don't register the app in the project then the `makemigrations` and `migrate` commands will not work for the app.

-`static` and `templates` folder will work for the app.
If we don't register the app in the project then the `static` and `templates` folder will not recognize by the django.


# 10.Routes in Django
In Django we define the routes in the `urls.py` file of project but it will be difficult to manage all the routes in the `urls.py` so we create a `urls.py` file in the app and include that file in the project `urls.py` file and define the routes in the app `urls.py` file.

steps:
1. Create a `urls.py` file in the app.
2. include the app `urls.py` file in the project `urls.py` file.
3. Define the routes in the app `urls.py` file.

for example:
```python
# home/urls.py
from django.urls import path
from . import views

urlpatterns = [
    path('', views.home, name='home'),
    path('about/', views.about, name='about'),
]

#search/urls.py
from django.urls import path
from . import views
urlpatterns = [
    path('', views.search, name='search'),
    path('result/', views.result, name='result'),

]



# project/urls.py
from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('app.urls')),
    path('search/', include('search.urls')),
]
```

When user send request to localhost:8000/search/ then it will call the search app `urls.py` and from there view will be decided
`name` is used later for redirection purpose.


# 11. Views in Django
In Django views are the functions that take a request and return a response. Views are the heart of the django application. Views are the functions that are called when the user send a request to the server.

# 12. Creating a View
To create a view we need to create a function in the `views.py` file of the app.

for example:
```python
# views.py
from django.http import HttpResponse
def home(request):
    return HttpResponse('Home Page')

def about(request):
    return HttpResponse('About Page')
```

# 13. Registering the View in the urls
To register the view in the urls we need to import the view in the `urls.py` file of the app and define the path.

for example:
```python
# urls.py
from django.urls import path
from . import views
urlpatterns = [
    path('', views.home, name='home'),
    path('about/', views.about, name='about'),
]
```

# 14.Dynamic URL Routing
In Django we can pass the dynamic data in the url and get that data in the view function.

for example:
```python
# urls.py
from django.urls import path
from . import views
urlpatterns = [
    path('post/<int:id>/', views.post, name='post'),
    path('post/<int:id>/<int:str>', views.post, name='post'),
]

# views.py  
from django.http import HttpResponse
def post(request, id):
    return HttpResponse(f'Post {id}')

def post(request, id, str):
    return HttpResponse(f'Post {id} {str}')
```

we can use 
- `int` for integer ex: localhost:8000/post/1/ =>1
- `str` for string ex: localhost:8000/post/abs =>abs
- `slug` for slug ex: localhost:8000/post/this-is-slug =>this-is-slug
- `uuid` for uuid ex: localhost:8000/post/123e4567-e89b-12d3-a456-426614174000 =>123e4567-e89b-12d3-a456-426614174000
- `path` for path ex: localhost:8000/post/this/is/path =>this/is/path


# 15.reverse() function
In Django we can use the `reverse()` function to get the url of the view by using the name of the view.

for example:
```python
# urls.py
from django.urls import path
from . import views
urlpatterns = [
    path('', views.home, name='home'),
    path('about/', views.about, name='about'),
]

# views.py
from django.http import HttpResponse
from django.urls import reverse

def home(request):
    return HttpResponse(reverse('home'))

def about(request):
    return HttpResponse(reverse('about'))
```
The `reverse('home')` will return the url of the home view as `/` and `reverse('about')` will return the url of the about view as `/about/`.


# 16.Redirecting the URL
In Django we can redirect the url to another url by using the `redirect()` function as well as the `reverse()` function and `HttpResponseRedirect()` function.
for example:
```python
# views.py
from django.http import HttpResponseRedirect
from django.shortcuts import redirect
from django.urls import reverse

def home(request):
    return HttpResponseRedirect(reverse('last'))

def about(request):
    return redirect('last')

def last(request):
    return HttpResponse('Last Page')
```

The `HttpResponseRedirect(reverse('last'))` will redirect the user to the last view and `redirect('last')` will also redirect the user to the last view.



# 17.Handeling Static Files

## 17.1 What are Static Files?
Static files are the files that are used in the frontend of the website like css, js, images etc and these files are not changed dynamically.

## 17.2 Where to put the Static Files?
In Django we put the static files in the `static` folder of the app 
for example:
```bash
app_name
    |__static
        |__app_name
            |__css
            |__js
            |__images
```

## 17.2 Setting Global Static Files
if we want to set global level static file outside the app then 
- we  create a folder for instance `static` in the project
for example:
```bash
project_name
    |__static
        |__css
        |__js
        |__images
```
- add the path in the `settings.py` file
```python
STATICFILES_DIRS = [
    os.path.join(BASE_DIR, 'static')
]
```

## Other Setting for Static Files
### `STATIC_ROOT`
This setting is used to define the path where the static files will be collected.
```python
STATIC_ROOT = os.path.join(BASE_DIR, 'staticfiles')
```
When we run the `collectstatic` command then all the static files will be collected in the `staticfiles` folder.

### `STATICFILES_DIRS`
This setting is used to define the path of the static filess specially for global level static files.
```python
STATICFILES_DIRS = [
    os.path.join(BASE_DIR, 'static')
]
```

### `STATIC_URL`
This setting is used to define the url of the static files.
```python
STATIC_URL = '/static/'
```
for example:
```bash
static
|-css
| |-style.css
| |-style1.css
|
|-js
| |-script.js
| |-script1.js
```
then we can access the css file as `localhost:8000/static/css/style.css` and js file as `localhost:8000/static/js/script.js` due to the `STATIC_URL` setting.

> Note: python manage.py collectstatic command is used to collect all the static files in the `STATIC_ROOT` folder.

# 18.Serving Static Files
If django.contrib.staticfiles is included in your INSTALLED_APPS,runserver will  automatically serve static files when DEBUG is set to True but If you don’t have django.contrib.staticfiles in INSTALLED_APPS, you can still manually serve static files using static().
```python
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    # ... the rest of your URLconf goes here ...
] + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
```
> Note: This is not suitable for production use! 

# 19.Using `csrf_exempt` decorator
The `csrf_exempt` decorator is used to exempt a view from CSRF verification. This is useful when you want to allow requests from external sources or when you are using a third-party service that does not support CSRF tokens.
```python
from django.views.decorators.csrf import csrf_exempt
from django.http import HttpResponse
@csrf_exempt
def my_view(request):
    return HttpResponse('This view is exempt from CSRF verification')
```
> Note: Use this decorator with caution as it can expose your application to CSRF attacks. It is recommended to use this decorator only for views that are not sensitive or do not require CSRF protection.

# 20.`method_decorator` decorator
The `method_decorator` decorator is used to apply a decorator to a class-based view method. This is useful when you want to apply a decorator to a specific method of a class-based view.
```python
from django.utils.decorators import method_decorator
from django.views import View
from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt
class MyView(View):
    @method_decorator(csrf_exempt)
    def get(self, request):
        return HttpResponse('This view is exempt from CSRF verification')
        
```
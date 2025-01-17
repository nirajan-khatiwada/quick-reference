---
title: "Django : Day 7"
date: 2025-01-08
description: "Learn how to handle form data and file uploads in Django, including setting up media files, serving media files, and using FileField and ImageField."
showToc: true
categories: ["Django"]
tags: ["Django", "Python", "Form Data", "File Uploads", "Backend", "Web Development"]
summary: "A comprehensive guide on handling form data and file uploads in Django, covering request methods, media file setup, and file field usage."
images: ["/images/django/django.jpg"]
---

# Request object for Form Data

- `request.method`: Returns the request method (GET, POST, etc.).
```python
def my_view(request):
    if request.method == 'GET':
        return HttpResponse('This is a GET request')
    elif request.method == 'POST':
        return HttpResponse('This is a POST request')
```

- `request.GET`: A dictionary-like object containing all the GET parameters.
```python
def my_view(request):
    name = request.GET.get('name', '')
    return HttpResponse(f'Hello, {name}')
```

- `request.POST`: A dictionary-like object containing all the POST parameters.
```python
def my_view(request):
    name = request.POST.get('name', '')
    return HttpResponse(f'Hello, {name}')
```

- `request.PUT`: A dictionary-like object containing all the PUT parameters.
```python
def my_view(request):
    name = request.PUT.get('name', '')
    return HttpResponse(f'Hello, {name}')
```

- `request.META`: A dictionary containing all the HTTP headers.
```python
def my_view(request):
    user_agent = request.META.get('HTTP_USER_AGENT', '')
    http_referer = request.META.get('HTTP_REFERER', '')
    http_host = request.META.get('HTTP_HOST', '')
    return HttpResponse(f'User Agent: {user_agent}')
```

- `request.FILES`: A dictionary-like object containing all the uploaded files.



# Handeling File Uploads By User
The file uploaded by user are called Media files in Django. Django provides a `FileField` and `ImageField` to handle file uploads. The `FileField` and `ImageField` are used to upload files and images respectively.

## Setting Up Media Files
To handle media files in Django, you need to set up the `MEDIA_URL` and `MEDIA_ROOT` in the settings.py file.
- `MEDIA_URL`: The URL that handles the media files.
```python
MEDIA_URL = '/media/'
```
- `MEDIA_ROOT`: The directory where the media files are stored.
```python
MEDIA_ROOT = os.path.join(BASE_DIR, 'media')
```

> Note: All the media file is stored in the `MEDIA_ROOT` directory and they are served using the `MEDIA_URL`.

## Serving Media Files
By default media file is not served like static files.To serve media files during development, you need to add the following code to the urls.py file.
```python
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    # Your URL patterns
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
```
let us consider a file structure like this:
```bash
project
│
├── media
|    |── file.jpg
|    |── file2.jpg
|
├── myapp
|    |── models.py
|    |── views.py
|
```
Then wehn user visit to `http://localhost:8000/media/` then the folder `media` will be resolved.
similarly if user visit to `http://localhost:8000/media/file.jpg` then the file `file.jpg` will be resolved.


## FileField or ImageField
- `FileField`: It is used to upload files.
```python
from django.db import models
class Document(models.Model):
    name = models.CharField(max_length=100)
    file = models.FileField(upload_to='documents/')
```

- `ImageField`: It is used to upload images.
```python
from django.db import models
class Image(models.Model):
    name = models.CharField(max_length=100)
    image = models.ImageField(upload_to='images/')
```

 when we save the file using `FileField` then the file will be saved in the `MEDIA_ROOT` folder and its url will contain the `MEDIA_URL` in the database followed by the file name.


 ## Example of File Upload
models.py
```python
from django.db import models
class Document(models.Model):
    name = models.CharField(max_length=100)
    file = models.FileField(upload_to='documents/')
```

settings.py
```python
MEDIA_URL = '/media/'
MEDIA_ROOT = os.path.join(BASE_DIR, 'media')
```

urls.py
```python
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    # Your URL patterns
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
```


views.py
```python
from django.shortcuts import render
from .models import Document

def upload_file(request):
    if request.method == 'POST':
        name = request.POST.get('name', '')
        file = request.FILES.get('file', None)
        if file:
            document = Document(name=name, file=file)
            document.save()
            return HttpResponse('File uploaded successfully')
    return render(request, 'upload_file.html')
```


## To find the url of the file
```python
document = Document.objects.get(id=1)
url = document.file.url  # /media/documents/file.jpg
```




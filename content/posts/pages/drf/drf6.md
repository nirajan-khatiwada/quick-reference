---
title: "DRF DAY 6"
date: 2025-05-10
description: "A detailed guide Hyperlinked Identity Field and Hyperlinked Related Field in Django Rest Framework."
showToc: true
categories: ["Django Rest Framework"]
tags: ["Django", "Python", "DRF", "Backend", "Web Development"]
summary: "A detailed guide Hyperlinked Identity Field and Hyperlinked Related Field in Django Rest Framework."
images: ["/images/drf.png"]
---

- ## Hyperlinked Identity Field
Hyperlinked Identity Field is a field that represents the URL of the object itself. It is useful when you want to provide a link to the object in the API response.
> Note: It is read-only field.

Implementation:
Consider the following model:

```python
from django.db import models
class Author(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField()

    def __str__(self):
        return self.name
```

Now, we will create a serializer for this model using Hyperlinked Identity Field:

```python
from rest_framework import serializers
from .models import Author
class AuthorSerializer(serializers.HyperlinkedModelSerializer):
    url = serializers.HyperlinkedIdentityField(
        view_name='author-detail',  # The name of the view that provides the detail of the author
        lookup_field='id'  # The field used to look up the object
    )
    class Meta:
        model = Author
        fields = ['id', 'name', 'email']  # 'url' is the Hyperlinked Identity Field
       
```

Now, we need to create a view for this serializer:
```python
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Author
from .serializers import AuthorSerializer
class AuthorView(APIView):
    def get(self, request, *args, **kwargs):
        authors = Author.objects.all()
        serializer = AuthorSerializer(authors,
                                     many=True,
                                    context={'request': request} # context is required to generate the full URL for the Hyperlinked Identity Field
                                    )
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request, *args, **kwargs):
        serializer = AuthorSerializer(
            data=request.data,
            context={'request': request}  # context is required to generate the full URL for the Hyperlinked Identity Field
            )
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
```



Now, we need to create a URL for this view:
```python
from django.urls import path
from .views import AuthorView,AuthorDetailView
urlpatterns = [
    path('authors/', AuthorView.as_view(), name='author-list'),
    path('authors/<int:id>/', AuthorDetailView.as_view(), name='author-detail'),  # Detail view for Hyperlinked Identity Field
]
```

The output of the API will look like this on /api/authors/:

```json
[
    {
        "url": "http://localhost:8000/api/authors/1/",
        "id": 1,
        "name": "John Doe",
        "email": "john@gmail.com"
    },
    {
        "url": "http://localhost:8000/api/authors/2/",
        "id": 2,
        "name": "Kane Doe",
        "email": "johsns@gmail.com"
    }
]
```
Some Of the important points to note:
- The `url` field is the Hyperlinked Identity Field that provides the URL of the author object.
- The `view_name` parameter in the `HyperlinkedIdentityField` specifies the name of the view that provides the detail of the author.
- The `lookup_field` parameter specifies the field used to look up the object. In this case, it is the `id` field.
- The `context` parameter is required to generate the full URL for the Hyperlinked Identity Field. It should contain the request object.

Some of important field are:
view_name: The name of the view that provides the detail of the object.
lookup_field: The field used to look up the object. It can be any field in the model, not just the primary key.


- ## Hyperlinked Related Field
Normally the relationship between two models is represented by a foreign key (Primary key related field) But sometimes we want to represent the relationship between two models by a URL. In that case, we can use Hyperlinked Related Field.

Implementation:
Consider the following models:

```python
from django.db import models
class Author(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField()

    def __str__(self):
        return self.name

class Book(models.Model):
    title = models.CharField(max_length=100)
    author = models.ForeignKey(Author, related_name='books', on_delete=models.CASCADE)

    def __str__(self):
        return self.title
```
Now, we will create a serializer for the Book model using Hyperlinked Related Field:

```python
from rest_framework import serializers
from .models import Book, Author

class AuthorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Author
        fields = ['id', 'name', 'email']

class BookSerializer(serializers.ModelSerializer):
    author = serializers.HyperlinkedRelatedField(
        view_name='author-detail',  # The name of the view that provides the detail of the author
        lookup_field='id'  # The field used to look up the object
    )

    class Meta:
        model = Book
        fields = ['id', 'title', 'author'] 
```

Now, we need to create a view for this serializer:
```python
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Book
from .serializers import BookSerializer

class BookView(APIView):
    def get(self, request, *args, **kwargs):
        books = Book.objects.all()
        serializer = BookSerializer(books, many=True, context={'request': request})
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request, *args, **kwargs):
        serializer = BookSerializer(data=request.data, context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
```
Now, we need to create a URL for this view:
```python
from django.urls import path
from .views import BookView, AuthorDetailView
urlpatterns = [
    path('books/', BookView.as_view(), name='book-list'),
    path('authors/<int:id>/', AuthorDetailView.as_view(), name='author-detail'),  # Detail view for Hyperlinked Related Field
]
```

The output of the API will look like this on /api/books/:

```json
[
    {
        "id": 1,
        "title": "Book One",
        "author": "http://localhost:8000/api/authors/1/"
    },
    {
        "id": 2,
        "title": "Book Two",
        "author": "http://localhost:8000/api/authors/2/"
    }
]

```

Some of the important points to note:
- The `author` field is the Hyperlinked Related Field that provides the URL of the author object.
- The `view_name` parameter in the `HyperlinkedRelatedField` specifies the name of the view that provides the detail of the author.
- The `lookup_field` parameter specifies the field used to look up the object. In this case, it is the `id` field.
- The `context` parameter is required to generate the full URL for the Hyperlinked Related Field. It should contain the request object.

Some of important field are:
- view_name: The name of the view that provides the detail of the related object.
- lookup_field: The field used to look up the related object. It can be any field in the model, not just the primary key.
- queryset: The queryset used for model instance lookups when validating the field input. Relationships must either set a queryset explicitly, or set read_only=True
- many: If True, the field will accept a list of URLs. If False, it will accept a single URL. Default is False.
- allow_null:If set to True, the field will accept values of None or the empty string for nullable relationships. Defaults to False.



Send requrest to save data like:
```json
{
    "title": "Book Three",
    "author": "http://localhost:8000/api/authors/1/"
}
```







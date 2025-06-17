---
title: "DRF : Day 3"
date: 2025-01-14
description: "Learn how to implement JWT authentication in Django REST framework, including installation, configuration, and usage."
showToc: true
categories: ["Django Rest Framework"]
tags: ["Django", "Python", "DRF", "JWT", "Authentication", "Backend", "Web Development"]
summary: "A comprehensive guide on implementing JWT authentication in Django REST framework, covering installation, configuration, and usage."
images: ["/images/drf.png"]
---

# Serializer Relationships
Relational fields are used to represent model relationships. They can be applied to ForeignKey, ManyToManyField and OneToOneField relationships, as well as to reverse relationships

Consider the following models:

```python
from django.db import models

class Author(models.Model):
    name = models.CharField(max_length=100)

class Book(models.Model):
    title = models.CharField(max_length=100)
    author = models.ForeignKey(Author, on_delete=models.CASCADE)
```

# Primary Key Related Field
A primary key related field should present either the queryset or read_only attributed to true.Normally ModelSerializer uses the primary key related field to represent the relationship.PrimaryKeyRelatedField may be used to represent the target of the relationship using its primary key.

for example:

```python
from rest_framework import serializers
from .models import Author, Book

class BookSerializer(serializers.ModelSerializer):
    class Meta:
        model = Book
        fields = ['title', 'author']
```

```python
from rest_framework import serializers
from .models import Author, Book

class BookSerializer(serializers.Serializer):
    title = serializers.CharField(max_length=100)
    author = serializers.PrimaryKeyRelatedField(queryset=Author.objects.all())
```


Will serialize like this:

```json
{
    "title": "The Great Gatsby",
    "author": 1
}
```


# Saving and Updating Instance of Primary Key Related Field

- One To One Relationship
Request format:
```json
{
    "title": "The Great Gatsby",
    "author": 1
}
```

Model Serializer:
```python
from rest_framework import serializers
from .models import Author, Book

class BookSerializer(serializers.ModelSerializer):
    class Meta:
        model = Book
        fields = ['title', 'author']
```


Normal Serializer:
```python
from rest_framework import serializers
from .models import Author, Book
class BookSerializer(serializers.Serializer):
    title = serializers.CharField(max_length=100)
    author = serializers.PrimaryKeyRelatedField(queryset=Author.objects.all())
    def create(self, validated_data):
        author = validated_data.pop('author')
        author_instance = Author.objects.get(id=author)
        return Book.objects.create(author=author_instance, **validated_data)
    def update(self, instance, validated_data):
        author = validated_data.pop('author')
        author_instance = Author.objects.get(id=author)
        instance.author = author_instance
        instance.title = validated_data.get('title', instance.title)
        instance.save()
        return instance
```

Using it in API view to update and save the instance and get the instance:

```python
from rest_framework import APIView
from rest_framework.response import Response
from .models import Author, Book
from .serializers import BookSerializer

class BookView(APIView):
    def post(self, request):
        serializer = BookSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors)
    def get(self, request):
        book = Book.objects.get(id=1)
        serializer = BookSerializer(book)
        return Response(serializer.data)
    def patch(self,request,id):
        book = Book.objects.get(id=id)
        serializer = BookSerializer(book, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors)
```

- Foreign Key Relationship

Request format:
```json
{
    "title": "The Great Gatsby",
    "author": 1
}
```

Model Serializer:
```python
from rest_framework import serializers
from .models import Author, Book

class BookSerializer(serializers.ModelSerializer):
    class Meta:
        model = Book
        fields = ['title', 'author']
```

Normal Serializer:
```python
from rest_framework import serializers
from .models import Author, Book
class BookSerializer(serializers.Serializer):
    title = serializers.CharField(max_length=100)
    author = serializers.PrimaryKeyRelatedField(queryset=Author.objects.all())
    def create(self, validated_data):
        author = validated_data.pop('author')
        author_instance = Author.objects.get(id=author)
        return Book.objects.create(author=author_instance, **validated_data)
    def update(self, instance, validated_data):
        author = validated_data.pop('author')
        author_instance = Author.objects.get(id=author)
        instance.author = author_instance
        instance.title = validated_data.get('title', instance.title)
        instance.save()
        return instance
```

Using it in API view to update and save the instance and get the instance:

```python
from rest_framework import APIView
from rest_framework.response import Response
from .models import Author, Book
from .serializers import BookSerializer

class BookView(APIView):
    def post(self, request):
        serializer = BookSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors)
    def get(self, request):
        book = Book.objects.get(id=1)
        serializer = BookSerializer(book)
        return Response(serializer.data)
    def patch(self,request,id):
        book = Book.objects.get(id=id)
        serializer = BookSerializer(book, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors)
```


- Many To Many Relationship

Request format:
```json
{
    "title": "The Great Gatsby",
    "author": [1, 2]
}
```

Model Serializer:
```python
from rest_framework import serializers
from .models import Author, Book
class BookSerializer(serializers.ModelSerializer):
    class Meta:
        model = Book
        fields = ['title', 'author']
```

Normal Serializer:
```python
from rest_framework import serializers
from .models import Author, Book
class BookSerializer(serializers.Serializer):
    title = serializers.CharField(max_length=100)
    author = serializers.PrimaryKeyRelatedField(queryset=Author.objects.all(), many=True)
    def create(self, validated_data):
        authors = validated_data.pop('author')
        book = Book.objects.create(**validated_data)
        author_instances = Author.objects.filter(id__in=authors)
        book.author.add(*author_instances)
        return book
    def update(self, instance, validated_data):
        authors = validated_data.pop('author')
        book = instance
        book.title = validated_data.get('title', book.title)
        book.save()
        author_instances = Author.objects.filter(id__in=authors)
        book.author.set(author_instances)
        return book
```

Using it in API view to update and save the instance and get the instance:

```python
from rest_framework import APIView
from rest_framework.response import Response
from .models import Author, Book
from .serializers import BookSerializer
class BookView(APIView):
    def post(self, request):
        serializer = BookSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors)
    def get(self, request):
        book = Book.objects.get(id=1)
        serializer = BookSerializer(book)
        return Response(serializer.data)
    def patch(self,request,id):
        book = Book.objects.get(id=id)
        serializer = BookSerializer(book, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors)
```

# Nested Relationships
As opposed to previously discussed references to another entity, the referred entity can instead also be embedded or nested in the representation of the object that refers to it. Such nested relationships can be expressed by using serializers as fields.

If the field is used to represent a to-many relationship, you should add the `many=True` flag to the serializer field.

Example:

Model:
```python
from django.db import models

class Author(models.Model):
    name = models.CharField(max_length=100)

class Book(models.Model):
    title = models.CharField(max_length=100)
    author = models.ManyToManyField(Author,releted_name='books')
```

Model Serializer:
```python
from rest_framework import serializers
from .models import Author, Book

class AuthorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Author
        fields = ['id','name']
class BookSerializer(serializers.ModelSerializer):
    author = AuthorSerializer(many=True)
    class Meta:
        model = Book
        fields = ['title', 'author']
```

Normal Serializer:
```python
from rest_framework import serializers
from .models import Author, Book

class AuthorSerializer(serializers.Serializer):
    id = serializers.IntegerField()
    name = serializers.CharField(max_length=100)

class BookSerializer(serializers.Serializer):
    title = serializers.CharField(max_length=100)
    author = AuthorSerializer(many=True)
    def create(self, validated_data):
        authors = validated_data.pop('author')
        book = Book.objects.create(**validated_data)
        for author in authors:
            author_instance = Author.objects.get(id=author['id'])
            book.author.add(author_instance)
        return book
    def update(self, instance, validated_data):
        authors = validated_data.pop('author')
        book = instance
        book.title = validated_data.get('title', book.title)
        book.save()
        for author in authors:
            author_instance = Author.objects.get(id=author['id'])
            book.author.add(author_instance)
        return book
```

Would serialize to a nested representation like this:

```json
{
    "title": "The Great Gatsby",
    "author": [
        {
            "title": "F. Scott Fitzgerald",
            "author": 1
        },
        {
            "title": "Ernest Hemingway",
            "author": 2
        }
    ]
}
```

# Writable Nested Representations
By default nested serializers are read-only. If you want to support write-operations to a nested serializer field you'll need to create create() and/or update() methods in order to explicitly specify how the child relationships should be saved.
> Note: Model Serializer by default usages the primary key related field to represent the relationship such that we need not define the create() and update() methods but in case of nested serializer we need to define the create() and update() methods.

- Model Serializer:

```python
from rest_framework import serializers
from .models import Author, Book

class AuthorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Author
        fields = ['id', 'name']

class BookSerializer(serializers.ModelSerializer):
    author = AuthorSerializer(many=True)
    class Meta:
        model = Book
        fields = ['title', 'author']
    def create(self, validated_data):
        authors = validated_data.pop('author')
        book = Book.objects.create(**validated_data)
        for author in authors:
            author_instance = Author.objects.get(id=author['id'])
            book.author.add(author_instance)
        return book
    def update(self, instance, validated_data):
        authors = validated_data.pop('author')
        book = instance
        book.title = validated_data.get('title', book.title)
        book.save()
        for author in authors:
            author_instance = Author.objects.get(id=author['id'])
            book.author.add(author_instance)
        return book
```

- Normal Serializer:

```python
from rest_framework import serializers
from .models import Author, Book
class AuthorSerializer(serializers.Serializer):
    id = serializers.IntegerField()
    name = serializers.CharField(max_length=100)

class BookSerializer(serializers.Serializer):
    title = serializers.CharField(max_length=100)
    author = AuthorSerializer(many=True)
    def create(self, validated_data):
        authors = validated_data.pop('author')
        book = Book.objects.create(**validated_data)
        for author in authors:
            author_instance = Author.objects.get(id=author['id'])
            book.author.add(author_instance)
        return book
    def update(self, instance, validated_data):
        authors = validated_data.pop('author')
        book = instance
        book.title = validated_data.get('title', book.title)
        book.save()
        for author in authors:
            author_instance = Author.objects.get(id=author['id'])
            book.author.add(author_instance)
        return book
```

Using it in API view to update and save the instance and get the instance:

```python
from rest_framework import APIView
from rest_framework.response import Response
from .models import Author, Book
from .serializers import BookSerializer

class BookView(APIView):
    def post(self, request):
        serializer = BookSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors)
    def get(self, request):
        book = Book.objects.get(id=1)
        serializer = BookSerializer(book)
        return Response(serializer.data)
    def patch(self,request,id):
        book = Book.objects.get(id=id)
        serializer = BookSerializer(book, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors)
```


# Further Notes:
## Queryset attribute:
- In version 2.x a serializer class could sometimes automatically determine the queryset argument if a ModelSerializer class was being used.This behavior is now replaced with always using an explicit queryset argument for writable relational fields.

## Reverse Relations
 Note that reverse relationships are not automatically included by the `ModelSerializer` class. You'll need to add an explicit field for the reverse relationship.for example:

using model serializer:
```python
from rest_framework import serializers
from .models import Author, Book
class AuthorSerializer(serializers.ModelSerializer):
    books = serializers.PrimaryKeyRelatedField(many=True, read_only=True)
    class Meta:
        model = Author
        fields = ['id', 'name', 'books']
```

using normal serializer:
```python
from rest_framework import serializers
from .models import Author, Book
class AuthorSerializer(serializers.Serializer):
    id = serializers.IntegerField()
    name = serializers.CharField(max_length=100)
    books = serializers.PrimaryKeyRelatedField(many=True, read_only=True)
```

You'll normally want to ensure that you've set an appropriate related_name argument on the relationship, that you can use as the field name. For example:
```python
class Author(models.Model):
    name = models.CharField(max_length=100)

class Book(models.Model):
    title = models.CharField(max_length=100)
    author = models.ForeignKey(Author, related_name='books', on_delete=models.CASCADE)
```

API view like this:

```python
from rest_framework import APIView
from rest_framework.response import Response
from .models import Author, Book
from .serializers import AuthorSerializer
class AuthorView(APIView):
    def get(self, request):
        author = Author.objects.get(id=1)
        serializer = AuthorSerializer(author)
        return Response(serializer.data)
```


Now the AuthorSerializer will include a field named books that represents the reverse relationship.like this:

API Response:

```json
{
    "id": 1,
    "name": "F. Scott Fitzgerald",
    "books": [
        1,
        2
    ]
}
```


# Authentications
Authentication is the process of verifying the identity of a user. Authentication always runs at the very start of the view, before the permission and throttling checks occur, and before any other code is allowed to proceed.

The request.user property will typically be set to an instance of the contrib.auth package's User class.

The request.auth property is used for any additional authentication information, for example, it may be used to represent an authentication token that the request was signed with.

> Note: Don't forget that authentication by itself won't allow or disallow an incoming request, it simply identifies the credentials that the request was made with.The permission class then decides if the request should be authorized or not.

## How Authentication is determined
The authentication schemes are always defined as a list of classes. REST framework will attempt to authenticate with each class in the list, and will set request.user and request.auth using the return value of the first class that successfully authenticates.If no class authenticates, request.user will be set to an instance of django.contrib.auth.models.AnonymousUser, and request.auth will be set to None


## Setting the authentication scheme
The default authentication schemes may be set globally, using the DEFAULT_AUTHENTICATION_CLASSES setting. For example.
```python
REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': [
        'rest_framework.authentication.BasicAuthentication',
        'rest_framework.authentication.SessionAuthentication',
    ]
}
```

You can also set the authentication scheme on a per-view or per-viewset basis, using the APIView class-based views.


```python
from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

class ExampleView(APIView):
    authentication_classes = [SessionAuthentication, BasicAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request, format=None):
        content = {
            'user': str(request.user),  # `django.contrib.auth.User` instance.
            'auth': str(request.auth),  # None
        }
        return Response(content)
```

> Insted of using Token,session and basic authentication we can also use custom authentication.


# JWT Authentication
In this section, we will learn how to implement JWT authentication in Django REST framework.

## What is JWT?
JSON Web Token is a fairly new standard which can be used for token-based authentication. Unlike the built-in TokenAuthentication scheme, JWT Authentication doesn't need to use a database to validate a token because it is self-validated. This means that the server doesn't need to query the database to check if the token is valid.

## How JWT works?
When a user logs in, the server will generate a token and send it to the client. The client will store the token and send it with every request. The server will then validate the token and allow the user to access protected resources.

## Installing JWT
To install JWT, you need to install the `djangorestframework_simplejwt` package. You can install it using pip:

```bash
pip install djangorestframework-simplejwt
```

## Project Configuration
Then, your django project must be configured to use the library. In settings.py, add rest_framework_simplejwt.authentication.JWTAuthentication to the list of authentication classes:

This set default authentication to JWTAuthentication globally.
```python
REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': [
        'rest_framework_simplejwt.authentication.JWTAuthentication',
        #other authentication classes
    ],
}
```
 but you can also set it on a per-view basis.

```python
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

class ExampleView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request, format=None):
        content = {
            'user': str(request.user),  # `django.contrib.auth.User` instance.
            'auth': str(request.auth),  # None
        }
        return Response(content)
```


> Note view level authentication will have more priority than global authentication.
> In every request authentication will be check if authentication is set either in view or globally.and authentication winot restrict the request but it will only identify the user so we have to use permission classes to restrict the request.


## Generating Tokens
To generate a token, you can use the `TokenObtainPairView` view. This view will generate a token for a user. You can use this token to authenticate the user in subsequent requests.

```python
from rest_framework_simplejwt.views import TokenObtainPairView
urlpatterns = [
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
]
```

The request on `/api/token/` will return a response like this:
```json
{
    "username": "admin",
    "password": "admin"
}
```

will return a response like this:
``` json
{
    "access": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoyLCJ1c2VybmFtZSI6ImFkbWluIiwiZXhwIjoxNjI5MzYwNjY4LCJlbWFpbCI6IiJ9.7Z",
    "refresh": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoyLCJ1c2VybmFtZSI6ImFkbWluIiwiZXhwIjoxNjI5MzYwNjY4LCJlbWFpbCI6IiJ9.7Z"

}
```

 The refresh token is used to get a new access token when the access token expires.The ascess token is send in every request where authentication class determines which user is making the request while permission class determines whether the user is allowed to make the request or not.if not allowed then it will return 403 forbidden.

 ### Problem In it:
 `TokenObtainPairView` will always user username and password to generate the token but in some cases we need to use email and password to generate the token so we can create our own view to generate the token.so if we have  custom user model and authentication then we can create our own view to generate the token.

```python 
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import serializers
class TokenSerializer(serializer.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(max_length=100)

class GetToken(APIView):
    def post(self, request):
        credentials = TokenSerializer(data=request.data)
        if(credentials.is_valid()):
            user = authenticate(email=credentials.validated_data['email'], password=credentials.validated_data['password'])
            if user is not None:
                refresh = RefreshToken.for_user(user)
                return Response({
                    'refresh': str(refresh),
                    'access': str(refresh.access_token)
                })
            else:
                return Response({
                    'error': 'Invalid Credentials'
                })
        else:
            return Response({
                'error': 'Invalid Data'
            })
```

## Using Refresh Token
If the ascess token is expired then we can use the refresh token to get the new access token.
```python
from rest_framework_simplejwt.views import TokenRefreshView
urlpatterns = [
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]
```

```json
{
 "refresh": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoyLCJ1c2VybmFtZSI6ImFkbWluIiwiZXhwIjoxNjI5MzYwNjY4LCJlbWFpbCI6IiJ9.7Z"
 }
 ```
The request on `/api/token/refresh/` will return a response like this:

```json
{
    "access": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoyLCJ1c2VybmFtZSI6ImFkbWluIiwiZXhwIjoxNjI5MzYwNjY4LCJlbWFpbCI6IiJ9.7Z"
}
```

## Verifying Tokens

To verify a token, you can use the `TokenVerifyView` view. This view will verify a token and return a response.

```python
from rest_framework_simplejwt.views import TokenVerifyView
urlpatterns = [
    path('api/token/verify/', TokenVerifyView.as_view(), name='token_verify'),
]
```


## Backlisting the token
First  add the blacklist app to your installed apps:
```python
INSTALLED_APPS = [
    ...
    'rest_framework_simplejwt.token_blacklist',
]
```
Then run python manage.py migrate to create the necessary database tables.

Then to backlist token you can use .blacklist() method of the token object.
```python
from rest_framework_simplejwt.views import APIView
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
class LogoutView(APIView):
    def post(self, request):
        try:
            refresh_token = request.data.get['refresh']
            token = RefreshToken(refresh_token)
            token.blacklist()
            return Response({'message': 'Token blacklisted'})
        except Exception as e:
            return Response({'error': str(e)})
```

else you can use the `TokenBlacklistView` view to blacklist the token.

```python
from rest_framework_simplejwt.views import TokenBlacklistView
urlpatterns = [
    path('api/token/blacklist/', TokenBlacklistView.as_view(), name='token_blacklist'),
    # Add any other urlpatterns here if needed
]
```
This is specifically for blacklisting the token. when the same token won't be used again.and used to logout the user.

## How to send token in request for authentication and authorization
suppose the route `/api/shop` is protected by authentication and authorization then we have to send the token in the request header.
```python
Authorization : Bearer <token>
json
{
    "name": "book",
    "price": 100
}
```

## Some Expiration settings
```python
SIMPLE_JWT = {"ACCESS_TOKEN_LIFETIME": timedelta(minutes=5),
    "REFRESH_TOKEN_LIFETIME": timedelta(days=1),
}
```
This will set the access token lifetime to 5 minutes and the refresh token lifetime to 1 day.


## Sending the important data using jwt in drf

Normally for obtaining a token in Django Rest Framework, you would use the `TokenObtainPairView` from the `rest_framework_simplejwt` package. Below is an example of how to set up the URL configuration for obtaining a JWT token.
```python
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

url_patterns = [
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
]
```

This will allow you to obtain a JWT token by sending a POST request to `/api/token/` with the user's credentials (username and password).
```json
{
    "username": "your_username",
    "password": "your_password"
}
```

```json
{
    "refresh": "your_refresh_token",
    "access": "your_access_token"
}
```

when you decode the JWT token, you get the following data:
```json
{
    "user_id": 1,
    "username": "your_username",
    "exp": 1700000000,
    "iat": 1700000000
}
```


If you want to send additional data in the JWT token, do like this:
```python
#import refresh tokem
from rest_framework_simplejwt.token import RefreshToken
from rest_framework.views import APIView

class TokenView(APIView):
    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')  
        #Note you can use serializers to validate the request data
        user = authenticate(username=username, password=password)
        if user is not None:
            refresh = RefreshToken.for_user(user)
            # Add custom claims
            refresh['role'] = user.username.role
            return Response({
                'refresh': str(refresh),
                'access': str(refresh.access_token),
            })
        return Response({'error': 'Invalid credentials'}, status=400)
```

This will add the `user_id` and `username` to the JWT token, which can be accessed when decoding the token.
````json
{
    "username": "your_username",
    "password": "your_password"
}
```

will return:
```json
{
    "refresh": "your_refresh_token",
    "access": "your_access_token"
}
```

And when you decode the JWT token, you will get:
```json
{
    "user_id": 1,
    "username": "your_username",
    "exp": 1700000000,
    "iat": 1700000000,
    "role": "your_user_role"
}
```







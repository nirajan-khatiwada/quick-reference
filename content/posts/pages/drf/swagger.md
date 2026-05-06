---
title: "DRF Swagger Documentation with drf-spectacular"
slug: "drf-swagger-documentation-drf-spectacular"
date: 2025-01-13
description: "Learn how to generate API schema and interactive Swagger documentation in Django REST Framework using drf-spectacular."
showToc: true
weight: 9
series: ["Django REST Framework"]
categories: ["Django REST Framework"]
tags: ["Django", "Python", "DRF", "Swagger", "OpenAPI", "drf-spectacular", "API Schema", "Documentation"]
summary: "Step-by-step guide to integrating drf-spectacular in DRF for generating OpenAPI schema and interactive Swagger UI documentation."
images: ["/images/drf-swagger.png"]
---



# Generating Schema and Documentation in DRF using Swagger
Generating API documentation is crucial for any web application, and Django Rest Framework (DRF) provides excellent support for this through tools like Swagger. In this guide, we will explore how to implement Swagger in a DRF project to generate interactive API documentation.


## Step 1: Install Required Packages
At first, you need to install the necessary packages. You can use `drf-spectacular`, which is a popular package for generating Swagger documentation in DRF.

```bash
pip install drf-spectacular
```

## Step 2: Add to Installed Apps
Next, add `drf_spectacular` to your `INSTALLED_APPS` in the Django settings file.

```python
INSTALLED_APPS = [
    ...
    'drf_spectacular',
]
```


## Step 3: Configure DRF Settings
Now, you need to configure the DRF settings to use `drf-spectacular` as the default schema generator. Add the following lines to your settings file:

```python
REST_FRAMEWORK = {
    ...
    'DEFAULT_SCHEMA_CLASS': 'drf_spectacular.openapi.AutoSchema',
}
```

This is telling DRF to use `drf-spectacular` for generating the API schema.

## Step 4: Create Schema View
Next, you need to create a view that will serve the generated schema. You can do this by adding the following code to your `urls.py`:

```python
from drf_spectacular.views import SpectacularAPIView, SpectacularSwaggerView
urlpatterns = [
    ...
    path('api/schema/', SpectacularAPIView.as_view(), name='schema'),
    path('api/docs/', SpectacularSwaggerView.as_view(url_name='schema'), name='swagger-ui'),
]
```

In this code, we are creating two endpoints: one for the schema (`/api/schema/`) and another for the Swagger UI documentation (`/api/docs/`).

## Step 5: Access the Documentation
Now, you can run your Django server and access the Swagger UI documentation by navigating to `http://localhost:8000/api/docs/`. You should see an interactive interface that allows you to explore your API endpoints, view request and response formats, and even test the endpoints directly from the documentation.

But without `extend_schema` you will not be able to see the details of the API endpoints in the documentation. To include detailed information about your API endpoints, you can use the `extend_schema` decorator from `drf-spectacular`. This allows you to add additional metadata to your views, which will be reflected in the generated documentation.


## Step 6: Use `extend_schema` for Detailed Documentation
To add detailed information about your API endpoints, you can use the `extend_schema` decorator.Parameter accepted by the `extend_schema` decorator include `summary`, `description`, `request`, and `responses` and `parameters`. Here’s an example of how to use it in a view:

- summary: A brief summary of what the endpoint does.
```python
@extend_schema(summary="Create a new user")
```
- description: A detailed description of the endpoint's functionality.
```python
@extend_schema(description="This endpoint allows you to create a new user by providing the necessary details such as username, email, and password.")
```
- request: The expected request body for the endpoint.
```python
@extend_schema(request=UserSerializer)
```
- responses: The expected responses from the endpoint, including status codes and response bodies.
```python
@extend_schema(responses={201: UserSerializer, 400: 'Bad Request'})
```
- parameters: The query parameters or path parameters accepted by the endpoint.
```python
@extend_schema(parameters=[OpenApiParameter(name='id', description='ID of the user', required=True, type=int)])
```
another technique is to use serializers :
```python
from drf_spectacular.utils import extend_schema
class UserDataSerializer(serializers.Serializer):
    username = serializers.CharField()
    email = serializers.EmailField()
    password = serializers.CharField()
@extend_schema(parameters=[UserDataSerializer])
```

## Step 7: Combining all together
Here’s how you can combine all the above techniques to create a well-documented API endpoint:

```python
from rest_framework.views import APIView
from drf_spectacular.utils import extend_schema,OpenApiParameter
from .serializers import UserSerializer
class UserView(APIView):
    @extend_schema(
        summary="Create a new user",
        description="This endpoint allows you to create a new user by providing the necessary details such as username, email, and password.",
        request=UserSerializer,
        responses={201: UserSerializer, 400: 'Bad Request'},
    )
    def post(self, request):
        # Your logic to create a new user
        pass
    
    @extend_schema(
        summary="Retrieve user data",
        description="This endpoint allows you to retrieve user data by providing the user ID.",
        responses={200: UserSerializer, 404: 'Not Found'},
        parameters=[OpenApiParameter(name='id', description='ID of the user', required=True, type=int)]
    )
    def get(self, request):
        # Your logic to retrieve user data
        pass
 


    
```




### Step 8: Setting up Metadata for API Documentation
You can also customize the appearance of the Swagger UI by providing additional settings in your Django settings file. For example, you can set the title and description of your API documentation:

```python
SPECTACULAR_SETTINGS = {
    'TITLE': 'My API',
    'DESCRIPTION': 'This is the API documentation for my Django REST Framework project.',
    'VERSION': '1.0.0',
}
```

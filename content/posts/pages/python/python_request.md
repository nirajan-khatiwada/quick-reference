---
title: "Python Fundamentals: Understanding request (Part 8)"
date: 2024-11-14
description: "Learn about request package in python."
showToc: true
categories: ["Python"]
tags: ["Python", "Programming", "request", "Tutorial"]
summary: "An in-depth exploration of Python request."
images: ["/images/python.png"]
---

# Python Fundamentals: Understanding request
In this guide, we will explore request package in python. This package is used to make HTTP requests in python. Let's dive in!

## 1. Python request
Python request is a simple and elegant HTTP library for Python. It provides methods for sending HTTP requests and handling the responses. The requests library allows you to send HTTP requests using a simple and intuitive API, and it also provides support for handling cookies, sessions, and authentication.

### 1.1. Installing requests
To use the requests library in your Python project, you need to install it using pip. You can install the requests library by running the following command in your terminal:

```bash
pip install requests
```

### 1.2. Types of requests
The requests library supports various types of HTTP requests, including GET, POST, PUT, DELETE, and more. You can use these methods to interact with web services and APIs.

Example:
```python
import requests

# Send a GET request
response = requests.get('https://api.github.com')

# Send a POST request
response = requests.post('https://httpbin.org/post')

# Send a PUT request
response = requests.put('https://httpbin.org/put')

# Send a DELETE request
response = requests.delete('https://httpbin.org/delete')
```


### 1.3 Parameters for requests
The requests library allows you to pass various parameters when making HTTP requests. These parameters include headers, query parameters, request body, and more.

- Headers: You can pass custom headers in your request using the `headers` parameter.
Example:
```python
import requests
# Send a GET request with custom headers
headers = {'User-Agent': 'Mozilla/5.0'}
response = requests.get('https://api.github.com', headers=headers)
# Send a POST request with custom headers
response = requests.post('https://httpbin.org/post', headers=headers)
#similarly for PUT and DELETE
```

- cookie: You can pass cookies in your request using the `cookies` parameter.
Example:
```python
import requests
# Send a GET request with cookies
cookies = {'session_id': '12345'}
response = requests.get('https://api.github.com', cookies=cookies)
# Send a POST request with cookies
response = requests.post('https://httpbin.org/post', cookies=cookies)
#similarly for PUT and DELETE
```



- file: You can upload files in your request using the `files` parameter.
Example:
```python
import requests
# Upload a file in a POST request
files = {'file': open('file.txt', 'rb')}
response = requests.post('https://httpbin.org/post', files=files)
#similarly for PUT and DELETE
```


- params: You can pass query parameters in your request using the `params` parameter.
Example:
```python
import requests
# Send a GET request with query parameters
params = {'key1': 'value1', 'key2': 'value2'}
response = requests.get('https://api.github.com', params=params)
# Send a POST request with query parameters
response = requests.post('https://httpbin.org/post', params=params)
#similarly for PUT and DELETE
```

- data: You can pass data in your request body using the `data` parameter.
Example:
```python
import requests
# Send a POST request with data
data = {'key1': 'value1', 'key2': 'value2'}
response = requests.post('https://httpbin.org/post', data=data)
#similarly for PUT and DELETE
```

- json: You can pass JSON data in your request body using the `json` parameter.
Example:
```python
import requests
# Send a POST request with JSON data
data = {'key1': 'value1', 'key2': 'value2'}
response = requests.post('https://httpbin.org/post', json=data)
#similarly for PUT and DELETE
```


> Note: The requests library provides a wide range of parameters and options for making HTTP requests. You can refer to the official documentation for more details.
>> ** Note ** : While using json it will automatically set the content type to application/json and dump the data to json format but while using data it will set the content type to application/x-www-form-urlencoded and encode the data to urlencoded format.

### 1.4. Handling responses
The requests library provides methods for handling the responses returned by HTTP requests. You can access the response content, status code, headers, and more.

- Response content: You can access the response content using the `text` attribute.
Example:
```python
import requests
# Send a GET request
response = requests.get('https://api.github.com')
# Get the response content
content = response.text
print(content)
```

- Response Content in bytes: You can access the response content in bytes using the `content` attribute.
Example:
```python
import requests
# Send a GET request
response = requests.get('https://api.github.com')
# Get the response content in bytes
content = response.content
print(content)
```

- json: You can access the response content as JSON using the `json` method.

Example:
```python
import requests
# Send a GET request
response = requests.get('https://api.github.com')
# Get the response content as JSON
data = response.json()
print(data)
```

- Status code: You can access the response status code using the `status_code` attribute.
Example:
```python
import requests
# Send a GET request
response = requests.get('https://api.github.com')
# Get the response status code
status_code = response.status_code
print(status_code)
```

- Headers: You can access the response headers using the `headers` attribute.
Example:
```python
import requests
# Send a GET request
response = requests.get('https://api.github.com')
# Get the response headers
headers = response.headers
print(headers)
```

- Cookies: You can access the response cookies using the `cookies` attribute.
Example:
```python
import requests
# Send a GET request
response = requests.get('https://api.github.com')
# Get the response cookies
cookies = response.cookies
print(cookies)
```




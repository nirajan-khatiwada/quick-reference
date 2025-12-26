---
title: "Celery & Django: The Complete Asynchronous Task Guide"
slug: "django-celery-asynchronous-tasks-guide"
date: 2025-12-16
description: "Master Celery with Django: Asynchronous tasks, workers, brokers (Redis/RabbitMQ), Celery Beat for periodic jobs, and result backends."
showToc: true
weight: 1
series: ["Celery"]
categories: ["Celery", "Django"]
tags: ["Celery", "Django", "Asynchronous Tasks", "Redis", "Task Queue"]
summary: "Complete reference for integrating Celery into Django. Learn architecture, worker configuration, periodic tasks, and real-time monitoring."
images: ["/images/celery/archi.png"]
---


# Celery

Celery is an asynchronous task queue/job queue based on distributed message passing. It is focused on real-time operation but also supports scheduling. The execution units, called tasks, are executed concurrently on one or more worker nodes using multiprocessing, Eventlet, or gevent. Tasks can execute asynchronously (in the background) or synchronously (wait until ready).

## Key Features

- **Asynchronous Task Queue**: Celery allows you to run tasks in the background, freeing up your main application to handle other requests.
- **Distributed**: Celery can distribute tasks across multiple worker nodes, allowing for scalability and fault tolerance.
- **Supports Multiple Brokers**: Celery supports various message brokers like RabbitMQ, Redis, and others to facilitate communication between the main application and worker nodes.
- **Scheduling**: Celery includes a built-in scheduler called Celery Beat, which allows you to schedule tasks to run at specific intervals.
- **Extensible**: Celery is highly extensible and can be customized to fit specific use cases.

## Common Use Cases

- **Background Processing**: Offloading time-consuming tasks such as sending emails, processing images, or generating reports to the background.
- **Periodic Tasks**: Running tasks at regular intervals, such as cleaning up databases or sending reminders.
- **Real-time Processing**: Handling real-time data processing tasks, such as processing user uploads or streaming data.

## Concept of worker,task,message broker,result backend

- **Worker**: A worker is a process that runs in the background and listens for tasks to execute. Workers can be distributed across multiple machines to handle a large number of tasks concurrently.
- **Task**: A task is a unit of work that is executed by a worker. Tasks are defined in the main application and can be called asynchronously or synchronously.
- **Message Broker**: A message broker is a middleware that facilitates communication between the main application and worker nodes. It queues tasks and delivers them to workers for execution. Common message brokers used with Celery include RabbitMQ and Redis.
- **Result Backend**: The result backend is a storage system where the results of executed tasks are stored. This allows the main application to retrieve the results of tasks after they have been completed. Common result backends include databases, Redis, and others.

## How Celery Works:

For now, the main application (Django) will create tasks and send them to the message broker. The message broker queues these tasks, and worker nodes then pick them up for execution. Once a task is completed, the result is stored in the result backend, from where it can be retrieved by the main application when needed.
![Celery Architecture](/images/celery/archi.png)

## Workers in Celery

**_Starting Celery Workers_**

To start a Celery worker, use the following command:

```bash
celery -A your_project_name worker -l info
```

A Celery worker consists of **one or more independent worker processes** that run concurrently to execute tasks. Each worker process **dequeues tasks from the message broker and executes them one at a time**.

This means that:

- If a worker is running with **4 worker processes**, it can execute **up to 4 tasks simultaneously**.

---

![Celery Worker Processes](/images/celery/concurrency.jpg)

**_Setting Worker Concurrency_**

You can explicitly control the number of worker processes by using the `--concurrency` option:

```bash
celery -A your_project_name worker -l info --concurrency=4
```

This command starts a Celery worker with **4 concurrent worker processes**, allowing it to process **up to 4 tasks at the same time**.

> **Note:** It is generally recommended to set the concurrency level **equal to or slightly lower than the number of available CPU cores** to avoid overloading the system.

> **Note** : Task are distributed to worker processes in a round-robin fashion. This means that if you have multiple worker processes, tasks will be assigned to them in a rotating manner to ensure an even distribution of workload.

## Pool in Celery

Pool in celery is used to define wheather we want to use threads or processes or asyncio for executing tasks in the worker.

The type of pool in Celery are:

- **prefork**: This is the default pool implementation in Celery. It uses the `multiprocessing` module to create separate processes for each worker process. Each worker process can handle one task at a time. This pool type is suitable for CPU-bound tasks and provides good isolation between tasks.
  Implementation:

```bash
celery -A your_project_name worker -l info --pool=prefork
```

Also we can set the number of processes using `--concurrency` option.

```bash
celery -A your_project_name worker -l info --pool=prefork --concurrency=4
```

> **Note**: By default, Celery sets the concurrency to the number of CPU cores available on the machine.

- **Threads**: This pool implementation uses threads to handle tasks. Each worker process in worker is implemented as a thread. This pool type is suitable for I/O-bound tasks that involve waiting for external resources, such as network requests or database operations.
  Implementation:

```bash
celery -A your_project_name worker -l info --pool=threads
```

Also we can set the number of threads using `--concurrency` option.

```bash
celery -A your_project_name worker -l info --pool=threads --concurrency=10
```

> Note: Since we are using threads, the number of threads can be set higher than the number of CPU cores.

- **Solo**
  In solo one worker consist of single worker process which means only one task can be executed at a time. This pool type is mainly used for debugging purposes and is not recommended for production use.This automatically sets concurrency to 1.

Implementation:

```bash
celery -A your_project_name worker -l info --pool=solo
```

- **Gevent**: This pool implementation uses greenlets provided by the `gevent` library to handle tasks which means each worker process is implemented as a greenlet. This pool type is suitable for I/O-bound tasks and provides lightweight concurrency . Greenlets are lightweight than threads .

Implementation:

```bash
celery -A your_project_name worker -l info --pool=gevent
```

Also we can set the number of greenlets using `--concurrency` option.

```bash
celery -A your_project_name worker -l info --pool=gevent --concurrency=100
```

> Note: Since we are using greenlets, the number of greenlets can be set much higher than the number of CPU cores.

- **Eventlet**:This is similar to gevent pool implementation but it uses `eventlet` library to handle tasks. Each worker process is implemented as a green thread provided by eventlet. This pool type is suitable for I/O-bound tasks and provides lightweight concurrency.

Implementation:

```bash
celery -A your_project_name worker -l info --pool=eventlet
```

Also we can set the number of green threads using `--concurrency` option.

```bash
celery -A your_project_name worker -l info --pool=eventlet --concurrency=100
```

## Implementation of django celery

To implement Celery in a Django project, follow these steps:

- Install Celery and a message broker (e.g., Redis or RabbitMQ) using pip:

```bash
pip install celery redis
```

> Note: redis is used as message broker in this tutorial so we are installing redis package.

- Create a new file named `celery.py` in your Django project directory (the same directory as `settings.py`) and add the following code:

```python
    import os
    from celery import Celery

    # Set the default Django settings module for the 'celery' program.
    os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'your_project_name.settings')
    app = Celery('your_project_name')

    # Using a string here means the worker doesn't have to serialize
    # the configuration object to child processes.
    # - namespace='CELERY' means all celery-related configuration keys
    #   should have a `CELERY_` prefix.
    app.config_from_object('django.conf:settings', namespace='CELERY')

    # Load task modules from all registered Django apps.
    app.autodiscover_tasks()
```

- In your Django project's `__init__.py` file, add the following code to ensure that the Celery app is loaded when Django starts:

```python
from .celery import app as celery_app
__all__ = ('celery_app',)
```

## Setting Celery
- timezone
In your Django settings file (`settings.py`), add the following Celery configuration:
```python
CELERY_TIMEZONE = 'Asia/Kathmandu'  # Set your desired timezone
```

- Broker URL:
```python
CELERY_BROKER_URL = 'redis://localhost:6379/0'  # Using Redis as the message broker
```
This configuration sets the broker URL to use Redis running on `localhost` at port `6379`, using database `0`.


## Task in celery
A task is a unit of work that can be executed asynchronously by a Celery worker. Tasks are defined as Python functions and are decorated with the `@shared_task` decorator provided by Celery. 

Steps:
- Create a new file named `tasks.py` in one of your Django apps (e.g., `your_app`).
- Define a task using the `@shared_task` decorator:

Example:

```python
from celery import shared_task
@shared_task
def add(x, y):
    return x + y
```


## Functions used to enqueue tasks in Queue 

- `apply_async()`: This function is used to call a Celery task asynchronously. It adds the task to the message broker's queue which will be picked up by a worker for execution.

Parameters:
- `args`: A list of positional arguments to pass to the task
- `kwargs`: A dictionary of keyword arguments to pass to the task
- `countdown`: Number of seconds to wait before executing the task
- `expires`: How many second the task will wait in the queue before it gets expired.

> It returns an `AsyncResult` instance that can be used to track the status and result of the task.


Example:

```python
from your_app.tasks import your_task
result = your_task.apply_async(args=[arg1, arg2],kwargs={'key': 'value'},countdown=10,expires=60)
```



- `delay()`: This function is a shortcut to call a Celery task asynchronously with only positional arguments. It is equivalent to calling `apply_async()` with just the `args` parameter.
Example:
```python
from your_app.tasks import your_task
result = your_task.delay(arg1, arg2,keyword_arg='value')
```
> It returns an `AsyncResult` instance that can be used to track the status and result of the task.We will see about AsyncResult object in Result Backend section.




## Realtime Example of Celery with Django

Let's implement a simple example of using Celery with Django to send an email asynchronously.
1. First, make sure you have Django, Celery, and a message broker (like Redis) installed.
2. Configure Celery in your Django project as described in the previous sections.
3. Add the message broker URL in your `settings.py` file:
4. Create a task to send an email in `tasks.py` of one of your Django apps:

```python
from celery import shared_task
from django.core.mail import send_mail
@shared_task
def send_welcome_email(user_email,message,subject):
    res=send_mail(
        subject,
        message,
        from_email='you@example.com',
        recipient_list=[user_email],
        fail_silently=False,
    )
    return res
```

In Views.py file of the same app, call the task asynchronously when a user registers:

```python
from rest_framework.views import APIView
from .tasks import send_welcome_email
from rest_framework.response import Response

class RegisterUserView(APIView):
    def post(self, request):
        # Simulate user registration logic here
        user_email = request.data.get('email')
        message = "Welcome to our platform!"
        subject = "Welcome Email"
        # Call the Celery task to send the welcome email asynchronously
        send_welcome_email.delay(user_email,message,subject)
        return Response({"message": "User registered successfully. A welcome email will be sent shortly."})
```


Then we can start the celery worker using the command:

```bash
celery -A your_project_name worker -l info
```


How it works:
For every post request to the RegisterUserView, a new user is registered, and the `send_welcome_email` task is enqueued into the message broker and response is sent back to the user immediately without waiting for the email to be sent. The Celery worker picks up the task from the message broker and sends the email in the background as shown below:
![Celery Email Example](/images/celery/email.svg)


## Task Result Backend
Upto now we have discussed about sending tasks to the message broker and executing them using workers. But what if we want to get the result of a task after it has been executed? This is where the task result backend comes into play which means a storage system where the results of executed tasks are stored. This allows the main application to retrieve the results of tasks after they have been completed.

To configure a result backend in Celery, you need to add the following configuration to your Django `settings.py` file:

```python
CELERY_RESULT_BACKEND = 'redis://localhost:6379/1'  # Using Redis as the result backend
```
This configuration sets the result backend to use Redis running on `localhost` at port `6379`, using database `1` to store task results.



### AsyncResult object: 
When a task is enqueued using delay() or apply_async(), Celery returns an AsyncResult instance. This object allows you to track the task’s execution state, check whether it has completed, retrieve the result, or handle failures once the task finishes.Also, we can use AsyncResult to get the AsyncResult object of a task using its task id.

Example of getting AsyncResult object using task id:
```python
from celery.result import AsyncResult
result = AsyncResult('task_id_here')
```

Example of getting AsyncResult object using delay() function:
```python
from your_app.tasks import your_task
result = your_task.delay(arg1, arg2)
```

The AsyncResult object provides several useful  properties:

- `result`: This property returns the result of the task if it has been completed successfully. If the task is still pending or has failed, it will return `None`.

Example:
```python
result_value = result.result  # Will be None if task is not completed
```

- `state`: This property returns the current state of the task. Common states include `PENDING`, `STARTED`, `SUCCESS`, `FAILURE`, etc.

Example:
```python
task_state = result.state  # e.g., 'PENDING', 'SUCCESS', etc.
```

Result:
- `PENDING`: The task is waiting to be executed.
- `STARTED`: The task has started executing.
- `SUCCESS`: The task has completed successfully.
- `FAILURE`: The task has failed during execution.
- `RETRY`: The task is being retried after a failure.

> `state` and `status` are same.

- `id`: This property returns the unique identifier of the task. You can use this ID to track the task or retrieve its result later.
Example:
```python
task_id = result.id  # Unique identifier of the task
```
> `id` and `task_id` are same.


Moreover, the `AsyncResult` object provides several useful methods:
- `ready()`: This method returns `True` if the task has completed (either successfully or with failure), and `False` otherwise.
Example:
```python
is_ready = result.ready()  # True if task is completed
```

- `successful()`: This method returns `True` if the task has completed successfully, and `False` otherwise.
Example:
```python
is_successful = result.successful()  # True if task completed successfully
```


- `failed()`: This method returns `True` if the task has failed, and `False` otherwise.
Example:
```python
is_failed = result.failed()  # True if task has failed
```

- `get()`:Retrieves the result of the task.if the task is still running or hasnt started yet, this method will block until the task is completed and the result is available.
Example:
```python
task_result = result.get()  # Blocks until the task is completed and returns the result
```


> Note: if a task consist of return statement then only we can get the result of that task using AsyncResult object.i.e return value of the task function is stored in the result backend and we can retrieve it using AsyncResult object.



## Using Concept of Backend Result and AsyncResult Object to Get Task Result in Django View

```python
from rest_framework.views import APIView
from .tasks import add
from celery.result import AsyncResult
from rest_framework.response import Response
class AddNumbersView(APIView):
    def post(self, request):
        # Get numbers from the request data
        num1 = request.data.get('num1')
        num2 = request.data.get('num2')

        # Enqueue the add task asynchronously
        result = add.delay(num1, num2)

        # Return the task ID to the client
        return Response({"task_id": result.id})

class GetTaskResultView(APIView):
    def get(self, request, task_id):
        # Retrieve the AsyncResult object using the task ID
        result = AsyncResult(task_id)
        # Check the state of the task and return appropriate response
        if result.state == 'PENDING':
            return Response({"status": "Task is still pending."})
        elif result.state == 'STARTED':
            return Response({"status": "Task has started."})
        elif result.state == 'SUCCESS':
            return Response({"status": "Task completed successfully.", "result": result.result})
        elif result.state == 'FAILURE':
            return Response({"status": "Task failed.", "error": str(result.result)})
        else:
            return Response({"status": f"Task is in {result.state} state."})
```


```python
# In urls.py
from django.urls import path
from .views import AddNumbersView, GetTaskResultView
urlpatterns = [
    path('add-numbers/', AddNumbersView.as_view(), name='add-numbers'),
    path('task-result/<str:task_id>/', GetTaskResultView.as_view(), name='task-result'),
]
```


How it works:
1. The `AddNumbersView` accepts a POST request with two numbers (`num1` and `num2`). It enqueues the `add` task asynchronously using `add.delay(num1, num2)` and returns the task ID to the client.
2. Client poll the `GetTaskResultView` with the task ID to check the status of the task. The view retrieves the `AsyncResult` object using the task ID and checks its state and returns the appropriate response based on whether the task is still pending, has started, completed successfully, or failed.if completed successfully, it also returns the result of the addition.

> Note: Data stored in the Celery result backend is not persistent For example, when Redis is used as the result backend, task results may expire after a certain period based on Redis settings. Therefore, if results need to be stored for longer or accessed later, they should be saved in the database using Django models

We can see the flow of the above implementation in the diagram below:
![Celery Task Result Flow](/images/celery/result_backend.svg)



## Another Approch : Using Django Channes and AsyncResult to Get Task Result in Real-time
In previous section we first enqueue the task and return the task id to the client.Then client poll the server with the task id to get the status and result of the task.But in this approch we will use django channels to send the status and result of the task to the client in real-time without polling.
1. First client send a request to enqueue the task using django rest framework api.
2. Server enqueue the task and return the task id to the client.
3. Client use the task id to subscribe to a WebSocket channel using django channels.
4. Server use the AsyncResult object to track the status of the task and send updates to the client via the WebSocket channel.



## CELERY BEAT: The Periodic Task Scheduler
CELERY BEAT is a built-in scheduler in Celery that allows you to schedule tasks to run at specific intervals or times. It works by periodically sending tasks to the message broker, which are then picked up by Celery workers for execution.

To use CELERY BEAT in your Django project, follow these steps:
1. Create a task that you want to schedule in `tasks.py` of one of your Django apps:
Example:
```python
from celery import shared_task
@shared_task
def my_periodic_task(a,b):
    print("This task runs periodically!")

```

2.Configure CELERY BEAT in your Django `settings.py` file by adding the following configuration:
```python
CELERY_BEAT_SCHEDULE = {
    'run-my-periodic-task-every-minute': {
        'task': 'your_app.tasks.my_periodic_task',
        'schedule': 60.0,  # Run every 60 seconds,
        'args': (10,20),  # Arguments to pass to the task
    },
}
```

3. Start the CELERY BEAT scheduler along with the Celery worker using the following command:
 - start the celery worker:
```bash
celery -A your_project_name worker -l info
```

- start the celery beat:
```bash
celery -A your_project_name beat -l info
```





### Types of Schedules in CELERY BEAT

- **Fixed Interval Schedule**: This schedule type allows you to run tasks at fixed intervals, such as every 10 seconds, every minute, or every hour. You can specify the interval in seconds using the `schedule` parameter.
Example:
```python
CELERY_BEAT_SCHEDULE = {
    'run-every-10-seconds': {
        'task': 'your_app.tasks.my_periodic_task',
        'schedule': 10.0,  # Run every 10 seconds
    },
}
```

- **Crontab Schedule**: 
follow the documentation for more details.
[Crontab Schedule](https://docs.celeryq.dev/en/stable/userguide/periodic-tasks.html#crontab-schedules)

- **Solar Schedule**:
follow the documentation for more details.
[Solar Schedule](https://docs.celeryq.dev/en/stable/userguide/periodic-tasks.html#solar-schedules)


### Use Celery Beat to Send Email If a user has birthday Today
1. Create a task to send birthday email in `tasks.py` of one of your Django apps:

```python
from celery import shared_task
from django.core.mail import send_mail
from django.utils import timezone
from django.conf import settings
from django.contrib.auth import get_user_model

User = get_user_model()

@shared_task
def send_birthday_emails():
    today = timezone.now().date()

    users_with_birthday_today = User.objects.filter(
        birthday__month=today.month,
        birthday__day=today.day
    )

    for user in users_with_birthday_today:
        if user.email:
            send_mail(
                subject='Happy Birthday ',
                message=f'Hi {user.first_name},\n\nWishing you a very happy birthday! \n\nHave a great day!',
                from_email=settings.DEFAULT_FROM_EMAIL,
                recipient_list=[user.email],
                fail_silently=False,
            )

    return f"Sent birthday emails to {users_with_birthday_today.count()} users"
```

2. Configure CELERY BEAT in your Django `settings.py` file to schedule the `send_birthday_emails` task to run daily at a specific time (e.g., 8:00 AM):
```python
from celery.schedules import crontab
CELERY_BEAT_SCHEDULE = {
    'send-birthday-emails-every-day-at-8am': {
        'task': 'your_app.tasks.send_birthday_emails',
        'schedule': crontab(hour=8, minute=0),  # Run daily at 8:00 AM
    },
}
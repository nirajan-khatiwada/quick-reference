---
title: "Docker Compose Documentation"
date: 2024-10-18
description: "A comprehensive guide on Docker Compose for managing multi-container Docker applications."
ShowToc: true
categories: ["Docker"]
tags: ["Docker", "Compose", "Guide"]
summary: "Learn how to define and manage services in Docker Compose."
images: ["/images/docker-compose.png"]  # For social share
---

# Docker Compose Documentation

## Introduction
Docker Compose is a tool for defining and running multi-container Docker applications. With Docker Compose, you can use a YAML file to configure your application's services and create and start all the services from your configuration with a single command.

## Basic docker-compose.yml Structure
The `docker-compose.yml` file is where you define the services that make up your app. A typical file might look like this:

```yaml
version: '3.8'
services:
  service_name:
    image: image_name:tag
    ports:
      - "host_port:container_port"
    environment:
      - ENV_VAR=value
    volumes:
      - "host_path:container_path"
    depends_on:
      - dependency_service
```

## Example Configurations

### Example 1: Basic Setup with PostgreSQL and Redis
```yaml
version: '3.8'
services:
  postgres:
    image: postgres
    ports:
      - "5432:5432"
    environment:
      POSTGRES_USER: postgres
      POSTGRES_DB: review
      POSTGRES_PASSWORD: password

  redis:
    image: redis
    ports:
      - "80:80"
```

### Example 2: Real-World Application
```yaml
version: '3'
services:
  pythonapp:
    image: your-python-image:tag
    ports:
      - "8000:8000"
    volumes:
      - /Users/data:/src/bin/data
    depends_on:
      - db
      - redis

  db:
    image: postgres
    environment:
      POSTGRES_DB: mydatabase
      POSTGRES_USER: myuser
      POSTGRES_PASSWORD: mypassword

  redis:
    image: redis
    volumes:
      - /path/to/local/directory:/data
```

### Example 3: Building from Dockerfile
```yaml
version: '3'
services:
  pythonapp:
    build:
      context: .
      dockerfile: Dockerfile
    ports:
      - "8000:8000"
    volumes:
      - /Users/desktop:/src/bin/desktop
    depends_on:
      - db
      - redis

  db:
    image: postgres
    environment:
      POSTGRES_DB: mydatabase
      POSTGRES_USER: myuser
      POSTGRES_PASSWORD: mypassword

  redis:
    image: redis
    volumes:
      - /path/to/local/directory:/data
```

### Example 4: Django Application with PostgreSQL and Redis
```yaml
version: '3.8'
services:
  django-app:
    container_name: django-app
    image: django-app:latest  # Replace with your actual Django image name/tag
    ports:
      - "8000:8000"  # Expose Django app on port 8000
    environment:
      - DEBUG=1  # Set Django debug mode to 1 for development
      - POSTGRES_HOST=postgres  # PostgreSQL host
      - POSTGRES_DB_NAME=nirajan  # PostgreSQL database name
      - POSTGRES_DB_PASSWORD=nirajan@9845  # PostgreSQL database password
      - REDIS_URL=redis://redis:6379/0  # Redis URL
    depends_on:
      - postgres
      - redis
    volumes:
      - static_volume:/code/static  # Volume for Django static files
      - media_volume:/code/media  # Volume for Django media files

  postgres:
    container_name: postgres
    image: postgres:latest
    environment:
      POSTGRES_DB: nirajan  # Database name
      POSTGRES_USER: nirajan  # Database username
      POSTGRES_PASSWORD: nirajan@9845  # Database password
    volumes:
      - postgres_data:/var/lib/postgresql/data

  redis:
    container_name: redis
    image: redis:latest
    ports:
      - "6379:6379"
```

## Service Names as Hostnames
In Docker Compose, the names of the services defined in the `docker-compose.yml` file are used as hostnames for inter-service communication.

### Service Names as Hostnames
Each service name in the `docker-compose.yml` file acts as a hostname for that service. For example, in the configuration above:
- The `django-app` service can connect to the `postgres` service using `POSTGRES_HOST=postgres`.
- The `django-app` service can connect to the `redis` service using `REDIS_URL=redis://redis:6379/0`.

### Example
In the `django-app` service:
- PostgreSQL Host: `POSTGRES_HOST=postgres` — The Django app connects to the PostgreSQL service using the hostname `postgres`, which matches the name of the PostgreSQL service defined in Docker Compose.
- Redis Host: `REDIS_URL=redis://redis:6379/0` — The Django app connects to the Redis service using the hostname `redis`, which matches the name of the Redis service defined in Docker Compose.

> **Note:** In Docker, services within a Docker Compose setup are typically connected to the same network by default. This allows containers to communicate with each other using service names as hostnames.

## Docker Compose Commands
To start the containers defined in `docker-compose.yml`:

```bash
sudo docker compose up
```

To stop and remove all containers, networks, and volumes created by `docker-compose up`:

```bash
sudo docker compose down
```

To run the containers in the background (detached mode):

```bash
sudo docker compose up -d
```

## Tips
- Use `depends_on` to specify dependencies between services. This ensures that the dependent services start in the correct order.
- Use `volumes` to persist data outside of your containers, which is especially useful for databases.
- Use environment variables to configure your services and avoid hardcoding sensitive information.

## Conclusion
Docker Compose simplifies the process of managing multi-container Docker applications. By defining your services in a `docker-compose.yml` file, you can easily spin up your entire application stack with a single command. This guide provides a solid starting point for using Docker Compose to manage multi-container applications effectively.

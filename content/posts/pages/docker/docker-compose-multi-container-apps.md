---

title: "Docker Compose Guide: Multi-Container Applications"
slug: "docker-compose-multi-container-apps"
date: 2024-10-18
description: "Simplify multi-container deployments with Docker Compose. Define services, networks, and volumes in YAML for complex apps."
showToc: true
weight: 2
series: ["Docker"]
categories: ["Docker"]
tags: ["Docker", "Compose", "DevOps", "Orchestration", "YAML"]
summary: "Learn how to define and manage multi-container applications using Docker Compose. Includes real-world examples for Django, PostgreSQL, and Redis."
images: ["/images/docker-compose.png"]
--------------------------------------

# Docker Compose Documentation

## Introduction

Docker Compose is a tool for defining and running multi-container Docker applications. It uses a YAML file to configure services and starts the entire stack with a single command.

---

## What Docker Compose Does

1. Creates a default bridge network automatically for all services.
2. Adds all services to the same network, allowing communication using service names as hostnames.

Example:

* web service can access db using hostname db

3. Built-in DNS resolution allows containers to communicate without IP addresses.

---

## Basic docker-compose.yml Structure

```yaml
version: '3.8'
services:
  service_name:
    image: image_name:tag  # Replace with your actual image name/tag
    ports:
      - "host_port:container_port"  # Map host port to container port
    environment:
      - ENV_VAR=value  # Environment variable
    volumes:
      - "host_path:container_path"  # Volume mapping
    depends_on:
      - dependency_service  # Service dependency
```

---

## Example 1: PostgreSQL and Redis

```yaml
version: '3.8'
services:
  postgres:
    image: postgres:15
    ports:
      - "5432:5432"
    environment:
      POSTGRES_USER: postgres
      POSTGRES_DB: review
      POSTGRES_PASSWORD: password

  redis:
    image: redis:7
    ports:
      - "6379:6379"
```

---

## Example 2: Django Application with Comments

```yaml
version: '3.8'

services:
  django-app:
    container_name: django-app
    image: django-app:latest  # Replace with your actual Django image name/tag
    ports:
      - "8000:8000"  # Expose Django app on port 8000
    environment:
      DEBUG: "1"  # Enable debug mode for development
      POSTGRES_HOST: postgres  # PostgreSQL service name as hostname
      POSTGRES_DB_NAME: nirajan  # Database name
      POSTGRES_DB_PASSWORD: nirajan@9845  # Database password
      REDIS_URL: redis://redis:6379/0  # Redis connection URL
    depends_on:
      - postgres  # Start postgres first
      - redis  # Start redis first
    volumes:
      - static_volume:/code/static  # Store static files
      - media_volume:/code/media  # Store media files

  postgres:
    container_name: postgres
    image: postgres:15
    environment:
      POSTGRES_DB: nirajan
      POSTGRES_USER: nirajan
      POSTGRES_PASSWORD: nirajan@9845
    volumes:
      - postgres_data:/var/lib/postgresql/data  # Persist database data

  redis:
    container_name: redis
    image: redis:7


volumes:
  static_volume:
  media_volume:
  postgres_data:
```



---

## Where Volumes Are Stored

Docker stores volumes on the host machine:

```
/var/lib/docker/volumes/
```

Example:

```
/var/lib/docker/volumes/static_volume/_data
```

Do not modify this manually.

---

## Types of Volumes

### Named Volume

```yaml
volumes:
  - static_volume:/code/static
```

Docker manages storage automatically. Best for production.

### Bind Mount

```yaml
volumes:
  - ./static:/code/static
```

Stored inside project directory. Best for development.

---


## Named Volumes Declaration

Named volumes must be declared at the bottom of the file.

```yaml
volumes:
  static_volume:
  media_volume:
  postgres_data:
```

This tells Docker to create persistent storage managed by Docker.

---



## Docker Networking

Docker Compose creates a default private network for all services.

All services can communicate using service names.

Example:

* django-app connects to postgres using "postgres"
* django-app connects to redis using "redis"
* redis connects to postgres using "postgres"

> This is possible because all services are on the same network.

---

## Default Network Behavior

All containers are on the same network by default, meaning they can communicate freely with each other.

---

## Custom Networks

You can isolate services using custom networks.

```yaml
networks:
  backend:
  cache:
```

Assign services:

```yaml
services:
  django-app:
    networks:
      - backend
      - cache

  postgres:
    networks:
      - backend

  redis:
    networks:
      - cache
```


---

## Docker Compose Commands

```bash
docker compose up
```

Start services

```bash
docker compose up -d
```

Start in background

```bash
docker compose down
```

Stop and remove services

---



## Conclusion

Docker Compose simplifies multi-container applications by combining services, networks, volumes, and environment configuration into a single YAML file.

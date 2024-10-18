
---
title: "Docker CPU and Memory Limits"
date: 2024-10-18
description: "A guide to setting CPU and memory limits for Docker containers using CLI and Docker Compose."
ShowToc: true
categories: ["Docker", "Limits"]
tags: ["Docker", "CPU", "Memory", "Limits", "Guide"]
summary: "Control the CPU and memory usage of Docker containers with CLI and Docker Compose configurations."
images: ["/images/resource.png"]  # For social share
---

## Docker CPU and Memory Limits

When you want to control the CPU and memory usage of Docker containers, you can use specific options in both Docker CLI commands and Docker Compose files. Here's a detailed guide on how to use these options:

### Docker CLI Commands

1. **Setting CPU Limits**:
   - **Option**: `--cpus`
   - **Usage**: Specifies the number of CPUs that the container can use.
   - **Example**:
     ```bash
     docker run --cpus="1.5" my-image
     ```
     The `--cpus` option limits the container to 1.5 CPU cores.

2. **Setting Memory Limits**:
   - **Option**: `--memory` or `-m`
   - **Usage**: Sets the maximum amount of memory the container can use.
   - **Example**:
     ```bash
     docker run --memory="500m" my-image
     ```
     This command limits the container to 500MB of RAM. If the limit is exceeded, the container will be throttled or terminated.

   - **Note**: The options take a positive integer followed by suffixes such as `b`, `k`, `m`, or `g` to indicate bytes, kilobytes, megabytes, or gigabytes.

3. **Soft Memory Limits**:
   - **Option**: `--memory-reservation`
   - **Example**:
     ```bash
     docker run --memory="1g" --memory-reservation="512m" nginx
     ```
     This reserves 512MB of memory while setting a hard limit of 1GB.

### Docker Compose Configuration

In Docker Compose, you can define resource limits under the `deploy` section for version 3.x or directly under the `services` section for version 2.x.

1. **Setting CPU and Memory Limits in Docker Compose (Version 2.x)**:
   ```yaml
   version: '2'
   services:
     my-service:
       image: my-image
       deploy:
         resources:
           limits:
             cpus: '1.5'
             memory: 500M
   ```
   This limits the service to 1.5 CPUs and 500MB of memory.

2. **Setting CPU and Memory Limits in Docker Compose (Version 3.x and above)**:
   ```yaml
   version: '3.8'
   services:
     my-service:
       image: my-image
       deploy:
         resources:
           limits:
             cpus: '1.5'
             memory: '500M'
   ```
   This limits the service to 1.5 CPUs and 500MB of memory.

### Notes:
- **Swap Memory**: You can enable swap memory using the `--memory-swap` option in CLI. For example:
  ```bash
  docker run --memory="512m" --memory-swap="1g" nginx
  ```

- **CPU Shares**: Set CPU priorities between containers using `--cpu-shares`, with 1024 being the default.

By using these options, you can ensure that your Docker containers use resources efficiently, preventing them from overwhelming the host machine.

---



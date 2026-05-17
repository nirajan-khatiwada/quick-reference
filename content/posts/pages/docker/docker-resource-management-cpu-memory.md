---

title: "Docker Resource Management: CPU & Memory Limits"
slug: "docker-resource-management-cpu-memory"
date: 2024-10-18
description: "Optimize Docker performance. Set CPU and memory limits for containers using Docker CLI and Docker Compose."
showToc: true
weight: 4
series: ["Docker"]
categories: ["Docker"]
tags: ["Docker", "Performance", "Optimization", "DevOps", "Resource Management"]
summary: "Control CPU and memory usage of Docker containers using CLI and modern Docker Compose configurations."
images: ["/images/resource.png"]
--------------------------------

## Docker CPU and Memory Limits

Docker allows you to control how much CPU and memory a container can use. This helps prevent a single container from consuming all system resources and improves overall system stability.

---

## Docker CLI Resource Limits

### 1. CPU Limits

**Option:** `--cpus`

Limits how much CPU time a container can use.

```bash
docker run --cpus="1.5" my-image
```

* `1.0` = one full CPU core time
* `1.5` = 1.5 CPU cores worth of CPU time

Note: This does NOT assign a physical CPU core. It controls CPU scheduling time.

---

### 2. Memory Limits

**Option:** `--memory` or `-m`

Sets the maximum RAM a container can use.

```bash
docker run --memory="500m" my-image
```

If the container exceeds this limit, it may be killed by the **OOM (Out Of Memory) killer**.

Supported units:

* b = bytes
* k = kilobytes
* m = megabytes
* g = gigabytes

---

### 3. Memory Reservation (Soft Limit)

**Option:** `--memory-reservation`

A soft limit that acts as a minimum guaranteed memory.

```bash
docker run --memory="1g" --memory-reservation="512m" nginx
```

* Hard limit: 1GB
* Soft reservation: 512MB

---

### 4. CPU Shares (Priority Control)

**Option:** `--cpu-shares`

Controls CPU priority when the system is under load.

```bash
docker run --cpu-shares=512 my-image
```

* Default: 1024
* Higher value = higher priority

---

### 5. Swap Memory

**Option:** `--memory-swap`

Defines total memory + swap usage.

```bash
docker run --memory="512m" --memory-swap="1g" nginx
```

* 512MB RAM + 512MB swap allowed

---

## Docker Compose Resource Limits

In modern Docker Compose (v2+):

* `deploy.resources` is not applied in normal `docker compose up`
* Resource limits depend on runtime configuration

---

### Example Structure

```yaml
services:
  my-service:
    image: my-image
    mem_limit: 500m
    cpus: 1.5
```

---

## What Happens When Limits Are Exceeded?

### Memory Limit Exceeded

* Container is killed (OOM kill)

### CPU Limit Exceeded

* CPU is throttled (slower performance, not killed)

---

## Best Practices

* Always set memory limits in production
* Always define CPU limits for multi-container systems
* Prevent one container from consuming all host resources
* Combine CPU + memory limits for stability

---

## Key Takeaways

* `--cpus` controls CPU time, not physical cores
* `--memory` prevents RAM overuse
* Memory overflow leads to OOM kill
* CPU overflow leads to throttling
* Resource management is critical for production systems


## Docker Image Optimization
See this video [here](https://www.youtube.com/watch?v=hX2UAHhX8E8) for tips on optimizing Docker images for better performance and smaller size.
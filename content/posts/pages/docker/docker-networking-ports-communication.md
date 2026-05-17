---

title: "Docker Networking Guide: Ports & Inter-Container Communication"
slug: "docker-networking-ports-communication"
date: 2024-10-18
description: "A complete guide to Docker networking, covering port mapping, host networking, bridge networks, and secure inter-container communication."
showToc: true
weight: 3
series: ["Docker"]
categories: ["Docker"]
tags: ["Docker", "Networking", "DevOps", "Ports", "Security"]
summary: "Learn how Docker networking works, including container isolation, port exposure, network types, and communication between containers."
images: ["/images/docker_network.jfif"]
---------------------------------------

# Docker Networking: Ports & Inter-Container Communication

Docker containers are isolated environments by default. This isolation affects how they interact with the outside world and with each other.

By default:

* Containers cannot directly access the host machine’s ports.
* Containers cannot directly communicate with other containers.
* Container ports are not exposed externally unless explicitly configured.

---

## Accessing Container Ports from Outside

To allow external access to a container, you must explicitly expose and map ports.

### 1. Port Mapping

Port mapping connects a container port to a port on the host machine.

```bash
docker run -p <host_port>:<container_port> imagename
```

Example:

```bash
docker run -p 8080:80 nginx
```

This makes the container’s port `80` accessible via `localhost:8080`.

---

### 2. Host Network Mode

In host networking mode, the container shares the host’s network stack.

```bash
docker run --network host imagename
```

Key points:

* No port mapping is required.
* Container directly uses host network interfaces.
* Best suited for high-performance or low-latency applications.

---

## Communication Between Containers

Containers cannot communicate by default unless they are placed on the same Docker network.

The recommended approach is to use a **custom bridge network**.

---

### Step 1: Create a Network

```bash
docker network create my_network
```

---

### Step 2: Run Containers on the Same Network

```bash
docker run --network my_network --name container1 imagename
docker run --network my_network --name container2 imagename
```

---

### Step 3: Communicate Using Container Names

Containers on the same network can resolve each other using their names as hostnames.

```bash
container1:<port>
```

Example:

```bash
curl http://container1:80
```

---

## Practical Example

### 1. Create a Custom Network

```bash
docker network create my_network
```

### 2. Run a Web Server Container

```bash
docker run --network my_network --name webserver -d nginx
```

### 3. Run a Client Container

```bash
docker run --network my_network --name client -it alpine sh
```

### 4. Access Web Server from Client

Inside the client container:

```bash
wget -qO- http://webserver
```

or

```bash
curl http://webserver
```

---

## Docker Network Types

Docker provides different network drivers that define how containers communicate with each other and with external systems.

---

### 1. Bridge Network (Default)

* This is the default network mode in Docker.
* Every container is attached to a bridge network unless specified otherwise.
* Each container gets its own network namespace (isolated network stack).

#### Important behavior:

* Containers are isolated from each other by default.
* Even though they may be on a bridge network, they **do not automatically communicate** unless properly configured.

#### Key concept:

* Each container effectively uses its **own virtual bridge interface**.
* To enable communication, you must create a **user-defined (custom) bridge network** shared by containers.

👉 In simple terms:

> Containers can communicate using bridge networks only when they are attached to the same custom bridge network.

---

### 2. Host Network

* The container shares the host machine’s network stack.
* There is no network isolation between host and container.
* No need for port mapping (`-p` is ignored).

#### Use case:

* High-performance workloads
* Low-latency services
* System-level networking tools

---

### 3. None Network

* Disables all networking for the container.
* No external communication.
* No internal container-to-container communication.

This mode completely isolates the container from any network interfaces. The container only has a loopback interface (`lo`) for internal processes.

#### How to use None network

```bash
docker run --network none alpine
```

#### Example behavior

Inside the container:

```bash
ping google.com   # will NOT work
curl https://example.com  # will NOT work
```

Because there is no network stack available.

#### Verification

You can inspect the container network settings:

```bash
docker inspect <container_id>
```

You will see:

* No IP address assigned (or only loopback)
* No bridge/host network attachment

#### Use case:

* Highly secure workloads
* Sandboxed execution
* Offline or restricted processing environments

---

## DNS Resolution *in* Docker(Specifically for Bridge Networks)

When containers are on the same user-defined bridge network, they can communicate using their container names as hostnames.

Docker automatically provides DNS resolution for containers within the same network.

Container names act as DNS hostnames.

### Example

```bash
docker run --network my_network --name webserver -d nginx
docker run --network my_network --name client -it alpine sh
```

Inside the client container:

```bash
curl http://webserver
```

Docker resolves `webserver` automatically to the correct container IP.

---

## Listing Docker Networks

```bash
docker network ls
```

---

## Key Takeaways

* Containers are isolated by default.
* Port mapping exposes container services to the host.
* Custom networks enable secure inter-container communication.
* Docker DNS allows name-based communication.
* Bridge network is the most commonly used networking mode.

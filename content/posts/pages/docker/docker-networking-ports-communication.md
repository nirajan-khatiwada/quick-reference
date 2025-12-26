---
title: "Docker Networking Guide: Ports & Inter-Container Communication"
slug: "docker-networking-ports-communication"
date: 2024-10-18
description: "Deep dive into Docker networking. Learn port mapping, host networking, and configuring secure communication between containers."
showToc: true
weight: 3
series: ["Docker"]
categories: ["Docker"]
tags: ["Docker", "Networking", "DevOps", "Ports", "Security"]
summary: "Understanding Docker networking models, port mapping, and inter-container communication strategies."
images: ["/images/docker_network.jfif"]
---

# Docker Networking and Port Access

In Docker, containers are isolated by default, meaning:

- Containers cannot access the host machine's ports directly.
- Containers cannot access the ports of other containers directly.
- Container ports are not accessible from outside the host machine unless configured.

---

## 🛠️ **Accessing Container Ports from Outside**

To access a container's port from outside (e.g., from the host or another machine), you can use port mapping:

### 1. **Port Mapping**
```bash
docker run -p host_port:container_port imagename
```
- This command maps a container's port to a port on the host machine.

### 2. **Host Network**
To share the host's network namespace with the container:
```bash
docker run --network host imagename
```

---

## 🌐 **Accessing Container Ports from Another Container**

To allow inter-container communication, you need to create and use a custom Docker network.

### Steps:

### 1. **Create a Docker Network**
```bash
docker network create my_network
```

### 2. **Run Containers in the Same Network**
```bash
docker run --network my_network --name container1 imagename
docker run --network my_network --name container2 imagename
```

### 3. **Access One Container from Another**
Use the container name and port to access one container from another:
```bash
container1:port
```

---

## **Example Scenario**

1. **Create a Network**
```bash
docker network create my_network
```

2. **Run First Container**
```bash
docker run --network my_network --name webserver -d nginx
```

3. **Run Second Container**
```bash
docker run --network my_network --name client -it alpine /bin/sh
```

4. **Access Web Server from Client**
Inside the client container, use the following commands to access the web server:
```bash
wget -qO- http://webserver
```
or
```bash
curl http://webserver
```

---

## 📝 **Important Notes**

- **Container-to-Container Access**: Containers in the same custom network can communicate using their names as hostnames.
- **Host Machine Access**: Containers cannot directly access the host machine's ports.
- **External Access**: Use port mapping or host networking to access container ports from outside the host machine.

### **List Docker Networks**
To list all available Docker networks and verify the existence of custom networks:
```bash
docker network ls
```

---
title: "React Authentication: JWT, Axios, and Context API Guide"
slug: "react-authentication-jwt-context"
date: 2025-06-20
description: "Build a secure authentication system in React using JWT, Axios Interceptors, and Context API. Includes token refresh and route protection."
showToc: true
weight: 20
series: ["React"]
categories: ["React", "Security"]
tags: ["React", "Authentication", "JWT", "Axios", "Context API", "Security"]
summary: "Complete guide to React Authentication. Implement login, logout, protected routes, and silent token refresh using simplified patterns."
images: ["/images/react-auth.png"]
---

## A Complete Guide to Auth in React with Axios, JWT and Context API

### Introduction

In this guide, we will explore how to implement authentication in a React application using Axios for HTTP requests, JWT (JSON Web Tokens) for secure token-based authentication, and the Context API for state management. We will also cover how to handle token refresh using Axios interceptors.

### Prerequisites

- Basic knowledge of React  
- Familiarity with Axios for making HTTP requests  
- Understanding of JWT and how it works  
- React Router for navigation

### Setting Up the Project

Consider you have the following project structure:

```bash
my-app/
├── src/
│   ├── components/
│   ├── context/
│   ├── pages/
│   ├── api/
│   ├── App.js
│   ├── index.js
│   └── ...
├── package.json
└── ...
```

### Step 1: Install Dependencies

First, ensure you have the necessary dependencies installed:

```bash
npm install axios react-router-dom
npm install jwt-decode
```

### Step 2: Create the api.jsx file

```jsx
// src/api/api.jsx
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api", // Replace with your API base URL
});

const Login = async (username, password) => {
  const res = await api.post("/login", {
    username,
    password,
  });
  const { refresh, access } = res.data;
  return { refresh, access };
};

const Logout = async (refresh) => {
  await api.post("/logout", { refresh });
};

export default api;
export { Login, Logout };
```

### Step 3: Create the AuthContext

```jsx
// src/context/AuthContext.jsx
import { createContext, useState, useEffect } from "react";
import jwtDecode from "jwt-decode";
import api, { Login, Logout } from "../api/api";
import { Outlet, useNavigate } from "react-router-dom";

const AuthContext = createContext();

const AuthProvider = () => {
  const [user, setUser] = useState(() => {
    const refresh = localStorage.getItem("refresh");
    try {
      const decode = jwtDecode(refresh);
      if (decode.exp * 1000 < Date.now()) {
        localStorage.removeItem("refresh");
        return null;
      }
      return decode;
    } catch (e) {
      return null;
    }
  });

  const navigate = useNavigate();

  const logout = async () => {
    try {
      const refresh = localStorage.getItem("refresh");
      await Logout(refresh);
      localStorage.removeItem("refresh");
      localStorage.removeItem("access");
      setUser(null);
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const login = async (username, password) => {
    try {
      const { refresh, access } = await Login(username, password);
      localStorage.setItem("refresh", refresh);
      localStorage.setItem("access", access);
      setUser(jwtDecode(refresh));
      navigate("/");
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  useEffect(() => {
    const requestInterceptor = api.interceptors.request.use(
      (config) => {
        const access = localStorage.getItem("access");
        if (access) {
          config.headers["Authorization"] = `Bearer ${access}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    const responseInterceptor = api.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;
        if (error.response?.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;
          try {
            const refresh = localStorage.getItem("refresh");
            const { data } = await api.post("/refresh", { refresh });
            localStorage.setItem("access", data.access);
            originalRequest.headers["Authorization"] = `Bearer ${data.access}`;
            return api(originalRequest);
          } catch (err) {
            console.error("Token refresh failed:", err);
            localStorage.removeItem("refresh");
            localStorage.removeItem("access");
            setUser(null);
            navigate("/login");
          }
        }
        return Promise.reject(error);
      }
    );

    return () => {
      api.interceptors.request.eject(requestInterceptor);
      api.interceptors.response.eject(responseInterceptor);
    };
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      <Outlet />
    </AuthContext.Provider>
  );
};

export default AuthContext;
export { AuthProvider };
```

### Step 4: Create the Login Page

```jsx
// src/pages/Login.jsx
import React, { useContext, useState } from "react";
import AuthContext from "../context/AuthContext";

const Login = () => {
  const { login } = useContext(AuthContext);
  const [formData, setFormData] = useState({ username: "", password: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    login(formData.username, formData.password);
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input name="username" onChange={handleChange} value={formData.username} placeholder="Username" />
        <input name="password" type="password" onChange={handleChange} value={formData.password} placeholder="Password" />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
```

### Step 5: Create the Protected Route

```jsx
// src/Routes/ProtectedRoute.jsx
import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import AuthContext from "../context/AuthContext";

const ProtectedRoute = () => {
  const { user } = useContext(AuthContext);
  return user ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
```

### Create `PublicRoute.jsx`

```jsx
// src/Routes/PublicRoute.jsx
import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import AuthContext from "../context/AuthContext";

const PublicRoute = () => {
  const { user } = useContext(AuthContext);
  return user ? <Navigate to="/" /> : <Outlet />;
};

export default PublicRoute;
```

### Showing different pages according to the user

```jsx
// src/Routes/Shared.jsx
import { useContext } from "react";
import AuthContext from "../context/AuthContext";
import { Library, Landing, User } from "../pages";

const Shared = () => {
  const { user } = useContext(AuthContext);
  if (!user) return <Landing />;
  if (user.role === "admin") return <Library />;
  return <User />;
};

export default Shared;
```

### Step 6: Set Up the App Component

```jsx
// src/App.js
import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Login from "./pages/Login";
import ProtectedRoute from "./Routes/ProtectedRoute";
import PublicRoute from "./Routes/PublicRoute";
import Shared from "./Routes/Shared";
import UserProfile from "./pages/UserProfile";
import Register from "./pages/Register";
import ProtectLibrary from "./pages/ProtectLibrary";
import AddBook from "./pages/AddBook";

const router = createBrowserRouter([
  {
    element: <AuthProvider />,
    children: [
      {
        element: <PublicRoute />,
        children: [
          { path: "/login", element: <Login /> },
          { path: "/register", element: <Register /> },
        ],
      },
      {
        element: <ProtectedRoute />,
        children: [
          { path: "/profile", element: <UserProfile /> },
          {
            path: "/library",
            element: <ProtectLibrary />,
            children: [{ path: "add-book", element: <AddBook /> }],
          },
        ],
      },
      { path: "/", element: <Shared /> },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
```

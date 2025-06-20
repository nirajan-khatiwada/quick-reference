---
title: "A Complete Guide to Auth in React with Axios, JWT and Context API"
date: 2025-06-20
summary: "Learn how to build a secure authentication system in React using JWT, Axios, and Context API. Includes token refresh, route protection, and role-based access."
description: "Comprehensive guide to implementing authentication in React with token refresh and role-based access using Context API and Axios."
showToc: true
categories: ["React"]
tags: ["React", "JWT", "Axios", "Authentication", "Context API", "Web Development"]
images: []
---

# A Complete Guide to Auth in React with Axios, JWT and Context API

## Introduction

In this guide, we will explore how to implement authentication in a React application using Axios for HTTP requests, JWT (JSON Web Tokens) for secure token-based authentication, and the Context API for state management. We will also cover how to handle token refresh using Axios interceptors.

## Prerequisites

- Basic knowledge of React
- Familiarity with Axios for making HTTP requests
- Understanding of JWT and how it works
- React Router for navigation

## Setting Up the Project

Consider you have the following project structure:

```bash
my-app/
├── src/
│   ├── components/
│   ├── context/
│   ├── pages/
│   ├── routes/
│   ├── api/
│   ├── App.js
│   ├── index.js
│   └── ...
├── package.json
└── ...
```

## Step 1: Install Dependencies

First, ensure you have the necessary dependencies installed:

```bash
npm install axios react-router-dom jwt-decode
```

## Step 2: Create the api.js file

Create a file named `api.js` in the `src/api/` directory:

```javascript
// src/api/api.js
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api", // Replace with your API base URL
});

const Login = async (username, password) => {
  try {
    const response = await api.post("/login", {
      username,
      password,
    });
    const { refresh, access } = response.data;
    return { refresh, access };
  } catch (error) {
    throw error;
  }
};

const Logout = async (refresh) => {
  try {
    await api.post("/logout", { refresh });
  } catch (error) {
    throw error;
  }
};

export default api;
export { Login, Logout };
```

## Step 3: Create the AuthContext

Create a file named `AuthContext.js` in the `src/context/` directory:

```javascript
// src/context/AuthContext.js
import React, { createContext, useState, useEffect, useContext } from "react";
import { jwtDecode } from "jwt-decode";
import api, { Login, Logout } from "../api/api";
import { Outlet, useNavigate } from "react-router-dom";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const refresh = localStorage.getItem("refresh");
    if (!refresh) return null;
    
    try {
      const decoded = jwtDecode(refresh);
      if (decoded.exp * 1000 < Date.now()) {
        localStorage.removeItem("refresh");
        localStorage.removeItem("access");
        return null;
      }
      return decoded;
    } catch (e) {
      localStorage.removeItem("refresh");
      localStorage.removeItem("access");
      return null;
    }
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const logout = async () => {
    try {
      setLoading(true);
      const refresh = localStorage.getItem("refresh");
      if (refresh) {
        await Logout(refresh);
      }
      localStorage.removeItem("refresh");
      localStorage.removeItem("access");
      setUser(null);
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
      // Clear tokens even if logout API fails
      localStorage.removeItem("refresh");
      localStorage.removeItem("access");
      setUser(null);
      navigate("/login");
    } finally {
      setLoading(false);
    }
  };

  const login = async (username, password) => {
    try {
      setLoading(true);
      const { refresh, access } = await Login(username, password);
      localStorage.setItem("refresh", refresh);
      localStorage.setItem("access", access);
      const decoded = jwtDecode(refresh);
      setUser(decoded);
      navigate("/");
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Request interceptor
    const requestInterceptor = api.interceptors.request.use(
      (config) => {
        const access = localStorage.getItem("access");
        if (access) {
          config.headers["Authorization"] = `Bearer ${access}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // Response interceptor
    const responseInterceptor = api.interceptors.response.use(
      (response) => {
        return response;
      },
      async (error) => {
        const originalRequest = error.config;
        
        if (error.response?.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;
          
          try {
            const refresh = localStorage.getItem("refresh");
            if (!refresh) {
              throw new Error("No refresh token available");
            }
            
            const response = await api.post("/refresh", { refresh });
            const { access } = response.data;
            
            localStorage.setItem("access", access);
            originalRequest.headers["Authorization"] = `Bearer ${access}`;
            
            return api(originalRequest);
          } catch (refreshError) {
            console.error("Token refresh failed:", refreshError);
            localStorage.removeItem("refresh");
            localStorage.removeItem("access");
            setUser(null);
            navigate("/login");
            return Promise.reject(refreshError);
          }
        }
        
        return Promise.reject(error);
      }
    );

    // Cleanup interceptors on unmount
    return () => {
      api.interceptors.request.eject(requestInterceptor);
      api.interceptors.response.eject(responseInterceptor);
    };
  }, [navigate]);

  const contextValue = {
    user,
    login,
    logout,
    loading
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children || <Outlet />}
    </AuthContext.Provider>
  );
};

// Custom hook to use AuthContext
const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export default AuthContext;
export { AuthProvider, useAuth };
```

## Step 4: Create the Login Page

Create a file named `Login.js` in the `src/pages/` directory:

```javascript
// src/pages/Login.js
import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const { login, loading } = useAuth();
  const [formData, setFormData] = useState({
    username: "",
    password: ""
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    
    try {
      await login(formData.username, formData.password);
    } catch (error) {
      setError(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        {error && <div style={{ color: 'red' }}>{error}</div>}
        <button type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
};

export default Login;
```

## Step 5: Create the Protected Route

Create a file named `ProtectedRoute.js` in the `src/routes/` directory:

```javascript
// src/routes/ProtectedRoute.js
import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
```

## Step 6: Create PublicRoute

Create a file named `PublicRoute.js` in the `src/routes/` directory:

```javascript
// src/routes/PublicRoute.js
import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const PublicRoute = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (user) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default PublicRoute;
```

## Step 7: Create Shared Component

Create a file named `Shared.js` in the `src/routes/` directory:

```javascript
// src/routes/Shared.js
import React from "react";
import { useAuth } from "../context/AuthContext";

// Import your page components
const Landing = () => <div>Welcome to our app! Please login.</div>;
const Library = () => <div>Admin Library Dashboard</div>;
const UserDashboard = () => <div>User Dashboard</div>;

const Shared = () => {
  const { user } = useAuth();

  if (!user) {
    return <Landing />;
  }

  if (user.role === "admin") {
    return <Library />;
  }

  return <UserDashboard />;
};

export default Shared;
```

## Step 8: Create Additional Pages

Create a `UserProfile.js` in the `src/pages/` directory:

```javascript
// src/pages/UserProfile.js
import React from "react";
import { useAuth } from "../context/AuthContext";

const UserProfile = () => {
  const { user, logout } = useAuth();

  return (
    <div>
      <h2>User Profile</h2>
      <p>Welcome, {user?.username || user?.name}!</p>
      <p>Role: {user?.role}</p>
      <button onClick={logout}>Logout</button>
    </div>
  );
};

export default UserProfile;
```

Create a `Register.js` in the `src/pages/` directory:

```javascript
// src/pages/Register.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      setLoading(true);
      await api.post("/register", {
        username: formData.username,
        email: formData.email,
        password: formData.password
      });
      navigate("/login");
    } catch (error) {
      setError(error.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
        </div>
        {error && <div style={{ color: 'red' }}>{error}</div>}
        <button type="submit" disabled={loading}>
          {loading ? "Registering..." : "Register"}
        </button>
      </form>
    </div>
  );
};

export default Register;
```

## Step 9: Set Up the App Component

Finally, set up your `App.js`:

```javascript
// src/App.js
import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Login from "./pages/Login";
import Register from "./pages/Register";
import UserProfile from "./pages/UserProfile";
import ProtectedRoute from "./routes/ProtectedRoute";
import PublicRoute from "./routes/PublicRoute";
import Shared from "./routes/Shared";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AuthProvider />,
    children: [
      {
        element: <PublicRoute />,
        children: [
          {
            path: "/login",
            element: <Login />
          },
          {
            path: "/register",
            element: <Register />
          }
        ]
      },
      {
        element: <ProtectedRoute />,
        children: [
          {
            path: "/profile",
            element: <UserProfile />
          }
        ]
      },
      {
        path: "/",
        element: <Shared />
      }
    ]
  }
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
```

## Key Fixes Made

### Syntax Errors Fixed:
1. **Import statements**: Fixed React imports and jwt-decode import
2. **Function destructuring**: Fixed the Login function to properly handle response data
3. **Component structure**: Fixed AuthProvider to properly accept children prop
4. **Missing exports**: Added proper default exports for all components

### Logical Errors Fixed:
1. **Token validation**: Added proper error handling for invalid tokens
2. **Loading states**: Added loading indicators for better UX
3. **Error handling**: Added comprehensive error handling throughout
4. **Interceptor cleanup**: Added proper cleanup for Axios interceptors
5. **Navigation logic**: Fixed navigation patterns and replaced useNavigate calls
6. **Custom hook**: Added useAuth hook for cleaner context usage

### Additional Improvements:
1. **Form handling**: Added proper form state management
2. **Error display**: Added error message display in forms
3. **Loading indicators**: Added loading states for async operations
4. **Token refresh**: Improved token refresh logic with better error handling
5. **Route protection**: Enhanced route protection with loading states

## Security Considerations

- **XSS Protection**: Be aware that storing tokens in localStorage can be vulnerable to XSS attacks
- **Token Expiry**: Always validate token expiry on both client and server
- **HTTPS**: Always use HTTPS in production
- **Secure Headers**: Implement proper security headers on your backend

## Testing

To test this implementation:

1. Start your backend server with JWT authentication endpoints
2. Update the API base URL in `api.js`
3. Test login/logout functionality
4. Test protected routes
5. Test token refresh functionality

This implementation provides a robust foundation for React authentication with proper error handling, loading states, and security considerations.

---
title: "React : Axios Interceptors for Request & Response Handling"
date: 2025-02-17
description: "A comprehensive guide for implementing Axios interceptors in React applications to handle requests and responses effectively."
showToc: true
categories: ["axios","React"]
tags: ["React", "Axios", "HTTP", "Interceptors", "API", "Tutorial"]
summary: "A detailed guide explaining how to use Axios interceptors in React to manage request and response handling, including token refresh and error handling."
---
# Axios Interceptors in React (Request & Response)

## Axios Interceptors in React (Request & Response)
Axios Interceptors are functions that Axios executes before a request is sent or after a response is received. They are commonly used in React apps for:
- Attaching authentication tokens (JWT, API keys) to requests.
- Handling global error responses (e.g., token expiration, server errors).
- Modifying request/response data (e.g., logging, transforming responses).
- Retrying failed requests automatically.

> Note : You can intercept requests or responses before they are handled by then or catch.

### 1.Request Interceptors
The request interceptor is executed before a request is sent. It can modify the request headers, URL, or data.

**Use case:**
- Attaching an authentication token to the request headers.
- Logging the request details.
- Transforming the request data before sending it.

#### Example:
```javascript
import axios from "axios";

// Create an Axios instance
const api = axios.create({
  baseURL: "https://api.example.com",
});

// Add request interceptor
api.interceptors.request.use(
  (config) => {
    // Do something before request is sent
    // Get the token from local storage (or context, Redux, etc.)
    const token = localStorage.getItem("access_token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    console.log("Request Interceptor:", config);
    return config;
  },
  (error) => {
    // Do something with request error
    return Promise.reject(error); // Forward error to the calling function
  }
);

export default api;
```

Explanation:
- Before sending a request, the interceptor checks if there is an authentication token in local storage.
- If the token exists, it adds it to the request headers.
- If there’s an error (e.g., no config object), it returns a rejected promise.


WHen which function is called?
- The `config` function is called when the request is sent.
- The `error` function is called when there is an error in the request (e.g., network error, timeout).

WHat if dont mention the error function?


### 2.Response Interceptors
The response interceptor is executed after a response is received. It is used to handle responses globally.

**Use case:**
- Handling global error responses (e.g., token expiration, server errors).
- Transforming the response data before it reaches the calling function.
- Logging the response details.
- Centralized error handling for API responses.

#### Example:(Handeling 401 Unauthorized)
```javascript
import axios from "axios";

// Create an Axios instance
const api = axios.create({
  baseURL: "https://api.example.com",
});

api.interceptors.response.use(
  (response) => {
     // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  async (error) => {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    const originalRequest = error.config;

    // If the error is a 401 (Unauthorized) and the request was not retried already
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true; // Mark this request as retried

      try {
        // Attempt to refresh the token
        const refreshToken = localStorage.getItem("refresh_token");
        const { data } = await axios.post("https://api.example.com/auth/refresh", { refresh_token: refreshToken });

        // Store the new token
        localStorage.setItem("access_token", data.access_token);

        // Update the original request headers
        api.defaults.headers.Authorization = `Bearer ${data.access_token}`;
        originalRequest.headers.Authorization = `Bearer ${data.access_token}`;

        // Retry the original request
        return api(originalRequest);
      } catch (refreshError) {
        console.error("Token refresh failed:", refreshError);
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        window.location.href = "/login"; // Redirect to login page
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);
export default api;
```


### Explanation:
If the response is 401 (Unauthorized), it checks if the request has already been retried.
If not, it sends a request to refresh the token.
If the refresh is successful:
- The new token is saved.
- The original request is updated with the new token and retried.
If the refresh fails:
- The user is logged out (tokens removed).
- They are redirected to the login page.


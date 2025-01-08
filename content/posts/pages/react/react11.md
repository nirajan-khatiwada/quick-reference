---
title: "React : 11"
date: 2024-11-26
description: "A comprehensive guide on making server requests in React, creating custom hooks, and handling forms."
showToc: true
categories: ["React"]
tags: ["React", "Fetch", "Custom Hooks", "Forms", "Web Development"]
summary: "Explore how to send server requests with fetch, build custom hooks for data fetching, and handle form submissions using useState, useRef, or the FormData API."
images: ["/images/react/react.jpg"]
---

## 46.Sending request to the server
In react we can send request to the server using fetch api.

Example:

```jsx
import React, { useState } from 'react';
const App = () => {
    const [data, setData] = useState([]);
    const fetchData = async () => {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts');
    const data = await response.json();
    setData(data);
    }
    return (
        <div>
            <button onClick={fetchData}>Fetch Data</button>
            <ul>
                {data.map((item) => (
                    <li key={item.id}>{item.title}</li>
                ))}
            </ul>
        </div>
    )
}
```

## 47.Custom Hook  in React
Custom hooks are JavaScript functions that utilize hooks to enable the reuse of stateful logic across different components.

### 47.1 Folder Structure
```
src
|__hooks
|  |__useFetch.js
|__components
|  |__App.js
```
There is no any specific folder structure for custom hooks. You can create a folder named hooks and put all custom hooks in it for better organization.

### 47.2 Creating Custom Hook
We can create a custom hook by prefixing the function name with use keyword.

```jsx
// useFetch.js
import { useState, useEffect } from 'react';
const useFetch = (url) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            const response = await fetch(url);
            const data = await response.json();
            setData(data);
            setLoading(false);
        }
        fetchData();
    }, [url]);
    return { data, loading };
}
export default useFetch;
```

### 47.3 Using Custom Hook
```jsx
// App.js
import React from 'react';
import useFetch from '../hooks/useFetch';
const App = () => {
    const { data, loading } = useFetch('https://jsonplaceholder.typicode.com/posts');
    return (
        <div>
            {loading ? <p>Loading...</p> : (
                <ul>
                    {data.map((item) => (
                        <li key={item.id}>{item.title}</li>
                    ))}
                </ul>
            )}
        </div>
    )
}
export default App;
```

> Note: Custom hook are isolated with each other. They can't share state or logic between them. 


## 48.React Form

In react we can handle form using multiple ways.
- useState Hook
- useRef Hook
- Formdata API


### 48.1 Removing default behavior
When i submit a form, the page reloads. To prevent this default behavior, we can use e.preventDefault() method.

```jsx
import React, { useState } from 'react';

const App = () => {
    const [name, setName] = useState('');
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(name);
    }
    return (
        <form onSubmit={handleSubmit}>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
            <button type="submit">Submit</button>
        </form>
    )
}
export default App;
```

### 48.2 Form Data with useState
```jsx
import React, { useState } from 'react';

const App = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: ''
    });
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
    }
    return (
        <form onSubmit={handleSubmit}>
            <input type="text" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
            <input type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
            <button type="submit">Submit</button>
        </form>
    )
}
export default App;
```

### 48.3 Form Data with useRef
```jsx
import React, { useRef } from 'react';

const App = () => {
    const nameRef = useRef();
    const emailRef = useRef();
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(nameRef.current.value, emailRef.current.value);
    }
    return (
        <form onSubmit={handleSubmit}>
            <input type="text" ref={nameRef} />
            <input type="email" ref={emailRef} />
            <button type="submit">Submit</button>
        </form>
    )
}
export default App;
```


### 48.4 Form Data with FormData API
```jsx
import React from 'react';

const App = () => {
    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        console.log(formData.get('name'), formData.get('email'));
    }
    return (
        <form onSubmit={handleSubmit}>
            <input type="text" name="name" />
            <input type="email" name="email" />
            <button type="submit">Submit</button>
        </form>
    )
}
export default App;
```

Using FormData API, we can easily get form data without using useState or useRef hooks.

```jsx
import React from 'react';

const App = () => {
    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const data=Object.fromEntries(formData.entries());
        console.log(data);

        data.check=formData.getAll('check');
        console.log(data);


    }
    return (
        <form onSubmit={handleSubmit}>
            <input type="text" name="name" />
            <input type="email" name="email" />
            <input type="checkbox" name="check" value="i want coffee" />
            <input type="checkbox" name="check" calue="i want gold" />
            <button type="submit">Submit</button>
        </form>
    )
}
export default App;
```

- get(name) : Returns the first value associated with a given key from within a FormData object.

- getAll(name) : Returns all the values associated with a given key from within a FormData object.



## 48.5 Reseating Form Data
- Of useState
```jsx
import React, { useState } from 'react';

const App = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: ''
    });
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
        setFormData({
            name: '',
            email: ''
        });
    }
    return (
        <form onSubmit={handleSubmit}>
            <input type="text" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
            <input type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
            <button type="submit">Submit</button>
        </form>
    )
}

export default App;
```


- Of useRef
```jsx
import React, { useRef } from 'react';

const App = () => {
    const nameRef = useRef();
    const emailRef = useRef();
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(nameRef.current.value, emailRef.current.value);
        nameRef.current.value = '';
        emailRef.current.value = '';
    }
    return (
        <form onSubmit={handleSubmit}>
            <input type="text" ref={nameRef} />
            <input type="email" ref={emailRef} />
            <button type="submit">Submit</button>
        </form>
    )
}

export default App;
```

- Of FormData API
```jsx
import React from 'react';

const App = () => {
    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        console.log(formData.get('name'), formData.get('email'));
        e.target.reset();
    }
    return (
        <form onSubmit={handleSubmit}>
            <input type="text" name="name" />
            <input type="email" name="email" />
            <button type="submit">Submit</button>
        </form>
    )
}
export default App;
```


## 49. Validation in React
In react we can validate form data using multiple ways.
- validate on every keystroke(using useState)
- validate on form submission(using useRef)
- validate on blur (onBlur event)
- validate on focus(onFocus event)
- using browser validation
Combining all types of validation in a single form.

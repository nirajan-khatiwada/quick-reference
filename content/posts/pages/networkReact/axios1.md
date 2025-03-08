---
title: "React : CRUD Operations with Axios"
date: 2025-02-17
description: "A comprehensive guide for implementing CRUD operations using Axios in React applications"
showToc: true
categories: ["axios","React"]
tags: ["React", "Axios", "HTTP", "CRUD", "API", "Tutorial"]
summary: "A detailed guide explaining how to perform CRUD operations using Axios in React, comparing it with Fetch API, and implementing proper API request structures."
---
# CRUD Operations with Axios in React

## What is Axios?
Axios is a promise-based HTTP client for the browser and Node.js. It is a library that helps in making HTTP requests to external resources. It is a promise-based library that can be used in both client-side and server-side applications.

## Why Axios over Fetch API?
Some of the reasons why Axios is preferred over Fetch API are:
- Easier syntax and cleaner code
- Better Build-in error handling
- Better support for older browsers
- Automatic transformation of JSON data

## Installation
To use Axios in your React project, you need to install it using npm or yarn. You can install Axios by running the following command:
```bash
npm install axios
```

## Simple Data Fetching using Fetch API
```jsx
import React, { useState, useEffect } from 'react';

const App = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(()=>{
        async function fetchData(){
            try{
                const response = await fetch('https://jsonplaceholder.typicode.com/posts');
                const data = await response.json();
                if(!response.ok){
                    throw new Error('Failed to fetch data');
                }
                setData(data);
                setLoading(false);
            }catch(error){
                setError(error);
                setLoading(false);
            }
        }
    })
    return (
        <div>
            {loading ? <p>Loading...</p> : error ? <p>{error.message}</p> : data.map(post => <p key={post.id}>{post.title}</p>)}
        </div>
    )
}
export default App;
```
The main defect of this code are:
- It is not supported in older browsers
- It does not have built-in error handling as we have to check the response.ok property to check if the request was successful or not.
- It does not automatically transform JSON data as we have to call response.json() to parse the JSON data.


## Simple Data Fetching using Axios

```jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(()=>{
        async function fetchData(){
            try{
                const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
                setData(response.data);
                setLoading(false);
            }catch(error){
                setError(error);
                setLoading(false);
                //error.message
                //error.response
                //error.response.status
            }
        }
    })
    return (
        <div>
            {loading ? <p>Loading...</p> : error ? <p>{error.message}</p> : data.map(post => <p key={post.id}>{post.title}</p>)}
        </div>
    )

}
export default App;
```
It is a better way to fetch data from an API as it has built-in error handling and automatically transforms JSON data.

## Proper Ways of structuring Axios requests
We can put all the axios code in same file but it is not a good practice. We should create a separate file for axios requests and then import it in the component where we want to use it.

### Creating a separate file for Axios requests
```bash
src
├── api
│   └── getData.js
└── components
    └── App.js
```
### getData.js
```jsx
import axios from 'axios';

const api=axios.create({
    baseURL:'https://jsonplaceholder.typicode.com'
});

export const getData=()=>{
    return api.get('/posts')
};
```

### App.js
```jsx
import React, { useState, useEffect } from 'react';
import { getData } from '../api/getData';

const App = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
     async function fetchData(){
            try{
                const response = await getData();
                setData(response.data);
                setLoading(false);
            }catch(error){
                setError(error);
                setLoading(false);
            }
        }

    useEffect(()=>{
        fetchData();
    },[]);

    return (
        <div>
            {loading ? <p>Loading...</p> : error ? <p>{error.message}</p> : data.map(post => <p key={post.id}>{post.title}</p>)}
        </div>
    )
}
export default App;
```


## CRUD Operations with Axios

Create an api folder in the src directory and create a file named crud.js. In this file, we will create functions for performing CRUD operations using Axios.



### Sending Get,Post,Put and Delete requests Using axios

### crud.js
```jsx
import axios from 'axios';
const api=axios.create({
    baseURL:'https://jsonplaceholder.typicode.com'
});

export const getPosts=()=>{
    return api.get('/posts');
};

export const addPost=(post)=>{
    return api.post('/posts',post);
};

export const updatePost=(id,post)=>{
    return api.put(`/posts/${id}`,post);
};

export const deletePost=(id)=>{
    return api.delete(`/posts/${id}`);
};
```

### App.js(Perform CRUD operations with input fields to add and update posts)

```jsx
import React, { useState, useEffect } from 'react';
import { getPosts, addPost, updatePost, deletePost } from '../api/crud';

const App =()=>{
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [id, setId] = useState(null);

    async function fetchData(){
        try{
            const response = await getPosts();
            setPosts(response.data);
            setLoading(false);
        }catch(error){
            setError(error);
            setLoading(false);
        }
    }

    useEffect(()=>{
        fetchData();
    },[]);

    const handleAddPost=async()=>{
        try{
            const response = await addPost({title:title,body:body});
            setPosts([...posts,response.data]);
            setTitle('');
            setBody('');
        }catch(error){
            setError(error);
        }
    }

    const handleDeletePost=async(id)=>{
        try{
            await deletePost(id);
            setPosts(posts.filter(post=>post.id!==id));
        }catch(error){
            setError(error);
        }
    }

    const handleUpdatePost=async(id)=>{
        try{
            const response = await updatePost(id,{title:title,body:body});
            setPosts(posts.map(post=>post.id===id?response.data:post));
            setTitle('');
            setBody('');
            setId(null);
        }catch(error){
            setError(error);
        }
    }

    const handleEditPost=(id,title,body)=>{
        setTitle(title);
        setBody(body);
        setId(id);
    }

    return (
        <div>
            <input type="text" value={title} onChange={(e)=>setTitle(e.target.value)} placeholder="Enter Title"/>
            <input type="text" value={body} onChange={(e)=>setBody(e.target.value)} placeholder="Enter Body"/>
            <button onClick={id?()=>handleUpdatePost(id):handleAddPost}>{id?'Update Post':'Add Post'}</button>
            {loading ? <p>Loading...</p> : error ? <p>{error.message}</p> : posts.map(post => <div key={post.id}>
                <p>{post.title}</p>
                <p>{post.body}</p>
                <button onClick={()=>handleEditPost(post.id,post.title,post.body)}>Edit</button>
                <button onClick={()=>handleDeletePost(post.id)}>Delete</button>
            </div>)}
        </div>
    )

}
```



> Note:
>> resp.data contains the response data
>> resp.status contains the response status
>> seding data in request `api.post('/posts',post);` here post is the data you want to send in the request



> Key Takeaways: Axios automatically raises an error if the response status is not in the range of 200-299. This makes it easier to handle errors in Axios as compared to Fetch API. Axios also automatically transforms JSON data and has better support for older browsers. It is a better choice for making HTTP requests in React applications.

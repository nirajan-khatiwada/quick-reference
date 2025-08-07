---
title: "Deploying React App"
date: 2024-11-29
description: "Learn how to build and deploy a React app to various static file servers like Netlify, Vercel, and GitHub Pages."
showToc: true
categories: ["React"]
tags: ["React", "Deployment", "Netlify", "Vercel", "GitHub Pages", "Web Development"]
summary: "A guide on building and deploying a React app, including commands and server options."
images: []
---

## Deploying React App
to deploy the `react` app we need to build the app first and then deploy the build folder to the server.

### Build the App
To build the app run the following command:
```bash
npm run build
```
This command will create a `build` folder in the root directory of the project.


### Deploy the App
We can deploy this to any static file server like `Netlify`,`Vercel`,`Github Pages` etc.

### React Toastify
Go to the [React Toastify](https://fkhadra.github.io/react-toastify/introduction/) website to learn more

### React loading skeleton
Go to the [React loading skeleton](https://www.npmjs.com/package/react-loading-skeleton) website to learn more


### Some Behaviour of useState
Note the state of the component is lost when the component is unmounted. So, if you want to persist the state value even after the component is unmounted, you can move it to the parent component that is not unmounted and pass it as a prop to the child component.

### Make a menu 

```jsx
import React, { useState } from 'react';

const data = [
    {
        menu: 'Home',
        value: 'I love home page',
    },
    {
        menu: 'About',
        value: 'I love about page',
    },
    {
        menu: 'Contact',
        value: 'I love contact page',
    },
];

const Menu = () => {
    const [menu, setMenu] = useState(0);

    return (
        <div>
            <ul>
                {data.map((item, index) => (
                    <li key={index} onClick={() => setMenu(index)}>
                        {item.menu}
                    </li>
                ))}
            </ul>
            <div>{data[menu].value}</div>
        </div>
    );
};

export default Menu;
```


###  Stale Value of `stateVariable` in `useEffect`, `useMemo`, and `useCallback`

```jsx
import React, { useState, useEffect } from 'react';
const StaleValue = () => {
    const [count, setCount] = useState(0);
    useEffect(() => {
        const interval = setInterval(() => {
            console.log(count);
        }, 1000);
        return () => clearInterval(interval);
    }, []); 

    const HandleInteral = () => {
        setCount((prevCount) => prevCount + 1);
    }
    
    return <div onClick={HandleInteral}>Click me</div>;
};
```

What is the output of the above code if i click the `div` element?
The output will be always `0`  because the `count` value is not updated in the `useEffect` hook as the `count` value is not passed in the dependency array of the `useEffect` hook. So, the initial value of the `count` is used in the `useEffect` hook every time.



### Solution to the above problem
```jsx
import React, { useState, useEffect } from 'react';
const StaleValue = () => {
    const [count, setCount] = useState(0);
    useEffect(() => {
        const interval = setInterval(() => {
            console.log(count);
        }, 1000);
        return () => clearInterval(interval);
    }, [count]); 

    const HandleInteral = () => {
        setCount((prevCount) => prevCount + 1);
    }
    
    return <div onClick={HandleInteral}>Click me</div>;
};

```
Here, the output will reflect the updated value of `count` because `count` is passed in the dependency array of the `useEffect` hook. This ensures that the `useEffect` hook re-runs whenever `count` changes with the updated value of `count` , preventing stale values from being used.



### Stale Value in `useMemo` and `useCallback`

Similarly, the `useMemo` and `useCallback` hooks can also suffer from stale values if the state variable is not included in their dependency arrays.


### Non-Stale Variables in `useEffect`, `useMemo`, and `useCallback`

Generally, the `useEffect`, `useMemo`, and `useCallback` hooks will rerun whenever the reference of an element in the dependency array changes. However, in the case of the `useRef` hook, the reference remains the same across re-renders, even if the value of `ref.current` changes. On the other hand, a state variable's reference and value both change when updated.

This means that `ref` has no significance in the dependency array of `useEffect`, `useMemo`, and `useCallback` hooks.

When dealing with stale values in `useRef` it  will always have the updated value in `useEffect`, `useMemo`, and `useCallback` hooks, even if they are not included in the dependency array.

For example, consider `useRef`:

```jsx
import React, { useEffect, useRef } from 'react';

const StaleValue = () => {
    const countRef = useRef(0);

    useEffect(() => {
        const interval = setInterval(() => {
            console.log(countRef.current);
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    const handleInterval = () => {
        countRef.current += 1;
    };

    return <div onClick={handleInterval}>Click me</div>;
};
```
In the above code, the output will always be the updated value of countRef.current, even though countRef.current is not included in the dependency array of the useEffect hook.


> Note: Normal function never contain the stale value of a function. It always contain the updated value of the function.



### Which Which component will rerender when we dispatch an action in Redux?
When we dispatch an action in Redux, the component that is using `useSelector` will rerender. This is because the component is subscribed to the store and will update whenever the store changes.

### Which Which component will rerender when context api value changes?
When the value of a context API changes, the component that is using `useContext` will rerender. This is because the component is subscribed to the context and will update whenever the context value changes.

### ENV FILE IN REACT AND VITE
In React and Vite, environment variables are typically stored in a `.env` file at the root of your project. These variables can be accessed in your application code, allowing you to configure settings without hardcoding them.
### Example `.env` File
```plaintext
VITE_API_URL=https://api.example.com
```
> Note: In Vite, environment variables must start with `VITE_` to be exposed to your application code.

### Accessing Environment Variables
In your React or Vite application, you can access these variables using `import.meta.env`:

```javascript
const apiUrl = import.meta.env.VITE_API_URL;
console.log(apiUrl); // Outputs: https://api.example.com
```

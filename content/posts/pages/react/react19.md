---
title: "React 19 New Features"
date: 2025-05-18
description: "Explore the new features introduced in React 19, including the useId hook and use API for enhanced component development."
showToc: true
categories: ["React"]
tags: ["React", "React 19", "useId", "use API", "Web Development"]
summary: "A detailed guide to the new features in React 19, focusing on the useId hook for accessibility and the use API for context consumption."
images: []
---

## `useId` Hook in React 19
For giving id to elements in React 19, you can use the `useId` hook. This hook generates a unique ID that can be used for accessibility purposes, such as linking labels to form inputs.
```jsx
import React, { useId } from 'react';
const MyComponent = () => {
    const id = useId();

    return (
        <div>
            <label htmlFor={id}>Name:</label>
            <input type="text" id={id} />
        </div>
    );
};
export default MyComponent;
```
> Note: The `useId` hook is specific to React 19 and is not available in earlier versions. It is designed to generate unique IDs that are stable across server and client renders, making it ideal for use in server-side rendering scenarios.



Using useid to link multiple elements:
```jsx
import React, { useId } from 'react';
const MyComponent = () =>{
    const nameId = useId();
    const emailId = useId();
    return (
        <div>
            <label htmlFor={nameId}>Name:</label>
            <input type="text" id={nameId} />
            
            <label htmlFor={emailId}>Email:</label>
            <input type="email" id={emailId} />
        </div>
    );
}
export default MyComponent;
```

This is ok but we can use the following way to link multiple elements with the same id:
```jsx
import React, { useId } from 'react';
const MyComponent = () => {
    const id = useId();

    return (
        <div>
            <label htmlFor={`${id}-name`}>Name:</label>
            <input type="text" id={`${id}-name`} />
            
            <label htmlFor={`${id}-email`}>Email:</label>
            <input type="email" id={`${id}-email`} />
        </div>
    );
};

export default MyComponent;
```


## `use` api in React 19
Unlike React Hooks,`use` can be called within loops and conditional statements like if. Like React Hooks, the function that calls use must be a Component or Hook.It is used in

- To get content from context
Now you can use `use` to get content from context.
```jsx
import React, { use } from 'react';

const MyContext = React.createContext();
const MyComponent = () => {
    const value = use(MyContext);  // Is Equivalent to useContext(MyContext)

    return <div>{value}</div>;
};
export default MyComponent;
```

Also we can use it inside loops and conditionals:
```jsx
import React, { use } from 'react';
const MyContext = React.createContext();
const MyComponent = () => {
    const values = [1, 2, 3];
    return (
        <div>
            {values.map((value) => {
                const contextValue = use(MyContext); // Using use inside a loop
                return <div key={value}>{contextValue} - {value}</div>;
            })}
        </div>
    );
};
export default MyComponent;
```

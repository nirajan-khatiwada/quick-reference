---
title: "React : Day 9"
date: 2024-11-24
description: "A comprehensive guide on using the useEffect hook in React applications."
showToc: true
categories: ["React"]
tags: ["React", "useEffect", "Hooks", "Web Development"]
summary: "Learn how to use the useEffect hook in React for performing side effects in functional components."
images: ["/images/react/react.jpg"]
---

## 40. useEffect
`useEffect` is a React hook that lets you perform side effects in functional components. Common use cases include:

- Establishing a database connection when the DOM content loads.
- Updating the page title when the content changes.

> **Note:** The `useEffect` hook runs after the component has rendered.

## 41. What to Put in useEffect

Use `useEffect` for:
- Network requests
- Operations that take time to complete (e.g., fetching data, setting timers, etc.)

## 42. useEffect Syntax

### 42.1. Importing useEffect
```jsx
import React, { useEffect } from 'react';
```

### 42.2. useEffect Syntax
```jsx
useEffect(() => {
  // code here
  return () => {
    // cleanup code here
  };
}, [dependencies]);
```

- The first argument is a function containing the code to execute.
- The second argument is an array of dependencies. If any dependency changes, the function runs again.
- The return statement is optional and is used for cleanup tasks, such as removing event listeners or canceling subscriptions. This cleanup function is executed:
  - Just before the the useEffect function runs again cause due to dependency change, with variables from the previous render.
  - After the component unmounts (i.e., when removed from the DOM).

> **Note:** When your component is added to the DOM, React runs the setup function. After each re-render with changed dependencies, React first executes the cleanup function (if provided) with old values, then runs the setup function with new values.

### Example:
```jsx
useEffect(() => {
  const id = setTimeout(() => {
    console.log(count);
  }, 1000);

  return () => {
    clearTimeout(id);
  };
}, [count]);
```

- In this example, the `useEffect` hook runs whenever the `count` variable changes. It sets a timeout to log the `count` value after 1 second, and the cleanup function clears the previous timeout before the next execution.

**Cleanup Function:**
- Used for tasks like removing event listeners or clearing timeouts.
- Ensures stale operations are cleared before new ones are executed.
- Executes when dependencies change or when the component unmounts.

## 43. Variations of useEffect

### 43.1. useEffect Without Dependencies Array
```jsx
useEffect(() => {
  // code here
});
```
- The `useEffect` function runs after every re-render.

### 43.2. useEffect With Empty Dependencies Array
```jsx
useEffect(() => {
  // code here
}, []);
```
- The `useEffect` function runs only once after the initial render, making it ideal for tasks like loading local storage data.

### 43.3. useEffect With Multiple Dependencies
```jsx
useEffect(() => {
  // code here
}, [count, name]);
```
- The `useEffect` function runs when either `count` or `name` changes.

> **Note:** In all of the variation, `useEffect` always runs after the first render no matter what is passed in the dependencies array.

### Example: Loading Local Storage Data

**Correct Usage:**
```jsx
import React, { useState, useEffect } from 'react';

const App = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const data = localStorage.getItem('data');
    if (data) {
      setData(JSON.parse(data));
    }
  }, []);

  return (
    <div>
      {data.map((item, index) => (
        <p key={index}>{item}</p>
      ))}
    </div>
  );
};
```

**Incorrect Usage:**
```jsx
import React, { useState } from 'react';

const App = () => {
  const [data, setData] = useState([]);

  const loadData = () => {
    const data = localStorage.getItem('data');
    if (data) {
      setData(JSON.parse(data));
    }
  };

  loadData();

  return (
    <div>
      {data.map((item, index) => (
        <p key={index}>{item}</p>
      ))}
    </div>
  );
};
```

- **Problem:** Calling `loadData` directly causes an infinite loop because it triggers a re-render, which calls `loadData` again.
- **Solution:** Use `useEffect` with an empty dependency array to ensure the function runs only once after the initial render.
























 <!-- ## 40. useEffect
useEffect is a React hook that lets you generate side effects in functional components. for example:
- When the DOM content loads, establish a database connection
- When page content changes, update the title of the page etc
> Note: The useEffect hook runs after the component has rendered.

## 41. WHat to put in useEffect
- Network requests
- Operations that take time to `complete`


## 42. useEffect Syntax
### 42.1. import useEffect
```jsx
import React, { useEffect } from 'react';
```
### 42.2. useEffect Syntax
```jsx
useEffect(() => {
  // code here
  return () => {
    // cleanup code here
  }
}, [dependencies]);
```
- The first argument is a function that contains the code you want to run.
- The second argument is an array of dependencies. If any of the dependencies change, the function will run again.
- The return statement in a React hook or component is optional. It is primarily used for cleanup tasks, such as removing event listeners or canceling subscriptions. This cleanup function is executed just before the function is called due to the dependencies changing.All the variable used here is of the previous render .It is also called after unmounting the component ie when the component is removed from the DOM.

> Note:When your component is added to the DOM, React will run your setup function. After every re-render with changed dependencies, React will first run the cleanup function (if you provided it) with the old values, and then run your setup function with the new values. After your component is removed from the DOM, React will run your cleanup function.

for example:
```jsx
useEffect(() => {
  const id=setTimeout(() => {
    console.log(count);
  }, 1000);
  return () => {
    clearTimeout(id)
  };
}, [count]);
``` 
- In the above example, the `useEffect` hook runs every time the `count` variable changes. It sets a timeout to log the `count` value after 1 second.so count is a dependency here.

-cleanup function: it is used to remove event listener.As when a count is changed the function is called again so just before the function is called due to the dependencies changing the cleanup function is called with all the variable of the previous render.so here we use it to cleartimout so that the previous timeout is cleared.
-It is also called after unmounting the component ie when the component is removed from the DOM.

## 43. Variation of useEffect

### 43.1. useEffect with no dependencies array
```jsx
useEffect(() => {
  // code here
});
```
-The useEffect Function will be called after every re-render.

### 43.2. useEffect with empty dependencies array
```jsx
useEffect(() => {
  // code here
}, []);
```
-The useEffect Function will be called only once after the initial render.
ie only once in the whole lifecycle of the component.

### 43.3. useEffect with multiple dependencies
```jsx
useEffect(() => {
  // code here
}, [count, name]);
```
-The useEffect Function will be called when either `count` or `name` changes.


> All the variation will be called after the first render no matter to which variation it belongs.










> It  is also used to call the function only once after the initial render by passing an empty array as the second argument just because the empty array will never change so the function will be called only once after the initial render.for example loading the local storage data only once after the initial render. just because if we make function and call it it will make infinite loop 


Right:
for example
```jsx
import React, { useState, useEffect } from 'react';

const App = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const data = localStorage.getItem('data');
    if (data) {
      setData(JSON.parse(data));
    }
  }, []);

  return (
    <div>
      {data.map((item, index) => (
        <p key={index}>{item}</p>
      ))}
    </div>
  );
};
```

Wrong:
```jsx
import React, { useState, useEffect } from 'react';

const App = () => {
  const [data, setData] = useState([]);

  const loadData = () => {
    const data = localStorage.getItem('data');
    if (data) {
      setData(JSON.parse(data));
    }
  };

    loadData();

  return (
    <div>
      {data.map((item, index) => (
        <p key={index}>{item}</p>
      ))}
    </div>
  );
};
```

This will cause an infinite loop because the `loadData` function is called every time the component re-renders, which causes the component to re-render again, and so on. The `useEffect` hook with an empty dependency array ensures that the function is only called once after the initial render. -->

>> Note: useEffect(()=>{},[]) runs on every mount not on every render

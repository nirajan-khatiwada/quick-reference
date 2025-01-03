---
title: "React : 10" 
date: 2024-11-25
description: "A comprehensive guide on optimizing React applications using memo, useCallback and useMemo hooks."
showToc: true
categories: ["React"]
tags: ["React", "Performance", "memo", "useCallback", "useMemo", "Web Development"]
summary: "Learn how to optimize React applications using memo for component memoization, useCallback for function memoization, and useMemo for value memoization."
images: ["/images/react/react.jpg"]
---
# 44. Optimizing Performance
## 44.1. memo
memo is a higher-order function in React that optimizes functional components by preventing unnecessary re-renders. It returns a new component that behaves the same as the original one but only re-renders if its props change or internal state changes not every time the parent component re-renders.


Why Use memo?
When a parent component re-renders, all its child components also re-render by default—even if their props remain unchanged. This behavior can lead to performance bottlenecks. Using memo, we can avoid these unnecessary re-renders for child components.


Example:
```jsx
import { memo } from 'react';

const MyComponent = memo((props) => {
  return (
    <div>
      <h1>{props.title}</h1>
    </div>
  );
});
export default MyComponent;
```
In the above example, the `MyComponent` functional component is wrapped with the `memo` function. This ensures that the component will only re-render if its props have changed or if its satate has been change not every time the parent component re-renders.


Use Case:
- Before using memo:
In this example, the Custom component re-renders unnecessarily whenever the parent component re-renders, even if its props haven't changed or internal state hasn't changed.
Custom.js
```jsx
import { useState } from 'react';

const Custom = ({ title }) => {
  const [count, setCount] = useState(0);

  return (
    <div>
      <h1>{title}</h1>
      <p>{count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
};

export default Custom;
```

App.js
```jsx
import { useState } from 'react';
import Custom from './Custom';

function App() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <Custom title="Counter" />
      <p>{count}</p>
      <button onClick={() => setCount(count + 1)}>Increment Parent Count</button>
    </div>
  );
}

export default App;
```
Problem: The Custom component re-renders whenever the count state in the App component changes, even though the title prop remains the same. This can cause unnecessary rendering and reduce performance.i.e child component re-renders even if the props are not changed when the parent component re-renders.


- After using memo:
Using memo, we can optimize the Custom component to only re-render when its props change.
Custom.jsx
```jsx
import { useState, memo } from 'react';

const Custom = memo(({ title }) => {
  const [count, setCount] = useState(0);

  return (
    <div>
      <h1>{title}</h1>
      <p>{count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
});

export default Custom;
```

App.js
```jsx
import { useState } from 'react';
import Custom from './Custom';

function App() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <Custom title="Counter" />
      <p>{count}</p>
      <button onClick={() => setCount(count + 1)}>Increment Parent Count</button>
    </div>
  );
}

export default App;
```
After using memo the Custom component will only re-render when its props change or state change i.e when the title prop changes or the count state of the Custom component changes . It will not re-render when the count state of the App component changes, which optimizes performance in this scenario as that change does not affect the Custom component.

## 44.2. useCallback
In every rerender of a component, the functions defined inside the component are recreated. This can lead to performance issues, especially when passing functions as props to child components. useCallback is a hook in React that memoizes functions to prevent unnecessary re-creations.

***Syntax:***
```jsx
useCallback(fn, dependencies) 
```
- `fn`: The function value that you want to cache. It can take any arguments and return any values. React will return (not call!) your function back to you during the initial render. On next renders, React will give you the same function again if the dependencies have not changed since the last render. Otherwise, it will give you the function that you have passed during the current render, and store it in case it can be reused later. React will not call your function. The function is returned to you so you can decide when and whether to call it.
- `dependencies`: An array of values that, when changed, will cause the function to be re-created. If the dependencies array is empty, the function will only be created once, and will not be re-created on subsequent renders.

> Whats the use of dependencies array in useCallback?
just because dependency array the function is recreated with the new values of the dependencies.

***Before using useCallback:***
```jsx
import { useState,memo } from 'react';

const Child = memo(({ handleClick }) => {
  return (
    <button onClick={handleClick}>Click Me</button>
  );
});

const Parent = () => {
  const [count, setCount] = useState(0);

  const handleClick = () => {
    setCount(count + 1);
  };

  return (
    <div>
      <p>{count}</p>
      <Child handleClick={handleClick} />
    </div>
  );
};
```
In the above example, the handleClick function is re-created on every re-render of the Parent component. As a result, the reference to the handleClick function passed as a prop to the Child component changes on every re-render of the Parent component. This causes the Child component to re-render unnecessarily, even though the handleClick function remains logically the same
After using useCallback:

```jsx
import { useState, useCallback, memo } from 'react';

const Child = memo(({ handleClick }) => {
  return (
    <button onClick={handleClick}>Click Me</button>
  );
});

const Parent = () => {
  const [count, setCount] = useState(0);

  const handleClick = useCallback(() => {
    setCount(count + 1);
  }, [count]);

  return (
    <div>
      <p>{count}</p>
      <Child handleClick={handleClick} />
    </div>
  );
};
```
By using useCallback, the handleClick function is memoized and will only be re-created when the count state changes. The reference to the handleClick function remains the same across re-renders of the Parent component unless the dependencies specified in the dependency array (in this case, [count]) change.
This ensures that the Child component only re-renders when the count state changes, and not when the handleClick function reference changes, thus improving performance.


## 44.3. useMemo
useMemo is a hook in React that memoizes the result of a function. It is similar to useCallback, but instead of memoizing a function, it memoizes the result of a function.

***Syntax:***
```jsx
const cachedValue = useMemo(calculateValue, dependencies)
```
calculateValue: The function calculating the value that you want to cache. It should be pure, should take no arguments, and should return a value of any type. React will call your function during the initial render. On next renders, React will return the same value again if the dependencies have not changed since the last render. Otherwise, it will call calculateValue, return its result, and store it so it can be reused later.
dependencies: An array of values that, when changed, will cause the function to be re-executed.


***return*** 
On the initial render, useMemo returns the result of calling calculateValue with no arguments.During next renders, it will either return an already stored value from the last render (if the dependencies haven’t changed), or call calculateValue again, and return the result that calculateValue has returned.


***Before using useMemo:***
```jsx
import { useState, memo } from 'react';

const fibonacci = (n) => {
  if (n <= 1) {
    return n;
  }
  return fibonacci(n - 1) + fibonacci(n - 2);
};

const Fib = ()=>{
  const [count, setCount] = useState(1);
  const result = fibonacci(100000000000);

  return (
    <div>
      <p>{result} and count is {count}</p>
      <button onClick={() => setCount(count + 1)}>Increase Count</button>
    </div>
  );
}
```
In the above example, the fibonacci function is called on every re-render of the Fib component. This can lead to performance issues, especially when the function is computationally expensive. In this case, the fibonacci function is called with a large number, which can cause the component to freeze or crash.

***After using useMemo:***
```jsx
import { useState, useMemo } from 'react';

const fibonacci = (n) => {
  if (n <= 1) {
    return n;
  }
  return fibonacci(n - 1) + fibonacci(n - 2);
};

const Fib = ()=>{
  const [count, setCount] = useState(1);
  const result = useMemo(() => fibonacci(100000000000), []);

  return (
    <div>
      <p>{result} and count is {count}</p>
      <button onClick={() => setCount(count + 1)}>Increase Count</button>
    </div>
  );
}
```
By using useMemo, the result of the fibonacci function is memoized and will only be re-calculated when the dependencies specified in the dependency array change. In this case, the fibonacci function is only called once during the initial render of the Fib component, and the result is stored and reused on subsequent renders. This optimizes performance by preventing unnecessary re-calculation of the fibonacci function on every re-render of the component.




# 45.Key
conside a scenarion where your base component state variable need to be initialized with the value of the props passed to the component.
since the state variable is initialized with the props value, the state variable will not be updated when the props value changes as it is initialized only.
to handle we can either use useEffect or we can use key prop.

***Using useEffect:***
```jsx
import { useEffect, useState } from 'react';
const Parent = () => {
  const [value, setValue] = useState(0);

  return (
    <div>
      <button onClick={() => setValue(value + 1)}>Increment</button>
      <Child value={value} />
    </div>
  );
};
const Child = ({ value }) => {
  const [stateValue, setStateValue] = useState(value);
  useEffect(() => {
    setStateValue(value);
  }, [value]);

  return (
    <div>
      <p>State Value: {stateValue}</p>
      <p>Props Value: {value}</p>
    </div>
  );
};
```

stateValue is initialized with the value prop and  `const [stateValue, setStateValue] = useState(value);` runs only once during initial render so  useEffect is used to update the stateValue when the value prop changes.

***Using key prop:***
```jsx
import { useState } from 'react';
const Parent = () => {
  const [value, setValue] = useState(0);

  return (
    <div>
      <button onClick={() => setValue(value + 1)}>Increment</button>
      <Child key={value} value={value} />
    </div>
  );
};

const Child = ({ value }) => {
  const [stateValue, setStateValue] = useState(value);

  return (
    <div>
      <p>State Value: {stateValue}</p>
      <p>Props Value: {value}</p>
    </div>
  );
};
```
IN the above example,When a key changes between renders, React will create a new instance of the component. By using the key prop with the value prop, we ensure that a new instance of the Child component is created whenever the value prop changes. This allows the stateValue to be initialized with the new value prop on every render, without the need for useEffect.


> Note:The `useState()` hook us run only one time during the initial render of the component. If the state variable is initialized with a prop value, it will not be updated when the prop value changes. To handle this scenario, we can use the `useEffect()` hook to update the state variable when the prop value changes. Alternatively, we can use the `key` prop to create a new instance of the component whenever the prop value changes, allowing the state variable to be initialized with the new prop value on every render.
> Similar goes for useReducer() and useRef() hooks as well.
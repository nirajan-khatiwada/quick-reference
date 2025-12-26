---
title: "React Day 7: useRef, Refs & Portals"
slug: "react-day-7-refs-portals"
date: 2024-11-22
description: "Deep dive into React Refs and Portals. Learn useRef, ref forwarding, useImperativeHandle, and how to render outside the DOM hierarchy."
showToc: true
weight: 7
series: ["React"]
categories: ["React", "Frontend"]
tags: ["React", "useRef", "Portals", "DOM Manipulation", "Hooks"]
summary: "Day 7 of React series. Master direct DOM manipulation with Refs and rendering outside the main tree with Portals."
images: ["/images/react/react.jpg"]
---

# 36. useRef Hook in React
useRef is a hook that is specially designed to work with DOM elements. It allows you to create a reference to a DOM element and access it directly in your components so you can modify it or read its properties as needed.

Another important distinction is that useRef holds the same reference across re-renders of the component Similarly, useState also retains its value between renders. However, updating a state value with useState will always trigger a re-render, whereas updating the value of a useRef does not.
Its explained in the below example in ## 2. Advanvced Usage


## 1. Basic Usage

### 1. Import useRef
```jsx
import { useRef } from 'react';
```

### 2. Create a Reference
```jsx
const myRef = useRef();
```

### 3. Attach to DOM Elements
```jsx
function MyComponent() {
  const myRef = useRef();
  return (
    <div ref={myRef}>
      <h1>useRef Example</h1>
    </div>
  );
}
```

### 4. Accessing the Reference
```jsx
// Access the DOM element using .current
const element = myRef.current;
```
>use `myRef.current.value` for input elements.
>use `myRef.current.checked` for checkbox elements.
>use `myRef.current.focus()` to focus on an element.
>use `myRef.current.style` to access the style object of an element.

> Note: While you can access DOM elements directly with useRef, it's recommended to avoid manipulating them directly unless necessary.

## Practical Example: Form Input

Here's a complete example showing how to use useRef with form inputs:

```jsx
import { useRef, useState } from 'react';

function InputExample() {
  const inputRef = useRef();
  const [inputValue, setInputValue] = useState('');

  const handleClick = () => {
    setInputValue(inputRef.current.value);
    inputRef.current.value = ''; // Clear input after reading
  };

  return (
    <div>
      <input type="text" ref={inputRef} placeholder="Type something..." />
      <button onClick={handleClick}>Save Input</button>
      <p>Saved value: {inputValue}</p>
    </div>
  );
}
```
Explanation:
- We create a reference to the input element using useRef.
- When the button is clicked, we read the input value using inputRef.current.value and update the state.
- We clear the input field by setting inputRef.current.value to an empty string.





## 2. Advanced Usage of `useRef` and `useState`


- `useRef` and `useState` are both hooks used in React.
- Both hooks help us store values, but they behave differently:
  - `useState`: The value is persistent across re-renders, but updating it triggers a re-render.
  - `useRef`: The value is also persistent across re-renders, but updating it does **not** trigger a re-render.

### 2.1. Managing Previous Values in a Stopwatch

Here’s an example of how to use `useRef` and `useState` to build a simple stopwatch in React:

```jsx
import { useRef, useState } from 'react';

function Stopwatch() {
  const timerRef = useRef(0); // To store the timer ID
  const [time, setTime] = useState(0); // To store the current time
  const [isRunning, setIsRunning] = useState(false); // To track if the stopwatch is running

  // Start the timer when the Start button is clicked
  const startTimer = () => {
    if (!isRunning) {
      timerRef.current = setInterval(() => {
        setTime((time) => time + 1); // Increment the time every second
      }, 1000);
      setIsRunning(true); // Set the timer as running
    }
  };

  // Stop the timer when the Stop button is clicked
  const stopTimer = () => {
    clearInterval(timerRef.current); // Clear the interval to stop the timer
    setIsRunning(false); // Set the timer as not running
  };

  // Reset the timer when the Reset button is clicked
  const resetTimer = () => {
    clearInterval(timerRef.current); // Clear the interval to stop the timer
    setIsRunning(false); // Set the timer as not running
    setTime(0); // Reset the time to 0
  };

  return (
    <div>
      <h1>Stopwatch</h1>
      <p>Time: {time} seconds</p>
      <button onClick={startTimer}>Start</button>
      <button onClick={stopTimer}>Stop</button>
      <button onClick={resetTimer}>Reset</button>
    </div>
  );
}
```

### Explanation

1. **Creating `useRef` and `useState` variables:**
   - `timerRef`: This holds the timer ID (returned by `setInterval`). We use `useRef` here because we don’t need the component to re-render when the timer ID changes.
   - `time`: This stores the current time value of the stopwatch, and we use `useState` for this because we want the component to re-render whenever the time updates.
   - `isRunning`: This tracks whether the stopwatch is running or not.

2. **Starting the timer (Start Button):**
   - When the "Start" button is clicked, we check if the timer is already running. If it isn’t, we start it by calling `setInterval`, which increments the time value every second.
   - `setInterval` returns an interval ID that we store in `timerRef.current`. This ID will be used to stop the timer later.

3. **Stopping the timer (Stop Button):**
   - When the "Stop" button is clicked, we clear the interval using `clearInterval(timerRef.current)` to stop the timer.
   - We also set `isRunning` to `false` to indicate that the timer is no longer running.

4. **Resetting the timer (Reset Button):**
   - When the "Reset" button is clicked, we clear the interval to stop the timer, set `isRunning` to `false`, and reset the `time` back to 0.

### Why `useRef`?

- **Why not just use a regular variable?**
  - A regular variable inside the component would reset every time the component re-renders. Since the timer is being updated every second, this would cause issues because the value would be reset each time, and the timer wouldn’t function correctly.
  
- **Why `useRef` over `useState` for the timer ID?**
  - We use `useRef` to store the timer ID because updating it with `useState` would trigger a re-render every time the timer ID changes. Since the timer is running independently, we don’t need a re-render, so `useRef` is more efficient here.

### Key Takeaways

- `useRef` is useful for storing values that don’t require the component to re-render when they change.
- `useState` is used for values that should trigger a re-render when updated, like the time value in our stopwatch.
- `useRef` does not cause a re-render when its value changes, making it ideal for holding values like the interval ID that don’t need to affect the UI.



## Common Use Cases
- Storing previous values
- Managing focus, text selection, or media playback
- Integrating with third-party DOM libraries
- Accessing underlying DOM elements

> Isolation in Components: Any variable that is declared inside a component is isolated to that component. It is not shared with other components unless explicitly passed as props. This isolation helps maintain the encapsulation and modularity of components in React.



# 37.Forwarding Refs in React
Forwarding refs is a technique in React that allows you to pass a ref from a parent component to a child component. This is useful when you want to access the DOM element of a child component from a parent component.

## 1. Basic Usage

### 1.Import useRef
```jsx
import { useRef } from 'react';
```

### 2. Create a Ref in the Parent Component
```jsx
const myRef= useRef();
```

## 3. Pass the Ref to the Child Component
```jsx
<MyChildComponent ref={myRef} />
```

## 4. Using ref in the Child Component
```jsx
const MyChildComponent = ({ref})=>{
  return <input ref={ref} />;
};

```

## 6. Accessing the Ref in the Parent Component
```jsx
const element = myRef.current.value;
```

## Practical Example: Input Focus
to take input from user and focus on the input field of the child component from the parent component.

```jsx
import React, { useRef } from 'react';

const InputComponent =({title,ref}) => {
  return<> <h1>{title}</h1>
  <input ref={ref}/> 
  </>
};

function ParentComponent() {
  const inputRef = useRef();
  const handleClick = () => {
    inputRef.current.focus();
    console.log(inputRef.current.value);
  };

  return (
    <div>
      <InputComponent ref={inputRef} title="ENter the Input"/>
      <button onClick={handleClick}>Focus Input</button>
    </div>
  );
}
```

# 38.useImperativeHandle in React
In large-scale applications, we generally avoid using refs directly to access child components. Instead, we use the useImperativeHandle hook to expose specific methods from the child component to the parent component. This approach allows the developer working on the parent component to interact with the child component's methods without needing to understand its internal implementation.
Additionally, this separation enables the developer of the child component to modify or update the child component independently, without affecting the parent component. Since only the exposed methods are used by the parent, changes to the internal structure of the child component do not disrupt the parent-child interaction.This is specially used in forwardRef to expose methods of child component to parent component.

## Basic Usage
### 1.Pass a Ref to the Child Component
```jsx
import {useRef} from 'react';
function App() {
  const childRef = useRef();
  return <ChildComponent ref={childRef} />;
}
```
=> Here, we create a ref using useRef and pass it to the ChildComponent using the ref prop.

### 2. Use useImperativeHandle in the Child Component with forwardRef to expose methods
```jsx
import { useImperativeHandle } from 'react';
const ChildComponent = ({ ref}) => {
  useImperativeHandle(ref, () => ({
    focus: () => {
      // Focus on the input element
    },
    reset: () => {
      // Reset the input element
    },
    inputValue:'vaule'
  }),[dependencies]);
  return <input />;
};
```
In the ChildComponent, we use the `useImperativeHandle` hook to expose the focus and reset methods to the parent component. The `ref` object is passed as the first argument, and the second argument is a `function` that returns an object containing the methods to be exposed.
`dependencies` is an optional array of values that, when changed, will trigger the re-evaluation of the function that returns the methods. If the dependencies array is not provided, the function will be called on every render and empty array will call only once in entire lifecycle.

### 3. Access the Exposed Methods in the Parent Component
```jsx
function App() {
  const childRef = useRef();
  const handleClick = () => {
    childRef.current.focus();
  };

 const resetClick = () => {
    childRef.current.reset();
  };

  return (
    <>
      <ChildComponent ref={childRef} />
      <button onClick={handleClick}>Focus Input</button>
      <button onClick={resetClick}>Reset Input</button>
    </>
  );
}
```
In the parent component, we can access the exposed methods using the `current` property of the ref object. In this example, we call the `focus` method when the "Focus Input" button is clicked.


## Practical Example: Use forwardRef and useImperativeHandle to Expose Methods for reset the input field and get the value of the input field.

```jsx
import {useRef} from 'react';
function App(){
  const childRef = useRef();
  const handleClick = () => {
    childRef.current.focus();
  };
  const resetClick = () => {
    childRef.current.reset();
  };
  const getValue = () => {
    console.log(childRef.current.value);
  };
  return (
    <>
      <ChildComponent ref={childRef} />
      <button onClick={handleClick}>Focus Input</button>
      <button onClick={resetClick}>Reset Input</button>
      <button onClick={getValue}>Get Value</button>
    </>
  );
}
export default App;
```

```jsx
import { useImperativeHandle,useRef } from 'react';
const ChildComponent = ({ref}) => {
  const inputRef = useRef();
  useImperativeHandle(ref, () => ({
    focus: () => {
      inputRef.current.focus();
    },
    reset: () => {
      inputRef.current.value = '';
    },
    value: inputRef.current.value
    
  }),[]);
  return <input ref={inputRef} />;
};
export default ChildComponent;
```

=> By using `useImperativeHandle`, we can expose specific methods from the child component to the parent component, allowing for more controlled interactions between the components such as focusing on the input field, resetting the input field, and getting the value of the input field in this example.
=> By using this approach, we can maintain a clear separation of concerns between the parent and child components, making it easier to manage and update the components independently.



# 37. Portals in React
Portals in React provide a way to render children components outside the DOM hierarchy of the parent component. This allows you to render a child component at a different location in the DOM, such as at the root level or inside a specific container, without affecting the parent's layout or styles.

## Importing portal from react-dom
```jsx
import { createPortal } from 'react-dom';
```

## using createPortal
```jsx
const MyPortal = ({title}) => {
  return createPortal(
  <>
    <h1>{title}</h1>
    <p>This is a portal</p>
  <>, 
  document.getElementById('portal-root'));
};
```
=>When the MyPortal component is rendered, the content will be rendered inside the element with the id 'portal-root', which can be located anywhere in the DOM.



---
title: "React : Day 2"
date: 2024-11-18
description: "An in-depth guide to understanding and using hooks in React, including rules and examples."
showToc: true
categories: ["React"]
tags: ["React", "JavaScript", "Web Development", "Hooks"]
summary: "A detailed guide to help you understand and use hooks in React effectively."
images: ["/images/react/react.jpg"]
---

## 17. Hooks in React
Anythong that start with prefix `use` is considered as a hook in react

### 17.1. Rules of Hooks
1. Only Call Hook inside a component function

correct:
```jsx 
  function App() {
     const [val, setVal] = useState(0);
   }
```

Incorrect:
```jsx
    const [val, setVal] = useState(0);
    function App() {
    }
```

2. Only Call Hooks at the Top Level
Hook must not be called inside code statement (e.g., inside an if statement, loop, or nested function).
correct:
```jsx
function App() {
    const [val, setVal] = useState(0);
}
```

incorrect:
```jsx
function App() {
    if (true) {
        const [val, setVal] = useState(0);
    }
}
```

3.Hook can be used inside other custom hooks too

## 18. useState Hook
useState is a React hook that allows you to manage component-specific state. It provides a way to declare state variables in functional components and ensure that changes to these variables cause the component or child component to re-render while the parent component remains unaffected from where the component whose set state is triggered.

for example:
```jsx
function App() {
  return (
    <div>
      <MemoComp />
    </div>
  );
}

function MemoComp() {
  const [data, setData] = useState("No data");

  function handle() {
    setData("data");
  }

  return (
    <div>
      <p>{data}</p>
      <button onClick={handle}>Click me</button>
    </div>
  );
}
```
When button is clicked the handle function is called and the setData function is called which updates the data state variable. This cause the MemoComp and its child component to re-render with a new value of data.


### 18.1. Syntax
```jsx
const [state, setState] = useState(initialState);
```

### 18.2. Managing State
State management in React involves handling data and telling React to re-execute a function using the useState hook. This ensures that state updates lead to new state values.
Example:
```jsx
const [countes, setcountes] = useState(0);
```

- `countes` is the state variable that holds the current state value.
- `setcountes` is the function that updates the state variable.
- `useState(0)` is the initial state value.

How it works:
Initially, the state variable `countes` is set to `0`. When the `setcountes` function is called, it updates the state variable to a new value. This triggers a re-render of the component, updating the UI with the new state value.

### 18.3 Updating State Based on Previous State
Suppose the age is 42. The handler calls `setAge(age + 1)` three times.
```jsx
function handleClick() {
    setAge(age + 1); // setAge(42 + 1)
    setAge(age + 1); // setAge(42 + 1)
    setAge(age + 1); // setAge(42 + 1)
}
```
if the initial age is `42`, after calling this function, the age will be `43`, not `45`.

To solve this problem, we use an updater function to pass setAge calls.
```jsx
function handleClick() {
    setAge(a => a + 1); // setAge(42 => 43)
    setAge(a => a + 1); // setAge(43 => 44)
    setAge(a => a + 1); // setAge(44 => 45)
}
```


After this age will be 45 so use updater function when you want to update value based on previous value & it's always recommended to use updater function in. 

It is mostly used in:
- Counters
- Toggles
- Incrementing or decrementing a value


### 18.4. Pitfalls in useState
In React state updates are asynchronous meaning they don't immediately reflect in the current execution cycle. When you call a state setter function like `setSelectedValue`, React schedules the state update for the next render. This can lead to unexpected behavior if you try to access the updated state immediately after setting it.

#### Example:

```javascript
function clickHandler(data) {
  setSelectedValue(`${data} is being clicked`);
  console.log(selectedTopic); // logs the old state, not updated one
}
```

### Why It Happens
- **State updates are asynchronous**: React batches state updates and applies them during the next render cycle to optimize performance. Therefore, the state change you request won’t be immediately reflected in the current execution.

- **Logging state immediately**: Since the update happens after the current execution cycle, logging the state/selected topic immediately after calling `setSelectedValue` will show the old value (before the update).

This can be fixed using `useEffect` which is read later.

**Note:** Always use the state variable when you want to reflect the changes in the UI.


## 19. An Example demostrating useState Hook
```jsx 
import {useState} from 'react';

function App(){
    const [count,setCount] = useState(0);
    return(){
        <div>
            {count}
        </div>
        <button onClick={() => setCount(count + 1)}>Increment</button>
    }
}
export default App;
```
In the above example, we have a functional component `App` that uses the `useState` hook to manage the state of the `count` variable. The initial value of `count` is set to `0` using `useState(0)`. The `setCount` function is used to update the value of `count` when the button is clicked. The `count` value is displayed in the UI, and clicking the button increments the count value by `1`.

## 20.Conditional Rendering in React
Conditional rendering is a technique used to render different components or elements based on certain conditions. In React, conditional rendering can be achieved using ternary operators, and logical operators like `&&` .

### 20.1. Ternary Operator
The ternary operator is a concise way to write conditional statements in JavaScript. It consists of a condition followed by a question mark `?`, an expression to execute if the condition is true, a colon `:`, and an expression to execute if the condition is false.

Example:
```jsx
function App() {
  const isLoggedIn = true;
  return (
    <div>
      {isLoggedIn ? <p>Welcome, User!</p> : <p>Please log in</p>}
    </div>
  );
}
```

Also We can write jsx code in variable and use it in return statement
```jsx
function App() {
  const isLoggedIn = true;
  const welcomeMessage=<p>Welcome, User!</p>;
  const loginMessage=<p>Please log in</p>;
  return (
    <div>
      {isLoggedIn ? welcomeMessage : loginMessage}
    </div>
  );
}
```

### 20.2. Logical && Operator
The logical `&&` operator is another way to conditionally render elements in React. The `&&` operator works by evaluating the expression on the left side of the `&&` operator. If the expression is true, the expression on the right side of the `&&` operator is executed. If the expression is false, the right side is not executed.

Example:
```jsx
function App() {
  const isLoggedIn = true;
  return (
    <div>
      {isLoggedIn && <p>Welcome, User!</p>}
      {isLoggedIn && <button>Logout</button>}
      {!isLoggedIn && <p>Please log in</p>}
    </div>
  );
}
```

Also We can write jsx code in variable and use it in return statement

```jsx
function App() {
  const isLoggedIn = true;
  const welcomeMessage=<p>Welcome, User!</p>;
  const logoutButton=<button>Logout</button>;
  const loginMessage=<p>Please log in</p>;
  return (
    <div>
      {isLoggedIn && welcomeMessage}
      {isLoggedIn && logoutButton}
      {!isLoggedIn && loginMessage}
    </div>
  );
}
```

## 21.Outputting list data dynamically
In react we use map function to output list data dynamically as using map.

### 21.1. Have a list of data
You typically store the list in an array, which might come from a state, props, or external data source like an API
```jsx
const data = [
  { id: 1, name: "John" },
  { id: 2, name: "Doe" },
  { id: 3, name: "Jane" },
];
```

### 21.2 Using map function to output list data
```jsx
const listItems = data.map((item) => <li key={item.id}>{item.name}</li>);  
```
Key is used to uniquely identify each element in the list. It helps React identify which items have changed, are added, or are removed.It can be number or string.

### 21.3. Rendering the list
Use {} to embed the transformed list inside your component’s JSX.
```jsx 
<ul>{listItems}</ul>;
```

### 21.4. Putting it all together
```jsx
function App() {
  const data = [
    { id: 1, name: "John" },
    { id: 2, name: "Doe" },
    { id: 3, name: "Jane" },
  ];

  const listItems = data.map((item) => <li key={item.id}>{item.name}</li>);

  return <ul>{listItems}</ul>;
}
```

### 21.5 Another form
```jsx
function App() {
  const data = [
    { id: 1, name: "John" },
    { id: 2, name: "Doe" },
    { id: 3, name: "Jane" },
  ];
  return <ul>{data.map((item) => <li key={item.id}>{item.name}</li>);
}</ul>;
}
```


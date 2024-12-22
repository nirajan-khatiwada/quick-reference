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

### 17.2. useState Hook
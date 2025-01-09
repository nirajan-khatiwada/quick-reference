---
title: "React : Day 12"
date: 2024-11-27
description: "A comprehensive guide on state management with React-Redux and @reduxjs/toolkit."
showToc: true
categories: ["React"]
tags: ["React", "Redux", "@reduxjs/toolkit", "State Management"]
summary: "Learn how to integrate Redux and Redux Toolkit in React for efficient state management, including slices, actions, and reducers."
images: ["/images/react/react.jpg"]
---

# 50. StateManagement using react-redux

## 1. Introduction
Reduct is the popular library for state management in react . To manage the state in react we can use the react-redux and @reduxjs/toolkit. In this article we will see how to use the react-redux and @reduxjs/toolkit to manage the state in react.


## 2. Installation
To install the react-redux and @reduxjs/toolkit we can use the following command.
```bash
npm install react-redux @reduxjs/toolkit
```

## 3. Create a store Folder
Folder structure
```bash
src
|__store
|  |__index.js
|  |__counterSlice.js
|  |__toggleSlice.js
```
> Note: The folder structure is not mandatory. You can create the store folder anywhere in the src folder but its a good practice to create a separate folder for the store.




## 4. Create a Slice
A slice is a collection of reducer functions and actions for a specific feature. A slice is created using the createSlice function from the @reduxjs/toolkit. A slice contains the following properties.
- name: The name of the slice.
- initialState: The initial state of the slice.
- reducers: An object containing the reducer functions to handle the actions.

Syntax:
```jsx
import { createSlice } from '@reduxjs/toolkit';

const sliceName = createSlice({
  name: 'sliceName',
  initialState: initialState,
  reducers: {
    reducerName: (state, action) => {
      // reducer logic
      //action contain data send by dispatch function using action.payload
    },
    reducerName: (state, action) => {
      // reducer logic
      //action contain data send by dispatch function using action.payload
    }
  }
});
```
> action is optional. If the action does not require any parameter then we can skip the action.
> To get data from the action we must use action.payload otherwise it will not work.

Example of counterSlice.js
```jsx
import { createSlice } from '@reduxjs/toolkit';

const counterSlice = createSlice({
  name: 'counter',
  initialState: {
    value: 0
  },
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload;
  }
  }
});
export const counterActions = counterSlice.actions;
export default counterSlice;
```

Example of toggleSlice.js
```jsx
import { createSlice } from '@reduxjs/toolkit';

const toggleSlice = createSlice({
  name: 'toggle',
  initialState: {
    value: false
  },
  reducers: {
    toggle: (state) => {
      state.value = !state.value;
    }
  }
});
export const toggleActions = toggleSlice.actions;
export default toggleSlice;
```

>Note: In Redux Toolkit, we can directly modify the state object instead of returning a completely new state object. This is possible because Redux Toolkit uses the Immer library under the hood. Immer automatically creates a new state object based on the changes we make to the current state.However, if we explicitly return a new state object, Redux Toolkit will skip Immer's functionality and directly use the new state object as the updated state.


## 5. Create a Store
The store is created using the configureStore function from the @reduxjs/toolkit. The configureStore function takes an object as an argument with the following properties.
- reducer: An object containing the slices.

> Note: There is only one Store in the whole application.

General Syntax:
```jsx
import { configureStore } from '@reduxjs/toolkit';
import SliceName from './SliceName';

const store = configureStore({
  reducer: {
    sliceName1: SliceName1.reducer
    SliceName2: SliceName2.reducer
    SliceName3: SliceName3.reducer
  }
});

export default store;
```
> Note: The slicer name of key can be anything but the value should be the reducer function of the slice.

Example of index.js
```jsx
import { configureStore } from '@reduxjs/toolkit';
import counterSlice from './counterSlice';
import toggleSlice from './toggleSlice';

const store = configureStore({
  reducer: {
    counter: counterSlice.reducer,
    toggle: toggleSlice.reducer
  }
});
export default store;
```

## 6. Provide the Store
The store is provided to the application using the Provider component from the react-redux. The Provider component takes the store as a prop. 
> Note: Always wrap the root component of the application with the Provider component just because only warapped component and its children can access the store.

Example of main.js/index.jsx
```jsx
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './store';
import App from './App';

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
```

## 7. Dispatch an Action
To dispatch an action we can use the useDispatch hook from the react-redux. The useDispatch hook returns a reference to the dispatch function. We can use the dispatch function to dispatch an action.

Syntax:
```jsx
import { useDispatch } from 'react-redux';
import { actionName } from './sliceName';

function ComponentName() {
  const dispatch = useDispatch();
    const handleClick = () => {
        dispatch(actionName(parameter));
    };
}
```
> Note: The parameter is optional. If the action does not require any parameter then we can skip the parameter.


Example of Counter.js
```jsx
import React from 'react';
import { useDispatch } from 'react-redux';
import { counterActions } from './counterSlice';
import {toggleActions} from './toggleSlice';

function Counter() {
  const dispatch = useDispatch();
  const increment = () => {
    dispatch(counterActions.increment());
  };
  const decrement = () => {
    dispatch(counterActions.decrement());
  };
  const incrementByAmount = () => {
    dispatch(counterActions.incrementByAmount(5));
  };

    const toggle = () => {
        dispatch(toggleActions.toggle());
    };

    return (
    <div>
      <h1>Counter</h1>
      <button onClick={increment}>Increment</button>
      <button onClick={decrement}>Decrement</button>
      <button onClick={incrementByAmount}>Increment By 5</button>
      <button onClick={toggle}>Toggle</button>
    </div>
    );
}
export default Counter;
```

  
> When dispatch function is called all the components that are using the useSelector hook( using the state of the slice )  will be re-rendered.


## 8. Access the State
To access the state we can use the useSelector hook from the react-redux. The useSelector hook takes a function as an argument. The function takes the state as an argument and returns the part of the state that we want to access.

Syntax:
```jsx
import { useSelector } from 'react-redux';

function ComponentName() {
  const state = useSelector((state) => state.sliceName);
}
```

Example of Counter.js
```javascript
import React from 'react';
import { useSelector } from 'react-redux';

function Counter() {
  const counter = useSelector((state) => state.counter.value);
    const toggle = useSelector((state) => state.toggle.value);
  return (
    <div>
    {toggle && <h1>Toggle</h1>}
      <h1>Counter</h1>
      <h2>{counter}</h2>
    </div>
  );
}
export default Counter;
```
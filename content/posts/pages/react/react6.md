---
title: "React : Day 6"
date: 2024-11-21
description: "A comprehensive guide on how to debug React applications using various methods including console.log, Strict Mode, and React Developer Tools."
showToc: true
categories: ["React"]
tags: ["React", "Debugging", "JavaScript", "Web Development"]
summary: "Learn how to debug React applications using console.log, Strict Mode, and React Developer Tools."
images: ["/images/react/react.jpg"]
---

# 35. Debugging in react
## 35.1 Using console.log
```jsx
import React from 'react';
const MyComponent = () => {
    const name = 'John Doe';
    console.log(name);
    return (
        <div>
            <h1>Debugging in React</h1>
        </div>
    )
}
export default MyComponent;
```

## 35.2 Strict Mode
=> In Strict Mode,React will render components twice. It helps to idenify the issues in the code.
```jsx
import React,{StrictMode} from 'react';
const MyComponent = () => {
    const name = 'John Doe';
    console.log(name);
    return (
        <StrictMode>
            <div>
                <h1>Debugging in React</h1>
            </div>
        </StrictMode>
    )
}
export default MyComponent;
```
> You can wrap any component in StrictMode.Just difference is that it will render the component twice.

=> We can wrap the entire application in StrictMode in the index.js file.
```jsx
import React,{StrictMode} from 'react';
import ReactDOM from 'react-dom';
import App from './App';
ReactDOM.render(
  <StrictMode>
    <App />
  </StrictMode>,
  document.getElementById('root')
);
```

## 35.3 React Developer Tools
[React Developer Tools](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi) is a Chrome extension that allows you to inspect the React component hierarchy in the Chrome Developer Tools.
[Videos](https://www.youtube.com/watch?v=l8knG0BPr-o)


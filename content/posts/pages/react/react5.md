---
title: "Styling in CSS"
date: 2024-11-17
description: "A comprehensive guide on how to style React components using inline styles, external styles, dynamic styles, and CSS modules."
showToc: true
categories: ["React"]
tags: ["React", "CSS", "Styling", "JavaScript", "Web Development"]
summary: "Learn various methods to style React components including inline styles, external styles, dynamic styles, and CSS modules."
images: ["/images/react/react.jpg"]
---

# 34.Styling in CSS

### 34.1 Setting Inline Styles
=> In react for inline styles we use the `style` attribute and pass an object with camelCase properties.

```jsx
import React from 'react';
const myStyle = {
    color: 'blue',
    backgroundColor: 'yellow'
}
const MyComponent = () => {
    return (
        <div style={myStyle}>
            <h1>Inline Styles</h1>
        </div>
    )
}
```
or we can use the `style` attribute directly in the element.

```jsx
import React from 'react';
const MyComponent = () => {
    return (
        <div style={{color: 'blue', backgroundColor: 'yellow'}}>
            <h1>Inline Styles</h1>
        </div>
    )
}
```


## 34.2 Setting External Styles
=> We can also use external CSS files in react. We can import the CSS file in the component file and use the class name in the

```jsx
import React from 'react';
import './MyComponent.css';
const MyComponent = () => {
    return (
        <div className="myStyle">
            <h1>External Styles</h1>
        </div>
    )
}
```

## 34.3 Setting Inline Dynamic Styles
=>You can also set the inline styles dynamically by using the state.
``` jsx
import React,{useState} from 'react';
const App=()=>{
    const [valid,setValid]=useState(true);
    function changeStyle(){
        setValid(!valid);
    }

    const myStyle={
        color:valid?'blue':'red',
        backgroundColor:valid?'yellow':'green'
    }
    return(
        <div>
            <button onClick={changeStyle}>Change Style</button>
            <div style={myStyle}>
                <h1>Inline Dynamic Styles</h1>
            </div>
        </div>
    )

}
export default App;
```
or we can use the `style` attribute directly in the element.

```jsx
import React,{useState} from 'react';
const App=()=>{
    const [valid,setValid]=useState(true);
    function changeStyle(){
        setValid(!valid);
    }
    return(
        <div>
            <button onClick={changeStyle}>Change Style</button>
            <div style={{color:valid?'blue':'red',backgroundColor:valid?'yellow':'green'}}>
                <h1>Inline Dynamic Styles</h1>
            </div>
        </div>
    )

}
export default App;
```

## 34.4 Setting Css Classes Dynamically
=> We can also set the CSS classes dynamically by using the state.

```jsx
import React,{useState} from 'react';
import './MyComponent.css';
const App=()=>{
    const [valid,setValid]=useState(true);
    const [active,setActive]=useState(true);
    function changeStyle(){
        setValid(!valid);
        setActive(!active);
    }
    return(
        <div>
            <button onClick={changeStyle}>Change Style</button>
            <div className={`div-control ${valid?'right':'wrong'} ${active?'active':'inactive'}`}>
                <h1>Setting Css Classes Dynamically</h1>
            </div>
        </div>
    )
}
export default App;
```


## 34.5 Css modules
=> Every time we import Css file in react component they are regarded as global styles i.e One component style can affect another component style 
=>So, to avoid this we can use CSS modules. CSS modules are local by default. We can use CSS modules by naming the CSS file as `filename.module.css`.
=> The CSS file is imported in the component file and the class name is used as an object.


Problem1
=> Imagine that you have two components with the same class name. The styles of one component can affect the styles of another component.which is not good for the application to solve this problem we can use CSS modules.

Structure of the project
```
src
|_components
    |_MyComponent
        |_MyComponent.js
        |_MyComponent.module.css
```

Step 1: Create a CSS file with the name `MyComponent.module.css`
```css
.myStyle{
    color: blue;
    background-color: yellow;
}

.right{
    text-align: right;
}
```

Step 2: Import the CSS file in the component file as shown below.
```jsx
import React from 'react';
import styles from './MyComponent.module.css';
```
step 3: Use the class name as shown below.
```jsx
const MyComponent = () => {
    return (
        <div className={styles.myStyle}>
            <h1>CSS Modules</h1>
        </div>
    )
}
```

Combined code
```jsx
import React from 'react';
import styles from './MyComponent.module.css';
const MyComponent = () => {
    return (
        <div className={styles.myStyle}>
            <h1>CSS Modules</h1>
        </div>
    )
}
export default MyComponent;
```



### 34.5.1 Combining multiple classes
```jsx
import React from 'react';
import styles from './MyComponent.module.css';
const MyComponent = () => {
    return (
        <div className={`${styles.myStyle} ${styles.right}`}>
            <h1>CSS Modules</h1>
        </div>
    )
}
export default MyComponent;
```



## 34.6 Dynamic CSS Modules
=> We can also set the CSS classes dynamically by using the state.

```jsx
import React,{useState} from 'react';
import styles from './MyComponent.module.css';

const MyComponent = () => {
    const [valid,setValid]=useState(true);
    const [active,setActive]=useState(true);
    function changeStyle(){
        setValid(!valid);
        setActive(!active);
    }
    return (
        <div className={`${styles.myStyle} ${valid?styles.right:styles.wrong} ${active?styles.active:styles.inactive}`}>
            <h1>CSS Modules</h1>
            <button onClick={changeStyle}>Change Style</button>
        </div>
    )
}

export default MyComponent;
```


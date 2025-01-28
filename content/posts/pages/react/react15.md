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

### Left Over Topics
- **Authentication**
- **Tanstack Query**
- **React Hook Form**



### Some UI Libraries
- Aceternity UI
- Shadcn UI
- Hover.dev
- Radix ui
- React toastify


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
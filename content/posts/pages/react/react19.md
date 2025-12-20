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

## `useId` Hook in React

For giving id to elements in React 19, you can use the `useId` hook. This hook generates a unique ID that can be used for accessibility purposes, such as linking labels to form inputs.

```jsx
import React, { useId } from "react";
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
import React, { useId } from "react";
const MyComponent = () => {
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
};
export default MyComponent;
```

This is ok but we can use the following way to link multiple elements with the same id:

```jsx
import React, { useId } from "react";
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

## `use` api in React

Unlike React Hooks,`use` can be called within loops and conditional statements like if. Like React Hooks, the function that calls use must be a Component or Hook.It is used in

- To get content from context  
  Now you can use `use` to get content from context.

```jsx
import React, { use } from "react";

const MyContext = React.createContext();
const MyComponent = () => {
  const value = use(MyContext); // Is Equivalent to useContext(MyContext)

  return <div>{value}</div>;
};
export default MyComponent;
```

Also we can use it inside loops and conditionals:

```jsx
import React, { use } from "react";
const MyContext = React.createContext();
const MyComponent = () => {
  const values = [1, 2, 3];
  return (
    <div>
      {values.map((value) => {
        const contextValue = use(MyContext); // Using use inside a loop
        return (
          <div key={value}>
            {contextValue} - {value}
          </div>
        );
      })}
    </div>
  );
};
export default MyComponent;
```

## ENV Variables in React

To use ENV variables in VITE first you need to prefix the variable with `VITE_`. This is a security feature to ensure that only explicitly defined variables are exposed to the client-side code.

example:

```bash
VITE_API_URL=https://api.example.com
```

You can access these variables in your React components using `import.meta.env`.

For example, if you have an environment variable named `VITE_API_URL`, you can access it like this:

```jsx
const apiUrl = import.meta.env.VITE_API_URL;
console.log(apiUrl);
```

## Activity Component in React 

In React, when you want to conditionally show or hide a component, the most common approach is to mount or unmount it based on a condition:

```jsx
{isActive && <Sidebar />}
```

While this works, unmounting a component destroys its internal state. This behavior is not always desirable—especially for UI elements like sidebars, tabs, or modals where users expect their previous interactions to be preserved.

Problem: State Loss When a Component Unmounts

Consider the following Sidebar component that keeps track of the currently selected menu item:

```jsx
import React, { useState } from "react";

const Sidebar = () => {
  const SIDEBAR = ["Home", "Profile", "Settings", "Logout"];
  const [activeItem, setActiveItem] = useState(null);

  return (
    <ul>
      {SIDEBAR.map((item, index) => (
        <li
          key={index}
          style={{
            fontWeight: activeItem === index ? "bold" : "normal",
            color: activeItem === index ? "blue" : "black",
            cursor: "pointer",
          }}
          onClick={() => setActiveItem(index)}
        >
          {item}
        </li>
      ))}
    </ul>
  );
};

export default Sidebar;
```

Now, toggle this sidebar from a parent component:

```jsx
const App = () => {
  const [isShowingSidebar, setIsShowingSidebar] = useState(true);

  return (
    <div>
      <button onClick={() => setIsShowingSidebar(!isShowingSidebar)}>
        Toggle Sidebar
      </button>

      {isShowingSidebar && <Sidebar />}
    </div>
  );
};
```

What’s the Issue?

- When isShowingSidebar becomes false, the Sidebar component unmounts
- When it mounts again, its internal state (activeItem) is reset
- The previously selected menu item is lost

Traditional Solution: Lift State Up to the Parent

To preserve state, developers traditionally move the sidebar’s state to a parent component that never unmounts:

```jsx
const Sidebar = ({ activeItem, setActiveItem }) => {
  const SIDEBAR = ["Home", "Profile", "Settings", "Logout"];

  return (
    <ul>
      {SIDEBAR.map((item, index) => (
        <li
          key={index}
          style={{
            fontWeight: activeItem === index ? "bold" : "normal",
            color: activeItem === index ? "blue" : "black",
            cursor: "pointer",
          }}
          onClick={() => setActiveItem(index)}
        >
          {item}
        </li>
      ))}
    </ul>
  );
};
```

```jsx
const App = () => {
  const [isShowingSidebar, setIsShowingSidebar] = useState(true);
  const [activeItem, setActiveItem] = useState(null);

  return (
    <div>
      <button onClick={() => setIsShowingSidebar(!isShowingSidebar)}>
        Toggle Sidebar
      </button>

      {isShowingSidebar && (
        <Sidebar
          activeItem={activeItem}
          setActiveItem={setActiveItem}
        />
      )}
    </div>
  );
};
```

Downsides of This Approach

- Extra prop drilling
- State management logic moves away from the component that owns it
- Becomes harder to scale and maintain for complex UIs

React 19 Solution: Activity Component

Basic Syntax

```jsx
<Activity mode={isShowingSidebar ? "visible" : "hidden"}>
  <Sidebar />
</Activity>
```

Sidebar Example Using Activity

```jsx
import { Activity } from "react";

const App = () => {
  const [isShowingSidebar, setIsShowingSidebar] = useState(true);

  return (
    <div>
      <button onClick={() => setIsShowingSidebar(!isShowingSidebar)}>
        Toggle Sidebar
      </button>

      <Activity mode={isShowingSidebar ? "visible" : "hidden"}>
        <Sidebar />
      </Activity>
    </div>
  );
};
```

What Happens Now?

- The sidebar is visually hidden, not unmounted
- The selected menu item remains intact
- When shown again, the sidebar restores exactly where it left off

How Activity Works Internally

When an Activity boundary is hidden:

- React applies display: none to hide the UI
- All Effects are cleaned up (subscriptions, timers, listeners)
- The component still re-renders in response to new props (at a lower priority)

When the boundary becomes visible again:

- React restores the UI
- Internal state is preserved
- Effects are re-created

Why Activity Is Powerful

You can think of Activity as background rendering:

- Keeps UI state alive
- Avoids unnecessary remounts
- Prevents unwanted side effects while hidden
- Perfect for sidebars, tabs, drawers, and multi-panel layouts

## Support for document metadata in React 19

In HTML, document metadata tags like <title>, <link>, and <meta> are reserved for placement in the <head> section of the document. In React, the component that decides what metadata is appropriate for the app may be very far from the place where you render the <head> or React does not render the <head> at all. In the past, these elements would need to be inserted manually in an effect, or by libraries like react-helmet, and required careful handling when server rendering a React application.

In React 19, we’re adding support for rendering document metadata tags in components natively:

```jsx
function MyApp() {
    return (
        <>
            <title>My App</title>
            <meta name="description" content="This is my app" />
            <link rel="icon" href="/favicon.ico" />
            <main>
                <h1>Welcome to my app!</h1>
            </main>
        </>
    );
}
```

When React renders this component, it will see the <title> <link> and <meta> tags, and automatically hoist them to the <head> section of document. By supporting these metadata tags natively, we’re able to ensure they work with client-only apps, streaming SSR, and Server Components

## <Context> as a provider in React 19

In React 19, you can render <Context> as a provider instead of <Context.Provider>:

```jsx
import React from "react";
const MyContext = React.createContext();
const MyComponent = () => {
  return (
    <MyContext value={"Hello, World!"}>
      <ChildComponent />
    </MyContext>
  );
};
```

> Note: In future releases, we may deprecate <Context.Provider> in favor of this new syntax. This change aims to simplify the API and make it more intuitive for developers to use context providers in their applications.


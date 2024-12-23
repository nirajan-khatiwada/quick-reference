## 22. Fragments in React
Fragments are a way to group multiple elements in React without adding extra nodes to the DOM. Fragments are useful when you want to return multiple elements from a component, but you don't want to add an extra div or span element to the DOM.

Fragments are represented by the `<Fragment>` tag or the shorthand syntax `<>`. You can use fragments to return multiple elements from a component without adding extra nodes to the DOM.


Without using fragments:
```jsx
function App() {
  return (
    <div>
      <h1>Hello, World!</h1>
      <p>Welcome to React</p>
    </div>
  );
}
```
Here, the `App` component returns two elements, but they are wrapped in a `div` element. If you don't want to add an extra `div` element to the DOM, you can use fragments.

Using fragments:
```jsx
function App() {
  return (
    <> or <Fragment>
      <h1>Hello, World!</h1>
      <p>Welcome to React</p>
    </> or </Fragment>
  );
}
```


# 23. Passing jsx as props
In React, you can pass JSX as props to other components. This allows you to create reusable components that can be used in different parts of your application.

- Passing JSX as props:
```jsx
function App() {
  const heading = <div><h1>Hello, World!</h1><p>My name is nirajan Khatiwada</div></div>;
  return <Greeting message={heading} />;
}

or 

function App() {
  return <Greeting message={<div><h1>Hello, World!</h1><p>My name is nirajan Khatiwada</div></div>} />;
}
```

- Using props in the Greeting component:
```jsx
function Greeting(props) {
  return <div>{props.message}</div>;
}
```


- Passing built-in components as props:
```jsx
function App() {
  return <Greeting element="button" />;
}
```



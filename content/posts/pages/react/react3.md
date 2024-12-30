---
title: "React : Day 3"
date: 2024-11-19
description: "Deep dive into React's advanced concepts including Fragments, JSX Props, Component Isolation, and State Management patterns"
showToc: true
categories: ["React"]
tags: ["React", "JavaScript", "Web Development", "State Management", "Components", "Fragments"]
summary: "A comprehensive guide covering React's advanced concepts including Fragments, JSX Props, Component Isolation, and proper state management patterns"
images: ["/images/react/react.jpg"]
---
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


## 23. Passing jsx as props
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


## 24. Isolation of Component in React
Isolation of components is a key concept in React that allows you to create reusable components that are independent of each other. This means that each component should be self-contained and not rely on external data or state.

for example:
```jsx
function Button(props){
  const [showText, setShowText] = useState(false);
  return (
    <button onClick={() => setShowText(!showText)}>
      {showText ? 'Hide Text' : 'Show Text'}
    </button>
  );
}


function App(){
  return (
    <div>
      <Button />
      <Button />
    </div>
  );
}
```

Here The component `Button` is isolated means one state of the component does not affect the other component. Each component is self-contained and does not rely on external data or state.
for example, the `showText` state in one `Button` component does not affect the `showText` state in the other `Button` component.


## 25. Taking User Input in React

- Using onChange event:
```jsx
function App() {
  const [name, setName] = useState('');

  const handleChange = (e) => {
    setName(e.target.value);
  };

  return (
    <div>
      <input type="text" value={name} onChange={handleChange} />
      <p>Hello, {name}</p>
    </div>
  );
}
```
Whats Happen Here
1. Here, we have an input element that takes user input.
2. When the user types in the input field,the onChange event is triggered for ervy keypress.
3. The handleChange function is called with the event object as an argument for every keypress.
4. The setName function is called with value of user input and it rerender the component with the updated value for every keypress.
5. The value of the input field is set to the name state, and the name is displayed below the input field.


> Note: use onChange event to take user input in React and update the state accordingly to reflect the changes in the UI.
If you use value as a prop in the input field, you must also provide an onChange event handler to update the state.
> Use this method if you want to update in real-time as the user types in the input field.

- Other method will be discussed in upcoming posts.



## 26.Rendering 2D Arrays in React
In React, you can render 2D arrays by using nested map functions to iterate over the rows and columns of the array. This allows you to display tabular data or grid-like structures in your application.

- Rendering a 2D array:
```jsx
function App() {
  const data = [
    ['John', 'Doe', 30],
    ['Jane', 'Smith', 25],
    ['Alice', 'Brown', 35],
  ];

  return (
    <table>
      <thead>
        <tr>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Age</th>
        </tr>
      </thead>
      <tbody>
        {data.map((row, index) => (
          <tr key={index}>
            {row.map((cell, index) => (
              <td key={index}>{cell}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
```

## 27. Immutable update patterns in React
In react while changing the state we shouldnot change the orginal state directly  Instead, we should create a new copy of the state and update the copy with the new values. This is known as immutable update pattern.speciaaly when working with arrays and objects.

- The Wrong way to update state:
```jsx
function App() {
  const [items, setItems] = useState(['apple', 'banana', 'cherry']);

  const removeItem = (index) => {
    items.splice(index, 1);
    setItems(items);
  };

  return (
    <div>
      <ul>
        {items.map((item, index) => (
          <li key={index}>
            {item} <button onClick={() => removeItem(index)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
```

- The Correct way to update state:
```jsx
function App() {
  const [items, setItems] = useState(['apple', 'banana', 'cherry']);

  const removeItem = (index) => {
    const newItems = [...items];
    newItems.splice(index, 1);
    setItems(newItems);
  };

  return (
    <div>
      <ul>
        {items.map((item, index) => (
          <li key={index}>
            {item} <button onClick={() => removeItem(index)}>Remove</button>
          </li>
        ))}
      </ul>x  x 
    </div>
  );
}
```

- Note: Always create a new copy of the state when updating arrays or objects in React. This ensures that the state is updated correctly and prevents unexpected behavior in your application.

## 28. Common Pattern for update,delete and add in React
In React, you can use common patterns to update, delete, and add items to an array. These patterns involve creating new copies of the array and updating the state with the new values.

- Add an item to an array:
```jsx
function App() {
  const [items, setItems] = useState(['apple', 'banana', 'cherry']);

  const addItem = (item) => {
    setItems([...items, item]);
    // or
    // const newItems = [...items];
    // newItems.push(item);
    // setItems(newItems);
  };

  return (
    <div>
      <ul>
        {items.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
      <button onClick={() => addItem('orange')}>Add Item</button>
    </div>
  );
}
```


- Deleting an item from an array:
```jsx
function App() {
  const [items, setItems] = useState(['apple', 'banana', 'cherry']);

  const removeItem = (index) => {
    const newItems = items.filter((item, i) => i !== index);
    setItems(newItems);
  };

  return (
    <div>
      <ul>
        {items.map((item, index) => (
          <li key={index}>
            {item} <button onClick={() => removeItem(index)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
```
- Updating an data of an array using map:
```jsx 
function App() {
  const [items, setItems] = useState([
    { id: 1, name: 'apple', price: 1 },
    { id: 2, name: 'banana', price: 2 },
    { id: 3, name: 'cherry', price: 3 },
  ]);

  const updateItem = (id, price) => {
    const newItems = items.map((item) =>
      item.id === id ? { ...item, price: price } : item
    );
    setItems(newItems);
  };

  return (
    <div>
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            {item.name} - ${item.price}{' '}
            <button onClick={() => updateItem(item.id, item.price + 1)}>
              Increase Price
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
```

- Updating an data of an array using find:
```jsx

function App() {
  const [items, setItems] = useState([
    { id: 1, name: 'apple', price: 1 },
    { id: 2, name: 'banana', price: 2 },
    { id: 3, name: 'cherry', price: 3 },
  ]);

  const updateItem = (id, price) => {
    const newItems= [...items];
    const newItem = newItems.find((item) => item.id === id);
    if (newItem) {
      newItem.price = price;
      setItems(newItems);
    }
 
  };

  return (
    <div>
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            {item.name} - ${item.price}{' '}
            <button onClick={() => updateItem(item.id, item.price + 1)}>
              Increase Price
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
```

> Note: Always prefer map over find when updating an array of objects in React. This ensures that the state is updated correctly and prevents unexpected behavior in your application.




## 29.Updating object in react
In React, you can update an object in state by creating a new copy of the object and updating the copy with the new values. This ensures that the state is updated correctly and prevents unexpected behavior in your application.

- Updating an object in state:
```jsx
function App() {
  const [person, setPerson] = useState({ name: 'John', age: 30 });

  const updatePerson = () => {
    setPerson({ ...person, age: person.age + 1 });
  };

  return (
    <div>
      <p>Name: {person.name}</p>
      <p>Age: {person.age}</p>
      <button onClick={updatePerson}>Increase Age</button>
    </div>
  );
}
```


---
title: "React : Day 1"
date: 2024-11-17
description: "A comprehensive guide for creating and managing React projects, components, and folder structures."
showToc: true
categories: ["React"]
tags: ["React", "JavaScript", "Web Development", "Tutorial"]
summary: "A detailed reference guide to help you quickly set up and manage React projects, components, and folder structures."
images: ["/images/react/react.jpg"]
---

## 1. Create A React Project

To create a React app we use Vite and its command is:
```bash
npm create vite@latest
```

## 2. Component

In a React application, one page is broken down into multiple components. Components allow:

1. **Reusability**: For example, we can create one component for cards and use it to create multiple cards with different data.
2. **Related code lives together**: Related items (JS code) are stored together.
3. **Separation of logic**: Different components handle different data and logic.

#### Diagram

![Component Diagram](/images/react/components.png)

## 3. Folder Structure
```bash
my-app/
  ├─ node_modules/
  ├─ public/
  │   ├─ index.html
  │   ├─ image.png
  │   └─ favicon.ico
  ├─ src/
  │   ├─ index.js
  │   ├─ App.js
  │   ├─ App.css
  │   └─ index.css
  ├─ package.json
  └─ README.md
```

- **node_module**: Contains all the files of installed packages.
- **public**: All static files are kept in this folder. For example, if `image.png` is in public, we can access it in the browser as `127.0.0.1:8000/image.png`.

- **index.html**: It is the page that is served to us and its content is managed by React using the DOM.Modify this file if you want to change the title or favicon.

- ***package.json***: Contains all the configuration of the project, package list, versions, and all related information.

- ***src***: This is the folder where all the code is written.

- ***src/index.js***
React runs this file first.Code of index.js
  - The DOM selects the element of `index.html` whose id is `root` because of this code: `document.getElementById('root')`
  - Then `render()` renders the `<App/>` component so that the root element will contain the data of the `<App/>` component.
  - All changes are done in the `index.html` root element using the DOM.
  - Remember that we never edit this file (code).

- ***src/App.js*** : This is where we will write all the SPA code. We start coding from `App.jsx` and link components as required.

- ***src/index.css*** : This CSS file is used by `main.jsx`, so it applies to the whole page. You can remove it if needed by removing its import in `main.jsx`.

- *** src/App.css:*** This CSS file is used by `App.jsx`, so it applies to all App components.

**Remember:** Component functions must follow two rules:
1. The name should start with an uppercase letter (e.g., Head, MyHead).
2. The function must return renderable content. The function must return a value that can be rendered (displayed on screen) by React. In most cases, return JSX.

**Example of a simple component:**

```jsx
function App() {
  return (
    <div>
      <h1>Hello world</h1>
    </div>
  );
}
```

As we know, `App.jsx` is provided by default when we create a React app. We can modify it and tailor it to our requirements


## 4. Making Custom Components 
```jsx 
function FunctionName() {
     return ( 
        <tagname> content </tagname> 
     ); 
}
```
***Important Note***:
1. Tags that don't have ending tags, such as `<br>` and `<hr>`, should be written as `<br/>` and `<hr/>`.
2. `class` is replaced by `className`. For example, `<body class="data">` is written as `<body className="data">`.
3. During a return in React, we cannot return multiple elements directly. Instead, we need to wrap them inside a single parent element like `<div>`, `<></>`.
4. `for` is replaced by `htmlFor`. For example `<label htmlFor="inputId">Name:</label>`

***For Example*** :
- Wrong Way:
```jsx
function component1() {
  return (
    <div>
      Hi
    </div>
    <div>
      Hello
    </div>
  );
}
```

- right way:
``` jsx
function component1() {
  return (
    <div> {/* or <> */}
      <div>
        Hi
      </div>
      <div>
        Hello
      </div>
    </div> {/* or </> */}
  );
}
```

## 5.Using One Component Inside Another Component
To use one component inside another in React, follow the steps
1. Create a component.
```jsx
function Comp1() {
  return <div> Component </div>
}
```

2. Use the component inside another component.
```jsx
function Comp2() {
  return (
    <div>
      <Comp1 />
      or
      <Comp1> <Comp1 /> 
      content
    </div>
  )
}
```

Here, `Comp1` is used inside `Comp2`.We can use `Comp1` multiple times inside `Comp2` as needed.
Note: For proper management, create a components folder, create one file for each component, and export from there. Then, import and use it in another component.


Example structure:
```bash
src/
  ├─ Assets/
  ├─ App.jsx
  └─ Components/
      ├─ Comp1.jsx
      └─ Comp2.jsx
```


***Task: Break Down a Component into Multiple Components***
```jsx
function App() {
  return (
    <>
      <header>
        I am header
      </header>
      <main>
        I am main content
      </main>
      <footer>
        I am footer
      </footer>
    </>
  );
}
```

***Solution:***
components/Header.jsx
```jsx
function Header() {
  return (
    <header>
      I am header
    </header>
  );
}

export default Header;
```
components/Footer.jsx
```jsx
function Footer() {
  return (
    <footer>
      I am footer
    </footer>
  );
}
export default Footer;
```

Finally, App.jsx
```jsx
import Header from './components/Header';
import Footer from './components/Footer';
function App() {
  return (
    <>
      <Header />
      <main>
        I am main content
      </main>
      <Footer />
    </>
  );
}
export default App;
```

structure:
```bash
src/
  ├─ Assets/
  ├─ App.jsx
  └─ components/
      ├─ Header.jsx
      └─ Footer.jsx
```

> **Note**: You Can Always break down a component as many times as you want.
The main goal is to make the code more readable and maintainable.





## 6. Some Component Hierarchies Examples
THis is the simple example of a component hierarchy.
![Component Hierarchy](/images/react/componenthierarchy.png)

## 7. Embedding JavaScript code in JSX
In JSX, we can embed JavaScript code using curly braces `{}`. We can write any JavaScript code inside the curly braces. For example, we can write a variable, function, or any JavaScript expression but of single line.

```jsx
function componentName() {
  return (
    <div>
      {  JavaScript code }
    </div>
  );
}
```

***Example:***
```jsx
function App() {
  const name = 'John Doe';
  return (
    <div>
      <h1> Hello, {name} </h1>
    </div>
  );
}
```
Where To Write Javascript Logic?
- We can write JavaScript logic inside the component function.
- We can write JavaScript logic outside the component function and use it inside the component function.


### 7.1 Using JavaScript Logic Outside Component Function
syntax:
```jsx
// Multiple lines of JavaScript code
function ComponentName() {
  return (
    <div>
      {/* JSX code */}
    </div>
  );
}
```

### 7.2 Using JavaScript Logic Inside Component Function
syntax:
```jsx
function ComponentName() {
  // Multiple lines of JavaScript code
  return (
    <div>
      {/* JSX code */}
    </div>
  );
}
```

| When to use | Inside Component Function | Outside Component Function |
| --- | --- | --- |
| **Use Case** | When the logic is specific to the component and not used anywhere else. | When the logic is used in multiple components. |
| **Advantages** | Logic is specific to the component. | Logic can be reused in multiple components. |
| **Disadvantages** | Logic cannot be reused in other components. | Logic is not specific to the component. |


## Combined Example 
Task1: Create a component that generate random number between 1 to 10 and display
in every page reload

```jsx 
function RandomNumber(){
    return <>
        <h1>Random Number: {Math.floor(Math.random() * 10) + 1}</h1>
}
export default RandomNumber;
```

This can be done in another ways which is more readable and maintainable
```jsx
function RandomNumber(){
    const randomNumber = Math.floor(Math.random() * 10) + 1;
    return <h1>Random Number: {randomNumber}</h1>
}
export default RandomNumber;
```

Task2 : Create a component that generate random element from an array and display on each page reload
```jsx
const elements = ['Earth', 'Water', 'Fire', 'Air'];
function generateRandomElement(){
    return elements[Math.floor(Math.random() * elements.length)];
}
function RandomElement(){
    const randomElement = generateRandomElement();
    return <h1>Random Element: {randomElement}</h1>
}
export default RandomElement;
```

This can be done by putting the logic inside the component function
```jsx
const elements = ['Earth', 'Water', 'Fire', 'Air'];
function generateRandomElement(){
    return elements[Math.floor(Math.random() * elements.length)];
}
function RandomElement(){
    const randomElement = elements[Math.floor(Math.random() * elements.length)];
    return <h1>Random Element: {randomElement}</h1>
}
export default RandomElement;
```

The most optimal way is using this
```jsx
const elements = ['Earth', 'Water', 'Fire', 'Air'];
function RandomElement(){
    const randomElement = elements[Math.floor(Math.random() * elements.length)];
    return <h1>Random Element: {randomElement}</h1>
}
export default RandomElement;
```

## 8.Loading Images in React
- step 1: put the images in assets folder that need to be loaded
- step 2: import the image in the component where it is needed as shown below
    ```jsx
    import imageName from Location
    ```
    >Note: Location is the path of the image from the current file location
    and imageName can be set to any name
- step 3: use the image in the component as shown below
    ```jsx
    <img src={imageName} alt="description" />
    ```
    >Note: imageName is the location of the image as `src/Assets/logo.png`

<br><br>
Task: Load an image in a Header component with the image name `logo.png` and description `logo`.
structure:
```bash
src/
  ├─ Assets/
      └─ logo.png
  ├─ App.jsx
  └─ components/
      ├─ Header.jsx
```

```jsx
import logo from '../Assets/logo.png';
function Header() {
  return (
    <header>
      <img src={logo} alt="logo" />
    </header>
  );
}
```

## 9.Importing CSS in React
- step 1: create a css file in the src folder
- step 2: import the css file in the component where it is needed as shown below
    ```jsx
    import cssfileLocation
    ```
    >Note: style.css is the name of the css file

for example:
```jsx
import './style.css'
function App() {
  return (
    <div>
      <h1> Hello world </h1>
    </div>
  );
}
```

### 9.1 Managing CSS in React
- Create css file in same directory as of your component
```bash
src/
  ├─ App.jsx
  └─ components/
      ├─ Header.jsx
      └─ Header.css
```
-Import the css file in the component where it is needed as shown below
```jsx
import './Header.css'
```

## 10.Props in React
- Props are used to pass data from parent component to child component.
- It is used to reuse the same component with different data.
- Props are passed as attributes to the component.
- Prop accept any type of value like string, number, array, object, function,compenent,jsx bool etc.

### 10.1 Passing Props from Parent to Child Component
- Parent Component
```jsx
function ParentComponent() {
  return (
    <ChildComponent prop1={value1} prop2={value2} />
  );
}
```

### 10.2 Receiving Props in Child Component
- Child Component
```jsx
function ChildComponent(props) {
  console.log(props); // will print object of props {prop1: value1, prop2:value2}
  return (
    <>
    {props.prop1}
    {props.prop2}
    </>
  );
}
```
This approach is not recommended because it is not clear what props are being passed to the component. Instead, we can destructure the props as shown below.

### 10.3 Destructuring Props
- Child Component
```jsx
function ChildComponent({prop1, prop2}) {
  return (
    <>
    {prop1}
    {prop2}
    </>
  );
}
```
Task: Create a card cmponent and use multiple cards in the App component to make card section
```jsx
function Card({title, description, image}) {
  return (
    <div>
      <h1>{title}</h1>
      <p>{description}</p>
      <img src={image} alt="description" />
    </div>
  );
}
export default Card;
```

```jsx
import Card from './components/Card';
function App() {
  return (
    <div>
      <Card title="Card 1" description="This is card 1" image={image1} />
      <Card title="Card 2" description="This is card 2" image={image2} />
    </div>
  );
}
export default App;
```


## 11. Children Props in React
- Children props are used to pass data between opening and closing tags of a component.

### 11.1 Passing Children Props
- Parent Component
```jsx
function ParentComponent() {
  return (
    <ChildComponent>
      <h1> Hello </h1>
      <p> World </p>
    </ChildComponent>
  );
}
```
### 11.2 Receiving Children Props
- Child Component
```jsx
function ChildComponent({ children }) {
    return (
        <div>
            {children}
        </div>
    );
}
```


### 11.3 Output
```jsx
<div>
    <h1> Hello </h1>
    <p> World </p>
</div>
```


## 12.Using Props and Children Props Together
Task: Create a card component that accepts title, description, and children props. Use the card component in the App component to make a card section.
```jsx
function Card({ title, description, children }) {
  return (
    <div>
      <h1>{title}</h1>
      <p>{description}</p>
      {children}
    </div>
  );
}
export default Card;
```

```jsx
import Card from './components/Card';
function App() {
  return (
    <div>
      <Card title="Card 1" description="This is card 1">
        <h1> Hello </h1>
        <p> World </p>
      </Card>
      <Card title="Card 2" description="This is card 2">
        <h1> Hello </h1>
        <p> World </p>
      </Card>
    </div>
  );
}
```

## 13. Making a Button Component

- 13.1 Using Props
```jsx
function App() {
  return (
    <div>
      <Button text="Click me" />
    </div>
  );
}
```

```jsx
function Button({ text}) {
  return (
    <button>
      {text}
    </button>
  );
}
export default Button;
```

- 13.2 Using Children Props
```jsx
function App() {
  return (
    <div>
      <Button>Click me</Button>
    </div>
  );
}
```

```jsx 
function Button({ children }) {
  return (
    <button>
      {children}
    </button>
  );
}
export default Button;
```

## 14. Reacting to Events
- In React, we can add event listeners like `onClick`, `onMouseOver`, `onMouseOut`, etc to buildin components lie button, div, etc using syntax 
```jsx
<InbuiltComponent eventlistener={functionName} />
```
> Note: functionName is the name of the function that will be called when the event is triggered.
>
> There are Many eventlisteners that can be used in React like `onClick`, `onMouseOver`, `onMouseOut` etc. 
>
>You can check the full list of event listeners in the React documentation also note that the event listener will always start with `on` followed by the event name.

We can call the handle function in two ways:

- 14.1  The First Way
```jsx
function App() {
  function handleClick() {
    console.log('Button clicked');
  }
  return (
    <div>
      <button onClick={handleClick}>Click me</button>
    </div>
  );
}
```

- 14.2 The Second Way
```jsx
function App() {
  return (
    <div>
      <button onClick={() => {console.log('Button clicked')}}>Click me</button>
    </div>
  );
}
```

## 15. Event Listeners in Custom Components
since by default when we add event listeners to custom component it doesnot work just because it is passed as prop but on simple tweaking we can make it work

Design Pattern for applying event listeners in custom components
```jsx
function  App(){
    function handleClick(){
        console.log('Button clicked');
    }
    return (
        <div>
            <Button onClick={handleClick} />
        </div>
    );
}
```

The onclick method is passed as a prop to the button component and then used in the button component as shown below

``` jsx
function Button({onClick}){
    return (
        <button onClick={onClick}>Click me</button>
    );
}
```

## 16. Passing Arguments to Event Functions
- To pass Custom arguments to event functions, we can use the arrow function syntax as shown below
```jsx
<inbuildComponent eventListener={() => functionName(argument)} />
```

- Example
```jsx
function App() {
  function handleClick(name) {
    console.log('Button clicked by', name);
  }
  return (
    <div>
      <button onClick={() => handleClick('John')}>Click me</button>
    </div>
  );
}
```

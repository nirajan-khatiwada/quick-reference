---
title: "React : Day 14"
date: 2024-11-28
description: "A comprehensive guide on React Router Dom for handling routing in React applications including route definitions, navigation, layouts, and dynamic routes."
showToc: true
categories: ["React"]
tags: ["React", "React Router", "Routing", "Web Development", "Frontend"]
summary: "Learn how to implement client-side routing in React applications using React Router Dom, including route setup, navigation, layouts, error handling, and dynamic routes."
images: ["/images/react/react.jpg"]
---

## 52.React Router Dom  
React Router Dom is the routing library that is used in react for defining the routes in application


### 52.1 Installation
```bash
npm install react-router-dom
```

### 52.2 Defining Routes
We can serve different components for different routes using `react-router-dom` library.
App.jsx
```jsx
import { createBrowserRouter,RouterProvider } from 'react-router-dom';
import Home from './Home';
import About from './About';
import Contact from './Contact';

const router=createBrowserRouter([
    {path:'/',element:<Home/>},
    {path:'/about',element:<About/>},
    {path:'/contact',element:<Contact/>}
]);

function App(){
    return <RouterProvider router={router}/>
}
export default App;
```

> Note:Home,About,Contact are the components that are rendered for the respective routes and they are called pages so it is better to create a folder named `pages` and keep all the pages in that folder.

### 52.3 Navigation Between Routes using `Link`
Normally we use anchor tag for navigation between routes but in react we use `Link` component from `react-router-dom` for navigation between routes
just because anchor tag will reload the page and react will lose its state and data.
```jsx
import {Link} from 'react-router-dom';
function Home(){
    return (
        <div>
            <h1>Home</h1>
            <Link to="/about">About</Link>
            <Link to="/contact">Contact</Link>
        </div>
    )
}
```
Here `to` attribute is used to define the path to navigate to.


## 52.4 Layouts And Nested Routes
```jsx
import { createBrowserRouter,RouterProvider } from 'react-router-dom';
import Home from './Home';
import About from './About';
import Contact from './Contact';
import Layout from './Layout';

const router=createBrowserRouter([
    {
    path:'/',
    element:<Layout/>,
        children:[
            {path:'/',element:<Home/>},
            {path:'/about',element:<About/>},
            {path:'/contact',element:<Contact/>}
            
        ]
    },
]);

function App(){
    return <RouterProvider router={router}/>
}
export default App;
```

Layout.jsx
```jsx
import {Outlet} from 'react-router-dom';
impoet Header from './Header';
import Footer from './Footer';

function Layout(){
    return (
        <div>
            <Header/>
            <Outlet/>
            <Footer/>
        </div>
    )
}

export default Layout;
```


`Layout.jsx` will render the Header, Footer always and the child component depending on the route.


> Note:Layout is only applied when the route prefix is start with `/` as we have defined the layout for `/` route.


### 52.5 Handeling 404 Page
We can handle 404 page with the help of `ErrorElement` in `react-router-dom`. When we define the `ErrorElement` it will be rendered
if an Error occurs.As the error will occur when the route is not defined in the routes array so we can define the `ErrorElement` at the end of the routes array.
```jsx
import { createBrowserRouter,RouterProvider,ErrorElement } from 'react-router-dom';
import Home from './Home';
import About from './About';
import Contact from './Contact';
import Layout from './Layout';
import NotFound from './NotFound';

const router=createBrowserRouter([
    {
        path:'/',
        element:<Layout/>,
        errorElement:<NotFound/>,
        children:[
            {
                path:'/',
                element:<Home/>
            },
            {
                path:'/about',
                element:<About/>
            },
            {
                path:'/contact',
                element:<Contact/>
            }
        ]
    },
]);
```


### 52.6 `NavLink` Component
The `NavLink` component, similar to the `Link` component,but it is used to style to the link when it is active. 
```jsx
import {NavLink} from 'react-router-dom';
function Header(){
    return (
        <div>
            <NavLink to="/" className={(isActive)?"active":""}>Home</NavLink>
            <NavLink to="/about" className={(isActive)?"active":""}>About</NavLink>
            <NavLink to="/contact" className={(isActive)?"active":""}>Contact</NavLink>
        </div>
    )
}
```
Here `isActive` is a boolean variable that is used to check whether the link is active or not 

For example:
when the route is `/about` then the `NavLink` with `to="/about"` will have the class `active` and the other links will not have the class `active`.

when the route is `/contact` then the `NavLink` with `to="/contact"` will have the class `active` and the other links will not have the class `active`.


### 52.7 Navigation Programmatically
We can navigate between routes programmatically using `useNavigate` hook from `react-router-dom`.

It is used when we want to navigate to a route when a button is clicked or when a form is submitted or redirecting to a route after some time delay.
```jsx
import {useNavigate} from 'react-router-dom';
function Home(){
    const navigate=useNavigate();
    return (
        <div>
            <h1>Home</h1>
            <button onClick={()=>navigate('/about')}>About</button>
            <button onClick={()=>navigate('/contact')}>Contact</button>
        </div>
    )
}
```

### 52.8 Dynamic Routes
In some cases, we need to pass some data in the route so that we can use that data in the component that is rendered for that route for example
when we want to show the details of a product then we can pass the product

```jsx
import { createBrowserRouter,RouterProvider } from 'react-router-dom';
import Home from './Home';
import About from './About';
import Contact from './Contact';
import Product from './Product';

const router=createBrowserRouter([
    {
        path:'/',
        element:<Home/>
    },
    {
        path:'/about',
        element:<About/>

    },
    {
        path:'/contact',
        element:<Contact/>
    },
    {
        path:'/product/:id',
        element:<Product/>
    }
]);

function App(){
    return <RouterProvider router={router}/>
}
export default App;
```


Product.jsx
```jsx
import {useParams} from 'react-router-dom';
function Product(){
    const {id}=useParams();
    return (
        <div>
            <h1>Product {id}</h1>
        </div>
    )
}
```
Here `:id` is the dynamic part of the route and we can access that part using `useParams` hook from `react-router-dom`.



### 52.9 Absolute and Relative Paths
Absolute paths are the paths that are defined from the root of the application and relative paths are the paths that are defined from the current route path. 

In Absolute paths, we use the `/` at the start of the path and in relative paths, we don't use `/` at the start of the path.

Example:
```jsx
import {createBrowserRouter,RouterProvider} from 'react-router-dom';
import Home from './Home';
import About from './About';
import Contact from './Contact';
import Product from './Product';

//using absolute paths
const router=createBrowserRouter([
    {
        path:'/home',
        element:<Home/>
        children:[
            {
                path:'/home/about',
                element:<About/>
            },
            {
                path:'/home/contact',
                element:<Contact/>
            }
    }
])

//using relative paths
const router=createBrowserRouter([
    {
        path:'home',
        element:<Home/>
        children:[
            {
                path:'about',
                element:<About/>
            },
            {
                path:'contact',
                element:<Contact/>
            }
        ]
    }
])
```


### 52.10 Index Routes
```jsx
const router=createBrowserRouter([
    {
        path:'/',
        element:<Layout/>,
        errorElement:<NotFound/>,
        children:[
            {
                path:'/',
                element:<Home/>
            },
            {
                path:'/about',
                element:<About/>
            },
            {
                path:'/contact',
                element:<Contact/>
            }
        ]
    },
]);
```
Here the route `/` is the index route and it is the default route that is rendered when the route is `/` so we can define the index route as the first route in the routes array.

```jsx
const router=createBrowserRouter([
    {
        path:'/',
        element:<Layout/>,
        errorElement:<NotFound/>,
        children:[
            {
                index:true,
                element:<Home/>
            },
            {
                path:'/about',
                element:<About/>
            },
            {
                path:'/contact',
                element:<Contact/>
            }
        ]
    },
]);
```



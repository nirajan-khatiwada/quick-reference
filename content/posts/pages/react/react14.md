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
            path:'/contact',element:<Contact/>
            
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





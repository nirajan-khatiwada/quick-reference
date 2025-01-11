## 52.React Router Dom  
React Router Dom is the routing library that is used in react for defining the routes in application


### 52.1 Installation
```bash
npm install react-router-dom
```

### 52.2 Defining Routes
We can define the routes as:
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

###
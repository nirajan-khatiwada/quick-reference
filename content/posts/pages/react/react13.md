---
title: "React : Day 13"
date: 2024-11-27
description: "A comprehensive guide on handling asynchronous data in Redux and using React Dev Tools."
showToc: true
categories: ["React"]
tags: ["React", "Redux", "Asynchronous", "React Dev Tools", "State Management"]
summary: "Learn how to handle asynchronous data in Redux using useEffect and action creator thunks, and explore React Dev Tools for debugging."
images: ["/images/react/react.jpg"]
---
# 51. Handling Asynchronous Data in redux
Since the reducer function should be a pure function, it should not have any side effects. This means that we cannot make any API calls or perform any asynchronous operations inside the reducer function. To handle this,
we can use
- Putting the asynchronous logic inside the component using `useEffect` hook.
Here we dispatch when the component mounts and fetch the data from the API.
- Inside the action creator



# 51.1 Using `useEffect` hook
In here we use useEffect to fetch the data from the API and dispatch the action to the reducer.Such that reducer updates the state.

Example: Write a code to fetch the cart items from the API and update the state and when user adds an item to the cart, it should be updated in the state and also in the API.

```jsx
//cartSlice.js
import { createSlice } from '@reduxjs/toolkit';
const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
    totalQuantity: 0,
    changed: false
  },
  reducers: {
    replaceCart(state, action) {
      state.totalQuantity = action.payload.totalQuantity;
      state.items = action.payload.items;
    },
    addItemToCart(state, action) {
      const newItem = action.payload;
      const existingItem = state.items.find(item => item.id === newItem.id);
      state.totalQuantity++;
      state.changed = true;
      if (!existingItem) {
        state.items.push({
          id: newItem.id,
          price: newItem.price,
          quantity: 1,
          totalPrice: newItem.price
        });
      } else {
        existingItem.quantity++;
        existingItem.totalPrice = existingItem.totalPrice + newItem.price;
      }
    },
    removeItemFromCart(state, action) {
      const id = action.payload;
      const existingItem = state.items.find(item => item.id === id);
      state.totalQuantity--;
      state.changed = true;
      if (existingItem.quantity === 1) {
        state.items = state.items.filter(item => item.id !== id);
      } else {
        existingItem.quantity--;
        existingItem.totalPrice = existingItem.totalPrice - existingItem.price;
      }
    }
  }
});
export const sendCartData = cartSlice.actions.sendCartData;
export default cartSlice;
```

```jsx
//store/index.js
import { configureStore } from '@reduxjs/toolkit';
import cartSlice from './cart-slice';
const store = configureStore({
  reducer: { cart: cartSlice.reducer }
});
export default store;
```

```jsx
//App.js
// App.js
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { cartActions } from './store/cart-slice';

const DUMMY_PRODUCTS = [
  { id: 'p1', price: 6, title: 'My First Book', description: 'The first book I ever wrote' },
  { id: 'p2', price: 5, title: 'My Second Book', description: 'The second book I ever wrote' }
];

let isInitial = true;

function App() {
  const dispatch = useDispatch();
  const cart = useSelector(state => state.cart);

  // Fetch cart data from an API on component mount
  useEffect(() => {
    const fetchCartData = async () => {
      const response = await fetch('https://api.example.com/cart');
      if (!response.ok) {
        throw new Error('Could not fetch cart data!');
      }
      const data = await response.json();
      dispatch(cartActions.replaceCart({
        items: data.items || [],
        totalQuantity: data.totalQuantity || 0,
      }));
    };

    fetchCartData().catch(error => {
      console.error('Error fetching cart data:', error);
    });
  }, [dispatch]);

  // Send cart data to the API whenever the cart changes (except on initial load)
  useEffect(() => {
    if (isInitial) {
      isInitial = false;
      return;
    }

    const sendCartData = async () => {
      const response = await fetch('https://api.example.com/cart', {
        method: 'PUT',
        body: JSON.stringify(cart),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) {
        throw new Error('Sending cart data failed!');
      }
    };

    if (cart.changed) {
      sendCartData().catch(error => {
        console.error('Error sending cart data:', error);
      });
    }
  }, [cart]);

  // Add item to cart handler
  const addToCartHandler = (item) => {
    dispatch(cartActions.addItemToCart(item));
  };

  return (
    <div>
      <h1>Products</h1>
      <ul>
        {DUMMY_PRODUCTS.map(product => (
          <li key={product.id}>
            <h2>{product.title}</h2>
            <p>{product.description}</p>
            <p>${product.price}</p>
            <button onClick={() => addToCartHandler(product)}>Add to Cart</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
```
Whats Happen Here
- Here we use useEffect to fetch the cart data from the API and update after the data is fetched using dispatch.




# 51.2 Using action creator Thunk
Same problem can be solved using action creator thunk. Here we can make the API call inside the action creator and dispatch the action to the reducer.

Here we will call one dispatch and inside the dispatch we will call another dispatch to update the state.

Here is the consice code
```jsx

const Dispatch1=function (data)=>{
    return async (dispatch)=>{
        //code
        //APICALL
        //dispatch another action
        //dispatch(action)
    }
}
```


```jsx
//App.js
function App(){
    const dispatch=useDispatch();
    const Call=()=>{
        dispatch(Dispatch1(data))
    }
    return(
        <div>
            <button onClick={Call}>Click</button>
        </div>
    )
    
}
```

=> Here when we call dispatch it will call the Dispatch1 function and inside the Dispatch1 function we can make the API call and dispatch the action to the reducer.



for example:
```jsx
// cart-slice.js
import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
    totalQuantity: 0,
    changed: false,
  },
  reducers: {
    replaceCart(state, action) {
      state.totalQuantity = action.payload.totalQuantity;
      state.items = action.payload.items;
    },
    addItemToCart(state, action) {
      const newItem = action.payload;
      const existingItem = state.items.find((item) => item.id === newItem.id);
      state.totalQuantity++;
      state.changed = true;
      if (!existingItem) {
        state.items.push({
          id: newItem.id,
          price: newItem.price,
          quantity: 1,
          totalPrice: newItem.price,
        });
      } else {
        existingItem.quantity++;
        existingItem.totalPrice += newItem.price;
      }
    },
    removeItemFromCart(state, action) {
      const id = action.payload;
      const existingItem = state.items.find((item) => item.id === id);
      state.totalQuantity--;
      state.changed = true;
      if (existingItem.quantity === 1) {
        state.items = state.items.filter((item) => item.id !== id);
      } else {
        existingItem.quantity--;
        existingItem.totalPrice -= existingItem.price;
      }
    },
  },
});

export const cartActions = cartSlice.actions;

// Async Action Creator Thunks
export const fetchCartData = () => {
  return async (dispatch) => {
    const fetchData = async () => {
      const response = await fetch('https://api.example.com/cart');
      if (!response.ok) {
        throw new Error('Could not fetch cart data!');
      }
      const data = await response.json();
      return data;
    };

    try {
      const cartData = await fetchData();
      dispatch(
        cartActions.replaceCart({
          items: cartData.items || [],
          totalQuantity: cartData.totalQuantity || 0,
        })
      );
    } catch (error) {
      console.error('Fetching cart data failed:', error);
    }
  };
};

export const sendCartData = (cart) => {
  return async () => {
    const sendRequest = async () => {
      const response = await fetch('https://api.example.com/cart', {
        method: 'PUT',
        body: JSON.stringify(cart),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Sending cart data failed!');
      }
    };

    try {
      await sendRequest();
    } catch (error) {
      console.error('Error sending cart data:', error);
    }
  };
};

export default cartSlice;
```


store/index.js
```jsx
// store/index.js
import { configureStore } from '@reduxjs/toolkit';
import cartSlice from './cart-slice';

const store = configureStore({
  reducer: { cart: cartSlice.reducer },
});

export default store;
```


App.js
```jsx
// App.js
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { cartActions, fetchCartData, sendCartData } from './store/cart-slice';

const DUMMY_PRODUCTS = [
  { id: 'p1', price: 6, title: 'My First Book', description: 'The first book I ever wrote' },
  { id: 'p2', price: 5, title: 'My Second Book', description: 'The second book I ever wrote' },
];

let isInitial = true;

function App() {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);

  // Fetch cart data on mount
  useEffect(() => {
    dispatch(fetchCartData());
  }, [dispatch]);

  // Send cart data when it changes (except for the initial load)
  useEffect(() => {
    if (isInitial) {
      isInitial = false;
      return;
    }

    if (cart.changed) {
      dispatch(sendCartData(cart));
    }
  }, [cart, dispatch]);

  const addToCartHandler = (item) => {
    dispatch(cartActions.addItemToCart(item));
  };

  return (
    <div>
      <h1>Products</h1>
      <ul>
        {DUMMY_PRODUCTS.map((product) => (
          <li key={product.id}>
            <h2>{product.title}</h2>
            <p>{product.description}</p>
            <p>${product.price}</p>
            <button onClick={() => addToCartHandler(product)}>Add to Cart</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
```



 # 51.3 React dev tools
React dev tools is a browser extension that allows you to inspect the React component hierarchy in the browser.





> Note: Redux and Context API is used to manage global level state in react application . Remember we always use usestate,usereducers to manage local state in react application.



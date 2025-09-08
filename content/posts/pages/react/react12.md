---
title: "React: Day 12"
date: 2024-11-27
description: "A comprehensive guide on state management with Zustand - a small, fast, and scalable state management library for React applications."
showToc: true
categories: ["React"]
tags: ["React", "Zustand", "State Management", "Hooks", "Performance"]
summary: "Learn how to use Zustand for efficient state management in React, including stores, async operations, external state access, and performance optimization techniques."
images: ["/images/react/react.jpg"]
---

# Complete Guide to Zustand State Management in React

<!-- ## Table of Contents
1. [Introduction to Zustand](#introduction-to-zustand)
2. [Key Features](#key-features-of-zustand)
3. [Why Use State Management Libraries](#why-use-state-management-libraries)
4. [Installation](#installation)
5. [Project Structure](#create-a-store-folder)
6. [Creating Your First Store](#create-a-store)
7. [Using Stores in Components](#using-the-store-in-a-component)
8. [Advanced Patterns](#advanced-patterns)
9. [Working with Promises](#working-with-promises)
10. [External State Management](#external-state-management)
11. [Performance Considerations](#performance-considerations) -->

## Introduction to Zustand

Zustand is a small, fast, and scalable state management library for React applications. It provides a simple and intuitive API for managing application state without the boilerplate code often associated with other state management solutions like Redux. Zustand is built on top of hooks, making it easy to integrate into modern React applications.

## Key Features of Zustand

1. **Simplicity**: Zustand has a minimalistic API that is easy to learn and use. It allows developers to create and manage state with just a few lines of code.

2. **Performance**: Zustand is designed for performance, with a focus on minimizing re-renders and optimizing state updates. It uses a subscription model that allows components to only re-render when the specific parts of the state they depend on change.

3. **Scalability**: Zustand can handle complex state management needs, making it suitable for both small and large applications. It supports features like middleware, persistence, and devtools integration.

4. **No Boilerplate**: Unlike Redux, Zustand does not require actions, reducers, or action creators, reducing the amount of boilerplate code needed to manage state.

5. **TypeScript Support**: Zustand has built-in TypeScript support, making it easy to use in TypeScript projects and providing type safety for state management.

## Why Use State Management Libraries?

When building React applications, you'll encounter scenarios where passing state between components becomes cumbersome:

- **Props Drilling**: When the application grows and the component tree becomes deep, props drilling can become cumbersome and hard to manage.
- **State Persistence**: The state of a component will be lost when the component is unmounted. To persist the state across component unmounts and remounts, we can use a state management library like Zustand.

## Installation

You can install Zustand using npm or yarn:

```bash
npm install zustand
```

## Create a Store Folder

Create a folder named `store` in the `src` directory of your React project. Inside the `store` folder, create all the files related to the store.

```
src
└── store
    └── useStore.js
```

> **Note**: The folder structure is not mandatory. You can create the store folder anywhere in the src folder, but it's a good practice to create a separate folder for the store.

## Create a Store

### What is a Store?

A store is a centralized place to manage the state of your application. It holds the state and provides methods to update and retrieve the state.

### Creating a Simple Counter Store

```javascript
// src/store/useStore.js
import { create } from 'zustand'

const useIncrementStore = create((set) => {
    return {
        count: 0,
        increment: () => {
            set((state) => ({ count: state.count + 1 }))
        },
        decrement: () => {
            set((state) => ({ count: state.count - 1 }))
        },
        reset: () => {
            set({ count: 0 })
        },
        incrementByAmount: (amount) => {
            set((state) => ({ count: state.count + amount }))
        }
    }
})

export default useIncrementStore
```

### Key Notes:

> The name of the store should start with `use` to follow the React hook naming convention, so we have named the store as `useIncrementStore`.

> The `create` function is used to create a store. It takes a function as an argument that receives the `set` function to update the state.

> If the value is static, we can directly pass the value to the set function. But if the value is dynamic, we need to pass a function to the set function that receives the current state as an argument and returns the new state.

## Using the Store in a Component

```javascript
// src/App.js
import React from 'react'
import useIncrementStore from './store/useStore'

function App() {
    const count = useIncrementStore((state) => state.count)
    const increment = useIncrementStore((state) => state.increment)
    const decrement = useIncrementStore((state) => state.decrement)
    const reset = useIncrementStore((state) => state.reset)
    const incrementByAmount = useIncrementStore((state) => state.incrementByAmount)

    return (
        <div>
            <h1>Count: {count}</h1>
            <button onClick={increment}>Increment</button>
            <button onClick={decrement}>Decrement</button>
            <button onClick={reset}>Reset</button>
            <button onClick={() => incrementByAmount(5)}>Increment by 5</button>
        </div>
    )
}

export default App
```

### What Happens Here:

This component will only re-render when `state.count`, `state.increment`, `state.decrement`, `state.reset`, and `state.incrementByAmount` change. However, these functions don't change unless we recreate the store, so the component will only re-render when `state.count` changes.

## Advanced Patterns

### Using Multiple States in a Single Store

```javascript
import { create } from 'zustand'

const useStore = create((set) => ({
    notifications: [],
    products: [],
    addNotification: (notification) => {
        set((state) => ({ notifications: [...state.notifications, notification] }))
    },
    addProduct: (product) => {
        set((state) => ({ products: [...state.products, product] }))
    }
}))

export default useStore
```

```jsx
import React from 'react'
import useStore from './store/useStore'

function App() {
    const notifications = useStore((state) => state.notifications)
    const products = useStore((state) => state.products)
    const addNotification = useStore((state) => state.addNotification)
    const addProduct = useStore((state) => state.addProduct)

    return (
        <div>
            <h1>Notifications</h1>
            <ul>
                {notifications.map((notification, index) => (
                    <li key={index}>{notification}</li>
                ))}
            </ul>
            <button onClick={() => addNotification(`Notification ${(Math.random() * 10).toFixed(2)}`)}>
                Add Notification
            </button>

            <h1>Products</h1>
            <ul>
                {products.map((product, index) => (
                    <li key={index}>{product}</li>
                ))}
            </ul>
            <button onClick={() => addProduct(`Product ${(Math.random() * 10).toFixed(2)}`)}>
                Add Product
            </button>
        </div>
    )
}

export default App
```

### Using Objects for Nested State

```javascript
import { create } from 'zustand'

const useStore = create((set) => ({
    details: {
        notifications: [],
        products: []
    },
    addNotification: (notification) => {
        set((state) => ({
            details: {
                ...state.details,
                notifications: [...state.details.notifications, notification]
            }
        }))
    },
    addProduct: (product) => {
        set((state) => ({
            details: {
                ...state.details,
                products: [...state.details.products, product]
            }
        }))
    }
}))

export default useStore
```

### Using Separate Stores

```javascript
import { create } from 'zustand'

const useNotificationStore = create((set) => ({
    notifications: [],
    addNotification: (notification) => {
        set((state) => ({ notifications: [...state.notifications, notification] }))
    }
}))

const useProductStore = create((set) => ({
    products: [],
    addProduct: (product) => {
        set((state) => ({ products: [...state.products, product] }))
    }
}))

export { useNotificationStore, useProductStore }
```

```jsx
import React from 'react'
import { useNotificationStore, useProductStore } from './store/useStore'

function App() {
    const notifications = useNotificationStore((state) => state.notifications)
    const products = useProductStore((state) => state.products)
    const addNotification = useNotificationStore((state) => state.addNotification)
    const addProduct = useProductStore((state) => state.addProduct)

    return (
        <div>
            <h1>Notifications</h1>
            <ul>
                {notifications.map((notification, index) => (
                    <li key={index}>{notification}</li>
                ))}
            </ul>
            <button onClick={() => addNotification(`Notification ${(Math.random() * 10).toFixed(2)}`)}>
                Add Notification
            </button>

            <h1>Products</h1>
            <ul>
                {products.map((product, index) => (
                    <li key={index}>{product}</li>
                ))}
            </ul>
            <button onClick={() => addProduct(`Product ${(Math.random() * 10).toFixed(2)}`)}>
                Add Product
            </button>
        </div>
    )
}

export default App
```

## Working with Promises

Let's create a store that performs CRUD operations on products using a fake API:

```javascript
import { create } from 'zustand'

const useProductStore = create((set) => ({
    products: [],
    loading: false,
    error: null,
    fetchProducts: async () => {
        set({ loading: true, error: null })
        try {
            const response = await fetch('https://fakestoreapi.com/products')
            const data = await response.json()
            set({ products: data, loading: false })
        } catch (error) {
            set({ error: error.message, loading: false })
        }
    },
    addProduct: async (product) => {
        set({ loading: true, error: null })
        try {
            const response = await fetch('https://fakestoreapi.com/products', {
                method: 'POST',
                body: JSON.stringify(product),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            const data = await response.json()
            set((state) => ({ products: [...state.products, data], loading: false }))
        } catch (error) {
            set({ error: error.message, loading: false })
        }
    },
    deleteProduct: async (id) => {
        set({ loading: true, error: null })
        try {
            await fetch(`https://fakestoreapi.com/products/${id}`, {
                method: 'DELETE'
            })
            set((state) => ({
                products: state.products.filter(product => product.id !== id),
                loading: false
            }))
        } catch (error) {
            set({ error: error.message, loading: false })
        }
    }
}))

export default useProductStore
```

```jsx
import React, { useEffect } from 'react'
import useProductStore from './store/useProductStore'

function App() {
    const products = useProductStore((state) => state.products)
    const loading = useProductStore((state) => state.loading)
    const error = useProductStore((state) => state.error)
    const fetchProducts = useProductStore((state) => state.fetchProducts)
    const addProduct = useProductStore((state) => state.addProduct)
    const deleteProduct = useProductStore((state) => state.deleteProduct)

    useEffect(() => {
        fetchProducts()
    }, [fetchProducts])

    if (loading) return <h1>Loading...</h1>
    if (error) return <h1>Error: {error}</h1>

    return (
        <div>
            <h1>Products</h1>
            <ul>
                {products.map((product) => (
                    <li key={product.id}>
                        {product.title}
                        <button onClick={() => deleteProduct(product.id)}>Delete</button>
                    </li>
                ))}
            </ul>
            <button onClick={() => addProduct({ title: 'New Product', price: 10.99 })}>
                Add Product
            </button>
        </div>
    )
}

export default App
```

## External State Management

### Getting State Outside a React Component

Since hooks can only be used inside React components, we can use the `getState` method to get the state outside a React component:

```javascript
import { create } from 'zustand'

const useStore = create((set, get) => ({
    count: 0,
    increment: () => set((state) => ({ count: state.count + 1 })),
    getCount: () => get().count // get the current count value
}))

export default useStore
```

```javascript
import useStore from './store/useStore'

const ExtraFunction = () => {
    const state = useStore.getState() // get the current state
    console.log(state.count) // log the current count value
    state.increment() // increment the count value
}
```

### Setting State Outside a React Component

We can set the state variable outside a React component using the `setState` method:

```javascript
import { create } from 'zustand'

const useStore = create((set) => ({
    count: 0,
    increment: () => set((state) => ({ count: state.count + 1 })),
    setCount: (count) => set({ count }) // set the count value
}))

export default useStore
```

```javascript
import useStore from './store/useStore'

const ExtraFunction = () => {
    useStore.setState({ count: 10 }) // set the count value to 10
    useStore.setState((state) => ({ count: state.count + 1 })) // increment the count value by 1
}
```

## Performance Considerations

### Understanding Component Re-renders

Consider this example:

```javascript
const useStore = create((set) => ({
    count: 0,
    count2: 0,
    changeCount1: () => set((state) => ({ count: state.count + 1 })),
    changeCount2: () => set((state) => ({ count2: state.count2 + 1 }))
}))
```

```jsx
function App() {
    const count = useStore((state) => state.count)
    const changeCount1 = useStore((state) => state.changeCount1)
    const changeCount2 = useStore((state) => state.changeCount2)

    return (
        <div>
            <h1>Count: {count}</h1>
            <button onClick={changeCount1}>Change Count 1</button>
            <button onClick={changeCount2}>Change Count 2</button>
        </div>
    )
}
```

**Quiz Questions:**

1. **Will the component re-render when we click on 'Change Count 2' button?**
   - **Answer**: No, the component will not re-render because we're only subscribing to `state.count`, `changeCount1`, and `changeCount2`. Since functions don't change (they're reference types) and `state.count` doesn't change when clicking 'Change Count 2', there's no re-render.

2. **Will the component re-render when we click on 'Change Count 1' button?**
   - **Answer**: Yes, the component will re-render because `state.count` changes when we click 'Change Count 1'.

**To make the component re-render when clicking 'Change Count 2':**

```jsx
function App() {
    const count = useStore((state) => state.count)
    const count2 = useStore((state) => state.count2) // Subscribe to count2
    const changeCount1 = useStore((state) => state.changeCount1)
    const changeCount2 = useStore((state) => state.changeCount2)

    return (
        <div>
            <h1>Count: {count}</h1>
            <h1>Count2: {count2}</h1> {/* Display count2 */}
            <button onClick={changeCount1}>Change Count 1</button>
            <button onClick={changeCount2}>Change Count 2</button>
        </div>
    )
}
```

Now the component will re-render when either count changes because we're subscribed to both state values.

## Conclusion

Zustand provides a simple, performant, and flexible solution for state management in React applications. Its minimal API and excellent performance characteristics make it an excellent choice for both small and large applications. By understanding the subscription model and how components re-render based on the state they access, you can build efficient and maintainable React applications with Zustand.




> Note : For client side state like theme setting, authentication state,sidebar etc. we can use Zustand. But for server side state like data fetching, caching, etc. we can use React Query or SWR.
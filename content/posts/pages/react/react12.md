# 50.State Management with Redux
Redux is a library for managing application state.


## 50.1. Core Concepts

### 1. Single Store
- Redux maintains a **single centralized store** for the entire application.
- This store holds the complete state of the application, ensuring that state management is consistent and predictable.

### 2. Components Subscribe to the Store
- Components can subscribe to the store.
- When the store updates, it notifies the subscribed components.
- Subscribed components then retrieve the necessary updated state and **re-render** to reflect the new data.

### 3. Reducer Function
- A **reducer function** is responsible for updating the store.
- Reducers are pure functions that take two inputs:
  1. The current state
  2. An action
- Based on the action, the reducer returns a **new state** without mutating the original state.

### 4. Actions and Dispatch
- To update the store, a component must **dispatch an action**.
- An **action** is a plain JavaScript object that describes the change required. It usually has:
  - A `type` property (to specify the action type)
  - Additional data (payload) required for the update.

### 5. How Actions Work
- When a component dispatches an action:
  1. Redux forwards the action to the **reducer function**.
  2. The reducer processes the action and determines how the state should be updated.
  3. The store is updated with the new state.

### 6. Flow of Redux
1. A component **dispatches an action** to describe what needs to change.
2. The action is **forwarded to the reducer function**.
3. The **reducer updates the state** in the store based on the action type and payload.
4. The updated state triggers **re-renders** of components that subscribe to the store, ensuring they display the latest data.

### Summary Diagram
- A component dispatches an **action**.
- The action is forwarded to the **reducer**.
- The reducer updates the **centralized store**.
- Subscribed components are notified and re-render accordingly.
![Component Diagram](/images/react/redux1.png)

## 50.2. Installing redux
To install Redux in your React project, use the following command:
```bash
npm install redux
```
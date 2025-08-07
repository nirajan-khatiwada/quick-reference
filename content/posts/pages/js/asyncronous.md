---
title: "Asynchronous Programming in JavaScript" #this is title and title for social share
date: 2024-10-18
description: "A comprehensive guide covering asynchronous programming in JavaScript, including promises and async/await." #description for social share
ShowToc: true
#tocopen: true
categories: ["JavaScript"]
tags: ["JavaScript", "Web Development", "Programming", "Asynchronous", "Promises", "Async/Await"] #this is keyword
summary: "A complete guide to asynchronous programming in JavaScript, covering promises and async/await." #this come in post
images: ["/images/javascript.png"] #for social share
---

# Asynchronous Programming in JavaScript

Asynchronous programming allows a program to perform multiple tasks simultaneously. It enables non-blocking operations, making it possible to execute long-running tasks without freezing the main program.

For example:

```javascript
console.log('Start');

setTimeout(() => {
  console.log('This message is delayed by 2 seconds');
}, 2000);

console.log('End');
```

When you run this code, the output will be:

```bash
Start
End
This message is delayed by 2 seconds
```

**Explanation:**

- `console.log('Start');` is executed, and "Start" is printed.
- `setTimeout()` sets up a callback function to run after 2000 milliseconds (2 seconds) but does not block the next line.
- `console.log('End');` is executed immediately after, and "End" is printed.
- After 2 seconds, the callback function in `setTimeout()` is executed, and "This message is delayed by 2 seconds" is printed.

This demonstrates how asynchronous functions like `setTimeout()` work without blocking the execution of subsequent code.

# Promises

Promises are a way to handle asynchronous operations in JavaScript. They represent a value that may be available now, in the future, or never. Promises can be in one of three states: pending, fulfilled, or rejected. They allow us to run code when the promise is fulfilled or rejected using the `.then()` and `.catch()` methods.

Syntax to create a new Promise:

```javascript
const promise = new Promise((resolve, reject) => {
  // Perform an asynchronous operation
  // If successful, call resolve(value)
  // If an error occurs, call reject(error)
});
```

## Why We Use Promises

Consider the following code:

```javascript
function main() {
  setTimeout(() => {
    console.log("Hello");
  }, 1000);
}

main();
main();
main();
```

This code waits for 1 second and then logs "Hello" three times instantly. But what if we want to wait for the first to be completed before the second?

This can be solved using promises:

```javascript
function promise() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("Hello");
      resolve("Done");
    }, 2000);
  });
}

let data = promise();
```

When a promise is called, it returns a promise object instantly in a pending state. When the asynchronous operation completes, the promise is either fulfilled or rejected.

## Handling Promises

To do a task when the promise is fulfilled (resolved):

```javascript
data.then((data) => {
  console.log(data);
});
```

To do a task when the promise is rejected:

```javascript
data.catch((err) => {
  console.log("Promise rejected", err);
});
```

## Handling Multiple Promises

```javascript
function promise1() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("Promise 1 resolved");
      resolve("Done 1");
    }, 2000);
  });
}

function promise2() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("Promise 2 resolved");
      resolve("Done 2");
    }, 2000);
  });
}

function promise3() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("Promise 3 resolved");
      resolve("Done 3");
    }, 2000);
  });
}

let data1 = promise1();
let data2 = promise2();
let data3 = promise3();
```

How Promises Work:
1. `promise1` is called.
2. `promise2` is called immediately.
3. `promise3` is called immediately, regardless of whether the previous promises are resolved.

To execute promises one by one:

```javascript
let data1 = promise1();
data1.then((data) => {
  console.log(data);
  return promise2();
}).then((data) => {
  console.log(data);
  return promise3();
}).then((data) => {
  console.log(data);
}).catch((err) => {
  console.log("Error", err);
});
```

Here, the first promise will run, then the second, then the third, and so on, one by one.

## Async and Await

Async functions always return a promise. `await` is used to wait for a promise to be resolved, such that the code below it will not run until the promise is resolved.

To use `await`, we need to use an async function:

```javascript
async function main() {
  console.log("Hello");
}
main();
```

Example with `await`:

```javascript
let promise = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("Done");
  }, 2000);
});

async function main() {
  console.log("Hello");
  await promise;
  console.log("Hello again");
}
main();
console.log("Hi");
```

What happens here is the main function is called, it prints "Hello", then waits for 2 seconds to resolve. During that time, it prints "Hi". When the promise is resolved, it prints "Hello again".

When `await` is called, the function pauses its execution until the promise is resolved. Then it continues the execution of the function, such that code below `await` will not run until the promise is resolved, but the code outside the function will run.

```javascript
async function main() {
  console.log("Hello");
  await promise;
  await promise;
  await promise;
  console.log("Hello again");
}
```

Here, the first promise is resolved, then the second is resolved, and so on.


## Directly accepting or rejecting and returning a value

```javascript
async function main(){
  const promise = await Promise.resolve("Hello");
}
main();
```
This code will print "Hello" because the promise is resolved with the value "Hello".

## Rejecting a promise

```javascript
async function main(){
  const promise = await Promise.reject("Error");
}
main();
```
This code will throw an error because the promise is rejected with the value "Error".

// # Asynchronous Programming in JavaScript

// Asynchronous programming allows a program to do more than one thing at a time. It enables non-blocking operations, making it possible to perform long-running tasks without freezing the main program.

// For example:

// ```javascript
// console.log('Start');

// setTimeout(() => {
//   console.log('This message is delayed by 2 seconds');
// }, 2000);

// setTimeout(() => {
//   console.log('This message is delayed by 2 seconds');
// }, 2000);

// console.log('End');
// ```

// When you run this code, the output will be:

// ```
// Start
// End
// This message is delayed by 2 seconds
// ```

// **Explanation:**

// - `console.log('Start');` is executed, and "Start" is printed.
// - `setTimeout()` sets up a callback function to run after 2000 milliseconds (2 seconds) but does not block the next line.
// - `console.log('End');` is executed immediately after, and "End" is printed.
// - After 2 seconds, the callback function in `setTimeout()` is executed, and "This message is delayed by 2 seconds" is printed.

// This demonstrates how asynchronous functions like `setTimeout()` work without blocking the execution of subsequent code.

// # Promises
// Promises are a way to handle asynchronous operations in JavaScript. They represent a value that may be available now, in the future, or never. Promises can be in one of three states: pending, fulfilled, or rejected.

// Syntax To create a new Promise:
// ```javascript
// const promise = new Promise((resolve, reject) => {
//   // Perform an asynchronous operation
//   // If successful, call resolve(value)
//   // If an error occurs, call reject(error)
// });
// ```







//Promises in Javascript

//why we use promises
// function main(){
//     setTimeout(()=>{
//         console.log("Hello")
//     },1000)
// }


// main()
// main()
// main()
//waits for 1 second
//console all Hello instantly
//But What if we want to wait for 1st to be complepled before second


//This can be solved using promises

// function promise(){
// return new Promise((resolve,reject)=>{
//     setTimeout(
//         ()=>{
//             console.log("Hi Whats My Nepali Society");
//             resolve("Error")
//         },2000
//     )
// })

// }
// let data=promise()

//When A promise is promise is called then it will return promise object instantly of pending
//when we print after resolve then promise object will be fultilled ie after 2 second



// Handeling Promises

//DO to Task when the promise is fulfilled is resolved
// data.then((data)=>{
//     console.log(data)
// })
//


//DO to Task when the promise is fulfilled is rejected
// data.catch((err)=>{
//     console.log("Promish =rejectes",err)
// })
//


//Handeling multiple promise
// function promise1(){
//     return new Promise((resolve,reject)=>{
//         setTimeout(
//             ()=>{
//                 console.log("Hi Whats My Nepali Society");
//                 resolve("Done")
//             },2000
//         )
//     })
// }


// function promise2(){
//     return new Promise((resolve,reject)=>{
//         setTimeout(
//             ()=>{
//                 console.log("Hi Whats My Nepali Society");
//                 resolve("Done")
//             },2000
//         )
//     })
// }


// function promise3(){
//     return new Promise((resolve,reject)=>{
//         setTimeout(
//             ()=>{
//                 console.log("Hi Whats My Nepali Society");
//                 resolve("Done")
//             },2000
//         )
//     })
// }
// let data1=promise1()
// let data2=promise2()
// let data3=promise3()
//How Promises Work
//Flow of execution of code
//1. Promise1 is called
//2. Promise2 is called immediadeately
//2. Promise3 is called immediadeately no matter data is resolved or not


// but if we want one by one like when 1 promises finishes then another
// let data1=promise1()
// data1.then((data)=>{
//     console.log(data)
//     let data2=promise2()
//     return data2
// }).then((data)=>{
//     console.log(data)
//     let data3=promise3()
//     return data3
// }).catch((err)=>{
//     console.log("Error",err)})
// =>Here 1st will tun then second then third and so on ie one by one


// Async and Await
// Async Function Always return promise
// Await is used to wait for promise to be resolved such the code below it will not run until the promise is resolved

// to use await we need to use async function

// async function main(){
//     console.log("Hello")
// }
// main()



// let promise=new Promise((resolve,reject)=>{
//     setTimeout(()=>{
//         resolve("Done")
//     },2000)})

//  async function main(){
//     console.log("Hello")
//     await promise
//      console.log("Hello")
//  }
//  main()
//  console.log("hi")

//Whats happen here the main funcction is called such that it will print hello
//then it will wait for 2 second to resolve at tat time it will print hi
//then when the promise is resolved it will print hello

//when await is called then same function pauses its execution until the promise is resolved
//then it will continue the execution of the function such that code below await will not run until the promise is resolved
//but the code below the function and other function will run

//  async function main(){
//     console.log("Hello")
//     await promise
//     await promise
//     await promise
//      console.log("Hello")
//  }


 //Here 1st promised is resolved then when the first promised is resolved then second is resolved and so on
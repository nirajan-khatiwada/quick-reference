---
title: "JavaScript Complete Guide"
date: 2024-01-20
description: "A comprehensive guide covering JavaScript fundamentals, including variables, data types, functions, DOM manipulation, and advanced concepts."
author: "Nirajan Khatiwada"
categories: ["Javascript"]
tags: ["JavaScript", "DOM", "ES6", "Programming Guide"]
toc: true
summary: "A comprehensive guide covering JavaScript fundamentals"
weight: 1
draft: false
---
# JavaScript Reference Guide

## 1. Console.log() Method
- **Purpose:** Prints output to the console, useful for debugging.
- **Syntax:** `console.log(value);`
- **Example:**
  ```javascript
  const name = 'John';
  console.log(name); // Output: John
  ```

## 2. Variables: `let`, `const`
- **let:** Block-scoped variable that can be updated but not accessed before declaration.
  ```javascript
  let x = 10;
  if (true) {
    let x = 20; // Block-scoped
    console.log(x); // 20
  }
  console.log(x); // 10
  ```

- **const:** Block-scoped variable that cannot be reassigned and must be initialized when declared.
  ```javascript
  const pi = 3.14;
  // pi = 3.1415; // Error: Cannot reassign
  ```

## 3. JavaScript Data Types
1. **String**
   - **Explanation:** Represents a sequence of characters. Can be enclosed in single quotes, double quotes, or backticks (for template literals).
   - **Syntax:** `const str = 'Hello, World!';`
   - **Example:**
     ```javascript
     const greeting = "Hello, " + "World!"; // Output: Hello, World!
     ```

2. **Number**
   - **Explanation:** Represents both integer and floating-point numbers. JavaScript numbers range from -(2^53 - 1) to 2^53 - 1.
   - **Syntax:** `const num = 123;`
   - **Example:**
     ```javascript
     const amount = 25; // Output: 25
     ```

3. **BigInt**
   - **Explanation:** Represents integers with arbitrary precision. Denoted by appending an `n` to the end of the number.
   - **Syntax:** `const bigNum = 1234567890123456789012345678901234567890n;`
   - **Example:**
     ```javascript
     const bigNumber = 1234567890123456789012345678901234567890n;
     ```

4. **Boolean**
   - **Explanation:** Represents a value that is either true or false.
   - **Syntax:** `const isTrue = true;`
   - **Example:**
     ```javascript
     const isActive = Boolean(1); // Output: true
     ```

5. **Null**
   - **Explanation:** Represents the intentional absence of any value.
   - **Syntax:** `const emptyValue = null;`
   - **Example:**
     ```javascript
     const noValue = null;
     ```

6. **Undefined**
   - **Explanation:** Represents a variable that has been declared but not assigned a value.
   - **Syntax:** `let uninitialized;`
   - **Example:**
     ```javascript
     let value;
     console.log(value); // Output: undefined
     ```

- **For Checking Data Type We Use:** `typeof variableName;`

## 4. Explicit Type Conversion
- **To String:** `String(value)` or `value.toString()`
  ```javascript
  let str = String(123); // '123'
  ```

- **To Number:** `Number(value)`, `parseInt(value)`, or `parseFloat(value)`
  ```javascript
  let num = Number('456'); // 456
  ```

- **To Boolean:** `Boolean(value)`
  ```javascript
  let bool = Boolean('hello'); // true
  ```

## 5. JavaScript Operators
### i) Comparison Operators
- **Greater than:** `a > b`
- **Less than:** `a < b`
- **Greater than or equal to:** `a >= b`
- **Less than or equal to:** `a <= b`
- **Not equal to:** `a != b`
- **Equal to:** `a == b`
- **Strictly equal to:** `a === b`

**Examples:**
```javascript
console.log("2" == 2);  // true
console.log("2" === 2); // false
```

### ii) Logical Operators
- **AND:** `operand1 && operand2`
- **OR:** `operand1 || operand2`
- **NOT:** `!operand`

**Examples:**
```javascript
console.log(true && false); // false
console.log(true || false); // true
console.log(!true);         // false
```

### iii) Arithmetic Operators
- **Addition:** `operand1 + operand2`
- **Subtraction:** `operand1 - operand2`
- **Multiplication:** `operand1 * operand2`
- **Division:** `operand1 / operand2`
- **Modulo:** `operand1 % operand2`
- **Increment:** `operand++`
- **Decrement:** `operand--`

**Examples:**
```javascript
console.log(5 + 3); // 8
console.log(5 - 3); // 2
console.log(5 * 3); // 15
console.log(6 / 3); // 2
console.log(5 % 3); // 2
```

## 6. String Methods and Operations
### 1. Concatenation
- **Explanation:** Combines two or more strings into one.
- **Syntax:** `string1 + string2`
- **Returns:** A new string combining the original strings.
- **Example:**
  ```javascript
  let a = '  My name is nirajan ';
  let b = "nirajan";
  console.log(a + b + "Khatiwada"); // Output: '  My name is nirajan nirajanKhatiwada'
  ```

### 2. Simple Form (String Boilerplate)
- **Explanation:** Uses template literals to embed expressions within a string.
- **Syntax:** `${expression}`
- **Returns:** A new string with evaluated expressions.
- **Example:**
  ```javascript
  let a = '  My name is nirajan ';
  let b = "nirajan";
  console.log(`${a}${b}khatiwada`); // Output: '  My name is nirajan nirajankhatiwada'
  ```

### 3. Accessing Element of String
- **Explanation:** Retrieves the character at a specified index.
- **Syntax:** `string[index]`
- **Returns:** The character at the given index (or undefined if out of range).
- **Example:**
  ```javascript
  let a = '  My name is nirajan ';
  console.log(a[0]); // Output: ' '
  ```

### 4. Finding Length of String
- **Explanation:** Gets the number of characters in the string.
- **Syntax:** `string.length`
- **Returns:** The length of the string as a number.
- **Example:**
  ```javascript
  let a = '  My name is nirajan ';
  console.log(a.length); // Output: 21
  ```

### 5. To Uppercase
- **Explanation:** Converts all characters in the string to uppercase.
- **Syntax:** `string.toUpperCase()`
- **Returns:** A new string with all characters in uppercase.
- **Example:**
  ```javascript
  let a = '  My name is nirajan ';
  console.log(a.toUpperCase()); // Output: '  MY NAME IS NIRAJAN '
  ```

### 6. To Lowercase
- **Explanation:** Converts all characters in the string to lowercase.
- **Syntax:** `string.toLowerCase()`
- **Returns:** A new string with all characters in lowercase.
- **Example:**
  ```javascript
  let a = '  My name is nirajan ';
  console.log(a.toLowerCase()); // Output: '  my name is nirajan '
  ```

### 8. String Slicing
- **Explanation:** Extracts a section of the string based on start and end indices.
- **Syntax:** `string.slice(start, end)`
- **Returns:** A new string containing the extracted section.
- **Example:**
  ```javascript
  let a = '  My name is nirajan ';
  console.log(a.slice(0, 4)); // Output: '  My'
  ```

### 9. Trim
- **Explanation:** Removes whitespace from both ends of the string.
- **Syntax:** `string.trim()`
- **Returns:** A new string with whitespace removed from both ends.
- **Example:**
  ```javascript
  let a = '  My name is nirajan ';
  console.log(a.trim()); // Output: 'My name is nirajan'
  ```

### 10. Replace
- **Explanation:** Replaces the first occurrence of a specified substring or pattern with a new substring.
- **Syntax:** `string.replace(search, replacement)`
- **Returns:** A new string with the specified substring replaced.
- **Example:**
  ```javascript
  let a = '  My name is nirajan ';
  console.log(a.replace("nirajan", "kirajan")); // Output: '  My name is kirajan '
  ```

### 11. Split
- **Explanation:** Splits the string into an array of substrings based on a separator.
- **Syntax:** `string.split(separator, limit)`
- **Returns:** An array of substrings.
- **Example:**
  ```javascript
  let a = '  My name is nirajan ';
  console.log(a.split(" ")); // Output: ['  My', 'name', 'is', 'nirajan']
  ```

## 7. Number Methods
### 1. toFixed()
- **Explanation:** Formats a number using fixed-point notation with a specified number of decimal places.
- **Syntax:** `number.toFixed(digits);`
- **Returns:** A string representing the number with the specified number of decimal places.
- **Example:**
  ```javascript
  let c = 10.001;
  console.log(c.toFixed(10)); // Output: '10.0010000000'
  ```

### 2. Math.ceil()
- **Explanation:** Rounds a number up to the nearest integer.
- **Syntax:** `Math.ceil(number);`
- **Returns:** The smallest integer greater than or equal to the given number.
- **Example:**
  ```javascript
  let a = 1.1000;
  console.log(Math.ceil(a)); // Output: 2
  ```

### 3. Math.floor()
- **Explanation:** Rounds a number down to the nearest integer.
- **Syntax:** `Math.floor(number);`
- **Returns:** The largest integer less than or equal to the given number.
- **Example:**
  ```javascript
  console.log(Math.floor(a)); // Output: 1
  ```

### 4. Math.round()
- **Explanation:** Rounds a number to the nearest integer.
- **Syntax:** `Math.round(number);`
- **Returns:** The value of the number rounded to the nearest integer.
- **Example:**
  ```javascript
  console.log(Math.round(a)); // Output: 1
  ```

### 5. Math.random()
- **Explanation:** Returns a pseudo-random floating-point number between 0 (inclusive) and 1 (exclusive).
- **Syntax:** `Math.random();`
- **Returns:** A floating-point number between 0 (inclusive) and 1 (exclusive).
- **Example:**
  ```javascript
  console.log(Math.random()); // Output: A random number between 0 and 1
  ```

## 8. Non-Primitive Data Types in JavaScript
### 1. Object
- **Explanation:** Objects are collections of key-value pairs. Keys are usually strings (or symbols) and values can be any data type.
- **Syntax:**
  ```javascript
  let objectName = {
    key1: value1,
    key2: value2,
    // more key-value pairs
  };
  ```
- **Example:**
  ```javascript
  let data = {
    "name": "nirajan",
    "age": 20
  };
  ```

### 2. Array
- **Explanation:** Arrays are ordered collections of values. Values can be of any data type and are accessed by their index.
- **Syntax:**
  ```javascript
  let arrayName = [value1, value2, value3, ...];
  ```
- **Example:**
  ```javascript
  let a = ["nirajan", "kirajan", "birajan"];
  ```

### 3. Function
- **Explanation:** Functions are blocks of code designed to perform a particular task. They can be invoked (called) to execute their code.
- **Syntax:**
  ```javascript
  function functionName(parameters) {
    // code to be executed
  }
  ```
- **Example:**
  ```javascript
  function outer() {
    console.log("hi");
  }

  outer(); // Output: hi
  ```

## 9. Array Methods
### 1. Indexing in Array
- **Accessing Elements:**
  - **Description:** Arrays are zero-indexed, so the first element is at index 0.
  - **Returns:** Value of the element at the specified index.
  - **Example:**
    ```javascript
    console.log(a[0]); // Output: 1
    console.log(a[3]); // Output: 4
    ```

### 2. Slicing in Array
- **Slicing:**
  - **Description:** Extracts a section of the array and returns it as a new array.
  - **Syntax:** `array.slice(startIndex, endIndex)`
  - **Returns:** A new array containing the elements from startIndex up to, but not including, endIndex.
  - **Example:**
    ```javascript
    console.log(a.slice(0, 2)); // Output: [1, 2]
    ```

### 3. Length of Array
- **Description:** Returns the number of elements in the array.
- **Returns:** Integer (length of the array).
- **Example:**
  ```javascript
  console.log(a.length); // Output: 4
  ```

### 4. Push
- **Description:** Adds one or more elements to the end of the array.
- **Returns:** The new length of the array.
- **Example:**
  ```javascript
  a.push(5);
  console.log(a); // Output: [1, 2, 3, 4, 5]
  ```

### 5. Pop
- **Description:** Removes the last element from the array.
- **Returns:** The removed element.
- **Example:**
  ```javascript
  a.pop();
  console.log(a); // Output: [1, 2, 3, 4]
  ```

### 6. Shift
- **Description:** Removes the first element from the array.
- **Returns:** The removed element.
- **Example:**
  ```javascript
  a.shift();
  console.log(a); // Output: [2, 3, 4]
  ```

### 7. Unshift
- **Description:** Adds one or more elements to the beginning of the array.
- **Returns:** The new length of the array.
- **Example:**
  ```javascript
  a.unshift(0);
  console.log(a); // Output: [0, 1, 2, 3, 4]
  ```

### 8. Join
- **Description:** Joins all elements of an array into a string, separated by a specified separator.
- **Returns:** A string representing the array elements joined by the specified separator.
- **Example:**
  ```javascript
  let data = a.join(" ");
  console.log(data); // Output: "1 2 3 4"
  ```

### 9. Concatenation of Two Arrays
- **Description:** Merges two or more arrays into one.
- **Returns:** A new array containing the elements of the original arrays.
- **Example:**
  ```javascript
  let a2 = [5, 4, 1, 3, 4];
  console.log(a.concat(a2)); // Output: [1, 2, 3, 4, 5, 4, 1, 3, 4]
  ```

### 10. Sort
- **Description:** Sorts the elements of an array in place.
- **Returns:** The sorted array.
- **Example:**
  ```javascript
  a2.sort();
  console.log(a2); // Output: [1, 3, 4, 4, 5]
  ```

### 11. Reverse
- **Description:** Reverses the order of the elements in the array.
- **Returns:** The reversed array.
- **Example:**
  ```javascript
  a2.reverse();
  console.log(a2); // Output: [5, 4, 4, 3, 1]
  ```

### 12. Removing Elements from a Specific Position
- **Description:** Changes the contents of an array by removing or replacing existing elements.
- **Syntax:** `array.splice(index, numberOfElementsToRemove)`
- **Returns:** An array containing the removed elements.
- **Example:**
  ```javascript
  let newData = [1, 2, 3, 4];
  newData.splice(1, 2); // Removes 2 elements starting at index 1
  console.log(newData); // Output: [1, 4]
  ```

### 13. Inserting Elements at a Specific Position
- **Description:** Inserts elements into the array.
- **Syntax:** `array.splice(index, 0, element1, element2, ...)`
- **Returns:** An array containing the removed elements (empty if no elements were removed).
- **Example:**
  ```javascript
  let lasrData = [1, 4];
  lasrData.splice(1, 0, 2, 3); // Inserts elements 2 and 3 at index 1
  console.log(lasrData); // Output: [1, 2, 3, 4]
  ```

### 14. Spread Operator (...)
- **Description:** Spreads out elements of an array into another array or function arguments.
- **Returns:** A new array containing the elements spread from the original arrays.
- **Example:**
  ```javascript
  let finalData = [...newData, ...lasrData];
  console.log(finalData); // Output: [1, 4, 1, 2, 3, 4]
  ```

### 15. Flat
- **Description:** Creates a new array with all sub-array elements concatenated into it recursively up to the specified depth.
- **Syntax:** `array.flat(depth)`
- **Returns:** A new array with the specified depth of nesting flattened.
- **Example:**
  ```javascript
  let nestedArray = [1, [2, 3], [4, [5, 6]]];
  console.log(nestedArray.flat()); // Output: [1, 2, 3, 4, [5, 6]]
  console.log(nestedArray.flat(2)); // Output: [1, 2, 3, 4, 5, 6]
  ```

### 16. Array Destructuring
- **Description:** Allows unpacking values from arrays into distinct variables in a concise and readable way.
- **Basic Syntax:** `const [var1, var2, var3] = array;`
- **Example:**
  ```javascript
  const numbers = [1, 2, 3];
  const [first, second, third] = numbers;
  console.log(first);  // Output: 1
  console.log(second); // Output: 2
  console.log(third);  // Output: 3
  ```

### 17. Finding Index of a Substring
- **Description:** Finds the first occurrence of a specified substring in a string.
- **Syntax:** `string.indexOf(substring)`
- **Returns:** The index of the first occurrence of the substring (or -1 if not found).
- **Example:**
  ```javascript
  let a = '  My name is nirajan ';
  console.log(a.indexOf('n')); // Output: 10
  ```

### 18. in Operator
- **Description:** Checks if a property exists in an object.
- **Syntax:** `property in object`
- **Returns:** true if the property exists, otherwise false.
- **Example:**
  ```javascript
  let obj = { name: 'Niraj', age: 20 };
  console.log('name' in obj); // Output: true
  console.log('gender' in obj); // Output: false
  ```

## 10. Object in Js
### i. Defining an Object
An object in JavaScript is a collection of key-value pairs. Each key (also known as a property) is a unique identifier, and the value can be anything: a string, number, array, function, or even another object.
**Example:**
```javascript
const myObject = {
    name: "Nirajan",         // String property
    class: "Bachelor",       // String property
    is_topper: "No",         // Boolean property (as a string)
    greet: function (from) { // Method (function inside an object)
        console.log(`Welcome ${this.name}. From ${from}`);
    }
};
```

### ii. Accessing
There are two common ways to access properties in an object:
- **Dot Notation:**
  ```javascript
  console.log(myObject.name); // Output: nirajan
  ```
  This is the most common and preferred method when you know the property name in advance.
- **Bracket Notation:**
  ```javascript
  console.log(myObject['name']); // Output: nirajan
  ```
  Bracket notation is useful when the property name is stored in a variable or when it contains special characters or spaces.

### iii. Modifying Object Properties
You can modify an object's properties using dot or bracket notation:
- **Dot Notation:** Use when you know the property name.
  ```javascript
  myObject.name = "Kirajan";  // Modifies the 'name' property
  ```

- **Bracket Notation:** Use when the property name is dynamic or contains special characters.
  ```javascript
  myObject['class'] = "Master's";  // Modifies the 'class' property
  ```

### iv. Adding New Properties
You can dynamically add new key-value pairs to an object.
```javascript
myObject.lol = "lol";
console.log(myObject.lol); // Output: lol
```

### v. Using the this Keyword
The this keyword inside an object’s method refers to the object itself, allowing you to access its properties.
**Example:**
```javascript
const person = {
    name: "Kirajan",
    greet: function() {
        console.log(`Hello, my name is ${this.name}`);
    }
};

person.greet(); // Output: Hello, my name is Kirajan
```

### vi. Objects Inside Objects
Objects can contain other objects, allowing you to create complex data structures.
**Example:**
```javascript
const a = {
    details: {
        name: "Nirajan",
        age: 20
    }
};

console.log(a.details.name); // Output: Nirajan
```

### vii. Spread Operator (...)
The spread operator lets you copy, merge, or combine objects efficiently.
- **Copying Properties:**
  ```javascript
  const original = { name: "Kirajan", class: "Bachelor" };
  const copy = { ...original };

  console.log(copy); // Output: { name: "Kirajan", class: "Bachelor" }
  ```
- **Merging Objects:**
  ```javascript
  const info1 = { name: "Kirajan", class: "Bachelor" };
  const info2 = { age: 21, is_topper: true };

  const combined = { ...info1, ...info2 };

  console.log(combined); 
  // Output: { name: "Kirajan", class: "Bachelor", age: 21, is_topper: true }
  ```

### viii. Object Destructuring
Destructuring allows you to extract properties from an object and assign them to variables.
**Example:**
```javascript
const lol = { name: "Nirajan", class: 12, rollno: "11" };
const { name, rollno } = lol;

console.log(name);   // Output: Nirajan
console.log(rollno); // Output: 11
```

- **Also, Renaming in Destructuring:**
  ```javascript
  const lol = { name: "Nirajan", class: 12, rollno: "11" }; 
  const { name: studentName, rollno: studentRollNo } = lol; 
  console.log(studentName); // Output: Nirajan 
  console.log(studentRollNo); // Output: 11
  ```

### ix. Object Methods
Objects can have methods—functions that are properties of the object. These methods can perform actions using the object’s data.
**Example:**
```javascript
const calculator = {
    add: function(a, b) {
        return a + b;
    },
    subtract: function(a, b) {
        return a - b;
    }
};

console.log(calculator.add(5, 3));      // Output: 8
console.log(calculator.subtract(5, 3)); // Output: 2
```

## 11. JavaScript Functions
### Function Definitions:
- **Function Expression:**
  ```javascript
  const add1 = function(a, b) {
      return a + b;
  };
  ```
  Creates a function and assigns it to a variable. You call the function using the variable name.
- **Arrow Function:**
  ```javascript
  const add2 = (a, b) => {
      return a + b;
  };
  ```
  Provides a shorter syntax and does not have its own this context.
- **Function Declaration:**
  ```javascript
  function add3(a, b) {
      return a + b;
  }
  ```
  Defines a function with a name. It is hoisted, so it can be called before its declaration.
  - **Comparison:** `add3` has its own this context, while `add1` and `add2` do not.

### Using the Spread Operator:
```javascript
function add(...data) {
    let sum = 0;
    for (let i = 0; i < data.length; i++) {
        sum += data[i];
    }
    return sum;
}

console.log(add(1, 2, 3)); // Output: 6
```
The `...data` syntax lets the function accept any number of arguments as an array.

### Immediately Invoked Function Expression (IIFE):
```javascript
(
    function add(a, b) {
        console.log(a + b);
    }
)(2, 3); // Output: 5
```
An IIFE is a function that runs immediately after its definition, creating a local scope to avoid affecting the global scope.

## 12. Control Flow in JavaScript
### Conditional Statements:
- **if-else Statement:** Executes code blocks based on a condition.
  ```javascript
  let a = 2;
  if (a === 1) {
      console.log(1);
  } else if (a === 2) {
      console.log(2);
  } else {
      console.log("None");
  }
  ```
- **switch Statement:** Evaluates an expression and executes code blocks based on matching case values.
  ```javascript
  switch (a) {
      case 1:
          console.log(1);
          break;
      case 2:
          console.log(2);
          break;
      default:
          console.log(3);
  }
  ```

### Truthy and Falsy Values:
- **Falsy Values:** Values that evaluate to false in a boolean context.
  ```javascript
  console.log(Boolean(false)); // false
  console.log(Boolean(0)); // false
  console.log(Boolean(-0)); // false
  console.log(Boolean(0n)); // false
  console.log(Boolean("")); // false
  console.log(Boolean(null)); // false
  console.log(Boolean(undefined)); // false
  console.log(Boolean(NaN)); // false
  ```
- **Truthy Values:** Any value that is not falsy.
  ```javascript
  console.log(Boolean(true)); // true
  console.log(Boolean(1)); // true
  console.log(Boolean(-1)); // true
  console.log(Boolean("hello")); // true
  console.log(Boolean(" ")); // true
  console.log(Boolean({})); // true
  console.log(Boolean([])); // true
  console.log(Boolean(function() {})); // true
  console.log(Boolean(Symbol())); // true
  console.log(Boolean(1n)); // true
  ```

### Nullish Coalescing Operator (??): Provides a default value when dealing with null or undefined.
```javascript
let val1 = null;
let val2 = val1 ?? 10;
console.log(val2); // Output: 10
```

### Ternary Operator (?:): A shorthand for the if-else statement.
```javascript
let c = 10;
let b = 10;
let largest = (c > b) ? c : b;
console.log(largest); // Output: 10
```

## 13. Loops in JavaScript
### For Loop
```javascript
// Syntax: for(initialization; condition; increment/decrement) { ... }
for (let i = 0; i < 10; i++) {
    console.log(i);
}
```

### While Loop
```javascript
// Syntax: while(condition) { ... }
let i = 0;
while (i < 10) {
    console.log(i);
    i++;
}
```

### Do-While Loop
```javascript
// Syntax: do { ... } while(condition);
let i = 0;
do {
    console.log(i);
    i++;
} while (i < 10);
```

### For-Of Loop
- **Usage:** Iterates over arrays and strings
  ```javascript
  const array = [1, 2, 3];
  for (const x of array) {
      console.log(x);
  }
  ```

### For-In Loop
- **Usage:** Iterates over the properties of an object, indices of an array, or characters of a string
  ```javascript
  const obj = {
      "name": "nirajan",
      "lol": "lol"
  };
  const arr = ["nirajan", "lol"];
  const str = "mynameisnirajan";

  for (const key in obj) {
      console.log(key); // Prints the keys of the object
  }

  for (const index in arr) {
      console.log(arr[index]); // Prints the values of the array
  }

  for (const index in str) {
      console.log(str[index]); // Prints the characters of the string
  }
  ```

### For-Each Loop
- **Usage:** Iterates over array elements
  ```javascript
  const array = [1, 2, 3];
  array.forEach((data) => {
      console.log(data);
  });
  ```

### Break and Continue Statements
- **break:** Exits the loop
- **continue:** Skips the current iteration and continues with the next iteration

## 14. Map, Filter, and Reduce in JavaScript
### i. filter()
- **Purpose:** Creates a new array with elements that pass a test.
- **Example:** To get all odd numbers from an array:
  ```javascript
  const a = [1, 2, 3, 4, 5, 6];
  const filtered = a.filter(num => num % 2); // [1, 3, 5]
  ```

### ii. map() Method
- **Purpose:** map() creates a new array populated with the results of calling a provided function on every element in the calling array. It’s used to transform each element in the array.
- **Example:** Create an array of squares from an existing array.
  ```javascript
  const a = [1, 2, 3, 4, 5, 6];
  const squares = a.map((num) => num * num);
  console.log(squares); // Output: [1, 4, 9, 16, 25, 36]
  ```
  Here, the function `num * num` is applied to each element, resulting in a new array of squared numbers.

### iii. reduce() Method
- **Purpose:** reduce() executes a reducer function on each element of the array, resulting in a single output value. It’s used to accumulate or combine values from the array into a single result.
- **Example:** Sum up all the numbers in the array.
  ```javascript
  const a = [1, 2, 3, 4, 5, 6];
  const sum = a.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
  console.log(sum); // Output: 21
  ```
  Here, `accumulator` starts at 0 and `currentValue` iterates over each element, summing them up.

### iv. Method Chaining
- **Purpose:** You can chain filter(), map(), and other array methods together to perform multiple operations in a single, readable statement.
- **Example:** Filter out odd numbers and then square them.
  ```javascript
  const a = [1, 2, 3, 4, 5, 6];
  const result = a.filter((num) => num % 2)
                  .map((num) => num * num);
  console.log(result); // Output: [1, 9, 25]
  ```
  Here, `filter()` first selects the odd numbers, and then `map()` squares those numbers, producing a new array with the squared values of the odd numbers.

### Summary
- **filter():** Selects elements that meet a specific condition.
- **map():** Transforms elements based on a function.
- **reduce():** Reduces the array to a single value based on a function.
- **Method Chaining:** Combines multiple array operations in a concise and readable manner.
  These methods are powerful tools for processing and transforming arrays in JavaScript.

## 15. Importing and Exporting in JavaScript
### Default Export
- **Only one default export is allowed per module.**
- **Use for the primary function, class, or object in a module.**
  ```javascript
  // utils.js
  export default function primaryFunction() {
    console.log("This is the primary function");
  }

  // main.js
  import primaryFunction from './utils.js';
  primaryFunction(); // Output: This is the primary function
  ```

### Named Export
- **Allows multiple exports per module.**
- **Use to export multiple functions, variables, or objects.**
  ```javascript
  // utils.js
  function function1() { console.log("This is function1"); }
  function function2() { console.log("This is function2"); }
  export { function1, function2 };

  // main.js
  import { function1, function2 } from './utils.js';
  function1(); // Output: This is function1
  function2(); // Output: This is function2
  ```

### Summary
- **Default Export:** One per module, no curly braces during import.
- **Named Export:** Multiple per module, use curly braces during import.

## 16. Error Handling
### Try-Catch
The try...catch statement is used for error handling in JavaScript. It allows you to catch exceptions and handle them gracefully without breaking the execution of the program.
```javascript
try {
    // Code that may throw an error
    let result = riskyOperation();
} catch (error) {
    // Code to handle the error
    console.error('An error occurred:', error);
}
```

### Throwing Errors in JavaScript:
- **Purpose:** Use the throw statement to create custom error messages and stop code execution.
- **Syntax:** `throw new Error('Error message');`

## 17. Timers
### setTimeout
Schedules a function to be executed after a specified delay (in milliseconds).
```javascript
const timeoutId = setTimeout(() => {
    console.log('Executed after 1 second');
}, 1000);
```

### setInterval
Repeatedly executes a function at specified intervals (in milliseconds).
```javascript
const intervalId = setInterval((a, b) => {
    console.log(a); // Output: hi
    console.log(b); // Output: oi
}, 20, "hi", "oi");
```

### clearInterval
Stops a function from being executed repeatedly by clearing the interval.
```javascript
clearInterval(intervalId);
```

### clearTimeout
Cancels a timeout previously established by setTimeout.
```javascript
clearTimeout(timeoutId);
```

## 18. Promises
Promises represent the eventual completion (or failure) of an asynchronous operation and its resulting value. They are used to handle asynchronous operations in JavaScript.
### i. Creating a Promise
```javascript
const myPromise = new Promise((resolve, reject) => {
    if (/* some condition */) {
        resolve('Success!');
    } else {
        reject('Failure!');
    }
});
```

### ii. Using Promises
```javascript
myPromise.then(result => {
    console.log(result); // Success!
}).catch(error => {
    console.error(error); // Failure!
});
```

## 19. Async/Await
Async/Await is syntactic sugar over Promises, making asynchronous code easier to write and read.
**Note:** use Async function if it has await inside it and also we can await promises only
async and await are used in JavaScript to handle asynchronous operations more easily:
- **async:** Declares a function that returns a Promise.
- **await:** Pauses the execution of an async function until the Promise resolves and returns the result.

**Example:**
```javascript
async function fetchData() {
  let data = await someAsyncOperation(); // Waits for the promise to resolve
  console.log(data);
}
```
This makes asynchronous code easier to read and write compared to using Promises directly.

### Using Async/Await
```javascript
async function fetchData() {
    try {
        let response = await fetch('https://api.example.com/data');
        let data = await response.json();
        console.log(data);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}
```

## 20. Fetch API
Fetch is used to make HTTP requests and returns a promise that resolves to the response of the request.
### Basic Usage
```javascript
fetch('https://api.example.com/data')
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error('Error:', error));
```

## JavaScript Reference Behavior: Objects and Arrays
### Introduction
In JavaScript, both objects and arrays are considered reference types. This means that when you assign an object or an array to another variable, you’re not creating a new copy of that object or array. Instead, the new variable holds a reference to the original object or array in memory. Understanding this concept is crucial because it directly affects how data is manipulated and shared within your code.

### Object Reference Behavior
#### 1. Overview
When you work with objects in JavaScript, it's essential to recognize that assigning an object to a new variable does not create a new object. Instead, it creates a reference to the original object. This means that any changes made through the new reference will affect the original object.

#### 2. Example
```javascript
const person = { 
name: "Alice", 
address: { 
city: "Wonderland" 
} 
}; 
const newPerson = person.address;  // newPerson now references the same 
object as person.address 
newPerson.city = "New Wonderland";  // modifying newPerson affects the 
original object 
console.log(person); 
// Output: { name: 'Alice', address: { city: 'New Wonderland' } } 
```

#### 3. Explanation
- **Object Reference:** When you create `const newPerson = person.address;`, you're not making a copy of the address object. Instead, newPerson references the same address object that person.address references. Thus, when you update `newPerson.city = "New Wonderland";`, it directly modifies the person.address object because both newPerson and person.address are pointing to the same location in memory.
- **Output:** The console logs the person object, which now reflects the change: `{ name: 'Alice', address: { city: 'New Wonderland' } }`.

### Array Reference Behavior
#### 1. Overview
Arrays in JavaScript behave similarly to objects in terms of reference handling. When you assign an array to another variable, you create a reference to the original array. As a result, any modifications through this reference will affect the original array.

#### 2. Example
```javascript
const numbers = [1, 2, 3]; 
const moreNumbers = numbers;  // moreNumbers now references the same array as 
numbers 
moreNumbers[0] = 99;  // modifying moreNumbers affects the original array 
console.log(numbers);  // Output: [99, 2, 3] 
```

#### 3. Explanation
- **Array Reference:** When you create `const moreNumbers = numbers;`, you're not creating a new array. Instead, moreNumbers becomes a reference to the same array that numbers references. Any changes to moreNumbers, such as `moreNumbers[0] = 99`, directly modify the numbers array because both variables point to the same array in memory.
- **Output:** The console logs the numbers array, which now reflects the change: `[99, 2, 3]`.

### Key Takeaways
1. **Reference Types:** Both objects and arrays are reference types in JavaScript, meaning that variables assigned to them hold references to the same data in memory.
2. **Shared Modifications:** Changes made to an object or array through one reference will affect all other references to that same object or array.
3. **Memory Efficiency:** This reference behavior allows for memory-efficient data management but requires careful handling to avoid unintended side effects.

## JavaScript References with filter() and find()
In JavaScript, the way references work with methods like filter() and find() is different, leading to distinct behaviors. Understanding these differences is crucial for working effectively with arrays and avoiding unintended side effects.

### filter(): Creating a New Array
#### 1. Overview
The filter() method in JavaScript creates a new array that contains only the elements that satisfy the provided condition. This means that a new array is returned, and it does not affect the original array. However, if the elements in the array are objects, the references to these objects are retained, meaning any modifications to the objects in the new array will also affect the original array.

#### 2. Example
```javascript
const originalArray = [ 
{ id: 1, name: "Alice" }, 
{ id: 2, name: "Bob" }, 
{ id: 3, name: "Charlie" } 
]; 
const filteredArray = originalArray.filter(item => item.id !== 2); 
// Modify an object in the filtered array 
filteredArray[0].name = "Alicia"; 
console.log(originalArray); 
// Output: [{ id: 1, name: 'Alicia' }, { id: 2, name: 'Bob' }, { id: 3, name: 
'Charlie' }] 
console.log(filteredArray); 
// Output: [{ id: 1, name: 'Alicia' }, { id: 3, name: 'Charlie' }] 
```

#### 3. Explanation
- **New Array Creation:** The filter() method creates a new array (filteredArray) that includes all elements from originalArray except the one with id 2. However, the objects within the new array are still references to the original objects in originalArray.
- **Shared References:** When you modify the name property of the first object in filteredArray (`filteredArray[0].name = "Alicia";`), it also changes in originalArray because both arrays reference the same object in memory.
- **Output:** The original array shows that the name of the first object has been changed to "Alicia", indicating that the object references are shared.

### find(): Returning a Single Element Reference
#### 1. Overview
The find() method returns the first element in the array that satisfies the provided condition. This element is not a copy but a reference to the original element in the array. As a result, any modification to this element directly affects the original array.

#### 2. Example
```javascript
const originalArray = [ 
{ id: 1, name: "Alice" }, 
{ id: 2, name: "Bob" }, 
{ id: 3, name: "Charlie" } 
]; 
const foundItem = originalArray.find(item => item.id === 2); 
// Modify the found item 
foundItem.name = "Robert"; 
console.log(originalArray); 
// Output: [{ id: 1, name: 'Alice' }, { id: 2, name: 'Robert' }, { id: 3, 
name: 'Charlie' }] 
console.log(foundItem); 
// Output: { id: 2, name: 'Robert' } 
```

#### 3. Explanation
- **Element Reference:** The find() method returns a reference to the first element that meets the condition (item.id === 2). In this case, foundItem references the same object in memory as the element in originalArray with id: 2.
- **Direct Modification:** When you modify the name property of foundItem (`foundItem.name = "Robert";`), it directly alters the corresponding object in originalArray because they are the same object in memory.
- **Output:** The original array now shows that the name of the object with id: 2 has been changed to "Robert", demonstrating that the reference was modified.

### Key Differences Between filter() and find()
1. **New Array vs. Single Element:**
  - **filter():** Returns a new array containing references to elements that meet the condition.
  - **find():** Returns a reference to the first element that meets the condition.
2. **Impact on Original Array:**
  - **filter():** The original array remains unchanged, but the objects within the new array are still references to the original objects.
  - **find():** The original array can be directly modified through the returned element.
3. **Use Cases:**
  - **Use filter() when you need a subset of the original array without altering it directly.**
  - **Use find() when you need to retrieve and possibly modify a specific element from the array.**

### Conclusion
Understanding how references work with methods like filter() and find() is crucial in JavaScript. While filter() returns a new array that retains references to the original objects, find() returns a direct reference to a single element. Being aware of these behaviors helps prevent unintended modifications to your data.

# DOM (Document Object Model)

## Theory
The DOM is a programming interface for HTML and XML documents. It represents the document as a tree structure where each node is an object representing a part of the document. This allows programming languages to interact with the document structure, style, and content.

## 1. DOM Selection Methods

### a) document.getElementById()
Selects an element by its ID attribute.

```html
<!-- HTML -->
<div id="myDiv">Hello</div>
```

```javascript
// JavaScript
const element = document.getElementById('myDiv');
console.log(element.innerText);

// Output:
// "Hello"
```

### b) document.getElementsByClassName()
Returns a collection of elements with the specified class name.

```html
<!-- HTML -->
<div class="myClass">Item 1</div>
<div class="myClass">Item 2</div>
```

```javascript
// JavaScript
const elements = document.getElementsByClassName('myClass');
for (let i = 0; i < elements.length; i++) {
    console.log(elements[i].innerText);
}

// Output:
// "Item 1"
// "Item 2"
```

### c) document.getElementsByTagName()
Returns a collection of elements with the specified tag name.

```html
<!-- HTML -->
<p>Paragraph 1</p>
<p>Paragraph 2</p>
```

```javascript
// JavaScript
const paragraphs = document.getElementsByTagName('p');
for (let i = 0; i < paragraphs.length; i++) {
    console.log(paragraphs[i].innerText);

// Output:
// "Paragraph 1"
// "Paragraph 2"
```

### d) document.querySelector()
Returns the first element that matches the CSS selector.

```html
<!-- HTML -->
<div class="myClass">First Element</div>
<div class="myClass">Second Element</div>
```

```javascript
// JavaScript
const firstElement = document.querySelector('.myClass');
console.log(firstElement.innerText);

// Output:
// "First Element"
```

### e) document.querySelectorAll()
Returns all elements that match the CSS selector.

```html
<!-- HTML -->
<div class="myClass">First Element</div>
<div class="myClass">Second Element</div>
```

```javascript
// JavaScript
const allElements = document.querySelectorAll('.myClass');
allElements.forEach(el => console.log(el.innerText));

// Output:
// "First Element"
// "Second Element"
```

## 2. DOM Properties

### a) innerText
Gets or sets the text content of an element.

```html
<!-- HTML -->
<div id="textElement">Original Text</div>
```

```javascript
// JavaScript
const element = document.getElementById('textElement');
element.innerText = 'Hello World';
console.log(element.innerText);

// Output:
// "Hello World"
```

### b) innerHTML
Gets or sets the HTML content of an element.

```html
<!-- HTML -->
<div id="htmlElement">Original Content</div>
```

```javascript
// JavaScript
const element = document.getElementById('htmlElement');
element.innerHTML = '<span>Hello World</span>';
console.log(element.innerHTML);

// Output:
// "<span>Hello World</span>"
```

### c) textContent
Gets or sets the text content of a node and its descendants.

```html
<!-- HTML -->
<div id="contentElement">Original Content</div>
```

```javascript
// JavaScript
const element = document.getElementById('contentElement');
element.textContent = 'Hello World';
console.log(element.textContent);

// Output:
// "Hello World"
```

### d) style
Gets or sets inline styles of an element.

```html
<!-- HTML -->
<div id="styledElement">Style Me</div>
```

```javascript
// JavaScript
const element = document.getElementById('styledElement');
element.style.backgroundColor = 'red';
element.style.fontSize = '16px';

// Result: Element with red background and font size of 16px
```

## 3. Events in JavaScript

Events are actions that occur in a web page that can be detected by JavaScript.

### Click Event Example
```html
<!-- HTML -->
<button id="clickButton">Click Me</button>
```

```javascript
// JavaScript
const button = document.getElementById('clickButton');
button.addEventListener('click', function(e) {
    console.log('Clicked!');
});

// Output when clicked:
// "Clicked!"
```

### Mouse Over Event Example
```html
<!-- HTML -->
<div id="hoverElement">Hover Over Me</div>
```

```javascript
// JavaScript
const element = document.getElementById('hoverElement');
element.addEventListener('mouseover', function(e) {
    console.log('Mouse over!');
});

// Output when hovered:
// "Mouse over!"
```

## 4. Error Handling

Try-catch blocks are used to handle errors gracefully.

```javascript
try {
    // Code that might throw an error
    let result = nonExistentFunction();
} catch (error) {
    console.log('An error occurred:', error.message);
} finally {
    console.log('This always executes');
}

// Output:
// "An error occurred: nonExistentFunction is not defined"
// "This always executes"
```

## 5. Custom Error Throwing

You can throw custom errors using the throw statement.

```javascript
function divide(a, b) {
    if (b === 0) {
        throw new Error('Division by zero is not allowed');
    }
    return a / b;
}

try {
    console.log(divide(4, 2));
    console.log(divide(4, 0));
} catch (error) {
    console.log('Error:', error.message);
}

// Output:
// 2
// "Error: Division by zero is not allowed"
```

## 6. Promises

Promises are used for handling asynchronous operations.

```javascript
const myPromise = new Promise((resolve, reject) => {
    // Async operation
    const success = true;
    if (success) {
        resolve('Operation successful');
    } else {
        reject('Operation failed');
    }
});

myPromise
    .then(result => console.log(result))
    .catch(error => console.log(error));

// Output:
// "Operation successful"
```

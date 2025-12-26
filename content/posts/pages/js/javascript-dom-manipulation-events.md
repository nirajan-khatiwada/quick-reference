---
title: "Mastering JavaScript DOM Manipulation and Events"
slug: "javascript-dom-manipulation-events"
date: 2024-10-19
description: "Learn how to interact with the DOM, select elements, modify content, and handle user events in JavaScript."
showToc: true
weight: 2
series: ["JavaScript"]
categories: ["JavaScript", "Web Development"]
tags: ["JavaScript", "DOM", "Events", "Web Development", "Interactive"]
summary: "A complete guide to DOM manipulation and event handling in JavaScript. Learn to select, modify, and respond to user interactions."
images: ["/images/javascript.png"]
---



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

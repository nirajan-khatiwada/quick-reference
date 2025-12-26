---
title: "Introduction to Framer Motion: Complete Guide"
slug: "introduction-to-framer-motion"
date: 2025-10-12
description: "A comprehensive guide to getting started with Framer Motion in React. Learn installation, motion components, basic animations, transitions, and interactive effects."
showToc: true
weight: 1
series: ["Framer Motion"]
categories: ["Framer Motion", "React"]
tags: ["Framer Motion", "React", "Animation", "Frontend", "Web Development"]
summary: "Master the basics of Framer Motion: installation, motion components, and creating your first animations and transitions."
images: ["/images/framer-motion.png"]
---

# Framer Motion Complete Guide

## Introduction

Framer Motion is a powerful and flexible library for creating animations in React applications. It provides a simple API for animating components, making it easy to add dynamic and engaging effects to your web projects.

> **Important Note:** Always prefer using normal CSS animations over Framer Motion for simple animations. Framer Motion is a powerful library but it comes with a cost of performance and bundle size. Use it only when you need complex animations that cannot be achieved with CSS.

## Installation

To get started with Framer Motion, install it in your React project using npm or yarn:

```bash
npm install framer-motion
```

## Motion Components

Motion components are the core of Framer Motion. They are special components that can be animated. You create a motion component by importing the `motion` object from the `framer-motion` package and using it to wrap your existing components.

```jsx
import { motion } from "framer-motion";
import React from "react";

const MyComponent = () => {
  return (
    <motion.div>
      Hello, Framer Motion!
    </motion.div>
  );
};
```

> **Note:** The motion component for `div` is `motion.div`, for `span` it is `motion.span`, and so on.

## Basic Animation

You can animate properties of the motion component using the `animate` prop. The `animate` prop takes an object where the keys are the CSS properties you want to animate and the values are the target values.

```jsx
import { motion } from 'framer-motion';

const App = () => {
  return (
    <div className='text-center mt-5 min-h-screen flex items-center bg-black justify-center'>
      <motion.button 
        className='text-xl font-bold text-white bg-slate-500 py-3 px-10 rounded-xl' 
        animate={{
          backgroundColor: "#f00",
          color: "#0f0",
          scale: 1.2,
          rotate: 1800,
          skewX: 20,
        }}
      >
        Hello World
      </motion.button>
    </div>
  );
};

export default App;
```

### What Happens Here?

The initial state represents the starting styles of the component (before animation). When the component is rendered, it transitions from this initial state to the styles defined in the animate prop.

> **Note:** If you do not define the initial state, Framer Motion will use the current styles of the component as the initial state.

## Initial State

The initial state of the animation can be defined using the `initial` prop. This prop takes an object similar to the `animate` prop, where you can specify the starting values for the properties you want to animate.

```jsx
import { motion } from 'framer-motion';

const App = () => {
  return (
    <div className='text-center mt-5 min-h-screen flex items-center bg-black justify-center'>
      <motion.button 
        className='text-xl font-bold text-white bg-slate-500 py-3 px-10 rounded-xl' 
        initial={{
          backgroundColor: "#f00",
          color: "#0f0",
          scale: 1.2,
          rotate: 1800,
          skewX: 20,
        }}
        animate={{
          backgroundColor: "#00f",
          color: "#ff0",
          scale: 1,
          rotate: 0,
          skewX: 0,
        }}
      >
        Hello World
      </motion.button>
    </div>
  );
};

export default App;
```

### What Happens Here?

When the component is first rendered, it applies both the default styles defined in the component and the inline styles provided in the initial prop. After that, it smoothly transitions from the initial state to the styles specified in the animate prop.

> **Note:** If a component has both style defined in className(element) and initial prop, then the styles defined in the initial prop will take precedence over the styles defined in className(element).

## Transitions

Transitions define how the animation progresses from the initial state to the animate state. You can customize the transition using the `transition` prop, which takes an object with various properties to control the animation's timing and behavior.

```jsx
import { motion } from 'framer-motion';

const App = () => {
  return (
    <div className='text-center mt-5 min-h-screen flex items-center bg-black justify-center'>
      <motion.button 
        className='text-xl font-bold text-white bg-slate-500 py-3 px-10 rounded-xl' 
        initial={{
          backgroundColor: "#f00",
          color: "#0f0",
          scale: 1.2,
          rotate: 1800,
          skewX: 20,
        }}
        animate={{
          backgroundColor: "#00f",
          color: "#ff0",
          scale: 1,
          rotate: 0,
          skewX: 0,
        }}
        transition={{
          duration: 2,
          ease: "easeInOut",
          delay: 0.5,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      >
        Hello World
      </motion.button>
    </div>
  );
};

export default App;
```

### Transition Properties

- **duration**: Specifies the duration of the animation in seconds
- **ease**: Defines the easing function for the animation. Common options include:
  - `"linear"`
  - `"easeIn"`
  - `"easeOut"`
  - `"easeInOut"`
  - Custom cubic-bezier values: `[0.42, 0, 0.58, 1]`
- **delay**: Sets a delay before the animation starts, in seconds
- **repeat**: Determines how many times the animation should repeat. Use `Infinity` for infinite looping
- **repeatType**: Specifies the behavior of the animation when it repeats:
  - `"loop"`: Restarts from the beginning
  - `"reverse"`: Plays backward (from end to start)
- **repeatDelay**: Adds a delay between each repeat of the animation, in seconds
- **type**: Defines the type of animation. Common options include:
  - `"tween"` (default)
  - `"spring"`
  - `"inertia"`

## Spring Animation

Spring animations simulate real-world physics, creating a more natural and dynamic feel. To use spring animations, set the `type` property in the `transition` prop to `"spring"` and customize properties like `stiffness`, `damping`, and `mass`.

> **Note:** Spring animations do not use the duration property. Don't use ease property with spring animation.

### Properties of Spring Animation

- **bounce**: Controls the bounciness of the spring. Higher values result in more bounce
- **velocity**: Sets the initial velocity of the animation (how fast the animation will start)
- **mass**: Defines the mass of the object being animated. Higher values make the animation feel heavier and slower
- **damping**: Controls the amount of friction in the spring. Higher values result in less oscillation and a quicker stop
- **stiffness**: Determines the stiffness of the spring. Higher values make the animation feel more rigid and responsive

```jsx
import { motion } from 'framer-motion';

const App = () => {
  return (
    <div className='text-center mt-5 min-h-screen flex items-center bg-black justify-center'>
      <motion.button 
        className='text-xl font-bold text-white bg-slate-500 py-3 px-10 rounded-xl' 
        initial={{
          backgroundColor: "#f00",
          color: "#0f0",
          scale: 1.2,
          rotate: 1800,
          skewX: 20,
        }}
        animate={{
          backgroundColor: "#00f",
          color: "#ff0",
          scale: 1,
          rotate: 0,
          skewX: 0,
        }}
        transition={{
          type: "spring",
          stiffness: 100,
          damping: 10,
          mass: 1,
          bounce: 0.5,
          velocity: 0,
          delay: 0.5,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      >
        Hello World
      </motion.button>
    </div>
  );
};

export default App;
```

## Applying Properties to Specific Animations

You can apply different transition properties to specific animated properties by using an object for the `transition` prop. Each key in the object corresponds to a property being animated, allowing you to customize the transition for each property individually.

```jsx
import { motion } from "framer-motion";

const SimpleExample = () => {
  return (
    <motion.div
      initial={{ scaleX: 0, scaleY: 0, rotate: 0 }}
      animate={{ scaleX: 1, scaleY: 1, y: 100, rotate: 360 }}
      transition={{
        scaleX: { duration: 1, ease: "easeInOut" },
        scaleY: { duration: 2, ease: "easeInOut", delay: 1 },
        y: { type: "spring", stiffness: 100, damping: 10, delay: 2 },
        duration: 1, // This will be applied to rotate property
        ease: "easeInOut",
      }}
    >
      Hello World
    </motion.div>
  );
};

export default SimpleExample;
```

> **Note:** If you define specific transition properties for individual animated properties, then only those transitions are used by that property.

### Example of Property-Specific Transitions

```jsx
{
  scaleX: {
    duration: 1,
    repeatDelay: 5,
    repeatType: "reverse",
    repeat: Infinity,
  },
  delay: 2,
}
```

Here, only `scaleX` will have duration, repeatDelay, repeatType, and repeat properties. It doesn't have the delay property, so the delay will be ignored for the scaleX property. However, other properties defined in animation like y and scaleY will have a delay property of 2 seconds.

### Animating ScaleX and ScaleY Separately

we can do like this:

```jsx
import { motion } from "framer-motion";
const App = () => {
  return (
    <div className="text-center mt-5 min-h-screen flex items-center bg-black justify-center">
      <motion.button
        className="text-xl font-bold text-white bg-slate-500 py-3 px-10 rounded-xl"
        initial={{
          scaleX: 0,
          scaleY: 0,
        }}
        animate={{
          scaleX: 1,
          scaleY: 1,
        }}
        transition={{
          duration: 1,
          ease: "easeInOut",
        }}
      >
        Hello World
      </motion.button>
    </div>
  );
};
export default App;
```

What Happens Here?
The button scales both horizontally and vertically from 0 to 1 simultaneously over a duration of 1 second with an ease-in-out transition at the same time.

For sequential scaling animations:

```jsx
import { motion } from "framer-motion";

const App = () => {
  return (
    <div className="text-center mt-5 min-h-screen flex items-center bg-black justify-center">
      <motion.button
        className="text-xl font-bold text-white bg-slate-500 py-3 px-10 rounded-xl"
        initial={{
          scaleX: 0,
          scaleY: 0,
        }}
        animate={{
          scaleX: 1,
          scaleY: 1,
        }}
        transition={{
          scaleX: {
            duration: 1,
            ease: "easeInOut",
          },
          scaleY: {
            duration: 1,
            ease: "easeInOut",
            delay: 1, // Delay scaleY animation by 1 second
          },
        }}
      >
        Hello World
      </motion.button>
    </div>
  );
};

export default App;
```
what Happens Here?
here the scaleX will happen then after that scaleY will happen.


This is ok but its difficult to implement complex animations using this method. So we will use keyframes animation for that.

## Keyframes Animation

You can define keyframes for your animation using an array of values for each property you want to animate. Framer Motion will interpolate between these values over the course of the animation.

### Why Use Keyframes?

Defining everything using properties like duration, delay, repeat, etc., can be tedious and sometimes not possible to achieve complex animations. Keyframes allow us to define multiple states for an animation in a more concise way and are easier to understand.

```jsx
import { motion } from "framer-motion";

const App = () => {
  return (
    <div className="text-center mt-5 min-h-screen flex items-center bg-black justify-center">
      <motion.button
        className="text-xl font-bold text-white bg-slate-500 py-3 px-10 rounded-xl"
        initial={{
          borderRadius: "0%",
          rotate: 0,
          aspectRatio: "1 / 1",
        }}
        animate={{
          borderRadius: ["0%", "50%", "50%"], // Keyframes for borderRadius
          rotate: [0, 0, 360], // Keyframes for rotation
        }}
        transition={{
          duration: 10,
          repeatDelay: 10,
          ease: "easeInOut",
          repeat: Infinity,
          repeatType: "reverse",
        }}
      >
        Hello World
      </motion.button>
    </div>
  );
};

export default App;
```

### What Happens Here?

**Initial state:** The button has a borderRadius of 0% (square shape) and a rotation of 0 degrees.

**Animation state:** Total animation duration is 10 seconds and it will repeat infinitely with a delay of 10 seconds between each repeat. The repeat type is reverse, which means it will animate back to initial state after completing one cycle of animation.

1. **Step 1:** Initially, the button starts with a borderRadius of 0% and at the same time it is at 0-degree rotation
2. **Step 2:** The value of borderRadius is 50% while rotation is still 0 degrees. The button transforms from square to circle while rotation remains 0 degrees
3. **Step 3:** The value of borderRadius is still 50% while rotation is 360 degrees. The button rotates 360 degrees while still being a circle

After this, it will reverse the animation back to initial state. This process will repeat infinitely.

### Time Property in Keyframes

You can specify the timing of each keyframe using the `times` property in the `transition` prop. The `times` array should have the same length as the keyframe arrays and defines when each keyframe should occur during the animation.

```jsx
import { motion } from "framer-motion";

const App = () => {
  return (
    <div className="text-center mt-5 min-h-screen flex items-center bg-black justify-center">
      <motion.button
        className="text-xl font-bold text-white bg-slate-500 py-3 px-10 rounded-xl"
        initial={{
          borderRadius: "0%",
          rotate: 0,
          aspectRatio: "1 / 1",
        }}
        animate={{
          borderRadius: ["0%", "50%", "50%"], // Keyframes for borderRadius
          rotate: [0, 0, 360], // Keyframes for rotation
        }}
        transition={{
          duration: 10,
          repeatDelay: 10,
          ease: "easeInOut",
          repeat: Infinity,
          repeatType: "reverse",
          times: [0, 0.75, 1], // Define when each keyframe occurs
        }}
      >
        Hello World
      </motion.button>
    </div>
  );
};
```

This means:
- At 0% of the animation duration (0 seconds), the first keyframe is applied (borderRadius: "0%", rotate: 0)
- At 75% of the animation duration (7.5 seconds), the second keyframe is applied (borderRadius: "50%", rotate: 0)
- At 100% of the animation duration (10 seconds), the third keyframe is applied (borderRadius: "50%", rotate: 360)

> **Note:** By default, time is evenly distributed across keyframes if the times property is not defined, assuming equal time for each keyframe like `[0, 0.5, 1]` for 3 keyframes.

### Difference Between Ease and Times Property

- **ease**: Controls the acceleration and deceleration of the animation between keyframes. It affects how quickly or slowly the animation progresses through each segment defined by the keyframes.

- **times**: Specifies the exact timing of each keyframe within the overall duration of the animation. It defines when each keyframe should occur as a percentage of the total animation time

consider this example"
```jsx
{
  animate: {
    x: [0, 100, 0],
  },
  transition: {
    duration: 3,
    ease: "easeInOut",
    times: [0, 0.5, 1],
  },
}
```
Tis means in 3 secods:
- At 0 seconds (0% of duration), x is 0
- At 1.5 seconds (50% of duration), x is 100
- At 3 seconds (100% of duration), x is 0

And in between these key frames:
- From 0 to 1.5 seconds, the animation will ease in and out as it moves from x: 0 to x: 100
- From 1.5 to 3 seconds, the animation will again ease in and out as it moves from x: 100 back to x: 0


## Interactive Animations

Here we cover hover, tap, and focus interactivity. There are many more interactivities like drag, focus, etc., which you can explore in the official documentation of Framer Motion.

### 1. Hover Animation

Hover animations are triggered when the user hovers over a motion component. You can define hover animations using the `whileHover` prop, which works similarly to the `animate` prop.

```jsx
import { motion } from "framer-motion";

const App = () => {
  return (
    <div className="text-center mt-5 min-h-screen flex items-center bg-black justify-center">
      <motion.button
        className="text-xl font-bold text-white bg-slate-500 py-3 px-10 rounded-xl"
        whileHover={{
          scale: 1.2,
          backgroundColor: "#00f",
          color: "#ff0",
          rotate: 360,
        }}
        transition={{
          duration: 0.5,
          ease: "easeInOut",
        }}
      >
        Hover Me
      </motion.button>
    </div>
  );
};
```

### 2. Tap Animation

Tap animations are triggered when the user clicks or taps on a motion component. You can define tap animations using the `whileTap` prop, which also works similarly to the `animate` prop.

```jsx
import { motion } from "framer-motion";

const App = () => {
  return (
    <div className="text-center mt-5 min-h-screen flex items-center bg-black justify-center">
      <motion.button
        className="text-xl font-bold text-white bg-slate-500 py-3 px-10 rounded-xl"
        whileTap={{
          scale: 0.8,
          backgroundColor: "#f00",
          color: "#0f0",
          rotate: -360,
        }}
        transition={{
          duration: 0.2,
          ease: "easeInOut",
        }}
      >
        Tap Me
      </motion.button>
    </div>
  );
};
```

### 3. Focus Animation

Focus animations are triggered when the user focuses on a motion component, typically through keyboard navigation or clicking. You can define focus animations using the `whileFocus` prop, which works similarly to the `animate` prop.

```jsx
import { motion } from "framer-motion";

const App = () => {
  return (
    <div className="text-center mt-5 min-h-screen flex items-center bg-black justify-center">
      <motion.button
        className="text-xl font-bold text-white bg-slate-500 py-3 px-10 rounded-xl"
        whileFocus={{
          scale: 1.1,
          backgroundColor: "#0ff",
          color: "#f0f",
          rotate: 180,
        }}
        transition={{
          duration: 0.3,
          ease: "easeInOut",
        }}
      >
        Focus Me
      </motion.button>
    </div>
  );
};

export default App;
```

> **Note:** Adding transition works the same as before for all interactive animations.

### Core Outcome
This section we have discussed about how to make a animation using initial, animate, and transition which is used to animate when the component is rendered which animate the component from initial state to animate state.


also, we discuss about how can we animate an element when it is hovered, tapped, or focused using whileHover, whileTap, and whileFocus props respectively and how to add transition to these interactive animations.


Based on user input also we can animate which we will discuss in the next section.
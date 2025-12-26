---
title: "Using useInView Hook for Viewport Detection"
slug: "useinview-hook-viewport-detection"
date: 2025-10-21
description: "Advanced viewport detection with `useInView` hook. Build logic that reacts to elements entering or leaving the screen."
showToc: true
weight: 10
series: ["Framer Motion"]
categories: ["Framer Motion", "React"]
tags: ["Framer Motion", "React", "Animation", "Hooks", "useInView", "Scroll Detection"]
summary: "Go beyond basic enter animations. Use the `useInView` hook to run custom logic and side effects when elements become visible."
images: ["/images/framer-motion.png"]
---

## `useInView` Hook In Framer Motion
The `useInView` returns a boolean value indicating whether a referenced element is currently within the viewport. This hook is particularly useful for triggering animations or loading content when an element comes into view.

What it takes as arguments:
- A reference to a DOM element (created using `useRef`).
- An optional configuration consisting of:
    - `amount`: Specifies how much of the element should be visible before considering it "in view". It can be set to `"some"` (default) or `"all"`.
    - `once`: A boolean that, when set to `true`, ensures the hook only triggers the in-view state once.


How to Set It Up:
- Create a reference variable using `useRef`.

```jsx
const ref = useRef(null);
```

- Attach this reference to the DOM element you want to monitor.

```jsx
<div ref={ref}>Content to monitor</div>
```

- Use the `useInView` hook, passing in the reference and any desired configuration options.

```jsx
const isInView = useInView(ref, { amount: 0.5, });
```

- Use the state variable `isInView` to conditionally trigger animations or load content or apply the js logic.

```jsx
useEffect(() => {
  if (isInView) {
    sound.play();
  }
}, [isInView]);
```

> Note: We can use isInView to find whether the element is in the viewport or not. Based on that we can trigger animations or load content dynamically.


Example Usage:
```jsx
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function App() {
  const ref = useRef(null);
  const isInView = useInView(ref, { amount: 0.5 });
  console.log(isInView);

  return (
    <div className="h-[250vh] p-12">
      <div className="h-[150vh]"></div>

      <motion.div
        ref={ref}
        className="w-[300px] h-[300px] bg-blue-500 mx-auto"
      ></motion.div>

      <motion.div className="fixed top-24 left-1/2 -translate-x-1/2 bg-black text-white px-4 py-2 rounded">
        {`${isInView}`}
      </motion.div>
    </div>
  );
}
```
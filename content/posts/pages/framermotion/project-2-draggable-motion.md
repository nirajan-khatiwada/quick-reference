---
title: "Project 2: Draggable Box with Dynamic Motion Values"
slug: "project-2-draggable-motion"
date: 2025-10-15
description: "Build an interactive draggable component in React using Framer Motion. Change colors and scale dynamically based on drag position."
showToc: true
weight: 4
series: ["Framer Motion"]
categories: ["Framer Motion", "React"]
tags: ["Framer Motion", "React", "Animation", "Drag", "Interactivity", "Frontend Project"]
summary: "Create a draggable element that adapts its properties (color, scale) based on its screen position using motion values."
images: ["/images/framer-motion.png"]
---

Project 2: Create a draggable square box and when you drag it to left side the background color of box should change to red and when you drag it to right side the background color of box should change to green and when you drag it to top the size of box should increase and when you drag it to bottom the size of box should decrease.


```jsx
import React from "react";
import { motion, useMotionValue,useTransform } from "framer-motion";
const App = () => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const background = useTransform(x,[-100,100],["#f87171","#34d399"])
  const scale = useTransform(y,[-100,100],[0.5,2])
  return (
    <div className="bg-black text-white h-screen w-screen items-center justify-center flex flex-col gap-10">
      <motion.div
        drag
        dragConstraints={{ left: -100, right: 100, top: -100, bottom: 100 }}
        style={{ x: x, y: y,
          backgroundColor:background,
          scale:scale
         }}
        className="bg-amber-950 w-36 h-36 rounded-xl font-sans overflow-hidden flex items-center justify-center"
      >
        Drag Me
      </motion.div>
 
    </div>
  );
};
export default App;
```

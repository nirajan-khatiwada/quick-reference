---
title: "Project 5: Building a Scroll Progress Bar"
slug: "project-5-scroll-progress-bar"
date: 2025-10-25
description: "Create a reading progress indicator with Framer Motion `useScroll` and `useSpring` hooks. Perfect for blogs and long-form content."
showToc: true
weight: 14
series: ["Framer Motion"]
categories: ["Framer Motion", "React"]
tags: ["Framer Motion", "React", "Animation", "Progress Bar", "Scroll", "Frontend Project"]
summary: "Enhance user experience with a smooth, physics-based scroll progress bar for your articles."
images: ["/images/framer-motion.png"]
---

Project: Create a progress bar using useScroll and useTransform hooks from framer motion.

```jsx
import {
  useScroll,
  useTransform,
  motion,
  useSpring,
} from "framer-motion";
import React from "react";

const App = () => {
  const { scrollYProgress } = useScroll();
  const widthValue = useSpring(
    useTransform(scrollYProgress, [0, 1], ["0%", "100%"])
  );

  return (
    <div className="h-[200vh]">
      <motion.div
        className="fixed top-0 left-0 w-full h-2 bg-red-700"
        style={{
          width: widthValue,
        }}
      ></motion.div>
    </div>
  );
};

export default App;

``` 
---
title: "Project 4: Playing Sound on Viewport Entry"
slug: "project-4-sound-on-view"
date: 2025-10-22
description: "Interactive audio experience: Learn to play sound effects when specific elements enter the viewport using the `useInView` hook."
showToc: true
weight: 11
series: ["Framer Motion"]
categories: ["Framer Motion", "React"]
tags: ["Framer Motion", "React", "Animation", "Audio", "useInView", "Frontend Project"]
summary: "Create a unique user experience by integrating audio playback with viewport detection using Framer Motion."
images: ["/images/framer-motion.png"]
---

Project: Create a React component that plays a sound when a specific element comes into view using Framer Motion's useInView hook.

```jsx
import { motion, useInView } from "framer-motion";
import { useEffect, useRef } from "react";

const url =
  "https://commondatastorage.googleapis.com/codeskulptor-assets/Collision8-Bit.ogg";
const a = new Audio(url);

export default function App() {
  const ref = useRef(null);
  const isInView = useInView(ref, { amount: 0.1 });

  useEffect(() => {
    if (isInView) {
      a.preload = "auto";

      // start (must be called after a user gesture in many browsers)
      a.play()
        .then(() => {
          console.log("playing");
        })
        .catch((err) => {
          console.error("play failed:", err);
        });
    }
  }, [isInView]);
  return (
    <div className="h-[250vh] p-12">
      <div className="h-[150vh]"></div>

      <motion.div
        ref={ref}
        className="w-[300px] h-[300px] bg-blue-500 mx-auto"
        initial={{
          rotate: 0,
          scale: 0.5,
        }}
        whileInView={{
          rotate: 30,
          scale: 1.5,
        }}
        viewport={{
          amount: 0.5,
        }}
        transition={{ duration: 1 }}
      ></motion.div>
    </div>
  );
}
```
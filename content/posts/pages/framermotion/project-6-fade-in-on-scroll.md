---
title: "Project 6: Scroll Fade-In Effect"
slug: "project-6-fade-in-on-scroll"
date: 2025-10-26
description: "Implement a sophisticated fade-in and fade-out effect based on scroll position using `useScroll` and `useTransform`."
showToc: true
weight: 15
series: ["Framer Motion"]
categories: ["Framer Motion", "React"]
tags: ["Framer Motion", "React", "Animation", "Fade Effect", "Scroll", "Frontend Project"]
summary: "Add range-based opacity animations to elements as you scroll, creating a polished, professional look."
images: ["/images/framer-motion.png"]
---

## Project : Create a fade-in effect on scroll using useScroll and useTransform hooks from framer motion.
```jsx
import { useRef } from "react";
import { motion, useScroll, useInView, useTransform } from "framer-motion";
const colors = ["bg-amber-400", "bg-blue-400", "bg-red-400"];

const FadeIn = ({ children ,colors,rowspan}) => {
  const ref = useRef(null);
  const {scrollYProgress} = useScroll({
    target:ref,
    offset:["start end","end start"]
  })

  const opacity = useTransform(scrollYProgress,
  [0,0.5,1],[0,1,0]
  )
  return (
    <motion.div ref={ref}
    className={`${colors} ${rowspan}`}
    style={{opacity}}

    >
      {children}
    </motion.div>
  )
};

const App = () => {
  return (
    <div>
      <div className="h-[200vh]"></div>

      <div className="grid grid-cols-2 w-2/3 h-[80vh] mx-auto">
        {[0, 1, 2].map((x) => {
          return (
            <FadeIn key={x} colors={colors[x]} rowspan={x==0?"row-span-2":""}>
           
            </FadeIn>
          );
        })}
      </div>

      <div className="h-[200vh]"></div>
    </div>
  );
};

export default App;
```
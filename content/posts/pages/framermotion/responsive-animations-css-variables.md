---
title: "Responsive Animations with CSS Variables in Framer Motion"
slug: "responsive-animations-css-variables"
date: 2025-10-19
description: "Techniques for creating responsive animations in React. Learn to syncFramerr Motion with CSS variables for adaptable designs."
showToc: true
weight: 8
series: ["Framer Motion"]
categories: ["Framer Motion", "React"]
tags: ["Framer Motion", "React", "Animation", "Responsive Design", "CSS Variables"]
summary: "Combine the power of CSS variables with Framer Motion to build animations that adapt perfectly to different screen sizes and states."
images: ["/images/framer-motion.png"]
---

## Responsive Animation 


### Animatng Variables To Syncronized Animations
In framer motion we can animate  variable and using it as css variables to create syncronized animations.
```jsx
import React from 'react'
import { motion } from 'framer-motion'

const App = () => {
  const [isOpen,setIsOpen] = React.useState(false)
  return (
    <div className='bg-black text-white h-screen w-screen flex items-center justify-center flex-col gap-10'>
      <motion.div 
        style={{
          "--width":isOpen ? "200px" : "100px",
          "--height":isOpen ? "200px" : "100px",
          "--borderRadius":isOpen ? "20px" : "50%",
          "--backgroundColor":isOpen ? "#34d399" : "#f87171"
        }}
        animate={isOpen ? "open" : "closed"}
        variants={{
          open:{
            width:"var(--width)",
            height:"var(--height)",
            borderRadius:"var(--borderRadius)",
            backgroundColor:"var(--backgroundColor)",
            transition:{
              duration:0.5
            }
          },
          closed:{
            width:"var(--width)",
            height:"var(--height)",
            borderRadius:"var(--borderRadius)",
            backgroundColor:"var(--backgroundColor)",
            transition:{
              duration:0.5
            }
          }
        }}
        className='flex items-center justify-center'
      >
        Box
      </motion.div>
      <button className='bg-slate-700 text-white px-4 py-2 rounded-lg' onClick={()=>setIsOpen(!isOpen)}>Toggle</button>
    </div>
  )
}

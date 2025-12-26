---
title: "Project 3: Staggered Sidebar Menu Animation"
slug: "project-3-staggered-sidebar-menu"
date: 2025-10-18
description: "Build a collapsible sidebar menu in React with smooth staggered text animations using Framer Motion variants."
showToc: true
weight: 7
series: ["Framer Motion"]
categories: ["Framer Motion", "React"]
tags: ["Framer Motion", "React", "Animation", "Sidebar", "Menu", "Stagger"]
summary: "Create a production-ready collapsible sidebar menu that animates its items sequentially using `staggerChildren`."
images: ["/images/framer-motion.png"]
---

Project 3:create a sidebar menu which when clicked expands to show the menu items and when clicked again it collapses to hide the menu items and use staggerChildren to animate the menu items one by one when the sidebar expands and collapses.


```jsx
import React from 'react'
import { motion } from 'framer-motion'
const App = () => {

  const [open,setOpen] = React.useState(true)
  return (
    <div className='flex h-screen w-screen'>
      <motion.div className='bg-black w-1/6'
        variants={{
          open:{
            width:"16.666667%",
            transition:{
              staggerChildren:0.5,
              staggerDirection:1,
              
            }
          },
          closed:{
            width:"5%",
            transition:{
              staggerChildren:0.5,
              when:"afterChildren"
            }
          }
        }}

        initial="open"
        animate={open ? "open" : "closed"}
      >
     
        <h1 className='text-white text-3xl font-bold text-center p-4 mx-auto cursor-pointer' 
        onClick={()=>setOpen(!open)}
        >X</h1>
        <div>
          {
          ["Home", "About", "Services", "Contact"].map((item) => (
            <motion.div key={item}
            variants={
              {
                open:{
                  opacity:1,
                  height:"auto",},
                closed:{
                  opacity:0,
                  height:0,
                }
              }
            }

            >
              <h1 className='text-white text-xl font-bold text-center p-4 ml-5 hover:bg-slate-700 rounded-lg cursor-pointer'>{item}</h1>
            </motion.div>
          ))
        }
        </div>
   
      </motion.div>
      < div className='bg-slate-800 grow'>

      </div>
      
    </div>
  )
}

export default App
```
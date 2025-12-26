---
title: "Building a Navbar with Layout Animations"
slug: "simple-navbar-layout-animation"
date: 2025-12-03
description: "Practical guide to building a responsive, animating navbar using Framer Motion's layout animations."
showToc: true
weight: 18
series: ["Framer Motion"]
categories: ["Framer Motion", "React"]
tags: ["Framer Motion", "React", "Animation", "Navbar", "Layout", "Frontend Project"]
summary: "Project tutorial: Create a polished navigation bar where elements smoothly resize and reposition using layout animations."
images: ["/images/framer-motion.png"]
---

Project:Create a simple navbar using layout animation in framer motion 


```jsx
import { animate, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
const CHILD_VARIANTS = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 20 },
};

const ANIMATE_VARIANTS = {
  animate: {
    transition: {
      staggerChildren: 0.1,
      staggerDirection: 1,
    },
  },
  exit: {
    transition: {
      staggerChildren: 0.1,
      staggerDirection: -1,
    },
  },

  initial: {},
};

const App = () => {
  const [click, setIsClick] = useState(false);

  return (
    <div className="h-screen w-full flex justify-center items-end">
      <motion.nav layout className="rounded-xl mb-10 p-10 bg-amber-100">
        <AnimatePresence>
          {click && (
            <motion.div
              style={{
                padding: click ? "50px" : "40px",
              }}
              layout
              className="grid grid-cols-2 gap-10 font-bold mb-10 text-center"
              initial="initial"
              animate="animate"
              exit="exit"
              variants={ANIMATE_VARIANTS}
            >
              {[
                "Project 1",
                "Project 2",
                "Project 3",
                "Project 4",
                "Project 5",
                "Project 6",
              ].map((item) => (
                <motion.div
                  variants={CHILD_VARIANTS}
                  layout
                  key={item}
                  className="cursor-pointer px-10 py-2 rounded-md bg-blue-500 hover:text-white transition-colors duration-300"
                >
                  {item}
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        <motion.ul layout className="flex space-x-10 font-bold">
          {["Home", "Portfolio", "Services"].map((item) =>
            item === "Portfolio" ? (
              <motion.li
                layout
                key={item}
                className="cursor-pointer px-10 py-2 rounded-md
          hover:bg-blue-500 hover:text-white transition-colors duration-300
          
          "
                onClick={() => setIsClick(!click)}
              >
                {item}
              </motion.li>
            ) : (
              <motion.li
                key={item}
                className="cursor-pointer px-10 py-2 rounded-md
          hover:bg-blue-500 hover:text-white transition-colors duration-300
          "
              >
                {item}
              </motion.li>
            )
          )}
        </motion.ul>
      </motion.nav>
    </div>
  );
};

export default App;
```
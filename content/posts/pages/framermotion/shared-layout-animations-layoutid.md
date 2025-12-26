---
title: "Shared Layout Animations with layoutId"
slug: "shared-layout-animations-layoutid"
date: 2025-12-03
description: "Create seamless morphing transitions between different components using `layoutId` in Framer Motion."
showToc: true
weight: 19
series: ["Framer Motion"]
categories: ["Framer Motion", "React"]
tags: ["Framer Motion", "React", "Animation", "Shared Layout", "layoutId", "Morphing"]
summary: "Learn the secret to App-Store-like transitions. Animate shared elements between different components or routes with `layoutId`."
images: ["/images/framer-motion.png"]
---

### Shared layout animations in framer motion
Upto now we have seen than how to apply the layout animation to a single component using the layout prop but shared layout animation allows us to animate between different components that share the same layoutId.


### How does it work?
1. For shared layout animations to work both the components must have the same layoutId prop value.
2. Only one component with a specific layoutId can be present in the react tree at a time.
3. Both component must be motion components.
4. When one component is removed from the react tree and another component with the same layoutId is added to the react tree framer motion will automatically animate between the two components based on their layout properties like position, size, etc.


### Example of Shared Layout Animation
```jsx
import { useState } from "react";
import { motion } from "framer-motion";
const NAV_ITEMS = ["Home", "About", "Contact"];

const App = () => {
  const [active, isActive] = useState(NAV_ITEMS[0]);

  return (
    <nav>
      <ul className="flex space-x-20 justify-center my-3">
        {NAV_ITEMS.map((item) => (
          <motion.li
            key={item}
            className={`cursor-pointer relative z-99 px-5  py-3${
              active === item ? "text-blue-500 font-bold" : "text-gray-700"
            }`}
            onClick={() => isActive(item)}
          >
            {item === active && (
              <motion.div
                className="inset-0 absolute bg-green-400 -z-10 rounded-xl "
                layoutId="animate"
              ></motion.div>
            )}
            {item}
          </motion.li>
        ))}
      </ul>
    </nav>
  );
};

export default App;
```

### Another Example
App.jsx
```jsx
import React from "react";
import SongList from "./components/SongList.jsx";
import SongDetail from "./components/SongDetail.jsx";

const App = () => {
  const songs = [
    {
      id: 1,
      title: "song 1",
      artist: "artist 1",
      desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    },
    {
      id: 2,
      title: "song 2",
      artist: "artist 2",
      desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    },
    {
      id: 3,
      title: "song 3",
      artist: "artist 3",
      desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    },
  
  ];
  const [activeSong, setActiveSong] = React.useState(null);


  return <>
  <ul className="flex flex-col bg-amber-100 w-2/3  mx-auto p-10 mt-10 space-y-10">
    {
      songs.map((song) => (
     <SongList detail={song} key={song.id} setActiveSong={setActiveSong}/>
      ))
    }

  </ul>;
  {
    activeSong && <SongDetail key={activeSong.id} detail={activeSong} onClick={()=>setActiveSong(null)} />
  }
  </>
};

export default App;
```

SongList.jsx
```jsx
import React from 'react'
import { motion } from 'framer-motion'
const SongList = ({detail,setActiveSong}) => {
  return (
    <motion.li 
    layoutId={`div-${detail.id}`}
    className='bg-green-200 p-10  flex space-x-10 mx-auto items-center justify-between rounded-2xl w-full'>
        <motion.h2
        layoutId={`h2-${detail.id}`}
        >{detail.title}</motion.h2>
        <motion.h3
        layoutId={`h3-${detail.id}`}
        >{detail.artist}</motion.h3>
        <motion.p
        layoutId={`p-${detail.id}`}
        >
            <motion.span className='block' layoutId={`s-${detail.id}`}>
            {detail.desc}
              </motion.span>
            </motion.p>
          
        <button onClick={() => setActiveSong(detail)} className='bg-red-500 cursor-pointer p-2 rounded-2xl'>View Details</button>
      
    </motion.li>
  )
}

export default SongList
```

SongDetail.jsx
```jsx
import React from "react";
import { motion } from "framer-motion";
const SongDetail = ({ detail, onClick }) => {
  return (
    <motion.div  className="absolute inset-0 bg-amber-100 w-2/3 p-4  mx-auto h-full"
    layoutId={`div-${detail.id}`}
    >
        <div className="flex space-x-4">
        <motion.h2 className="text-3xl font-bold"
        layoutId={`h2-${detail.id}`}
        >{detail.title}</motion.h2>
        <motion.h3 className="text-xl"
        layoutId={`h3-${detail.id}`}
        >{detail.artist}</motion.h3>
 
                </div>
        <motion.p className="mt-4  "
        layoutId={`p-${detail.id}`}

        >
            <motion.span className="block mb-4" layoutId={`s-${detail.id}`}>
            {detail.desc
            }
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Repellendus culpa, itaque porro aliquam reiciendis ducimus pariatur, ut ad nam, tenetur mollitia commodi ab eligendi modi similique voluptate hic voluptatem? Quae!   Lorem ipsum dolor, sit amet consectetur adipisicing elit. Consequuntur, aliquam! Vero, sint, molestias praesentium dolorum minus cumque pariatur nihil impedit possimus adipisci sed alias, minima dignissimos neque. Illo, veritatis odit?
            Fugit tempora blanditiis harum adipisci modi eveniet assumenda mollitia quos commodi, tempore sit aperiam in. Dicta earum corporis facere repudiandae nam veritatis, dolores deserunt praesentium, quisquam, similique nostrum saepe consequatur!
            Dolore repudiandae ea, eligendi harum expedita in non libero sapiente nisi perferendis deserunt pariatur, sed iste excepturi distinctio ullam amet delectus minima quia quasi eaque. Dolore magnam sapiente repudiandae dolores?Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta qui, porro laboriosam blanditiis, similique corporis nihil quaerat deleniti voluptate itaque consectetur maiores debitis, minus atque sed explicabo iure aliquam veritatis!
            Veritatis tenetur, delectus rem, id ad distinctio tempore, sed in modi corporis quidem aut a reiciendis incidunt labore quasi laudantium consequuntur porro molestiae amet. Adipisci harum ipsam suscipit laudantium id.
            Voluptate eligendi culpa et totam molestiae ad optio, nobis magnam corrupti accusantium debitis laboriosam. Dolore consectetur laudantium facilis perspiciatis? Quod ea odio commodi nihil illum animi quisquam sunt non earum!
            Dolorem cumque eius, ipsa molestias nisi earum repellat voluptatum. Nulla illo excepturi dolor officia. Amet officia sequi iusto placeat repellendus aspernatur adipisci commodi fugit, doloremque nisi, ea nam similique optio?
            Architecto, voluptatum iure quod harum quasi autem sint maxime iusto in perferendis aliquid aperiam culpa itaque id eius, totam tempora veritatis? Laborum atque ipsum rem adipisci voluptatum omnis debitis. Voluptatibus!
            </motion.span></motion.p>

        <button onClick={onClick} className='mt-10 bg-red-500 cursor-pointer p-2 rounded-2xl'>Goback</button>
    </motion.div>
  );
};

export default SongDetail;
```
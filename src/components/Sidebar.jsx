import React from 'react'
import { AiFillHome } from "react-icons/ai";

const Sidebar = () => {
  return (
    <div className='p-5 bg-background-color w-[30%] color-title'>
      <p className='font-medium text-1xl '>Pelos&Plumas</p>
      <div className='flex items-center' >
      <AiFillHome size={40}/>
      <p className='font-medium'>Home</p>
      </div>
    </div>
  )
}

export default Sidebar
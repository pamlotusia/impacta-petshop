import React from 'react'
import Sidebar  from './Sidebar'
import Content from './Content'

const Dashboard = () => {
  return (
    <div className='flex justify-center'>
      <Sidebar/>
      <Content />
    </div>
  )
}

export default Dashboard
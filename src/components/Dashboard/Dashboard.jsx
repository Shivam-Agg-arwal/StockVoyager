import React from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'

const Dashboard = () => {
  return (
    <div className='flex flex-row w-full min-h-screen h-auto'>
        <Sidebar/>
        <Outlet/>
    </div>
  )
}

export default Dashboard
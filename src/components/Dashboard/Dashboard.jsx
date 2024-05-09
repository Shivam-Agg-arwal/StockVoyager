import React from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'
import NewsBar from './NewsBar/NewsBar'

const Dashboard = () => {
  return (
    <div className='flex flex-row w-full min-h-screen h-auto gap-5'>
        <Sidebar/>
        <Outlet/>
        <NewsBar/>
    </div>
  )
}

export default Dashboard
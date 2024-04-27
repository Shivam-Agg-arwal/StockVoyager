import React, { useState } from 'react'
import { MdDashboard } from "react-icons/md";
import { RiStockLine } from "react-icons/ri";
import { CiStopwatch } from "react-icons/ci";
import { MdOutlineSettings } from "react-icons/md";

import { useDispatch,useSelector } from 'react-redux'
import { useLocation, useNavigate} from 'react-router-dom'

const Sidebar = () => {
    const navigate=useNavigate();
    const location=useLocation();
  return (
    <div className='flex flex-col bg-richblack-800 relative w-[100px] min-h-screen h-auto justify-between'>
   
        <div>
            <div className={`${location.pathname==="/dashboard/profile" ? "text-blue" : "text-grey"} text-3xl cursor-pointer`} onClick={()=>{navigate('/dashboard/profile')}}>
                <MdDashboard/>
            </div>
            
            <div className={`${location.pathname==="/dashboard/portfolio" ? "text-blue" : "text-grey"} text-3xl cursor-pointer`} onClick={()=>{navigate('/dashboard/portfolio')}}>
                <RiStockLine/>
            </div>
            
            <div className={`${location.pathname==="/dashboard/watchlist" ? "text-blue" : "text-grey"} text-3xl cursor-pointer`} onClick={()=>{navigate('/dashboard/watchlist')}}>
                <CiStopwatch/>
            </div>
            
            <div className={`${location.pathname==="/dashboard/setting" ? "text-blue" : "text-grey"} text-3xl cursor-pointer`} onClick={()=>{navigate('/dashboard/setting')}}>
                <MdOutlineSettings/>
            </div>
        </div>

        <div className='text-black mb-20' onClick={()=>{}}>LOGOUT ICON</div>
    </div>
  )
}

export default Sidebar
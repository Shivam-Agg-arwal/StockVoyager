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
    <div className='flex flex-col bg-richblack-800 relative w-[100px] min-h-screen h-auto'>
   
        <div className={`${location.pathname==="/dashboard/profile" ? "text-blue" : "text-grey"} text-xl`}>
            <MdDashboard/>
        </div>
        
        <div className={`${location.pathname==="/dashboard/portfolio" ? "text-blue" : "text-grey"} text-xl`}>
            <RiStockLine/>
        </div>
        
        <div className={`${location.pathname==="/dashboard/watchlist" ? "text-blue" : "text-grey"} text-xl`}>
            <CiStopwatch/>
        </div>
        
        <div className={`${location.pathname==="/dashboard/setting" ? "text-blue" : "text-grey"} text-xl`}>
            <MdOutlineSettings/>
        </div>



    </div>
  )
}

export default Sidebar
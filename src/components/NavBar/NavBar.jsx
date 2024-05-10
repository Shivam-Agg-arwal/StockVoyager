import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../slices/profileSlice';
import logo from '../../assets/logo/StockVoyageNavbar.jpg'

function NavBar() {
  const {user}=useSelector((state)=>state.profile);
  return (
    <>
      <div className='flex justify-between px-3 md:px-6 py-1 md:py-2 border-b-[1px] border-b-grey gap-1'>
        <div className='flex justify-between  md:w-2/3'>
          <div className='flex justify-center items-center mr-2'>
            <img src={logo} width={200}/>
          </div>
          <div className=''>
            
            <form className="flex items-center max-w-sm mx-auto">   
                <label htmlFor="simple-search" className="sr-only">Search</label>
                <div className="relative w-full">
                    <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                        <svg className="w-2 h-2 md:w-4 md:h-4 text-grey dark:text-grey" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 20">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5v10M3 5a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm0 10a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm12 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm0 0V6a3 3 0 0 0-3-3H9m1.5-2-2 2 2 2"/>
                        </svg>
                    </div>
                    <input type="text" id="simple-search" className=" border border-black text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search branch name..." required />
                </div>
                <button type="submit" className="p-2.5 ms-2 text-sm font-medium text-white bg-theme rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                    </svg>
                    <span className="sr-only">Search</span>
                </button>
            </form>

          </div>
        </div>
        
        <div className='md:w-1/2 flex justify-center items-center md:justify-end'>
          <ul className="flex justify-end">
            <li className='flex gap-3 items-center justify-center'>
              <NavLink to="/dashboard/profile">
                <img src={user.image} alt="profile" width={40} className='rounded-full border-black border-[1px]' />
              </NavLink>
              <div className='hidden md:inline'>
                <div className='font-semibold'>{user.firstName}{" "}{user.lastName}</div>
                <div className='italic text-xs'>{user.emailID}</div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </>
  )
}

export default NavBar;

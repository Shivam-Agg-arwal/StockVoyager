import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../slices/profileSlice';

function NavBar() {
  const {user}=useSelector((state)=>state.profile);
  return (
    <>
      <div className='flex justify-between'>
        <div className='flex justify-between w-1/2 '>
          <div>LOGO</div>
          <div>Here is a search bar</div>
        </div>
        <div className='w-1/2'>
          <ul className="flex justify-evenly">
            <li>
              <NavLink to="/aboutme">
                <img src={user.image} alt="profile" width={30} className='rounded-full' />
              </NavLink>
              <div>{user.firstName}{" "}{user.lastName}</div>
              <div>{user.emailID}</div>
            </li>
          </ul>
        </div>
      </div>
    </>
  )
}

export default NavBar;

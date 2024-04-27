import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../slices/profileSlice';

function NavBar() {
  const dispatch = useDispatch();
  const userData = useSelector(state => state.profile.user);

  useEffect(() => {
    // Simulating fetching user data from localStorage
    const user = localStorage.getItem('user');
    if (user) {
      dispatch(setUser(JSON.parse(user)));
    }
  }, [dispatch]);

  return (
    <>
      <div className='flex justify-between'>
        <div className='flex justify-center w-1/2'>
          <div>LOGO</div>
          <div>Here is a search bar</div>
        </div>
        <div className='w-1/2'>
          <ul className="flex justify-evenly">
            <li>
              <NavLink to="/aboutme">
                <img src={`${userData ? userData.image : ''}`} alt="profile" />
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </>
  )
}

export default NavBar;

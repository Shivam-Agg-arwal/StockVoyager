import {React, useState, useEffect} from 'react';
import { Link, NavLink } from 'react-router-dom'

function NavBar() {

    const [userData, setUserData] = useState(null);

  useEffect(() => {
    // Fetch user data from backend API
    const fetchUserData = async () => {
      try {
        const response = await fetch('/api/user'); // Replace '/api/user' with your backend API endpoint
        const data = await response.json();
        setUserData(data); // Assuming the response contains user data with a field 'image' for the profile image URL
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);


  return (
    <>
        <div className='flex justify-between'>
            <div className='flex justify-center w-1/2'>
                Here is a search bar
            </div>
            <div className='w-1/2'>
                <ul className="flex justify-evenly">
                    <li>
                        <NavLink to="/"> Home </NavLink>
                    </li>
                    <li>
                        <NavLink to="/dashboard"> DashBoard </NavLink>
                    </li> 
                    <li>
                        <NavLink to="/aboutme"> 
                            <img src={`${userData.image}`} alt="profile" />
                        </NavLink>
                    </li>                
                </ul>
            </div>
        </div>
    </>
  )
}

export default NavBar
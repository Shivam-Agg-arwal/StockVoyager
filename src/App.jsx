import {React, useState, useEffect} from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/authentication/Login';
import Signup from './components/authentication/Signup';
import ForgotPassword from './components/authentication/ForgotPassword';
import ResetSuccess from './components/authentication/ResetSuccess';
import VerifyEmail from './components/authentication/VerifyEmail';
import NavBar from './components/NavBar/NavBar';
import Dashboard from './components/Dashboard/Dashboard';
import AboutMe from './components/AboutMe/AboutMe';

export default function App() {

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
    <Router>
      <div>
        {userData && <NavBar />}
        <Routes>
          <Route path='/' element={<Signup/>}/>
          <Route path="/login" element={<Login />} />
          <Route path="/forgotpassword" element={<ForgotPassword />} />
          <Route path="/resetsuccess" element={<ResetSuccess />} />
          <Route path="/verifyotp" element={<VerifyEmail />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/aboutme" element={<AboutMe />} />
        </Routes>
      </div>
    </Router>
  );
}

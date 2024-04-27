import {React, useState, useEffect} from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/authentication/Login';
import Signup from './components/authentication/Signup';
import ForgotPassword from './components/authentication/ForgotPassword';
import ResetSuccess from './components/authentication/ResetSuccess';
import VerifyEmail from './components/authentication/VerifyEmail';
import NavBar from './components/NavBar/NavBar';
import Dashboard from './components/Dashboard/Dashboard';
import ProfileTab from './components/Dashboard/ProfileTab';
import Portfolio from './components/Dashboard/Portfolio';
import WatchList from './components/Dashboard/WatchList';
import Settings from './components/Dashboard/Settings';

export default function App() {

  const [userData, setUserData] = useState(null);

  useEffect(() => {
    // Fetch user data from backend API
    const fetchUserData = async () => {
      try {
        const response = await fetch('/api/user'); // Replace '/api/user' with your backend API endpoint
        const data = await response.json();
        setUserData(data); 
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  return (
      <Router>
        <Routes>
          {userData && <NavBar />}
          <Route path='/' element={<Signup/>}/>
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgotpassword" element={<ForgotPassword />} />
          <Route path="/resetsuccess" element={<ResetSuccess />} />
          <Route path="/verifyotp" element={<VerifyEmail />} />
          <Route path="/login" element={<Login />} />

          <Route element={
				  		<Dashboard />
				  }>
				  	<Route path="/dashboard/profile" element={<ProfileTab />} />
				  	<Route path="/dashboard/portfolio" element={<Portfolio />} />
				  	<Route path="/dashboard/watchlist" element={<WatchList />} />
				  	<Route path="/dashboard/setting" element={<Settings />} />

				  </Route>
        </Routes>
      </Router>
  );
}

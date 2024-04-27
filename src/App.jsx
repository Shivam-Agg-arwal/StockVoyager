import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from './components/slices/profileSlice';
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
import NotFound from './components/Pages.jsx/NotFound';

export default function App() {
  const {user}=useSelector((state)=>state.profile);
  return (
    <div>
      {user && <NavBar/>}
      <Routes>
        <Route path='/' element={<Signup />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route path="/resetsuccess" element={<ResetSuccess />} />
        <Route path="/verifyotp" element={<VerifyEmail />} />
        <Route path="/login" element={<Login />} />

        {
          user && 
        <Route element={<Dashboard />}>
          <Route path="/dashboard/profile" element={<ProfileTab />} />
          <Route path="/dashboard/portfolio" element={<Portfolio />} />
          <Route path="/dashboard/watchlist" element={<WatchList />} />
          <Route path="/dashboard/setting" element={<Settings />} />
        </Route>
        }

        <Route path='*' element={<NotFound/>}/>
      </Routes>
    </div>
  );
}

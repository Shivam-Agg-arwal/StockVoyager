import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/authentication/Login';
import Signup from './components/authentication/Signup';
import ForgotPassword from './components/authentication/ForgotPassword';
import ResetSuccess from './components/authentication/ResetSuccess';
import VerifyEmail from './components/authentication/VerifyEmail';

export default function App() {
  return (
    // <Router>
      <Routes>
        <Route path='/' element={<Signup/>}/>
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route path="/resetsuccess" element={<ResetSuccess />} />
        <Route path="/verifyotp" element={<VerifyEmail />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    // </Router>
  );
}

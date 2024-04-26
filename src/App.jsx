import React from 'react';
import {Login} from './components/authentication/Login';
import Signup from './components/authentication/Signup.jsx'
import ForgotPassword from './components/authentication/ForgotPassword.jsx'
import ResetSuccess from './components/authentication/ResetSuccess.jsx'
import VerifyEmail from './components/authentication/VerifyEmail.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const router = createBrowserRouter([
  {
    path: '/signup',
    element: <Signup />
  },
  {
    path: '/forgotpassword',
    element: <ForgotPassword />
  },
  {
    path: '/resetsuccess',
    element: <ResetSuccess />
  },
  {
    path: '/verifyotp',
    element: <VerifyEmail />
  },
  {
    path: '/login',
    element: <Login />
  },
])

export default function App() {
  return (
    <>
      <RouterProvider router = {router}/>
    </>
  )
}
import React from 'react';
import {Login} from './components/Login';
import Layout from './Layout.jsx'
import Signup from './components/Signup.jsx'
import ForgotPassword from './components/ForgotPassword.jsx'
import ResetSuccess from './components/ResetSuccess.jsx'
import VerifyEmail from './components/VerifyEmail.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const router = createBrowserRouter([
  {
    path: '/login',
    element: <Layout />
  },
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
  }
])

export default function App() {
  return (
    <>
      <RouterProvider router = {router}/>
    </>
  )
}
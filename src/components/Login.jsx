import React from 'react'
import { useState } from 'react'
import { FaFacebook } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc";

export const Login = () => {
  return (
    <>
      <div className='flex justify-center items-center flex-grow md:w-screen md:h-screen'>
          <div>

           <div className='flex flex-col-reverse pt-20 pb-5 justify-center items-center md:flex-row md:px-10 md:py-7 '>

              {/* From here left part starts */}
              <div className='px-6 md:px-12 lg:px-24 md:w-1/2'>
                <div className='pb-9'>
                  <h1 className='text-3xl'>Sign in to <span className='font-medium'>StockNet</span></h1>
                  <p className='opacity-30'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt?s</p>
                </div>
                <div>
                  <form action="get">
                    <div>
                      <div className='flex flex-col mb-5' >
                        <label htmlFor="username" className='text-xs opacity-30'>Username</label>
                        <input type="text" id='username' className='border-solid border-b-2 outline-none'/>
                      </div>

                      <div className='flex flex-col mb-3'>
                        <label htmlFor="password" className='text-xs opacity-30'>Password</label>
                        <input type="text" id='password' className='border-solid border-b-2 outline-none'/>
                      </div>
                    </div>

                    <div className='flex justify-between items-center'>
                      <div className='flex items-center'>
                        <input type="checkbox" id='rememberme' className='mr-2 size-4'/>
                        <label htmlFor="rememberme" className='text-sm'>Remember Me</label>
                      </div>

                      <p className='underline hover:no-underline text-sm'><a href="#">Forgot Password</a></p>
                    </div>

                    <button className='w-full h-14 my-8 bg-theme text-white rounded-md'>Log In</button>

                  </form>
                </div>

                <div>
                  <p className='text-theme'>or sign in with</p>
                  <div className='w-1/2 flex flex-col justify-start'>
                    <div className='flex justify-start mt-2 gap-2'>
                    <a href="#"><FaFacebook className='text-4xl'/></a>
                    <a href="#"><FaSquareXTwitter className='text-4xl'/></a>
                    <a href="#"><FcGoogle className='text-4xl'/></a>
                    </div>
                  </div>
                </div>
              </div>

              {/* From here right image starts */}
              <div className='size-64 lg:size-96 flex justify-center items-center'>
                <img src="https://preview.colorlib.com/theme/bootstrap/login-form-08/images/undraw_file_sync_ot38.svg" alt="" />
              </div>
            </div>
          </div>
        </div>
      </>
  )
}


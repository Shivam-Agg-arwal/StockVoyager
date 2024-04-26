import React from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import {authenticationEndpoints} from '../../api/api'

function Signup() {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const{
    SENDOTP_API
  }=authenticationEndpoints;

  const onSubmit = async (data) => {
    console.log(SENDOTP_API);
    console.log(data);
    const formData=new FormData();
    formData.append('email',data.email);
    const response=await axios.post(SENDOTP_API,formData);
    console.log(response);
    

  };

  return (
    <>
      <div className='flex justify-center items-center md:w-screen md:h-screen'>
        <div className='flex items-center justify-center bg-light rounded-md w-1/2 h-full'>
          <form onSubmit={handleSubmit(onSubmit)} className='flex items-center justify-center w-full h-1/2 px-5'>
            <div>
              <div className='flex gap-4'>
                <div className='flex flex-col text-md'>
                  <label htmlFor="first" className='text-black mb-3'>First Name</label>
                  <input type="text" placeholder='Enter first name' className='px-2 outline-none h-12 rounded-md mb-4' id='first' {...register('firstName', { required: true })} />
                  {errors.firstName && <p className='text-[#cc0000] text-sm'>First name is required.</p>}
                </div>
                <div className='flex flex-col text-md'>
                  <label htmlFor="last" className='text-black mb-3'>Last Name</label>
                  <input type="text" placeholder='Enter last name' className='px-2 outline-none h-12 rounded-md mb-4' id='last' {...register('lastName', { required: true })} />
                  {errors.lastName && <p className='text-[#cc0000] text-sm'>Last name is required.</p>}
                </div>
              </div>

              <div className='flex flex-col text-md'>
                <label htmlFor="email" className='text-black mb-3'>Email Address</label>
                <input type="email" placeholder='Enter your email' className='px-2 outline-none h-12 rounded-md mb-4' id='email' {...register('email', { required: true })} />
                {errors.email && <p className='text-[#cc0000] text-sm'>Email is required.</p>}
              </div>

              <div className='flex gap-4'>
                <div className='flex flex-col text-md'>
                  <label htmlFor="password" className='text-black mb-3'>Password</label>
                  <input type="password" placeholder='Enter password' className='px-2 outline-none h-12 rounded-md mb-4' id='password' {...register('password', { required: true })} />
                  {errors.password && <p className='text-[#cc0000] text-sm'>Password is required.</p>}
                </div>
                <div className='flex flex-col text-md '>
                  <label htmlFor="confirm-pass" className='text-black mb-3'>Confirm Password</label>
                  <input type="password" placeholder='Confirm password' className='px-2 outline-none h-12 rounded-md mb-4' id='confirm-pass' {...register('confirmPassword', { required: true })} />
                  {errors.confirmPassword && <p className='text-[#cc0000] text-sm'>Confirm password is required.</p>}
                </div>
              </div>
              <div>
                <button type="submit" className='w-full h-14 my-8 bg-theme text-light rounded-md'>Create Account</button>
              </div>
            </div>
          </form>
        </div>
        <div className='w-1/2'></div>
      </div>
    </>
  );
}

export default Signup;

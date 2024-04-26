import React from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import axios from 'axios'; // Import Axios
import { FaFacebook } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc";

export const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(`${process.env.BASE_URL}/auth/login`, {
        email: data.username, // Assuming you're using 'username' field for email
        password: data.password
      });

      // If login is successful, redirect to dashboard or handle accordingly
      console.log('Login successful');
      console.log('User:', response.data.user);
      console.log('Token:', response.data.token);
      // Redirect to dashboard or any other page
    } catch (error) {
      // If there's an error, display the error message
      console.error('Login failed:', error.response.data.message);
    }
  };

  return (
    <div className='flex justify-center items-center flex-grow md:w-screen md:h-screen'>
      <div>
        <div className='flex flex-col-reverse pt-20 pb-5 justify-center items-center md:flex-row md:px-10 md:py-7'>
          <div className='px-6 md:px-12 lg:px-24 md:w-1/2'>
            <div className='pb-9'>
              <h1 className='text-3xl'>Sign in to <span className='font-medium'>StockNet</span></h1>
              <p className='opacity-30'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt?s</p>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className='flex flex-col mb-5'>
                <label htmlFor="username" className='text-xs opacity-30'>Username</label>
                <input
                  type="text"
                  id='username'
                  className='border-solid border-b-2 outline-none'
                  {...register('username', { required: true })}
                />
                {errors.username && <p className='text-[#cc0000] text-sm'>Username is required.</p>}
              </div>
              <div className='flex flex-col mb-3'>
                <label htmlFor="password" className='text-xs opacity-30'>Password</label>
                <input
                  type="password"
                  id='password'
                  className='border-solid border-b-2 outline-none'
                  {...register('password', { required: true })}
                />
                {errors.password && <p className='text-[#cc0000] text-sm'>Password is required.</p>}
              </div>
              <div className='flex justify-between items-center'>
                <div className='flex items-center'>
                  <input
                    type="checkbox"
                    id='rememberme'
                    className='mr-2 size-4'
                    {...register('rememberMe')}
                  />
                  <label htmlFor="rememberme" className='text-sm'>Remember Me</label>
                </div>
                <p className='underline hover:no-underline text-sm'><Link to="#">Forgot Password</Link></p>
              </div>
              <button type="submit" className='w-full h-14 my-8 bg-theme text-white rounded-md'>Log In</button>
            </form>
            <div>
              <p className='text-theme'>or sign in with</p>
              <div className='w-1/2 flex flex-col justify-start'>
                <div className='flex justify-start mt-2 gap-2'>
                  <Link to="#"><FaFacebook className='text-4xl'/></Link>
                  <Link to="#"><FaSquareXTwitter className='text-4xl'/></Link>
                  <Link to="#"><FcGoogle className='text-4xl'/></Link>
                </div>
              </div>
            </div>
          </div>
          <div className='size-64 lg:size-96 flex justify-center items-center'>
            <img src="https://preview.colorlib.com/theme/bootstrap/login-form-08/images/undraw_file_sync_ot38.svg" alt="" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

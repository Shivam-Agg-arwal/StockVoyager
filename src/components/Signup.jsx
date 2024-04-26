import React from 'react'

function Signup() {
  return (
    <> 
       <div className='flex justify-center items-center md:w-screen md:h-screen'>
          <div className='flex items-center justify-center bg-light rounded-md w-1/2 h-full'>
            <form action="get" className='flex items-center justify-center w-full h-1/2 px-5'>
                <div>
                    <div className='flex gap-4'>
                        <div className='flex flex-col text-md'>
                            <label htmlFor="first" className='text-black mb-3'>First Name</label>
                            <input type="text" placeholder='Enter first name' className='px-2 outline-none h-12 rounded-md mb-4' id='first'/>
                        </div>
                        <div className='flex flex-col text-md'>
                            <label htmlFor="last" className='text-black mb-3'>Last Name</label>
                            <input type="text" placeholder='Enter last name' className='px-2 outline-none h-12 rounded-md mb-4' id='last'/>
                        </div>
                    </div>

                    <div className='flex flex-col text-md'>
                        <label htmlFor="email" className='text-black mb-3'>Email Address</label>
                        <input type="email" placeholder='Enter your email' className='px-2 outline-none h-12 rounded-md mb-4' id='email'/>
                    </div>

                    <div className='flex gap-4'>
                        <div className='flex flex-col text-md'>
                            <label htmlFor="password" className='text-black mb-3'>Password</label>
                            <input type="password" placeholder='Enter password' className='px-2 outline-none h-12 rounded-md mb-4' id='password'/>
                        </div>
                        <div className='flex flex-col text-md '>
                            <label htmlFor="confirm-pass" className='text-black mb-3'>Confirm Password</label>
                            <input type="password" placeholder='Confirm password' className='px-2 outline-none h-12 rounded-md mb-4' id='confirm-pass'/>
                        </div>
                    </div>
                    <div>
                        <button className='w-full h-14 my-8 bg-theme text-light rounded-md'>Create Account</button>
                    </div>
                </div>
            </form>
          </div>
          <div className='w-1/2'></div>
        </div>
    </>
  )
}

export default Signup
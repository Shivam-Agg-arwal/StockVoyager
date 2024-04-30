import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { IoEyeOff, IoEye } from "react-icons/io5";
import axios from 'axios';
import { updationEndpoints } from '../../../api/api';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';

const ChangePassword = () => {
  const { register, handleSubmit,reset, formState: { errors } } = useForm();
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const {token}=useSelector((state)=>state.auth);

  const {UPDATE_PASSWORD_API}=updationEndpoints;
  const onSubmit =async (data) => {
    // Handle form submission, e.g., send data to backend
    console.log(data);
    const loadingToast=toast.loading('Updating Password...');
    try {
			// console.log(data);
			const formData = new FormData();
			formData.append('newPassword', data.newPassword);
			formData.append('oldPassword', data.currentPassword);
			formData.append('token', token);

			const response=await axios.post(UPDATE_PASSWORD_API,formData);
			console.log(response);
			if(response.data.success){
				toast.success('Password was updated successfully');
        reset();
			}
		} catch (error) {
			toast.error('Updation failed');
			
		}
    toast.dismiss(loadingToast);
  };

  return (
    <div>
      <h2 className="text-3xl mb-5 underline">Change Password</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="flex gap-3">
        <div>
          <label htmlFor="currentPassword" className="text-lg">Current Password</label>
          <div className="password-container">
            <input
              type={showCurrentPassword ? "text" : "password"}
              id="currentPassword"
              {...register('currentPassword', { required: true })}
              className="border border-black rounded-lg"
            />
            <button
              type="button"
              onClick={() => setShowCurrentPassword(!showCurrentPassword)}
              className="password-toggle"
            >
              {showCurrentPassword ? <IoEyeOff /> : <IoEye />}
            </button>
          </div>
          {errors.currentPassword && <span>This field is required</span>}
        </div>
        <div>
          <label htmlFor="newPassword" className="text-lg">New Password</label>
          <div className="password-container">
            <input
              type={showNewPassword ? "text" : "password"}
              id="newPassword"
              {...register('newPassword', { required: true })}
              className="border border-black rounded-lg"
            />
            <button
              type="button"
              onClick={() => setShowNewPassword(!showNewPassword)}
              className="password-toggle"
            >
              {showNewPassword ? <IoEyeOff /> : <IoEye />}
            </button>
          </div>
          {errors.newPassword && <span>This field is required</span>}
        </div>
        <button type="submit" className="cursor-pointer w-fit h-fit p-2  bg-btnyellow  rounded-md font-bold hover:scale-95">Submit</button>
      </form>
    </div>
  );
};

export default ChangePassword;

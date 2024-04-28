import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { IoEyeOff, IoEye } from "react-icons/io5";
import './../../../index.css'

const ChangePassword = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  const onSubmit = (data) => {
    // Handle form submission, e.g., send data to backend
    console.log(data);
  };

  return (
    <div>
      <h2>Change Password</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="currentPassword">Current Password</label>
          <div className="password-container">
            <input
              type={showCurrentPassword ? "text" : "password"}
              id="currentPassword"
              {...register('currentPassword', { required: true })}
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
          <label htmlFor="newPassword">New Password</label>
          <div className="password-container">
            <input
              type={showNewPassword ? "text" : "password"}
              id="newPassword"
              {...register('newPassword', { required: true })}
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
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default ChangePassword;

import React from 'react';
import { useForm } from 'react-hook-form';

const UpdateDetails = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    // Handle form submission, e.g., send data to backend
    console.log(data);
  };

  return (
    <div>
      <h2>Update Details</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="firstName">First Name</label>
          <input type="text" id="firstName" {...register('firstName', { required: true })} />
          {errors.firstName && <span>This field is required</span>}
        </div>
        <div>
          <label htmlFor="lastName">Last Name</label>
          <input type="text" id="lastName" {...register('lastName', { required: true })} />
          {errors.lastName && <span>This field is required</span>}
        </div>
        <div>
          <label htmlFor="phoneNumber">Phone Number</label>
          <input type="text" id="phoneNumber" {...register('phoneNumber', { required: true })} />
          {errors.phoneNumber && <span>This field is required</span>}
        </div>
        <div>
          <label htmlFor="gender">Gender</label>
          <select id="gender" {...register('gender', { required: true })}>
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
          {errors.gender && <span>This field is required</span>}
        </div>
        <div>
          <label htmlFor="about">About</label>
          <textarea id="about" {...register('about')} />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default UpdateDetails;

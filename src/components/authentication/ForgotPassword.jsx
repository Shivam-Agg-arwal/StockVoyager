import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import { authenticationEndpoints } from '../../api/api'

const ForgotPassword = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [emailSent, setEmailSent] = useState(false);
    const navigate = useNavigate();
    const {
        RESETPASSTOKEN_API,
        RESETPASSWORD_API
    } = authenticationEndpoints

    const submitHandler = async (data) => {
        try {
            // Call API to generate the reset token and send the email to the user
            console.log('Email:', data.email);
            const tokenResponse = await axios.post(RESETPASSTOKEN_API, { email: data.email });
            console.log('here')
            if (tokenResponse.status === 200 && tokenResponse.data.success) {
                // If the token reset is successful, proceed to update password
                const passwordResponse = await axios.post(RESETPASSWORD_API, {
                    password: data.password,
                    confirmPassword: data.confirmPassword,
                    token: tokenResponse.data.token
                });

                if (passwordResponse.status === 200 && passwordResponse.data.success) {
                    // If the password update is successful, set emailSent state to true
                    setEmailSent(true);
                } else {
                    // Handle password update error
                    console.log('Password Update Error:', passwordResponse.data.message);
                }
            } else {
                // Handle token reset error
                console.log('Token Reset Error:', tokenResponse.data.message);
            }
        } catch (error) {
            console.log('Error:', error);
        }
    };

    const resendEmail = async () => {
        try {
            // Call API to resend the email
            const response = await axios.post(RESETPASSTOKEN_API, { email: register.email });
            
            if (response.status === 200 && response.data.success) {
                console.log('Resend Email Success:', response.data.message);
                // Handle success, you might want to show a success message or perform other actions
            } else {
                console.log('Resend Email Error:', response.data.message);
                // Handle error, you might want to show an error message or perform other actions
            }
        } catch (error) {
            console.log('Error:', error);
            // Handle error, you might want to show an error message or perform other actions
        }
    };

    return (
        <div>
            <div>
                <h2>
                    {!emailSent ? "Reset Your Password" : "Check Email"}
                </h2>
                <p>
                    {!emailSent
                        ? "Have no fear. We’ll email you instructions to reset your password. If you don't have access to your email, we can try account recovery."
                        : `We have sent the reset email to ${register.email}`}
                </p>
            </div>

            <div>
                {!emailSent ? (
                    <form onSubmit={handleSubmit(submitHandler)}>
                        <label htmlFor="email">Email Address <sup className='text-pink-300'>*</sup></label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            {...register("email", { required: true })}
                            placeholder="Enter your email address"
                        />
                        {errors.email && <span className="text-red-500">Email is required</span>}
                        <label htmlFor="password">Password <sup className='text-pink-300'>*</sup></label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            {...register("password", { required: true })}
                            placeholder="Enter your password"
                        />
                        {errors.password && <span className="text-red-500">Password is required</span>}
                        <label htmlFor="confirmPassword">Confirm Password <sup className='text-pink-300'>*</sup></label>
                        <input
                            type="password"
                            id="confirmPassword"
                            name="confirmPassword"
                            {...register("confirmPassword", { required: true })}
                            placeholder="Confirm your password"
                        />
                        {errors.confirmPassword && <span className="text-red-500">Please confirm your password</span>}
                        <button type="submit" className="text-black bg-yellow-50 py-3 w-full font-bold rounded-lg mt-6">Reset Your Password</button>
                    </form>
                ) : (
                    <div onClick={() => { navigate('/login') }}>
                        <button onClick={resendEmail}>Resend Email</button>
                    </div>
                )}
            </div>
            <div onClick={() => { navigate('/login') }}>
                Back to login
            </div>
        </div>
    );
};

export default ForgotPassword;

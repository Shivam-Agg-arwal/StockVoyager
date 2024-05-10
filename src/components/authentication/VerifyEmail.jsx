import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import OtpInput from "react-otp-input";
import toast, { Toaster } from "react-hot-toast";
import { useSelector } from "react-redux";
import { authenticationEndpoints } from '../../api/api'
import axios from "axios";


const VerifyEmail = () => {
    const navigate = useNavigate();
    const [otp, setOtp] = useState('');
    const { signupData } = useSelector((state) => state.auth);

    const {
        SIGNUP_API, SENDOTP_API
    } = authenticationEndpoints;



    const handleSubmit = async () => {
        // Handle submission of OTP
        try {
            const formData = new FormData();
            formData.append('email', signupData.email);
            formData.append('firstName', signupData.firstName);
            formData.append('lastName', signupData.lastName);
            formData.append('password', signupData.password);
            formData.append('confirmPassword', signupData.confirmPassword);
            formData.append('otp', otp);
            console.log(...formData);
            const response = await axios.post(SIGNUP_API, formData);
            if (response.data.success) {
                navigate('/login');
                toast.success(response.data.toastMessage);
            }
        }
        catch (error) {
            if (error.response && error.response.data && error.response.data.toastMessage) {
                toast.error(error.response.data.toastMessage);
            } else {
                toast.error("Signup failed");
            }
        }
    };

    const handleResendOTP = async () => {
        try {
            const { email } = signupData; // Assuming signupData is accessible here
            const response = await axios.post(SENDOTP_API, { email });
            if (response.data.success) {
                toast.success('OTP resent successfully');
            } else {
                toast.error('Failed to resend OTP');
            }
        } catch (error) {
            console.error('Error occurred while resending OTP:', error);
            toast.error('Failed to resend OTP');
        }
    };


    return (
        <div className="flex items-center justify-center h-screen w-full">
            <div className="flex flex-col border-2 border-black p-5 gap-2">
                <div className="flex flex-col gap-2">
                    <h2 className="text-4xl underline text-center font-medium">Verify Email</h2>
                    <p className="text-2xl font-medium">
                        The verification code has been sent to you. Enter the code below
                    </p>
                </div>

                <div className="text-lg">
                    <OtpInput
                        value={otp}
                        onChange={setOtp}
                        numInputs={6}
                        renderSeparator={<span> <pre>  </pre></span>}
                        renderInput={(props) => <input {...props} className="border rounded-sm" />}

                        id="otpstyle"
                    />
                </div>

                <div className="p-1">
                    <button onClick={handleSubmit} className="cursor-pointer w-fit h-fit p-2 bg-theme rounded-md hover:bg-grey">Verify</button>
                </div>

                <div>
                    <p>Didn't receive the OTP? <button onClick={handleResendOTP}><span className="font-bold underline hover:text-theme">Resend OTP</span></button></p>
                </div>
            </div>
        </div>
    );
};

export default VerifyEmail;

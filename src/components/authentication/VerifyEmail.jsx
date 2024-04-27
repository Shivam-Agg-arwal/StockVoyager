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
    const {signupData}=useSelector((state)=>state.auth);

    const {
        SIGNUP_API
      } = authenticationEndpoints;
    


    const handleSubmit =async () => {
        // Handle submission of OTP
        console.log("signupData",signupData);
        const formData = new FormData();
        formData.append('email', signupData.email);
        formData.append('firstName', signupData.firstName);
        formData.append('lastName', signupData.lastName);
        formData.append('password', signupData.password);
        formData.append('confirmPassword', signupData.confirmPassword);
        formData.append('otp', otp);
        console.log(...formData);
        const response = await axios.post(SIGNUP_API, formData);
        if(response.data.success){
            navigate('/login');
            toast.success('SignUp was successfull');
        }
        else{
            toast.error('SignUp Failed');
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
        <div>
            <div>
                <h2>Verify Email</h2>
                <p>
                    Enter the OTP sent to your email address to verify.
                </p>
            </div>

            <div>
                <OtpInput
						value={otp}
						onChange={setOtp}
						numInputs={6}
						renderSeparator={<span> <pre>  </pre></span>}
						renderInput={(props) => <input {...props} />}
                        id="otpstyle"
					/>
            </div>

            <div>
                <button onClick={handleSubmit}>Verify</button>
            </div>

            <div>
                <p>Didn't receive the OTP? <button onClick={handleResendOTP}>Resend OTP</button></p>
            </div>
        </div>
    );
};

export default VerifyEmail;

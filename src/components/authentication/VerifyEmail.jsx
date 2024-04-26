import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import OtpInput from "react-otp-input";
import { Toaster } from "react-hot-toast";
import { useSelector } from "react-redux";

const VerifyEmail = () => {
    const navigate = useNavigate();
    const [otp, setOtp] = useState('');
    const {signupData}=useSelector((state)=>state.auth);

    const handleChange = (otp) => {
        setOtp(otp);
    };

    const handleSubmit = () => {
        // Handle submission of OTP
        if (otp.length === 6) {
            // Perform verification logic here
            console.log("OTP submitted:", otp);
        } else {
            console.error("Invalid OTP length");
        }
        console.log(signupData)
    };

    const handleResendOTP = () => {
        // Handle resending OTP
        // Logic to resend OTP
        console.log("Resending OTP...");
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

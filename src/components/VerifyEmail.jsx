import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import OTPInput from "react-otp-input";
import { Toaster } from "react-hot-toast";

const VerifyEmail = () => {
    const navigate = useNavigate();
    const [otp, setOtp] = useState('');
    const [resendCount, setResendCount] = useState(0);

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
    };

    const handleResendOTP = () => {
        // Handle resending OTP
        setResendCount(resendCount + 1);
        // Logic to resend OTP
        console.log("Resending OTP...");
    };

    const renderInput = (index, value, onChange) => {
        return (
            <input
                key={index}
                type="text"
                defaultValue={value}
                readOnly
            />
        );
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
                <OTPInput
                    value={otp}
                    onChange={handleChange}
                    numInputs={6} // Assuming OTP length is 6 digits
                    separator={<span>-</span>} // Example separator
                    inputStyle="inputStyle"
                    renderInput={renderInput} // Pass the custom renderInput function
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

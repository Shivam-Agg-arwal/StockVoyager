import React, { useState } from "react";
import { useNavigate } from "react-router-dom";


const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [emailSent, setEmailSent] = useState(false);
    const navigate=useNavigate();

    const submitHandler = (e) => {
        e.preventDefault();
        // Call API to generate the reset token and send the email to the user
        // If the response is positive then change the setEmailSent to true
        console.log('API integration pending...');
        // For demonstration purposes, let's assume the email has been sent successfully
        setEmailSent(true);
    };

    const resendEmail = () => {
        // Implement resend email functionality here
        console.log('Resending email....');
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
                        : `We have sent the reset email to ${email}`}
                </p>
            </div>

            <div>
                {!emailSent ? (
                    <form onSubmit={submitHandler}>
                        <label htmlFor="email">Email Address <sup className='text-pink-300'>*</sup></label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email address"
                            required
                        />
                        <button type="submit" className="text-black bg-yellow-50 py-3 w-full font-bold rounded-lg mt-6">Reset Your Password</button>
                    </form>
                ) : (
                    <div onClick={()=>{navigate('/login')}}>
                        <button onClick={resendEmail}>Resend Email</button>
                    </div>
                )}
            </div>
            <div>
                Back to login
            </div>
        </div>
    );
};

export default ForgotPassword;

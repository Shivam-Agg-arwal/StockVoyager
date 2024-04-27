import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { authenticationEndpoints } from "../../api/api";
import axios from "axios";

const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [emailSent, setEmailSent] = useState(false);
    const navigate=useNavigate();

    const {RESETPASSTOKEN_API}=authenticationEndpoints;

    const submitHandler = async(e) => {
        e.preventDefault();
        sendMail();        
    };

    const sendMail = async() => {
        // Implement resend email functionality here
        try {
			const formData = new FormData();
			formData.append('email',email);
            console.log(RESETPASSTOKEN_API);
            const loadingToast=toast.loading('Sending Mail...');
			const response=await axios.post(RESETPASSTOKEN_API,formData);
            console.log(response);
			if(response.data.success){
				toast.success('Mail Sent Suuccessfully');
			}
            else{
                toast.error('Reset Email Sending Failed : ');
            }
            toast.dismiss(loadingToast);

		} catch (error) {
			toast.error('Reset Email Sending Failed');
		}
        setEmailSent(true);
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
                    <div>
                        <button onClick={()=>{sendMail()}}>Resend Email</button>
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
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
        <div className="flex flex-col h-screen w-full justify-center items-center gap-8 text-center">
            <div>
                <h2 className="text-center text-3xl underline">
                    {!emailSent ? "Reset Your Password" : "Check Email"}
                </h2>
                <p className="text-lg">
                    {!emailSent
                        ? "Have no fear. We’ll email you instructions to reset your password. If you don't have access to your email, we can try account recovery."
                        : `We have sent the reset email to ${email}`}
                </p>
            </div>

            <div>
                {!emailSent ? (
                    <form onSubmit={submitHandler}>
                        <div className="flex gap-3">
                            <label className="font-bold text-lg " htmlFor="email">Email Address<sup>*</sup></label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter your email address"
                                required
                                className="border border-black rounded-md"
                            />
                        </div>
                        <button type="submit" className="text-black bg-yellow-50 py-3 w-full font-bold rounded-lg">Reset Your Password</button>
                    </form>
                ) : (
                    <div>
                        <button className="cursor-pointer w-fit h-fit p-2 bg-theme rounded-md hover:bg-grey" onClick={()=>{sendMail()}}>Resend Email</button>
                    </div>
                )}
            </div>
            <div className="cursor-pointer w-fit h-fit p-2 bg-theme rounded-md hover:bg-grey">
                Back to login
            </div>
        </div>
    );
};

export default ForgotPassword;
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";

const ResetSuccess = () => {
    const navigate=useNavigate();

    
    return (
        <div>
            <div>
                <h2>
                    Reset Complete!
                </h2>
                <p>
                    All done . Your password has been successfully reset
                </p>
            </div>

            <div>
                <div onClick={()=>{navigate('/login')}}>
                    <button>Return to login</button>
                </div>
            </div>
            <div>
                Back to login
            </div>
        </div>
    );
};

export default ResetSuccess;

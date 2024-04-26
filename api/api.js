require("dotenv").config();


export const authenticationEndpoints={
    LOGIN_API:process.env.BASE_URL+"/auth/login",
    SENDOTP_API:process.env.BASE_URL+"/auth/sendOTP",
    SIGNUP_API:process.env.BASE_URL+"/auth/signUp",
    RESETPASSWORD_API:process.env.BASE_URL+"/auth/resetPassword",
    RESETPASSTOKEN_API:process.env.BASE_URL+"/auth/resetPasswordToken",
}

//sab post type ki hai ye sari 




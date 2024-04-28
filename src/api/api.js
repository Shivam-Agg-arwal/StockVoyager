
const BASE_URL="http://localhost:5000/api/v1";

export const authenticationEndpoints={
    LOGIN_API:BASE_URL+"/auth/login",
    SENDOTP_API:BASE_URL+"/auth/sendOTP", 
    SIGNUP_API:BASE_URL+"/auth/signUp",
    RESETPASSWORD_API:BASE_URL+"/auth/resetPassword",
    RESETPASSTOKEN_API:BASE_URL+"/auth/resetPasswordToken",
}

export const updationEndpoints={
    UPDATE_DP_API:BASE_URL+"/profile/updateDisplayPicture",
    UPDATE_DETAILS_API:BASE_URL+"/profile/updateProfile",
    UPDATE_PASSWORD_API:BASE_URL+"/auth/changePassword",
}
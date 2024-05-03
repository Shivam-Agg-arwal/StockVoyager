
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

export const watchlistEndpoints={
    ADD_TO_WATCHLIST_API:BASE_URL+"/watchlist/addToWatchlist",
    REMOVE_FROM_WATCHLIST_API:BASE_URL+"/watchlist/removeFromWatchlist"
}

export const stockOperationsEndpoints={
    BUY_STOCK_API:BASE_URL+"/stock/buyStock",
    SELL_STOCK_API:BASE_URL,//ABHI BANUAUNGA
}
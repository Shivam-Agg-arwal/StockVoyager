import { toast } from 'react-toastify';
import { sendOTP, resetPasswordToken, loginUser } from './api'; // Import your API functions here

async function yourFunctionNameHere() {
  try {
    toast.loading("Loading..."); // Display loading toast

    // Make API call
    const response = await sendOTP(/* Provide necessary data here */);

    // Log response for debugging
    console.log("Response:", response);

    // Handle response
    if (response.success) {
      toast.success("Operation successful"); // Display success toast
      // Do the needed things here

      // Example: Set signup data if OTP sent successfully
      if (response.data && response.data.signupData) {
        const signupData = response.data.signupData;
        // Do something with signupData
      }

      // Example: Set emailSent flag if password reset token sent successfully
      if (response.emailSent) {
        // Set emailSent flag for automatic redirection to next page
        localStorage.setItem("emailSent", "true");
      }

      // Example: Set user token and user data if login successful
      if (response.token && response.user) {
        localStorage.setItem("token", JSON.stringify(response.token));
        localStorage.setItem("user", JSON.stringify(response.user));
      }
    } else {
      toast.error("Error: " + response.error); // Display error toast
    }
  } catch (error) {
    console.error("Error:", error); // Log error
    toast.error("An error occurred. Please try again later."); // Display generic error toast
  }
}

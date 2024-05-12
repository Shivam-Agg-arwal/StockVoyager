import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import { authenticationEndpoints } from "../../api/api";
import { useDispatch } from "react-redux";
import { setSignupData } from "../slices/authSlice";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { useEffect } from "react";

function Signup() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const { user } = useSelector((state) => state.profile);

  useEffect(() => {
    if (user) {
      navigate("/dashboard/profile");
    }
  }, []);

  const { SENDOTP_API } = authenticationEndpoints;

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append("email", data.email);
      const response = await axios.post(SENDOTP_API, formData);
      console.log(response);
      if (response.data.success) {
        //mtlb otp bhjdia hai
        toast.success(response.data.toastMessage);
        dispatch(setSignupData(data));
        navigate("/verifyotp");
      }
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.toastMessage
      ) {
        toast.error(error.response.data.toastMessage);
      } else {
        toast.error("Technical Error");
      }
    }
  };

  return (
    <>
      <div className="md:w-full md:h-screen flex justify-center items-center bg-white">
        <div className="flex justify-center items-center bg-[#FFFFFF] rounded">
          <div className="flex items-start justify-center rounded-md w-1/2 h-full flex-col p-4">
            <h1 className="text-3xl font-bold mb-1 w-full text-left mx-3">Sign up</h1>
            <hr className="h-px my-1 border-1 w-1/4 mx-5" />
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex items-center justify-center w-full h-fit py-1 px-2 rounded-xl my-5 mx-2"
            >
              <div className="w-full h-full">
                <div className="flex gap-2">
                  <div className="flex flex-col text-md">
                    <label htmlFor="first" className="text-black mb-3">
                      First Name
                    </label>
                    <input
                      type="text"
                      placeholder="Enter first name"
                      className="w-full outline-none h-12 rounded-md mb-4 border-b-2"
                      id="first"
                      {...register("firstName", {
                        required: true,
                      })}
                    />
                    {errors.firstName && (
                      <p className="text-[#cc0000] text-sm">
                        First name is required.
                      </p>
                    )}
                  </div>
                  <div className="flex flex-col text-md">
                    <label htmlFor="last" className="text-black mb-3">
                      Last Name
                    </label>
                    <input
                      type="text"
                      placeholder="Enter last name"
                      className="w-full outline-none h-12 rounded-md mb-4 border-b-2"
                      id="last"
                      {...register("lastName", {
                        required: true,
                      })}
                    />
                    {errors.lastName && (
                      <p className="text-[#cc0000] text-sm">
                        Last name is required.
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex flex-col text-md">
                  <label htmlFor="email" className="text-black mb-3">
                    Email Address
                  </label>
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="w-full outline-none h-12 rounded-md mb-4 border-b-2"
                    id="email"
                    {...register("email", { required: true })}
                  />
                  {errors.email && (
                    <p className="text-[#cc0000] text-sm">Email is required.</p>
                  )}
                </div>

                <div className="flex gap-2">
                  <div className="flex flex-col text-md">
                    <label htmlFor="password" className="text-black mb-3">
                      Password
                    </label>
                    <input
                      type="password"
                      placeholder="Enter password"
                      className="outline-none h-12 rounded-md mb-4 border-b-2 w-full"
                      id="password"
                      {...register("password", {
                        required: true,
                      })}
                    />
                    {errors.password && (
                      <p className="text-[#cc0000] text-sm">
                        Password is required.
                      </p>
                    )}
                  </div>
                  <div className="flex flex-col text-md ">
                    <label htmlFor="confirm-pass" className="text-black mb-3">
                      Confirm Password
                    </label>
                    <input
                      type="password"
                      placeholder="Confirm password"
                      className="outline-none h-12 rounded-md mb-4 border-b-2 w-full"
                      id="confirm-pass"
                      {...register("confirmPassword", {
                        required: true,
                      })}
                    />
                    {errors.confirmPassword && (
                      <p className="text-[#cc0000] text-sm">
                        Confirm password is required.
                      </p>
                    )}
                  </div>
                </div>
                <div className="flex items-center justify-center h-fit">
                  <button
                    type="submit"
                    className="w-2/3 h-14 my-3 bg-theme text-light rounded-md"
                  >
                    Create Account
                  </button>
                </div>
              </div>
            </form>
            <div className="hover:text-theme underline hover:underline-offset-2"><Link to="/login">Already a user</Link></div>
          </div>
          <div className="w-1/2 flex justify-center items-center bg-[#FFFFFF]">
            <div className="w-1/2 h-1/2">
              <img
                src="./public/signup-image.jpg"
                alt="signup-img"
                className="md:h-full md:w-full"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Signup;

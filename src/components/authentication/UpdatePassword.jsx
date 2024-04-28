import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { authenticationEndpoints } from "../../api/api";

function UpdatePassword() {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const { RESETPASSWORD_API } = authenticationEndpoints;
	const { token } = useParams();
	const navigate = useNavigate();

	const onSubmit = async (data) => {
		const loadingToast = toast.loading("Updating Password...");
		try {
			const formData = new FormData();
			formData.append("token", token);
			formData.append("password", data.newPassword);
			formData.append("confirmPassword", data.confirmPassword);
			const response = await axios.post(RESETPASSWORD_API, formData);
			console.log(response);
			if (response.data.success) {
				toast.success("Password Updated Suuccessfully");
				navigate("/login");
			} else {
				toast.error("Password Updation Failed : ");
				navigate("/forgot-password");
			}
		} catch (error) {
			toast.error("Password Updation  Failed");
		}
		toast.dismiss(loadingToast);
	};
	return (
		<>
			<div className="flex items-center justify-center w-full h-screen ">
				
				<form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 max-w-md mx-fit border p-14 rounded-lg">
					<h1 className="text-3xl underline text-center">Update Password</h1>
					<div className="mb-4">
						<label
							htmlFor="newPassword"
							className="block font-medium text-xl"
						>
							New Password
						</label>
						<input
							type="password"
							id="newPassword"
							{...register("newPassword", { required: true })}
							className="shadow appearance-none border rounded w-full py-2 px-3 text-grey leading-tight focus:outline-none focus:shadow-outline"
						/>
						{errors.newPassword && (
							<span className="text-red-500">
								New password is required
							</span>
						)}
					</div>
					<div className="mb-4">
						<label
							htmlFor="confirmPassword"
							className="block font-medium text-xl"
						>
							Confirm New Password
						</label>
						<input
							type="password"
							id="confirmPassword"
							{...register("confirmPassword", { required: true })}
							className="shadow appearance-none border rounded w-full py-2 px-3 text-grey leading-tight focus:outline-none focus:shadow-outline"
						/>
						{errors.confirmPassword && (
							<span className="text-red-500">
								Please confirm your new password
							</span>
						)}
					</div>
					<button
						type="submit"
						className="border-2 p-2 rounded-lg transition-colors hover:bg-grey"
					>
						Update Password
					</button>
				</form>
			</div>
		</>
	);
}

export default UpdatePassword;

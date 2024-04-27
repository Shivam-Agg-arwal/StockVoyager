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
		<form onSubmit={handleSubmit(onSubmit)} className="max-w-md mx-auto">
			<div className="mb-4">
				<label
					htmlFor="newPassword"
					className="block text-sm font-medium text-gray-900"
				>
					New Password
				</label>
				<input
					type="password"
					id="newPassword"
					{...register("newPassword", { required: true })}
					className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
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
					className="block text-sm font-medium text-gray-900"
				>
					Confirm New Password
				</label>
				<input
					type="password"
					id="confirmPassword"
					{...register("confirmPassword", { required: true })}
					className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
				/>
				{errors.confirmPassword && (
					<span className="text-red-500">
						Please confirm your new password
					</span>
				)}
			</div>
			<button
				type="submit"
				className="w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
			>
				Update Password
			</button>
		</form>
	);
}

export default UpdatePassword;

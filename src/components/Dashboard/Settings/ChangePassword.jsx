import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { IoEyeOff, IoEye } from "react-icons/io5";
import axios from "axios";
import { updationEndpoints } from "../../../api/api";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

const ChangePassword = () => {
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm();
	const [showCurrentPassword, setShowCurrentPassword] = useState(false);
	const [showNewPassword, setShowNewPassword] = useState(false);
	const { token } = useSelector((state) => state.auth);

	const { UPDATE_PASSWORD_API } = updationEndpoints;

	const onSubmit = async (data) => {
		const loadingToast = toast.loading("Updating Password...");
		try {
			const formData = new FormData();
			formData.append("newPassword", data.newPassword);
			formData.append("oldPassword", data.currentPassword);
			formData.append("token", token);

			const response = await axios.post(UPDATE_PASSWORD_API, formData);
			console.log(response);
			if (response.data.success) {
				toast.success(response.data.toastMessage);
				reset();
			}
		} catch (error) {
			if (error.response && error.response.data && error.response.data.toastMessage) {
				toast.error(error.response.data.toastMessage);
			} else {
				toast.error("Updation failed");
			}
		}
		toast.dismiss(loadingToast);
	};

	return (
		<div className="max-w-md mx-auto">
			<h2 className="text-3xl mb-5 underline">Change Password</h2>
			<form
				onSubmit={handleSubmit(onSubmit)}
				className="flex flex-col gap-4"
			>
				<div>
					<label htmlFor="currentPassword" className="block text-lg">
						Current Password
					</label>
					<div className="relative">
						<input
							type={showCurrentPassword ? "text" : "password"}
							id="currentPassword"
							{...register("currentPassword", { required: true })}
							className="border border-gray-300 rounded-lg py-2 px-3 w-full"
						/>
						<button
							type="button"
							onClick={() =>
								setShowCurrentPassword(!showCurrentPassword)
							}
							className="absolute top-1/2 right-3 transform -translate-y-1/2 bg-transparent border-none"
						>
							{showCurrentPassword ? (
								<IoEyeOff className="text-gray-400" />
							) : (
								<IoEye className="text-gray-400" />
							)}
						</button>
					</div>
					{errors.currentPassword && (
						<span className="text-sm text-red-500">
							This field is required
						</span>
					)}
				</div>
				<div>
					<label htmlFor="newPassword" className="block text-lg">
						New Password
					</label>
					<div className="relative">
						<input
							type={showNewPassword ? "text" : "password"}
							id="newPassword"
							{...register("newPassword", { required: true })}
							className="border border-gray-300 rounded-lg py-2 px-3 w-full"
						/>
						<button
							type="button"
							onClick={() => setShowNewPassword(!showNewPassword)}
							className="absolute top-1/2 right-3 transform -translate-y-1/2 bg-transparent border-none"
						>
							{showNewPassword ? (
								<IoEyeOff className="text-gray-400" />
							) : (
								<IoEye className="text-gray-400" />
							)}
						</button>
					</div>
					{errors.newPassword && (
						<span className="text-sm text-red-500">
							This field is required
						</span>
					)}
				</div>
				<button
					type="submit"
					className="bg-theme text-white rounded-lg py-2 px-4 font-semibold transition duration-300 hover:bg-blue-600"
				>
					Submit
				</button>
			</form>
		</div>
	);
};

export default ChangePassword;

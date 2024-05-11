import React from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { updationEndpoints } from "../../../api/api";
import { setUser } from "../../slices/profileSlice";

const UpdateDetails = () => {
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
		getValues,
	} = useForm();
	const dispatch = useDispatch();
	const { user } = useSelector((state) => state.profile);
	const { token } = useSelector((state) => state.auth);

	const { UPDATE_DETAILS_API } = updationEndpoints;

	const shouldCall = () => {
		const currentValues = getValues();
		return (
			currentValues.firstName !== user.firstName ||
			currentValues.lastName !== user.lastName ||
			currentValues.phoneNumber !== user.additionalDetails.phoneNumber ||
			currentValues.gender !== user.additionalDetails.gender ||
			currentValues.about !== user.additionalDetails.about
		);
	};

	const onSubmit = async (data) => {
		if (shouldCall()) {
			const loadingToast = toast.loading("Updating...");
			try {
				const formData = new FormData();
				formData.append("firstName", data.firstName || "");
				formData.append("lastName", data.lastName || "");
				formData.append("phoneNumber", data.phoneNumber || "");
				formData.append("gender", data.gender || "");
				formData.append("about", data.about || "");
				formData.append("token", token);

				const response = await axios.post(UPDATE_DETAILS_API, formData);
				console.log(response);
				if (response.data.success) {
					toast.success(response.data.toastMessage);

					dispatch(setUser(response.data.data));
					localStorage.setItem(
						"user",
						JSON.stringify(response.data.data)
					);
				}
			} catch (error) {
				if (
					error.response &&
					error.response.data &&
					error.response.data.toastMessage
				) {
					toast.error(error.response.data.toastMessage);
				} else {
					toast.error("Updation failed");
				}
			}
			reset();
			toast.dismiss(loadingToast);
		} else {
			toast.error("The details were not changed.");
		}
	};

	return (
		<div className="max-w-md mx-auto">
			<h2 className="text-3xl mb-5 uppercase font-semibold">
				Update Details
			</h2>
			<form
				onSubmit={handleSubmit(onSubmit)}
				className="flex flex-col gap-3"
			>
				<div className="grid grid-cols-2 gap-4">
					<div className="flex flex-col">
						<label
							htmlFor="firstName"
							className="text-sm font-bold"
						>
							First Name<span className="text-red">*</span>
						</label>
						<input
							type="text"
							id="firstName"
							{...register("firstName", { required: true })}
							placeholder={user.firstName || ""}
							className="border border-gray-300 rounded-lg px-3 py-2"
						/>
						{errors.firstName && (
							<span className="text-red">
								This field is required
							</span>
						)}
					</div>
					<div className="flex flex-col">
						<label htmlFor="lastName" className="text-sm font-bold">
							Last Name<span className="text-red">*</span>
						</label>
						<input
							type="text"
							id="lastName"
							{...register("lastName", { required: true })}
							placeholder={user.lastName || ""}
							className="border border-grey rounded-lg px-3 py-2"
						/>
						{errors.lastName && (
							<span className="text-red">
								This field is required
							</span>
						)}
					</div>
				</div>
				<div className="grid grid-cols-2 gap-4">
					<div className="flex flex-col">
						<label
							htmlFor="phoneNumber"
							className="text-sm font-bold"
						>
							Phone Number<span className="text-red">*</span>
						</label>
						<input
							type="text"
							id="phoneNumber"
							{...register("phoneNumber", { required: true })}
							placeholder={
								user.additionalDetails.phoneNumber || ""
							}
							className="border border-grey rounded-lg px-3 py-2"
						/>
						{errors.phoneNumber && (
							<span className="text-red">
								This field is required
							</span>
						)}
					</div>
					<div className="flex flex-col">
						<label htmlFor="gender" className="text-sm font-bold">
							Gender<span className="text-red">*</span>
						</label>
						<select
							id="gender"
							{...register("gender", { required: true })}
							defaultValue={user.additionalDetails.gender || ""}
							className="border border-grey rounded-lg px-3 py-2"
						>
							<option value="" disabled>
								Select Gender
							</option>
							<option value="Male">Male</option>
							<option value="Female">Female</option>
							<option value="Other">Other</option>
						</select>
						{errors.gender && (
							<span className="text-red">
								This field is required
							</span>
						)}
					</div>
				</div>
				<div className="flex flex-col">
					<label htmlFor="about" className="text-sm font-bold">
						About
					</label>
					<textarea
						id="about"
						{...register("about")}
						rows={3}
						placeholder={user.additionalDetails.about || ""}
						className="border border-gray-300 rounded-lg px-3 py-2"
					/>
				</div>
				<button
					type="submit"
					className="w-fit p-2 bg-theme text-white rounded-md font-bold hover:scale-95 transition-all duration-200"
				>
					Submit
				</button>
			</form>
		</div>
	);
};

export default UpdateDetails;

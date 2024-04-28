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
		if (
			currentValues.firstName !== "" &&
			currentValues.firstName !== user.firstName
		)
			return true;
		if (
			currentValues.lastName !== "" &&
			currentValues.lastName !== user.lastName
		)
			return true;
		if (
			currentValues.phoneNumber !== "" &&
			currentValues.phoneNumber !== user.additionalDetails.phoneNumber
		)
			return true;
		if (
			currentValues.gender !== "" &&
			currentValues.gender !== user.additionalDetails.gender
		)
			return true;
		if (
			currentValues.about !== "" &&
			currentValues.about !== user.additionalDetails.about
		)
			return true;

		return false;
	};

	const onSubmit = async (data) => {
		// Handle form submission, e.g., send data to backend
		if (shouldCall()) {
			const loadingToast = toast.loading("Updating...");
			try {
				// console.log(data);
				const formData = new FormData();
				const currentValues = getValues();
				if (
					currentValues.firstName !== "" &&
					currentValues.firstName !== user.firstName
				)
					formData.append("firstName", data.firstName);
				if (
					currentValues.lastName !== "" &&
					currentValues.lastName !== user.lastName
				)
					formData.append("lastName", data.lastName);
				if (
					currentValues.phoneNumber !== "" &&
					currentValues.phoneNumber !==
					user.additionalDetails.phoneNumber
				)
					formData.append("phoneNumber", data.phoneNumber);
				if (
					currentValues.gender !== "" &&
					currentValues.gender !== user.additionalDetails.gender
				)
					formData.append("gender", data.gender);
				if (
					currentValues.about !== "" &&
					currentValues.about !== user.additionalDetails.about
				)
					formData.append("about", data.about);
				formData.append("token", token);

				const response = await axios.post(UPDATE_DETAILS_API, formData);
				console.log(response);
				if (response.data.success) {
					toast.success("Updation was successfull");
					dispatch(setUser(response.data.updatedUserDetails));
					localStorage.setItem(
						"user",
						JSON.stringify(response.data.updatedUserDetails)
					);
				}
			} catch (error) {
				toast.error("Updation failed");
				console.log(error);
			}
			reset();
			toast.dismiss(loadingToast);
		} else {
			toast.error("The details were not changed.");
		}
	};
	{
		// console.log(user);
	}

	return (
		<div>
			<h2 className="text-3xl mb-5 underline">Update Details</h2>
			<form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
				<div className="flex gap-2">
					<div className="flex gap-3 items-start justify-start">
						<label htmlFor="firstName" className="text-lg">First Name</label>
						<input
							type="text"
							id="firstName"
							{...register("firstName", {})}
							placeholder={user.firstName ? user.firstName : ""}
							className="border border-black rounded-lg"
						/>
						{errors.firstName && <span>This field is required</span>}
					</div>
					<div className="flex gap-3 items-start justify-start">
						<label htmlFor="lastName" className="text-lg">Last Name</label>
						<input
							type="text"
							id="lastName"
							{...register("lastName", {})}
							placeholder={user.lastName ? user.lastName : ""}
							className="border border-black rounded-lg "
						/>
						{errors.lastName && <span>This field is required</span>}
					</div>
				</div>
				<div className="flex gap-2">
					<div className="flex gap-3 items-start justify-start">
						<label htmlFor="phoneNumber" className="text-lg">Phone Number</label>
						<input
							type="text"
							id="phoneNumber"
							{...register("phoneNumber", {})}
							placeholder={
								user.additionalDetails.phoneNumber
									? user.additionalDetails.phoneNumber
									: ""
							}
							className="border border-black rounded-lg "
						/>
						{errors.phoneNumber && <span>This field is required</span>}
					</div>
					<div className="flex gap-3 items-start justify-start">
						<label htmlFor="gender" className="text-lg">Gender</label>
						<select
							id="gender"
							{...register("gender", {})}
							defaultValue={
								user.additionalDetails.gender
									? user.additionalDetails.gender
									: ""
							}
							className="border border-black rounded-lg "
						>
							<option value="" disabled>
								Select Gender
							</option>
							<option value="Male">Male</option>
							<option value="Female">Female</option>
							<option value="Other">Other</option>
						</select>
						{errors.gender && <span>This field is required</span>}
					</div>
				</div>
				<div className="flex gap-3 items-start justify-start">
					<label htmlFor="about" className="text-lg">About</label>
					<textarea
						id="about"
						{...register("about")}
						placeholder={
							user.additionalDetails.about
								? user.additionalDetails.about
								: ""
						}
						className="border border-black rounded-lg "
					/>
				</div>
				<button type="submit" className="cursor-pointer w-fit h-fit p-2 bg-theme rounded-md hover:bg-grey">Submit</button>
			</form>
		</div>
	);
};

export default UpdateDetails;

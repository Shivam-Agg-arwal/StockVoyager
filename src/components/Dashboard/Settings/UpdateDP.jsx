import React, { useState } from "react";
import { WiDayCloudy } from "react-icons/wi";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import axios from "axios";
import { updationEndpoints } from "../../../api/api";
import { setUser } from "../../slices/profileSlice";

const UpdateDP = () => {
    const { user } = useSelector((state) => state.profile);
    const dispatch = useDispatch();
    const [chosenImage, setChosenImage] = useState(null);
    const [file, setFile] = useState(null);

    const { UPDATE_DP_API } = updationEndpoints;

    const { token } = useSelector((state) => state.auth);
    const handleFileInputChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setFile(file);
            // Read the file and generate a preview URL
            const reader = new FileReader();
            reader.onloadend = () => {
                setChosenImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };
    const handleUpdation = async () => {
        const loadingToast = toast.loading("Updating Display Picture...");
        try {
            const formData = new FormData();
            formData.append("token", token);
            formData.append("displayPicture", file);
            // console.log('calling');

            const response = await axios.post(UPDATE_DP_API, formData);
            console.log(response);
            if (response.data.success) {
                toast.success("Updated successfully");
                dispatch(setUser(response.data.data));
                localStorage.setItem(
                    "user",
                    JSON.stringify(response.data.data)
                );
                RemoveHandle();
            }
        } catch (error) {
            toast.error("Updation failed");
            console.log("error ");
        }
        toast.dismiss(loadingToast);
    };

    const RemoveHandle = () => {
        setFile(null);
        setChosenImage(null);
    };

    return (
        <div className="flex flex-row gap-2 items-center w-full h-fit mt-2">
            <img
                src={`${chosenImage ? chosenImage : user.image}`}
                width={90}
                className="rounded-full"
            />
            <div>
                <div className="mb-3 text-3xl">Change Profile Picture</div>
                <div className="flex flex-row gap-2">
                    {file && (
                        <div
                            onClick={() => {
                                handleUpdation();
                            }}
                            className="cursor-pointer w-fit h-fit p-2 bg-theme rounded-md hover:bg-grey"
                        >
                            Update Image
                        </div>
                    )}
                    {!file && (
                        <div>
                            <label
                                htmlFor="uploadimage"
                                className="cursor-pointer w-fit h-fit p-2 bg-theme rounded-md hover:bg-grey"
                            >
                                Choose Image
                            </label>
                            <input
                                type="file"
                                id="uploadimage"
                                className="hidden"
                                onChange={handleFileInputChange}
                                accept="image/*"
                            />
                        </div>
                    )}
                    {file && (
                        <button
                            onClick={() => {
                                RemoveHandle();
                            }}
                            className="cursor-pointer w-fit h-fit p-2 bg-theme rounded-md hover:bg-grey"
                        >
                            Remove
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default UpdateDP;

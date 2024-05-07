import React, { useState } from "react";
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

            const response = await axios.post(UPDATE_DP_API, formData);
            if (response.data.success) {
                toast.success("Updated successfully");
                dispatch(setUser(response.data.data));
                localStorage.setItem(
                    "user",
                    JSON.stringify(response.data.data)
                );
                removeHandle();
            }
        } catch (error) {
            toast.error("Updation failed");
            console.log(error);
        }
        toast.dismiss(loadingToast);
    };

    const removeHandle = () => {
        setFile(null);
        setChosenImage(null);
    };

    return (
        <div className="flex items-center w-full mt-4">
            <img
                src={chosenImage ? chosenImage : user.image}
                alt="Profile"
                className="rounded-full border border-black w-24 h-24 mr-4"
            />
            <div>
                <h2 className="text-2xl font-semibold mb-2">Change Profile Picture</h2>
                <div className="flex gap-2">
                    {file && (
                        <button
                            onClick={handleUpdation}
                            className="w-fit p-2 bg-theme text-white rounded-md font-bold hover:scale-95 transition-all duration-200"
                        >
                            Update Image
                        </button>
                    )}
                    {!file && (
                        <>
                            <label
                                htmlFor="uploadimage"
                                className="w-fit p-2 bg-theme text-white rounded-md font-bold hover:scale-95 transition-all duration-200 cursor-pointer"
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
                        </>
                    )}
                    {file && (
                        <button
                            onClick={removeHandle}
                            className="w-fit p-2 bg-theme text-white rounded-md font-bold hover:scale-95 transition-all duration-200"
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

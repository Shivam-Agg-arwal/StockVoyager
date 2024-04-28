import React from "react";
import ChangePassword from "./Settings/ChangePassword";
import UpdateDP from "./Settings/UpdateDP";
import UpdateDetails from "./Settings/UpdateDetails";

const Settings = () => {
    return (
        <div className="flex flex-col gap-3 p-5 w-screen">
            <div className="flex items-start p-2 border-black bg-grey rounded-md ">
                <UpdateDP />
            </div>
            <div className="flex items-start p-2  border-black  bg-grey rounded-md">
                <UpdateDetails />
            </div>
            <div className="flex items-start p-2  border-black bg-grey rounded-md">
                <ChangePassword />
            </div>
        </div>
    );
};

export default Settings;

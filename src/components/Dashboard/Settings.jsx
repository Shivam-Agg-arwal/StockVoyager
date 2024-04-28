import React from "react";
import ChangePassword from "./Settings/ChangePassword";
import UpdateDP from "./Settings/UpdateDP";
import UpdateDetails from "./Settings/UpdateDetails";

const Settings = () => {
    return (
        <div>
            <h1 className="text-5xl w-screen h-screen flex justify-center items-center">
                SETTINGS
            </h1>

            <UpdateDP />
            <UpdateDetails />
            <ChangePassword />
        </div>
    );
};

export default Settings;

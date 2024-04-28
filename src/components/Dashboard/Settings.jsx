import React from "react";
import ChangePassword from "./Settings/ChangePassword";
import UpdateDP from "./Settings/UpdateDP";
import UpdateDetails from "./Settings/UpdateDetails";

const Settings = () => {
    return (
        <div className="flex flex-col">
            <div className="flex items-start p-5 border border-black w-screen">
                <UpdateDP />
            </div>
            <div className="flex items-start p-5 border border-black w-screen">
                <UpdateDetails />
            </div>
            <div className="flex items-start p-5 border border-black w-screen">
                <ChangePassword />
            </div>
        </div>
    );
};

export default Settings;

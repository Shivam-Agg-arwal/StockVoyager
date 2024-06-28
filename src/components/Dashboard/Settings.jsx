import React from "react";
import ChangePassword from "./Settings/ChangePassword";
import UpdateDP from "./Settings/UpdateDP";
import UpdateDetails from "./Settings/UpdateDetails";

const Settings = () => {
    return (
        <div className="w-full bg-bgWhite">
            <div className="flex flex-col gap-4 p-5 max-w-[1280px] w-full mx-auto">
            <div className="bg-white rounded-md shadow-md p-4">
                <UpdateDP />
            </div>
            <div className="bg-white rounded-md shadow-md p-4">
                <UpdateDetails />
            </div>
            <div className="bg-white rounded-md shadow-md p-4">
                <ChangePassword />
            </div>
        </div>
        </div>
    );
};

export default Settings;

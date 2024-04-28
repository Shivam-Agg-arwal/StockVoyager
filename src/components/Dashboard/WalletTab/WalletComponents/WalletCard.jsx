import React from "react";
import { BsSuitcaseLg } from "react-icons/bs";
import { CiWallet } from "react-icons/ci";
import { IoPricetagsOutline } from "react-icons/io5";

function WalletCard({ icon, balance }) {
    let selectedIcon;
    switch (icon) {
        case "Portfolio Amount":
            selectedIcon = <BsSuitcaseLg />;
            break;
        case "Wallet Amount":
            selectedIcon = <CiWallet />;
            break;
        case "Credit":
            selectedIcon = <IoPricetagsOutline />;
            break;
        default:
            selectedIcon = null;
    }

    return (
        <div className="flex flex-col border-black border">
            <div className="flex ">
                <div>{selectedIcon}</div>
                <div>{icon}</div>
            </div>
            <div>{balance}</div>
        </div>
    );
}

export default WalletCard;

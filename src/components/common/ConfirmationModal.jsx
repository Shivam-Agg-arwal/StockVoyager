import React from "react";

export default function ConfirmationModal({ confirmationModal }) {
    return (
        <div className="fixed inset-0 z-[1000] !mt-0 grid place-items-center overflow-auto bg-white bg-opacity-10 backdrop-blur-sm">
            <div className="w-11/12 max-w-[350px] rounded-lg border  p-6">
                <p className="text-2xl font-semibold ">
                    {confirmationModal?.text1}
                </p>
                <p className="mt-3 mb-5 leading-6">
                    {confirmationModal?.text2}
                </p>
                <div className="flex items-center gap-x-4">
                    <button
                        className="cursor-pointer rounded-md  py-[8px] px-[20px] font-semibold "
                        onClick={confirmationModal?.btnHandler1}
                    >
                        {confirmationModal?.btnText1}
                    </button>
                    <button
                        className="cursor-pointer rounded-md  py-[8px] px-[20px] font-semibold "
                        onClick={confirmationModal?.btnHandler2}
                    >
                        {confirmationModal?.btnText2}
                    </button>
                </div>
            </div>
        </div>
    );
}

import React from "react";
import { symbolMapping } from "../../../data/Symbol";
import { GiTakeMyMoney } from "react-icons/gi";
import { useState } from "react";
import { WiLightning } from "react-icons/wi";

const Trading = () => {
    const [searchQuery, setSearchQuery] = useState("");

    const printStock = (stock) => {
        console.log(stock);
    };

    // Filter entries based on the search query
    const filteredEntries = symbolMapping
        .filter((entry) =>
            entry.COMPANY_NAME.toLowerCase().includes(searchQuery.toLowerCase())
        )
        .slice(0, 10); // Take the top 10 filtered entries

    return (
        <div className="max-w-[1280px] w-9/12 mx-auto my-6">
            <h2 className="text-4xl mx-auto text-center font-bold my-2">TRADE CENTER</h2>
            <label
                htmlFor="default-search"
                className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
            >
                Search
            </label>
            <div className="relative mx-auto w-1/2">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                    <svg
                        className="w-4 h-4 text-gray-500 dark:text-gray-400"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 20 20"
                    >
                        <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                        />
                    </svg>
                </div>
                <input
                    id="default-search"
                    className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required
                    type="text"
                    placeholder="Search by Company Name"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>
            {filteredEntries.length === 0 ? (
                <p className="text-center text-gray-500 mt-4">No stock found for the search query.</p>
            ) : (
                <ul>
                    {filteredEntries.map((entry, index) => (
                        <li
                            key={index}
                            onClick={() => {
                                printStock(entry);
                            }}
                            className="p-2 rounded-lg border-black border-[1px] my-4 py-4 flex flex-row gap-4 items-center cursor-pointer"
                        >
                            <GiTakeMyMoney className="text-[#00FF00] text-lg"/>
                            <div>
                                {entry.COMPANY_NAME}
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Trading;

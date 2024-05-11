import React from "react";
import { symbolMapping } from "../../../data/Symbol";
import { GiTakeMyMoney } from "react-icons/gi";
import { WiLightning } from "react-icons/wi";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Trading = () => {
    // const [searchQuery, setSearchQuery] = useState("");
  const {searchQuery}=useSelector((state)=>state.profile);
  console.log(searchQuery);
    
    const navigate=useNavigate();

    const printStock = (stock) => {
        console.log(stock);
        navigate(`/dashboard/stockView/${stock.SYMBOL}`)
        
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
                            className="p-2 rounded-lg border-black border-[1px] my-4 py-4 flex flex-row gap-3 items-center cursor-pointer"
                        >
                            <GiTakeMyMoney className="text-[#55a855] text-xl font-bold"/>
                            <div className="italic font-bold">
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

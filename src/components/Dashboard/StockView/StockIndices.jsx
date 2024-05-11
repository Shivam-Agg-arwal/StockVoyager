import React, { useEffect, useState } from "react";
import fetchCurrentPrice from "../../../../pyserver/MakeRequest/getStockCurrentPrice";

const StockIndices = ({ symbol }) => {
    const [stocks,setStocks]=useState([
        {
            symbol: "RELIANCE",
            companyName: "Reliance Industries Ltd.",
            price: 0,
            changePrice: 0,
            changePercent: 0,
        },
        {
            symbol: "ONGC",
            companyName: " Oil & Natural Gas Corporation",
            price: 0,
            changePrice:0,
            changePercent: 0,
        },
        {
            symbol: "TATASTEEL",
            companyName: "Tata Steel Ltd.",
            price: 0,
            changePrice:0,
            changePercent: 0,
        },
        {
            symbol: "SBIN",
            companyName: "State Bank Of India",
            price: 0,
            changePrice:0,
            changePercent: 0,
        },
    ]);
    useEffect(() => {
        const findCurrValue = async () => {
            const updatedStocks = await Promise.all(stocks.map(async (stock) => {
                const response = await fetchCurrentPrice(stock.symbol);
                return {
                    ...stock,
                    price: response.lastPrice.toFixed(2),
                    changePercent: response.pChange.toFixed(2),
                    changePrice: response.change.toFixed(2)
                };
            }));
    
            console.log(updatedStocks);
            setStocks(updatedStocks);
            // Now you can update the state with the updatedStocks or perform any other actions
        };
    
        findCurrValue();
    }, []);
    

    return (
        <div className="p-4 rounded-md my-2 shadow-md">
            <div className="font-bold text-xl mb-2">People Also Watch</div>
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead>
                        <tr className="text-left font-semibold text-lg">
                            <th className="px-4 py-2">Name</th>
                            <th className="px-4 py-2">Price</th>
                            <th className="px-4 py-2">Change</th>
                        </tr>
                    </thead>
                    <tbody>
                        {stocks.map((stock) => (
                            <tr key={stock.symbol} className="border-b border-grey">
                                <td className="px-4 py-3">
                                    <div className="font-bold text-left">{stock.symbol}</div>
                                    <div className="text-sm text-left">{stock.companyName}</div>
                                </td>
                                <td className="px-4 py-3">{stock.price}</td>
                                <td className="px-4 py-3 ">
                                    <div className={stock.changePrice > 0 ? "text-[#53a853] font-bold" : stock.changePrice < 0 ? "text-red font-bold" : "text-gray-500"}>
                                        <div >
                                            {stock.changePrice}
                                        </div>
                                        <div className="text-xs">{stock.changePercent}%</div>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default StockIndices;

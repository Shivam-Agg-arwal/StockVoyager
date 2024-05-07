import React from "react";

const StockIndices = ({ symbol }) => {
    const stocks = [
        {
            symbol: "AAPL",
            companyName: "Apple Inc.",
            price: 145.12,
            changePrice: -1.23,
            changePercent: "-0.84%",
        },
        {
            symbol: "GOOGL",
            companyName: "Alphabet Inc.",
            price: 2779.39,
            changePrice: 12.56,
            changePercent: "+0.45%",
        },
        {
            symbol: "MSFT",
            companyName: "Microsoft Corporation",
            price: 261.15,
            changePrice: 2.78,
            changePercent: "+1.08%",
        },
        {
            symbol: "AMZN",
            companyName: "Amazon.com, Inc.",
            price: 3444.28,
            changePrice: -5.67,
            changePercent: "-0.16%",
        },
    ];

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
                                <td className="px-4 py-3">
                                    <div className={stock.changePrice > 0 ? "text-green font-bold" : stock.changePrice < 0 ? "text-red font-bold" : "text-gray-500"}>
                                        {stock.changePrice}
                                    </div>
                                    <div className="text-xs">{stock.changePercent}</div>
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

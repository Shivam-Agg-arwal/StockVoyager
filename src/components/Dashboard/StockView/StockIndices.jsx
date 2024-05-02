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
        <div className="p-4 rounded-md border-black border-[1px] my-2">
            <div className="font-bold text-xl my-2">People Also Watch</div>
            <div>
                <table>
                    <thead>
                        <tr className="text-[#808080] text-left font-semibold text-lg">
                            <th>Name</th>
                            <th>Price</th>
                            <th>Change</th>
                        </tr>
                    </thead>
                    <tbody>
                        {stocks.map((stock) => (
                            <tr key={stock.symbol}>
                                <td>
                                    <div className="font-bold">{stock.symbol}</div>
                                    <div className="text-sm">{stock.companyName}</div>
                                </td>
                                <td>{stock.price}</td>
                                <td
                                    className={
                                        stock.changePrice > 0
                                            ? "text-[#008000]"
                                            : stock.changePrice < 0
                                            ? "text-[#FF0000]"
                                            : "text-[#808080]"
                                    }
                                >
                                    <div className="text-right">
                                        <div className="font-bold">{stock.changePrice}</div>
                                        <div className="text-xs">{stock.changePercent}</div>
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

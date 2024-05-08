import React, { useState, useEffect } from "react";
import fetchStockDetails from "../../../../pyserver/MakeRequest/getStockDetails.js";
import Loader from "../../Loader.jsx";

const StockDetails = ({ symbol }) => {
    const [stockDetails, setStockDetails] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchData() {
            try {
                const data = await fetchStockDetails(symbol);
                preprocessData(data);
            } catch (error) {
                setError(error.message);
            }
        }

        fetchData();
    }, [symbol]);

    const preprocessData = (data) => {
        if (data.dayRange) {
            const dayRange = data.dayRange;
            data.dayRangeLow = dayRange.low;
            data.dayRangeHigh = dayRange.high;
            delete data.dayRange;
        }

        if (data.yearRange) {
            const yearRange = data.yearRange;
            data.yearRangeLow = yearRange.low;
            data.yearRangeHigh = yearRange.high;
            delete data.yearRange;
        }

        setStockDetails(data);
    };

    if (error) {
        return <div className="text-red-600">Error: {error}</div>;
    }

    if (!stockDetails) {
        return <Loader />;
    }

    // Utility function to format large numbers
    const formatNumber = (num) => {
        if (num >= 10000000) {
            return (num / 10000000).toFixed(2) + " Cr";
        } else if (num >= 100000) {
            return (num / 100000).toFixed(2) + " Lakh";
        } else {
            return num.toFixed(2);
        }
    };

    const customHeadings = {
        companyName: "Company Name",
        prevClose: "Previous Close",
        dayRangeLow: "Day Range Low",
        dayRangeHigh: "Day Range High",
        yearRangeLow: "Year Range Low",
        yearRangeHigh: "Year Range High",
        marketCap: "Market Cap",
        averageVol: "Average Volume",
        industry: "Industry",
        pdSectorPe: "PD Sector PE",
        faceValue: "Face Value",
        issuedSize: "Issued Size",
    };

    return (
        <div className="rounded-lg shadow-lg p-6 bg-white">
            <h1 className="text-3xl font-bold mb-6">Stock Details</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {Object.entries(stockDetails).map(([key, value]) => (
                    <div key={key} className="text-lg">
                        <strong className="font-semibold">
                            {customHeadings[key] || key}:
                        </strong>{" "}
                        {typeof value === "number" && (key === "marketCap" || key === "issuedSize")
                            ? formatNumber(value)
                            : typeof value === "object"
                            ? <span className="italic">{JSON.stringify(value)}</span>
                            : <span>{value}</span>}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default StockDetails;

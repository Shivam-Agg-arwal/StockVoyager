import React from "react";
import { useState, useEffect } from "react";
import fetchStockDetails from "../../../../pyserver/MakeRequest/getStockDetails.js";
import { useDispatch } from "react-redux";
import Loader from "../../Loader.jsx";

const StockDetails = ({ symbol }) => {
    const [stockDetails, setStockDetails] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchData() {
            try {
                const data = await fetchStockDetails(symbol);
                preprocessData(data);
				console.log('changed to false in detail');
            } catch (error) {
                setError(error.message);
            }
        }

        fetchData();
    }, [symbol]); // Trigger the effect whenever the symbol changes

    const preprocessData = (data) => {
        // Flatten dayRange and yearRange objects
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
        return <div>Error: {error}</div>;
    }

    if (!stockDetails) {
        return <div><Loader/></div>;
    }

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
        <>
            <div className="flex flex-col border p-3">
                <h1 className="text-2xl font-bold mb-3">Stock Details</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {Object.entries(stockDetails).map(([key, value]) => (
                        <div key={key} className="text-lg">
                            <strong>{customHeadings[key] || key}:</strong>{" "}
                            {typeof value === "object"
                                ? JSON.stringify(value)
                                : value}
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default StockDetails;

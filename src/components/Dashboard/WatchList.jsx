import React, { useState, useEffect } from "react";
import fetchCurrentPrice from "../../../pyserver/MakeRequest/getStockCurrentPrice";
import { symbolMapping } from "../../data/Symbol";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../Loader";
import { useNavigate } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import { watchlistEndpoints } from "../../api/api";
import toast from "react-hot-toast";
import axios from "axios";
import { setUser } from "../slices/profileSlice";

const WatchList = () => {
    const { user } = useSelector((state) => state.profile);
    const { REMOVE_FROM_WATCHLIST_API } = watchlistEndpoints;
    const dispatch = useDispatch();

    const [watchlistData, setWatchlistData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const { token } = useSelector((state) => state.auth);

    const fetchData = async () => {
        if (user.watchList.length === 0) return;
        try {
            setLoading(true);
            setError(null);

            const listToFetch = user.watchList;
            const promises = listToFetch.map(async (symbol) => {
                const data = await fetchCurrentPrice(symbol);
                const change = parseFloat(data.change).toFixed(2);
                const pChange = parseFloat(data.pChange).toFixed(2);

                const symbolData = symbolMapping.find(
                    (item) => item.SYMBOL === symbol
                );
                const companyName = symbolData ? symbolData.COMPANY_NAME : "";

                return {
                    ...data,
                    symbol: symbol,
                    companyName: companyName,
                    change: change,
                    pChange: pChange,
                };
            });
            const newData = await Promise.all(promises);

            newData.sort(
                (a, b) => parseFloat(b.pChange) - parseFloat(a.pChange)
            );

            setWatchlistData(newData);
            console.log(newData);
        } catch (error) {
            console.error("Error fetching data:", error);
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const refreshData = () => {
        fetchData();
    };

    const RemoveFromWatchlist = async (symbol) => {
        const loadingToast = toast.loading("Removing from watchlist....");
        try {
            const formData = new FormData();
            formData.append("symbol", symbol);
            formData.append("token", token);
            console.log(REMOVE_FROM_WATCHLIST_API);
            console.log(symbol);
            const response = await axios.post(
                REMOVE_FROM_WATCHLIST_API,
                formData
            );
            console.log(response);
            if (response.data.success) {
                dispatch(setUser(response.data.data));
                localStorage.setItem(
                    "user",
                    JSON.stringify(response.data.data)
                );
                toast.success(response.data.toastMessage);
                const updatedWatchlist = watchlistData.filter(
                    (list) => list.symbol !== symbol
                );
                setWatchlistData(updatedWatchlist);
            } else {
                toast.error("Technical error");
            }
        } catch (error) {
            if (
                error.response &&
                error.response.data &&
                error.response.data.toastMessage
            ) {
                toast.error(error.response.data.toastMessage);
            } else {
                toast.error("Remove from Watchlist failed");
            }
        }
        toast.dismiss(loadingToast);
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <Loader />
            </div>
        );
    }

    return (
        <div className="w-full min-h-screen bg-gradient-to-b from-blue-300 to-blue-500 py-8">
            <div className="mx-auto max-w-lg">
                <div className="p-4 rounded-md bg-white shadow-md my-4 flex flex-col items-center">
                    <div className="font-bold text-2xl underline mb-4">
                        Watchlist
                    </div>
                    <table className="w-full">
                        <thead>
                            <tr className="text-gray-700 text-left font-semibold text-lg">
                                <th className="px-4 py-2 text-center">
                                    Company
                                </th>
                                <th className="px-4 py-2 text-center">Value</th>
                                <th className="px-4 py-2 text-center">
                                    Change
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {watchlistData.length > 0 ? (
                                watchlistData
                                    .slice(0, 20)
                                    .map((item, index) => (
                                        <tr
                                            key={index}
                                            className="border-b text-center"
                                        >
                                            <td className="px-4 py-2 flex flex-row gap-2 items-center">
                                                <FaStar
                                                    className="cursor-pointer text-[#e2d849]"
                                                    onClick={() => {
                                                        RemoveFromWatchlist(
                                                            item.symbol
                                                        );
                                                    }}
                                                />
                                                <div>
                                                    <div className="font-semibold">
                                                        <div
                                                            className="cursor-pointer"
                                                            onClick={() => {
                                                                navigate(
                                                                    `/dashboard/stockView/${item.symbol}`
                                                                );
                                                            }}
                                                        >
                                                            {item.symbol}
                                                        </div>
                                                    </div>
                                                    <div
                                                        className="text-sm cursor-pointer"
                                                        onClick={() => {
                                                            navigate(
                                                                `/dashboard/stockView/${item.symbol}`
                                                            );
                                                        }}
                                                    >
                                                        {item.companyName}
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-4 py-2">
                                                {item.lastPrice}
                                            </td>
                                            <td className="px-4 py-2">
                                                <div
                                                    className={`font-semibold ${
                                                        parseFloat(
                                                            item.pChange
                                                        ) > 0
                                                            ? "text-green"
                                                            : parseFloat(
                                                                  item.pChange
                                                              ) < 0
                                                            ? "text-red"
                                                            : "text-superred"
                                                    }`}
                                                >
                                                    <div>{item.change}</div>
                                                    <div>{item.pChange}%</div>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                            ) : (
                                <tr>
                                    <td>No Stock Added To Watchlist</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                    <div className="text-center py-4">
                        <button
                            className="bg-theme hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md transition duration-300 ease-in-out transform hover:scale-105"
                            onClick={refreshData}
                        >
                            Refresh
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WatchList;

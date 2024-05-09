import React, { useState, useEffect } from "react";
import fetchCurrentPrice from "../../../pyserver/MakeRequest/getStockCurrentPrice";
import { symbolMapping } from "../../data/Symbol";
import { useSelector } from "react-redux";
import Loader from "../Loader";
import { useNavigate } from "react-router-dom";

const wlist = [
  "RELIANCE",
  "TCS",
  "HDFCBANK",
  "INFY",
  "ICICIBANK",
  "SBIN",
  "HINDUNILVR",
  "AXISBANK",
  "BAJFINANCE",
  "MARUTI",
];

const WatchList = () => {
  const { user } = useSelector((state) => state.profile);

  const [watchlistData, setWatchlistData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const fetchData = async () => {
    console.log("calling");
    try {
      setLoading(true);
      setError(null);

      const listToFetch = user.watchList.length > 0 ? user.watchList : wlist;
      const promises = listToFetch.map(async (symbol) => {
        const data = await fetchCurrentPrice(symbol);
        const change = parseFloat(data.change).toFixed(2);
        const pChange = parseFloat(data.pChange).toFixed(2);

        const symbolData = symbolMapping.find((item) => item.SYMBOL === symbol);
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

      newData.sort((a, b) => parseFloat(b.pChange) - parseFloat(a.pChange));

      setWatchlistData(newData);
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
          <div className="font-bold text-2xl underline mb-4">Watchlist</div>
          <table className="w-full">
            <thead>
              <tr className="text-gray-700 text-left font-semibold text-lg">
                <th className="px-4 py-2 text-center">Company</th>
                <th className="px-4 py-2 text-center">Value</th>
                <th className="px-4 py-2 text-center">Change</th>
              </tr>
            </thead>
            <tbody>
              {watchlistData.map((item, index) => (
                <tr
                  key={index}
                  className="border-b text-center cursor-pointer"
                  onClick={() => {
                    navigate(`/dashboard/stockView/${item.symbol}`);
                  }}
                >
                  <td className="px-4 py-2">
                    <div className="font-semibold">{item.symbol}</div>
                    <div className="text-sm">{item.companyName}</div>{" "}
                  </td>
                  <td className="px-4 py-2">{item.lastPrice}</td>
                  <td className="px-4 py-2">
                    <div
                      className={`font-semibold ${
                        parseFloat(item.pChange) > 0
                          ? "text-green"
                          : parseFloat(item.pChange) < 0
                          ? "text-red"
                          : "text-superred"
                      }`}
                    >
                      <div>{item.change}</div>
                      <div>{item.pChange}%</div>
                    </div>
                  </td>
                </tr>
              ))}
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

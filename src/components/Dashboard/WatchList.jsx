import React, { useState, useEffect } from 'react';
import fetchCurrentPrice from '../../../pyserver/MakeRequest/getStockCurrentPrice';

const wlist = ['RELIANCE', 'TCS', 'HDFCBANK', 'INFY', 'ICICIBANK', 'SBIN', 'HINDUNILVR', 'AXISBANK', 'BAJFINANCE', 'MARUTI'];

const WatchList = () => {
  const [watchlistData, setWatchlistData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        const promises = wlist.map(async (symbol) => {
          const data = await fetchCurrentPrice(symbol);
          return { ...data, symbol: symbol };
        });
        const newData = await Promise.all(promises);

        // Sort the newData array based on "Rise" (pChange) value in decreasing order
        newData.sort((a, b) => parseFloat(b.pChange) - parseFloat(a.pChange));

        setWatchlistData(newData);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [wlist]);

  const refreshData = () => {
    fetchData();
  };

  return (
    <div className="w-1/2 mx-auto mt-5 border">
      <div className="bg-white shadow-lg rounded">
        <div className="flex justify-between bg-gray-200 font-bold px-4 py-2 border-2">
          <div className="w-1/3 text-lg">Company</div>
          <div className="w-1/3 text-lg">Value</div>
          <div className="w-1/3 text-lg">Rise</div>
        </div>
        {loading ? (
          <div className="text-center py-4">Loading...</div>
        ) : error ? (
          <div className="text-red-600 text-center py-4">Error: {error}</div>
        ) : (
          <div>
            {watchlistData.map((item, index) => (
              <div key={index} className="flex justify-between border-b hover:bg-gray-100 px-4 py-2">
                <div className="w-1/3">{item.symbol}</div>
                <div className="w-1/3">{item.lastPrice}</div>
                <div className="w-1/3">{item.pChange}</div>
              </div>
            ))}
          </div>
        )}
        <div className="text-center py-4 bg-theme">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={refreshData}
          >
            Refresh
          </button>
        </div>
      </div>
    </div>
  );
};

export default WatchList;

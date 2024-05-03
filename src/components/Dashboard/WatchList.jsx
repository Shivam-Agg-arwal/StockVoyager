import React, { useState, useEffect } from 'react';
import fetchCurrentPrice from '../../../pyserver/MakeRequest/getStockCurrentPrice';
import { symbolMapping } from '../../data/Symbol';

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
          // Round up the change and pChange values to two decimal places
          const change = parseFloat(data.change).toFixed(2);
          const pChange = parseFloat(data.pChange).toFixed(2);

          // Find company name for symbol from symbolsData
          const symbolData = symbolMapping.find((item) => item.SYMBOL === symbol);
          const companyName = symbolData ? symbolData.COMPANY_NAME : '';

          return { ...data, symbol: symbol, companyName: companyName, change: change, pChange: pChange };
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
    <div className="mx-auto w-1/2">
      <div className="p-1 rounded-md border-black border-[1px] my-2 flex flex-col items-center">
        <div className="font-bold text-3xl underline my-2 ">Watchlist</div>
        <div className='w-full flex flex-col items-center'>
          <table className='w-3/4'>
            <thead>
              <tr className="text-[#808080] text-left font-semibold text-lg">
                <th className='text-center'>Company</th>
                <th className='text-center'>Value</th>
                <th className='text-center'>Change</th>
              </tr>
            </thead>
            <tbody>
              {watchlistData.map((item, index) => (
                <tr key={index} className="mb-8 border text-center">
                  <td>
                    <div className="font-bold">{item.symbol}</div>
                    <div>{item.companyName}</div> {/* Display company name */}
                  </td>
                  <td>{item.lastPrice}</td>
                  <td>
                    <div className={`text-center font-bold ${parseFloat(item.pChange) > 0 ? "text-[#008000]" : parseFloat(item.pChange) < 0 ? "text-[#FF0000]" : "text-[#808080]"}`}>
                      <div>{item.change}</div>
                      <div>{item.pChange}</div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="text-center py-2 bg-theme w-3/4">
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

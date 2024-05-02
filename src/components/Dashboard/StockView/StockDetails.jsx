import React from 'react';
import { useState, useEffect } from 'react';
import fetchStockDetails from '../../../../pyserver/MakeRequest/getStockDetails.js';

const StockDetails = ({ symbol }) => {
  const [stockDetails, setStockDetails] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await fetchStockDetails(symbol);
        setStockDetails(data);
      } catch (error) {
        setError(error.message);
      }
    }

    fetchData();
  }, [symbol]); // Trigger the effect whenever the symbol changes

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!stockDetails) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className='flex flex-col border'>
        <div className='border'>Stock Details</div>
        <div>
          <h2>Stock Details for {symbol}</h2>
          <ul>
            {Object.entries(stockDetails).map(([key, value]) => (
              <li key={key}>
                <strong>{key}:</strong> {typeof value === 'object' ? JSON.stringify(value) : value}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default StockDetails;

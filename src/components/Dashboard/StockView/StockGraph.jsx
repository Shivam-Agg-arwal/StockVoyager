import React from 'react'
import ApexChart from './Graph.jsx'

const StockGraph = ({symbol}) => {
  console.log("Symbol received in StockGraph:", symbol);
  return (
    <div className='text-5xl flex justify-center items-center p-5 border'>
    <ApexChart symbol={symbol}/>
    </div>
  )
}

export default StockGraph
import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import StockTitle from './StockTitle';
import StockGraph from './StockGraph';
import StockDetails from './StockDetails';
import StockIndices from './StockIndices';
import Loader from '../../Loader';
import { useSelector } from 'react-redux';

const StockView = () => {
    const {symbol}=useParams();
    // const [loadingPrice,setLoadingPrice]=useState(false);
    // const [loadingDetails,setLoadingDetails]=useState(false);
    


  return (
    <div className='flex flex-row gap-2 w-full'>
        {/* Left Side */}
        <div className=' flex flex-col'>
            <StockTitle symbol={symbol} />
            <StockGraph symbol={symbol}/>
        </div>
        {/* Right Side */}
        <div className=''>
            <StockDetails symbol={symbol}/>
            <StockIndices symbol={symbol}/>
        </div>
    </div>
  )
}

export default StockView
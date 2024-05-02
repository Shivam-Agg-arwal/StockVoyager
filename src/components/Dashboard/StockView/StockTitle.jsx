import React from 'react'
import { FaStar } from "react-icons/fa";


const StockTitle = ({symbol}) => {
  return (
    <div className='flex flex-row items-center justify-between bg-[#ffffffc7] rounded-md border-black border-[1px] p-4 w-[700px] m-4' >
        <div>
        <div>
            <img src=''/>
        </div>
        <div>
            <div className='font-bold text-lg'>{symbol}</div>
            <div>NSE:{symbol}</div>
        </div>
        </div>
        <div className='flex flex-row gap-4 items-center'>
        <div className='p-2 bg-blue text-white rounded-md px-6'>
            BUY
        </div>
        <div className='flex flex-row gap-2 items-center p-2 bg-blue text-white rounded-md px-6'>
            <FaStar/>
            <div>Add to WatchList</div>
        </div>
        </div>

    </div>
  )
}

export default StockTitle
import React from 'react'
import ApexChart from '../WalletTab/Graphical'

const StockGraph = ({symbol}) => {
  return (
    <div className='text-5xl flex justify-center items-center p-5 border'>
    <ApexChart/>
    </div>
  )
}

export default StockGraph
import React from 'react'
import TransactionTable from './TransactionComponent/TransactionTable'

const TransactionSection = () => {
  return (
    <div>
        <div className='text-4xl font-bold '>
            All Trades
        </div>
        <div>Your Portfolio trades and transactions.</div>

        <TransactionTable/>
    </div>
  )
}

export default TransactionSection
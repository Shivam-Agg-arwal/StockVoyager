import React from 'react'
import WalletSection from './WalletTab/WalletSection'
import TransactionSection from './WalletTab/TransactionSection'

const WalletTab = () => {
  return (
    <div className='max-w-[1280px] w-11/12 mx-auto my-6'>
        <WalletSection/>
        <TransactionSection/>
    </div>
  )
}

export default WalletTab
import React from 'react'
import WalletCard from './WalletComponents/WalletCard'
import { useSelector } from 'react-redux'

const WalletSection = () => {
  const { user } = useSelector((state) => state.profile);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div >
        <div className='text-4xl font-bold '>
          WALLET
        </div>
        <div className='flex gap-2 my-4'>
          <WalletCard icon="Portfolio Amount" balance={(user.portfolioBalance).toFixed(2)}/>
          <WalletCard icon="Wallet Amount" balance={(user.walletBalance).toFixed(2)}/>
          <WalletCard icon="Credit" balance="10"/>

        </div>
      </div>
    </>
  )
}

export default WalletSection
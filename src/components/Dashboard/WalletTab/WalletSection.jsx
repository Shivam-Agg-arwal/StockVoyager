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
      <div className='flex gap-2'>
        <WalletCard icon="Portfolio Amount" balance={user.portfolioBalance}/>
        <WalletCard icon="Wallet Amount" balance={user.walletBalance}/>
        <WalletCard icon="Credit" balance="69"/>
      </div>
    </>
  )
}

export default WalletSection
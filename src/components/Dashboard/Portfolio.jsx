import React from 'react'
import ApexChart from './WalletTab/Graphical'
import Loader from '../Loader'

const Portfolio = () => {
  return (
    <h1 className='text-5xl w-screen h-screen flex justify-center items-center'>
    <ApexChart/>
    <Loader/>
    </h1>
  )
}

export default Portfolio
import React from 'react'
import PortfolioGraph from './Portfolio/PortfolioGraph'
import PieGraph from './Portfolio/PieGraph'
import PortfolioList from './Portfolio/PortfolioList'
// import ApexChart from './WalletTab/Graphical'
// import Loader from '../Loader'

const Portfolio = () => {
  return (
    <div>
      <h1 className='text-4xl font-bold text-black capitalize'>PORTFOLIO</h1>
      <div className='flex flex-row gap-2'>
        <div>
          <PortfolioGraph/>
        </div>
        <div>
          <PieGraph/>
        </div>
      </div>
      <div>
        <PortfolioList/>
      </div>

    </div>

  )
}

export default Portfolio
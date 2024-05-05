import React from 'react'
import { useSelector } from 'react-redux'
import PortfolioListPagination from './PortfolioListPagination'

const PortfolioList = () => {

    return (
        <div>
            <div className='flex flex-row gap-2'>
                <div>
                    Stock Name
                </div>
                <div>
                    Current Price
                </div>
                <div>
                    Avg. Buying Price
                </div>
                <div>
                    Quantity
                </div>
                <div>
                    Current Valuation
                </div>
                <div>
                    Total Investment
                </div>
                <div>
                    Profit/Loss
                </div>
                <div>
                    Operations
                </div>
            </div>
            <div>
                <PortfolioListPagination/>
            </div>
        </div>
    )
}

export default PortfolioList
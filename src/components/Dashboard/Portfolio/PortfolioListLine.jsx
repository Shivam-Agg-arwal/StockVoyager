import React, { useEffect, useState } from 'react'
import fetchCurrentPrice from '../../../../pyserver/MakeRequest/getStockCurrentPrice';

const PortfolioListLine = ({ stock }) => {
	console.log(stock);
	const [currentPrice,setCurrentPrice]=useState(null);
	const [profit,setProfit]=useState(0);
	

	const getPrice=async()=>{
		const response=await fetchCurrentPrice(stock.stockSymbol);
		console.log(response);
		setCurrentPrice(response);
		const curr=(response.lastPrice)*(stock.quantity);
		const buy=stock.buy_cost;
		setProfit(curr-buy);
		
	}

	useEffect(()=>{
		getPrice();
	},[])
	return (
		<div className='flex flex-row justify-between '>
			<div>
				<div>
					{stock.stockSymbol}
				</div>
				<div>

				</div>
			</div>
			<div>
				{currentPrice?currentPrice.lastPrice.toFixed(1):"Loading..."}
			</div>
			<div>
				{(stock.buy_cost/stock.quantity).toFixed(1)}
			</div>
			<div>
				{stock.quantity}
			</div>
			<div>
			{currentPrice?(currentPrice.lastPrice*stock.quantity).toFixed(1):"Loading..."}
			</div>
			<div>
				{stock.buy_cost.toFixed(1)}
			</div>
			<div>
				{
					currentPrice?profit.toFixed(1):"Loading..."

				}
			</div>
			<div className='flex flex-row gap-2'>
				<div>BUY</div>
				<div>SELL</div>
			</div>
		</div>
	)
}

export default PortfolioListLine
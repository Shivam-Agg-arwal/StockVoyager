import React from 'react';
import PortfolioGraph from './Portfolio/PortfolioGraph';
import PieGraph from './Portfolio/PieGraph';
import PortfolioList from './Portfolio/PortfolioList';

const Portfolio = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-black capitalize mb-6 text-center">Portfolio</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white shadow-lg rounded-lg p-6 h-fit" >
          <h2 className="text-2xl font-bold text-black mb-4">Portfolio Performance</h2>
          <PortfolioGraph />
        </div>
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-2xl font-bold text-black mb-4">Portfolio Allocation</h2>
          <PieGraph />
        </div>
      </div>
      <div className="mt-8">
        <h2 className="text-2xl font-bold text-black mb-4">Portfolio List</h2>
        <PortfolioList />
      </div>
    </div>
  );
};

export default Portfolio;

import React from 'react';
import { useParams } from 'react-router-dom';
import StockTitle from './StockTitle';
import StockGraph from './StockGraph';
import StockDetails from './StockDetails';
import StockIndices from './StockIndices';
import Loader from '../../Loader';
import { useSelector } from 'react-redux';

const StockView = () => {
    const { symbol } = useParams();

    return (
        <div className="flex flex-col md:flex-row gap-4 w-full">
            {/* Left Side */}
            <div className="flex flex-col w-full md:w-1/2 items-center">
                <StockTitle symbol={symbol} />
                <StockGraph symbol={symbol} />
            </div>
            {/* Right Side */}
            <div className="flex flex-col w-full md:w-1/2">
                <StockDetails symbol={symbol} />
                <StockIndices symbol={symbol} />
            </div>
        </div>
    );
};

export default StockView;

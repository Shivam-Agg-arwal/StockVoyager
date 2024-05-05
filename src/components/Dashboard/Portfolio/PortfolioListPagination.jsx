import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import PortfolioListLine from './PortfolioListLine';
import { MdKeyboardDoubleArrowLeft } from "react-icons/md";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { MdKeyboardArrowRight } from "react-icons/md";

const PortfolioListPagination = () => {
    const { user } = useSelector((state) => state.profile);
    const portfolio = user.portfolio;
    const pages = Math.ceil(portfolio.length / 10);

    const [pageNo, setPageNumber] = useState(1);
    const [startIndex, setStartIndex] = useState(0);
    const [endIndex, setEndIndex] = useState(10);
    const [portfolioList,setPortfolioList]=useState([]);

    useEffect(() => {
        const newStartIndex = (pageNo - 1) * 10;
        const newEndIndex = Math.min(pageNo * 10, portfolio.length);
        setStartIndex(newStartIndex);
        setEndIndex(newEndIndex);
        const newportfolioList=portfolio.slice(newStartIndex,newEndIndex);
        setPortfolioList(newportfolioList);
    }, [pageNo, portfolio]);

    if (pages === 0) {
        return (<div>Currently your portfolio is empty. Go and trade some stocks.</div>);
    }

    return (
        <div>
            <div>
                {
                    portfolioList.map((stock, index) => (
                        <PortfolioListLine key={index} stock={stock} />
                    ))
                }
            </div>
            <div className='flex flex-row gap-2 items-center'>
                <MdKeyboardDoubleArrowLeft onClick={()=>setPageNumber(1)} className='cursor-pointer'/>
                <MdKeyboardArrowLeft onClick={()=>{setPageNumber(pageNo-1)}} className='cursor-pointer'/>
                <div>{pageNo}</div>
                <MdKeyboardArrowRight onClick={()=>{setPageNumber(pageNo+1)}} className='cursor-pointer'/>

                <MdKeyboardDoubleArrowRight onClick={()=>{setPageNumber(pages)}} className='cursor-pointer'/>
            </div>
        </div>
    );
};

export default PortfolioListPagination;

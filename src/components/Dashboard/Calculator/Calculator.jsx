import React, { useState } from "react";
import InvestmentGraph from "../GamingHub/Games/SpeedyMath/InvestmentGraph";
import { Link } from "react-router-dom";

const calculateInvestment = (years, principal, isSIP, rpa) => {
    let ans;
    if (isSIP) {
        const n = years * 12;
        const r = rpa / 1200.0;
        ans = principal * ((Math.pow(1 + r, n) - 1) / r) * (1 + r);
        ans-=principal*n;
    } else {
        const r = rpa / 100;
        ans = principal * Math.pow(1 + r, years);
        ans-=principal;
    }
    return ans;
};

function formatIndianNumber(num) {
    if (num === undefined || isNaN(num)) {
        return 'Invalid number';
    }

    const numString = num.toString();
    const length = numString.length;
    let formattedNumber = '';

    let commaCount = 0; // Variable to keep track of comma insertion
    let i = length - 1;
    for (; i >= 0; i--) {
        commaCount++;
        if(commaCount == 4){
            formattedNumber = ',' + formattedNumber;
            commaCount = 0;
            break;
        }
        formattedNumber = numString[i] + formattedNumber;
    }
    
    for (; i >= 0; i--) {
        commaCount++;
        if(commaCount == 3){
            formattedNumber = ',' + formattedNumber;
            commaCount = 0;
        }
        formattedNumber = numString[i] + formattedNumber;
    }

    return formattedNumber;
}





const Calculator = () => {
    const [isSIP, setIsSIP] = useState(true);
    const [investment, setInvestment] = useState(1000);
    const [rate, setRate] = useState(7);
    const [time, setTime] = useState(1);
    const [invested, setInvested] = useState(12000);
    const [returns, setReturns] = useState(calculateInvestment(1,1000,true,7));

    return (
        <div>
            <h1>INVESTMENT CALCULATOR</h1>
            <div>
                <div className="flex flex-row gap-2">
                    <div
                        onClick={() => {
                            setIsSIP(true);
                            setInvested(investment * 12 * time);
                            setReturns(
                            calculateInvestment(
                                time,
                                investment,
                                true,
                                rate
                            )
                        );
                        }} 
                        className={isSIP?"bg-[#939022]":"bg-white"}
                    >
                        SIP
                    </div>
                    <div
                        onClick={() => {
                            setIsSIP(false);
                            setInvested(investment);
                            setReturns(
                            calculateInvestment(
                                time,
                                investment,
                                false,
                                rate
                            )
                        );
                        }}
                        
                        className={isSIP===false?"bg-[#939022]":"bg-white"}
                    >
                        Lumpsum
                    </div>
                </div>

                <div className="flex flex-row justify-between">
                    {/* Sliders */}
                    <div>
                        {/* Investment slider */}
                        <div>
                            <div className="flex flex-row gap-2">
                                <div>
                                    {isSIP
                                        ? "Monthly Installment "
                                        : "Total Investment"}
                                </div>
                                <div>₹ {formatIndianNumber(investment)}</div>
                            </div>
                            <input
                                type="range"
                                min={100}
                                max={100000}
                                value={investment}
                                step={100}
                                onChange={(e) => {
                                    setInvestment(e.target.value);
                                    setInvested(
                                        isSIP
                                            ? e.target.value * 12 * time
                                            : e.target.value
                                    );
                                    setReturns(
                                        calculateInvestment(
                                            time,
                                            e.target.value,
                                            isSIP,
                                            rate
                                        )
                                    );
                                }}
                            />
                        </div>
                        {/* Rate slider */}
                        <div>
                            <div className="flex flex-row gap-2">
                                <div>Expected Rate of Interest per annum</div>
                                <div>{rate} %</div>
                            </div>
                            <input
                                type="range"
                                min={1}
                                max={25}
                                value={rate}
                                step={0.1}
                                onChange={(e) => {
                                    setRate(e.target.value);
                                    setReturns(
                                        calculateInvestment(
                                            time,
                                            investment,
                                            isSIP,
                                            e.target.value
                                        )
                                    );
                                }}
                            />
                        </div>
                        {/* Time slider */}
                        <div>
                            <div className="flex flex-row gap-2">
                                <div>Time period</div>
                                <div>{time} Yr</div>
                            </div>
                            <input
                                type="range"
                                min={1}
                                max={20}
                                value={time}
                                onChange={(e) => {
                                    setTime(e.target.value);
                                    setInvested(
                                        isSIP
                                            ? investment * 12 * e.target.value
                                            : investment
                                    );
                                    setReturns(
                                        calculateInvestment(
                                            e.target.value,
                                            investment,
                                            isSIP,
                                            rate
                                        )
                                    );
                                }}
                            />
                        </div>
                    </div>
                    {/* Graph */}
                    <div>
                        <InvestmentGraph Investment={invested} Interest={returns}/>
                    </div>
                </div>

                <div className="flex flex-row justify-between">
                    {/* Investment Stats */}
                    <div>
                        <div className="flex flex-row justify-between">
                            <div>
                                Invested Amount
                            </div>
                            <div>
                                {formatIndianNumber(invested)}
                            </div>
                        </div>
                        <div className="flex flex-row justify-between">
                            <div>
                                Estimated Returns
                            </div>
                            <div>
                                {formatIndianNumber(Math.floor(returns))}
                            </div>
                        </div>
                        <div className="flex flex-row justify-between">
                            <div>
                                Total Amount
                            </div>
                            <div>
                                {formatIndianNumber(Math.floor(Number(invested)+Number(returns)))}
                            </div>
                        </div>
                    </div>
                    {/* Investment Button */}
                    <Link to='/dashboard/tradeCenter' className="mt-10 mr-20" >   INVEST NOW </Link>
                </div>
            </div>
        </div>
    );
};

export default Calculator;

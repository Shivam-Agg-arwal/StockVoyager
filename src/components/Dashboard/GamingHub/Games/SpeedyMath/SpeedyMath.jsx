import React, { useEffect, useState } from "react";

const SpeedyMath = () => {
    const [time, setTime] = useState(null);
    const [sip, setSip] = useState(null);
    const [rate, setRate] = useState(null);
    const [lumpsum, setLumpsum] = useState(null);
    const [optionMul, setOptionMul] = useState(new Array(3).fill(null));
    const [finalValue, setFinalValue] = useState(null);
    const [answerFound, setAnswerFound] = useState(null);
    const [optionState, setOptionState] = useState(new Array(3).fill(null));
    // /constt;

    const lumpsumOptions = [
        1000, 5000, 10000, 20000, 25000, 50000, 75000, 100000, 200000, 250000,
        500000, 1000000, 2000000,
    ];
    const sipOptions = [
        100, 500, 1000, 2000, 2500, 3000, 4000, 5000, 7000, 10000, 15000, 20000,
        25000, 30000, 40000, 50000, 75000, 100000,
    ];
    const rateOptions = [
        7, 7.5, 8, 9, 10, 10.5, 11, 12, 12.5, 13, 14, 14.5, 15, 16, 18, 20,
    ];
    const optionPercent = [
        0.05, 0.1, 0.5, 0.75, 0.8, 0.85, 0.9, 0.99, 1.04, 1.1, 1.5, 1.8, 2, 5,
        10, 100,
    ];
	const calculateInvestment = (years, principal, isSIP, rpa) => {
		if (isSIP) {
			const n=years*12;
			const r=rpa/1200.0;
			const amt=principal*((Math.pow(1+r,n)-1)/r)*(1+r);
			return amt;
		} else {
			return principal * Math.pow(1 + rpa / 100, years);
		}
	}
	

    const initialise = () => {
        const timeRandom = Math.floor(Math.random() * 39 + 1);
        setTime(timeRandom);
		let principal;
        const lumpsumOrSip = Math.floor(Math.random() * 2);
        if (lumpsumOrSip === 1) {
			principal=lumpsumOptions[
				Math.floor(Math.random() * lumpsumOptions.length)
			];
            setLumpsum(
                principal
            );
        } else {
			principal=sipOptions[Math.floor(Math.random() * sipOptions.length)];
            setSip(principal);
        }
		const rateofInterest=rateOptions[Math.floor(Math.random() * rateOptions.length)];
        setRate(rateofInterest);

        let amt = calculateInvestment(timeRandom,principal ,lumpsumOrSip!==1,rateofInterest);
        setFinalValue(amt);
        let index = Math.floor(Math.random() * 3);

        let multiplier1 =
            optionPercent[Math.floor(Math.random() * optionPercent.length)];
        let multiplier2 = multiplier1;
        while (multiplier2 == multiplier1) {
            multiplier2 =
                optionPercent[Math.floor(Math.random() * optionPercent.length)];
        }
		let first_val_given=false;

		let updatedOptionsSet=[...optionMul];
		for(let i=0;i<3;i++){
			if(i===index)	updatedOptionsSet[i]=1;
			else{
				if(first_val_given){
					updatedOptionsSet[i]=multiplier2;
				}
				else{
					updatedOptionsSet[i]=multiplier1;
					first_val_given=true;
				}
			}
		}
		setOptionMul(updatedOptionsSet);

    };

    const resetValue = () => {
        setLumpsum(null);
        setTime(null);
        setSip(null);
        setRate(null);
        setFinalValue(null);
        setAnswerFound(null);
        setOptionState(new Array(3).fill(null));
		setOptionMul(new Array(3).fill(null));
    };

    const HandleClick = (value, index) => {
        if (answerFound) return;
        if (value === 1) {
            setAnswerFound(true);
        }

        const updatedOptions = [...optionState];
        updatedOptions[index] = true;
        setOptionState(updatedOptions);
    };

    useEffect(() => {
        initialise();
    }, []);

    const HandleNext = () => {
        resetValue();
        initialise();
    };

    return (
        <div>
            <div>Speedy Math</div>
            <div>
                <div>
                    {sip ? (
                        <div>SIP : {sip} </div>
                    ) : (
                        <div>Lumpsum Investment : {lumpsum}</div>
                    )}
                </div>
                <div>Time: {time} years</div>
                <div>Avg Rate of interest: {rate}%</div>
            </div>
            <div>
                {Array.from({ length: 3 }).map((_, i) => {
                    if (optionMul[i]===1) {
                        return (
                            <div
                                key={i}
                                className={`${
                                    optionState[i] ? "text-[#00ff00]" : ""
                                }`}
                                onClick={() => {
                                    HandleClick(1, i);
                                }}
                            >
                                {Math.floor(finalValue)}
                            </div>
                        );
                    } else {
                        return (
                            <div
                                key={i}
                                onClick={() => {
                                    HandleClick(optionMul[i], i);
                                }}
                                className={`${
                                    optionState[i] ? "text-[#ff0000]" : ""
                                }`}
                            >
                                {Math.floor(optionMul[i] * finalValue)}
                            </div>
                        );
                    }
                })}
            </div>

            <div
                onClick={() => {
                    HandleNext();
                }}
            >
                NEXT
            </div>
        </div>
    );
};

export default SpeedyMath;

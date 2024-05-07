import React, { useState, useEffect } from "react";

const WhoGetsMore = () => {
  // State to store Charlie's and Josh's information
  const [charlieInfo, setCharlieInfo] = useState({});
  const [joshInfo, setJoshInfo] = useState({});
  const [charlieTotalAssets, setCharlieTotalAssets] = useState(0);
  const [joshTotalAssets, setJoshTotalAssets] = useState(0);
  const [winner, setWinner] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);
  const [score, setScore] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const questions = [
    {
      trader1: "Charlie",
      trader2: "Josh",
    },
    // Add more questions as needed
  ];

  // Function to generate random values within realistic constraints
  const generateRandomValue = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  // Function to calculate total assets based on provided information
  const calculateTotalAssets = (info) => {
    const { startAge, currentAge, rpa, monthlyInstallment, lumpsumAmount } =
      info;
    const yearsPassed = currentAge - startAge;
    const totalRPA = rpa * yearsPassed;
    const totalMonthlyInstallment = monthlyInstallment * 12 * yearsPassed;
    const totalAssets = totalRPA + totalMonthlyInstallment + lumpsumAmount;
    return totalAssets;
  };

  // Function to generate Charlie's and Josh's information
  const generateInformation = () => {
    const startAge = generateRandomValue(20, 40);
    const currentAge = generateRandomValue(startAge, 60);
    const rpa = generateRandomValue(10000, 50000);
    const monthlyInstallment = generateRandomValue(500, 2000);
    const lumpsumAmount = generateRandomValue(10000, 100000);
    return { startAge, currentAge, rpa, monthlyInstallment, lumpsumAmount };
  };

  useEffect(() => {
    // Generate Charlie's and Josh's information when the component mounts
    const charlie = generateInformation();
    const josh = generateInformation();
    setCharlieInfo(charlie);
    setJoshInfo(josh);
  }, [currentQuestionIndex]);

  useEffect(() => {
    // Calculate total assets for Charlie and Josh
    setCharlieTotalAssets(calculateTotalAssets(charlieInfo));
    setJoshTotalAssets(calculateTotalAssets(joshInfo));
  }, [charlieInfo, joshInfo]);

  // Function to handle user's choice
  const handleUserChoice = (chosenTrader) => {
    setSelectedOption(chosenTrader);
    if (chosenTrader === "Charlie") {
      if (charlieTotalAssets > joshTotalAssets) {
        setWinner(chosenTrader);
        setScore((prevScore) => prevScore + 1);
      } else {
        setWinner("Josh");
      }
    } else if (chosenTrader === "Josh") {
      if (joshTotalAssets > charlieTotalAssets) {
        setWinner(chosenTrader);
        setScore((prevScore) => prevScore + 1);
      } else {
        setWinner("Charlie");
      }
    }
  };

  // Function to handle clicking the "Next" button
  const handleNextQuestion = () => {
    setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    setWinner(null);
    setSelectedOption(null);
  };

  return (
    <>
      <div className="w-screen h-screen flex flex-col items-center pt-10 px-10">
        <h1 className="text-3xl text-center">
          WELCOME TO THE GAME OF WHO GETS MORE!!!
        </h1>

        <div className="flex justify-evenly">
          <div className="w-1/6">
            <img
              src="../../../../../../public/clever-man.png"
              alt="clever-man"
            />
            <h1 className="text-2xl text-center">Charlie</h1>
            <p className="text-lg text-center">
              Charlie is {charlieInfo.currentAge - charlieInfo.startAge} years
              old. He started trading at the age of {charlieInfo.startAge} and
              currently, he is {charlieInfo.currentAge} years old. His Rate of
              Personal Assets (RPA) is ${charlieInfo.rpa} per year. He invests $
              {charlieInfo.monthlyInstallment} monthly and has a lump sum amount
              of ${charlieInfo.lumpsumAmount}.
            </p>
          </div>
          <div className="w-1/6">
            <img src="../../../../../../public/smart-man.png" alt="smart-man" />
            <h1 className="text-2xl text-center">Josh</h1>
            <p className="text-lg text-center">
              Josh, who is {joshInfo.currentAge - joshInfo.startAge} years old,
              began trading at the age of {joshInfo.startAge} and is currently{" "}
              {joshInfo.currentAge} years old. His Rate of Personal Assets (RPA)
              is ${joshInfo.rpa} annually. He contributes $
              {joshInfo.monthlyInstallment} monthly and holds a lump sum of $
              {joshInfo.lumpsumAmount}.
            </p>
          </div>
        </div>

        <div className="mt-5">
          <button
            className="w-40 border-black border m-2 bg-theme text-white hover:bg-opacity-80 hover:border-opacity-80 transition duration-300 ease-in-out"
            onClick={() => handleUserChoice("Charlie")}
          >
            Choose Charlie
          </button>
          <button
            className="w-40 border-black border m-2 bg-theme text-white hover:bg-opacity-80 hover:border-opacity-80 transition duration-300 ease-in-out"
            onClick={() => handleUserChoice("Josh")}
          >
            Choose Josh
          </button>
        </div>

        {winner && (
          <div className="mt-5 w-2/3">
            <h2 className="text-center text-xl underline">
              {winner} has more money now!
            </h2>
            <p className="text-md text-center">
              The reason {winner} has more money now is because their total
              assets are calculated based on their Rate of Personal Assets
              (RPA), monthly investments, and lump sum amount. The total assets
              are the sum of RPA multiplied by the number of years, monthly
              investments multiplied by 12 months and the number of years, and
              the lump sum amount.
            </p>
            <p className="text-md text-center">
              For {winner}, the total assets are $
              {winner === "Charlie" ? charlieTotalAssets : joshTotalAssets},
              while the other trader's total assets are $
              {winner === "Charlie" ? joshTotalAssets : charlieTotalAssets}.
              Therefore, {winner} has more money now.
            </p>
          </div>
        )}

        {selectedOption && !winner && (
          <div className="mt-5 w-2/3">
            <h2 className="text-center text-xl">Sorry, better luck next time!</h2>
            <p className="text-md text-center">
              You chose {selectedOption}, but the correct trader with more money now is {charlieTotalAssets > joshTotalAssets ? 'Charlie' : 'Josh'}.
            </p>
          </div>
        )}

        <div className="absolute bottom-4 right-4">
          <button
            className="bg-theme text-white font-bold py-2 px-4 rounded hover:bg-opacity-80 hover:border-opacity-80 transition duration-300 ease-in-out"
            onClick={handleNextQuestion}
          >
            Next &raquo;
          </button>
          <p className="text-lg bg-theme px-3 py-1 rounded-md text-white font-semibold mt-2">Score: {score}</p>
        </div>
      </div>
    </>
  );
};

export default WhoGetsMore;

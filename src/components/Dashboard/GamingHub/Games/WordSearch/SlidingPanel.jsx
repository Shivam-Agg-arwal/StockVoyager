import React, { useState, useEffect } from "react";

const SlidingPanel = ({ words, onSolutionButtonClick }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showSolution, setShowSolution] = useState(false);
  const [hints, setHints] = useState({});
  const [solutions, setSolutions] = useState({});

  // Function to generate hints and solutions
  const generateHintsAndSolutions = () => {
    console.log(words);
    const newHints = {};
    const newSolutions = {};
    words.forEach((item, index) => {
      const word = { word: item.word, explanation: item.explanation };
      const wordLength = word.word.length;
      const numCharactersToShow = Math.ceil(wordLength * 0.3);
      const selectedIndexes = new Set();

      // Generate unique random indexes for characters to show
      while (selectedIndexes.size < numCharactersToShow) {
        selectedIndexes.add(Math.floor(Math.random() * wordLength));
      }

      // Replace characters at non-selected indexes with underscores
      const hint = `${word.word
        .split("")
        .map((char, index) => (selectedIndexes.has(index) ? char : "-"))
        .join("")} = ${word.explanation}`;

      newHints[index] = hint;
      newSolutions[index] = `${word.word} : ${word.explanation}`;
    });
    setHints(newHints);
    setSolutions(newSolutions);
  };

  // Effect to generate hints and solutions when words change
  useEffect(() => {
    generateHintsAndSolutions();
  }, [words]);

  const toggleSidebar = () => {
    setIsOpen((prevIsOpen) => !prevIsOpen);
  };

  const toggleSolution = () => {
    // Only toggle solution if the sidebar is open
    if (isOpen) {
      setShowSolution((prevShowSolution) => !prevShowSolution);
      onSolutionButtonClick(); // Call the onSolutionButtonClick function
    }
  };

  return (
    <div
      className={`fixed top-0 right-0 h-full bg-white shadow-lg transition-all duration-300 ${
        isOpen ? "w-1/4" : "w-0"
      }`}
    >
      {isOpen && (
        <button
          className="absolute bottom-28 right-4 text-white bg-theme hover:bg-opacity-75 px-4 py-2 rounded-full"
          onClick={toggleSolution}
        >
          Solution
        </button>
      )}
      <button
        className="absolute bottom-16 right-4 text-white bg-theme hover:bg-opacity-75 px-6 py-2 rounded-full"
        onClick={toggleSidebar}
      >
        Hint
      </button>
      <div className="p-8 overflow-y-auto max-h-full">
        {/* Sidebar content */}
        <h2 className="text-xl font-semibold mb-4">
          {showSolution ? "Solution" : "Hint"}
        </h2>
        <ul className="flex flex-col gap-5">
          {words.map((item, index) => (
            <li key={index} className="mb-">
              {showSolution
                ? `${index + 1}: ${solutions[index]}`
                : `${index + 1}: ${hints[index]}`}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SlidingPanel;

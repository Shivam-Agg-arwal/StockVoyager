import React, { useState, useEffect } from "react";
import words from "../../../../../data/stockWords";
import SlidingPanel from "./SlidingPanel";

const WordSearch = () => {
  const [searchWord, setSearchWord] = useState("");
  const [message, setMessage] = useState("");
  const [grid, setGrid] = useState([]);
  const [initialGridSet, setInitialGridSet] = useState(false);
  const [foundWords, setFoundWords] = useState([]);
  const [selectedWords, setSelectedWords] = useState([]);

  // Generate the initial grid with random letters
  useEffect(() => {
    const initialGrid = Array.from({ length: 16 }).map(() =>
      Array.from({ length: 16 }).map(() =>
        String.fromCharCode(65 + Math.floor(Math.random() * 26))
      )
    );
    setGrid(initialGrid);
    setInitialGridSet(true); // Mark the initial grid as set
  }, []);

  // Call setWords after the initial grid is set
  useEffect(() => {
    if (initialGridSet) {
      setWords();
    }
  }, [initialGridSet]);

  // Generate selected words once
  useEffect(() => {
    const generateSelectedWords = () => {
      const selected = [];
      while (selected.length < 10) {
        const randomIndex = Math.floor(Math.random() * words.length);
        const { word, explanation } = words[randomIndex];
        if (!selected.find((item) => item.word === word)) {
          selected.push({ word, explanation });
          console.log(`Selected word: ${word}, Explanation: ${explanation}`);
        }
      }
      setSelectedWords(selected);
    };

    generateSelectedWords();
  }, []);

  // Function to check if word exists in the grid
  // Function to check if word exists in the grid
const checkWord = () => {
  if (!searchWord) {
    setMessage("Please enter a word to search.");
    return;
  }

  const selectedWord = selectedWords.find((item) => item.word === searchWord.toUpperCase());

  if (!selectedWord) {
    setMessage(`Word "${searchWord}" is not a stock term.`);
    return;
  }

  if (foundWords.includes(searchWord.toUpperCase())) {
    setMessage(`Word "${searchWord}" already found.`);
    return;
  }

  let found = false;
  let foundCoordinates = [];

  // Horizontal search
  for (let row = 0; row < 16; row++) {
    for (let col = 0; col <= 16 - searchWord.length; col++) {
      if (grid[row].slice(col, col + searchWord.length).join("") === searchWord) {
        setMessage(selectedWord.explanation);
        found = true;
        foundCoordinates = Array.from({ length: searchWord.length }, (_, i) => [row, col + i]);
        break;
      }
    }
    if (found) break;
  }

  // Vertical search
  for (let col = 0; col < 16 && !found; col++) {
    for (let row = 0; row <= 16 - searchWord.length; row++) {
      if (grid.slice(row, row + searchWord.length).map((row) => row[col]).join("") === searchWord) {
        setMessage(selectedWord.explanation);
        found = true;
        foundCoordinates = Array.from({ length: searchWord.length }, (_, i) => [row + i, col]);
        break;
      }
    }
    if (found) break;
  }

  if (found) {
    // Highlight the found word
    const updatedGrid = [...grid];
    foundCoordinates.forEach(([row, col]) => {
      updatedGrid[row][col] = (
        <div className="bg-theme text-white h-full w-full text-center">
          {updatedGrid[row][col]}
        </div>
      );
    });
    setGrid(updatedGrid);
    setFoundWords([...foundWords, searchWord.toUpperCase()]);

    if (foundWords.length === 10) {
      setMessage("Congrats you found all the words!");
    }
  } else {
    setMessage(`Word "${searchWord}" not found.`);
  }
};


  const setWords = () => {
    let newGrid = grid;
    let dict = {};

    selectedWords.forEach(({ word }) => {
      let direction = Math.random() < 0.5 ? "horizontal" : "vertical";

      if (direction === "horizontal") {
        let foundPosition = false;
        let row, col;
        while (!foundPosition) {
          row = Math.floor(Math.random() * 16);
          col = Math.floor(Math.random() * (16 - word.length));
          foundPosition = true;

          for (let i = 0; i < word.length; i++) {
            let index = col + i;
            let key = `[${row}][${index}]`;
            if (dict[key]) {
              foundPosition = false;
              break;
            }
          }
        }

        for (let i = 0; i < word.length; i++) {
          let index = col + i;
          let key = `[${row}][${index}]`;
          newGrid[row][index] = word[i];
          dict[key] = true;
        }
      } else {
        let foundPosition = false;
        let row, col;

        while (!foundPosition) {
          row = Math.floor(Math.random() * (16 - word.length));
          col = Math.floor(Math.random() * 16);
          foundPosition = true;

          for (let i = 0; i < word.length; i++) {
            let rowIndex = row + i;
            let colIndex = col;
            let key = `[${rowIndex}][${colIndex}]`;

            if (dict[key]) {
              foundPosition = false;
              break;
            }
          }
        }

        for (let i = 0; i < word.length; i++) {
          let rowIndex = row + i;
          let colIndex = col;
          let key = `[${rowIndex}][${colIndex}]`;

          newGrid[rowIndex][colIndex] = word[i];
          dict[key] = true;
        }
      }
    });

    setGrid(newGrid);
  };

  // Handle key press event
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      checkWord();
    }
  };

  const handleSolutionButtonClick = () => {
    // This function will be called when the solution button in the SlidingPanel component is clicked
    console.log("Solution button clicked");
  
    // Mark all solution words in the grid
    const updatedGrid = [...grid];
    selectedWords.forEach(({ word }) => {
      for (let row = 0; row < 16; row++) {
        for (let col = 0; col < 16; col++) {
          // Check horizontally
          if (col + word.length <= 16) {
            const horizontalWord = updatedGrid[row].slice(col, col + word.length).join("");
            if (horizontalWord === word) {
              for (let i = col; i < col + word.length; i++) {
                updatedGrid[row][i] = (
                  <div className="bg-theme text-white h-full w-full text-center">
                    {updatedGrid[row][i]}
                  </div>
                );
              }
            }
          }
  
          // Check vertically
          if (row + word.length <= 16) {
            let verticalWord = "";
            for (let i = row; i < row + word.length; i++) {
              verticalWord += updatedGrid[i][col];
            }
            if (verticalWord === word) {
              for (let i = row; i < row + word.length; i++) {
                updatedGrid[i][col] = (
                  <div className="bg-theme text-white h-full w-full text-center">
                    {updatedGrid[i][col]}
                  </div>
                );
              }
            }
          }
        }
      }
    });
  
    setGrid(updatedGrid); // Update the grid state with marked solution words
    setMessage('The Game is finished!!!')
  };
  

  return (
    <div className="flex flex-col items-center justify-center h-screen w-screen ">
      <h1 className="text-3xl mb-3">STOCK WORD SEARCH</h1>
      <div className="w-2/5">
      <div className="flex flex-col items-center">
        <div className="grid grid-cols-[16] gap-1x md:gap-[2x] lg:gap-[4px]">
          {grid.map((row, rowIndex) => (
            <div key={rowIndex} className="flex">
              {row.map((cell, colIndex) => (
                <div
                  key={colIndex}
                  className="mx-[2px] w-6 h-6 border-2 border-black flex items-center justify-center text-theme"
                >
                  {cell}
                </div>
              ))}
            </div>
          ))}
        </div>
        <input
          type="text"
          value={searchWord}
          onChange={(e) =>
            setSearchWord(
              e.target.value.replace(/[^A-Za-z]/g, "").toUpperCase()
            )
          }
          onKeyPress={handleKeyPress}
          placeholder="Enter a word to search"
          className="mt-4 px-2 py-1 border-4 border-black"
        />
        <button
          onClick={checkWord}
          className="mt-2 px-4 py-2 bg-theme text-white rounded-md"
        >
          Search
        </button>
        {message && <p className="mt-2 text-red">{message}</p>}
      </div>
      <SlidingPanel 
        words={selectedWords}
        onSolutionButtonClick={handleSolutionButtonClick}
        />
      </div>

    </div>

  );
};

export default WordSearch;

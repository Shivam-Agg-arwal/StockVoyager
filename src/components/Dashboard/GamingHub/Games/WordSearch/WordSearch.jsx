import React, { useState, useEffect } from "react";
import {
  easyWords,
  mediumWords,
  hardWords,
} from "../../../../../data/stockWords";
import SlidingPanel from "./SlidingPanel";

const WordSearch = ({ difficulty }) => {
  const [searchWord, setSearchWord] = useState("");
  const [message, setMessage] = useState("");
  const [grid, setGrid] = useState([]);
  const [foundWords, setFoundWords] = useState([]);
  const [selectedWords, setSelectedWords] = useState([]);
  const [found, setFound] = useState("");

  const [foundByButton, setFoundByButton] = useState(0);
  const [foundManually, setFoundManually] = useState(0)
  const [indexCounter, setIndexCounter] = useState(0);



  useEffect(() => {
    setGrid(generateInitialGrid());
    setSelectedWords(generateSelectedWords());
  }, [difficulty]);

  useEffect(() => {
    setFound(`Found: ${foundWords.length}/${selectedWords.length}`);
  }, [foundWords, selectedWords]);

  const gridSize = () => {
    switch (difficulty) {
      case "easy":
        return 14;
      case "medium":
        return 18;
      case "hard":
        return 24;
      default:
        return 14;
    }
  };

  const checkWord = () => {
    if (!searchWord) {
      setMessage("Please enter a word to search.");
      return;
    }
  
    const selectedWord = selectedWords.find(
      (item) => item.word === searchWord.toUpperCase()
    );
  
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
  
    for (let row = 0; row < gridSize(); row++) {
      for (let col = 0; col <= gridSize() - searchWord.length; col++) {
        if (
          grid[row].slice(col, col + searchWord.length).join("") ===
          searchWord
        ) {
          setMessage(selectedWord.explanation);
          found = true;
          foundCoordinates = Array.from(
            { length: searchWord.length },
            (_, i) => [row, col + i]
          );
          break;
        }
      }
      if (found) break;
    }
  
    for (let col = 0; col < gridSize() && !found; col++) {
      for (let row = 0; row <= gridSize() - searchWord.length; row++) {
        if (
          grid
            .slice(row, row + searchWord.length)
            .map((row) => row[col])
            .join("") === searchWord
        ) {
          setMessage(selectedWord.explanation);
          found = true;
          foundCoordinates = Array.from(
            { length: searchWord.length },
            (_, i) => [row + i, col]
          );
          break;
        }
      }
      if (found) break;
    }
  
    if (found) {
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
      setFoundManually(foundManually+1);
  
      if (foundWords.length === 9) {
        setMessage("Congrats you found all the words!");
      }
    } else {
      setMessage(`Word "${searchWord}" not found.`);
    }
  
  };

  const setWords = () => {
    const newGrid = Array.from({ length: gridSize() }).map(() =>
      Array.from({ length: gridSize() }).fill("")
    );

    const occupiedPositions = new Set();

    selectedWords.forEach(({ word }) => {
      let direction = Math.random() < 0.5 ? "horizontal" : "vertical";

      let row, col;
      let foundPosition = false;
      while (!foundPosition) {
        if (direction === "horizontal") {
          row = Math.floor(Math.random() * gridSize());
          col = Math.floor(Math.random() * (gridSize() - word.length + 1));
        } else {
          row = Math.floor(Math.random() * (gridSize() - word.length + 1));
          col = Math.floor(Math.random() * gridSize());
        }

        let positionsOccupied = false;
        for (let i = 0; i < word.length; i++) {
          const newRow = direction === "horizontal" ? row : row + i;
          const newCol = direction === "horizontal" ? col + i : col;
          if (occupiedPositions.has(`${newRow},${newCol}`)) {
            positionsOccupied = true;
            break;
          }
        }

        if (!positionsOccupied) {
          for (let i = 0; i < word.length; i++) {
            const newRow = direction === "horizontal" ? row : row + i;
            const newCol = direction === "horizontal" ? col + i : col;
            newGrid[newRow][newCol] = word[i];
            occupiedPositions.add(`${newRow},${newCol}`);
          }
          foundPosition = true;
        }
      }
    });

    for (let row = 0; row < gridSize(); row++) {
      for (let col = 0; col < gridSize(); col++) {
        if (newGrid[row][col] === "") {
          newGrid[row][col] = String.fromCharCode(
            65 + Math.floor(Math.random() * 26)
          );
        }
      }
    }

    setGrid(newGrid);
  };

  const generateInitialGrid = () => {
    const initialGrid = Array.from({ length: gridSize() }).map(() =>
      Array.from({ length: gridSize() }).map(() =>
        String.fromCharCode(65 + Math.floor(Math.random() * 26))
      )
    );
    return initialGrid;
  };

  const generateSelectedWords = () => {
    let words = [];
    let l = 0;
    switch (difficulty) {
      case "easy":
        words = easyWords;
        l = 5;
        break;
      case "medium":
        words = mediumWords;
        l = 8;
        break;
      case "hard":
        l = 10;
        words = hardWords;
        break;
      default:
        words = easyWords;
    }

    const selected = [];

    while (selected.length < l) {
      const randomIndex = Math.floor(Math.random() * words.length);
      const { word, explanation } = words[randomIndex];
      if (!selected.find((item) => item.word === word)) {
        selected.push({ word, explanation });
      }
    }
    return selected;
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      checkWord();
    }
  };

  useEffect(() => {
    setWords();
  }, [selectedWords]);

  const handleSolutionButtonClick = () => {
    const currentWord = selectedWords[indexCounter].word.toUpperCase();
  
    if (!foundWords.includes(currentWord)) {
      setMessage(`${selectedWords[indexCounter].explanation}`);
      setFoundByButton(foundByButton + 1);
      setFoundWords([...foundWords, currentWord.toUpperCase()]);
  
      const updatedGrid = [...grid];
  
      selectedWords.slice(0, indexCounter + 1).forEach(({ word }) => {
        for (let row = 0; row < gridSize(); row++) {
          for (let col = 0; col < gridSize(); col++) {
            if (col + word.length <= gridSize()) {
              const horizontalWord = updatedGrid[row]
                .slice(col, col + word.length)
                .join("");
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
  
            if (row + word.length <= gridSize()) {
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
  
      setGrid(updatedGrid);
    } else {
      setMessage(`Word "${currentWord}" has already been found.`);
    }
    setIndexCounter(indexCounter + 1); // Update the index counter regardless
  };
  
  

  return (
    <div className="flex flex-col items-center justify-center h-screen w-screen">
      <h1 className="text-3xl mb-3">STOCK WORD SEARCH</h1>
      <div className="w-2/5">
        <div className="flex flex-col items-center">
          <div
            className={`grid grid-cols-${gridSize()} gap-1x md:gap-2x lg:gap-4px`}
          >
            {grid.map((row, rowIndex) => (
              <div key={rowIndex} className="flex">
                {row.map((cell, colIndex) => (
                  <div
                    key={colIndex}
                    className="w-6 h-6 border-2 border-black flex items-center justify-center text-theme"
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
          {found && <p className="mt-2 text-red">{found}</p>}
        </div>
        <SlidingPanel
          words={selectedWords}
          onSolutionButtonClick={handleSolutionButtonClick}
          indexCounter={indexCounter}
        />
      </div>
    </div>
  );
};

export default WordSearch

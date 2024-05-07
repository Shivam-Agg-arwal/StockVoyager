import React, { useState, useEffect } from "react";
import words from "../../../../../data/stockWords";

const WordSearch = () => {
  const [searchWord, setSearchWord] = useState("");
  const [message, setMessage] = useState("");
  const [grid, setGrid] = useState([]);
  const [initialGridSet, setInitialGridSet] = useState(false);
  const [foundWords, setFoundWords] = useState([]);
  const [selectedWords, setSelectedWords] = useState([]);

  // Generate the initial grid with random letters
  useEffect(() => {
    const initialGrid = Array.from({ length: 20 }).map(() =>
      Array.from({ length: 20 }).map(() =>
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
        const word = words[randomIndex];
        if (!selected.includes(word)) {
          selected.push(word);
        }
      }
      setSelectedWords(selected);
      console.log(selected)
    };

    generateSelectedWords();
  }, []);

  // Function to check if word exists in the grid
  const checkWord = () => {
    if (!searchWord) {
      setMessage("Please enter a word to search.");
      return;
    }

    if(!selectedWords.includes(searchWord.toUpperCase())){
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
    for (let row = 0; row < 20; row++) {
      for (let col = 0; col <= 20 - searchWord.length; col++) {
        if (
          grid[row].slice(col, col + searchWord.length).join("") === searchWord
        ) {
          setMessage(
            `Word "${searchWord}" found horizontally at row ${
              row + 1
            }, column ${col + 1}.`
          );
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

    // Vertical search
    for (let col = 0; col < 20 && !found; col++) {
      for (let row = 0; row <= 20 - searchWord.length; row++) {
        if (
          grid
            .slice(row, row + searchWord.length)
            .map((row) => row[col])
            .join("") === searchWord
        ) {
          setMessage(
            `Word "${searchWord}" found vertically at row ${row + 1}, column ${
              col + 1
            }.`
          );
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
    // Get selected words
    let newGrid = grid;

    let dict = {};

    selectedWords.forEach((word) => {
      let direction = Math.random() < 0.5 ? "horizontal" : "vertical";

      if (direction === "horizontal") {
        let foundPosition = false;
        let row, col;
        while (!foundPosition) {
          row = Math.floor(Math.random() * 20);
          col = Math.floor(Math.random() * (20 - word.length));

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

        // Making every key true
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
          row = Math.floor(Math.random() * (20 - word.length));
          col = Math.floor(Math.random() * 20);

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

        // Making every key true
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

  return (
    <div className="flex flex-col items-center justify-center h-screen w-screen ">
      <div className="grid grid-cols-20 gap-1x md:gap-[2x] lg:gap-[4px] border-2 p-2">
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
          setSearchWord(e.target.value.replace(/[^A-Za-z]/g, "").toUpperCase())
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
  );
};

export default WordSearch;

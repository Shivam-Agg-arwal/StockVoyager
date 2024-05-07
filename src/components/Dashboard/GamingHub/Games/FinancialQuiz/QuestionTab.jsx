import React, { useState } from 'react'
import toast from 'react-hot-toast';

const QuestionTab = ({ question, correctAnswer, explanation, options,showExplanation,setShowExplanation,optionsTouched,setOptionsTouched }) => {

    const HandleClick = (touched) => {
        if (showExplanation) return;
        const index = touched.charCodeAt(0) - 'A'.charCodeAt(0); // Convert option letter to array index
        const newOptionsTouched = [...optionsTouched];

        // If the touched option matches the correct answer, change the color to green and show explanation
        if (touched === correctAnswer) {
            setShowExplanation(true);
            toast.success("Correct 😍");

        }
        else{
            toast.error("Try Again 🔍")
        }

        // Set the touched state of the clicked option in the array
        newOptionsTouched[index] = true;
        setOptionsTouched(newOptionsTouched);
    }

    return (
        <div>
            <div>
                {/* Question */}

                <span> Question : </span> <span>{question}</span>
            </div>
            <div>
                {
                    options.map((option, index) => {
                        return (
                            <div
                                key={index}
                                className={`${optionsTouched[index] ? `${option.option===correctAnswer ? "text-[#00ff00]" : "text-[#ff0000]" }` : ""} cursor-pointer`} // Corrected the syntax here
                                onClick={() => HandleClick(option.option)}
                            >
                                {option.option} {option.text}
                            </div>
                        );

                    })
                }
            </div>
            <div>
                {showExplanation && <div>{explanation}</div>}
            </div>
        </div>
    )
}

export default QuestionTab
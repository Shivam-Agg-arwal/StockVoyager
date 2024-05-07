import React, { useState } from "react";
import { Questionnaire } from "../../../../../data/Quiz_Questions";
import QuestionTab from "./QuestionTab";

const FinancialQuiz = () => {
  const len=Questionnaire.length;
  const [questionNo,setQuestionNumber]=useState(Math.floor(Math.random()*23));
  const [showExplanation, setShowExplanation] = useState(false);
  const [optionsTouched, setOptionsTouched] = useState(Array(4).fill(null));


  const changeQuestion=()=>{
    let newQuestion=Math.floor(Math.random()*23);
    while(newQuestion===questionNo){
      newQuestion=Math.floor(Math.random()*23);
    }
    setQuestionNumber(newQuestion);
    setShowExplanation(false);
    console.log(Questionnaire[questionNo])
    setOptionsTouched(Array(4).fill(null));

  }
    return (
        <div >
          <QuestionTab question={Questionnaire[questionNo].question} correctAnswer={Questionnaire[questionNo].correctAnswer} explanation={Questionnaire[questionNo].explanation} options={Questionnaire[questionNo].options} showExplanation={showExplanation} setShowExplanation={setShowExplanation} optionsTouched={optionsTouched} setOptionsTouched={setOptionsTouched}/>
          <div onClick={()=>{changeQuestion()}} className="cursor-pointer">Next</div>
        </div>

    );
};

export default FinancialQuiz;

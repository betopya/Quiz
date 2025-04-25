import React from "react";

const Question = ({ questionData, handleAnswer, timeLeft }) => {
  return (
    <div className="question-container">
      <h2>{questionData.question}</h2>
      <div>
        {questionData.options.map((option, index) => (
          <button key={index} onClick={() => handleAnswer(option)} className="option-btn">
            {option}
          </button>
        ))}
      </div>
      <p>Time Left: {timeLeft}s</p>
    </div>
  );
};

export default Question;

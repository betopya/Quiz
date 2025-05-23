import React, { useState, useEffect } from "react";
import Question from "./Question";

const Quiz = () => {
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(15);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [feedback, setFeedback] = useState(""); 

  const questions = [
    {
      question: "What is the largest ocean on Earth?",
      options: ["Atlantic Ocean", "Indian Ocean", "Pacific Ocean", "Arctic Ocean"],
      correctAnswer: "Pacific Ocean",
    },
    {
      question: "Which planet has rings around it?",
      options: ["Mars", "Saturn", "Venus", "Mercury"],
      correctAnswer: "Saturn",
    },
    {
      question: "What is the capital of France?",
      options: ["Paris", "London", "Berlin", "Madrid"],
      correctAnswer: "Paris",
    },
    {
      question: "Who painted the Mona Lisa?",
      options: ["Vincent van Gogh", "Pablo Picasso", "Leonardo da Vinci", "Michelangelo"],
      correctAnswer: "Leonardo da Vinci",
    },
    {
      question: "What is the largest planet in our solar system?",
      options: ["Earth", "Jupiter", "Saturn", "Mars"],
      correctAnswer: "Jupiter",
    },
  ];



  useEffect(() => {
    if (timeLeft > 0 && !showResults) {
      const timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
      return () => clearInterval(timer);
    } else if (timeLeft === 0 && !showResults) {
      setFeedback("Time is up!"); 
      setTimeout(handleNextQuestion, 1000); 
    }
  }, [timeLeft, showResults]);

  const handleAnswer = (selectedAnswer) => {
    if (selectedAnswer === questions[questionIndex].correctAnswer) {
      setScore(score + 1);
      setFeedback("Correct! ✅");
    } else {
      setFeedback("Wrong! ❌");
    }

    setTimeout(handleNextQuestion, 1000); 
  };

  const handleNextQuestion = () => {
    setFeedback(""); 
    if (questionIndex < questions.length - 1) {
      setQuestionIndex(questionIndex + 1);
      setTimeLeft(15);
    } else {
      setShowResults(true);
    }
  };

  const restartQuiz = () => {
    setScore(0);
    setQuestionIndex(0);
    setShowResults(false);
    setTimeLeft(15);
    setFeedback("");
  };

  if (showResults) {
    return (
      <div className="quiz-container">
        <h2>Quiz Result</h2>
        <p>Score: {score}</p>
        <p>Correct Answers: {score}</p>
        <p>Wrong Answers: {questions.length - score}</p>
        <button onClick={restartQuiz}>Restart Quiz</button>
      </div>
    );
  }

  return (
    <div className="quiz-container">
      <h1>Quiz</h1>
      <Question questionData={questions[questionIndex]} handleAnswer={handleAnswer} timeLeft={timeLeft} />
      <p className="feedback">{feedback}</p>
    </div>
  );
};

export default Quiz;


import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import './Css/ResultPage.css';

const ResultPage = () => {
  const location = useLocation();
  const { score, totalQuestions, questions, userAnswers } = location.state || { score: 0, totalQuestions: 0, questions: [], userAnswers: [] };

  return (
    <div className="result-page">
      <h2>Test Result</h2>
      <p>You scored {score} out of {totalQuestions}</p>
      <h3>Correct Answers:</h3>
      <ul>
        {questions.map((question, index) => (
          <li key={index}>
            <strong>Q{index + 1}: {question.questionText}</strong>
            <p>Correct Answer: {question.answerOptions.find(option => option.isCorrect).answerText}</p>
            <p>Your Answer: {userAnswers[index]}</p>
          </li>
        ))}
      </ul>
      <Link to="/minitest">Retake Test</Link>
    </div>
  );
};

export default ResultPage;

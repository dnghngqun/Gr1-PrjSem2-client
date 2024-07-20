import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Css/Minitest.css";
import Footer from "./Footer";
import Navbar from "./Navbar";
const questions = [
  {
    questionText:
      "Which of the following sentences is in the present perfect tense?",
    answerOptions: [
      { answerText: "She has visited Japan.", isCorrect: true },
      { answerText: "She visited Japan.", isCorrect: false },
      { answerText: "She will visit Japan.", isCorrect: false },
      { answerText: "She visits Japan.", isCorrect: false },
    ],
  },
  {
    questionText:
      'Choose the correct form of the verb to complete the sentence: "If I ___ you, I would apologize."',
    answerOptions: [
      { answerText: "am", isCorrect: false },
      { answerText: "was", isCorrect: false },
      { answerText: "were", isCorrect: true },
      { answerText: "will be", isCorrect: false },
    ],
  },
  {
    questionText: "Which sentence is an example of passive voice?",
    answerOptions: [
      { answerText: "The chef cooks the meal.", isCorrect: false },
      { answerText: "The meal is cooked by the chef.", isCorrect: true },
      { answerText: "The chef will cook the meal.", isCorrect: false },
      { answerText: "The chef has cooked the meal.", isCorrect: false },
    ],
  },
  {
    questionText:
      'What is the correct form of the adjective in the sentence: "This book is ___ than that one."',
    answerOptions: [
      { answerText: "more interesting", isCorrect: true },
      { answerText: "most interesting", isCorrect: false },
      { answerText: "interestingly", isCorrect: false },
      { answerText: "interested", isCorrect: false },
    ],
  },
  {
    questionText:
      'Which word correctly completes the sentence: "Neither the teacher ___ the students knew the answer."',
    answerOptions: [
      { answerText: "nor", isCorrect: true },
      { answerText: "or", isCorrect: false },
      { answerText: "and", isCorrect: false },
      { answerText: "but", isCorrect: false },
    ],
  },
  {
    questionText: "What is the capital of France?",
    answerOptions: [
      { answerText: "New York", isCorrect: false },
      { answerText: "London", isCorrect: false },
      { answerText: "Paris", isCorrect: true },
      { answerText: "Dublin", isCorrect: false },
    ],
  },
  {
    questionText: "Who is CEO of Tesla?",
    answerOptions: [
      { answerText: "Jeff Bezos", isCorrect: false },
      { answerText: "Elon Musk", isCorrect: true },
      { answerText: "Bill Gates", isCorrect: false },
      { answerText: "Tony Stark", isCorrect: false },
    ],
  },
  // Câu hỏi ngữ pháp tiếng Anh
  {
    questionText:
      "Which of the following sentences is in the present perfect tense?",
    answerOptions: [
      { answerText: "She has visited Japan.", isCorrect: true },
      { answerText: "She visited Japan.", isCorrect: false },
      { answerText: "She will visit Japan.", isCorrect: false },
      { answerText: "She visits Japan.", isCorrect: false },
    ],
  },
  {
    questionText:
      'Choose the correct form of the verb to complete the sentence: "If I ___ you, I would apologize."',
    answerOptions: [
      { answerText: "am", isCorrect: false },
      { answerText: "was", isCorrect: false },
      { answerText: "were", isCorrect: true },
      { answerText: "will be", isCorrect: false },
    ],
  },
  {
    questionText: "Which sentence is an example of passive voice?",
    answerOptions: [
      { answerText: "The chef cooks the meal.", isCorrect: false },
      { answerText: "The meal is cooked by the chef.", isCorrect: true },
      { answerText: "The chef will cook the meal.", isCorrect: false },
      { answerText: "The chef has cooked the meal.", isCorrect: false },
    ],
  },
];

const Minitest = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [timeLeft, setTimeLeft] = useState(60); // 60 giây cho mỗi câu hỏi
  const [isLoggedIn, setIsLoggedIn] = useState(true); // Trạng thái đăng nhập
  const [userAnswers, setUserAnswers] = useState([]); // Lưu câu trả lời của người dùng
  const navigate = useNavigate();

  useEffect(() => {
    if (timeLeft === 0) {
      handleNextQuestion();
    }
    const timer =
      timeLeft > 0 && setInterval(() => setTimeLeft(timeLeft - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  const handleAnswerOptionClick = (isCorrect, answerText) => {
    if (isCorrect) {
      setScore(score + 1);
      setFeedback("Correct!");
    } else {
      setFeedback("Incorrect!");
    }
    setUserAnswers([...userAnswers, answerText]); // Lưu câu trả lời của người dùng
    setTimeout(() => {
      handleNextQuestion();
    }, 1000);
  };

  const handleNextQuestion = () => {
    setFeedback("");
    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
      setTimeLeft(60);
    } else {
      setShowScore(true);
    }
  };

  useEffect(() => {
    if (showScore) {
      navigate("/result", {
        state: {
          score,
          totalQuestions: questions.length,
          questions,
          userAnswers,
        },
      });
    }
  }, [showScore, navigate, score]);

  const onLogout = () => {
    setIsLoggedIn(false);
    // Thêm một số hành động khác nếu cần
  };
  return (
    <div className="ahihi">
      <Navbar isLoggedIn={isLoggedIn} onLogout={onLogout} />
      {showScore ? (
        <div className="score-section">
          You scored {score} out of {questions.length}
        </div>
      ) : (
        <>
          <div className="akelo">
            <div className="question-section">
              <div className="question-count">
                <span>Question {currentQuestion + 1}</span>/{questions.length}
              </div>
              <div className="question-text">
                {questions[currentQuestion].questionText}
              </div>
            </div>
            <div className="answer-section">
              {questions[currentQuestion].answerOptions.map(
                (answerOption, index) => (
                  <button
                    key={index}
                    onClick={() =>
                      handleAnswerOptionClick(
                        answerOption.isCorrect,
                        answerOption.answerText
                      )
                    }>
                    {answerOption.answerText}
                  </button>
                )
              )}
            </div>
            <div className="timer-section">Time left: {timeLeft}s</div>
          </div>
        </>
      )}
      <Footer />
    </div>
  );
};

export default Minitest;

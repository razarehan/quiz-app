import { useState } from 'react'
import QUESTIONS from '../questions.js'
import quizCompleteIcon from '../assets/quiz-complete.png'

export default function Quiz() {
  const [userAnswers, setUserAnswers] = useState([]);
  const activatedQuestionIndex = userAnswers.length;
  const quizIsComplete = activatedQuestionIndex === QUESTIONS.length;

  function handleSelectedAnswer(answer) {
    setUserAnswers((prevAnswer) => {
      return [...prevAnswer, answer];
    });
  }

  if(quizIsComplete) {
    return <>
      <div id="summary">
        <img src={quizCompleteIcon} alt="Quiz completed" />
        <h2>Quiz completed!</h2>
      </div>
    </>
  }

  const shuffledAnswers = [...QUESTIONS[activatedQuestionIndex].answers];
  shuffledAnswers.sort(() => Math.random() - 0.5);

  return <>
    <div id="quiz">
      <div className="question">
        <h2>{QUESTIONS[activatedQuestionIndex].text}</h2>
        <ul id="answers">
          {shuffledAnswers.map((answer) => (
            <li key={answer} className='answer'>
              <button onClick={() => handleSelectedAnswer(answer)}>{answer}</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  </>
}
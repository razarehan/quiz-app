import { useCallback, useState } from 'react'
import QUESTIONS from '../questions.js'
import quizCompleteIcon from '../assets/quiz-complete.png'
import QuestionTimer from './QuestionTimer.jsx';

export default function Quiz() {
  const [userAnswers, setUserAnswers] = useState([]);
  const activatedQuestionIndex = userAnswers.length;
  const quizIsComplete = activatedQuestionIndex === QUESTIONS.length;

  const handleSelectedAnswer = useCallback(function handleSelectedAnswer(answer) {
    setUserAnswers((prevAnswer) => {
      return [...prevAnswer, answer];
    });
  }, []);

  const handleSkipAnswer = useCallback(()=>{
    handleSelectedAnswer(null)
  }, [handleSelectedAnswer]);

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
      <QuestionTimer key={activatedQuestionIndex} timeout={10000} onTimeout={handleSkipAnswer}/>
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
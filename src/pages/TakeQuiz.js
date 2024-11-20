import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function TakeQuiz() {
  const { quizId } = useParams();
  const [quizData, setQuizData] = useState(null);
  const [userAnswers, setUserAnswers] = useState([]);

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/quiz/${quizId}`);
        setQuizData(response.data);
      } catch (error) {
        console.error('Ошибка при загрузке квиза:', error);
      }
    };
    fetchQuiz();
  }, [quizId]);

  const handleAnswerSelect = (questionIndex, answerIndex) => {
    const updatedAnswers = [...userAnswers];
    updatedAnswers[questionIndex] = answerIndex;
    setUserAnswers(updatedAnswers);
  };

  const handleSubmit = async () => {
    try {
      await axios.post(`http://localhost:8080/quiz/${quizId}/submit`, {
        answers: userAnswers,
      });
      alert('Ответы отправлены!');
    } catch (error) {
      console.error('Ошибка при отправке ответов:', error);
    }
  };

  return (
    <div>
      <h1>{quizData?.title}</h1>
      {quizData?.questions.map((question, questionIndex) => (
        <div key={questionIndex}>
          <p>{question.questionText}</p>
          {question.answers.map((answer, answerIndex) => (
            <label key={answerIndex}>
              <input
                type="radio"
                name={`question-${questionIndex}`}
                checked={userAnswers[questionIndex] === answerIndex}
                onChange={() => handleAnswerSelect(questionIndex, answerIndex)}
              />
              {answer.answerText}
            </label>
          ))}
        </div>
      ))}
      <button onClick={handleSubmit}>Отправить ответы</button>
    </div>
  );
}

export default TakeQuiz;

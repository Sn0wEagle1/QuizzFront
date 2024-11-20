import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getQuizById } from '../services/api';

function QuizDetail() {
  const { quizId } = useParams();
  const [quiz, setQuiz] = useState(null);

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const response = await getQuizById(quizId);
        console.log("Полученные данные квиза:", response.data); // Проверяем, что приходит с сервера
        setQuiz(response.data);
      } catch (error) {
        console.error('Ошибка при загрузке квиза', error);
      }
    };
    fetchQuiz();
  }, [quizId]);
  

  if (!quiz) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{quiz.title}</h1>
      <ul>
        {quiz.questions.map((question) => (
          <li key={question.id}>
            <h3>{question.questionText}</h3>
            <ul>
              {question.answers.map((answer) => (
                <li key={answer.id}>
                  {answer.answerText} - {answer.correct ? 'Correct' : 'Wrong'}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default QuizDetail;

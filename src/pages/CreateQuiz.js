import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

function CreateQuiz({ initialData }) {
  const { quizId } = useParams();
  const [title, setTitle] = useState(initialData?.title || '');
  const [questions, setQuestions] = useState(
    initialData?.questions || [{ questionText: '', answers: [{ answerText: '', correct: false }] }]
  );
  const navigate = useNavigate();

  useEffect(() => {
    if (quizId && !initialData) {
      const fetchQuiz = async () => {
        try {
          const response = await axios.get(`http://localhost:8080/quiz/${quizId}`, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
          });
          setTitle(response.data.title);
          setQuestions(response.data.questions);
        } catch (error) {
          console.error('Ошибка при загрузке квиза:', error);
        }
      };
      fetchQuiz();
    }
  }, [quizId, initialData]);

  const handleTitleChange = (e) => setTitle(e.target.value);

  const handleQuestionChange = (index, e) => {
    const updatedQuestions = questions.map((question, i) =>
      i === index ? { ...question, questionText: e.target.value } : question
    );
    setQuestions(updatedQuestions);
  };

  const handleAnswerChange = (questionIndex, answerIndex, e) => {
    const updatedQuestions = questions.map((question, qIndex) => {
      if (qIndex === questionIndex) {
        const updatedAnswers = question.answers.map((answer, aIndex) =>
          aIndex === answerIndex ? { ...answer, answerText: e.target.value } : answer
        );
        return { ...question, answers: updatedAnswers };
      }
      return question;
    });
    setQuestions(updatedQuestions);
  };

  const handleCorrectToggle = (questionIndex, answerIndex) => {
    const updatedQuestions = questions.map((question, qIndex) => {
      if (qIndex === questionIndex) {
        const updatedAnswers = question.answers.map((answer, aIndex) =>
          aIndex === answerIndex ? { ...answer, correct: !answer.correct } : answer
        );
        return { ...question, answers: updatedAnswers };
      }
      return question;
    });
    setQuestions(updatedQuestions);
  };

  const addQuestion = () => {
    setQuestions([...questions, { questionText: '', answers: [{ answerText: '', correct: false }] }]);
  };

  const addAnswer = (questionIndex) => {
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].answers.push({ answerText: '', correct: false });
    setQuestions(updatedQuestions);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    // Проверка на пустые поля (игнорируя пробелы)
    const hasEmptyFields = !title.trim() || questions.some((question) =>
      !question.questionText.trim() || question.answers.some((answer) => !answer.answerText.trim())
    );

    if (hasEmptyFields) {
      alert('Все поля должны быть заполнены.');
      return;
    }

    const requestData = {
      title: title.trim(),
      questions: questions.map((question) => ({
        questionText: question.questionText.trim(),
        answers: question.answers.map((answer) => ({
          answerText: answer.answerText.trim(),
          correct: answer.correct,
        })),
      })),
    };

    try {
      const response = await axios({
        method: quizId ? 'put' : 'post',
        url: quizId ? `http://localhost:8080/quiz/${quizId}` : 'http://localhost:8080/quiz',
        data: requestData,
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.status === 200 || response.status === 201) {
        navigate('/quizzes');
      }
    } catch (error) {
      console.error('Ошибка при сохранении квиза:', error);
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>{quizId ? 'Редактировать квиз' : 'Создать новый квиз'}</h1>
      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.formGroup}>
          <label style={styles.label}>Название квиза:</label>
          <input type="text" value={title} onChange={handleTitleChange} style={styles.input} required />
        </div>

        {questions.map((question, questionIndex) => (
          <div key={questionIndex} style={styles.questionContainer}>
            <label style={styles.label}>Вопрос {questionIndex + 1}:</label>
            <input
              type="text"
              value={question.questionText}
              onChange={(e) => handleQuestionChange(questionIndex, e)}
              style={styles.input}
              required
            />

            {question.answers.map((answer, answerIndex) => (
              <div key={answerIndex} style={styles.answerContainer}>
                <input
                  type="text"
                  value={answer.answerText}
                  onChange={(e) => handleAnswerChange(questionIndex, answerIndex, e)}
                  placeholder="Вариант ответа"
                  style={styles.input}
                  required
                />
                <label style={styles.checkboxLabel}>
                  <input
                    type="checkbox"
                    checked={answer.correct}
                    onChange={() => handleCorrectToggle(questionIndex, answerIndex)}
                  />
                  Правильный ответ
                </label>
              </div>
            ))}
            <button type="button" onClick={() => addAnswer(questionIndex)} style={styles.addButton}>Добавить ответ</button>
          </div>
        ))}

        <button type="button" onClick={addQuestion} style={styles.addButton}>Добавить вопрос</button>
        <button type="submit" style={styles.submitButton}>
          {quizId ? 'Сохранить изменения' : 'Создать квиз'}
        </button>
      </form>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: '600px',
    margin: '0 auto',
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
  },
  title: {
    fontSize: '28px',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: '20px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  formGroup: {
    marginBottom: '20px',
  },
  label: {
    fontSize: '16px',
    fontWeight: 'bold',
  },
  input: {
    width: '100%',
    padding: '10px',
    marginTop: '5px',
    marginBottom: '15px',
    fontSize: '16px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    boxSizing: 'border-box',
  },
  questionContainer: {
    border: '1px solid #ddd',
    padding: '15px',
    borderRadius: '8px',
    marginBottom: '20px',
  },
  answerContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    marginBottom: '10px',
  },
  checkboxLabel: {
    fontSize: '14px',
  },
  addButton: {
    backgroundColor: '#4CAF50',
    color: 'white',
    padding: '10px 20px',
    fontSize: '14px',
    fontWeight: 'bold',
    borderRadius: '5px',
    cursor: 'pointer',
    border: 'none',
    marginTop: '10px',
  },
  submitButton: {
    backgroundColor: '#4CAF50',
    color: 'white',
    padding: '10px 20px',
    fontSize: '16px',
    fontWeight: 'bold',
    borderRadius: '5px',
    cursor: 'pointer',
    border: 'none',
    marginTop: '20px',
    alignSelf: 'center', // Центрирование кнопки
  },
};



export default CreateQuiz;

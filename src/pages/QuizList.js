import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import editIcon from '../assets/edit.png'; 
import deleteIcon from '../assets/delete.png'; 

function QuizList() {
  const [quizzes, setQuizzes] = useState([]);

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:8080/quiz', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setQuizzes(response.data);
      } catch (error) {
        console.error('Ошибка при загрузке квизов', error);
      }
    };
    fetchQuizzes();
  }, []);

  const handleDelete = async (quizId) => {
    const token = localStorage.getItem('token');
    try {
      const response = await axios.delete(`http://localhost:8080/quiz/${quizId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        console.log('Квиз успешно удален');
        // добавить логику удаления
      }
    } catch (error) {
      console.error('Ошибка при удалении квиза:', error);
      if (error.response && error.response.status === 500) {
        console.error('Серверная ошибка');
      }
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Список квизов</h1>
      <div style={styles.buttonContainer}>
        <Link to="/create-quiz" style={styles.button}>Создать Квиз</Link>
      </div>
  
      {quizzes.length > 0 ? (
        <div style={styles.quizList}>
          {quizzes.map((quiz) => (
            <div key={quiz.id} style={styles.quizItem}>
              <Link to={`/quizzes/${quiz.id}`} style={styles.quizLink}>{quiz.title}</Link>
              <div style={styles.iconContainer}>
                <Link to={`/edit-quiz/${quiz.id}`} style={styles.icon}>
                  <img src={editIcon} alt="Редактировать" style={styles.iconImage} />
                </Link>
                <button
                  onClick={() => handleDelete(quiz.id)}
                  style={styles.icon}
                >
                  <img src={deleteIcon} alt="Удалить" style={styles.iconImage} />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p style={styles.noQuizText}>Нет доступных квизов</p>
      )}
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
    color: '#333',
    textAlign: 'center',
    marginBottom: '20px',
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'center',
    gap: '20px',
    marginBottom: '20px',
  },
  button: {
    padding: '10px 20px',
    backgroundColor: '#4CAF50',
    color: 'white',
    textDecoration: 'none',
    borderRadius: '5px',
    fontSize: '16px',
    fontWeight: 'bold',
  },
  quizList: {
    display: 'grid',
    gap: '15px',
  },
  quizItem: {
    padding: '15px',
    backgroundColor: '#f9f9f9',
    borderRadius: '8px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    fontSize: '18px',
    color: '#333',
    textAlign: 'center',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  quizLink: {
    textDecoration: 'none',
    color: '#333',
    fontSize: '18px',
    fontWeight: 'bold',
  },
  iconContainer: {
    display: 'flex',
    gap: '10px',
  },
  icon: {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
  },
  iconImage: {
    width: '20px',
    height: '20px',
  },
  noQuizText: {
    textAlign: 'center',
    color: '#666',
    fontSize: '18px',
  },
};

export default QuizList;

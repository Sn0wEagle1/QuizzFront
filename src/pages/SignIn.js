import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function SignIn() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Проверка на заполненность полей
    if (!username || !password) {
      setErrorMessage('Заполните все поля');
      return;
    }

    try {
      const response = await axios.post('http://localhost:8080/auth/sign-in', {
        username,
        password,
      });
      localStorage.setItem('token', response.data.token);
      navigate('/quizzes'); // Переход к списку квизов
    } catch (error) {
      console.error('Ошибка авторизации', error);
      setErrorMessage('Неверный логин или пароль'); // установить сообщение об ошибке
    }
  };

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      {errorMessage && <div style={styles.error}>{errorMessage}</div>}
      <input
        type="text"
        placeholder="Имя пользователя"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        style={styles.input}
      />
      <input
        type="password"
        placeholder="Пароль"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={styles.input}
      />
      <button type="submit" style={styles.button}>
        Авторизироваться
      </button>
    </form>
  );
}

const styles = {
  form: {
    display: 'flex',
    flexDirection: 'column',
    width: '300px',
    margin: '0 auto',
  },
  input: {
    marginBottom: '10px',
    padding: '10px',
  },
  button: {
    padding: '10px',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    cursor: 'pointer',
  },
  error: {
    color: 'red',
    marginBottom: '10px',
    padding: '10px',
    backgroundColor: '#f8d7da',
    border: '1px solid #f5c6cb',
    borderRadius: '5px',
    textAlign: 'center',
  },
};

export default SignIn;

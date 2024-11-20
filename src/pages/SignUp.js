import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function SignUp() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post('http://localhost:8080/auth/sign-up', { username, email, password });
      navigate('/sign-in');
    } catch (error) {
      if (error.response && error.response.data) {
        const errors = error.response.data;
        
        // Показываем первое сообщение об ошибке, если несколько
        const firstError = errors.message || errors.username || errors.email || errors.password;
        const { error: errorTitle, description } = error.response.data;
        setErrorMessage(firstError || description || errorTitle);
      } else {
        const secondError = error.response;
        console.log(secondError);
        setErrorMessage('Ошибка регистрации. Попробуйте снова.');
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      {/* Общая ошибка, отображаемая в верхней части */}
      {errorMessage && <div style={styles.error}>{errorMessage}</div>}

      {/* Поле для имени пользователя */}
      <div style={styles.fieldContainer}>
        <input
          type="text"
          placeholder="Имя пользователя"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={styles.input}
        />
      </div>

      {/* Поле для email */}
      <div style={styles.fieldContainer}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={styles.input}
        />
      </div>

      {/* Поле для пароля */}
      <div style={styles.fieldContainer}>
        <input
          type="password"
          placeholder="Пароль"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={styles.input}
        />
      </div>

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
  fieldContainer: {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: '10px',
  },
  input: {
    padding: '10px',
    fontSize: '14px',
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

export default SignUp;

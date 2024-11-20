import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Добро пожаловать в редактор квизов!</h1>
      <p style={styles.text}>
        Создавайте свои квизы. Если вам нужно собрать информацию или провести викторину в короткие сроки, то вы в нужном месте!
      </p>

      <div style={styles.buttonsContainer}>
        <Link to="/sign-up" style={styles.link}>
          <button style={styles.button}>Зарегистрироваться</button>
        </Link>
        <Link to="/sign-in" style={styles.link}>
          <button style={styles.button}>Авторизироваться</button>
        </Link>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    backgroundColor: '#f5f5f5',
  },
  header: {
    fontSize: '3rem',
    marginBottom: '20px',
    color: '#333',
  },
  text: {
    fontSize: '1.5rem',
    textAlign: 'center',
    maxWidth: '600px',
    color: '#555',
  },
  buttonsContainer: {
    marginTop: '30px',
    display: 'flex',
    gap: '20px',
  },
  button: {
    padding: '10px 20px',
    fontSize: '1.2rem',
    borderRadius: '5px',
    border: 'none',
    cursor: 'pointer',
    backgroundColor: '#007bff',
    color: 'white',
  },
  link: {
    textDecoration: 'none',
  }
};

export default Home;

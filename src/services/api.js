import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080',
  headers: {
    Authorization: `Bearer ${localStorage.getItem('token')}`
  }
});

export const getQuizzes = () => api.get('/quiz');
export const getQuizById = (quizId) => api.get(`/quiz/${quizId}`);
export const createQuiz = (quizData) => api.post('/quiz', quizData);
export const addQuestionToQuiz = (quizId, questionData) =>
  api.post(`/quiz/${quizId}`, questionData);

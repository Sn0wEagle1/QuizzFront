import React from 'react';
import { Routes, Route } from 'react-router-dom'; 
import Home from './pages/Home';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import QuizList from './pages/QuizList';
import QuizDetail from './pages/QuizDetail';
import CreateQuiz from './pages/CreateQuiz';
import PrivateRoute from './components/PrivateRoute';
import TakeQuiz from './pages/TakeQuiz';

function App() {
  return (
    <div className="App">
      <Routes>  
        <Route path="/" element={<Home />} />  
        <Route path="/sign-in" element={<SignIn />} />  
        <Route path="/sign-up" element={<SignUp />} />  
        <Route path="/quizzes" element={<PrivateRoute><QuizList /></PrivateRoute>} />  
        <Route path="/quiz/:quizId" element={<PrivateRoute><QuizDetail /></PrivateRoute>} />  
        <Route path="/create-quiz" element={<PrivateRoute><CreateQuiz /></PrivateRoute>} /> {/* Добавляем маршрут создания квиза */}
        <Route path="/edit-quiz/:quizId" element={<PrivateRoute><CreateQuiz /></PrivateRoute>} />
        <Route path="/take-quiz/:quizId" element={<TakeQuiz />} />
      </Routes>
    </div>
  );
}

export default App;

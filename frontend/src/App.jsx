import React from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Books from './components/Books';
import Landing from './components/Landing';
import Header from './components/Header';
import styles from './App.module.css';

function App() {
  const [token, setToken] = React.useState(localStorage.getItem('token'));
  const navigate = useNavigate();

  const handleLogin = (token) => {
    setToken(token);
    localStorage.setItem('token', token);
    navigate('/books');
  };

  const handleLogout = () => {
    setToken(null);
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <div className={styles.appBg}>
      <Header token={token} onLogout={handleLogout} />
      <div className={styles.container}>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/books" element={token ? <Books token={token} /> : <Navigate to="/login" />} />
          <Route path="*" element={<Navigate to={token ? "/books" : "/"} />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;

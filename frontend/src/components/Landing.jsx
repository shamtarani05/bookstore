import React from 'react';
import styles from './Landing.module.css';
import { useNavigate } from 'react-router-dom';

const Landing = () => {
  const navigate = useNavigate();
  return (
    <div className={styles.landing}>
      <h1>Welcome to BookStore</h1>
      <p className={styles.subtitle}>Your personal library manager. Register, login, and manage your books with ease!</p>
      <button className={styles.cta} onClick={() => navigate('/register')}>Get Started</button>
    </div>
  );
};

export default Landing; 
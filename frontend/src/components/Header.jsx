import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import styles from './Header.module.css';

const Header = ({ token, onLogout }) => {
  const navigate = useNavigate();
  return (
    <header className={styles.header}>
      <div className={styles.logo} onClick={() => navigate('/')}>BookStore</div>
      <nav className={styles.nav}>
        <NavLink to="/" className={({ isActive }) => isActive ? styles.active : ''}>Home</NavLink>
        {token && <NavLink to="/books" className={({ isActive }) => isActive ? styles.active : ''}>View Books</NavLink>}
        {token && <NavLink to="/books#add" className={({ isActive }) => isActive ? styles.active : ''}>Add Book</NavLink>}
        {!token && <NavLink to="/login" className={({ isActive }) => isActive ? styles.active : ''}>Login</NavLink>}
        {!token && <NavLink to="/register" className={({ isActive }) => isActive ? styles.active : ''}>Register</NavLink>}
        {token && <button className={styles.logout} onClick={onLogout}>Logout</button>}
      </nav>
    </header>
  );
};

export default Header; 
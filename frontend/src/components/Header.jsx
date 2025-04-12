import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/Header.css';

const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="header">
      <div className="header-content">
        <div className="logo">
          <Link to="/">AutoBooking</Link>
        </div>

        <nav className="nav-links">
          <Link to="/">Inicio</Link>
          <Link to="/vehicles">Vehículos</Link>
          {user && <Link to="/my-bookings">Mis Reservas</Link>}
          <Link to="/contact">Contacto</Link>
        </nav>

        <div className="auth-section">
          {user ? (
            <div className="user-info">
              <span className="welcome-text">Hola, {user.firstName}</span>
              <div className="avatar">{user.firstName.charAt(0)}</div>
              {user.isAdmin && (
                <Link to="/admin" className="admin-link">Administración</Link>
              )}
              <button onClick={handleLogout} className="logout-button">
                Cerrar sesión
              </button>
            </div>
          ) : (
            <div className="auth-buttons">
              <Link to="/register" className="register-button">Crear cuenta</Link>
              <Link to="/login" className="login-button">Iniciar sesión</Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header; 
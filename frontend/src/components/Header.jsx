import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import '../styles/Header.css';

const Header = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    // Si estamos en la ruta de admin, redirigir a home
    if (window.location.pathname.startsWith('/admin')) {
      navigate('/');
    }
  };

  const getInitials = (name) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <header className="header">
      <div className="header-content">
        <Link to="/" className="logo">
          AutoBooking
        </Link>

        <nav className="nav-links">
          <Link to="/">Inicio</Link>
          <Link to="/vehicles">Vehículos</Link>
          {user && <Link to="/my-bookings">Mis Reservas</Link>}
          <Link to="/contact">Contacto</Link>
          {user && user.role === 'ADMIN' && (
            <Link to="/admin">Administración</Link>
          )}
        </nav>

        <div className="auth-section">
          {user ? (
            <div className="user-info">
              <span className="welcome-message">
                Hola, {user.firstName}
              </span>
              <div className="user-avatar">
                {getInitials(`${user.firstName} ${user.lastName}`)}
              </div>
              <button onClick={handleLogout} className="logout-button">
                Cerrar sesión
              </button>
            </div>
          ) : (
            <>
              <Link to="/register" className="register-button">
                Registrarse
              </Link>
              <Link to="/login" className="login-button">
                Iniciar sesión
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header; 
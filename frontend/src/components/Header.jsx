import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <header className="header">
      <div className="header-content">
        <Link to="/" className="logo">
          AutoBooking
        </Link>
        <nav className="nav">
          <Link to="/">Inicio</Link>
          <Link to="/vehiculos">Vehículos</Link>
          <Link to="/reservas">Mis Reservas</Link>
          <Link to="/contacto">Contacto</Link>
        </nav>
        <div className="auth-buttons">
          <Link to="/login" className="btn btn-outline">Iniciar Sesión</Link>
          <Link to="/register" className="btn btn-primary">Registrarse</Link>
        </div>
      </div>
    </header>
  );
}

export default Header; 
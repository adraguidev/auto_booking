import { Link } from 'react-router-dom';

function Header() {
  return (
    <header className="header">
      <div className="header-content">
        <h1>
          <Link to="/" className="logo">Reserva de Autos</Link>
        </h1>
        <nav>
          <Link to="/" className="nav-link">Inicio</Link>
          <Link to="/admin" className="nav-link">Panel de Administración</Link>
          {/* Estos enlaces se activarán en el Sprint 2 */}
          <Link to="/login" className="nav-link disabled">Iniciar Sesión</Link>
          <Link to="/register" className="nav-link disabled">Registrarse</Link>
        </nav>
      </div>
    </header>
  );
}

export default Header; 
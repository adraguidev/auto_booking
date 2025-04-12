import { Link } from 'react-router-dom';
import logoPlaceholder from '../assets/logo-placeholder.png';

function Header() {
  return (
    <header className="header">
      <div className="header-content">
        <div className="header-left">
          <Link to="/" className="logo-container">
            <img src={logoPlaceholder} alt="ReservaAutos Logo" className="logo-image" />
            <h1 className="logo-text">ReservaAutos</h1>
          </Link>
          <span className="slogan">Tu auto ideal a un clic de distancia</span>
        </div>
        
        <nav className="header-right">
          <Link to="/register" className="nav-button register">Crear cuenta</Link>
          <Link to="/login" className="nav-button login">Iniciar sesión</Link>
        </nav>
      </div>
    </header>
  );
}

export default Header; 
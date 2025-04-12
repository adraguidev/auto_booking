import { Link } from 'react-router-dom';

function Header() {
  return (
    <header className="header">
      <nav>
        <Link to="/">Inicio</Link>
        <Link to="/admin">Panel de Administración</Link>
      </nav>
    </header>
  );
}

export default Header; 
import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-left">
          <Link to="/" className="footer-logo">
            AutoBooking
          </Link>
          <p className="copyright">
            © {currentYear} AutoBooking. Todos los derechos reservados.
          </p>
        </div>
        
        <div className="footer-right">
          <div className="footer-links">
            <Link to="/terminos">Términos y condiciones</Link>
            <Link to="/privacidad">Política de privacidad</Link>
            <Link to="/contacto">Contacto</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer; 
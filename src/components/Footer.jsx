import React from 'react';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>AutoBooking</h3>
          <p>Tu plataforma confiable para alquiler de autos</p>
        </div>
        <div className="footer-section">
          <h3>Contacto</h3>
          <p>Email: info@autobooking.com</p>
          <p>Teléfono: +123 456 7890</p>
        </div>
        <div className="footer-section">
          <h3>Legal</h3>
          <p>Términos y condiciones</p>
          <p>Política de privacidad</p>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2024 AutoBooking. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
}

export default Footer; 
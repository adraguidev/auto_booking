import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/LoginPage.css';

const LoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState('');
  const [infoMessage, setInfoMessage] = useState('');

  useEffect(() => {
    // Mostrar mensaje de registro exitoso si viene de RegisterPage
    if (location.state?.message) {
      setInfoMessage(location.state.message);
    }
    // Mostrar mensaje especial si viene de intento de reserva
    if (location.state?.fromReserve) {
      setInfoMessage('Debes iniciar sesión para realizar una reserva. Si no tienes cuenta, por favor regístrate.');
    }
  }, [location.state]);

  const validateForm = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.email.trim()) {
      newErrors.email = 'El email es requerido';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'El email no tiene un formato válido';
    }
    if (!formData.password) {
      newErrors.password = 'La contraseña es requerida';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError('');

    if (!validateForm()) {
      return;
    }

    try {
      const response = await fetch('http://localhost:8080/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('token', data.token);
        login({
          firstName: data.user.firstName,
          isAdmin: data.user.isAdmin,
          token: data.token
        });

        // Redirigir según el origen
        if (location.state?.fromReserve) {
          navigate(`/reserve/${location.state.productId}`);
        } else {
          navigate('/');
        }
      } else {
        const data = await response.json();
        setSubmitError(data.message || 'Error al iniciar sesión');
      }
    } catch (error) {
      setSubmitError('No se pudo iniciar sesión. Intenta más tarde.');
    }
  };

  return (
    <div className="login-container">
      <h2>Iniciar sesión</h2>
      {infoMessage && <div className="info-message">{infoMessage}</div>}
      {submitError && <div className="error-message">{submitError}</div>}
      <form onSubmit={handleSubmit} className="login-form">
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={errors.email ? 'error' : ''}
          />
          {errors.email && <span className="error-text">{errors.email}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="password">Contraseña</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className={errors.password ? 'error' : ''}
          />
          {errors.password && <span className="error-text">{errors.password}</span>}
        </div>

        <button type="submit" className="submit-button">Iniciar sesión</button>
      </form>

      <p className="register-link">
        ¿No tienes cuenta? <Link to="/register">Regístrate</Link>
      </p>
    </div>
  );
};

export default LoginPage; 
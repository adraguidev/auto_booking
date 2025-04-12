import React, { useState, useEffect } from 'react';
import { Routes, Route, NavLink } from 'react-router-dom';
import ProductListAdmin from '../components/admin/ProductListAdmin';
import AddProductForm from '../components/admin/AddProductForm';
import EditProductForm from '../components/admin/EditProductForm';
import CategoryManagement from '../components/admin/CategoryManagement';
import FeatureManagement from '../components/admin/FeatureManagement';
import UserManagement from '../components/admin/UserManagement';
import '../styles/AdminPanel.css';

const AdminPanel = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (isMobile) {
    return (
      <div className="admin-mobile-warning">
        <h2>Panel de Administración no disponible en dispositivos móviles</h2>
        <p>Por favor, accede desde un ordenador para gestionar el contenido.</p>
      </div>
    );
  }

  return (
    <div className="admin-container">
      <nav className="admin-menu">
        <NavLink to="/admin" end className={({ isActive }) => isActive ? 'active' : ''}>
          Inicio
        </NavLink>
        <NavLink to="/admin/products" className={({ isActive }) => isActive ? 'active' : ''}>
          Productos
        </NavLink>
        <NavLink to="/admin/categories" className={({ isActive }) => isActive ? 'active' : ''}>
          Categorías
        </NavLink>
        <NavLink to="/admin/features" className={({ isActive }) => isActive ? 'active' : ''}>
          Características
        </NavLink>
        <NavLink to="/admin/users" className={({ isActive }) => isActive ? 'active' : ''}>
          Usuarios
        </NavLink>
      </nav>

      <div className="admin-content">
        <Routes>
          <Route path="/" element={<div>Bienvenido al panel de administración</div>} />
          <Route path="/products" element={<ProductListAdmin />} />
          <Route path="/products/add" element={<AddProductForm />} />
          <Route path="/products/edit/:id" element={<EditProductForm />} />
          <Route path="/categories" element={<CategoryManagement />} />
          <Route path="/features" element={<FeatureManagement />} />
          <Route path="/users" element={<UserManagement />} />
        </Routes>
      </div>
    </div>
  );
};

export default AdminPanel; 
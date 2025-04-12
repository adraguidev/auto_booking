import React from 'react';
import { Routes, Route, Link, NavLink, Outlet } from 'react-router-dom';
import '../styles/AdminPanel.css';

const AdminPanel = () => {
  // Verificar si es dispositivo móvil
  if (window.innerWidth < 768) {
    return (
      <div className="admin-mobile-warning">
        El panel de administración no está disponible en dispositivos móviles.
      </div>
    );
  }

  return (
    <div className="admin-container">
      <nav className="admin-menu">
        <NavLink to="products" className={({ isActive }) => isActive ? 'active' : ''}>
          Lista de Productos
        </NavLink>
        <NavLink to="products/new" className={({ isActive }) => isActive ? 'active' : ''}>
          Agregar Producto
        </NavLink>
        <NavLink to="categories" className={({ isActive }) => isActive ? 'active' : ''}>
          Categorías
        </NavLink>
        <NavLink to="features" className={({ isActive }) => isActive ? 'active' : ''}>
          Características
        </NavLink>
        <NavLink to="users" className={({ isActive }) => isActive ? 'active' : ''}>
          Usuarios
        </NavLink>
      </nav>
      <div className="admin-content">
        <Routes>
          <Route path="products" element={<ProductListAdmin />} />
          <Route path="products/new" element={<AddProductForm />} />
          <Route path="products/:id/edit" element={<EditProductForm />} />
          <Route path="categories" element={<CategoryManagement />} />
          <Route path="features" element={<FeatureManagement />} />
          <Route path="users" element={<UserManagement />} />
          <Route path="" element={<h3>Bienvenido al panel de administración</h3>} />
        </Routes>
      </div>
    </div>
  );
};

export default AdminPanel; 
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/AdminPanel.css';

const ProductListAdmin = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/products', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        setProducts(data);
      } else {
        setError('Error al cargar los productos');
      }
    } catch (error) {
      setError('Error de conexión');
    }
  };

  const handleDelete = async (id, name) => {
    if (window.confirm(`¿Deseas eliminar el producto "${name}"?`)) {
      try {
        const response = await fetch(`http://localhost:8080/api/products/${id}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });

        if (response.ok) {
          setProducts(products.filter(product => product.id !== id));
        } else {
          alert('Error al eliminar el producto');
        }
      } catch (error) {
        alert('Error de conexión');
      }
    }
  };

  return (
    <div>
      <h2>Lista de Productos</h2>
      {error && <div className="error-message">{error}</div>}
      <table className="admin-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {products.map(product => (
            <tr key={product.id}>
              <td>{product.id}</td>
              <td>{product.name}</td>
              <td>
                <Link to={`/admin/products/${product.id}/edit`} className="action-button edit-button">
                  Editar
                </Link>
                <button
                  onClick={() => handleDelete(product.id, product.name)}
                  className="action-button delete-button"
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductListAdmin; 
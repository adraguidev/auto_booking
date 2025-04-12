import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../styles/AdminPanel.css';

const EditProductForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [features, setFeatures] = useState([]);
  const [selectedFeatures, setSelectedFeatures] = useState([]);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    imageUrl: '',
    location: '',
    categoryId: ''
  });

  useEffect(() => {
    fetchProduct();
    fetchCategories();
    fetchFeatures();
  }, [id]);

  const fetchProduct = async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/products/${id}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      if (response.ok) {
        const data = await response.json();
        setFormData({
          name: data.name,
          description: data.description || '',
          imageUrl: data.imageUrl || '',
          location: data.location || '',
          categoryId: data.category?.id || ''
        });
        setSelectedFeatures(data.features?.map(f => f.id) || []);
      } else {
        setError('Error al cargar el producto');
      }
    } catch (error) {
      setError('Error de conexión');
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/categories', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      if (response.ok) {
        const data = await response.json();
        setCategories(data);
      }
    } catch (error) {
      setError('Error al cargar categorías');
    }
  };

  const fetchFeatures = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/features', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      if (response.ok) {
        const data = await response.json();
        setFeatures(data);
      }
    } catch (error) {
      setError('Error al cargar características');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFeatureToggle = (featureId) => {
    setSelectedFeatures(prev => {
      if (prev.includes(featureId)) {
        return prev.filter(id => id !== featureId);
      } else {
        return [...prev, featureId];
      }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!formData.name.trim()) {
      setError('El nombre es requerido');
      return;
    }

    try {
      const productData = {
        ...formData,
        features: selectedFeatures.map(id => ({ id }))
      };

      const response = await fetch(`http://localhost:8080/api/products/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(productData)
      });

      if (response.ok) {
        navigate('/admin/products');
      } else {
        const data = await response.json();
        setError(data.message || 'Error al actualizar el producto');
      }
    } catch (error) {
      setError('Error de conexión');
    }
  };

  return (
    <div>
      <h2>Editar Producto</h2>
      {error && <div className="error-message">{error}</div>}
      <form onSubmit={handleSubmit} className="admin-form">
        <div className="form-group">
          <label htmlFor="name">Nombre</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Descripción</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="imageUrl">URL de la Imagen</label>
          <input
            type="url"
            id="imageUrl"
            name="imageUrl"
            value={formData.imageUrl}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="location">Ubicación</label>
          <input
            type="text"
            id="location"
            name="location"
            value={formData.location}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="categoryId">Categoría</label>
          <select
            id="categoryId"
            name="categoryId"
            value={formData.categoryId}
            onChange={handleChange}
          >
            <option value="">Seleccionar categoría</option>
            {categories.map(category => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Características</label>
          <div className="checkbox-group">
            {features.map(feature => (
              <div key={feature.id} className="checkbox-item">
                <input
                  type="checkbox"
                  id={`feature-${feature.id}`}
                  checked={selectedFeatures.includes(feature.id)}
                  onChange={() => handleFeatureToggle(feature.id)}
                />
                <label htmlFor={`feature-${feature.id}`}>
                  {feature.name}
                </label>
              </div>
            ))}
          </div>
        </div>

        <button type="submit" className="submit-button">
          Actualizar Producto
        </button>
      </form>
    </div>
  );
};

export default EditProductForm; 
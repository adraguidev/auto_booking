import React, { useState, useEffect } from 'react';
import ProductList from '../components/ProductList';
import CategoryList from '../components/CategoryList';
import '../styles/HomePage.css';

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [activeCategoryFilter, setActiveCategoryFilter] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/products');
      if (response.ok) {
        const data = await response.json();
        setProducts(data);
        setFilteredProducts(data);
      } else {
        setError('Error al cargar los productos');
      }
    } catch (error) {
      setError('Error de conexión');
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/categories');
      if (response.ok) {
        const data = await response.json();
        setCategories(data);
      } else {
        setError('Error al cargar las categorías');
      }
    } catch (error) {
      setError('Error de conexión');
    }
  };

  const handleCategoryFilter = (categoryId) => {
    if (categoryId === activeCategoryFilter) {
      // Si se hace clic en la categoría activa, quitar el filtro
      setFilteredProducts(products);
      setActiveCategoryFilter(null);
    } else {
      // Aplicar filtro por categoría
      const filtered = products.filter(product => 
        product.category && product.category.id === categoryId
      );
      setFilteredProducts(filtered);
      setActiveCategoryFilter(categoryId);
    }
  };

  const clearFilter = () => {
    setFilteredProducts(products);
    setActiveCategoryFilter(null);
  };

  if (loading) {
    return <div className="loading">Cargando...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="home-page">
      <div className="filters-section">
        <CategoryList 
          categories={categories}
          activeCategory={activeCategoryFilter}
          onCategoryClick={handleCategoryFilter}
        />
        {activeCategoryFilter && (
          <button className="clear-filter" onClick={clearFilter}>
            Limpiar filtro
          </button>
        )}
      </div>
      <div className="products-section">
        <h2>Productos {activeCategoryFilter ? 'filtrados' : 'disponibles'}</h2>
        <p className="product-count">
          Mostrando {filteredProducts.length} de {products.length} productos
        </p>
        <ProductList products={filteredProducts} />
      </div>
    </div>
  );
};

export default HomePage; 
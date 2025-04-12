import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../styles/ProductDetailPage.css';

function ProductDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/products/${id}`);
        if (!response.ok) {
          throw new Error('Error al cargar el producto');
        }
        const data = await response.json();
        // Agregamos imágenes de ejemplo para la galería
        const productWithGallery = {
          ...data,
          images: [
            data.imageUrl,
            data.imageUrl,
            data.imageUrl,
            data.imageUrl,
            data.imageUrl
          ]
        };
        setProduct(productWithGallery);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) return <div className="loading">Cargando producto...</div>;
  if (error) return <div className="error">Error: {error}</div>;
  if (!product) return <div className="no-product">Producto no encontrado</div>;

  return (
    <div className="product-detail">
      <div className="product-header">
        <h1>{product.name}</h1>
        {product.category && (
          <span className="product-category">{product.category.name}</span>
        )}
      </div>

      <div className="product-content">
        <div className="product-image">
          {product.imageUrl ? (
            <img src={product.imageUrl} alt={product.name} />
          ) : (
            <div className="image-placeholder">Sin imagen</div>
          )}
        </div>

        <div className="product-info">
          <div className="product-description">
            <h2>Descripción</h2>
            <p>{product.description || 'No hay descripción disponible'}</p>
          </div>

          {product.features && product.features.length > 0 && (
            <div className="product-features">
              <h2>Características</h2>
              <ul className="features-list">
                {product.features.map(feature => (
                  <li key={feature.id} className="feature-item">
                    <i className={feature.icon || 'fas fa-check'}></i>
                    <span>{feature.name}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {product.location && (
            <div className="product-location">
              <h2>Ubicación</h2>
              <p>{product.location}</p>
            </div>
          )}
        </div>
      </div>

      <div className="product-detail-header">
        <button onClick={() => navigate(-1)} className="back-button">
          ← Volver
        </button>
        <h2 className="product-title">{product.name}</h2>
      </div>

      <div className="product-gallery">
        <div className="main-image">
          <img src={product.images[0]} alt={product.name} />
        </div>
        <div className="gallery-thumbnails">
          {product.images.slice(1, 5).map((image, index) => (
            <div key={index} className="thumbnail">
              <img src={image} alt={`${product.name} - Vista ${index + 2}`} />
            </div>
          ))}
        </div>
        <button 
          className="view-more-button"
          onClick={() => setShowModal(true)}
        >
          Ver más
        </button>
      </div>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button 
              className="close-modal"
              onClick={() => setShowModal(false)}
            >
              ×
            </button>
            <div className="modal-gallery">
              {product.images.map((image, index) => (
                <div key={index} className="modal-image">
                  <img src={image} alt={`${product.name} - Vista ${index + 1}`} />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductDetailPage; 
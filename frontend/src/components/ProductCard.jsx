import React from 'react';
import { Link } from 'react-router-dom';

function ProductCard({ product }) {
  return (
    <Link to={`/product/${product.id}`} className="product-card">
      <div className="product-image-container">
        <img 
          src={product.imageUrl || 'https://via.placeholder.com/300x200'} 
          alt={product.name}
          className="product-image"
        />
      </div>
      <div className="product-info">
        <h3 className="product-name">{product.name}</h3>
        {product.category && (
          <p className="product-category">{product.category}</p>
        )}
      </div>
    </Link>
  );
}

export default ProductCard; 
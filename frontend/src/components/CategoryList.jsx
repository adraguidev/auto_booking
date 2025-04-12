import React from 'react';
import '../styles/CategoryList.css';

const CategoryList = ({ categories, activeCategory, onCategoryClick }) => {
  return (
    <div className="category-list">
      <h3>Categorías</h3>
      <div className="categories-grid">
        {categories.map(category => (
          <button
            key={category.id}
            className={`category-item ${activeCategory === category.id ? 'active' : ''}`}
            onClick={() => onCategoryClick(category.id)}
          >
            <span className="category-name">{category.name}</span>
            {category.productCount && (
              <span className="product-count">({category.productCount})</span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoryList; 
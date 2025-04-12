import React from 'react';

function CategoryList() {
  const categories = [
    'Sedán',
    'SUV',
    'Deportivo',
    'Familiar',
    'Económico'
  ];

  return (
    <div className="category-list">
      <h2>Categorías</h2>
      <div className="categories-grid">
        {categories.map((category, index) => (
          <div key={index} className="category-card">
            {category}
          </div>
        ))}
      </div>
    </div>
  );
}

export default CategoryList; 
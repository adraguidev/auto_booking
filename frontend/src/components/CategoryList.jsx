import React from 'react';

function CategoryList() {
  const categories = [
    {
      id: 1,
      name: 'Sedán',
      icon: '🚗',
      description: 'Autos cómodos y elegantes'
    },
    {
      id: 2,
      name: 'SUV',
      icon: '🚙',
      description: 'Vehiculos espaciosos y versátiles'
    },
    {
      id: 3,
      name: 'Deportivo',
      icon: '🏎️',
      description: 'Autos de alto rendimiento'
    },
    {
      id: 4,
      name: 'Económico',
      icon: '🚘',
      description: 'Opciones accesibles'
    }
  ];

  return (
    <section className="categories-section">
      <h2 className="section-title">Explora por categoría</h2>
      <div className="categories-grid">
        {categories.map((category) => (
          <div key={category.id} className="category-card">
            <div className="category-icon">{category.icon}</div>
            <h3 className="category-name">{category.name}</h3>
            <p className="category-description">{category.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default CategoryList; 
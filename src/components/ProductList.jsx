import React from 'react';

function ProductList() {
  const products = [
    {
      id: 1,
      name: 'Toyota Corolla',
      price: 1500,
      image: 'https://via.placeholder.com/300x200',
      category: 'Sedán'
    },
    {
      id: 2,
      name: 'Honda CR-V',
      price: 2000,
      image: 'https://via.placeholder.com/300x200',
      category: 'SUV'
    },
    {
      id: 3,
      name: 'Ford Mustang',
      price: 2500,
      image: 'https://via.placeholder.com/300x200',
      category: 'Deportivo'
    }
  ];

  return (
    <div className="product-list">
      <h2>Recomendados</h2>
      <div className="products-grid">
        {products.map((product) => (
          <div key={product.id} className="product-card">
            <img src={product.image} alt={product.name} />
            <h3>{product.name}</h3>
            <p className="price">${product.price}/día</p>
            <p className="category">{product.category}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductList; 
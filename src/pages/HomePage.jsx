import React from 'react';
import SearchBar from '../components/SearchBar';
import CategoryList from '../components/CategoryList';
import ProductList from '../components/ProductList';

function HomePage() {
  return (
    <main className="home-container">
      <section className="search-section">
        <SearchBar />
      </section>
      
      <section className="categories-section">
        <CategoryList />
      </section>
      
      <section className="products-section">
        <ProductList />
      </section>
    </main>
  );
}

export default HomePage; 
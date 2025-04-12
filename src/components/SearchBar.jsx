import React from 'react';

function SearchBar() {
  return (
    <div className="search-bar">
      <input 
        type="text" 
        placeholder="Buscar autos..." 
        className="search-input"
      />
      <button className="search-button">Buscar</button>
    </div>
  );
}

export default SearchBar; 
import React from 'react';

function SearchBar() {
  return (
    <div className="search-container">
      <h2 className="search-title">Encuentra el auto perfecto para tu viaje</h2>
      <div className="search-form">
        <div className="search-field">
          <label htmlFor="location">¿Dónde buscas?</label>
          <input
            type="text"
            id="location"
            placeholder="Ciudad o palabra clave"
            className="search-input"
          />
        </div>
        
        <div className="search-field">
          <label htmlFor="startDate">Fecha de inicio</label>
          <input
            type="date"
            id="startDate"
            className="search-input"
          />
        </div>
        
        <div className="search-field">
          <label htmlFor="endDate">Fecha de fin</label>
          <input
            type="date"
            id="endDate"
            className="search-input"
          />
        </div>
        
        <button className="search-button">
          Buscar autos
        </button>
      </div>
    </div>
  );
}

export default SearchBar; 
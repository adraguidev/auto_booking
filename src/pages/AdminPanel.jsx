import { useState, useEffect } from 'react';
import api from '../services/api';

function AdminPanel() {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    name: '',
    description: '',
    imageUrl: '',
    location: ''
  });

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await api.get('/products');
        setProducts(response.data);
      } catch (error) {
        console.error('Error al cargar los productos:', error);
      }
    };

    fetchProducts();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/products', newProduct);
      setNewProduct({
        name: '',
        description: '',
        imageUrl: '',
        location: ''
      });
      // Recargar la lista de productos
      const response = await api.get('/products');
      setProducts(response.data);
    } catch (error) {
      console.error('Error al crear el producto:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/products/${id}`);
      setProducts(products.filter(product => product.id !== id));
    } catch (error) {
      console.error('Error al eliminar el producto:', error);
    }
  };

  return (
    <div className="admin-panel">
      <h1>Panel de Administración</h1>
      
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nombre"
          value={newProduct.name}
          onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
        />
        <input
          type="text"
          placeholder="Descripción"
          value={newProduct.description}
          onChange={(e) => setNewProduct({...newProduct, description: e.target.value})}
        />
        <input
          type="text"
          placeholder="URL de la imagen"
          value={newProduct.imageUrl}
          onChange={(e) => setNewProduct({...newProduct, imageUrl: e.target.value})}
        />
        <input
          type="text"
          placeholder="Ubicación"
          value={newProduct.location}
          onChange={(e) => setNewProduct({...newProduct, location: e.target.value})}
        />
        <button type="submit">Agregar Producto</button>
      </form>

      <div className="products-list">
        {products.map((product) => (
          <div key={product.id} className="product-item">
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <button onClick={() => handleDelete(product.id)}>Eliminar</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminPanel; 
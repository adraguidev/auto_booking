const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const initAdmin = require('./scripts/initAdmin');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Conexión a MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/autobooking')
  .then(() => {
    console.log('Conectado a MongoDB');
    // Inicializar usuario administrador después de la conexión
    initAdmin();
  })
  .catch(err => console.error('Error conectando a MongoDB:', err));

// Rutas
app.use('/api', require('./routes'));

// Manejo de errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Algo salió mal!' });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
}); 
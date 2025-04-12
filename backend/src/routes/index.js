const express = require('express');
const router = express.Router();
const productRoutes = require('./productRoutes');
const categoryRoutes = require('./categoryRoutes');

// Rutas de productos
router.use('/products', productRoutes);

// Rutas de categorías
router.use('/categories', categoryRoutes);

module.exports = router; 
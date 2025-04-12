const express = require('express');
const router = express.Router();
const productRoutes = require('./productRoutes');
const categoryRoutes = require('./categoryRoutes');
const authRoutes = require('./authRoutes');
const userRoutes = require('./userRoutes');
const { authMiddleware, adminMiddleware } = require('../config/security');

// Rutas públicas
router.use('/auth', authRoutes);
router.use('/products', productRoutes);
router.use('/categories', categoryRoutes);

// Rutas protegidas
router.use('/admin/products', authMiddleware, adminMiddleware, productRoutes);
router.use('/admin/categories', authMiddleware, adminMiddleware, categoryRoutes);
router.use('/users', userRoutes);

module.exports = router; 
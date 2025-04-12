const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { authMiddleware, adminMiddleware } = require('../config/security');

// Aplicar middleware de autenticación y admin a todas las rutas
router.use(authMiddleware, adminMiddleware);

// Rutas de gestión de usuarios
router.get('/', userController.getAllUsers);
router.put('/:id/admin', userController.setAdminStatus);

module.exports = router; 
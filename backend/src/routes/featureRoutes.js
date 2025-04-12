const express = require('express');
const router = express.Router();
const featureController = require('../controllers/featureController');
const { authMiddleware, adminMiddleware } = require('../middleware/security');

// Aplicar middleware de autenticación y admin a todas las rutas
router.use(authMiddleware, adminMiddleware);

// Rutas para características
router.get('/', featureController.getAllFeatures);
router.get('/:id', featureController.getFeatureById);
router.post('/', featureController.createFeature);
router.put('/:id', featureController.updateFeature);
router.delete('/:id', featureController.deleteFeature);

module.exports = router; 
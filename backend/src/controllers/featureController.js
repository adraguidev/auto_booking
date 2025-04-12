const featureService = require('../services/featureService');

// Obtener todas las características
exports.getAllFeatures = async (req, res) => {
  try {
    const features = await featureService.getAllFeatures();
    res.json(features);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener características' });
  }
};

// Obtener una característica por ID
exports.getFeatureById = async (req, res) => {
  try {
    const feature = await featureService.getFeatureById(req.params.id);
    res.json(feature);
  } catch (error) {
    if (error.name === 'FeatureNotFoundError') {
      res.status(404).json({ message: error.message });
    } else {
      res.status(500).json({ message: 'Error al obtener característica' });
    }
  }
};

// Crear una nueva característica
exports.createFeature = async (req, res) => {
  try {
    const { name, icon } = req.body;
    const feature = await featureService.createFeature(name, icon);
    res.status(201).json(feature);
  } catch (error) {
    if (error.name === 'FeatureNameTakenError') {
      res.status(400).json({ message: error.message });
    } else {
      res.status(500).json({ message: 'Error al crear característica' });
    }
  }
};

// Actualizar una característica
exports.updateFeature = async (req, res) => {
  try {
    const feature = await featureService.updateFeature(req.params.id, req.body);
    res.json(feature);
  } catch (error) {
    if (error.name === 'FeatureNotFoundError') {
      res.status(404).json({ message: error.message });
    } else if (error.name === 'FeatureNameTakenError') {
      res.status(400).json({ message: error.message });
    } else {
      res.status(500).json({ message: 'Error al actualizar característica' });
    }
  }
};

// Eliminar una característica
exports.deleteFeature = async (req, res) => {
  try {
    await featureService.deleteFeature(req.params.id);
    res.status(204).send();
  } catch (error) {
    if (error.name === 'FeatureNotFoundError') {
      res.status(404).json({ message: error.message });
    } else if (error.message.includes('en uso')) {
      res.status(400).json({ message: error.message });
    } else {
      res.status(500).json({ message: 'Error al eliminar característica' });
    }
  }
}; 
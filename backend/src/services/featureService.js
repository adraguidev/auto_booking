const Feature = require('../models/Feature');
const Product = require('../models/Product');

class FeatureNotFoundError extends Error {
  constructor(message) {
    super(message);
    this.name = 'FeatureNotFoundError';
  }
}

class FeatureNameTakenError extends Error {
  constructor(message) {
    super(message);
    this.name = 'FeatureNameTakenError';
  }
}

class FeatureService {
  async createFeature(name, icon) {
    // Verificar si ya existe una característica con el mismo nombre
    const existingFeature = await Feature.findOne({ name });
    if (existingFeature) {
      throw new FeatureNameTakenError('Ya existe una característica con ese nombre');
    }

    const feature = new Feature({ name, icon });
    return await feature.save();
  }

  async getAllFeatures() {
    return await Feature.find();
  }

  async getFeatureById(id) {
    const feature = await Feature.findById(id);
    if (!feature) {
      throw new FeatureNotFoundError('Característica no encontrada');
    }
    return feature;
  }

  async deleteFeature(id) {
    const feature = await Feature.findById(id);
    if (!feature) {
      throw new FeatureNotFoundError('Característica no encontrada');
    }

    // Verificar si hay productos que usan esta característica
    const productsWithFeature = await Product.countDocuments({ features: id });
    if (productsWithFeature > 0) {
      throw new Error('No se puede eliminar la característica porque está en uso por productos');
    }

    await feature.deleteOne();
  }

  async updateFeature(id, updates) {
    const feature = await Feature.findById(id);
    if (!feature) {
      throw new FeatureNotFoundError('Característica no encontrada');
    }

    if (updates.name) {
      // Verificar si el nuevo nombre ya existe
      const existingFeature = await Feature.findOne({ name: updates.name });
      if (existingFeature && existingFeature._id.toString() !== id) {
        throw new FeatureNameTakenError('Ya existe una característica con ese nombre');
      }
      feature.name = updates.name;
    }

    if (updates.icon) {
      feature.icon = updates.icon;
    }

    return await feature.save();
  }
}

module.exports = new FeatureService(); 
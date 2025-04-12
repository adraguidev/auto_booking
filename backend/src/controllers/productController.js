const productService = require('../services/productService');

// Obtener todos los productos
exports.getAllProducts = async (req, res) => {
  try {
    const products = await productService.getAllProducts();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Obtener un producto por ID
exports.getProductById = async (req, res) => {
  try {
    const product = await productService.getProductById(req.params.id);
    res.json(product);
  } catch (error) {
    if (error.name === 'ProductNotFoundError') {
      res.status(404).json({ message: error.message });
    } else {
      res.status(500).json({ message: error.message });
    }
  }
};

// Crear un nuevo producto
exports.createProduct = async (req, res) => {
  try {
    const productData = {
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      category: req.body.category,
      images: req.body.images,
      features: req.body.features,
      availability: req.body.availability
    };

    const product = await productService.addProduct(productData);
    res.status(201).json(product);
  } catch (error) {
    if (error.message.includes('Ya existe') || error.message.includes('no existe')) {
      res.status(400).json({ message: error.message });
    } else {
      res.status(500).json({ message: error.message });
    }
  }
};

// Actualizar un producto
exports.updateProduct = async (req, res) => {
  try {
    const updates = {
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      category: req.body.category,
      images: req.body.images,
      features: req.body.features,
      availability: req.body.availability
    };

    const product = await productService.updateProduct(req.params.id, updates);
    res.json(product);
  } catch (error) {
    if (error.name === 'ProductNotFoundError') {
      res.status(404).json({ message: error.message });
    } else if (error.message.includes('Ya existe') || error.message.includes('no existe')) {
      res.status(400).json({ message: error.message });
    } else {
      res.status(500).json({ message: error.message });
    }
  }
};

// Eliminar un producto
exports.deleteProduct = async (req, res) => {
  try {
    await productService.deleteProduct(req.params.id);
    res.status(204).send();
  } catch (error) {
    if (error.name === 'ProductNotFoundError') {
      res.status(404).json({ message: error.message });
    } else {
      res.status(500).json({ message: error.message });
    }
  }
}; 
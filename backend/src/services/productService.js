const Product = require('../models/Product');
const Category = require('../models/Category');

class ProductNotFoundError extends Error {
  constructor(message) {
    super(message);
    this.name = 'ProductNotFoundError';
  }
}

class ProductService {
  async addProduct(productData) {
    // Verificar si ya existe un producto con el mismo nombre
    const existingProduct = await Product.findOne({ name: productData.name });
    if (existingProduct) {
      throw new Error('Ya existe un producto con ese nombre');
    }

    // Si se proporciona una categoría, verificar que existe
    if (productData.category) {
      const category = await Category.findById(productData.category);
      if (!category) {
        throw new Error('La categoría especificada no existe');
      }
    }

    const product = new Product(productData);
    return await product.save();
  }

  async updateProduct(id, updates) {
    const product = await Product.findById(id);
    if (!product) {
      throw new ProductNotFoundError('Producto no encontrado');
    }

    // Verificar duplicado de nombre si se está cambiando
    if (updates.name && updates.name !== product.name) {
      const existingProduct = await Product.findOne({ name: updates.name });
      if (existingProduct) {
        throw new Error('Ya existe un producto con ese nombre');
      }
      product.name = updates.name;
    }

    // Actualizar categoría si se proporciona
    if (updates.category) {
      const category = await Category.findById(updates.category);
      if (!category) {
        throw new Error('La categoría especificada no existe');
      }
      product.category = updates.category;
    }

    // Actualizar otros campos si se proporcionan
    if (updates.description) product.description = updates.description;
    if (updates.price) product.price = updates.price;
    if (updates.images) product.images = updates.images;
    if (updates.features) product.features = updates.features;
    if (updates.availability !== undefined) product.availability = updates.availability;

    return await product.save();
  }

  async getAllProducts() {
    return await Product.find().populate('category', 'name');
  }

  async getProductById(id) {
    const product = await Product.findById(id).populate('category', 'name');
    if (!product) {
      throw new ProductNotFoundError('Producto no encontrado');
    }
    return product;
  }

  async deleteProduct(id) {
    const product = await Product.findById(id);
    if (!product) {
      throw new ProductNotFoundError('Producto no encontrado');
    }
    await product.deleteOne();
  }
}

module.exports = new ProductService(); 
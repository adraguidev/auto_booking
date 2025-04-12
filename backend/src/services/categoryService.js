const Category = require('../models/Category');
const Product = require('../models/Product');

class CategoryInUseError extends Error {
  constructor(message) {
    super(message);
    this.name = 'CategoryInUseError';
  }
}

class CategoryService {
  async createCategory(name) {
    // Verificar si ya existe una categoría con el mismo nombre
    const existingCategory = await Category.findOne({ name });
    if (existingCategory) {
      throw new Error('Ya existe una categoría con ese nombre');
    }

    const category = new Category({ name });
    return await category.save();
  }

  async getAllCategories() {
    return await Category.find().select('name _id');
  }

  async deleteCategory(id) {
    // Verificar si la categoría existe
    const category = await Category.findById(id);
    if (!category) {
      throw new Error('Categoría no encontrada');
    }

    // Verificar si hay productos asociados
    const products = await Product.find({ category: id });
    if (products.length > 0) {
      throw new CategoryInUseError(
        'No se puede eliminar la categoría porque hay productos asociados. Por favor reasígnelos o elimínelos primero.'
      );
    }

    await Category.findByIdAndDelete(id);
  }
}

module.exports = new CategoryService(); 
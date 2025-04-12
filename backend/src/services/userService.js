const User = require('../models/User');
const bcrypt = require('bcryptjs');

class EmailAlreadyTakenError extends Error {
  constructor(message) {
    super(message);
    this.name = 'EmailAlreadyTakenError';
  }
}

class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = 'ValidationError';
  }
}

class UserNotFoundError extends Error {
  constructor(message) {
    super(message);
    this.name = 'UserNotFoundError';
  }
}

class LastAdminError extends Error {
  constructor(message) {
    super(message);
    this.name = 'LastAdminError';
  }
}

class UserService {
  async registerUser(userData) {
    // Validaciones básicas
    this.validateUserData(userData);

    // Verificar email único
    const existingUser = await User.findOne({ email: userData.email });
    if (existingUser) {
      throw new EmailAlreadyTakenError('El email ya está en uso');
    }

    // Crear nuevo usuario
    const user = new User({
      firstName: userData.firstName,
      lastName: userData.lastName,
      email: userData.email,
      password: userData.password,
      isAdmin: false
    });

    await user.save();
    return user;
  }

  async loginUser(email, password) {
    const user = await User.findOne({ email });
    if (!user) {
      throw new ValidationError('Credenciales inválidas');
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      throw new ValidationError('Credenciales inválidas');
    }

    return user;
  }

  async getAllUsers() {
    return await User.find().select('-password');
  }

  async setAdminStatus(userId, isAdmin, requestingUserId) {
    const user = await User.findById(userId);
    if (!user) {
      throw new UserNotFoundError('Usuario no encontrado');
    }

    // Verificar si es el último admin intentando quitarse el rol
    if (!isAdmin && userId === requestingUserId) {
      const adminCount = await User.countDocuments({ isAdmin: true });
      if (adminCount <= 1) {
        throw new LastAdminError('No puede revocar su propio rol de administrador siendo el último admin');
      }
    }

    user.isAdmin = isAdmin;
    await user.save();
    return user;
  }

  validateUserData(userData) {
    const errors = [];

    // Validar nombre
    if (!userData.firstName || userData.firstName.trim().length < 2) {
      errors.push('El nombre debe tener al menos 2 caracteres');
    }

    // Validar apellido
    if (!userData.lastName || userData.lastName.trim().length < 2) {
      errors.push('El apellido debe tener al menos 2 caracteres');
    }

    // Validar email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!userData.email || !emailRegex.test(userData.email)) {
      errors.push('El email no tiene un formato válido');
    }

    // Validar contraseña
    if (!userData.password || userData.password.length < 6) {
      errors.push('La contraseña debe tener al menos 6 caracteres');
    }

    if (errors.length > 0) {
      throw new ValidationError(errors.join(', '));
    }
  }
}

module.exports = new UserService(); 
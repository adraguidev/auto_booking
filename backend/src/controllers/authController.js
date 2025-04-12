const User = require('../models/User');
const userService = require('../services/userService');
const { generateToken } = require('../config/security');

// Registro de usuario
exports.register = async (req, res) => {
  try {
    const userData = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: req.body.password
    };

    const user = await userService.registerUser(userData);

    res.status(201).json({
      message: 'Usuario registrado exitosamente',
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        isAdmin: user.isAdmin
      }
    });
  } catch (error) {
    if (error.name === 'EmailAlreadyTakenError') {
      res.status(400).json({ message: error.message });
    } else if (error.name === 'ValidationError') {
      res.status(400).json({ message: error.message });
    } else {
      res.status(500).json({ message: 'Error al registrar usuario' });
    }
  }
};

// Login de usuario
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await userService.loginUser(email, password);
    const token = generateToken(user);

    res.json({
      token,
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        isAdmin: user.isAdmin
      }
    });
  } catch (error) {
    if (error.name === 'ValidationError') {
      res.status(401).json({ message: error.message });
    } else {
      res.status(500).json({ message: 'Error al iniciar sesión' });
    }
  }
};

// Obtener usuario actual
exports.getCurrentUser = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-password');
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener usuario' });
  }
}; 
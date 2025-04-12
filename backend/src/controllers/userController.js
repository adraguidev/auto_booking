const userService = require('../services/userService');
const { authMiddleware, adminMiddleware } = require('../config/security');

// Listar todos los usuarios
exports.getAllUsers = async (req, res) => {
  try {
    const users = await userService.getAllUsers();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener usuarios' });
  }
};

// Cambiar estado de administrador
exports.setAdminStatus = async (req, res) => {
  try {
    const { isAdmin } = req.body;
    const userId = req.params.id;
    const requestingUserId = req.user._id;

    const user = await userService.setAdminStatus(userId, isAdmin, requestingUserId);
    res.json({
      id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      isAdmin: user.isAdmin
    });
  } catch (error) {
    if (error.name === 'UserNotFoundError') {
      res.status(404).json({ message: error.message });
    } else if (error.name === 'LastAdminError') {
      res.status(400).json({ message: error.message });
    } else {
      res.status(500).json({ message: 'Error al actualizar rol de administrador' });
    }
  }
}; 
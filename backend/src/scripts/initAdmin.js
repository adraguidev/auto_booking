const User = require('../models/User');
const bcrypt = require('bcryptjs');

async function initAdmin() {
  try {
    const adminEmail = 'admin@autobooking.com';
    const adminExists = await User.findOne({ email: adminEmail });

    if (!adminExists) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash('admin123', salt);

      const admin = new User({
        firstName: 'Admin',
        lastName: 'Principal',
        email: adminEmail,
        password: hashedPassword,
        isAdmin: true
      });

      await admin.save();
      console.log('Usuario administrador creado exitosamente');
    } else {
      console.log('El usuario administrador ya existe');
    }
  } catch (error) {
    console.error('Error al crear usuario administrador:', error);
  }
}

module.exports = initAdmin; 
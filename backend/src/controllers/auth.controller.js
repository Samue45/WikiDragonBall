const jwt = require('jsonwebtoken');
const userModel = require('../models/user.model');

const register = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    // Verificar si el usuario ya existe
    const existingUser = await userModel.getUserByEmail(email);
    if (existingUser) {
      return res.status(409).json({ success: false, message: 'El email ya está registrado' });
    }

    // Crear usuario
    await userModel.createUser(username, email, password);

    res.status(201).json({
      success: true,
      message: 'Usuario registrado exitosamente',
    });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Buscar usuario por email
    const user = await userModel.getUserByEmail(email);
    if (!user) {
      return res.status(401).json({ success: false, message: 'Email o contraseña incorrectos' });
    }

    // Verificar contraseña
    const isPasswordValid = await userModel.verifyPassword(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ success: false, message: 'Email o contraseña incorrectos' });
    }

    // Generar JWT
    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.json({
      success: true,
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { register, login };

const { dbRun, dbGet, dbAll } = require('../config/database');
const bcrypt = require('bcrypt');

// Crear usuario
const createUser = async (username, email, password) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  const result = await dbRun(
    'INSERT INTO users (username, email, password, role) VALUES (?, ?, ?, ?)',
    [username, email, hashedPassword, 'user']
  );
  return result.id;
};

// Obtener usuario por email
const getUserByEmail = async (email) => {
  return await dbGet('SELECT * FROM users WHERE email = ?', [email]);
};

// Obtener usuario por id
const getUserById = async (id) => {
  return await dbGet('SELECT id, username, email, role, created_at FROM users WHERE id = ?', [id]);
};

// Obtener todos los usuarios (para admin)
const getAllUsers = async () => {
  return await dbAll('SELECT id, username, email, role, created_at FROM users');
};

// Verificar contraseña
const verifyPassword = async (plainPassword, hashedPassword) => {
  return await bcrypt.compare(plainPassword, hashedPassword);
};

module.exports = {
  createUser,
  getUserByEmail,
  getUserById,
  getAllUsers,
  verifyPassword,
};

const { validationResult, body, param } = require('express-validator');

const validateRequest = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, errors: errors.array() });
  }
  next();
};

const validateRegister = [
  body('username')
    .trim()
    .isLength({ min: 3 })
    .withMessage('Username debe tener al menos 3 caracteres')
    .matches(/^[a-zA-Z0-9_]+$/)
    .withMessage('Username solo puede contener letras, números y _'),
  body('email')
    .isEmail()
    .withMessage('Email inválido'),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Contraseña debe tener al menos 6 caracteres')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
    .withMessage('Contraseña debe contener mayúsculas, minúsculas y números'),
  validateRequest,
];

const validateLogin = [
  body('email')
    .isEmail()
    .withMessage('Email inválido'),
  body('password')
    .notEmpty()
    .withMessage('Contraseña requerida'),
  validateRequest,
];

const validateComment = [
  body('characterId')
    .isInt({ min: 1 })
    .withMessage('Character ID inválido'),
  body('characterName')
    .trim()
    .notEmpty()
    .withMessage('Nombre del personaje requerido'),
  body('comment')
    .trim()
    .isLength({ min: 1, max: 500 })
    .withMessage('Comentario debe tener entre 1 y 500 caracteres'),
  body('rating')
    .isInt({ min: 1, max: 5 })
    .withMessage('Rating debe ser entre 1 y 5'),
  validateRequest,
];

const validateParamId = [
  param('id')
    .isInt({ min: 1 })
    .withMessage('ID inválido'),
  validateRequest,
];

module.exports = {
  validateRegister,
  validateLogin,
  validateComment,
  validateParamId,
};

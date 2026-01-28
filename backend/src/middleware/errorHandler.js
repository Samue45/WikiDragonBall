const errorHandler = (err, req, res, next) => {
  console.error('Error:', err);

  // Error de validación
  if (err.name === 'ValidationError') {
    return res.status(400).json({ success: false, message: err.message });
  }

  // Error JWT
  if (err.name === 'JsonWebTokenError') {
    return res.status(401).json({ success: false, message: 'Token inválido' });
  }

  // Error de duplicado en BD (UNIQUE constraint)
  if (err.code === 'SQLITE_CONSTRAINT') {
    return res.status(409).json({ success: false, message: 'El email o username ya existe' });
  }

  // Error general
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Error interno del servidor',
  });
};

module.exports = errorHandler;

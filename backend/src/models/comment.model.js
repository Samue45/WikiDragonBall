const { dbRun, dbGet, dbAll } = require('../config/database');

// Crear comentario
const createComment = async (userId, characterId, characterName, comment, rating) => {
  const result = await dbRun(
    'INSERT INTO comments (user_id, character_id, character_name, comment, rating) VALUES (?, ?, ?, ?, ?)',
    [userId, characterId, characterName, comment, rating]
  );
  return result.id;
};

// Obtener comentarios por personaje
const getCommentsByCharacter = async (characterId) => {
  return await dbAll(
    `SELECT c.id, c.character_id, c.character_name, c.comment, c.rating, c.created_at, c.updated_at, u.username
     FROM comments c
     JOIN users u ON c.user_id = u.id
     WHERE c.character_id = ?
     ORDER BY c.created_at DESC`,
    [characterId]
  );
};

// Obtener comentario por id
const getCommentById = async (id) => {
  return await dbGet(
    `SELECT c.*, u.username, u.id as user_id
     FROM comments c
     JOIN users u ON c.user_id = u.id
     WHERE c.id = ?`,
    [id]
  );
};

// Actualizar comentario
const updateComment = async (id, comment, rating) => {
  const result = await dbRun(
    'UPDATE comments SET comment = ?, rating = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?',
    [comment, rating, id]
  );
  return result.changes;
};

// Eliminar comentario
const deleteComment = async (id) => {
  const result = await dbRun('DELETE FROM comments WHERE id = ?', [id]);
  return result.changes;
};

// Obtener todos los comentarios (para admin)
const getAllComments = async () => {
  return await dbAll(
    `SELECT c.id, c.character_id, c.character_name, c.comment, c.rating, c.created_at, c.updated_at, u.username, u.id as user_id
     FROM comments c
     JOIN users u ON c.user_id = u.id
     ORDER BY c.created_at DESC`
  );
};

module.exports = {
  createComment,
  getCommentsByCharacter,
  getCommentById,
  updateComment,
  deleteComment,
  getAllComments,
};

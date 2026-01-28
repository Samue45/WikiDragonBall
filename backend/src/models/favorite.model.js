const { dbRun, dbGet, dbAll } = require('../config/database');

// Añadir favorito
const addFavorite = async (userId, characterId, characterName, characterImage) => {
  const result = await dbRun(
    'INSERT INTO favorites (user_id, character_id, character_name, character_image) VALUES (?, ?, ?, ?)',
    [userId, characterId, characterName, characterImage]
  );
  return result.id;
};

// Obtener favoritos del usuario
const getFavoritesByUser = async (userId) => {
  return await dbAll(
    'SELECT * FROM favorites WHERE user_id = ? ORDER BY created_at DESC',
    [userId]
  );
};

// Eliminar favorito
const removeFavorite = async (userId, characterId) => {
  const result = await dbRun(
    'DELETE FROM favorites WHERE user_id = ? AND character_id = ?',
    [userId, characterId]
  );
  return result.changes;
};

// Verificar si es favorito
const isFavorite = async (userId, characterId) => {
  const favorite = await dbGet(
    'SELECT id FROM favorites WHERE user_id = ? AND character_id = ?',
    [userId, characterId]
  );
  return !!favorite;
};

module.exports = {
  addFavorite,
  getFavoritesByUser,
  removeFavorite,
  isFavorite,
};

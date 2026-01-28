const favoriteModel = require('../models/favorite.model');

const addFavorite = async (req, res, next) => {
  try {
    const userId = req.userId;
    const { characterId, characterName, characterImage } = req.body;

    // Verificar si ya existe
    const isFav = await favoriteModel.isFavorite(userId, characterId);
    if (isFav) {
      return res.status(400).json({ success: false, message: 'Ya está en favoritos' });
    }

    const id = await favoriteModel.addFavorite(userId, characterId, characterName, characterImage);

    res.status(201).json({
      success: true,
      message: 'Añadido a favoritos',
      data: { id, userId, characterId, characterName, characterImage },
    });
  } catch (error) {
    next(error);
  }
};

const getFavorites = async (req, res, next) => {
  try {
    const userId = req.userId;
    const favorites = await favoriteModel.getFavoritesByUser(userId);

    res.json({
      success: true,
      data: favorites,
    });
  } catch (error) {
    next(error);
  }
};

const removeFavorite = async (req, res, next) => {
  try {
    const userId = req.userId;
    const { characterId } = req.params;

    const changes = await favoriteModel.removeFavorite(userId, characterId);
    
    if (changes === 0) {
      return res.status(404).json({ success: false, message: 'Favorito no encontrado' });
    }

    res.json({
      success: true,
      message: 'Eliminado de favoritos',
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { addFavorite, getFavorites, removeFavorite };

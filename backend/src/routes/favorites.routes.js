const express = require('express');
const router = express.Router();
const favoritesController = require('../controllers/favorites.controller');
const { verifyToken } = require('../middleware/auth');

// POST /api/favorites
router.post('/', verifyToken, favoritesController.addFavorite);

// GET /api/favorites
router.get('/', verifyToken, favoritesController.getFavorites);

// DELETE /api/favorites/:characterId
router.delete('/:characterId', verifyToken, favoritesController.removeFavorite);

module.exports = router;

const userModel = require('../models/user.model');
const commentModel = require('../models/comment.model');
const favoriteModel = require('../models/favorite.model');
const { dbGet, dbAll } = require('../config/database');

const getUserStats = async (req, res, next) => {
  try {
    const userId = req.userId;

    const favorites = await favoriteModel.getFavoritesByUser(userId);
    const comments = await dbAll('SELECT * FROM comments WHERE user_id = ?', [userId]);

    const avgRating = comments.length > 0
      ? (comments.reduce((sum, c) => sum + c.rating, 0) / comments.length).toFixed(1)
      : 0;

    res.json({
      success: true,
      data: {
        totalFavorites: favorites.length,
        totalComments: comments.length,
        avgRating: parseFloat(avgRating),
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { getUserStats };

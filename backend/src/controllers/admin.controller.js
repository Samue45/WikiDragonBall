const userModel = require('../models/user.model');
const commentModel = require('../models/comment.model');
const { dbAll } = require('../config/database');

const getUsers = async (req, res, next) => {
  try {
    const users = await userModel.getAllUsers();
    res.json({
      success: true,
      data: users,
    });
  } catch (error) {
    next(error);
  }
};

const getComments = async (req, res, next) => {
  try {
    const comments = await commentModel.getAllComments();
    res.json({
      success: true,
      data: comments,
    });
  } catch (error) {
    next(error);
  }
};

const deleteComment = async (req, res, next) => {
  try {
    const { id } = req.params;

    const exists = await commentModel.getCommentById(id);
    if (!exists) {
      return res.status(404).json({ success: false, message: 'Comentario no encontrado' });
    }

    await commentModel.deleteComment(id);

    res.json({
      success: true,
      message: 'Comentario eliminado',
    });
  } catch (error) {
    next(error);
  }
};

const getStats = async (req, res, next) => {
  try {
    const users = await userModel.getAllUsers();
    const comments = await commentModel.getAllComments();

    // Obtener el personaje más comentado
    const topCharacter = comments.length > 0
      ? comments.reduce((acc, comment) => {
          acc[comment.character_id] = (acc[comment.character_id] || 0) + 1;
          return acc;
        }, {})
      : {};

    const mostCommentedId = Object.keys(topCharacter).length > 0
      ? Object.keys(topCharacter).reduce((a, b) => 
          topCharacter[a] > topCharacter[b] ? a : b
        )
      : null;

    const mostCommentedCharacter = comments.find(c => c.character_id === parseInt(mostCommentedId));

    res.json({
      success: true,
      data: {
        totalUsers: users.length,
        totalComments: comments.length,
        topCharacter: mostCommentedCharacter ? {
          id: mostCommentedCharacter.character_id,
          name: mostCommentedCharacter.character_name,
          commentCount: topCharacter[mostCommentedId],
        } : null,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { getUsers, getComments, deleteComment, getStats };

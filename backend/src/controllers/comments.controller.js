const commentModel = require('../models/comment.model');

const createComment = async (req, res, next) => {
  try {
    const userId = req.userId;
    const { characterId, characterName, comment, rating } = req.body;

    const id = await commentModel.createComment(userId, characterId, characterName, comment, rating);

    res.status(201).json({
      success: true,
      message: 'Comentario creado',
      data: { id, userId, characterId, characterName, comment, rating },
    });
  } catch (error) {
    next(error);
  }
};

const getCommentsByCharacter = async (req, res, next) => {
  try {
    const { characterId } = req.params;
    const comments = await commentModel.getCommentsByCharacter(characterId);

    res.json({
      success: true,
      data: comments,
    });
  } catch (error) {
    next(error);
  }
};

const updateComment = async (req, res, next) => {
  try {
    const userId = req.userId;
    const { id } = req.params;
    const { comment, rating } = req.body;

    // Verificar que es el propietario
    const existingComment = await commentModel.getCommentById(id);
    if (!existingComment) {
      return res.status(404).json({ success: false, message: 'Comentario no encontrado' });
    }

    if (existingComment.user_id !== userId) {
      return res.status(403).json({ success: false, message: 'No puedes editar este comentario' });
    }

    await commentModel.updateComment(id, comment, rating);

    res.json({
      success: true,
      message: 'Comentario actualizado',
    });
  } catch (error) {
    next(error);
  }
};

const deleteComment = async (req, res, next) => {
  try {
    const userId = req.userId;
    const { id } = req.params;

    // Verificar que es el propietario
    const existingComment = await commentModel.getCommentById(id);
    if (!existingComment) {
      return res.status(404).json({ success: false, message: 'Comentario no encontrado' });
    }

    if (existingComment.user_id !== userId) {
      return res.status(403).json({ success: false, message: 'No puedes eliminar este comentario' });
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

module.exports = {
  createComment,
  getCommentsByCharacter,
  updateComment,
  deleteComment,
};

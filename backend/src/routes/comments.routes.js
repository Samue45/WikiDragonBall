const express = require('express');
const router = express.Router();
const commentsController = require('../controllers/comments.controller');
const { verifyToken } = require('../middleware/auth');
const { validateComment, validateParamId } = require('../middleware/validator');

// POST /api/comments
router.post('/', verifyToken, validateComment, commentsController.createComment);

// GET /api/comments/:characterId
router.get('/:characterId', commentsController.getCommentsByCharacter);

// PUT /api/comments/:id
router.put('/:id', verifyToken, validateParamId, commentsController.updateComment);

// DELETE /api/comments/:id
router.delete('/:id', verifyToken, validateParamId, commentsController.deleteComment);

module.exports = router;

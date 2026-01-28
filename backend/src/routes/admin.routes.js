const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin.controller');
const { verifyToken, verifyAdmin } = require('../middleware/auth');
const { validateParamId } = require('../middleware/validator');

// GET /api/admin/users
router.get('/users', verifyToken, verifyAdmin, adminController.getUsers);

// GET /api/admin/comments
router.get('/comments', verifyToken, verifyAdmin, adminController.getComments);

// DELETE /api/admin/comments/:id
router.delete('/comments/:id', verifyToken, verifyAdmin, validateParamId, adminController.deleteComment);

// GET /api/admin/stats
router.get('/stats', verifyToken, verifyAdmin, adminController.getStats);

module.exports = router;

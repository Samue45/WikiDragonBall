const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const { verifyToken } = require('../middleware/auth');

// GET /api/users/me/stats
router.get('/me/stats', verifyToken, userController.getUserStats);

module.exports = router;

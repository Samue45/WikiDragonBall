const express = require('express');
const router = express.Router();
const charactersController = require('../controllers/characters.controller');

// GET /api/characters
router.get('/', charactersController.getCharacters);

// GET /api/characters/:id
router.get('/:id', charactersController.getCharacterById);

// GET /api/planets
router.get('/planets/list', charactersController.getPlanets);

module.exports = router;

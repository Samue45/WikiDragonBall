const dragonballService = require('../services/dragonball.service');

const getCharacters = async (req, res, next) => {
  try {
    const { page = 1, limit = 10, name = '' } = req.query;
    const data = await dragonballService.getCharacters(page, limit, name);
    
    res.json({
      success: true,
      data,
    });
  } catch (error) {
    next(error);
  }
};

const getCharacterById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = await dragonballService.getCharacterById(id);
    
    res.json({
      success: true,
      data,
    });
  } catch (error) {
    next(error);
  }
};

const getPlanets = async (req, res, next) => {
  try {
    const data = await dragonballService.getPlanets();
    
    res.json({
      success: true,
      data,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { getCharacters, getCharacterById, getPlanets };

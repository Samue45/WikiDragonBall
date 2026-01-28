const dragonballApi = require('../config/dragonballApi');

// Obtener personajes con paginación
const getCharacters = async (page = 1, limit = 10, name = '') => {
  try {
    const params = { page, limit };
    if (name) {
      params.name = name;
    }
    const response = await dragonballApi.get('/characters', { params });
    return response.data;
  } catch (error) {
    console.error('Error obteniendo personajes:', error.message);
    throw new Error('Error al obtener personajes de Dragon Ball API');
  }
};

// Obtener personaje por id
const getCharacterById = async (id) => {
  try {
    const response = await dragonballApi.get(`/characters/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error obteniendo personaje:', error.message);
    throw new Error('Error al obtener personaje de Dragon Ball API');
  }
};

// Obtener planetas
const getPlanets = async () => {
  try {
    const response = await dragonballApi.get('/planets');
    return response.data;
  } catch (error) {
    console.error('Error obteniendo planetas:', error.message);
    throw new Error('Error al obtener planetas de Dragon Ball API');
  }
};

module.exports = {
  getCharacters,
  getCharacterById,
  getPlanets,
};

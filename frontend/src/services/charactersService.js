import api from './api';

export const getCharacters = async (page = 1, limit = 10, name = '') => {
  const response = await api.get('/characters', {
    params: { page, limit, name },
  });
  return response.data.data;
};

export const getCharacterById = async (id) => {
  const response = await api.get(`/characters/${id}`);
  return response.data.data;
};

export const getPlanets = async () => {
  const response = await api.get('/characters/planets/list');
  return response.data.data;
};

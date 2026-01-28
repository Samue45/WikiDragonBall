import api from './api';

export const addFavorite = async (characterId, characterName, characterImage) => {
  const response = await api.post('/favorites', {
    characterId,
    characterName,
    characterImage,
  });
  return response.data;
};

export const getFavorites = async () => {
  const response = await api.get('/favorites');
  return response.data.data;
};

export const removeFavorite = async (characterId) => {
  const response = await api.delete(`/favorites/${characterId}`);
  return response.data;
};

export const isFavorite = async (characterId) => {
  try {
    const favorites = await getFavorites();
    return favorites.some(fav => fav.character_id === parseInt(characterId));
  } catch {
    return false;
  }
};

import api from './api';

export const getCommentsByCharacter = async (characterId) => {
  const response = await api.get(`/comments/${characterId}`);
  return response.data.data;
};

export const addComment = async (characterId, characterName, comment, rating) => {
  const response = await api.post('/comments', {
    characterId,
    characterName,
    comment,
    rating,
  });
  return response.data;
};

export const updateComment = async (id, comment, rating) => {
  const response = await api.put(`/comments/${id}`, { comment, rating });
  return response.data;
};

export const deleteComment = async (id) => {
  const response = await api.delete(`/comments/${id}`);
  return response.data;
};

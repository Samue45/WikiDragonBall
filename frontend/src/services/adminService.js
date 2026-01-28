import api from './api';

export const getUserStats = async () => {
  const response = await api.get('/users/me/stats');
  return response.data.data;
};

export const getUsers = async () => {
  const response = await api.get('/admin/users');
  return response.data.data;
};

export const getComments = async () => {
  const response = await api.get('/admin/comments');
  return response.data.data;
};

export const deleteCommentAdmin = async (id) => {
  const response = await api.delete(`/admin/comments/${id}`);
  return response.data;
};

export const getStats = async () => {
  const response = await api.get('/admin/stats');
  return response.data.data;
};

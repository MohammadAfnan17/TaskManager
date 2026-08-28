import api from './api';

export const authService = {
  login: async (credentials) => {
    const response = await api.post('/auth/login', credentials);
    if (response.data.token) {
      localStorage.setItem('taskman_token', response.data.token);
      localStorage.setItem('taskman_user', JSON.stringify(response.data));
    }
    return response.data;
  },

  register: async (userData) => {
    const response = await api.post('/auth/register', userData);
    if (response.data.token) {
      localStorage.setItem('taskman_token', response.data.token);
      localStorage.setItem('taskman_user', JSON.stringify(response.data));
    }
    return response.data;
  },

  logout: () => {
    localStorage.removeItem('taskman_token');
    localStorage.removeItem('taskman_user');
  },

  getCurrentUser: async () => {
    const response = await api.get('/auth/me');
    return response.data;
  },

  getStoredUser: () => {
    const userStr = localStorage.getItem('taskman_user');
    if (userStr) {
      try {
        return JSON.parse(userStr);
      } catch (e) {
        return null;
      }
    }
    return null;
  }
};

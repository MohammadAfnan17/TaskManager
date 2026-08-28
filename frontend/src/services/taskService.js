import api from './api';

export const taskService = {
  getTasks: async (filters = {}) => {
    const params = new URLSearchParams();
    if (filters.status && filters.status !== 'ALL') params.append('status', filters.status);
    if (filters.priority && filters.priority !== 'ALL') params.append('priority', filters.priority);
    if (filters.category && filters.category.trim()) params.append('category', filters.category);
    if (filters.search && filters.search.trim()) params.append('search', filters.search);

    const response = await api.get(`/tasks?${params.toString()}`);
    return response.data;
  },

  getTaskById: async (id) => {
    const response = await api.get(`/tasks/${id}`);
    return response.data;
  },

  createTask: async (taskData) => {
    const response = await api.post('/tasks', taskData);
    return response.data;
  },

  updateTask: async (id, taskData) => {
    const response = await api.put(`/tasks/${id}`, taskData);
    return response.data;
  },

  updateTaskStatus: async (id, status) => {
    const response = await api.patch(`/tasks/${id}/status?status=${status}`);
    return response.data;
  },

  deleteTask: async (id) => {
    const response = await api.delete(`/tasks/${id}`);
    return response.data;
  },

  getTaskStats: async () => {
    const response = await api.get('/tasks/stats');
    return response.data;
  }
};

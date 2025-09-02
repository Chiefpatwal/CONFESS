import axios from 'axios';

const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? process.env.REACT_APP_API_URL 
  : "http://localhost:5000";

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 404) {
      error.userMessage = 'Service not found. Please check if the server is running.';
    } else if (error.response?.status >= 500) {
      error.userMessage = 'Server error. Please try again later.';
    } else if (error.code === 'ECONNABORTED') {
      error.userMessage = 'Request timeout. Please check your connection.';
    } else if (error.code === 'ERR_NETWORK') {
      error.userMessage = 'Network error. Please check your connection.';
    }
    
    return Promise.reject(error);
  }
);

export const confessionService = {
  async getAll() {
    try {
      const response = await apiClient.get('/api/confessions');
      return response.data;
    } catch (error) {
      throw new Error(error.userMessage || 'Failed to fetch confessions');
    }
  },

  async create(text, token) {
    try {
      if (!token) {
        throw new Error('Authentication token required');
      }
      
      const response = await apiClient.post('/api/confessions', 
        { text }, 
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );
      return response.data;
    } catch (error) {
      throw new Error(error.userMessage || 'Failed to create confession');
    }
  },

  async update(id, text, token) {
    try {
      if (!token) {
        throw new Error('Authentication token required');
      }
      
      const response = await apiClient.put(`/api/confessions/${id}`, 
        { text },
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );
      return response.data;
    } catch (error) {
      throw new Error(error.userMessage || 'Failed to update confession');
    }
  },

  async delete(id, token) {
    try {
      if (!token) {
        throw new Error('Authentication token required');
      }
      
      await apiClient.delete(`/api/confessions/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      return true;
    } catch (error) {
      throw new Error(error.userMessage || 'Failed to delete confession');
    }
  },

  async getById(id) {
    try {
      const response = await apiClient.get(`/api/confessions/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(error.userMessage || 'Failed to fetch confession');
    }
  }
};
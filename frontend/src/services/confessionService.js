import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000';

// Create axios instance with auth token
const createAuthAxios = async (token) => {
  return axios.create({
    baseURL: API_BASE_URL,
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  });
};

// Confession service with all API calls
export const confessionService = {
  // Get all confessions (public route)
  async getAll() {
    try {
      const response = await axios.get(`${API_BASE_URL}/confessions`);
      return response.data;
    } catch (error) {
      console.error('Error fetching confessions:', error);
      throw error;
    }
  },

  // Create new confession (requires auth)
  async create(text, token) {
    try {
      const authAxios = await createAuthAxios(token);
      const response = await authAxios.post('/confessions', { text });
      return response.data;
    } catch (error) {
      console.error('Error creating confession:', error);
      throw error;
    }
  },

  // Update confession (requires auth)
  async update(id, text, token) {
    try {
      const authAxios = await createAuthAxios(token);
      const response = await authAxios.put(`/confessions/${id}`, { text });
      return response.data;
    } catch (error) {
      console.error('Error updating confession:', error);
      throw error;
    }
  },

  // Delete confession (requires auth)
  async delete(id, token) {
    try {
      const authAxios = await createAuthAxios(token);
      await authAxios.delete(`/confessions/${id}`);
      return true;
    } catch (error) {
      console.error('Error deleting confession:', error);
      throw error;
    }
  },

  // Get confession by ID (public route)
  async getById(id) {
    try {
      const response = await axios.get(`${API_BASE_URL}/confessions/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching confession:', error);
      throw error;
    }
  }
};
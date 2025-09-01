import axios from 'axios';

// Dynamic API base URL - works in both development and production
const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? "" // Production: relative paths (same domain)
  : "http://localhost:3000"; // Development: full localhost URL

// Create axios instance with auth token - FIXED for Clerk
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
      const response = await axios.get(`${API_BASE_URL}/api/confessions`);
      return response.data;
    } catch (error) {
      console.error('Error fetching confessions:', error);
      throw error;
    }
  },

  // Create new confession (requires auth) - FIXED
  async create(text, token) {
    try {
      const response = await axios.post(`${API_BASE_URL}/api/confessions`, 
        { text }, 
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );
      return response.data;
    } catch (error) {
      console.error('Error creating confession:', error);
      throw error;
    }
  },

  // Update confession (requires auth) - FIXED
  async update(id, text, token) {
    try {
      const response = await axios.put(`${API_BASE_URL}/api/confessions/${id}`, 
        { text },
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );
      return response.data;
    } catch (error) {
      console.error('Error updating confession:', error);
      throw error;
    }
  },

  // Delete confession (requires auth) - FIXED
  async delete(id, token) {
    try {
      await axios.delete(`${API_BASE_URL}/api/confessions/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      return true;
    } catch (error) {
      console.error('Error deleting confession:', error);
      throw error;
    }
  },

  // Get confession by ID (public route)
  async getById(id) {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/confessions/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching confession:', error);
      throw error;
    }
  }
};
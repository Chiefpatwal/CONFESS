// confessionService.js - FIXED VERSION
import axios from 'axios';

// API base URL for different deployments
const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? process.env.REACT_APP_API_URL || "https://your-backend-domain.com" // Production: full backend URL
  : "http://localhost:3000"; // Development: full localhost URL

console.log('API_BASE_URL configured as:', API_BASE_URL); // Debug log

// Create axios instance with default config
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000, // 10 second timeout
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add request interceptor for debugging
apiClient.interceptors.request.use(
  (config) => {
    console.log(`Making ${config.method?.toUpperCase()} request to:`, config.url);
    return config;
  },
  (error) => {
    console.error('Request error:', error);
    return Promise.reject(error);
  }
);

// Add response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', {
      message: error.message,
      status: error.response?.status,
      statusText: error.response?.statusText,
      url: error.config?.url
    });
    return Promise.reject(error);
  }
);

// Confession service with all API calls
export const confessionService = {
  // Get all confessions (public route)
  async getAll() {
    try {
      const response = await apiClient.get('/api/confessions');
      return response.data;
    } catch (error) {
      console.error('Error fetching confessions:', error);
      throw error;
    }
  },

  // Create new confession (requires auth)
  async create(text, token) {
    try {
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
      console.error('Error creating confession:', error);
      throw error;
    }
  },

  // Update confession (requires auth)
  async update(id, text, token) {
    try {
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
      console.error('Error updating confession:', error);
      throw error;
    }
  },

  // Delete confession (requires auth)
  async delete(id, token) {
    try {
      await apiClient.delete(`/api/confessions/${id}`, {
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
      const response = await apiClient.get(`/api/confessions/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching confession:', error);
      throw error;
    }
  }
};
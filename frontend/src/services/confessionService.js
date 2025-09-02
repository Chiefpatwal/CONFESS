// confessionService.js - CORRECTED VERSION
import axios from 'axios';

// API base URL - CORRECTED for your actual deployment
const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? "https://confess-706b.onrender.com" // Your actual Render URL
  : "http://localhost:5000"; // Development: match your backend port

console.log('API_BASE_URL configured as:', API_BASE_URL);
console.log('Environment:', process.env.NODE_ENV);

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
    console.log(`Making ${config.method?.toUpperCase()} request to:`, `${config.baseURL}${config.url}`);
    if (config.headers.Authorization) {
      console.log('With auth token');
    }
    return config;
  },
  (error) => {
    console.error('Request error:', error);
    return Promise.reject(error);
  }
);

// Add response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => {
    console.log('API Response received:', response.status, response.statusText);
    return response;
  },
  (error) => {
    console.error('API Error:', {
      message: error.message,
      status: error.response?.status,
      statusText: error.response?.statusText,
      url: error.config?.url,
      fullUrl: `${error.config?.baseURL}${error.config?.url}`
    });
    
    // Provide user-friendly error messages
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

// Confession service with all API calls
export const confessionService = {
  // Get all confessions (public route)
  async getAll() {
    try {
      console.log('Fetching all confessions...');
      const response = await apiClient.get('/api/confessions');
      console.log('Confessions fetched successfully:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching confessions:', error);
      throw new Error(error.userMessage || 'Failed to fetch confessions');
    }
  },

  // Create new confession (requires auth)
  async create(text, token) {
    try {
      console.log('Creating confession...');
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
      console.log('Confession created successfully:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error creating confession:', error);
      throw new Error(error.userMessage || 'Failed to create confession');
    }
  },

  // Update confession (requires auth)
  async update(id, text, token) {
    try {
      console.log('Updating confession:', id);
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
      console.log('Confession updated successfully:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error updating confession:', error);
      throw new Error(error.userMessage || 'Failed to update confession');
    }
  },

  // Delete confession (requires auth)
  async delete(id, token) {
    try {
      console.log('Deleting confession:', id);
      if (!token) {
        throw new Error('Authentication token required');
      }
      
      await apiClient.delete(`/api/confessions/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      console.log('Confession deleted successfully');
      return true;
    } catch (error) {
      console.error('Error deleting confession:', error);
      throw new Error(error.userMessage || 'Failed to delete confession');
    }
  },

  // Get confession by ID (public route)
  async getById(id) {
    try {
      console.log('Fetching confession by ID:', id);
      const response = await apiClient.get(`/api/confessions/${id}`);
      console.log('Confession fetched successfully:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching confession:', error);
      throw new Error(error.userMessage || 'Failed to fetch confession');
    }
  }
};
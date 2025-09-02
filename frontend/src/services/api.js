// api.js - FIXED VERSION
import axios from "axios";

// API base URL for different deployments
const API_BASE = process.env.NODE_ENV === 'production' 
  ? process.env.REACT_APP_API_URL || "https://your-backend-domain.com/api/confessions"  // Production: full backend URL
  : "http://localhost:3000/api/confessions";  // Development: full localhost URL

console.log('API_BASE configured as:', API_BASE); // Debug log

// GET confessions with pagination support
export const getConfessions = async (page = 1, limit = 5) => {
  try {
    const res = await axios.get(`${API_BASE}?page=${page}&limit=${limit}`);
    return res.data;
  } catch (err) {
    console.error("Failed to fetch confessions:", err);
    return { confessions: [], totalPages: 1, totalItems: 0 };
  }
};

// POST a new confession
export const postConfession = async (text) => {
  const res = await axios.post(API_BASE, { text });
  return res.data;
};

// PUT a confession
export const updateConfessionAPI = async (id, text) => {
  const res = await axios.put(`${API_BASE}/${id}`, { text });
  return res.data;
};

// DELETE a confession
export const deleteConfessionAPI = async (id) => {
  const res = await axios.delete(`${API_BASE}/${id}`);
  return res.data;
};
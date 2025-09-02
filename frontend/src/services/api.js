import axios from "axios";

const API_BASE = process.env.NODE_ENV === 'production'
  ? `${process.env.REACT_APP_API_URL}/api/confessions`
  : "http://localhost:5000/api/confessions";

export const getConfessions = async (page = 1, limit = 5) => {
  try {
    const res = await axios.get(`${API_BASE}?page=${page}&limit=${limit}`);
    return res.data;
  } catch (err) {
    console.error("Error fetching confessions:", err);
    return { confessions: [], totalPages: 1, totalItems: 0 };
  }
};

export const postConfession = async (text) => {
  try {
    const res = await axios.post(API_BASE, { text });
    return res.data;
  } catch (err) {
    console.error("Error posting confession:", err);
    throw err;
  }
};

export const updateConfessionAPI = async (id, text) => {
  try {
    const res = await axios.put(`${API_BASE}/${id}`, { text });
    return res.data;
  } catch (err) {
    console.error("Error updating confession:", err);
    throw err;
  }
};

export const deleteConfessionAPI = async (id) => {
  try {
    const res = await axios.delete(`${API_BASE}/${id}`);
    return res.data;
  } catch (err) {
    console.error("Error deleting confession:", err);
    throw err;
  }
};

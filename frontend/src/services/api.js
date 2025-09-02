import axios from "axios";

const API_BASE =
  process.env.NODE_ENV === "production"
    ? "https://confess-706b.onrender.com/api/confessions"
    : "http://localhost:5000/api/confessions";

export const getConfessions = async (page = 1, limit = 5) => {
  try {
    const res = await axios.get(`${API_BASE}?page=${page}&limit=${limit}`);
    return res.data;
  } catch (err) {
    console.error(err);
    return { confessions: [], totalPages: 1, totalItems: 0 };
  }
};

export const postConfession = async (text) => {
  const res = await axios.post(API_BASE, { text });
  return res.data;
};

export const updateConfessionAPI = async (id, text) => {
  const res = await axios.put(`${API_BASE}/${id}`, { text });
  return res.data;
};

export const deleteConfessionAPI = async (id) => {
  const res = await axios.delete(`${API_BASE}/${id}`);
  return res.data;
};

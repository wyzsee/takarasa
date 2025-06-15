import axios from 'axios';

const api = axios.create({
  baseURL: 'http://127.0.0.1:8000/api', // tetap gunakan ini
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
});

// Ambil token dari localStorage dan set header
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("auth_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;

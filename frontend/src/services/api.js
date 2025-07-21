import axios from 'axios';

// Create axios instance with default configuration
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor to handle token expiration
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// ✅ Export individual functions
export const login = (credentials) => api.post('/auth/login', credentials);
export const verifyToken = () => api.get('/auth/verify');

export const getClients = () => api.get('/data/clients');
export const getClientById = (id) => api.get(`/data/clients/${id}`);
export const getEmployees = () => api.get('/data/employees');
export const getEmployeeById = (id) => api.get(`/data/employees/${id}`);

export const checkHealth = () => api.get('/health');

// Optionally: grouped exports (if needed somewhere else)
export const authAPI = { login, verifyToken };
export const dataAPI = { getClients, getClientById, getEmployees, getEmployeeById };
export const healthAPI = { check: checkHealth };

export default api;

import axios from 'axios';
import { API_BASE_URL } from '../config';

export const api = axios.create({ baseURL: API_BASE_URL });

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers = config.headers || {};
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (resp) => resp,
  (error) => {
    // Placeholder: route 401 to login in the future
    return Promise.reject(error);
  }
);

export default api; 
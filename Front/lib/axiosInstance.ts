import axios from 'axios';

const NAME_TOKEN = 'token';

export const axiosInstance = axios.create({
  baseURL: String(process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000'),
  headers: {
    Accept: 'application/json',
  },
});

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem(NAME_TOKEN);
  if (token) {
    config.headers = config.headers || {};
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axiosInstance;


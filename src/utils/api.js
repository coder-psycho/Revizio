import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
});

api.interceptors.request.use(
  async (config) => {
    let token = localStorage.getItem('revi-token');

    if (token) {
      try {
        const { exp } = JSON.parse(atob(token.split('.')[1]));

        if (Date.now() >= exp * 1000) {
          // Token has expired
          throw new Error('Token has expired. Please log in again.');
        }

        config.headers['Authorization'] = `Bearer ${token}`;
      } catch (error) {
        // Optionally handle decoding errors or invalid token format
        console.error('Error processing token:', error);
        throw error; // Re-throw the error
      }
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
import axios from 'axios';

const api = axios.create({
  baseURL: `https://assignment-api-spxd.onrender.com/api`,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

// api.interceptors.request.use(
//   (request) => {
//     const token = localStorage.getItem('token');
//     if (token && request.headers) {
//       request.headers.Authorization = `Bearer ${token}`;
//     }
//     return request;
//   },
//   (error) => Promise.reject(error),
// );

export default api;

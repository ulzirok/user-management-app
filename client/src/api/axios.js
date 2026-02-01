import axios from 'axios';

const instanceAxios = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api'
});

instanceAxios.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = token; // token already includes "Bearer "
    }
    return config;
});

instanceAxios.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401 && !window.location.pathname.includes('/login')) {
            localStorage.removeItem('token');
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

export default instanceAxios;

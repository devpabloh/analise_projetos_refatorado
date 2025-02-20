import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3000',
    headers: {
        'Content-Type': 'application/json',
    },
    timeout: 10000, // 10 seconds timeout
    withCredentials: true
});

// Add request interceptor for debugging
api.interceptors.request.use(
    config => {
        console.log('Request:', config);
        return config;
    },
    error => {
        console.error('Request Error:', error);
        return Promise.reject(error);
    }
);

// Add response interceptor for debugging
api.interceptors.response.use(
    response => {
        console.log('Response:', response);
        return response;
    },
    error => {
        console.error('Response Error:', error);
        return Promise.reject(error);
    }
);

export default api;
import axios from 'axios';
import { CONFIG } from './configuration';
import { getToken } from '../services/localStorageService';

const httpClient = axios.create({
    baseURL: CONFIG.API_GATEWAY,
    timeout: 30000,
    headers: {
        "Content-Type": "application/json",
    },
});

// Request interceptor với logging
httpClient.interceptors.request.use(
    (config) => {
        const token = getToken();
        if (token) {
         
            config.headers.Authorization = `Bearer ${token}`;
        } else {
            console.log(' No token found for request');
        }
        
        return config;
    },
    (error) => {
        console.log('Request interceptor error:', error);
        return Promise.reject(error);
    }
);

// Response interceptor với logging
httpClient.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default httpClient;
import axios from 'axios';
import { BASE_URL } from './apiConfig';

// Create axios instance with default configuration
const apiClient = axios.create({
    baseURL: BASE_URL,
    withCredentials: true, // Always send cookies with requests
    timeout: 10000, // 10 second timeout
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    }
});

// Request interceptor to ensure credentials and debug cookies
apiClient.interceptors.request.use(
    (config) => {
        // Ensure withCredentials is always true
        config.withCredentials = true;
        
        // Log cookies for debugging
        console.log(`Making ${config.method?.toUpperCase()} request to:`, config.url);
        console.log('Current cookies:', document.cookie);
        
        return config;
    },
    (error) => {
        console.error('Request interceptor error:', error);
        return Promise.reject(error);
    }
);

// Response interceptor to handle authentication errors globally
apiClient.interceptors.response.use(
    (response) => {
        console.log(`Response from ${response.config.url}:`, response.status);
        
        // Log any set-cookie headers
        if (response.headers['set-cookie']) {
            console.log('Set-Cookie headers:', response.headers['set-cookie']);
        }
        
        return response;
    },
    (error) => {
        // Log authentication errors for debugging
        if (error.response?.status === 401) {
            console.warn('❌ Authentication failed for:', error.config?.url);
            console.warn('❌ Current cookies:', document.cookie);
            console.warn('❌ Error response:', error.response.data);
        }
        console.error('API Error:', error.response?.status, error.response?.data);
        return Promise.reject(error);
    }
);

export default apiClient;

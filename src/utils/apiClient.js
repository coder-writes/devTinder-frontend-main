import axios from 'axios';
import { BASE_URL } from './apiConfig';
import { getToken, removeToken, isTokenExpired } from './tokenUtils';

// Create axios instance with default configuration
const apiClient = axios.create({
    baseURL: BASE_URL,
    withCredentials: true, // Keep for backward compatibility
    timeout: 10000, // 10 second timeout
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    }
});

// Request interceptor to add authorization token and debug requests
apiClient.interceptors.request.use(
    (config) => {
        // Ensure withCredentials is always true for backward compatibility
        config.withCredentials = true;
        
        // Get token from localStorage and add to Authorization header
        const token = getToken();
        if (token && !isTokenExpired()) {
            config.headers.Authorization = `Bearer ${token}`;
            console.log('Authorization header added with token');
        } else if (token && isTokenExpired()) {
            // Remove expired token
            removeToken();
            console.warn('Expired token removed from localStorage');
        }
        
        // Log request for debugging
        console.log(`Making ${config.method?.toUpperCase()} request to:`, config.url);
        console.log('Current cookies:', document.cookie);
        if (config.headers.Authorization) {
            console.log('Authorization header present');
        }
        
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
        
        // Log any set-cookie headers for backward compatibility
        if (response.headers['set-cookie']) {
            console.log('Set-Cookie headers:', response.headers['set-cookie']);
        }
        
        return response;
    },
    (error) => {
        // Handle authentication errors
        if (error.response?.status === 401) {
            console.warn('❌ Authentication failed for:', error.config?.url);
            console.warn('❌ Current cookies:', document.cookie);
            console.warn('❌ Error response:', error.response.data);
            
            // Remove token from localStorage on 401 errors
            const token = getToken();
            if (token) {
                removeToken();
                console.warn('❌ Token removed due to authentication failure');
                
                // Optionally redirect to login page or emit an event
                // window.location.href = '/login';
            }
        }
        console.error('API Error:', error.response?.status, error.response?.data);
        return Promise.reject(error);
    }
);

export default apiClient;

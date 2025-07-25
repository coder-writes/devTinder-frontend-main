// API configuration and base URL
import axios from "axios";
export const BASE_URL = import.meta.env.VITE_BASE_URL || 'http://localhost:7777';



const api = axios.create({
    baseURL: BASE_URL,
    withCredentials: true, 
});

export const googleAuth = async (code) => api.get(`/google?code=${code}`);

// API endpoints
export const API_ENDPOINTS = {
  // Auth endpoints
  LOGIN: '/login',
  SIGNUP: '/signup',
  LOGOUT: '/logout',
  GOOGLE_LOGIN: '/auth/google',
  
  // Profile endpoints
  PROFILE_VIEW: '/profile/view',
  PROFILE_EDIT: '/profile/edit',
  
  // Feed endpoints
  FEED: '/feed',
  
  // Request endpoints
  SEND_REQUEST: (status, userId) => `/request/send/${status}/${userId}`,
  REVIEW_REQUEST: (status, requestId) => `/request/review/${status}/${requestId}`,
  
  // User endpoints
  USER_CONNECTIONS: '/user/connections',
  USER_REQUESTS_RECEIVED: '/user/requests/received',
};

// Helper function to create full API URL
export const createApiUrl = (endpoint) => `${BASE_URL}${endpoint}`;

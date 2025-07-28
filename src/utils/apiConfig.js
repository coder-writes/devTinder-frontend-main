// API configuration and base URL
const isDevelopment = import.meta.env.MODE === 'development';
const isPreview = window.location.port === '4173'; // Vite preview port

export const BASE_URL = isDevelopment || isPreview
  ? '/api' // Use proxy in development and preview
  : (import.meta.env.VITE_BASE_URL || 'http://localhost:7777'); // Direct URL for other cases

// API endpoints
export const API_ENDPOINTS = {
  // Auth endpoints
  LOGIN: '/login',
  SIGNUP: '/signup',
  LOGOUT: '/logout',
  
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

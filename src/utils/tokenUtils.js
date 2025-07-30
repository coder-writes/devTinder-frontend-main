// Token management utilities for local storage

const TOKEN_KEY = 'devTinder_token';

/**
 * Store token in localStorage
 * @param {string} token - JWT token to store
 */
export const setToken = (token) => {
    try {
        localStorage.setItem(TOKEN_KEY, token);
        console.log('Token stored successfully');
    } catch (error) {
        console.error('Error storing token:', error);
    }
};

/**
 * Get token from localStorage
 * @returns {string|null} - JWT token or null if not found
 */
export const getToken = () => {
    try {
        return localStorage.getItem(TOKEN_KEY);
    } catch (error) {
        console.error('Error retrieving token:', error);
        return null;
    }
};

/**
 * Remove token from localStorage
 */
export const removeToken = () => {
    try {
        localStorage.removeItem(TOKEN_KEY);
        console.log('Token removed successfully');
    } catch (error) {
        console.error('Error removing token:', error);
    }
};

/**
 * Check if user has a valid token
 * @returns {boolean} - true if token exists, false otherwise
 */
export const hasToken = () => {
    const token = getToken();
    return Boolean(token);
};

/**
 * Check if token is expired (basic check)
 * @returns {boolean} - true if token is expired or invalid
 */
export const isTokenExpired = () => {
    const token = getToken();
    if (!token) return true;
    
    try {
        // Decode JWT token payload (basic check)
        const payload = JSON.parse(atob(token.split('.')[1]));
        const currentTime = Date.now() / 1000;
        
        return payload.exp < currentTime;
    } catch (error) {
        console.error('Error checking token expiration:', error);
        return true; // Treat as expired if can't decode
    }
};

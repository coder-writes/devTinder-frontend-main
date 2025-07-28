import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router';

// Component to protect routes that require authentication
const ProtectedRoute = ({ children }) => {
    const user = useSelector((state) => state.user);
    
    // If user is not authenticated, redirect to home page
    if (!user) {
        return <Navigate to="/" replace />;
    }
    
    return children;
};

// Component to redirect authenticated users away from public routes (like home)
const PublicRoute = ({ children }) => {
    const user = useSelector((state) => state.user);
    
    // If user is authenticated, redirect to feed
    if (user) {
        return <Navigate to="/feed" replace />;
    }
    
    return children;
};

export { ProtectedRoute, PublicRoute };

import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router';

// Component to protect routes that require authentication
const ProtectedRoute = ({ children }) => {
    const user = useSelector((state) => state.user);
    const location = useLocation();
    
    // If user is not authenticated, redirect to home page
    // Store the attempted location for redirect after login
    if (!user) {
        return <Navigate to="/" state={{ from: location }} replace />;
    }
    
    return children;
};

// Component to redirect authenticated users away from public routes (like home)
const PublicRoute = ({ children }) => {
    const user = useSelector((state) => state.user);
    const location = useLocation();
    
    // If user is authenticated, redirect to feed or the intended destination
    if (user) {
        const from = location.state?.from?.pathname || '/feed';
        return <Navigate to={from} replace />;
    }
    
    return children;
};

export { ProtectedRoute, PublicRoute };

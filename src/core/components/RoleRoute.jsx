import React from 'react';
import { Navigate } from 'react-router-dom';
import { CircularProgress, Box } from '@mui/material';
import { useAuth } from '../hooks/useAuth';

/**
 * Role-Based Route Component
 * Redirects to dashboard if user doesn't have required role
 * 
 * @param {Array|String} roles - Required role(s)
 * @param {React.Component} children - Child components to render
 */
const RoleRoute = ({ roles, children }) => {
    const { isAuthenticated, isLoading, hasRole } = useAuth();

    if (isLoading) {
        return (
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    minHeight: '100vh',
                }}
            >
                <CircularProgress />
            </Box>
        );
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    // Check if user has required role
    const hasRequiredRole = hasRole(roles);

    if (!hasRequiredRole) {
        // Redirect to dashboard if user doesn't have permission
        return <Navigate to="/portal/dashboard" replace />;
    }

    return children;
};

export default RoleRoute;

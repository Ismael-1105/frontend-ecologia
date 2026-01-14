import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { CircularProgress, Box } from '@mui/material';
import { useAuth } from '../hooks/useAuth';
import logger from '../../utils/logger';

const routeLogger = logger.create('ProtectedRoute');

/**
 * Protected Route Component
 * Redirects to login if user is not authenticated
 */
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

  routeLogger.debug('Check:', { isLoading, isAuthenticated, path: location.pathname });

  if (isLoading) {
    routeLogger.debug('Still loading, showing spinner');
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
    routeLogger.debug('Not authenticated, redirecting to login');
    // Redirect to login but save the attempted location
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  routeLogger.debug('Authenticated, rendering children');
  return children;
};

export default ProtectedRoute;

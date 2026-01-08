import React from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';

/**
 * Loading Spinner Component
 * Displays a centered loading spinner with optional message
 */
const LoadingSpinner = ({ message = 'Loading...', fullScreen = false }) => {
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: fullScreen ? '100vh' : '400px',
                gap: 2,
            }}
        >
            <CircularProgress size={60} />
            {message && (
                <Typography variant="body1" color="text.secondary">
                    {message}
                </Typography>
            )}
        </Box>
    );
};

export default LoadingSpinner;

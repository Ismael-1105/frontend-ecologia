import React, { memo } from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';

/**
 * Loading Fallback Component
 * Optimized with memo to prevent unnecessary re-renders
 */
const LoadingFallback = memo(() => {
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '100vh',
                bgcolor: 'background.default',
                gap: 2,
            }}
        >
            <CircularProgress size={50} />
            <Typography variant="body1" color="text.secondary">
                Loading...
            </Typography>
        </Box>
    );
});

LoadingFallback.displayName = 'LoadingFallback';

export default LoadingFallback;

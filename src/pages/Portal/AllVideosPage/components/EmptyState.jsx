import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { VideoLibrary as VideoLibraryIcon } from '@mui/icons-material';

/**
 * Empty State for All Videos
 * Shown when no videos are available
 */
const EmptyState = () => {
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '400px',
                textAlign: 'center',
                py: 8,
            }}
        >
            <VideoLibraryIcon
                sx={{
                    fontSize: 120,
                    color: 'text.disabled',
                    mb: 3,
                }}
            />
            <Typography variant="h5" gutterBottom color="text.secondary">
                No hay videos disponibles
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                Aún no se han subido videos a la plataforma
            </Typography>
        </Box>
    );
};

export default EmptyState;

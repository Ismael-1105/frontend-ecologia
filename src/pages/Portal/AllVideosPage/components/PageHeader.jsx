import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { VideoLibrary as VideoLibraryIcon } from '@mui/icons-material';

/**
 * Page Header for All Videos
 */
const PageHeader = () => {
    return (
        <Box sx={{ mb: 4 }}>
            <Typography variant="h4" component="h1" gutterBottom fontWeight="bold">
                Todos los Videos
            </Typography>
            <Typography variant="body1" color="text.secondary">
                Explora videos educativos de la comunidad
            </Typography>
        </Box>
    );
};

export default PageHeader;

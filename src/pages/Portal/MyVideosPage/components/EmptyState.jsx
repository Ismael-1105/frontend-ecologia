import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { Add, VideoLibrary } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

/**
 * EmptyState Component
 * Displayed when user has no videos
 */
const EmptyState = () => {
    const navigate = useNavigate();

    return (
        <Box
            sx={{
                textAlign: 'center',
                py: 8,
                px: 3,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 2,
            }}
        >
            {/* Icon */}
            <VideoLibrary
                sx={{
                    fontSize: 80,
                    color: 'text.secondary',
                    opacity: 0.5,
                    mb: 2,
                }}
            />

            {/* Title */}
            <Typography variant="h5" color="text.primary" gutterBottom>
                No has subido ningún video
            </Typography>

            {/* Message */}
            <Typography
                variant="body1"
                color="text.secondary"
                sx={{ maxWidth: 500, mb: 2 }}
            >
                Únete a esta comunidad y sube tu primer video. Comparte tu conocimiento
                sobre ecología y ayuda a otros a aprender.
            </Typography>

            {/* Upload Button */}
            <Button
                variant="contained"
                size="large"
                startIcon={<Add />}
                onClick={() => navigate('/portal/upload-video')}
                sx={{ mt: 1 }}
            >
                Subir tu Primer Video
            </Button>
        </Box>
    );
};

export default EmptyState;

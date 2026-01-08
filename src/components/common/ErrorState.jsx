import React from 'react';
import { Box, Typography, Button, Alert } from '@mui/material';
import { Error as ErrorIcon, Refresh as RefreshIcon } from '@mui/icons-material';

const ErrorState = ({
    title = 'Algo salió mal',
    message = 'No se pudieron cargar los datos. Por favor, intenta de nuevo.',
    onRetry,
    severity = 'error'
}) => {
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                py: 8,
                px: 2,
                textAlign: 'center'
            }}
        >
            <ErrorIcon
                sx={{
                    fontSize: 80,
                    color: 'error.main',
                    mb: 2,
                    opacity: 0.7
                }}
            />
            <Typography
                variant="h6"
                color="text.primary"
                sx={{ mb: 1, fontWeight: 600 }}
            >
                {title}
            </Typography>
            <Typography
                variant="body2"
                color="text.secondary"
                sx={{ mb: 3, maxWidth: 400 }}
            >
                {message}
            </Typography>
            {onRetry && (
                <Button
                    variant="contained"
                    startIcon={<RefreshIcon />}
                    onClick={onRetry}
                    color="primary"
                >
                    Reintentar
                </Button>
            )}
        </Box>
    );
};

export default ErrorState;

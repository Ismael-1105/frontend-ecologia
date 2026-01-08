import React from 'react';
import { Paper, Typography, Stack } from '@mui/material';
import { CheckCircle as CheckCircleIcon } from '@mui/icons-material';

const StatusCard = () => {
    return (
        <Paper
            elevation={2}
            sx={{
                p: 3,
                borderRadius: 3,
                bgcolor: 'success.lighter',
                border: '2px solid',
                borderColor: 'success.light'
            }}
        >
            <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 2 }}>
                <CheckCircleIcon color="success" />
                <Typography variant="h6" sx={{ fontWeight: 700 }}>
                    Estado de Publicación
                </Typography>
            </Stack>
            <Typography variant="body2" color="text.secondary">
                Los videos se publican automáticamente después de la carga. Aparecerán inmediatamente en tu dashboard y serán visibles para toda la comunidad.
            </Typography>
        </Paper>
    );
};

export default StatusCard;

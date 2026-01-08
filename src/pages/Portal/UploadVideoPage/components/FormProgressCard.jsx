import React from 'react';
import { Paper, Typography, Box, Stack, LinearProgress } from '@mui/material';
import { alpha } from '@mui/material/styles';

const FormProgressCard = ({ formData, videoFile, thumbnailFile }) => {
    const progress =
        (formData.title ? 25 : 0) +
        (formData.description ? 25 : 0) +
        (videoFile ? 25 : 0) +
        (thumbnailFile ? 25 : 0);

    return (
        <Paper elevation={2} sx={{ p: 3, borderRadius: 3 }}>
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
                Progreso del Formulario
            </Typography>
            <Stack spacing={2}>
                <Box>
                    <Stack direction="row" justifyContent="space-between" sx={{ mb: 1 }}>
                        <Typography variant="body2" color={formData.title ? 'success.main' : 'text.secondary'}>
                            {formData.title ? '✓' : '○'} Título
                        </Typography>
                    </Stack>
                </Box>
                <Box>
                    <Stack direction="row" justifyContent="space-between" sx={{ mb: 1 }}>
                        <Typography variant="body2" color={formData.description ? 'success.main' : 'text.secondary'}>
                            {formData.description ? '✓' : '○'} Descripción
                        </Typography>
                    </Stack>
                </Box>
                <Box>
                    <Stack direction="row" justifyContent="space-between" sx={{ mb: 1 }}>
                        <Typography variant="body2" color={videoFile ? 'success.main' : 'text.secondary'}>
                            {videoFile ? '✓' : '○'} Video
                        </Typography>
                    </Stack>
                </Box>
                <Box>
                    <Stack direction="row" justifyContent="space-between" sx={{ mb: 1 }}>
                        <Typography variant="body2" color={thumbnailFile ? 'success.main' : 'text.secondary'}>
                            {thumbnailFile ? '✓' : '○'} Miniatura
                        </Typography>
                    </Stack>
                </Box>
            </Stack>
            <LinearProgress
                variant="determinate"
                value={progress}
                sx={{
                    mt: 2,
                    height: 8,
                    borderRadius: 4,
                    bgcolor: (theme) => alpha(theme.palette.primary.main, 0.1),
                    '& .MuiLinearProgress-bar': {
                        borderRadius: 4
                    }
                }}
            />
        </Paper>
    );
};

export default FormProgressCard;

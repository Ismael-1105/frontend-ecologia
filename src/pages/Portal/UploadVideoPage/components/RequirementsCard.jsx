import React from 'react';
import { Paper, Typography, Box, Stack } from '@mui/material';
import { InfoOutlined as InfoOutlinedIcon } from '@mui/icons-material';

const RequirementsCard = () => {
    return (
        <Paper elevation={2} sx={{ p: 3, borderRadius: 3 }}>
            <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 2 }}>
                <InfoOutlinedIcon color="primary" />
                <Typography variant="h6" sx={{ fontWeight: 700 }}>
                    Requisitos
                </Typography>
            </Stack>

            <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1, color: 'primary.main' }}>
                    📹 Video
                </Typography>
                <Stack spacing={0.5}>
                    <Typography variant="body2" color="text.secondary">
                        • Formatos: MP4, WebM, AVI, MOV, MKV
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        • Tamaño máximo: 500MB
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        • Campo obligatorio
                    </Typography>
                </Stack>
            </Box>

            <Box>
                <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1, color: 'secondary.main' }}>
                    🖼️ Miniatura
                </Typography>
                <Stack spacing={0.5}>
                    <Typography variant="body2" color="text.secondary">
                        • Formatos: JPG, PNG, WebP
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        • Resolución: 1280x720px
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        • Tamaño máximo: 5MB
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        • Campo obligatorio
                    </Typography>
                </Stack>
            </Box>
        </Paper>
    );
};

export default RequirementsCard;

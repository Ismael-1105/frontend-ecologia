import React from 'react';
import { Box, Typography, Chip, Stack, Card, CardMedia, IconButton } from '@mui/material';
import { Image as ImageIcon, Delete as DeleteIcon, CheckCircle as CheckCircleIcon } from '@mui/icons-material';
import { alpha } from '@mui/material/styles';

const ThumbnailUploadZone = ({ thumbnailFile, thumbnailPreview, onThumbnailChange, onRemoveThumbnail, formatFileSize }) => {
    return (
        <>
            <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2 }}>
                Miniatura *
            </Typography>

            {!thumbnailFile ? (
                <Box
                    component="label"
                    sx={{
                        display: 'block',
                        border: '3px dashed',
                        borderColor: 'secondary.main',
                        borderRadius: 3,
                        p: 4,
                        textAlign: 'center',
                        bgcolor: (theme) => theme.palette.mode === 'dark' ? 'secondary.dark' : alpha(theme.palette.secondary.main, 0.05),
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                            borderColor: 'secondary.dark',
                            transform: 'translateY(-2px)',
                            boxShadow: 3
                        }
                    }}
                >
                    <input
                        type="file"
                        accept="image/*"
                        hidden
                        onChange={onThumbnailChange}
                    />
                    <ImageIcon sx={{ fontSize: 64, color: 'secondary.main', mb: 2 }} />
                    <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                        Seleccionar Miniatura
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        JPG, PNG, WebP
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                        1280x720px • Máx. 5MB
                    </Typography>
                </Box>
            ) : (
                <Card
                    sx={{
                        borderRadius: 3,
                        overflow: 'hidden',
                        boxShadow: 2
                    }}
                >
                    <Box sx={{ position: 'relative' }}>
                        <CardMedia
                            component="img"
                            image={thumbnailPreview}
                            alt="Miniatura"
                            sx={{ height: 250, objectFit: 'cover' }}
                        />
                        <IconButton
                            onClick={onRemoveThumbnail}
                            sx={{
                                position: 'absolute',
                                top: 12,
                                right: 12,
                                bgcolor: 'rgba(0,0,0,0.6)',
                                color: 'white',
                                backdropFilter: 'blur(10px)',
                                '&:hover': {
                                    bgcolor: 'error.main',
                                    transform: 'scale(1.1)'
                                }
                            }}
                        >
                            <DeleteIcon />
                        </IconButton>
                    </Box>
                    <Box sx={{ p: 2, bgcolor: (theme) => alpha(theme.palette.secondary.main, 0.05) }}>
                        <Typography variant="body2" noWrap sx={{ fontWeight: 600, mb: 1 }}>
                            {thumbnailFile.name}
                        </Typography>
                        <Stack direction="row" spacing={1}>
                            <Chip
                                label={formatFileSize(thumbnailFile.size)}
                                size="small"
                                color="secondary"
                                variant="outlined"
                            />
                            <Chip
                                icon={<CheckCircleIcon />}
                                label="Listo"
                                size="small"
                                color="success"
                            />
                        </Stack>
                    </Box>
                </Card>
            )}
        </>
    );
};

export default ThumbnailUploadZone;

import React from 'react';
import { Box, Typography, Chip, Stack, Card, IconButton } from '@mui/material';
import { VideoFile as VideoFileIcon, Delete as DeleteIcon, CheckCircle as CheckCircleIcon } from '@mui/icons-material';
import { alpha } from '@mui/material/styles';

const VideoUploadZone = ({ videoFile, videoPreview, onVideoChange, onRemoveVideo, formatFileSize }) => {
    return (
        <>
            <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2 }}>
                Archivo de Video *
            </Typography>

            {!videoFile ? (
                <Box
                    component="label"
                    sx={{
                        display: 'block',
                        border: '3px dashed',
                        borderColor: 'primary.main',
                        borderRadius: 3,
                        p: 4,
                        textAlign: 'center',
                        bgcolor: (theme) => theme.palette.mode === 'dark' ? 'primary.dark' : alpha(theme.palette.primary.main, 0.05),
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                            borderColor: 'primary.dark',
                            transform: 'translateY(-2px)',
                            boxShadow: 3
                        }
                    }}
                >
                    <input
                        type="file"
                        accept="video/*"
                        hidden
                        onChange={onVideoChange}
                    />
                    <VideoFileIcon sx={{ fontSize: 64, color: 'primary.main', mb: 2 }} />
                    <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                        Seleccionar Video
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        MP4, WebM, AVI, MOV, MKV
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                        Máximo 500MB
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
                        <video
                            src={videoPreview}
                            controls
                            style={{ width: '100%', display: 'block', maxHeight: '250px' }}
                        />
                        <IconButton
                            onClick={onRemoveVideo}
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
                    <Box sx={{ p: 2, bgcolor: (theme) => alpha(theme.palette.primary.main, 0.05) }}>
                        <Typography variant="body2" noWrap sx={{ fontWeight: 600, mb: 1 }}>
                            {videoFile.name}
                        </Typography>
                        <Stack direction="row" spacing={1}>
                            <Chip
                                label={formatFileSize(videoFile.size)}
                                size="small"
                                color="primary"
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

export default VideoUploadZone;

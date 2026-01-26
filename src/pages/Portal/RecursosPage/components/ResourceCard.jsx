import React, { useState } from 'react';
import {
    Card,
    CardContent,
    Box,
    Typography,
    Chip,
    IconButton,
    Stack,
    Snackbar,
    Alert
} from '@mui/material';
import {
    PictureAsPdf as PdfIcon,
    Videocam as VideoIcon,
    Image as ImageIcon,
    Description as DocIcon,
    Download as DownloadIcon,
    Visibility as VisibilityIcon,
    AudioFile as AudioIcon
} from '@mui/icons-material';
import { incrementDownloads } from '../../../../core/api/uploadService';

const ResourceCard = ({ resource, onUpdate }) => {
    const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

    const getIcon = (fileType) => {
        switch (fileType?.toLowerCase()) {
            case 'document':
                return <PdfIcon sx={{ fontSize: 32, color: 'error.main' }} />;
            case 'video':
                return <VideoIcon sx={{ fontSize: 32, color: 'primary.main' }} />;
            case 'image':
                return <ImageIcon sx={{ fontSize: 32, color: 'success.main' }} />;
            case 'audio':
                return <AudioIcon sx={{ fontSize: 32, color: 'warning.main' }} />;
            default:
                return <DocIcon sx={{ fontSize: 32, color: 'info.main' }} />;
        }
    };

    const getFileTypeLabel = (fileType) => {
        const labels = {
            'document': 'Documento',
            'video': 'Video',
            'image': 'Imagen',
            'audio': 'Audio',
            'other': 'Otro'
        };
        return labels[fileType] || 'Archivo';
    };

    const handleDownload = async () => {
        try {
            // Increment download counter
            if (resource._id) {
                await incrementDownloads(resource._id);

                // Refresh the list to show updated count
                if (onUpdate) {
                    onUpdate();
                }
            }

            // Trigger file download
            const link = document.createElement('a');
            link.href = `http://localhost:8080${resource.url}`;
            link.download = resource.originalName || resource.filename;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            setSnackbar({
                open: true,
                message: 'Descarga iniciada',
                severity: 'success'
            });
        } catch (error) {
            console.error('Error downloading file:', error);
            setSnackbar({
                open: true,
                message: 'Error al descargar el archivo',
                severity: 'error'
            });
        }
    };

    const handleView = () => {
        // Open file in new tab
        window.open(`http://localhost:8080${resource.url}`, '_blank');
    };

    const handleCloseSnackbar = () => {
        setSnackbar({ ...snackbar, open: false });
    };

    // Get author name
    const authorName = resource.uploadedBy?.name || resource.author || 'Desconocido';

    return (
        <>
            <Card
                elevation={1}
                sx={{
                    '&:hover': {
                        boxShadow: 3,
                        transform: 'translateY(-2px)'
                    },
                    transition: 'all 0.2s ease'
                }}
            >
                <CardContent>
                    <Box sx={{ display: 'flex', gap: 2 }}>
                        {/* Icon */}
                        <Box
                            sx={{
                                width: 64,
                                height: 64,
                                borderRadius: 2,
                                bgcolor: 'background.default',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}
                        >
                            {getIcon(resource.fileType)}
                        </Box>

                        {/* Content */}
                        <Box sx={{ flex: 1, minWidth: 0 }}>
                            <Typography
                                variant="h6"
                                sx={{
                                    fontWeight: 600,
                                    fontSize: '1rem',
                                    mb: 0.5,
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                    display: '-webkit-box',
                                    WebkitLineClamp: 2,
                                    WebkitBoxOrient: 'vertical'
                                }}
                            >
                                {resource.title}
                            </Typography>

                            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                                Por {authorName}
                            </Typography>

                            <Stack direction="row" spacing={1} alignItems="center" flexWrap="wrap">
                                <Chip
                                    label={getFileTypeLabel(resource.fileType)}
                                    size="small"
                                    variant="outlined"
                                    sx={{ height: 24 }}
                                />
                                {resource.category && resource.category !== 'Otro' && (
                                    <Chip
                                        label={resource.category}
                                        size="small"
                                        color="primary"
                                        variant="outlined"
                                        sx={{ height: 24 }}
                                    />
                                )}
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                    <DownloadIcon sx={{ fontSize: 14, color: 'text.secondary' }} />
                                    <Typography variant="caption" color="text.secondary">
                                        {resource.downloads || 0}
                                    </Typography>
                                </Box>
                            </Stack>
                        </Box>

                        {/* Actions */}
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                            <IconButton
                                size="small"
                                color="primary"
                                onClick={handleView}
                                title="Ver archivo"
                            >
                                <VisibilityIcon />
                            </IconButton>
                            <IconButton
                                size="small"
                                color="primary"
                                onClick={handleDownload}
                                title="Descargar archivo"
                            >
                                <DownloadIcon />
                            </IconButton>
                        </Box>
                    </Box>
                </CardContent>
            </Card>

            <Snackbar
                open={snackbar.open}
                autoHideDuration={3000}
                onClose={handleCloseSnackbar}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            >
                <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </>
    );
};

export default ResourceCard;

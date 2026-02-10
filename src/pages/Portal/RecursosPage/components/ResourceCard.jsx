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
    AudioFile as AudioIcon,
    Delete as DeleteIcon
} from '@mui/icons-material';
import { useAuth } from '../../../../core/context/AuthContext';
import * as uploadService from '../../../../core/api/uploadService';
import PdfViewerModal from '../../../../components/shared/PdfViewerModal';
import { useSnackbar } from '../../../../core/context/SnackbarContext.jsx';
import SweetAlert from '../../../../components/common/SweetAlert';

/**
 * Helper function to construct file URLs using environment variable
 * @param {string} path - File path from backend (e.g., /uploads/file.pdf)
 * @returns {string} Full URL to the file
 */
const getFileUrl = (path) => {
    const baseUrl = import.meta.env.VITE_API_URL || '';
    // Remove /api suffix if present, as static files are served from root
    const cleanBaseUrl = baseUrl.replace(/\/api$/, '');
    return `${cleanBaseUrl}${path}`;
};

const ResourceCard = ({ resource, onUpdate }) => {
    const { user } = useAuth();
    const { showSuccess, showError } = useSnackbar();
    const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
    const [pdfViewerOpen, setPdfViewerOpen] = useState(false);

    const isAdmin = user?.role === 'Administrador' || user?.role === 'SuperAdmin';
    const isAuthor = user && (resource.uploadedBy?._id === user._id || resource.uploadedBy === user.id || resource.uploadedBy?._id === user.id);
    const canManage = isAdmin || isAuthor;

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
            setSnackbar({
                open: true,
                message: 'Preparando descarga...',
                severity: 'info'
            });

            // Use the new downloadFile API method
            // This handles incrementing downloads on the backend and triggers the download
            await uploadService.downloadFile(resource._id || resource.id, resource.originalName || resource.filename);

            // Refresh the list to show updated count (downloads count is incremented on the backend)
            if (onUpdate) {
                onUpdate();
            }

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

    const handleDelete = async () => {
        const confirmed = await SweetAlert.showDeleteConfirmation(
            '¿Eliminar recurso?',
            '¿Estás seguro de que deseas eliminar este recurso? Esta acción no se puede deshacer.'
        );

        if (confirmed) {
            try {
                // Use ID for deletion as per updated backend logic
                const identifier = resource._id || resource.id;
                await uploadService.deleteFile(identifier);
                SweetAlert.showSuccessAlert('¡Eliminado!', 'Recurso eliminado correctamente');
                // showSuccess('Recurso eliminado correctamente'); // Optional: keep snackbar or rely on SweetAlert
                if (onUpdate) onUpdate();
            } catch (error) {
                console.error('Error deleting file:', error);
                SweetAlert.showErrorAlert('Error', 'Error al eliminar el recurso');
                // showError('Error al eliminar el recurso');
            }
        }
    };

    const handleView = () => {
        // For PDF documents, open in modal viewer
        if (resource.fileType === 'document') {
            setPdfViewerOpen(true);
        } else {
            // For other file types (images, videos, audio), open in new tab
            window.open(getFileUrl(resource.url), '_blank');
        }
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
                            {canManage && (
                                <IconButton
                                    size="small"
                                    color="error"
                                    onClick={handleDelete}
                                    title="Eliminar recurso"
                                >
                                    <DeleteIcon />
                                </IconButton>
                            )}
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

            {/* PDF Viewer Modal */}
            <PdfViewerModal
                open={pdfViewerOpen}
                onClose={() => setPdfViewerOpen(false)}
                resource={resource}
            />
        </>
    );
};

export default ResourceCard;

import React, { useState } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    TextField,
    Box,
    Alert,
    Typography,
    LinearProgress,
    Chip,
    Stack
} from '@mui/material';
import {
    CloudUpload as CloudUploadIcon,
    Description as DescriptionIcon,
    Close as CloseIcon
} from '@mui/icons-material';
import { uploadDocument } from '../../../../core/api/uploadService';

const UploadResourceModal = ({ open, onClose, onResourceUploaded }) => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        category: ''
    });
    const [selectedFile, setSelectedFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleFileSelect = (e) => {
        const file = e.target.files[0];

        if (file) {
            // Validate file type
            const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'text/plain'];
            if (!allowedTypes.includes(file.type)) {
                setError('Solo se permiten archivos PDF, DOC, DOCX o TXT');
                return;
            }

            // Validate file size (10MB max)
            const maxSize = 10 * 1024 * 1024; // 10MB
            if (file.size > maxSize) {
                setError('El archivo no debe superar los 10MB');
                return;
            }

            setSelectedFile(file);
            setError(null);
        }
    };

    const handleRemoveFile = () => {
        setSelectedFile(null);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!selectedFile) {
            setError('Por favor selecciona un archivo');
            return;
        }

        if (!formData.title || !formData.description) {
            setError('Título y descripción son obligatorios');
            return;
        }

        try {
            setLoading(true);
            setError(null);
            setUploadProgress(0);

            // Simulate progress (since we don't have real progress from API)
            const progressInterval = setInterval(() => {
                setUploadProgress(prev => {
                    if (prev >= 90) {
                        clearInterval(progressInterval);
                        return 90;
                    }
                    return prev + 10;
                });
            }, 200);

            const response = await uploadDocument(selectedFile);

            clearInterval(progressInterval);
            setUploadProgress(100);

            if (response.success) {
                // Create resource object with file info
                const resourceData = {
                    ...formData,
                    fileUrl: response.data.url,
                    filename: response.data.filename,
                    fileSize: response.data.size,
                    uploadedAt: new Date()
                };

                // Reset form
                setFormData({
                    title: '',
                    description: '',
                    category: ''
                });
                setSelectedFile(null);
                setUploadProgress(0);

                // Notify parent
                if (onResourceUploaded) {
                    onResourceUploaded(resourceData);
                }

                // Close modal
                setTimeout(() => {
                    onClose();
                }, 500);
            }
        } catch (err) {
            console.error('Error uploading resource:', err);
            setError(err.response?.data?.error || 'Error al subir el archivo');
            setUploadProgress(0);
        } finally {
            setLoading(false);
        }
    };

    const handleClose = () => {
        if (!loading) {
            setFormData({
                title: '',
                description: '',
                category: ''
            });
            setSelectedFile(null);
            setError(null);
            setUploadProgress(0);
            onClose();
        }
    };

    const formatFileSize = (bytes) => {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
    };

    return (
        <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
            <DialogTitle>Subir Recurso Educativo</DialogTitle>
            <form onSubmit={handleSubmit}>
                <DialogContent>
                    {error && (
                        <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError(null)}>
                            {error}
                        </Alert>
                    )}

                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                        {/* File Upload Area */}
                        <Box
                            sx={{
                                border: '2px dashed',
                                borderColor: selectedFile ? 'success.main' : 'divider',
                                borderRadius: 2,
                                p: 3,
                                textAlign: 'center',
                                bgcolor: selectedFile ? 'success.50' : 'background.paper',
                                cursor: 'pointer',
                                transition: 'all 0.2s',
                                '&:hover': {
                                    borderColor: 'primary.main',
                                    bgcolor: 'action.hover'
                                }
                            }}
                            onClick={() => !selectedFile && document.getElementById('file-input').click()}
                        >
                            <input
                                id="file-input"
                                type="file"
                                accept=".pdf,.doc,.docx,.txt"
                                onChange={handleFileSelect}
                                style={{ display: 'none' }}
                                disabled={loading}
                            />

                            {selectedFile ? (
                                <Stack spacing={1} alignItems="center">
                                    <DescriptionIcon sx={{ fontSize: 48, color: 'success.main' }} />
                                    <Typography variant="body1" fontWeight={600}>
                                        {selectedFile.name}
                                    </Typography>
                                    <Chip
                                        label={formatFileSize(selectedFile.size)}
                                        size="small"
                                        color="success"
                                    />
                                    <Button
                                        size="small"
                                        startIcon={<CloseIcon />}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleRemoveFile();
                                        }}
                                        disabled={loading}
                                    >
                                        Cambiar archivo
                                    </Button>
                                </Stack>
                            ) : (
                                <Stack spacing={1} alignItems="center">
                                    <CloudUploadIcon sx={{ fontSize: 48, color: 'text.secondary' }} />
                                    <Typography variant="body1" fontWeight={600}>
                                        Haz clic para seleccionar un archivo
                                    </Typography>
                                    <Typography variant="caption" color="text.secondary">
                                        PDF, DOC, DOCX o TXT (máx. 10MB)
                                    </Typography>
                                </Stack>
                            )}
                        </Box>

                        {/* Upload Progress */}
                        {loading && (
                            <Box>
                                <LinearProgress variant="determinate" value={uploadProgress} />
                                <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5 }}>
                                    Subiendo... {uploadProgress}%
                                </Typography>
                            </Box>
                        )}

                        {/* Title */}
                        <TextField
                            name="title"
                            label="Título del recurso"
                            value={formData.title}
                            onChange={handleChange}
                            fullWidth
                            required
                            disabled={loading}
                            placeholder="Ej: Guía de Reciclaje Doméstico"
                        />

                        {/* Category */}
                        <TextField
                            name="category"
                            label="Categoría"
                            value={formData.category}
                            onChange={handleChange}
                            fullWidth
                            disabled={loading}
                            placeholder="Ej: Reciclaje, Conservación, etc."
                        />

                        {/* Description */}
                        <TextField
                            name="description"
                            label="Descripción"
                            value={formData.description}
                            onChange={handleChange}
                            fullWidth
                            required
                            multiline
                            rows={4}
                            disabled={loading}
                            placeholder="Describe el contenido del recurso..."
                        />
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} disabled={loading}>
                        Cancelar
                    </Button>
                    <Button
                        type="submit"
                        variant="contained"
                        disabled={loading || !selectedFile}
                        startIcon={<CloudUploadIcon />}
                    >
                        {loading ? 'Subiendo...' : 'Subir Recurso'}
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    );
};

export default UploadResourceModal;

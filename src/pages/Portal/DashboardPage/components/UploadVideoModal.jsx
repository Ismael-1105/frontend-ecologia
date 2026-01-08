import React, { useState } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    TextField,
    Box,
    Typography,
    LinearProgress,
    Alert,
    IconButton,
    Card,
    CardMedia,
    Chip,
    Stack,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import VideoFileIcon from '@mui/icons-material/VideoFile';
import ImageIcon from '@mui/icons-material/Image';
import DeleteIcon from '@mui/icons-material/Delete';
import { uploadVideo } from '../../../../core/services/videoService';

const UploadVideoModal = ({ open, onClose, onUploadSuccess }) => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        duration: ''
    });

    const [videoFile, setVideoFile] = useState(null);
    const [thumbnailFile, setThumbnailFile] = useState(null);
    const [videoPreview, setVideoPreview] = useState(null);
    const [thumbnailPreview, setThumbnailPreview] = useState(null);

    const [loading, setLoading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [error, setError] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        setError(''); // Clear error when user types
    };

    const handleVideoChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const validTypes = ['video/mp4', 'video/webm', 'video/avi', 'video/mov', 'video/mkv'];
            if (!validTypes.includes(file.type)) {
                setError('Formato de video no válido. Use MP4, WebM, AVI, MOV o MKV.');
                return;
            }

            const maxSize = 500 * 1024 * 1024;
            if (file.size > maxSize) {
                setError('El video es demasiado grande. Máximo 500MB.');
                return;
            }

            setVideoFile(file);
            setVideoPreview(URL.createObjectURL(file));
            setError('');
        }
    };

    const handleThumbnailChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
            if (!validTypes.includes(file.type)) {
                setError('Formato de imagen no válido. Use JPG, PNG o WebP.');
                return;
            }

            const maxSize = 5 * 1024 * 1024;
            if (file.size > maxSize) {
                setError('La miniatura es demasiado grande. Máximo 5MB.');
                return;
            }

            setThumbnailFile(file);
            setThumbnailPreview(URL.createObjectURL(file));
            setError('');
        }
    };

    const removeVideo = () => {
        setVideoFile(null);
        if (videoPreview) {
            URL.revokeObjectURL(videoPreview);
            setVideoPreview(null);
        }
    };

    const removeThumbnail = () => {
        setThumbnailFile(null);
        if (thumbnailPreview) {
            URL.revokeObjectURL(thumbnailPreview);
            setThumbnailPreview(null);
        }
    };

    const resetForm = () => {
        setFormData({ title: '', description: '', duration: '' });
        removeVideo();
        removeThumbnail();
        setError('');
        setUploadProgress(0);
    };

    const handleClose = () => {
        if (!loading) {
            resetForm();
            onClose();
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        // Validations
        if (!formData.title.trim()) {
            setError('El título es obligatorio.');
            return;
        }

        if (!formData.description.trim()) {
            setError('La descripción es obligatoria.');
            return;
        }

        if (!videoFile) {
            setError('Debes seleccionar un video.');
            return;
        }

        if (!thumbnailFile) {
            setError('Debes seleccionar una miniatura.');
            return;
        }

        setLoading(true);
        setUploadProgress(0);

        try {
            const videoData = {
                title: formData.title,
                description: formData.description,
                duration: formData.duration ? parseInt(formData.duration) : null
            };

            await uploadVideo(
                videoData,
                videoFile,
                thumbnailFile,
                (progress) => setUploadProgress(progress)
            );

            // Success
            resetForm();
            if (onUploadSuccess) {
                onUploadSuccess();
            }
            onClose();
        } catch (err) {
            console.error('Upload error:', err);

            // Better error messages
            if (err.response) {
                const status = err.response.status;
                const message = err.response.data?.message || err.response.data?.error;

                if (status === 401) {
                    setError('Tu sesión ha expirado. Por favor, inicia sesión nuevamente.');
                } else if (status === 413) {
                    setError('Los archivos son demasiado grandes. Video máx: 500MB, Miniatura máx: 5MB.');
                } else if (status === 400) {
                    setError(message || 'Datos inválidos. Verifica los campos del formulario.');
                } else if (status === 500) {
                    setError('Error en el servidor. Por favor, intenta más tarde.');
                } else {
                    setError(message || 'Error al subir el video. Inténtalo de nuevo.');
                }
            } else if (err.request) {
                setError('No se pudo conectar con el servidor. Verifica tu conexión a internet.');
            } else {
                setError(err.message || 'Error desconocido. Por favor, intenta de nuevo.');
            }
        } finally {
            setLoading(false);
        }
    };

    const formatFileSize = (bytes) => {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
    };

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            maxWidth="md"
            fullWidth
            PaperProps={{
                sx: { borderRadius: 3 }
            }}
        >
            <DialogTitle sx={{ pb: 1 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <CloudUploadIcon color="primary" />
                        <Typography variant="h6" fontWeight="bold">
                            Subir Nuevo Video
                        </Typography>
                    </Box>
                    <IconButton onClick={handleClose} disabled={loading}>
                        <CloseIcon />
                    </IconButton>
                </Box>
            </DialogTitle>

            <DialogContent dividers>
                {error && (
                    <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError('')}>
                        {error}
                    </Alert>
                )}

                <Box component="form" onSubmit={handleSubmit}>
                    <TextField
                        fullWidth
                        label="Título *"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        margin="normal"
                        required
                        disabled={loading}
                        inputProps={{ maxLength: 200 }}
                        helperText={`${formData.title.length}/200 caracteres`}
                    />

                    <TextField
                        fullWidth
                        label="Descripción *"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        margin="normal"
                        required
                        multiline
                        rows={3}
                        disabled={loading}
                        inputProps={{ maxLength: 2000 }}
                        helperText={`${formData.description.length}/2000 caracteres`}
                    />

                    <TextField
                        fullWidth
                        label="Duración (segundos)"
                        name="duration"
                        type="number"
                        value={formData.duration}
                        onChange={handleChange}
                        margin="normal"
                        disabled={loading}
                        helperText="Opcional"
                    />

                    {/* Video Upload */}
                    <Typography variant="subtitle2" sx={{ mt: 3, mb: 1, fontWeight: 'bold' }}>
                        Video * (MP4, WebM, AVI, MOV, MKV - Máx. 500MB)
                    </Typography>

                    {!videoFile ? (
                        <Box
                            component="label"
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                                border: '2px dashed',
                                borderColor: 'primary.main',
                                borderRadius: 2,
                                p: 3,
                                cursor: loading ? 'not-allowed' : 'pointer',
                                bgcolor: 'action.hover',
                                '&:hover': {
                                    bgcolor: 'action.selected',
                                },
                            }}
                        >
                            <input
                                type="file"
                                accept="video/*"
                                hidden
                                onChange={handleVideoChange}
                                disabled={loading}
                            />
                            <VideoFileIcon sx={{ fontSize: 48, color: 'primary.main', mb: 1 }} />
                            <Typography variant="body2" color="text.secondary">
                                Click para seleccionar video
                            </Typography>
                        </Box>
                    ) : (
                        <Card>
                            <Box sx={{ position: 'relative' }}>
                                <video
                                    src={videoPreview}
                                    controls
                                    style={{ width: '100%', maxHeight: '200px', display: 'block' }}
                                />
                                <IconButton
                                    onClick={removeVideo}
                                    disabled={loading}
                                    sx={{
                                        position: 'absolute',
                                        top: 8,
                                        right: 8,
                                        bgcolor: 'background.paper',
                                        '&:hover': { bgcolor: 'error.main', color: 'white' }
                                    }}
                                >
                                    <DeleteIcon />
                                </IconButton>
                            </Box>
                            <Box sx={{ p: 1 }}>
                                <Typography variant="caption" noWrap display="block">
                                    {videoFile.name}
                                </Typography>
                                <Chip label={formatFileSize(videoFile.size)} size="small" />
                            </Box>
                        </Card>
                    )}

                    {/* Thumbnail Upload */}
                    <Typography variant="subtitle2" sx={{ mt: 3, mb: 1, fontWeight: 'bold' }}>
                        Miniatura * (JPG, PNG, WebP - Máx. 5MB)
                    </Typography>

                    {!thumbnailFile ? (
                        <Box
                            component="label"
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                                border: '2px dashed',
                                borderColor: 'secondary.main',
                                borderRadius: 2,
                                p: 3,
                                cursor: loading ? 'not-allowed' : 'pointer',
                                bgcolor: 'action.hover',
                                '&:hover': {
                                    bgcolor: 'action.selected',
                                },
                            }}
                        >
                            <input
                                type="file"
                                accept="image/*"
                                hidden
                                onChange={handleThumbnailChange}
                                disabled={loading}
                            />
                            <ImageIcon sx={{ fontSize: 48, color: 'secondary.main', mb: 1 }} />
                            <Typography variant="body2" color="text.secondary">
                                Click para seleccionar miniatura
                            </Typography>
                        </Box>
                    ) : (
                        <Card>
                            <Box sx={{ position: 'relative' }}>
                                <CardMedia
                                    component="img"
                                    image={thumbnailPreview}
                                    alt="Thumbnail"
                                    sx={{ maxHeight: 200, objectFit: 'contain' }}
                                />
                                <IconButton
                                    onClick={removeThumbnail}
                                    disabled={loading}
                                    sx={{
                                        position: 'absolute',
                                        top: 8,
                                        right: 8,
                                        bgcolor: 'background.paper',
                                        '&:hover': { bgcolor: 'error.main', color: 'white' }
                                    }}
                                >
                                    <DeleteIcon />
                                </IconButton>
                            </Box>
                            <Box sx={{ p: 1 }}>
                                <Typography variant="caption" noWrap display="block">
                                    {thumbnailFile.name}
                                </Typography>
                                <Chip label={formatFileSize(thumbnailFile.size)} size="small" />
                            </Box>
                        </Card>
                    )}

                    {/* Progress Bar */}
                    {loading && (
                        <Box sx={{ mt: 3 }}>
                            <Typography variant="body2" color="text.secondary" gutterBottom>
                                Subiendo... {uploadProgress}%
                            </Typography>
                            <LinearProgress
                                variant="determinate"
                                value={uploadProgress}
                                sx={{ height: 8, borderRadius: 4 }}
                            />
                        </Box>
                    )}
                </Box>
            </DialogContent>

            <DialogActions sx={{ px: 3, py: 2 }}>
                <Button onClick={handleClose} disabled={loading}>
                    Cancelar
                </Button>
                <Button
                    onClick={handleSubmit}
                    variant="contained"
                    disabled={loading}
                    startIcon={<CloudUploadIcon />}
                >
                    {loading ? `Subiendo ${uploadProgress}%` : 'Subir Video'}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default UploadVideoModal;

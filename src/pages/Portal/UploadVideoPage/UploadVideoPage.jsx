import React, { useState } from 'react';
import {
    Box,
    Typography,
    TextField,
    Button,
    Paper,
    Container,
    Alert,
    Grid,
    Stack,
    Collapse,
    Divider
} from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import DescriptionIcon from '@mui/icons-material/Description';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import TimerIcon from '@mui/icons-material/Timer';
import TitleIcon from '@mui/icons-material/Title';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

import {
    VideoUploadZone,
    ThumbnailUploadZone,
    UploadProgress,
    RequirementsCard,
    StatusCard,
    FormProgressCard
} from './components';

const UploadVideoPage = () => {
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
    const [success, setSuccess] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

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

        // Simulación de carga
        const interval = setInterval(() => {
            setUploadProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(interval);
                    setSuccess(true);
                    setLoading(false);
                    return 100;
                }
                return prev + 10;
            });
        }, 300);
    };

    const formatFileSize = (bytes) => {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
    };

    const isFormComplete = videoFile && thumbnailFile && formData.title && formData.description;

    return (
        <Container maxWidth="xl" sx={{ py: 4 }}>
            {/* Header */}
            <Box sx={{ mb: 4 }}>
                <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 1 }}>
                    <CloudUploadIcon sx={{ fontSize: 40, color: 'primary.main' }} />
                    <Typography variant="h4" component="h1" sx={{ fontWeight: 700 }}>
                        Subir Nuevo Video
                    </Typography>
                </Stack>
                <Typography variant="body1" color="text.secondary">
                    Comparte tu conocimiento con la comunidad de EcoLearn Loja
                </Typography>
            </Box>

            {/* Success Alert */}
            <Collapse in={success}>
                <Alert
                    severity="success"
                    sx={{ mb: 3, borderRadius: 3 }}
                    icon={<CheckCircleIcon />}
                >
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                        ¡Video subido exitosamente!
                    </Typography>
                    <Typography variant="body2">
                        Redirigiendo al dashboard...
                    </Typography>
                </Alert>
            </Collapse>

            {/* Error Alert */}
            <Collapse in={!!error}>
                <Alert
                    severity="error"
                    sx={{ mb: 3, borderRadius: 3 }}
                    onClose={() => setError('')}
                >
                    {error}
                </Alert>
            </Collapse>

            <Grid container spacing={3}>
                {/* Main Form */}
                <Grid item xs={12} lg={8}>
                    <Paper elevation={2} sx={{ p: 4, borderRadius: 3 }}>
                        <Box component="form" onSubmit={handleSubmit}>
                            {/* Información del Video */}
                            <Box sx={{ mb: 4 }}>
                                <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 3 }}>
                                    <DescriptionIcon color="primary" />
                                    <Typography variant="h5" sx={{ fontWeight: 700 }}>
                                        Información del Video
                                    </Typography>
                                </Stack>

                                <TextField
                                    fullWidth
                                    label="Título del Video"
                                    name="title"
                                    value={formData.title}
                                    onChange={handleChange}
                                    required
                                    variant="outlined"
                                    sx={{ mb: 3 }}
                                    inputProps={{ maxLength: 200 }}
                                    helperText={`${formData.title.length}/200 caracteres`}
                                    InputProps={{
                                        startAdornment: <TitleIcon sx={{ mr: 1, color: 'text.secondary' }} />
                                    }}
                                />

                                <TextField
                                    fullWidth
                                    label="Descripción"
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    required
                                    multiline
                                    rows={5}
                                    variant="outlined"
                                    sx={{ mb: 3 }}
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
                                    variant="outlined"
                                    helperText="Opcional: duración del video en segundos"
                                    InputProps={{
                                        startAdornment: <TimerIcon sx={{ mr: 1, color: 'text.secondary' }} />
                                    }}
                                />
                            </Box>

                            <Divider sx={{ my: 4 }} />

                            {/* Archivos */}
                            <Box>
                                <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 3 }}>
                                    <PlayCircleOutlineIcon color="primary" />
                                    <Typography variant="h5" sx={{ fontWeight: 700 }}>
                                        Archivos Multimedia
                                    </Typography>
                                </Stack>

                                <Grid container spacing={3}>
                                    <Grid item xs={12} md={6}>
                                        <VideoUploadZone
                                            videoFile={videoFile}
                                            videoPreview={videoPreview}
                                            onVideoChange={handleVideoChange}
                                            onRemoveVideo={removeVideo}
                                            formatFileSize={formatFileSize}
                                        />
                                    </Grid>

                                    <Grid item xs={12} md={6}>
                                        <ThumbnailUploadZone
                                            thumbnailFile={thumbnailFile}
                                            thumbnailPreview={thumbnailPreview}
                                            onThumbnailChange={handleThumbnailChange}
                                            onRemoveThumbnail={removeThumbnail}
                                            formatFileSize={formatFileSize}
                                        />
                                    </Grid>
                                </Grid>
                            </Box>

                            {/* Upload Progress */}
                            <UploadProgress loading={loading} uploadProgress={uploadProgress} />

                            {/* Submit Button */}
                            <Button
                                type="submit"
                                variant="contained"
                                size="large"
                                fullWidth
                                disabled={loading || !isFormComplete}
                                startIcon={<CloudUploadIcon />}
                                sx={{
                                    mt: 4,
                                    py: 2,
                                    fontSize: '1.1rem',
                                    fontWeight: 700,
                                    borderRadius: 3
                                }}
                            >
                                {loading ? `Subiendo... ${uploadProgress}%` : 'Publicar Video'}
                            </Button>
                        </Box>
                    </Paper>
                </Grid>

                {/* Sidebar Info */}
                <Grid item xs={12} lg={4}>
                    <Stack spacing={3}>
                        <RequirementsCard />
                        <StatusCard />
                        <FormProgressCard
                            formData={formData}
                            videoFile={videoFile}
                            thumbnailFile={thumbnailFile}
                        />
                    </Stack>
                </Grid>
            </Grid>
        </Container>
    );
};

export default UploadVideoPage;
import React, { useState, useEffect } from 'react';
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
    CircularProgress,
    IconButton
} from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SaveIcon from '@mui/icons-material/Save';
import DescriptionIcon from '@mui/icons-material/Description';
import TitleIcon from '@mui/icons-material/Title';
import videoService from '../../../core/services/videoService';
import { useSnackbar } from '../../../core/context/SnackbarContext.jsx';

const EditVideoPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { showSuccess, showError } = useSnackbar();

    const [formData, setFormData] = useState({
        title: '',
        description: ''
    });
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchVideo = async () => {
            try {
                setLoading(true);
                const videoData = await videoService.getVideoById(id);
                setFormData({
                    title: videoData.title || '',
                    description: videoData.description || ''
                });
            } catch (err) {
                console.error('Error fetching video:', err);
                setError('No se pudo cargar la información del video.');
                showError('Error al cargar el video');
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchVideo();
        }
    }, [id, showError]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
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

        try {
            setSaving(true);
            await videoService.updateVideo(id, formData);
            showSuccess('Video actualizado exitosamente');
            navigate('/portal/videos');
        } catch (err) {
            console.error('Error updating video:', err);
            showError(err.message || 'Error al actualizar el video');
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <Container sx={{ py: 8, display: 'flex', justifyContent: 'center' }}>
                <CircularProgress />
            </Container>
        );
    }

    return (
        <Container maxWidth="md" sx={{ py: 4 }}>
            {/* Header */}
            <Box sx={{ mb: 4 }}>
                <Button
                    startIcon={<ArrowBackIcon />}
                    onClick={() => navigate(-1)}
                    sx={{ mb: 2 }}
                >
                    Volver
                </Button>
                <Stack direction="row" spacing={2} alignItems="center">
                    <EditIcon sx={{ fontSize: 40, color: 'primary.main' }} />
                    <Typography variant="h4" component="h1" sx={{ fontWeight: 700 }}>
                        Editar Video
                    </Typography>
                </Stack>
            </Box>

            {error ? (
                <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>
            ) : (
                <Paper elevation={2} sx={{ p: 4, borderRadius: 3 }}>
                    <Box component="form" onSubmit={handleSubmit}>
                        <Stack spacing={3}>
                            <TextField
                                fullWidth
                                label="Título del Video"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                required
                                variant="outlined"
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
                                rows={8}
                                variant="outlined"
                                inputProps={{ maxLength: 2000 }}
                                helperText={`${formData.description.length}/2000 caracteres`}
                                InputProps={{
                                    startAdornment: <DescriptionIcon sx={{ mr: 1, mt: 1, alignSelf: 'flex-start', color: 'text.secondary' }} />
                                }}
                            />

                            <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
                                <Button
                                    type="submit"
                                    variant="contained"
                                    size="large"
                                    disabled={saving}
                                    startIcon={saving ? <CircularProgress size={20} /> : <SaveIcon />}
                                    sx={{
                                        flex: 2,
                                        py: 1.5,
                                        fontWeight: 700,
                                        borderRadius: 2
                                    }}
                                >
                                    {saving ? 'Guardando...' : 'Guardar Cambios'}
                                </Button>
                                <Button
                                    variant="outlined"
                                    size="large"
                                    onClick={() => navigate(-1)}
                                    sx={{
                                        flex: 1,
                                        py: 1.5,
                                        fontWeight: 600,
                                        borderRadius: 2
                                    }}
                                >
                                    Cancelar
                                </Button>
                            </Box>
                        </Stack>
                    </Box>
                </Paper>
            )}
        </Container>
    );
};

export default EditVideoPage;

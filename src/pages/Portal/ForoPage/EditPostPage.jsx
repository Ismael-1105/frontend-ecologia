import React, { useState, useEffect } from 'react';
import {
    Box,
    Typography,
    TextField,
    Button,
    Paper,
    Container,
    Alert,
    CircularProgress,
    Stack,
    FormControl,
    InputLabel,
    Select,
    MenuItem
} from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SaveIcon from '@mui/icons-material/Save';
import postService from '../../../core/api/postService';
import { useSnackbar } from '../../../core/context/SnackbarContext.jsx';

const CATEGORIES = [
    'General',
    'Flora Nativa',
    'Fauna Local',
    'Conservación',
    'Reciclaje',
    'Agua',
    'Educación Ambiental',
    'Cambio Climático',
    'Energías Renovables',
    'Problemas Locales'
];

const EditPostPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { showSuccess, showError } = useSnackbar();

    const [formData, setFormData] = useState({
        title: '',
        content: '',
        category: ''
    });
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchPost = async () => {
            try {
                setLoading(true);
                const postData = await postService.getPostById(id);
                setFormData({
                    title: postData.data.title || '',
                    content: postData.data.content || '',
                    category: postData.data.category || ''
                });
            } catch (err) {
                console.error('Error fetching post:', err);
                setError('No se pudo cargar la publicación.');
                showError('Error al cargar la publicación');
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchPost();
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

        if (!formData.title.trim() || !formData.content.trim() || !formData.category) {
            setError('Todos los campos son obligatorios.');
            return;
        }

        try {
            setSaving(true);
            await postService.updatePost(id, formData);
            showSuccess('Publicación actualizada exitosamente');
            navigate('/portal/foro');
        } catch (err) {
            console.error('Error updating post:', err);
            showError(err.response?.data?.error || 'Error al actualizar la publicación');
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
                        Editar Publicación
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
                                label="Título"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                required
                                variant="outlined"
                            />

                            <FormControl fullWidth required>
                                <InputLabel>Categoría</InputLabel>
                                <Select
                                    name="category"
                                    value={formData.category}
                                    onChange={handleChange}
                                    label="Categoría"
                                >
                                    {CATEGORIES.map((category) => (
                                        <MenuItem key={category} value={category}>
                                            {category}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>

                            <TextField
                                fullWidth
                                label="Contenido"
                                name="content"
                                value={formData.content}
                                onChange={handleChange}
                                required
                                multiline
                                rows={8}
                                variant="outlined"
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

export default EditPostPage;

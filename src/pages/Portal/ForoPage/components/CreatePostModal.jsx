import React, { useState } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    TextField,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Box,
    Alert
} from '@mui/material';
import { createPost } from '../../../../core/api/postService';

const CATEGORIES = [
    'General',
    'Flora Nativa',
    'Fauna Local',
    'Conservación',
    'Reciclaje',
    'Agua',
    'Educación Ambiental'
];

const CreatePostModal = ({ open, onClose, onPostCreated }) => {
    const [formData, setFormData] = useState({
        title: '',
        content: '',
        category: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.title || !formData.content || !formData.category) {
            setError('Todos los campos son obligatorios');
            return;
        }

        try {
            setLoading(true);
            setError(null);

            const response = await createPost(formData);

            if (response.success) {
                // Reset form
                setFormData({
                    title: '',
                    content: '',
                    category: ''
                });

                // Notify parent component
                if (onPostCreated) {
                    onPostCreated(response.data);
                }

                // Close modal
                onClose();
            }
        } catch (err) {
            console.error('Error creating post:', err);
            setError(err.response?.data?.error || 'Error al crear la publicación');
        } finally {
            setLoading(false);
        }
    };

    const handleClose = () => {
        if (!loading) {
            setFormData({
                title: '',
                content: '',
                category: ''
            });
            setError(null);
            onClose();
        }
    };

    return (
        <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
            <DialogTitle>Nueva Discusión</DialogTitle>
            <form onSubmit={handleSubmit}>
                <DialogContent>
                    {error && (
                        <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError(null)}>
                            {error}
                        </Alert>
                    )}

                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                        <TextField
                            name="title"
                            label="Título"
                            value={formData.title}
                            onChange={handleChange}
                            fullWidth
                            required
                            disabled={loading}
                            placeholder="¿Sobre qué quieres hablar?"
                        />

                        <FormControl fullWidth required disabled={loading}>
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
                            name="content"
                            label="Contenido"
                            value={formData.content}
                            onChange={handleChange}
                            fullWidth
                            required
                            multiline
                            rows={6}
                            disabled={loading}
                            placeholder="Comparte tus ideas, preguntas o experiencias..."
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
                        disabled={loading}
                    >
                        {loading ? 'Publicando...' : 'Publicar'}
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    );
};

export default CreatePostModal;

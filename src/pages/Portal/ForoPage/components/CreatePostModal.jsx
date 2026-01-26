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
    Alert,
    IconButton,
    Typography,
    Chip,
    Stack
} from '@mui/material';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import DeleteIcon from '@mui/icons-material/Delete';
import ImageIcon from '@mui/icons-material/Image';
import DescriptionIcon from '@mui/icons-material/Description';
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

const MAX_FILES = 5;
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

const CreatePostModal = ({ open, onClose, onPostCreated }) => {
    const [formData, setFormData] = useState({
        title: '',
        content: '',
        category: ''
    });
    const [attachments, setAttachments] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleFileSelect = (e) => {
        const files = Array.from(e.target.files);

        // Validate number of files
        if (attachments.length + files.length > MAX_FILES) {
            setError(`Máximo ${MAX_FILES} archivos permitidos`);
            return;
        }

        // Validate file sizes and types
        const validFiles = [];
        for (const file of files) {
            if (file.size > MAX_FILE_SIZE) {
                setError(`El archivo "${file.name}" excede el tamaño máximo de 10MB`);
                continue;
            }

            // Check file type
            const isImage = file.type.startsWith('image/');
            const isDocument = file.type === 'application/pdf' ||
                file.type.includes('document') ||
                file.type === 'text/plain';

            if (!isImage && !isDocument) {
                setError(`El archivo "${file.name}" no es un tipo permitido (imágenes o documentos)`);
                continue;
            }

            validFiles.push(file);
        }

        setAttachments(prev => [...prev, ...validFiles]);
        e.target.value = ''; // Reset input
    };

    const handleRemoveFile = (index) => {
        setAttachments(prev => prev.filter((_, i) => i !== index));
    };

    const formatFileSize = (bytes) => {
        if (bytes < 1024) return bytes + ' B';
        if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
        return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
    };

    const getFileIcon = (file) => {
        if (file.type.startsWith('image/')) {
            return <ImageIcon fontSize="small" />;
        }
        return <DescriptionIcon fontSize="small" />;
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

            const response = await createPost({
                ...formData,
                attachments
            });

            if (response.success) {
                // Reset form
                setFormData({
                    title: '',
                    content: '',
                    category: ''
                });
                setAttachments([]);

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
            setAttachments([]);
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

                        {/* File Attachments Section */}
                        <Box>
                            <input
                                accept="image/*,.pdf,.doc,.docx,.txt"
                                style={{ display: 'none' }}
                                id="file-upload"
                                type="file"
                                multiple
                                onChange={handleFileSelect}
                                disabled={loading || attachments.length >= MAX_FILES}
                            />
                            <label htmlFor="file-upload">
                                <Button
                                    variant="outlined"
                                    component="span"
                                    startIcon={<AttachFileIcon />}
                                    disabled={loading || attachments.length >= MAX_FILES}
                                    fullWidth
                                >
                                    Adjuntar archivos ({attachments.length}/{MAX_FILES})
                                </Button>
                            </label>

                            {attachments.length > 0 && (
                                <Stack spacing={1} sx={{ mt: 2 }}>
                                    {attachments.map((file, index) => (
                                        <Chip
                                            key={index}
                                            icon={getFileIcon(file)}
                                            label={`${file.name} (${formatFileSize(file.size)})`}
                                            onDelete={() => handleRemoveFile(index)}
                                            deleteIcon={<DeleteIcon />}
                                            variant="outlined"
                                            sx={{ justifyContent: 'space-between' }}
                                        />
                                    ))}
                                </Stack>
                            )}

                            <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
                                Formatos permitidos: Imágenes (JPG, PNG, GIF, WebP) y Documentos (PDF, DOC, TXT). Máximo 10MB por archivo.
                            </Typography>
                        </Box>
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

import React, { useState, useRef } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Box,
    Typography,
    Avatar,
    IconButton,
    Alert,
    LinearProgress
} from '@mui/material';
import {
    CloudUpload,
    Close,
    PhotoCamera,
    Delete
} from '@mui/icons-material';

const ProfilePictureUploadModal = ({ open, onClose, onUpload, currentImage }) => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [preview, setPreview] = useState(null);
    const [isDragging, setIsDragging] = useState(false);
    const [error, setError] = useState('');
    const [uploading, setUploading] = useState(false);
    const fileInputRef = useRef(null);

    // File validation
    const validateFile = (file) => {
        const maxSize = 5 * 1024 * 1024; // 5MB
        const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/webp'];

        if (!allowedTypes.includes(file.type)) {
            setError('Solo se permiten archivos JPG, PNG o WebP');
            return false;
        }

        if (file.size > maxSize) {
            setError('El archivo no debe superar 5MB');
            return false;
        }

        setError('');
        return true;
    };

    // Handle file selection
    const handleFileSelect = (file) => {
        if (!file) return;

        if (validateFile(file)) {
            setSelectedFile(file);

            // Create preview
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    // Handle file input change
    const handleFileInputChange = (e) => {
        const file = e.target.files[0];
        handleFileSelect(file);
    };

    // Handle drag events
    const handleDragEnter = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(true);
    };

    const handleDragLeave = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        e.stopPropagation();
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);

        const file = e.dataTransfer.files[0];
        handleFileSelect(file);
    };

    // Handle upload
    const handleUpload = async () => {
        if (!selectedFile) return;

        setUploading(true);
        try {
            await onUpload(selectedFile);
            handleClose();
        } catch (error) {
            setError(error.message || 'Error al subir la imagen');
        } finally {
            setUploading(false);
        }
    };

    // Handle close
    const handleClose = () => {
        setSelectedFile(null);
        setPreview(null);
        setError('');
        setUploading(false);
        onClose();
    };

    // Remove selected file
    const handleRemoveFile = () => {
        setSelectedFile(null);
        setPreview(null);
        setError('');
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            maxWidth="sm"
            fullWidth
        >
            <DialogTitle>
                <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Typography variant="h6">Cambiar Foto de Perfil</Typography>
                    <IconButton onClick={handleClose} size="small">
                        <Close />
                    </IconButton>
                </Box>
            </DialogTitle>

            <DialogContent>
                {uploading && <LinearProgress sx={{ mb: 2 }} />}

                {error && (
                    <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError('')}>
                        {error}
                    </Alert>
                )}

                {/* Current/Preview Image */}
                <Box display="flex" justifyContent="center" mb={3}>
                    <Avatar
                        src={preview || currentImage}
                        sx={{
                            width: 150,
                            height: 150,
                            border: '4px solid',
                            borderColor: 'primary.main',
                            fontSize: '4rem'
                        }}
                    >
                        <PhotoCamera fontSize="large" />
                    </Avatar>
                </Box>

                {/* Drag and Drop Area */}
                <Box
                    onDragEnter={handleDragEnter}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    sx={{
                        border: '2px dashed',
                        borderColor: isDragging ? 'primary.main' : 'grey.400',
                        borderRadius: 2,
                        p: 4,
                        textAlign: 'center',
                        bgcolor: isDragging ? 'action.hover' : 'background.paper',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                            borderColor: 'primary.main',
                            bgcolor: 'action.hover'
                        }
                    }}
                    onClick={() => fileInputRef.current?.click()}
                >
                    <CloudUpload sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
                    <Typography variant="h6" gutterBottom>
                        {selectedFile ? selectedFile.name : 'Arrastra una imagen aquí'}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        o haz clic para seleccionar
                    </Typography>
                    <Typography variant="caption" display="block" sx={{ mt: 1 }} color="text.secondary">
                        JPG, PNG o WebP (máx. 5MB)
                    </Typography>
                </Box>

                <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/jpeg,image/png,image/jpg,image/webp"
                    onChange={handleFileInputChange}
                    style={{ display: 'none' }}
                />

                {/* Selected File Info */}
                {selectedFile && (
                    <Box
                        display="flex"
                        justifyContent="space-between"
                        alignItems="center"
                        sx={{ mt: 2, p: 2, bgcolor: 'action.hover', borderRadius: 1 }}
                    >
                        <Box>
                            <Typography variant="body2" fontWeight="bold">
                                {selectedFile.name}
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                                {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                            </Typography>
                        </Box>
                        <IconButton
                            onClick={handleRemoveFile}
                            size="small"
                            color="error"
                        >
                            <Delete />
                        </IconButton>
                    </Box>
                )}
            </DialogContent>

            <DialogActions sx={{ px: 3, pb: 2 }}>
                <Button onClick={handleClose} disabled={uploading}>
                    Cancelar
                </Button>
                <Button
                    onClick={handleUpload}
                    variant="contained"
                    disabled={!selectedFile || uploading}
                    startIcon={<CloudUpload />}
                >
                    {uploading ? 'Subiendo...' : 'Subir Imagen'}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ProfilePictureUploadModal;

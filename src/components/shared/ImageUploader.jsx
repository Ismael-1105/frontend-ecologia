import React from 'react';
import {
    Box,
    Button,
    Card,
    CardMedia,
    CardActions,
    IconButton,
    Typography,
    LinearProgress,
    Alert
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { useFileUpload, useImagePreview } from '../../hooks/useFileUpload';

/**
 * ImageUploader Component
 * Complete image upload component with preview and progress
 */
const ImageUploader = ({
    onUploadComplete,
    onError,
    maxSize = 10 * 1024 * 1024, // 10MB
    aspectRatio = '16/9',
    showPreview = true,
    autoUpload = false
}) => {
    const {
        file,
        uploading,
        progress,
        error,
        uploadedFile,
        handleFileSelect,
        handleUpload,
        reset
    } = useFileUpload('image');

    const previewUrl = useImagePreview(file);

    const handleFileChange = async (event) => {
        const selectedFile = event.target.files[0];
        handleFileSelect(selectedFile);

        if (autoUpload && selectedFile) {
            const result = await handleUpload();
            if (result && onUploadComplete) {
                onUploadComplete(result);
            }
        }
    };

    const handleManualUpload = async () => {
        const result = await handleUpload();
        if (result && onUploadComplete) {
            onUploadComplete(result);
        }
    };

    const handleRemove = () => {
        reset();
    };

    React.useEffect(() => {
        if (error && onError) {
            onError(error);
        }
    }, [error, onError]);

    return (
        <Box>
            {error && (
                <Alert severity="error" sx={{ mb: 2 }} onClose={() => reset()}>
                    {error}
                </Alert>
            )}

            {!file && !uploadedFile && (
                <Box>
                    <input
                        accept="image/*"
                        style={{ display: 'none' }}
                        id="image-uploader-input"
                        type="file"
                        onChange={handleFileChange}
                    />
                    <label htmlFor="image-uploader-input">
                        <Button
                            variant="outlined"
                            component="span"
                            startIcon={<CloudUploadIcon />}
                            fullWidth
                        >
                            Seleccionar Imagen
                        </Button>
                    </label>
                </Box>
            )}

            {showPreview && (file || uploadedFile) && (
                <Card sx={{ maxWidth: 400, mx: 'auto' }}>
                    <CardMedia
                        component="img"
                        image={uploadedFile ? uploadedFile.url : previewUrl}
                        alt="Preview"
                        sx={{ aspectRatio, objectFit: 'cover' }}
                    />
                    <CardActions sx={{ justifyContent: 'space-between' }}>
                        <Typography variant="caption" color="text.secondary" noWrap sx={{ flex: 1 }}>
                            {uploadedFile ? uploadedFile.originalName : file?.name}
                        </Typography>
                        <IconButton onClick={handleRemove} size="small" color="error">
                            <DeleteIcon />
                        </IconButton>
                    </CardActions>
                </Card>
            )}

            {!autoUpload && file && !uploading && !uploadedFile && (
                <Button
                    variant="contained"
                    onClick={handleManualUpload}
                    fullWidth
                    sx={{ mt: 2 }}
                >
                    Subir Imagen
                </Button>
            )}

            {uploading && (
                <Box sx={{ mt: 2 }}>
                    <LinearProgress variant="determinate" value={progress} />
                    <Typography variant="caption" color="text.secondary" align="center" display="block" sx={{ mt: 1 }}>
                        Subiendo... {progress}%
                    </Typography>
                </Box>
            )}

            {uploadedFile && (
                <Alert severity="success" sx={{ mt: 2 }}>
                    Imagen subida exitosamente
                </Alert>
            )}
        </Box>
    );
};

export default ImageUploader;

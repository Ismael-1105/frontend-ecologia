import React from 'react';
import { Button, CircularProgress, Box, LinearProgress, Typography } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { useFileUpload } from '../../hooks/useFileUpload';

/**
 * FileUploadButton Component
 * Reusable button for file upload with progress indicator
 */
const FileUploadButton = ({
    fileType = 'image',
    accept = '*/*',
    buttonText = 'Subir Archivo',
    onUploadComplete,
    onError,
    variant = 'contained',
    color = 'primary',
    fullWidth = false,
    showProgress = true,
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
    } = useFileUpload(fileType);

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
            reset();
        }
    };

    React.useEffect(() => {
        if (error && onError) {
            onError(error);
        }
    }, [error, onError]);

    return (
        <Box sx={{ width: fullWidth ? '100%' : 'auto' }}>
            <input
                accept={accept}
                style={{ display: 'none' }}
                id="file-upload-button"
                type="file"
                onChange={handleFileChange}
                disabled={uploading}
            />
            <label htmlFor="file-upload-button" style={{ width: fullWidth ? '100%' : 'auto', display: 'block' }}>
                <Button
                    variant={variant}
                    color={color}
                    component="span"
                    disabled={uploading}
                    startIcon={uploading ? <CircularProgress size={20} /> : <CloudUploadIcon />}
                    fullWidth={fullWidth}
                >
                    {uploading ? 'Subiendo...' : buttonText}
                </Button>
            </label>

            {!autoUpload && file && !uploading && (
                <Button
                    variant="outlined"
                    onClick={handleManualUpload}
                    fullWidth={fullWidth}
                    sx={{ mt: 1 }}
                >
                    Confirmar Subida
                </Button>
            )}

            {showProgress && uploading && (
                <Box sx={{ mt: 2 }}>
                    <LinearProgress variant="determinate" value={progress} />
                    <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5 }}>
                        {progress}%
                    </Typography>
                </Box>
            )}

            {uploadedFile && (
                <Typography variant="caption" color="success.main" sx={{ mt: 1, display: 'block' }}>
                    ✓ Archivo subido exitosamente
                </Typography>
            )}
        </Box>
    );
};

export default FileUploadButton;

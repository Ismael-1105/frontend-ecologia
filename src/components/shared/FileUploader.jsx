import React, { useState, useRef } from 'react';
import {
    Box,
    Button,
    Typography,
    LinearProgress,
    IconButton,
    Alert,
} from '@mui/material';
import { CloudUpload, Close, InsertDriveFile } from '@mui/icons-material';

/**
 * File Uploader Component
 * Drag & drop file uploader with preview and validation
 */
const FileUploader = ({
    onFileSelect,
    accept = '*',
    maxSize = 500 * 1024 * 1024, // 500MB default
    label = 'Upload File',
    showPreview = true,
    uploadProgress = null,
}) => {
    const [file, setFile] = useState(null);
    const [error, setError] = useState('');
    const [isDragging, setIsDragging] = useState(false);
    const fileInputRef = useRef(null);

    const validateFile = (selectedFile) => {
        setError('');

        if (!selectedFile) {
            return false;
        }

        // Check file size
        if (selectedFile.size > maxSize) {
            const maxSizeMB = (maxSize / (1024 * 1024)).toFixed(0);
            setError(`File size exceeds ${maxSizeMB}MB limit`);
            return false;
        }

        // Check file type if accept is specified
        if (accept !== '*') {
            const acceptedTypes = accept.split(',').map((type) => type.trim());
            const fileExtension = '.' + selectedFile.name.split('.').pop().toLowerCase();
            const mimeType = selectedFile.type;

            const isAccepted = acceptedTypes.some(
                (type) =>
                    type === mimeType ||
                    type === fileExtension ||
                    (type.endsWith('/*') && mimeType.startsWith(type.replace('/*', '')))
            );

            if (!isAccepted) {
                setError(`File type not accepted. Accepted types: ${accept}`);
                return false;
            }
        }

        return true;
    };

    const handleFileSelect = (selectedFile) => {
        if (validateFile(selectedFile)) {
            setFile(selectedFile);
            if (onFileSelect) {
                onFileSelect(selectedFile);
            }
        }
    };

    const handleFileInputChange = (event) => {
        const selectedFile = event.target.files[0];
        if (selectedFile) {
            handleFileSelect(selectedFile);
        }
    };

    const handleDragOver = (event) => {
        event.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = () => {
        setIsDragging(false);
    };

    const handleDrop = (event) => {
        event.preventDefault();
        setIsDragging(false);

        const droppedFile = event.dataTransfer.files[0];
        if (droppedFile) {
            handleFileSelect(droppedFile);
        }
    };

    const handleRemoveFile = () => {
        setFile(null);
        setError('');
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
        if (onFileSelect) {
            onFileSelect(null);
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
        <Box>
            <input
                ref={fileInputRef}
                type="file"
                accept={accept}
                onChange={handleFileInputChange}
                style={{ display: 'none' }}
            />

            {!file ? (
                <Box
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    sx={{
                        border: '2px dashed',
                        borderColor: isDragging ? 'primary.main' : 'grey.300',
                        borderRadius: 2,
                        p: 4,
                        textAlign: 'center',
                        cursor: 'pointer',
                        bgcolor: isDragging ? 'action.hover' : 'background.paper',
                        transition: 'all 0.3s',
                        '&:hover': {
                            borderColor: 'primary.main',
                            bgcolor: 'action.hover',
                        },
                    }}
                    onClick={() => fileInputRef.current?.click()}
                >
                    <CloudUpload sx={{ fontSize: 60, color: 'primary.main', mb: 2 }} />
                    <Typography variant="h6" gutterBottom>
                        {label}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Drag and drop or click to browse
                    </Typography>
                    <Typography variant="caption" color="text.secondary" display="block" mt={1}>
                        Max size: {formatFileSize(maxSize)}
                    </Typography>
                </Box>
            ) : (
                <Box>
                    {showPreview && (
                        <Box
                            sx={{
                                border: '1px solid',
                                borderColor: 'grey.300',
                                borderRadius: 2,
                                p: 2,
                                display: 'flex',
                                alignItems: 'center',
                                gap: 2,
                            }}
                        >
                            <InsertDriveFile sx={{ fontSize: 40, color: 'primary.main' }} />
                            <Box sx={{ flex: 1 }}>
                                <Typography variant="body1" noWrap>
                                    {file.name}
                                </Typography>
                                <Typography variant="caption" color="text.secondary">
                                    {formatFileSize(file.size)}
                                </Typography>
                            </Box>
                            <IconButton onClick={handleRemoveFile} size="small">
                                <Close />
                            </IconButton>
                        </Box>
                    )}

                    {uploadProgress !== null && (
                        <Box sx={{ mt: 2 }}>
                            <LinearProgress variant="determinate" value={uploadProgress} />
                            <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5 }}>
                                Uploading: {uploadProgress}%
                            </Typography>
                        </Box>
                    )}
                </Box>
            )}

            {error && (
                <Alert severity="error" sx={{ mt: 2 }} onClose={() => setError('')}>
                    {error}
                </Alert>
            )}
        </Box>
    );
};

export default FileUploader;

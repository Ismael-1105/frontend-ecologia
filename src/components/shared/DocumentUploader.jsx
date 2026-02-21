import React from 'react';
import {
    Box,
    Button,
    Chip,
    Stack,
    Typography,
    LinearProgress,
    Alert,
    IconButton
} from '@mui/material';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import DeleteIcon from '@mui/icons-material/Delete';
import DescriptionIcon from '@mui/icons-material/Description';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import CloudDoneIcon from '@mui/icons-material/CloudDone';
import InfoIcon from '@mui/icons-material/Info';
import { useMultipleUpload } from '../../hooks/useFileUpload';
import { formatFileSize } from '../../utils/fileUtils';

/**
 * DocumentUploader Component
 * Upload multiple documents with validation and progress
 * PDFs <= 10MB are stored as base64 (optimized)
 */
const DocumentUploader = ({
    onUploadComplete,
    onError,
    maxFiles = 5,
    autoUpload = false,
    showFileList = true,
    showStorageInfo = true
}) => {
    const {
        files,
        uploading,
        progress,
        error,
        uploadedFiles,
        handleFilesSelect,
        removeFile,
        handleUpload,
        reset
    } = useMultipleUpload('document', maxFiles);

    const handleFileChange = async (event) => {
        const selectedFiles = event.target.files;
        handleFilesSelect(selectedFiles);

        if (autoUpload && selectedFiles.length > 0) {
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

    const getFileIcon = (file) => {
        if (file.type === 'application/pdf') {
            return <PictureAsPdfIcon fontSize="small" />;
        }
        return <DescriptionIcon fontSize="small" />;
    };

    const isPdfOptimizable = (file) => {
        const MAX_BASE64_SIZE = 10 * 1024 * 1024; // 10MB
        return file.type === 'application/pdf' && file.size <= MAX_BASE64_SIZE;
    };

    const getStorageType = (file) => {
        if (isPdfOptimizable(file)) {
            return {
                label: 'Almacenamiento optimizado',
                color: 'success',
                icon: <CloudDoneIcon fontSize="small" />
            };
        }
        return {
            label: 'Almacenamiento estándar',
            color: 'default',
            icon: null
        };
    };

    React.useEffect(() => {
        if (error && onError) {
            onError(error);
        }
    }, [error, onError]);

    // Count optimized PDFs
    const optimizedCount = files.filter(isPdfOptimizable).length;

    return (
        <Box>
            {error && (
                <Alert severity="error" sx={{ mb: 2 }} onClose={() => reset()}>
                    {error}
                </Alert>
            )}

            {showStorageInfo && files.length > 0 && optimizedCount > 0 && (
                <Alert severity="info" icon={<CloudDoneIcon />} sx={{ mb: 2 }}>
                    {optimizedCount} PDF{optimizedCount > 1 ? 's' : ''} se 
                    {optimizedCount > 1 ? 'rán' : 'rá'} almacenado{optimizedCount > 1 ? 's' : ''} de 
                    forma optimizada (base64) para carga más rápida.
                </Alert>
            )}

            <input
                accept=".pdf,.doc,.docx,.txt"
                style={{ display: 'none' }}
                id="document-uploader-input"
                type="file"
                multiple
                onChange={handleFileChange}
                disabled={uploading}
            />
            <label htmlFor="document-uploader-input">
                <Button
                    variant="outlined"
                    component="span"
                    startIcon={<AttachFileIcon />}
                    disabled={uploading || files.length >= maxFiles}
                    fullWidth
                >
                    Seleccionar Documentos ({files.length}/{maxFiles})
                </Button>
            </label>

            {showFileList && files.length > 0 && (
                <Stack spacing={1} sx={{ mt: 2 }}>
                    {files.map((file, index) => {
                        const storageType = getStorageType(file);
                        return (
                            <Box
                                key={index}
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 1,
                                    p: 1,
                                    border: 1,
                                    borderColor: 'divider',
                                    borderRadius: 1,
                                    bgcolor: 'background.paper'
                                }}
                            >
                                {getFileIcon(file)}
                                <Box sx={{ flex: 1, minWidth: 0 }}>
                                    <Typography variant="body2" noWrap>
                                        {file.name}
                                    </Typography>
                                    <Stack direction="row" spacing={1} alignItems="center" sx={{ mt: 0.5 }}>
                                        <Typography variant="caption" color="text.secondary">
                                            {formatFileSize(file.size)}
                                        </Typography>
                                        {storageType.icon && (
                                            <>
                                                <Typography variant="caption" color="text.secondary">•</Typography>
                                                <Chip
                                                    icon={storageType.icon}
                                                    label={storageType.label}
                                                    size="small"
                                                    color={storageType.color}
                                                    variant="outlined"
                                                    sx={{ height: 20, fontSize: '0.7rem' }}
                                                />
                                            </>
                                        )}
                                    </Stack>
                                </Box>
                                <IconButton 
                                    size="small" 
                                    onClick={() => removeFile(index)}
                                    disabled={uploading}
                                >
                                    <DeleteIcon fontSize="small" />
                                </IconButton>
                            </Box>
                        );
                    })}
                </Stack>
            )}

            {!autoUpload && files.length > 0 && !uploading && uploadedFiles.length === 0 && (
                <Button
                    variant="contained"
                    onClick={handleManualUpload}
                    fullWidth
                    sx={{ mt: 2 }}
                >
                    Subir {files.length} Documento(s)
                </Button>
            )}

            {uploading && (
                <Box sx={{ mt: 2 }}>
                    <LinearProgress variant="determinate" value={progress} />
                    <Typography variant="caption" color="text.secondary" align="center" display="block" sx={{ mt: 1 }}>
                        Subiendo documentos... {progress}%
                    </Typography>
                </Box>
            )}

            {uploadedFiles.length > 0 && (
                <Alert severity="success" sx={{ mt: 2 }}>
                    {uploadedFiles.length} documento(s) subido(s) exitosamente
                    {uploadedFiles.filter(f => f.storage === 'base64').length > 0 && (
                        <Typography variant="caption" display="block" sx={{ mt: 0.5 }}>
                            {uploadedFiles.filter(f => f.storage === 'base64').length} almacenado(s) de forma optimizada
                        </Typography>
                    )}
                </Alert>
            )}

            {showStorageInfo && (
                <Box sx={{ mt: 2, p: 1.5, bgcolor: 'action.hover', borderRadius: 1, display: 'flex', gap: 1 }}>
                    <InfoIcon fontSize="small" color="action" />
                    <Typography variant="caption" color="text.secondary">
                        Los PDFs menores a 10MB se almacenan de forma optimizada para mejorar la velocidad de carga.
                    </Typography>
                </Box>
            )}
        </Box>
    );
};

export default DocumentUploader;

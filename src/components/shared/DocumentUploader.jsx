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
import { useMultipleUpload } from '../../hooks/useFileUpload';
import { formatFileSize } from '../../utils/fileUtils';

/**
 * DocumentUploader Component
 * Upload multiple documents with validation and progress
 */
const DocumentUploader = ({
    onUploadComplete,
    onError,
    maxFiles = 5,
    autoUpload = false,
    showFileList = true
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
                    {files.map((file, index) => (
                        <Chip
                            key={index}
                            icon={getFileIcon(file)}
                            label={`${file.name} (${formatFileSize(file.size)})`}
                            onDelete={() => removeFile(index)}
                            deleteIcon={<DeleteIcon />}
                            variant="outlined"
                            sx={{ justifyContent: 'space-between' }}
                        />
                    ))}
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
                </Alert>
            )}
        </Box>
    );
};

export default DocumentUploader;

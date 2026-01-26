import { useState, useCallback, useEffect } from 'react';
import { uploadFile, uploadMultipleFiles } from '../core/api/uploadService';
import { validateFile, validateMultipleFiles, revokePreviewUrl } from '../utils/fileUtils';

/**
 * Custom hook for single file upload with validation and progress tracking
 * @param {string} fileType - Type of file: 'image', 'video', 'document', 'audio'
 * @returns {Object} Upload state and handlers
 */
export const useFileUpload = (fileType = 'image') => {
    const [file, setFile] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [progress, setProgress] = useState(0);
    const [error, setError] = useState(null);
    const [uploadedFile, setUploadedFile] = useState(null);

    const handleFileSelect = useCallback((selectedFile) => {
        setError(null);

        if (!selectedFile) {
            setFile(null);
            return;
        }

        // Validate file
        const validation = validateFile(selectedFile, fileType);
        if (!validation.valid) {
            setError(validation.error);
            setFile(null);
            return;
        }

        setFile(selectedFile);
    }, [fileType]);

    const handleUpload = useCallback(async () => {
        if (!file) {
            setError('No hay archivo seleccionado');
            return null;
        }

        setUploading(true);
        setProgress(0);
        setError(null);

        try {
            const response = await uploadFile(file, fileType, setProgress);
            setUploadedFile(response.data);
            return response.data;
        } catch (err) {
            setError(err.message || 'Error al subir archivo');
            return null;
        } finally {
            setUploading(false);
        }
    }, [file, fileType]);

    const reset = useCallback(() => {
        setFile(null);
        setUploading(false);
        setProgress(0);
        setError(null);
        setUploadedFile(null);
    }, []);

    return {
        file,
        uploading,
        progress,
        error,
        uploadedFile,
        handleFileSelect,
        handleUpload,
        reset
    };
};

/**
 * Custom hook for multiple files upload with validation
 * @param {string} fileType - Type of files: 'image', 'video', 'document', 'audio'
 * @param {number} maxFiles - Maximum number of files (default: 5)
 * @returns {Object} Upload state and handlers
 */
export const useMultipleUpload = (fileType = 'image', maxFiles = 5) => {
    const [files, setFiles] = useState([]);
    const [uploading, setUploading] = useState(false);
    const [progress, setProgress] = useState(0);
    const [error, setError] = useState(null);
    const [uploadedFiles, setUploadedFiles] = useState([]);

    const handleFilesSelect = useCallback((selectedFiles) => {
        setError(null);

        if (!selectedFiles || selectedFiles.length === 0) {
            setFiles([]);
            return;
        }

        // Validate files
        const validation = validateMultipleFiles(selectedFiles, fileType, maxFiles);
        if (!validation.valid) {
            setError(validation.error);
            setFiles([]);
            return;
        }

        setFiles(validation.validFiles);
    }, [fileType, maxFiles]);

    const removeFile = useCallback((index) => {
        setFiles(prevFiles => prevFiles.filter((_, i) => i !== index));
    }, []);

    const handleUpload = useCallback(async () => {
        if (files.length === 0) {
            setError('No hay archivos seleccionados');
            return null;
        }

        setUploading(true);
        setProgress(0);
        setError(null);

        try {
            const response = await uploadMultipleFiles(files, setProgress);
            setUploadedFiles(response.data);
            return response.data;
        } catch (err) {
            setError(err.message || 'Error al subir archivos');
            return null;
        } finally {
            setUploading(false);
        }
    }, [files]);

    const reset = useCallback(() => {
        setFiles([]);
        setUploading(false);
        setProgress(0);
        setError(null);
        setUploadedFiles([]);
    }, []);

    return {
        files,
        uploading,
        progress,
        error,
        uploadedFiles,
        handleFilesSelect,
        removeFile,
        handleUpload,
        reset
    };
};

/**
 * Custom hook for image preview with automatic cleanup
 * @param {File} file - Image file
 * @returns {string|null} Preview URL
 */
export const useImagePreview = (file) => {
    const [previewUrl, setPreviewUrl] = useState(null);

    useEffect(() => {
        if (!file) {
            setPreviewUrl(null);
            return;
        }

        if (!file.type.startsWith('image/')) {
            setPreviewUrl(null);
            return;
        }

        const url = URL.createObjectURL(file);
        setPreviewUrl(url);

        // Cleanup on unmount or file change
        return () => {
            revokePreviewUrl(url);
        };
    }, [file]);

    return previewUrl;
};

/**
 * Custom hook for video preview with automatic cleanup
 * @param {File} file - Video file
 * @returns {string|null} Preview URL
 */
export const useVideoPreview = (file) => {
    const [previewUrl, setPreviewUrl] = useState(null);

    useEffect(() => {
        if (!file) {
            setPreviewUrl(null);
            return;
        }

        if (!file.type.startsWith('video/')) {
            setPreviewUrl(null);
            return;
        }

        const url = URL.createObjectURL(file);
        setPreviewUrl(url);

        // Cleanup on unmount or file change
        return () => {
            revokePreviewUrl(url);
        };
    }, [file]);

    return previewUrl;
};

export default {
    useFileUpload,
    useMultipleUpload,
    useImagePreview,
    useVideoPreview
};

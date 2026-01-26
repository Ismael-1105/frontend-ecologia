import apiClient from './client';

/**
 * Upload API Service
 * Handles file upload operations with progress tracking and error handling
 */

/**
 * Upload a single file
 * @param {File} file - File to upload
 * @param {string} type - Upload type: 'image', 'video', 'document', 'audio', or 'single'
 * @param {Function} onProgress - Optional progress callback (percentage)
 * @param {Object} metadata - Optional metadata (title, description, category)
 * @returns {Promise} API response
 */
export const uploadFile = async (file, type = 'single', onProgress = null, metadata = {}) => {
    const formData = new FormData();

    // Determine field name based on type
    const fieldName = type === 'single' ? 'file' : type;
    formData.append(fieldName, file);

    // Append metadata if provided
    if (metadata.title) formData.append('title', metadata.title);
    if (metadata.description) formData.append('description', metadata.description);
    if (metadata.category) formData.append('category', metadata.category);

    const endpoint = type === 'single' ? '/uploads/single' : `/uploads/${type}`;

    const config = {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    };

    // Add progress tracking if callback provided
    if (onProgress && typeof onProgress === 'function') {
        config.onUploadProgress = (progressEvent) => {
            const percentCompleted = Math.round(
                (progressEvent.loaded * 100) / progressEvent.total
            );
            onProgress(percentCompleted);
        };
    }

    try {
        const response = await apiClient.post(endpoint, formData, config);
        return response.data;
    } catch (error) {
        throw handleUploadError(error);
    }
};

/**
 * Upload multiple files
 * @param {FileList|Array} files - Files to upload
 * @param {Function} onProgress - Optional progress callback (percentage)
 * @returns {Promise} API response
 */
export const uploadMultipleFiles = async (files, onProgress = null) => {
    const formData = new FormData();

    Array.from(files).forEach(file => {
        formData.append('files', file);
    });

    const config = {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    };

    if (onProgress && typeof onProgress === 'function') {
        config.onUploadProgress = (progressEvent) => {
            const percentCompleted = Math.round(
                (progressEvent.loaded * 100) / progressEvent.total
            );
            onProgress(percentCompleted);
        };
    }

    try {
        const response = await apiClient.post('/uploads/multiple', formData, config);
        return response.data;
    } catch (error) {
        throw handleUploadError(error);
    }
};

/**
 * Upload a document (PDF, DOC, DOCX, TXT)
 * @param {File} file - Document file to upload
 * @param {Function} onProgress - Optional progress callback
 * @param {Object} metadata - Optional metadata (title, description, category)
 * @returns {Promise} API response
 */
export const uploadDocument = async (file, onProgress = null, metadata = {}) => {
    return uploadFile(file, 'document', onProgress, metadata);
};

/**
 * Upload an image
 * @param {File} file - Image file to upload
 * @param {Function} onProgress - Optional progress callback
 * @returns {Promise} API response
 */
export const uploadImage = async (file, onProgress = null) => {
    return uploadFile(file, 'image', onProgress);
};

/**
 * Upload a video
 * @param {File} file - Video file to upload
 * @param {Function} onProgress - Optional progress callback
 * @returns {Promise} API response
 */
export const uploadVideo = async (file, onProgress = null) => {
    return uploadFile(file, 'video', onProgress);
};

/**
 * Get file information
 * @param {string} filename - Filename to get info for
 * @returns {Promise} API response
 */
export const getFileInfo = async (filename) => {
    try {
        const response = await apiClient.get(`/uploads/${filename}`);
        return response.data;
    } catch (error) {
        throw handleUploadError(error);
    }
};

/**
 * Delete a file
 * @param {string} filename - Filename to delete
 * @returns {Promise} API response
 */
export const deleteFile = async (filename) => {
    try {
        const response = await apiClient.delete(`/uploads/${filename}`);
        return response.data;
    } catch (error) {
        throw handleUploadError(error);
    }
};

/**
 * Handle upload errors and provide user-friendly messages
 * @param {Error} error - Error object
 * @returns {Error} Enhanced error with user-friendly message
 */
const handleUploadError = (error) => {
    if (error.response) {
        const { status, data } = error.response;

        switch (status) {
            case 400:
                return new Error(data.error || 'Archivo inválido o datos incorrectos');
            case 401:
                return new Error('Debes iniciar sesión para subir archivos');
            case 413:
                return new Error('El archivo es demasiado grande');
            case 415:
                return new Error('Tipo de archivo no permitido');
            case 500:
                return new Error('Error del servidor. Intenta nuevamente');
            default:
                return new Error(data.error || 'Error al subir archivo');
        }
    } else if (error.request) {
        return new Error('No se pudo conectar con el servidor');
    } else {
        return new Error(error.message || 'Error desconocido');
    }
};

/**
 * Get all uploads with pagination and filters
 * @param {Object} params - Query parameters (page, limit, fileType, category, search)
 * @returns {Promise} API response
 */
export const getAllUploads = async (params = {}) => {
    try {
        const response = await apiClient.get('/uploads', { params });
        return response.data;
    } catch (error) {
        throw handleUploadError(error);
    }
};

/**
 * Get current user's uploads
 * @param {Object} params - Query parameters (page, limit, sort)
 * @returns {Promise} API response
 */
export const getMyUploads = async (params = {}) => {
    try {
        const response = await apiClient.get('/uploads/my-files', { params });
        return response.data;
    } catch (error) {
        throw handleUploadError(error);
    }
};

/**
 * Update upload metadata
 * @param {string} id - Upload ID
 * @param {Object} data - Metadata to update (title, description, category)
 * @returns {Promise} API response
 */
export const updateUploadMetadata = async (id, data) => {
    try {
        const response = await apiClient.patch(`/uploads/${id}`, data);
        return response.data;
    } catch (error) {
        throw handleUploadError(error);
    }
};

/**
 * Increment download counter
 * @param {string} id - Upload ID
 * @returns {Promise} API response
 */
export const incrementDownloads = async (id) => {
    try {
        const response = await apiClient.post(`/uploads/${id}/download`);
        return response.data;
    } catch (error) {
        throw handleUploadError(error);
    }
};

export default {
    uploadFile,
    uploadMultipleFiles,
    uploadDocument,
    uploadImage,
    uploadVideo,
    getFileInfo,
    deleteFile,
    getAllUploads,
    getMyUploads,
    updateUploadMetadata,
    incrementDownloads,
};

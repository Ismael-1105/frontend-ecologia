import apiClient from './client';

/**
 * Upload API Service
 * Handles file upload operations
 */

/**
 * Upload a single file
 * @param {File} file - File to upload
 * @param {string} type - Upload type: 'image', 'video', 'document', 'audio', or 'single'
 * @returns {Promise} API response
 */
export const uploadFile = async (file, type = 'single') => {
    const formData = new FormData();

    // Determine field name based on type
    const fieldName = type === 'single' ? 'file' : type;
    formData.append(fieldName, file);

    const endpoint = type === 'single' ? '/uploads/single' : `/uploads/${type}`;

    const response = await apiClient.post(endpoint, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });

    return response.data;
};

/**
 * Upload multiple files
 * @param {FileList|Array} files - Files to upload
 * @returns {Promise} API response
 */
export const uploadMultipleFiles = async (files) => {
    const formData = new FormData();

    Array.from(files).forEach(file => {
        formData.append('files', file);
    });

    const response = await apiClient.post('/uploads/multiple', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });

    return response.data;
};

/**
 * Upload a document (PDF, DOC, DOCX, TXT)
 * @param {File} file - Document file to upload
 * @returns {Promise} API response
 */
export const uploadDocument = async (file) => {
    return uploadFile(file, 'document');
};

/**
 * Upload an image
 * @param {File} file - Image file to upload
 * @returns {Promise} API response
 */
export const uploadImage = async (file) => {
    return uploadFile(file, 'image');
};

/**
 * Upload a video
 * @param {File} file - Video file to upload
 * @returns {Promise} API response
 */
export const uploadVideo = async (file) => {
    return uploadFile(file, 'video');
};

/**
 * Get file information
 * @param {string} filename - Filename to get info for
 * @returns {Promise} API response
 */
export const getFileInfo = async (filename) => {
    const response = await apiClient.get(`/uploads/${filename}`);
    return response.data;
};

/**
 * Delete a file
 * @param {string} filename - Filename to delete
 * @returns {Promise} API response
 */
export const deleteFile = async (filename) => {
    const response = await apiClient.delete(`/uploads/${filename}`);
    return response.data;
};

export default {
    uploadFile,
    uploadMultipleFiles,
    uploadDocument,
    uploadImage,
    uploadVideo,
    getFileInfo,
    deleteFile,
};

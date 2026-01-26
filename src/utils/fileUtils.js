/**
 * File Upload Utilities
 * Helper functions for file validation, formatting, and preview generation
 */

/**
 * File type configurations and limits
 */
export const FILE_LIMITS = {
    image: {
        maxSize: 10 * 1024 * 1024, // 10MB
        allowedTypes: ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif'],
        allowedExtensions: ['.jpg', '.jpeg', '.png', '.webp', '.gif']
    },
    video: {
        maxSize: 50 * 1024 * 1024, // 50MB
        allowedTypes: ['video/mp4', 'video/mpeg', 'video/quicktime', 'video/x-msvideo', 'video/x-matroska', 'video/webm'],
        allowedExtensions: ['.mp4', '.avi', '.mov', '.mkv', '.webm', '.mpeg']
    },
    document: {
        maxSize: 10 * 1024 * 1024, // 10MB
        allowedTypes: ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'text/plain'],
        allowedExtensions: ['.pdf', '.doc', '.docx', '.txt']
    },
    audio: {
        maxSize: 20 * 1024 * 1024, // 20MB
        allowedTypes: ['audio/mpeg', 'audio/wav', 'audio/ogg', 'audio/webm'],
        allowedExtensions: ['.mp3', '.wav', '.ogg', '.webm']
    }
};

/**
 * Validate file type
 * @param {File} file - File to validate
 * @param {string} type - Expected type: 'image', 'video', 'document', 'audio'
 * @returns {Object} { valid: boolean, error: string|null }
 */
export const validateFileType = (file, type) => {
    if (!file) {
        return { valid: false, error: 'No se proporcionó ningún archivo' };
    }

    const config = FILE_LIMITS[type];
    if (!config) {
        return { valid: false, error: 'Tipo de archivo no soportado' };
    }

    const fileExtension = '.' + file.name.split('.').pop().toLowerCase();

    if (!config.allowedTypes.includes(file.type)) {
        return {
            valid: false,
            error: `Tipo de archivo no permitido. Formatos aceptados: ${config.allowedExtensions.join(', ')}`
        };
    }

    if (!config.allowedExtensions.includes(fileExtension)) {
        return {
            valid: false,
            error: `Extensión no permitida. Formatos aceptados: ${config.allowedExtensions.join(', ')}`
        };
    }

    return { valid: true, error: null };
};

/**
 * Validate file size
 * @param {File} file - File to validate
 * @param {string} type - File type: 'image', 'video', 'document', 'audio'
 * @returns {Object} { valid: boolean, error: string|null }
 */
export const validateFileSize = (file, type) => {
    if (!file) {
        return { valid: false, error: 'No se proporcionó ningún archivo' };
    }

    const config = FILE_LIMITS[type];
    if (!config) {
        return { valid: false, error: 'Tipo de archivo no soportado' };
    }

    if (file.size > config.maxSize) {
        const maxSizeMB = (config.maxSize / (1024 * 1024)).toFixed(0);
        return {
            valid: false,
            error: `El archivo excede el tamaño máximo de ${maxSizeMB}MB`
        };
    }

    return { valid: true, error: null };
};

/**
 * Validate file completely (type and size)
 * @param {File} file - File to validate
 * @param {string} type - File type: 'image', 'video', 'document', 'audio'
 * @returns {Object} { valid: boolean, error: string|null }
 */
export const validateFile = (file, type) => {
    const typeValidation = validateFileType(file, type);
    if (!typeValidation.valid) {
        return typeValidation;
    }

    const sizeValidation = validateFileSize(file, type);
    if (!sizeValidation.valid) {
        return sizeValidation;
    }

    return { valid: true, error: null };
};

/**
 * Format file size to human-readable string
 * @param {number} bytes - File size in bytes
 * @returns {string} Formatted size (e.g., "2.5 MB")
 */
export const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 B';
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    if (bytes < 1024 * 1024 * 1024) return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
    return `${(bytes / (1024 * 1024 * 1024)).toFixed(1)} GB`;
};

/**
 * Get file extension
 * @param {string} filename - Filename
 * @returns {string} Extension (e.g., ".jpg")
 */
export const getFileExtension = (filename) => {
    return '.' + filename.split('.').pop().toLowerCase();
};

/**
 * Check if file is an image
 * @param {File} file - File to check
 * @returns {boolean}
 */
export const isImage = (file) => {
    return file && file.type.startsWith('image/');
};

/**
 * Check if file is a video
 * @param {File} file - File to check
 * @returns {boolean}
 */
export const isVideo = (file) => {
    return file && file.type.startsWith('video/');
};

/**
 * Check if file is a document
 * @param {File} file - File to check
 * @returns {boolean}
 */
export const isDocument = (file) => {
    if (!file) return false;
    return file.type === 'application/pdf' ||
        file.type.includes('document') ||
        file.type === 'text/plain';
};

/**
 * Create preview URL for image file
 * @param {File} file - Image file
 * @returns {string} Object URL for preview
 */
export const createImagePreview = (file) => {
    if (!isImage(file)) {
        throw new Error('El archivo no es una imagen');
    }
    return URL.createObjectURL(file);
};

/**
 * Create preview URL for video file
 * @param {File} file - Video file
 * @returns {string} Object URL for preview
 */
export const createVideoPreview = (file) => {
    if (!isVideo(file)) {
        throw new Error('El archivo no es un video');
    }
    return URL.createObjectURL(file);
};

/**
 * Revoke object URL to free memory
 * @param {string} url - Object URL to revoke
 */
export const revokePreviewUrl = (url) => {
    if (url && url.startsWith('blob:')) {
        URL.revokeObjectURL(url);
    }
};

/**
 * Get file icon name based on type
 * @param {File|string} file - File object or mimetype string
 * @returns {string} Icon name for Material-UI icons
 */
export const getFileIcon = (file) => {
    const mimetype = typeof file === 'string' ? file : file?.type;

    if (!mimetype) return 'InsertDriveFile';

    if (mimetype.startsWith('image/')) return 'Image';
    if (mimetype.startsWith('video/')) return 'VideoFile';
    if (mimetype.startsWith('audio/')) return 'AudioFile';
    if (mimetype === 'application/pdf') return 'PictureAsPdf';
    if (mimetype.includes('document') || mimetype.includes('word')) return 'Description';
    if (mimetype === 'text/plain') return 'TextSnippet';

    return 'InsertDriveFile';
};

/**
 * Validate multiple files
 * @param {FileList|Array} files - Files to validate
 * @param {string} type - File type
 * @param {number} maxCount - Maximum number of files allowed
 * @returns {Object} { valid: boolean, error: string|null, validFiles: Array }
 */
export const validateMultipleFiles = (files, type, maxCount = 5) => {
    const fileArray = Array.from(files);

    if (fileArray.length === 0) {
        return { valid: false, error: 'No se seleccionaron archivos', validFiles: [] };
    }

    if (fileArray.length > maxCount) {
        return {
            valid: false,
            error: `Máximo ${maxCount} archivos permitidos`,
            validFiles: []
        };
    }

    const validFiles = [];
    const errors = [];

    fileArray.forEach((file, index) => {
        const validation = validateFile(file, type);
        if (validation.valid) {
            validFiles.push(file);
        } else {
            errors.push(`Archivo ${index + 1}: ${validation.error}`);
        }
    });

    if (errors.length > 0) {
        return {
            valid: false,
            error: errors.join('\n'),
            validFiles
        };
    }

    return { valid: true, error: null, validFiles };
};

export default {
    FILE_LIMITS,
    validateFileType,
    validateFileSize,
    validateFile,
    validateMultipleFiles,
    formatFileSize,
    getFileExtension,
    isImage,
    isVideo,
    isDocument,
    createImagePreview,
    createVideoPreview,
    revokePreviewUrl,
    getFileIcon
};

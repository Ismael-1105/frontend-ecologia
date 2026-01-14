/**
 * Application constants
 * Centralized configuration and magic numbers
 */

// API Configuration
export const API_CONFIG = {
    BASE_URL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api',
    TIMEOUT: 30000,
    RETRY_ATTEMPTS: 3,
    RETRY_DELAY: 1000,
};

// Pagination
export const PAGINATION = {
    DEFAULT_PAGE_SIZE: 12,
    PAGE_SIZE_OPTIONS: [6, 12, 24, 48],
};

// File Upload Limits
export const FILE_UPLOAD = {
    MAX_VIDEO_SIZE: 500 * 1024 * 1024, // 500MB
    MAX_IMAGE_SIZE: 5 * 1024 * 1024, // 5MB
    MAX_DOCUMENT_SIZE: 10 * 1024 * 1024, // 10MB
    ALLOWED_VIDEO_TYPES: ['video/mp4', 'video/webm', 'video/ogg'],
    ALLOWED_IMAGE_TYPES: ['image/jpeg', 'image/png', 'image/webp', 'image/gif'],
    ALLOWED_DOCUMENT_TYPES: ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'],
};

// User Roles
export const ROLES = {
    STUDENT: 'Estudiante',
    TEACHER: 'Docente',
    ADMIN: 'Administrador',
    SUPER_ADMIN: 'SuperAdmin',
};

// Permissions
export const PERMISSIONS = {
    VIDEO_UPLOAD: 'video:upload',
    VIDEO_APPROVE: 'video:approve',
    USER_MANAGE: 'user:manage',
    SYSTEM_CONFIG: 'system:config',
};

// Application Routes
export const ROUTES = {
    HOME: '/',
    LOGIN: '/login',
    REGISTER: '/register',
    DASHBOARD: '/portal/dashboard',
    PROFILE: '/portal/profile',
    MY_VIDEOS: '/portal/my-videos',
    UPLOAD_VIDEO: '/portal/upload-video',
    VIDEO_PLAYER: '/portal/video-player',
    FORO: '/portal/foro',
    RECURSOS: '/portal/recursos',
    COMUNIDAD: '/portal/comunidad',
};

// Debounce Delays (in milliseconds)
export const DEBOUNCE = {
    SEARCH: 500,
    INPUT: 300,
    RESIZE: 150,
};

// Local Storage Keys
export const STORAGE_KEYS = {
    ACCESS_TOKEN: 'accessToken',
    REFRESH_TOKEN: 'refreshToken',
    THEME_MODE: 'themeMode',
    USER_PREFERENCES: 'userPreferences',
};

// Video Player Settings
export const VIDEO_PLAYER = {
    DEFAULT_VOLUME: 0.7,
    SEEK_INTERVAL: 10, // seconds
    QUALITY_LEVELS: ['auto', '1080p', '720p', '480p', '360p'],
};

// Snackbar/Toast Settings
export const SNACKBAR = {
    AUTO_HIDE_DURATION: 6000,
    MAX_SNACK: 3,
};

// Date Formats
export const DATE_FORMATS = {
    DISPLAY: 'dd/MM/yyyy',
    DISPLAY_WITH_TIME: 'dd/MM/yyyy HH:mm',
    API: 'yyyy-MM-dd',
    RELATIVE: 'relative', // For date-fns formatDistanceToNow
};

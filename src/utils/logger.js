/**
 * Conditional logger that only logs in development
 * Automatically disabled in production builds
 */
const isDevelopment = import.meta.env.MODE === 'development';

const logger = {
    /**
     * Log general information (development only)
     */
    log: (...args) => {
        if (isDevelopment) {
            console.log(...args);
        }
    },

    /**
     * Log informational messages (development only)
     */
    info: (...args) => {
        if (isDevelopment) {
            console.info(...args);
        }
    },

    /**
     * Log warning messages (development only)
     */
    warn: (...args) => {
        if (isDevelopment) {
            console.warn(...args);
        }
    },

    /**
     * Log error messages (always logged, even in production)
     */
    error: (...args) => {
        // Always log errors, even in production
        console.error(...args);
    },

    /**
     * Log debug messages (development only)
     */
    debug: (...args) => {
        if (isDevelopment) {
            console.debug(...args);
        }
    },

    /**
     * Create a namespaced logger for better organization
     * @param {string} namespace - The namespace for the logger
     * @returns {Object} Namespaced logger object
     */
    create: (namespace) => ({
        log: (...args) => logger.log(`[${namespace}]`, ...args),
        info: (...args) => logger.info(`[${namespace}]`, ...args),
        warn: (...args) => logger.warn(`[${namespace}]`, ...args),
        error: (...args) => logger.error(`[${namespace}]`, ...args),
        debug: (...args) => logger.debug(`[${namespace}]`, ...args),
    }),
};

export default logger;

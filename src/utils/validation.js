/**
 * Form validation utilities
 * Reusable validators for form fields
 */

/**
 * Validation rules
 */
export const validators = {
    /**
     * Validate email format
     */
    email: (value) => {
        if (!value) return 'Email es requerido';
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(value) || 'Email inválido';
    },

    /**
     * Validate password strength
     */
    password: (value) => {
        if (!value) return 'Contraseña es requerida';
        if (value.length < 8) return 'La contraseña debe tener al menos 8 caracteres';
        if (!/[A-Z]/.test(value)) return 'Debe contener al menos una mayúscula';
        if (!/[a-z]/.test(value)) return 'Debe contener al menos una minúscula';
        if (!/[0-9]/.test(value)) return 'Debe contener al menos un número';
        if (!/[@$!%*?&]/.test(value)) return 'Debe contener al menos un carácter especial (@$!%*?&)';
        return true;
    },

    /**
     * Validate required field
     */
    required: (fieldName = 'Este campo') => (value) => {
        return (value && value.toString().trim() !== '') || `${fieldName} es requerido`;
    },

    /**
     * Validate minimum length
     */
    minLength: (min, fieldName = 'Este campo') => (value) => {
        if (!value) return true; // Let required validator handle empty values
        return value.length >= min || `${fieldName} debe tener al menos ${min} caracteres`;
    },

    /**
     * Validate maximum length
     */
    maxLength: (max, fieldName = 'Este campo') => (value) => {
        if (!value) return true;
        return value.length <= max || `${fieldName} no puede exceder ${max} caracteres`;
    },

    /**
     * Validate number range
     */
    range: (min, max, fieldName = 'Este campo') => (value) => {
        const num = Number(value);
        if (isNaN(num)) return `${fieldName} debe ser un número`;
        if (num < min || num > max) return `${fieldName} debe estar entre ${min} y ${max}`;
        return true;
    },

    /**
     * Validate URL format
     */
    url: (value) => {
        if (!value) return true;
        try {
            new URL(value);
            return true;
        } catch {
            return 'URL inválida';
        }
    },

    /**
     * Validate file size
     */
    fileSize: (maxSize, fieldName = 'El archivo') => (file) => {
        if (!file) return true;
        const sizeMB = file.size / (1024 * 1024);
        const maxSizeMB = maxSize / (1024 * 1024);
        return file.size <= maxSize || `${fieldName} no puede exceder ${maxSizeMB.toFixed(2)}MB`;
    },

    /**
     * Validate file type
     */
    fileType: (allowedTypes, fieldName = 'El archivo') => (file) => {
        if (!file) return true;
        return allowedTypes.includes(file.type) || `${fieldName} debe ser de tipo: ${allowedTypes.join(', ')}`;
    },

    /**
     * Validate matching fields (e.g., password confirmation)
     */
    matches: (otherValue, fieldName = 'Los campos') => (value) => {
        return value === otherValue || `${fieldName} no coinciden`;
    },
};

/**
 * Validate entire form against rules
 * @param {Object} values - Form values
 * @param {Object} rules - Validation rules for each field
 * @returns {Object} Errors object
 */
export const validateForm = (values, rules) => {
    const errors = {};

    Object.keys(rules).forEach((field) => {
        const fieldRules = Array.isArray(rules[field]) ? rules[field] : [rules[field]];

        for (const rule of fieldRules) {
            const result = rule(values[field]);
            if (result !== true) {
                errors[field] = result;
                break; // Stop at first error for this field
            }
        }
    });

    return errors;
};

/**
 * Check if form has errors
 * @param {Object} errors - Errors object
 * @returns {boolean}
 */
export const hasErrors = (errors) => {
    return Object.keys(errors).length > 0;
};

/**
 * Get first error message
 * @param {Object} errors - Errors object
 * @returns {string|null}
 */
export const getFirstError = (errors) => {
    const keys = Object.keys(errors);
    return keys.length > 0 ? errors[keys[0]] : null;
};

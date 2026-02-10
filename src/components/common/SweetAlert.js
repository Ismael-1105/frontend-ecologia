import Swal from 'sweetalert2';

/**
 * Shows a confirmation dialog for deletion
 * @param {string} title - The title of the alert
 * @param {string} text - The text of the alert
 * @returns {Promise<boolean>} - Resolves to true if confirmed, false otherwise
 */
export const showDeleteConfirmation = async (
    title = '¿Estás seguro?',
    text = 'Esta acción no se puede deshacer'
) => {
    const result = await Swal.fire({
        title,
        text,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar',
        reverseButtons: true
    });

    return result.isConfirmed;
};

/**
 * Shows a success alert
 * @param {string} title - The title of the alert
 * @param {string} text - The text of the alert
 */
export const showSuccessAlert = (title = '¡Éxito!', text = '') => {
    return Swal.fire({
        title,
        text,
        icon: 'success',
        confirmButtonColor: '#3085d6',
        timer: 2000,
        timerProgressBar: true
    });
};

/**
 * Shows an error alert
 * @param {string} title - The title of the alert
 * @param {string} text - The text of the alert
 */
export const showErrorAlert = (title = 'Error', text = 'Algo salió mal') => {
    return Swal.fire({
        title,
        text,
        icon: 'error',
        confirmButtonColor: '#d33'
    });
};

/**
 * Shows a custom alert
 * @param {Object} options - SweetAlert2 options
 */
export const showCustomAlert = (options) => {
    return Swal.fire(options);
};

/**
 * Shows a confirmation dialog with a password input
 * @param {string} title - The title of the alert
 * @param {string} text - The text of the alert
 * @returns {Promise<string|null>} - Resolves to the password if confirmed, null otherwise
 */
export const showPasswordConfirmation = async (
    title = 'Confirmar acción',
    text = 'Por favor ingresa tu contraseña para confirmar'
) => {
    const result = await Swal.fire({
        title,
        text,
        input: 'password',
        inputAttributes: {
            autocapitalize: 'off',
            placeholder: 'Contraseña'
        },
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Confirmar',
        cancelButtonText: 'Cancelar',
        reverseButtons: true,
        inputValidator: (value) => {
            if (!value) {
                return '¡Debes ingresar tu contraseña!';
            }
        }
    });

    if (result.isConfirmed) {
        return result.value;
    }
    return null;
};

export default {
    showDeleteConfirmation,
    showSuccessAlert,
    showErrorAlert,
    showCustomAlert,
    showPasswordConfirmation
};

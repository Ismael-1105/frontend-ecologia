/**
 * PDF Modal Service
 * Maneja todas las llamadas a APIs y lógica de negocio del modal PDF
 */

const getFileUrl = (path) => {
    const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:8080/api';
    const cleanBaseUrl = baseUrl.replace(/\/api$/, '');
    return `${cleanBaseUrl}${path}`;
};

export const pdfModalService = {
    /**
     * Obtiene la URL del archivo PDF
     * @param {Object} resource - Recurso con información del PDF
     * @param {string} pdfUrl - URL del PDF base64 (si aplica)
     * @returns {Object} { url, source, isBase64 }
     */
    getPdfSource: (resource, pdfUrl = null) => {
        if (!resource) return { url: null, source: null, isBase64: false };

        const uploadId = resource?.id || resource?._id;
        const hasUrl = !!resource?.url;
        const isBase64Pdf = !hasUrl && !!uploadId;

        // Prioridad 1: PDF base64 con URL disponible
        if (isBase64Pdf && pdfUrl) {
            return {
                url: pdfUrl,
                source: 'base64',
                isBase64: true,
            };
        }

        // Prioridad 2: PDF con URL directa
        if (hasUrl && resource?.url) {
            return {
                url: getFileUrl(resource.url),
                source: 'direct',
                isBase64: false,
            };
        }

        // Prioridad 3: Si es base64, esperar a que cargue
        if (isBase64Pdf && !pdfUrl) {
            return {
                url: null,
                source: 'waiting',
                isBase64: true,
            };
        }

        return { url: null, source: null, isBase64: false };
    },

    /**
     * Descarga el archivo PDF
     * @param {Object} resource - Datos del recurso
     * @param {boolean} isBase64 - Si es PDF base64
     * @param {string} uploadId - ID del upload
     * @param {Function} downloadBase64 - Función para descargar base64
     */
    downloadPdf: async (resource, isBase64, uploadId, downloadBase64) => {
        try {
            const filename = resource?.originalName || resource?.filename || 'documento.pdf';

            if (isBase64 && uploadId && downloadBase64) {
                console.log('📥 Downloading base64 PDF:', uploadId);
                await downloadBase64(uploadId, filename);
            } else if (resource?.url) {
                console.log('📥 Downloading PDF from URL');
                const link = document.createElement('a');
                link.href = getFileUrl(resource.url);
                link.download = filename;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            }

            return { success: true, message: 'Descarga iniciada' };
        } catch (error) {
            console.error('❌ Download error:', error);
            throw new Error(`Download failed: ${error.message}`);
        }
    },

    /**
     * Valida que el recurso tenga datos válidos
     * @param {Object} resource - Recurso a validar
     * @returns {Object} { isValid, error }
     */
    validateResource: (resource) => {
        if (!resource) {
            return { isValid: false, error: 'No se proporcionó un recurso' };
        }

        const hasUrl = !!resource?.url;
        const uploadId = resource?.id || resource?._id;

        if (!hasUrl && !uploadId) {
            return {
                isValid: false,
                error: 'El recurso no tiene URL ni ID válido',
            };
        }

        return { isValid: true, error: null };
    },

    /**
     * Obtiene información del autor
     * @param {Object} resource - Recurso
     * @returns {string} Nombre del autor
     */
    getAuthorName: (resource) => {
        return resource?.uploadedBy?.name || resource?.author || 'Desconocido';
    },

    /**
     * Obtiene la URL del archivo
     * @param {string} path - Ruta del archivo
     * @returns {string} URL completa
     */
    getFileUrl,
};

export default pdfModalService;

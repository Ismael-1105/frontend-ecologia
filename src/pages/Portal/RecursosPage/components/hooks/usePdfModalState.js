/**
 * Hook personalizado para gestionar el estado del modal PDF
 */

import { useState, useEffect, useCallback } from 'react';
import { pdfModalService } from '../utils/pdfModalService';

export const usePdfModalState = (resource, open, pdfUrl) => {
    const [numPages, setNumPages] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [pdfSource, setPdfSource] = useState(null);

    const uploadId = resource?.id || resource?._id;
    const hasUrl = !!resource?.url;
    const isBase64Pdf = !hasUrl && !!uploadId;

    // Inicializar estado cuando se abre o cambia el recurso
    useEffect(() => {
        if (!open) {
            setPdfSource(null);
            setNumPages(null);
            setError(null);
            setLoading(false);
            return;
        }

        // Validar recurso
        const validation = pdfModalService.validateResource(resource);
        if (!validation.isValid) {
            setError(validation.error);
            setLoading(false);
            return;
        }

        console.log('🔍 Modal abierto', {
            hasUrl,
            isBase64Pdf,
            uploadId,
            pdfUrlAvailable: !!pdfUrl,
            resourceUrl: resource?.url
        });

        // Obtener fuente del PDF
        const pdfSourceData = pdfModalService.getPdfSource(resource, pdfUrl);

        if (pdfSourceData.url) {
            console.log(`✓ Setting pdfSource from ${pdfSourceData.source}`);
            setPdfSource(pdfSourceData.url);
            setLoading(true);
            setError(null);
        } else if (pdfSourceData.source === 'waiting') {
            console.log('⏳ Waiting for pdfUrl from hook...');
            setLoading(true);
            setError(null);
        } else {
            console.error('❌ Cannot load PDF - invalid resource');
            setError('No se encontró el PDF. Verifica los datos del recurso.');
            setLoading(false);
        }
    }, [open, isBase64Pdf, pdfUrl, hasUrl, resource?.url, uploadId, resource]);

    // Cuando el pdfUrl está disponible (para base64)
    useEffect(() => {
        if (open && isBase64Pdf && pdfUrl && !pdfSource) {
            console.log('✓ pdfUrl updated, setting pdfSource');
            setPdfSource(pdfUrl);
            setLoading(true);
            setError(null);
        }
    }, [open, isBase64Pdf, pdfUrl, pdfSource]);

    // Handle PDF load success
    const onDocumentLoadSuccess = useCallback(({ numPages }) => {
        console.log('✓ PDF document loaded:', numPages, 'pages');
        setNumPages(numPages);
        setLoading(false);
        setError(null);
    }, []);

    // Handle PDF load error
    const onDocumentLoadError = useCallback((err) => {
        console.error('❌ PDF load error:', err);
        const errorMsg = err?.message || 'Error desconocido al cargar el PDF';
        setError(`Error al cargar PDF: ${errorMsg}`);
        setLoading(false);
    }, []);

    // Reset state
    const resetState = useCallback(() => {
        setPdfSource(null);
        setNumPages(null);
        setError(null);
        setLoading(false);
    }, []);

    return {
        // State
        numPages,
        loading,
        error,
        pdfSource,
        isBase64Pdf,
        uploadId,

        // Handlers
        onDocumentLoadSuccess,
        onDocumentLoadError,
        resetState,

        // Computed
        authorName: pdfModalService.getAuthorName(resource),
    };
};

export default usePdfModalState;

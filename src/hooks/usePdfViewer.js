import { useState, useCallback, useEffect } from 'react';
import { getPdfUrl, viewPdfInNewTab, downloadPdf } from '../core/api/uploadService';
import pdfCache from '../utils/pdfCache';

/**
 * Custom hook for PDF viewing and management with caching
 * @param {string} uploadId - Upload ID of the PDF
 * @param {boolean} autoLoad - Auto-load PDF on mount (default: false)
 * @returns {Object} PDF state and handlers
 */
export const usePdfViewer = (uploadId = null, autoLoad = false) => {
    const [pdfUrl, setPdfUrl] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [isOpen, setIsOpen] = useState(false);
    const [isCached, setIsCached] = useState(false);

    /**
     * Load PDF with caching
     */
    const loadPdf = useCallback(async (id = uploadId) => {
        if (!id) {
            setError('No se proporcionó ID del documento');
            return;
        }

        // Check cache first
        const cachedUrl = pdfCache.get(id);
        if (cachedUrl) {
            setPdfUrl(cachedUrl);
            setIsCached(true);
            setIsOpen(true);
            setError(null);
            console.log('[PDF Cache] ✓ Using cached PDF:', id);
            return;
        }

        setLoading(true);
        setError(null);
        setIsCached(false);

        try {
            console.log('[PDF Cache] ⬇ Loading PDF from server:', id);
            const url = await getPdfUrl(id);
            
            // Cache the URL
            pdfCache.set(id, url);
            
            setPdfUrl(url);
            setIsOpen(true);
            console.log('[PDF Cache] ✓ PDF loaded and cached:', id);
        } catch (err) {
            setError(err.message || 'Error al cargar el PDF');
            setPdfUrl(null);
            console.error('[PDF Cache] ✗ Failed to load PDF:', err);
        } finally {
            setLoading(false);
        }
    }, [uploadId]);

    /**
     * Close PDF viewer (keep URL in cache)
     */
    const closePdf = useCallback(() => {
        // Don't revoke URL - keep it in cache
        setIsOpen(false);
        setError(null);
    }, []);

    /**
     * Clear PDF and remove from cache
     */
    const clearPdf = useCallback(() => {
        if (uploadId && pdfUrl) {
            pdfCache.remove(uploadId);
        }
        setPdfUrl(null);
        setIsOpen(false);
        setError(null);
        setIsCached(false);
    }, [uploadId, pdfUrl]);

    /**
     * Download PDF file
     */
    const download = useCallback(async (id = uploadId, filename = 'documento.pdf') => {
        if (!id) {
            setError('No se proporcionó ID del documento');
            return false;
        }

        setLoading(true);
        setError(null);

        try {
            await downloadPdf(id, filename);
            return true;
        } catch (err) {
            setError(err.message || 'Error al descargar el PDF');
            return false;
        } finally {
            setLoading(false);
        }
    }, [uploadId]);

    /**
     * Open PDF in new tab
     */
    const openInNewTab = useCallback(async (id = uploadId) => {
        if (!id) {
            setError('No se proporcionó ID del documento');
            return;
        }

        setLoading(true);
        setError(null);

        try {
            await viewPdfInNewTab(id);
        } catch (err) {
            setError(err.message || 'Error al abrir el PDF');
        } finally {
            setLoading(false);
        }
    }, [uploadId]);

    /**
     * Auto-load PDF if uploadId is provided and autoLoad is true
     */
    useEffect(() => {
        if (uploadId && autoLoad && !pdfUrl && !loading) {
            loadPdf(uploadId);
        }
    }, [uploadId, autoLoad, pdfUrl, loading, loadPdf]);

    /**
     * Cleanup on unmount - only clear state, keep cache
     */
    useEffect(() => {
        return () => {
            // Don't revoke URLs on unmount - they're in cache
            setIsOpen(false);
        };
    }, []);

    return {
        pdfUrl,
        loading,
        error,
        isOpen,
        isCached,
        loadPdf,
        closePdf,
        clearPdf,
        download,
        openInNewTab,
        setIsOpen,
    };
};

/**
 * Custom hook for multiple PDFs management
 * @returns {Object} Multiple PDFs state and handlers
 */
export const useMultiplePdfViewer = () => {
    const [pdfs, setPdfs] = useState({});
    const [activePdfId, setActivePdfId] = useState(null);

    const registerPdf = useCallback((id, data) => {
        setPdfs(prev => ({
            ...prev,
            [id]: data
        }));
    }, []);

    const unregisterPdf = useCallback((id) => {
        setPdfs(prev => {
            const updated = { ...prev };
            if (updated[id]?.url) {
                window.URL.revokeObjectURL(updated[id].url);
            }
            delete updated[id];
            return updated;
        });
    }, []);

    const setActivePdf = useCallback((id) => {
        setActivePdfId(id);
    }, []);

    const cleanup = useCallback(() => {
        Object.values(pdfs).forEach(pdf => {
            if (pdf.url) {
                window.URL.revokeObjectURL(pdf.url);
            }
        });
        setPdfs({});
        setActivePdfId(null);
    }, [pdfs]);

    useEffect(() => {
        return cleanup;
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return {
        pdfs,
        activePdfId,
        registerPdf,
        unregisterPdf,
        setActivePdf,
        cleanup,
    };
};

export default usePdfViewer;

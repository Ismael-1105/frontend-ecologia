import React, { useState, useEffect, useCallback } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Box,
    Typography,
    CircularProgress,
    Alert,
} from '@mui/material';
import {
    Close as CloseIcon,
    Download as DownloadIcon,
} from '@mui/icons-material';
import { Document, Page, pdfjs } from 'react-pdf';
import * as uploadService from '../../core/api/uploadService';
import { usePdfViewer } from '../../hooks/usePdfViewer';


// ✅ Configure worker from local node_modules
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    'pdfjs-dist/build/pdf.worker.min.mjs',
    import.meta.url
).toString();

const getFileUrl = (path) => {
    const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:8080/api';
    const cleanBaseUrl = baseUrl.replace(/\/api$/, '');
    return `${cleanBaseUrl}${path}`;
};

const PdfViewerModal = ({ open, onClose, resource }) => {
    const [numPages, setNumPages] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [pdfSource, setPdfSource] = useState(null);

    const uploadId = resource?.id || resource?._id;
    const hasUrl = !!resource?.url;
    const isBase64Pdf = !hasUrl && !!uploadId; // ✅ FIXED: Force boolean

    // Hook para PDFs base64
    const { pdfUrl, loading: urlLoading, error: urlError, download } = 
        usePdfViewer(isBase64Pdf ? uploadId : null, isBase64Pdf && open);

    // Cuando se abre o cambia el recurso
    useEffect(() => {
        if (!open) {
            setPdfSource(null);
            setNumPages(null);
            setError(null);
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

        // Prioridad 1: PDF base64 con URL disponible
        if (isBase64Pdf && pdfUrl) {
            console.log('✓ Setting pdfSource from pdfUrl');
            setPdfSource(pdfUrl);
            setLoading(true);
            setError(null);
            return;
        }

        // Prioridad 2: PDF con URL directa en resource
        if (hasUrl && resource?.url) {
            const fileUrl = getFileUrl(resource.url);
            console.log('✓ Setting pdfSource from resource.url:', fileUrl);
            setPdfSource(fileUrl);
            setLoading(true);
            setError(null);
            return;
        }

        // Prioridad 3: Si es base64, esperar a que cargue el hook
        if (isBase64Pdf && !pdfUrl) {
            console.log('⏳ Waiting for pdfUrl from hook...');
            setLoading(true);
            setError(null);
            return;
        }

        // No hay forma de cargar el PDF
        console.error('❌ Cannot load PDF - invalid resource');
        setError('No se encontró el PDF. Verifica los datos del recurso.');
        setLoading(false);
    }, [open, isBase64Pdf, pdfUrl, hasUrl, resource?.url, uploadId]);

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
        const errorMsg = err?.message || 'Unknown error loading PDF';
        setError(`Error loading PDF: ${errorMsg}`);
        setLoading(false);
    }, []);

    // Handle download
    const handleDownload = useCallback(async () => {
        try {
            const filename = resource?.originalName || resource?.filename || 'documento.pdf';
            
            if (isBase64Pdf && uploadId) {
                console.log('📥 Downloading base64 PDF:', uploadId);
                await download(uploadId, filename);
            } else if (hasUrl && resource?.url) {
                console.log('📥 Downloading PDF from URL');
                const link = document.createElement('a');
                link.href = getFileUrl(resource.url);
                link.download = filename;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            }
        } catch (err) {
            console.error('❌ Download error:', err);
            setError(`Download failed: ${err.message}`);
        }
    }, [isBase64Pdf, uploadId, hasUrl, resource, download]);

    // Handle close
    const handleClose = useCallback(() => {
        setPdfSource(null);
        setNumPages(null);
        setError(null);
        setLoading(false);
        onClose();
    }, [onClose]);



    const authorName = resource?.uploadedBy?.name || resource?.author || 'Unknown';
    const isLoading = loading || (isBase64Pdf && urlLoading);
    const displayError = error || urlError;

    console.log('📊 Render state:', {
        pdfSource: !!pdfSource,
        isLoading,
        hasError: !!displayError,
        numPages,
        isBase64Pdf,
        uploadId: !!uploadId
    });


    return (
        <Dialog
            open={open}
            onClose={handleClose}
            maxWidth="lg"
            fullWidth
            PaperProps={{
                sx: {
                    height: '90vh',
                    maxHeight: '90vh',
                }
            }}
        >
            {/* Header */}
            <DialogTitle>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Box>
                        <Typography variant="h6">{resource?.title || 'PDF'}</Typography>
                        <Typography variant="caption" color="text.secondary">
                            Por {authorName} {numPages && `• ${numPages} páginas`}
                        </Typography>
                    </Box>
                    <Button
                        size="small"
                        onClick={handleClose}
                        startIcon={<CloseIcon />}
                        variant="text"
                    />
                </Box>
            </DialogTitle>

            {/* Content */}
            <DialogContent sx={{ p: 2, display: 'flex', flexDirection: 'column', flex: 1, overflow: 'auto', bgcolor: '#f5f5f5' }}>
                {/* Error state */}
                {displayError && !pdfSource && (
                    <Alert severity="error" sx={{ mb: 2 }}>
                        {displayError}
                        <Box sx={{ mt: 2 }}>
                            <Typography variant="caption" display="block">
                                Datos del recurso:
                            </Typography>
                            <Typography variant="caption" component="pre" sx={{ whiteSpace: 'pre-wrap', fontFamily: 'monospace', fontSize: '10px' }}>
                                {JSON.stringify({ hasUrl, isBase64Pdf, uploadId, resourceUrl: resource?.url }, null, 2)}
                            </Typography>
                        </Box>
                    </Alert>
                )}

                {/* No PDF available */}
                {!pdfSource && !displayError && (
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 2, py: 4, flex: 1 }}>
                        <Typography color="error">No se pudo cargar el PDF</Typography>
                        <Typography variant="caption">Verifica que el recurso tenga una URL o ID válido</Typography>
                    </Box>
                )}

                {/* PDF Viewer - Always render Document, let it handle loading */}
                {pdfSource && (
                    <Box sx={{ display: 'flex', justifyContent: 'center', flex: 1, overflow: 'auto', bgcolor: 'white' }}>
                        <Box sx={{ p: 2, maxWidth: '100%' }}>
                            <Document
                                file={pdfSource}
                                onLoadSuccess={onDocumentLoadSuccess}
                                onLoadError={onDocumentLoadError}
                                loading={
                                    <Box sx={{ p: 4, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
                                        <CircularProgress size={40} />
                                        <Typography variant="body2">Procesando PDF...</Typography>
                                    </Box>
                                }
                                error={
                                    <Alert severity="error">
                                        Error al procesar el PDF. Verifica que sea un PDF válido.
                                    </Alert>
                                }
                                options={{
                                    cMapUrl: `https://unpkg.com/pdfjs-dist@${pdfjs.version}/cmaps/`,
                                    cMapPacked: true,
                                }}
                            >
                                {numPages && Array.from({ length: numPages }, (_, i) => (
                                    <Box key={`page-${i + 1}`} sx={{ mb: 2, display: 'flex', justifyContent: 'center' }}>
                                        <Page
                                            pageNumber={i + 1}
                                            scale={1.5}
                                            renderTextLayer={false}
                                            renderAnnotationLayer={false}
                                        />
                                    </Box>
                                ))}
                            </Document>
                        </Box>
                    </Box>
                )}
            </DialogContent>

            {/* Footer */}
            <DialogActions sx={{ p: 2, borderTop: '1px solid #eee' }}>
                <Typography variant="caption" color="text.secondary">
                    {pdfSource ? (numPages ? `${numPages} páginas` : 'Cargando...') : 'Sin PDF'}
                </Typography>
                <Button onClick={handleClose}>Cerrar</Button>
                <Button
                    variant="contained"
                    startIcon={<DownloadIcon />}
                    onClick={handleDownload}
                    disabled={isLoading || !pdfSource}
                >
                    Descargar
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default PdfViewerModal;
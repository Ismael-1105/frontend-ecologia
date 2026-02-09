import React, { useState } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Box,
    Typography,
    IconButton,
    Stack,
    Chip,
    CircularProgress,
    Alert
} from '@mui/material';
import {
    Close as CloseIcon,
    Download as DownloadIcon,
    NavigateBefore as NavigateBeforeIcon,
    NavigateNext as NavigateNextIcon,
    ZoomIn as ZoomInIcon,
    ZoomOut as ZoomOutIcon
} from '@mui/icons-material';
import { Document, Page, pdfjs } from 'react-pdf';
import * as uploadService from '../../core/api/uploadService';



// ✅ Worker desde CDN - garantiza la versión correcta automáticamente
pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

const getFileUrl = (path) => {
    const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:8080/api';
    const cleanBaseUrl = baseUrl.replace(/\/api$/, '');
    return `${cleanBaseUrl}${path}`;
};

const PdfViewerModal = ({ open, onClose, resource }) => {
    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);
    const [scale, setScale] = useState(1.0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const onDocumentLoadSuccess = ({ numPages }) => {
        setNumPages(numPages);
        setLoading(false);
        setError(null);
    };

    const onDocumentLoadError = (error) => {
        console.error('Error loading PDF:', error);
        setError('Error al cargar el PDF. Por favor, intenta descargarlo.');
        setLoading(false);
    };

    const handlePreviousPage = () => setPageNumber(prev => Math.max(prev - 1, 1));
    const handleNextPage = () => setPageNumber(prev => Math.min(prev + 1, numPages));
    const handleZoomIn = () => setScale(prev => Math.min(prev + 0.2, 2.0));
    const handleZoomOut = () => setScale(prev => Math.max(prev - 0.2, 0.5));

    const handleDownload = async () => {
        try {
            await uploadService.downloadFile(resource.id || resource._id, resource.originalName || resource.filename);
        } catch (err) {
            console.error('Error downloading file:', err);
            // Fallback to direct link if API fails
            const link = document.createElement('a');
            link.href = getFileUrl(resource.url);
            link.download = resource.originalName || resource.filename;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    };

    const handleClose = () => {
        setPageNumber(1);
        setScale(1.0);
        setLoading(true);
        setError(null);
        setNumPages(null);
        onClose();
    };

    const authorName = resource?.uploadedBy?.name || resource?.author || 'Desconocido';

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            maxWidth="lg"
            fullWidth
            PaperProps={{ sx: { height: '90vh', maxHeight: '90vh' } }}
        >
            <DialogTitle sx={{ pb: 1 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <Box sx={{ flex: 1, pr: 2 }}>
                        <Typography variant="h6" sx={{ fontWeight: 600, mb: 0.5 }}>
                            {resource?.title || 'Documento PDF'}
                        </Typography>
                        <Stack direction="row" spacing={1} flexWrap="wrap" sx={{ mt: 1 }}>
                            <Typography variant="caption" color="text.secondary">
                                Por {authorName}
                            </Typography>
                            {resource?.category && resource.category !== 'Otro' && (
                                <>
                                    <Typography variant="caption" color="text.secondary">•</Typography>
                                    <Chip label={resource.category} size="small" variant="outlined" sx={{ height: 20 }} />
                                </>
                            )}
                            {resource?.downloads !== undefined && (
                                <>
                                    <Typography variant="caption" color="text.secondary">•</Typography>
                                    <Typography variant="caption" color="text.secondary">
                                        {resource.downloads} descargas
                                    </Typography>
                                </>
                            )}
                        </Stack>
                    </Box>
                    <IconButton onClick={handleClose} size="small">
                        <CloseIcon />
                    </IconButton>
                </Box>
            </DialogTitle>

            <DialogContent sx={{ p: 0, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', px: 2, py: 1, borderBottom: 1, borderColor: 'divider', bgcolor: 'background.default' }}>
                    <Stack direction="row" spacing={1} alignItems="center">
                        <IconButton size="small" onClick={handlePreviousPage} disabled={pageNumber <= 1 || loading}>
                            <NavigateBeforeIcon />
                        </IconButton>
                        <Typography variant="body2" sx={{ minWidth: 80, textAlign: 'center' }}>
                            {numPages ? `${pageNumber} / ${numPages}` : '--'}
                        </Typography>
                        <IconButton size="small" onClick={handleNextPage} disabled={pageNumber >= numPages || loading}>
                            <NavigateNextIcon />
                        </IconButton>
                    </Stack>

                    <Stack direction="row" spacing={1} alignItems="center">
                        <IconButton size="small" onClick={handleZoomOut} disabled={scale <= 0.5}>
                            <ZoomOutIcon />
                        </IconButton>
                        <Typography variant="body2" sx={{ minWidth: 50, textAlign: 'center' }}>
                            {Math.round(scale * 100)}%
                        </Typography>
                        <IconButton size="small" onClick={handleZoomIn} disabled={scale >= 2.0}>
                            <ZoomInIcon />
                        </IconButton>
                    </Stack>
                </Box>

                <Box sx={{ flex: 1, overflow: 'auto', display: 'flex', justifyContent: 'center', alignItems: 'flex-start', bgcolor: 'grey.100', p: 2 }}>
                    {error ? (
                        <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>
                    ) : (
                        <Document
                            file={getFileUrl(resource?.url)}
                            onLoadSuccess={onDocumentLoadSuccess}
                            onLoadError={onDocumentLoadError}
                            loading={
                                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, mt: 4 }}>
                                    <CircularProgress />
                                    <Typography variant="body2" color="text.secondary">Cargando PDF...</Typography>
                                </Box>
                            }
                        >
                            <Page pageNumber={pageNumber} scale={scale} renderTextLayer={true} renderAnnotationLayer={true} />
                        </Document>
                    )}
                </Box>

                {resource?.description && (
                    <Box sx={{ px: 2, py: 1.5, borderTop: 1, borderColor: 'divider', bgcolor: 'background.paper' }}>
                        <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600 }}>Descripción:</Typography>
                        <Typography variant="body2" sx={{ mt: 0.5 }}>{resource.description}</Typography>
                    </Box>
                )}
            </DialogContent>

            <DialogActions sx={{ px: 3, py: 2 }}>
                <Button onClick={handleClose}>Cerrar</Button>
                <Button variant="contained" startIcon={<DownloadIcon />} onClick={handleDownload}>Descargar</Button>
            </DialogActions>
        </Dialog>
    );
};

export default PdfViewerModal;
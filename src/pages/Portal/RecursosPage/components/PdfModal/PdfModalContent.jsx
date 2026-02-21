import React from 'react';
import {
    DialogContent,
    Box,
    Typography,
    CircularProgress,
    Alert,
    AlertTitle,
} from '@mui/material';
import {
    ErrorOutline as ErrorOutlineIcon,
    InsertDriveFile as FileIcon,
} from '@mui/icons-material';
import { Document, Page, pdfjs } from 'react-pdf';
import { alpha, useTheme } from '@mui/material/styles';

const PdfModalContent = ({
    pdfSource,
    loading,
    error,
    numPages,
    onDocumentLoadSuccess,
    onDocumentLoadError,
    resource,
    hasUrl,
    isBase64Pdf,
    uploadId,
}) => {
    const theme = useTheme();

    return (
        <DialogContent 
            sx={{ 
                p: 0,
                display: 'flex', 
                flexDirection: 'column', 
                flex: 1, 
                overflow: 'auto',
                bgcolor: theme.palette.mode === 'dark' 
                    ? alpha(theme.palette.background.default, 0.5)
                    : alpha(theme.palette.primary.light, 0.05),
            }}
        >
            {/* Error state */}
            {error && !pdfSource && (
                <Box sx={{ p: 3 }}>
                    <Alert 
                        severity="error"
                        icon={<ErrorOutlineIcon />}
                        sx={{
                            borderRadius: 2,
                            '& .MuiAlert-message': { width: '100%' }
                        }}
                    >
                        <AlertTitle sx={{ fontWeight: 600, mb: 1 }}>Error al cargar el PDF</AlertTitle>
                        <Typography variant="body2" sx={{ mb: 2 }}>
                            {error}
                        </Typography>
                        <Typography variant="caption" display="block" sx={{ opacity: 0.7 }}>
                            Datos del recurso:
                        </Typography>
                        <Typography 
                            variant="caption" 
                            component="pre" 
                            sx={{ 
                                whiteSpace: 'pre-wrap', 
                                fontFamily: 'monospace', 
                                fontSize: '10px',
                                mt: 1,
                                p: 1.5,
                                bgcolor: alpha(theme.palette.text.primary, 0.05),
                                borderRadius: 1,
                            }}
                        >
                            {JSON.stringify({ hasUrl, isBase64Pdf, uploadId, resourceUrl: resource?.url }, null, 2)}
                        </Typography>
                    </Alert>
                </Box>
            )}

            {/* No PDF available */}
            {!pdfSource && !error && (
                <Box sx={{ 
                    display: 'flex', 
                    flexDirection: 'column', 
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    gap: 2, 
                    py: 6, 
                    flex: 1 
                }}>
                    <Box
                        sx={{
                            width: 80,
                            height: 80,
                            borderRadius: '50%',
                            bgcolor: alpha(theme.palette.primary.main, 0.1),
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        <FileIcon 
                            sx={{ 
                                fontSize: 40, 
                                color: theme.palette.primary.main 
                            }} 
                        />
                    </Box>
                    <Typography variant="h6" color="text.secondary" sx={{ fontWeight: 600 }}>
                        No hay PDF disponible
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Verifica que el recurso sea válido
                    </Typography>
                </Box>
            )}

            {/* PDF Viewer */}
            {pdfSource && (
                <Box sx={{ 
                    display: 'flex', 
                    justifyContent: 'center', 
                    flex: 1, 
                    overflow: 'auto', 
                    bgcolor: theme.palette.mode === 'dark' ? '#1a1a1a' : '#f5f5f5',
                    p: 2,
                }}>
                    <Box
                        sx={{
                            bgcolor: 'background.paper',
                            borderRadius: 1.5,
                            boxShadow: `0 10px 40px ${alpha(theme.palette.primary.main, 0.1)}`,
                            p: 3,
                            maxWidth: '100%',
                            transition: 'all 0.3s ease',
                        }}
                    >
                        <Document
                            file={pdfSource}
                            onLoadSuccess={onDocumentLoadSuccess}
                            onLoadError={onDocumentLoadError}
                            loading={
                                <Box sx={{ 
                                    p: 6, 
                                    display: 'flex', 
                                    flexDirection: 'column', 
                                    alignItems: 'center', 
                                    gap: 2,
                                    minWidth: 300,
                                }}>
                                    <CircularProgress 
                                        size={50} 
                                        sx={{
                                            color: theme.palette.primary.main,
                                        }}
                                    />
                                    <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>
                                        Procesando documento...
                                    </Typography>
                                </Box>
                            }
                            error={
                                <Alert severity="error" sx={{ borderRadius: 1 }}>
                                    Error al procesar el PDF. Verifica que sea un PDF válido.
                                </Alert>
                            }
                            options={{
                                cMapUrl: `https://unpkg.com/pdfjs-dist@${pdfjs.version}/cmaps/`,
                                cMapPacked: true,
                            }}
                        >
                            {numPages && Array.from({ length: numPages }, (_, i) => (
                                <Box 
                                    key={`page-${i + 1}`} 
                                    sx={{ 
                                        mb: 3, 
                                        display: 'flex', 
                                        justifyContent: 'center',
                                        position: 'relative',
                                    }}
                                >
                                    <Box
                                        sx={{
                                            position: 'absolute',
                                            top: -28,
                                            left: '50%',
                                            transform: 'translateX(-50%)',
                                            bgcolor: alpha(theme.palette.primary.main, 0.9),
                                            color: 'white',
                                            px: 1.5,
                                            py: 0.5,
                                            borderRadius: 1,
                                            fontSize: '11px',
                                            fontWeight: 600,
                                        }}
                                    >
                                        Página {i + 1} de {numPages}
                                    </Box>
                                    <Box
                                        sx={{
                                            boxShadow: `0 4px 12px ${alpha(theme.palette.primary.main, 0.15)}`,
                                            borderRadius: 0.5,
                                            overflow: 'hidden',
                                        }}
                                    >
                                        <Page
                                            pageNumber={i + 1}
                                            scale={1.5}
                                            renderTextLayer={false}
                                            renderAnnotationLayer={false}
                                        />
                                    </Box>
                                </Box>
                            ))}
                        </Document>
                    </Box>
                </Box>
            )}
        </DialogContent>
    );
};

export default PdfModalContent;

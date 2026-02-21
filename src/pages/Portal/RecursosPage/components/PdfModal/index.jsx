import React, { useCallback } from 'react';
import { Dialog } from '@mui/material';
import { pdfjs } from 'react-pdf';
import PdfModalHeader from './PdfModalHeader';
import PdfModalContent from './PdfModalContent';
import PdfModalFooter from './PdfModalFooter';
import { usePdfModalState } from '../hooks/usePdfModalState';
import { pdfModalService } from '../utils/pdfModalService';
import { usePdfViewer } from '../../../../../hooks/usePdfViewer';

// ✅ Configure worker from local node_modules
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    'pdfjs-dist/build/pdf.worker.min.mjs',
    import.meta.url
).toString();

const PdfModal = ({ open, onClose, resource }) => {
    // Hook para PDFs base64
    const uploadId = resource?.id || resource?._id;
    const hasUrl = !!resource?.url;
    const isBase64Pdf = !hasUrl && !!uploadId;

    const { pdfUrl, loading: urlLoading, error: urlError, download } = 
        usePdfViewer(isBase64Pdf ? uploadId : null, isBase64Pdf && open);

    // Estado del modal
    const {
        numPages,
        loading,
        error,
        pdfSource,
        onDocumentLoadSuccess,
        onDocumentLoadError,
        resetState,
        authorName,
    } = usePdfModalState(resource, open, pdfUrl);

    // Handlerdescarga
    const handleDownload = useCallback(async () => {
        try {
            await pdfModalService.downloadPdf(
                resource,
                isBase64Pdf,
                uploadId,
                download
            );
        } catch (err) {
            console.error('❌ Download error:', err);
        }
    }, [resource, isBase64Pdf, uploadId, download]);

    // Handle close
    const handleClose = useCallback(() => {
        resetState();
        onClose();
    }, [resetState, onClose]);

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
            <PdfModalHeader 
                resource={resource} 
                numPages={numPages} 
                authorName={authorName} 
                onClose={handleClose}
            />

            <PdfModalContent
                pdfSource={pdfSource}
                loading={loading}
                error={displayError}
                numPages={numPages}
                onDocumentLoadSuccess={onDocumentLoadSuccess}
                onDocumentLoadError={onDocumentLoadError}
                resource={resource}
                hasUrl={hasUrl}
                isBase64Pdf={isBase64Pdf}
                uploadId={uploadId}
            />

            <PdfModalFooter
                pdfSource={pdfSource}
                numPages={numPages}
                loading={loading}
                isLoading={isLoading}
                onClose={handleClose}
                onDownload={handleDownload}
            />
        </Dialog>
    );
};

export default PdfModal;

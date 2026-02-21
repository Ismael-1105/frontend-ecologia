import React, { useState } from 'react';
import { Container } from '@mui/material';
import ResourceList from './components/ResourceList';
import UploadResourceModal from './components/UploadResourceModal';
import ResourcesHeader from './components/ResourcesHeader';
import ResourcesSearchBar from './components/ResourcesSearchBar';
import NotificationSnackbar from './components/NotificationSnackbar';
import PdfModal from './components/PdfModal';

const RecursosPage = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [modalOpen, setModalOpen] = useState(false);
    const [uploadedResources, setUploadedResources] = useState([]);
    const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
    const [pdfModalOpen, setPdfModalOpen] = useState(false);
    const [selectedPdfResource, setSelectedPdfResource] = useState(null);

    const handleUploadResource = () => {
        setModalOpen(true);
    };

    const handleResourceUploaded = (uploadedResource) => {
        setUploadedResources(prev => [uploadedResource, ...prev]);
        setSnackbar({
            open: true,
            message: 'Recurso subido exitosamente',
            severity: 'success'
        });
    };

    const handleCloseSnackbar = () => {
        setSnackbar({ ...snackbar, open: false });
    };

    const handleOpenPdfModal = (resource) => {
        setSelectedPdfResource(resource);
        setPdfModalOpen(true);
    };

    const handleClosePdfModal = () => {
        setPdfModalOpen(false);
        setSelectedPdfResource(null);
    };

    return (
        <Container maxWidth="xl" sx={{ py: 0 }}>
            {/* Header */}
            <ResourcesHeader onUploadClick={handleUploadResource} />

            {/* Search Bar */}
            <ResourcesSearchBar
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
            />

            {/* Resource List */}
            <ResourceList
                searchQuery={searchQuery}
                uploadedResources={uploadedResources}
                onOpenPdfModal={handleOpenPdfModal}
            />

            {/* Upload Modal */}
            <UploadResourceModal
                open={modalOpen}
                onClose={() => setModalOpen(false)}
                onResourceUploaded={handleResourceUploaded}
            />

            {/* Notification Snackbar */}
            <NotificationSnackbar
                open={snackbar.open}
                message={snackbar.message}
                severity={snackbar.severity}
                onClose={handleCloseSnackbar}
            />

            {/* PDF Viewer Modal */}
            <PdfModal
                open={pdfModalOpen}
                resource={selectedPdfResource}
                onClose={handleClosePdfModal}
            />
        </Container>
    );
};

export default RecursosPage;

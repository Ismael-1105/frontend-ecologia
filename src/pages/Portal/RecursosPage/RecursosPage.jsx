import React, { useState } from 'react';
import {
    Container,
    Grid,
    Box,
    Stack,
    Typography,
    Card,
    CardContent,
    Fade
} from '@mui/material';
import {
    Forum as ForumIcon,
    PlayCircle as PlayCircleIcon
} from '@mui/icons-material';
import ResourceList from './components/ResourceList';
import UploadResourceModal from './components/UploadResourceModal';
import ResourcesHeader from './components/ResourcesHeader';
import ResourcesSearchBar from './components/ResourcesSearchBar';
import NotificationSnackbar from './components/NotificationSnackbar';
import PdfModal from './components/PdfModal';
import SidebarRecentPosts from '../ForoPage/components/SidebarRecentPosts';
import SidebarVideos from '../ForoPage/components/SidebarVideos';

const RecursosPage = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState(null);
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
        <Fade in={true} timeout={500}>
            <Container maxWidth="xl" sx={{ py: 0 }}>
                {/* Header */}
                <ResourcesHeader onUploadClick={handleUploadResource} />

                {/* Main Content */}
                <Grid container spacing={3}>
                    {/* Left Column - Resources */}
                    <Grid size={{ xs: 12, md: 8 }}>
                        {/* Search Bar with Category Filter */}
                        <ResourcesSearchBar
                            onSearch={setSearchQuery}
                            onCategoryChange={setSelectedCategory}
                            selectedCategory={selectedCategory}
                        />

                        {/* Resource List */}
                        <ResourceList
                            searchQuery={searchQuery}
                            selectedCategory={selectedCategory}
                            uploadedResources={uploadedResources}
                            onOpenPdfModal={handleOpenPdfModal}
                        />
                    </Grid>

                    {/* Right Column - Sidebar */}
                    <Grid size={{ xs: 12, md: 4 }}>
                        <Box sx={{ position: 'sticky', top: 80 }}>
                            <Stack spacing={2}>
                                {/* Discusiones Recientes */}
                                <Card
                                    elevation={0}
                                    sx={{
                                        border: '1px solid',
                                        borderColor: 'divider',
                                        borderRadius: 3
                                    }}
                                >
                                    <CardContent>
                                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                            <ForumIcon sx={{ color: 'primary.main', mr: 1, fontSize: 24 }} />
                                            <Typography variant="body1" sx={{ fontWeight: 700 }}>
                                                Discusiones Recientes
                                            </Typography>
                                        </Box>
                                        <SidebarRecentPosts limit={4} />
                                    </CardContent>
                                </Card>

                                {/* Videos Recientes */}
                                <Card
                                    elevation={0}
                                    sx={{
                                        border: '1px solid',
                                        borderColor: 'divider',
                                        borderRadius: 3
                                    }}
                                >
                                    <CardContent>
                                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                            <PlayCircleIcon sx={{ color: 'error.main', mr: 1, fontSize: 24 }} />
                                            <Typography variant="body1" sx={{ fontWeight: 700 }}>
                                                Videos Recientes
                                            </Typography>
                                        </Box>
                                        <SidebarVideos limit={5} />
                                    </CardContent>
                                </Card>
                            </Stack>
                        </Box>
                    </Grid>
                </Grid>

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
        </Fade>
    );
};

export default RecursosPage;

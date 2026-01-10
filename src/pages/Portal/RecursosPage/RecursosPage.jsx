import React, { useState } from 'react';
import {
    Container,
    Box,
    Typography,
    Button,
    Stack,
    TextField,
    InputAdornment,
    Snackbar,
    Alert
} from '@mui/material';
import { Search as SearchIcon, CloudUpload as CloudUploadIcon } from '@mui/icons-material';
import ResourceList from './components/ResourceList';
import UploadResourceModal from './components/UploadResourceModal';

const RecursosPage = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [modalOpen, setModalOpen] = useState(false);
    const [uploadedResources, setUploadedResources] = useState([]);
    const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

    const handleUploadResource = () => {
        setModalOpen(true);
    };

    const handleResourceUploaded = (resourceData) => {
        // Add the new resource to the uploaded resources list
        const newResource = {
            id: `uploaded-${Date.now()}`,
            title: resourceData.title,
            type: getFileType(resourceData.filename),
            downloads: 0,
            author: 'Tú', // Current user
            description: resourceData.description,
            category: resourceData.category,
            fileUrl: resourceData.fileUrl,
            filename: resourceData.filename,
            fileSize: resourceData.fileSize,
            uploadedAt: resourceData.uploadedAt
        };

        setUploadedResources(prev => [newResource, ...prev]);

        setSnackbar({
            open: true,
            message: 'Recurso subido exitosamente',
            severity: 'success'
        });
    };

    const getFileType = (filename) => {
        const extension = filename.split('.').pop().toLowerCase();
        const typeMap = {
            'pdf': 'PDF',
            'doc': 'DOC',
            'docx': 'DOCX',
            'txt': 'TXT',
            'jpg': 'Imagen',
            'jpeg': 'Imagen',
            'png': 'Imagen',
            'mp4': 'Video',
            'avi': 'Video'
        };
        return typeMap[extension] || 'Documento';
    };

    const handleCloseSnackbar = () => {
        setSnackbar({ ...snackbar, open: false });
    };

    return (
        <Container maxWidth="xl" sx={{ py: 0 }}>
            {/* Header */}
            <Box sx={{ mb: 4 }}>
                <Stack
                    direction={{ xs: 'column', sm: 'row' }}
                    justifyContent="space-between"
                    alignItems={{ xs: 'flex-start', sm: 'center' }}
                    spacing={2}
                >
                    <Box>
                        <Typography variant="h4" sx={{ fontWeight: 700, mb: 0.5 }}>
                            Recursos Educativos
                        </Typography>
                        <Typography variant="body1" color="text.secondary">
                            Documentos, guías y materiales para el aprendizaje
                        </Typography>
                    </Box>
                    <Button
                        variant="contained"
                        startIcon={<CloudUploadIcon />}
                        onClick={handleUploadResource}
                        sx={{ whiteSpace: 'nowrap' }}
                    >
                        Subir Recurso
                    </Button>
                </Stack>
            </Box>

            {/* Search Bar */}
            <Box sx={{ mb: 4 }}>
                <TextField
                    fullWidth
                    placeholder="Buscar recursos..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon />
                            </InputAdornment>
                        )
                    }}
                    sx={{ maxWidth: 600 }}
                />
            </Box>

            {/* Resource List */}
            <ResourceList
                searchQuery={searchQuery}
                uploadedResources={uploadedResources}
            />

            {/* Upload Modal */}
            <UploadResourceModal
                open={modalOpen}
                onClose={() => setModalOpen(false)}
                onResourceUploaded={handleResourceUploaded}
            />

            {/* Success Snackbar */}
            <Snackbar
                open={snackbar.open}
                autoHideDuration={6000}
                onClose={handleCloseSnackbar}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            >
                <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </Container>
    );
};

export default RecursosPage;

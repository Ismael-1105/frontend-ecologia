import React, { useState } from 'react';
import {
    Container,
    Box,
    Typography,
    Button,
    Stack,
    TextField,
    InputAdornment
} from '@mui/material';
import { Search as SearchIcon, CloudUpload as CloudUploadIcon } from '@mui/icons-material';
import { ResourceList } from './components';

const RecursosPage = () => {
    const [searchQuery, setSearchQuery] = useState('');

    const handleUploadResource = () => {
        // TODO: Navigate to upload resource page or open modal
        console.log('Upload resource');
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
            <ResourceList searchQuery={searchQuery} />
        </Container>
    );
};

export default RecursosPage;

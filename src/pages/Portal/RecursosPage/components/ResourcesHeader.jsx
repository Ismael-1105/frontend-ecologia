import React from 'react';
import {
    Box,
    Typography,
    Button,
    Stack,
} from '@mui/material';
import { CloudUpload as CloudUploadIcon } from '@mui/icons-material';

const ResourcesHeader = ({ onUploadClick }) => {
    return (
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
                    onClick={onUploadClick}
                    sx={{ whiteSpace: 'nowrap' }}
                >
                    Subir Recurso
                </Button>
            </Stack>
        </Box>
    );
};

export default ResourcesHeader;

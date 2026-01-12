import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { Add } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

/**
 * PageHeader Component
 * Displays page title and upload button
 */
const PageHeader = () => {
    const navigate = useNavigate();

    return (
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
            <Typography variant="h4">Mis Videos</Typography>
            <Button
                variant="contained"
                startIcon={<Add />}
                onClick={() => navigate('/portal/upload-video')}
            >
                Subir Video
            </Button>
        </Box>
    );
};

export default PageHeader;

import React from 'react';
import { Box, Typography, LinearProgress, Stack, Collapse } from '@mui/material';
import { CloudUpload as CloudUploadIcon } from '@mui/icons-material';
import { alpha } from '@mui/material/styles';

const UploadProgress = ({ loading, uploadProgress }) => {
    return (
        <Collapse in={loading}>
            <Box sx={{ mt: 4, p: 3, bgcolor: (theme) => alpha(theme.palette.primary.main, 0.05), borderRadius: 3 }}>
                <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 2 }}>
                    <CloudUploadIcon color="primary" />
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                        Subiendo tu video...
                    </Typography>
                    <Typography variant="h6" color="primary" sx={{ ml: 'auto', fontWeight: 700 }}>
                        {uploadProgress}%
                    </Typography>
                </Stack>
                <LinearProgress
                    variant="determinate"
                    value={uploadProgress}
                    sx={{
                        height: 12,
                        borderRadius: 6,
                        '& .MuiLinearProgress-bar': {
                            borderRadius: 6
                        }
                    }}
                />
            </Box>
        </Collapse>
    );
};

export default UploadProgress;

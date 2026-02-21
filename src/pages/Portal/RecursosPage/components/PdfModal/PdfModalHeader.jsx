import React from 'react';
import {
    DialogTitle,
    Box,
    Typography,
    IconButton,
    Chip,
    Stack,
} from '@mui/material';
import { Close as CloseIcon, FileOpen as FileOpenIcon } from '@mui/icons-material';
import { alpha, useTheme } from '@mui/material/styles';

const PdfModalHeader = ({ resource, numPages, authorName, onClose }) => {
    const theme = useTheme();

    return (
        <DialogTitle
            sx={{
                background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
                color: 'white',
                pb: 3,
                pt: 3,
                position: 'relative',
                overflow: 'hidden',
                '&::after': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    right: -40,
                    width: 200,
                    height: 200,
                    borderRadius: '50%',
                    background: `radial-gradient(circle, ${alpha('#ffffff', 0.1)} 0%, transparent 70%)`,
                    pointerEvents: 'none',
                }
            }}
        >
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', position: 'relative', zIndex: 1 }}>
                <Box sx={{ flex: 1 }}>
                    <Stack direction="row" spacing={1.5} alignItems="center" sx={{ mb: 1.5 }}>
                        <FileOpenIcon sx={{ fontSize: 28, opacity: 0.9 }} />
                        <Typography 
                            variant="h5" 
                            sx={{ 
                                fontWeight: 700,
                                letterSpacing: 0.5,
                            }}
                        >
                            {resource?.title || 'Documento PDF'}
                        </Typography>
                    </Stack>

                    <Stack direction="row" spacing={1.5} alignItems="center" sx={{ flexWrap: 'wrap' }}>
                        <Typography 
                            variant="caption" 
                            sx={{ 
                                opacity: 0.95,
                                fontWeight: 500,
                            }}
                        >
                            Por <strong>{authorName}</strong>
                        </Typography>

                        {numPages && (
                            <>
                                <Typography variant="caption" sx={{ opacity: 0.7 }}>•</Typography>
                                <Chip
                                    label={`${numPages} página${numPages > 1 ? 's' : ''}`}
                                    size="small"
                                    sx={{
                                        bgcolor: alpha('#ffffff', 0.25),
                                        color: 'white',
                                        fontWeight: 600,
                                        borderColor: alpha('#ffffff', 0.4),
                                        border: '1px solid',
                                    }}
                                />
                            </>
                        )}
                    </Stack>
                </Box>

                <IconButton
                    onClick={onClose}
                    sx={{
                        color: 'white',
                        ml: 2,
                        '&:hover': {
                            bgcolor: alpha('#ffffff', 0.2),
                        },
                        transition: 'all 0.3s ease',
                    }}
                >
                    <CloseIcon />
                </IconButton>
            </Box>
        </DialogTitle>
    );
};

export default PdfModalHeader;

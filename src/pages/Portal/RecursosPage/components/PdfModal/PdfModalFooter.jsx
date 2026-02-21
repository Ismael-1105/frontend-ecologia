import React from 'react';
import {
    DialogActions,
    Box,
    Typography,
    Button,
    Stack,
    Divider,
    Chip,
} from '@mui/material';
import { 
    Download as DownloadIcon,
    Close as CloseIcon,
    CheckCircle as CheckCircleIcon,
} from '@mui/icons-material';
import { alpha, useTheme } from '@mui/material/styles';

const PdfModalFooter = ({
    pdfSource,
    numPages,
    loading,
    isLoading,
    onClose,
    onDownload,
}) => {
    const theme = useTheme();

    return (
        <DialogActions 
            sx={{ 
                p: 2.5, 
                bgcolor: theme.palette.mode === 'dark' 
                    ? alpha(theme.palette.background.paper, 0.5)
                    : alpha(theme.palette.primary.light, 0.03),
                borderTop: `1px solid ${theme.palette.divider}`,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: 2,
            }}
        >
            {/* Left side: Info */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                {pdfSource && (
                    <>
                        <CheckCircleIcon 
                            sx={{ 
                                fontSize: 18,
                                color: theme.palette.success.main,
                            }} 
                        />
                        <Typography 
                            variant="caption" 
                            sx={{ 
                                color: 'text.secondary',
                                fontWeight: 500,
                            }}
                        >
                            {numPages ? `${numPages} página${numPages > 1 ? 's' : ''}` : 'Cargando...'}
                        </Typography>
                    </>
                )}
                {!pdfSource && (
                    <Typography 
                        variant="caption" 
                        sx={{ 
                            color: 'text.secondary',
                            fontWeight: 500,
                        }}
                    >
                        Sin PDF
                    </Typography>
                )}
            </Box>

            {/* Right side: Actions */}
            <Stack 
                direction="row" 
                spacing={1}
                divider={<Divider orientation="vertical" flexItem />}
            >
                <Button 
                    onClick={onClose}
                    startIcon={<CloseIcon />}
                    variant="outlined"
                    size="small"
                    sx={{
                        fontWeight: 600,
                        borderColor: theme.palette.divider,
                        color: 'text.primary',
                        '&:hover': {
                            borderColor: theme.palette.primary.main,
                            bgcolor: alpha(theme.palette.primary.main, 0.05),
                        }
                    }}
                >
                    Cerrar
                </Button>
                
                <Button
                    variant="contained"
                    startIcon={<DownloadIcon />}
                    onClick={onDownload}
                    disabled={isLoading || !pdfSource}
                    size="small"
                    sx={{
                        fontWeight: 600,
                        background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
                        '&:hover': {
                            background: `linear-gradient(135deg, ${theme.palette.primary.dark}, ${theme.palette.primary.main})`,
                            boxShadow: `0 8px 16px ${alpha(theme.palette.primary.main, 0.3)}`,
                        },
                        '&:disabled': {
                            background: alpha(theme.palette.text.primary, 0.12),
                        },
                        transition: 'all 0.3s ease',
                    }}
                >
                    Descargar
                </Button>
            </Stack>
        </DialogActions>
    );
};

export default PdfModalFooter;

import React, { useState } from 'react';
import {
    Card,
    CardContent,
    CardActions,
    Typography,
    IconButton,
    Box,
    Chip,
    Stack,
    Tooltip,
    Menu,
    MenuItem,
    ListItemIcon,
    ListItemText
} from '@mui/material';
import {
    PictureAsPdf as PdfIcon,
    Visibility as ViewIcon,
    Download as DownloadIcon,
    MoreVert as MoreVertIcon,
    Delete as DeleteIcon,
    Edit as EditIcon,
    OpenInNew as OpenInNewIcon,
    CloudDone as CloudDoneIcon
} from '@mui/icons-material';
import { formatFileSize, formatDate } from '../../utils/fileUtils';
import { downloadPdf, viewPdfInNewTab } from '../../core/api/uploadService';
import PdfViewerModal from './PdfViewerModal';

/**
 * PdfCard Component
 * Displays PDF document information with actions
 * @param {Object} pdf - PDF document object
 * @param {Function} onDelete - Callback for delete action
 * @param {Function} onEdit - Callback for edit action
 * @param {boolean} showActions - Whether to show action buttons
 * @param {boolean} isOwner - Whether current user owns the document
 */
const PdfCard = ({
    pdf,
    onDelete,
    onEdit,
    showActions = true,
    isOwner = false,
}) => {
    const [viewerOpen, setViewerOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const [downloading, setDownloading] = useState(false);

    const menuOpen = Boolean(anchorEl);

    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleView = () => {
        setViewerOpen(true);
        handleMenuClose();
    };

    const handleDownload = async () => {
        setDownloading(true);
        try {
            await downloadPdf(pdf._id || pdf.id, pdf.originalName || pdf.filename);
        } catch (error) {
            console.error('Error downloading PDF:', error);
        } finally {
            setDownloading(false);
            handleMenuClose();
        }
    };

    const handleOpenInNewTab = async () => {
        try {
            await viewPdfInNewTab(pdf._id || pdf.id);
        } catch (error) {
            console.error('Error opening PDF:', error);
        }
        handleMenuClose();
    };

    const handleEdit = () => {
        if (onEdit) {
            onEdit(pdf);
        }
        handleMenuClose();
    };

    const handleDelete = () => {
        if (onDelete) {
            onDelete(pdf);
        }
        handleMenuClose();
    };

    const isBase64 = !pdf.url && pdf._id;
    const authorName = pdf.uploadedBy?.name || pdf.author || 'Desconocido';
    const uploadDate = pdf.createdAt ? formatDate(new Date(pdf.createdAt)) : '';

    return (
        <>
            <Card 
                sx={{ 
                    height: '100%', 
                    display: 'flex', 
                    flexDirection: 'column',
                    transition: 'transform 0.2s, box-shadow 0.2s',
                    '&:hover': {
                        transform: 'translateY(-4px)',
                        boxShadow: 4,
                    }
                }}
            >
                <CardContent sx={{ flexGrow: 1, pb: 1 }}>
                    <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 2 }}>
                        <Box
                            sx={{
                                width: 48,
                                height: 48,
                                borderRadius: 1,
                                bgcolor: 'error.light',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                mr: 2,
                                flexShrink: 0
                            }}
                        >
                            <PdfIcon sx={{ color: 'error.contrastText', fontSize: 28 }} />
                        </Box>

                        <Box sx={{ flexGrow: 1, minWidth: 0 }}>
                            <Tooltip title={pdf.title || pdf.filename}>
                                <Typography 
                                    variant="h6" 
                                    sx={{ 
                                        fontWeight: 600,
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis',
                                        whiteSpace: 'nowrap',
                                        fontSize: '1rem',
                                        mb: 0.5
                                    }}
                                >
                                    {pdf.title || pdf.filename}
                                </Typography>
                            </Tooltip>

                            <Typography variant="caption" color="text.secondary" display="block">
                                {pdf.originalName || pdf.filename}
                            </Typography>
                        </Box>

                        {showActions && (
                            <IconButton 
                                size="small" 
                                onClick={handleMenuOpen}
                                sx={{ ml: 1 }}
                            >
                                <MoreVertIcon />
                            </IconButton>
                        )}
                    </Box>

                    {pdf.description && (
                        <Typography 
                            variant="body2" 
                            color="text.secondary"
                            sx={{
                                mb: 2,
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                display: '-webkit-box',
                                WebkitLineClamp: 2,
                                WebkitBoxOrient: 'vertical',
                                minHeight: '40px'
                            }}
                        >
                            {pdf.description}
                        </Typography>
                    )}

                    <Stack direction="row" spacing={1} flexWrap="wrap" sx={{ mt: 'auto' }}>
                        {pdf.category && (
                            <Chip 
                                label={pdf.category} 
                                size="small" 
                                variant="outlined"
                                sx={{ height: 24 }}
                            />
                        )}
                        {isBase64 && (
                            <Chip 
                                icon={<CloudDoneIcon />}
                                label="Optimizado" 
                                size="small" 
                                color="primary"
                                variant="outlined"
                                sx={{ height: 24 }}
                            />
                        )}
                        <Chip 
                            label={formatFileSize(pdf.size)} 
                            size="small" 
                            variant="outlined"
                            sx={{ height: 24 }}
                        />
                    </Stack>

                    <Box sx={{ mt: 2 }}>
                        <Typography variant="caption" color="text.secondary" display="block">
                            Por {authorName}
                        </Typography>
                        {uploadDate && (
                            <Typography variant="caption" color="text.secondary" display="block">
                                {uploadDate}
                            </Typography>
                        )}
                        {pdf.downloads !== undefined && (
                            <Typography variant="caption" color="text.secondary" display="block">
                                {pdf.downloads} descargas
                            </Typography>
                        )}
                    </Box>
                </CardContent>

                <CardActions sx={{ px: 2, py: 1.5, borderTop: 1, borderColor: 'divider' }}>
                    <Tooltip title="Ver documento">
                        <IconButton 
                            size="small" 
                            color="primary"
                            onClick={handleView}
                        >
                            <ViewIcon />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Descargar">
                        <IconButton 
                            size="small"
                            onClick={handleDownload}
                            disabled={downloading}
                        >
                            <DownloadIcon />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Abrir en nueva pestaña">
                        <IconButton 
                            size="small"
                            onClick={handleOpenInNewTab}
                        >
                            <OpenInNewIcon />
                        </IconButton>
                    </Tooltip>
                </CardActions>
            </Card>

            {/* Context Menu */}
            <Menu
                anchorEl={anchorEl}
                open={menuOpen}
                onClose={handleMenuClose}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
                <MenuItem onClick={handleView}>
                    <ListItemIcon>
                        <ViewIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>Ver documento</ListItemText>
                </MenuItem>

                <MenuItem onClick={handleDownload} disabled={downloading}>
                    <ListItemIcon>
                        <DownloadIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>Descargar</ListItemText>
                </MenuItem>

                <MenuItem onClick={handleOpenInNewTab}>
                    <ListItemIcon>
                        <OpenInNewIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>Abrir en nueva pestaña</ListItemText>
                </MenuItem>

                {isOwner && onEdit && (
                    <MenuItem onClick={handleEdit}>
                        <ListItemIcon>
                            <EditIcon fontSize="small" />
                        </ListItemIcon>
                        <ListItemText>Editar</ListItemText>
                    </MenuItem>
                )}

                {isOwner && onDelete && (
                    <MenuItem onClick={handleDelete} sx={{ color: 'error.main' }}>
                        <ListItemIcon>
                            <DeleteIcon fontSize="small" color="error" />
                        </ListItemIcon>
                        <ListItemText>Eliminar</ListItemText>
                    </MenuItem>
                )}
            </Menu>

            {/* PDF Viewer Modal */}
            <PdfViewerModal
                open={viewerOpen}
                onClose={() => setViewerOpen(false)}
                resource={pdf}
            />
        </>
    );
};

export default PdfCard;

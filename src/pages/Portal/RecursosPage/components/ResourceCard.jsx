import React from 'react';
import {
    Card,
    CardContent,
    Box,
    Typography,
    Chip,
    IconButton,
    Stack
} from '@mui/material';
import {
    PictureAsPdf as PdfIcon,
    Videocam as VideoIcon,
    Image as ImageIcon,
    Description as DocIcon,
    Download as DownloadIcon,
    Visibility as VisibilityIcon
} from '@mui/icons-material';

const ResourceCard = ({ resource }) => {
    const getIcon = (type) => {
        switch (type.toLowerCase()) {
            case 'pdf':
                return <PdfIcon sx={{ fontSize: 32, color: 'error.main' }} />;
            case 'video':
                return <VideoIcon sx={{ fontSize: 32, color: 'primary.main' }} />;
            case 'imagen':
                return <ImageIcon sx={{ fontSize: 32, color: 'success.main' }} />;
            default:
                return <DocIcon sx={{ fontSize: 32, color: 'info.main' }} />;
        }
    };

    return (
        <Card
            elevation={1}
            sx={{
                '&:hover': {
                    boxShadow: 3,
                    transform: 'translateY(-2px)'
                },
                transition: 'all 0.2s ease'
            }}
        >
            <CardContent>
                <Box sx={{ display: 'flex', gap: 2 }}>
                    {/* Icon */}
                    <Box
                        sx={{
                            width: 64,
                            height: 64,
                            borderRadius: 2,
                            bgcolor: 'background.default',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
                    >
                        {getIcon(resource.type)}
                    </Box>

                    {/* Content */}
                    <Box sx={{ flex: 1, minWidth: 0 }}>
                        <Typography
                            variant="h6"
                            sx={{
                                fontWeight: 600,
                                fontSize: '1rem',
                                mb: 0.5,
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                display: '-webkit-box',
                                WebkitLineClamp: 2,
                                WebkitBoxOrient: 'vertical'
                            }}
                        >
                            {resource.title}
                        </Typography>

                        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                            Por {resource.author}
                        </Typography>

                        <Stack direction="row" spacing={1} alignItems="center">
                            <Chip
                                label={resource.type}
                                size="small"
                                variant="outlined"
                                sx={{ height: 24 }}
                            />
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                <DownloadIcon sx={{ fontSize: 14, color: 'text.secondary' }} />
                                <Typography variant="caption" color="text.secondary">
                                    {resource.downloads}
                                </Typography>
                            </Box>
                        </Stack>
                    </Box>

                    {/* Actions */}
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                        <IconButton size="small" color="primary">
                            <VisibilityIcon />
                        </IconButton>
                        <IconButton size="small" color="primary">
                            <DownloadIcon />
                        </IconButton>
                    </Box>
                </Box>
            </CardContent>
        </Card>
    );
};

export default ResourceCard;

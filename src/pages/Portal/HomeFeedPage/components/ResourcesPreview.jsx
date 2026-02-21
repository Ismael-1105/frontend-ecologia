import React, { useState, useEffect, useRef } from 'react';
import {
    Box,
    Typography,
    Card,
    CardContent,
    Chip,
    IconButton,
    Skeleton,
} from '@mui/material';
import {
    MenuBook as ResourcesIcon,
    PictureAsPdf as PdfIcon,
    Videocam as VideoIcon,
    Image as ImageIcon,
    Description as DocIcon,
    AudioFile as AudioIcon,
    Download as DownloadIcon,
    ArrowForwardIos as ArrowRightIcon,
    ArrowBackIos as ArrowLeftIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { getAllUploads } from '../../../../core/api/uploadService';

const getIcon = (fileType) => {
    switch (fileType?.toLowerCase()) {
        case 'document':
            return <PdfIcon sx={{ fontSize: 28, color: 'error.main' }} />;
        case 'video':
            return <VideoIcon sx={{ fontSize: 28, color: 'primary.main' }} />;
        case 'image':
            return <ImageIcon sx={{ fontSize: 28, color: 'success.main' }} />;
        case 'audio':
            return <AudioIcon sx={{ fontSize: 28, color: 'warning.main' }} />;
        default:
            return <DocIcon sx={{ fontSize: 28, color: 'info.main' }} />;
    }
};

const getFileTypeLabel = (fileType) => {
    const labels = {
        document: 'PDF',
        video: 'Video',
        image: 'Imagen',
        audio: 'Audio',
        other: 'Archivo',
    };
    return labels[fileType] || 'Archivo';
};

const ResourcePreviewCard = ({ resource }) => {
    const navigate = useNavigate();
    const authorName = resource.uploadedBy?.name || 'Desconocido';

    return (
        <Card
            elevation={0}
            onClick={() => navigate('/portal/recursos')}
            sx={{
                minWidth: 240,
                maxWidth: 240,
                cursor: 'pointer',
                border: '1px solid',
                borderColor: 'divider',
                borderRadius: 3,
                flexShrink: 0,
                transition: 'all 0.2s ease',
                '&:hover': {
                    borderColor: 'primary.light',
                    boxShadow: '0 4px 16px rgba(0,0,0,0.1)',
                    transform: 'translateY(-2px)',
                },
            }}
        >
            <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
                {/* Icon + File type */}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1.5 }}>
                    <Box
                        sx={{
                            width: 48,
                            height: 48,
                            borderRadius: 2,
                            bgcolor: 'action.hover',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexShrink: 0,
                        }}
                    >
                        {getIcon(resource.fileType)}
                    </Box>
                    <Box sx={{ minWidth: 0, flex: 1 }}>
                        <Chip
                            label={getFileTypeLabel(resource.fileType)}
                            size="small"
                            variant="outlined"
                            sx={{ height: 22, fontSize: '0.7rem' }}
                        />
                    </Box>
                </Box>

                {/* Title */}
                <Typography
                    variant="body2"
                    sx={{
                        fontWeight: 600,
                        mb: 0.5,
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                        lineHeight: 1.3,
                        fontSize: '0.85rem',
                    }}
                >
                    {resource.title || resource.originalName || 'Sin título'}
                </Typography>

                {/* Author + Downloads */}
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Typography variant="caption" color="text.secondary" noWrap sx={{ maxWidth: '60%' }}>
                        {authorName}
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        <DownloadIcon sx={{ fontSize: 14, color: 'text.secondary' }} />
                        <Typography variant="caption" color="text.secondary">
                            {resource.downloads || 0}
                        </Typography>
                    </Box>
                </Box>
            </CardContent>
        </Card>
    );
};

const ResourcesPreviewSkeleton = () => (
    <Box sx={{ display: 'flex', gap: 2, overflow: 'hidden' }}>
        {[...Array(6)].map((_, i) => (
            <Skeleton
                key={i}
                variant="rounded"
                sx={{ minWidth: 240, height: 140, borderRadius: 3, flexShrink: 0 }}
                animation="wave"
            />
        ))}
    </Box>
);

const ResourcesPreview = () => {
    const scrollRef = useRef(null);
    const [resources, setResources] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showLeftArrow, setShowLeftArrow] = useState(false);
    const [showRightArrow, setShowRightArrow] = useState(false);

    useEffect(() => {
        fetchResources();
    }, []);

    const fetchResources = async () => {
        try {
            const response = await getAllUploads({ limit: 12, sort: '-createdAt' });
            if (response.data) {
                setResources(response.data);
            }
        } catch (err) {
            console.error('Error fetching resources preview:', err);
        } finally {
            setLoading(false);
        }
    };

    const updateArrows = () => {
        const el = scrollRef.current;
        if (!el) return;
        setShowLeftArrow(el.scrollLeft > 0);
        setShowRightArrow(el.scrollLeft + el.clientWidth < el.scrollWidth - 10);
    };

    useEffect(() => {
        updateArrows();
        const el = scrollRef.current;
        if (el) {
            el.addEventListener('scroll', updateArrows);
            return () => el.removeEventListener('scroll', updateArrows);
        }
    }, [resources]);

    const scroll = (direction) => {
        const el = scrollRef.current;
        if (!el) return;
        const amount = direction === 'left' ? -500 : 500;
        el.scrollBy({ left: amount, behavior: 'smooth' });
    };

    if (!loading && resources.length === 0) return null;

    return (
        <Box sx={{ mb: 2 }}>
            {/* Header */}
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1.5, px: 0.5 }}>
                <ResourcesIcon sx={{ color: 'primary.main', mr: 1, fontSize: 28 }} />
                <Typography variant="h6" sx={{ fontWeight: 700, fontSize: '1.1rem' }}>
                    Recursos recientes
                </Typography>
            </Box>

            {/* Scrollable row */}
            {loading ? (
                <ResourcesPreviewSkeleton />
            ) : (
                <Box sx={{ position: 'relative' }}>
                    {/* Left arrow */}
                    {showLeftArrow && (
                        <IconButton
                            onClick={() => scroll('left')}
                            sx={{
                                position: 'absolute',
                                left: -4,
                                top: '50%',
                                transform: 'translateY(-50%)',
                                zIndex: 2,
                                bgcolor: 'background.paper',
                                boxShadow: 3,
                                '&:hover': { bgcolor: 'background.paper' },
                            }}
                            size="small"
                        >
                            <ArrowLeftIcon sx={{ fontSize: 18 }} />
                        </IconButton>
                    )}

                    <Box
                        ref={scrollRef}
                        sx={{
                            display: 'flex',
                            gap: 2,
                            overflowX: 'auto',
                            scrollbarWidth: 'none',
                            '&::-webkit-scrollbar': { display: 'none' },
                            py: 0.5,
                            px: 0.5,
                        }}
                    >
                        {resources.map((resource) => (
                            <ResourcePreviewCard
                                key={resource._id || resource.id}
                                resource={resource}
                            />
                        ))}
                    </Box>

                    {/* Right arrow */}
                    {showRightArrow && (
                        <IconButton
                            onClick={() => scroll('right')}
                            sx={{
                                position: 'absolute',
                                right: -4,
                                top: '50%',
                                transform: 'translateY(-50%)',
                                zIndex: 2,
                                bgcolor: 'background.paper',
                                boxShadow: 3,
                                '&:hover': { bgcolor: 'background.paper' },
                            }}
                            size="small"
                        >
                            <ArrowRightIcon sx={{ fontSize: 18 }} />
                        </IconButton>
                    )}
                </Box>
            )}
        </Box>
    );
};

export default ResourcesPreview;

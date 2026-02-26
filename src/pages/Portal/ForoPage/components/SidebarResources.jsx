import React, { useState, useEffect, useRef } from 'react';
import {
    Typography,
    Box,
    Chip,
    Skeleton,
    IconButton,
} from '@mui/material';
import {
    PictureAsPdf as PdfIcon,
    Videocam as VideoIcon,
    Image as ImageIcon,
    AudioFile as AudioIcon,
    Description as DocIcon,
    Download as DownloadIcon,
    ArrowForwardIos as ArrowRightIcon,
    ArrowBackIos as ArrowLeftIcon,
    MenuBook as ResourcesIcon,
} from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { getAllUploads } from '../../../../core/api/uploadService';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api';

const getFileUrl = (path) => {
    if (!path) return null;
    const cleanBaseUrl = API_URL.replace(/\/api$/, '');
    if (path.startsWith('http')) return path;
    return `${cleanBaseUrl}${path.startsWith('/') ? '' : '/'}${path}`;
};

const getIcon = (fileType) => {
    switch (fileType?.toLowerCase()) {
        case 'document':
            return <PdfIcon sx={{ fontSize: 40, color: 'error.main' }} />;
        case 'video':
            return <VideoIcon sx={{ fontSize: 40, color: 'primary.main' }} />;
        case 'image':
            return <ImageIcon sx={{ fontSize: 40, color: 'success.main' }} />;
        case 'audio':
            return <AudioIcon sx={{ fontSize: 40, color: 'warning.main' }} />;
        default:
            return <DocIcon sx={{ fontSize: 40, color: 'info.main' }} />;
    }
};

const getFileTypeLabel = (fileType) => {
    const labels = { document: 'PDF', video: 'Video', image: 'Imagen', audio: 'Audio' };
    return labels[fileType] || 'Archivo';
};

// File thumbnail (image or icon fallback)
const FileThumbnail = ({ resource }) => {
    const fileType = resource.fileType?.toLowerCase();

    // Para imágenes, mostrar la imagen
    if (fileType === 'image' && resource.filePath) {
        const imageUrl = getFileUrl(resource.filePath);
        return (
            <Box
                component="img"
                src={imageUrl}
                alt={resource.title}
                sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
                onError={(e) => { e.target.style.display = 'none'; }}
            />
        );
    }

    return (
        <Box sx={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: 'action.hover' }}>
            {getIcon(fileType)}
        </Box>
    );
};

// Single "Short" card
const ResourceShortCard = ({ resource }) => {
    const title = resource.title || resource.originalName || 'Sin título';
    const fileType = resource.fileType?.toLowerCase();

    return (
        <Box
            component={Link}
            to="/portal/recursos"
            sx={{
                textDecoration: 'none',
                color: 'inherit',
                display: 'flex',
                flexDirection: 'column',
                minWidth: 150,
                maxWidth: 150,
                borderRadius: 2,
                overflow: 'hidden',
                flexShrink: 0,
                transition: 'all 0.2s ease',
                cursor: 'pointer',
                '&:hover': {
                    transform: 'scale(1.03)',
                },
            }}
        >
            {/* Thumbnail — vertical aspect like Shorts */}
            <Box
                sx={{
                    width: 150,
                    height: 200,
                    borderRadius: 2,
                    overflow: 'hidden',
                    bgcolor: 'background.paper',
                    border: '1px solid',
                    borderColor: 'divider',
                    position: 'relative',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <FileThumbnail resource={resource} />
                {/* Type badge */}
                <Chip
                    label={getFileTypeLabel(resource.fileType)}
                    size="small"
                    sx={{
                        position: 'absolute',
                        top: 6,
                        right: 6,
                        height: 22,
                        fontSize: '0.65rem',
                        fontWeight: 700,
                        bgcolor: fileType === 'document' ? 'error.main' : 'primary.main',
                        color: 'white',
                    }}
                />
            </Box>

            {/* Title + downloads */}
            <Box sx={{ pt: 1, px: 0.25 }}>
                <Typography
                    variant="body2"
                    sx={{
                        fontWeight: 600,
                        fontSize: '0.8rem',
                        lineHeight: 1.3,
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                    }}
                >
                    {title}
                </Typography>
                {resource.downloads > 0 && (
                    <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.7rem' }}>
                        {resource.downloads} descargas
                    </Typography>
                )}
            </Box>
        </Box>
    );
};

const SidebarResourcesSkeleton = () => (
    <Box sx={{ display: 'flex', gap: 1.5, overflow: 'hidden' }}>
        {[...Array(3)].map((_, i) => (
            <Box key={i} sx={{ minWidth: 150, flexShrink: 0 }}>
                <Skeleton variant="rounded" sx={{ width: 150, height: 200, borderRadius: 2 }} animation="wave" />
                <Skeleton variant="text" width="90%" height={16} sx={{ mt: 0.75 }} />
                <Skeleton variant="text" width="50%" height={14} />
            </Box>
        ))}
    </Box>
);

const SidebarResources = ({ limit = 6 }) => {
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
            const response = await getAllUploads({ limit, sort: '-createdAt' });
            if (response.data?.length > 0) {
                setResources(response.data);
            } else if (Array.isArray(response.data)) {
                setResources(response.data);
            }
        } catch (err) {
            console.error('Error fetching sidebar resources:', err);
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
        const amount = direction === 'left' ? -340 : 340;
        el.scrollBy({ left: amount, behavior: 'smooth' });
    };

    if (!loading && resources.length === 0) return null;

    return (
        <Box>
            {/* Section title — Shorts style with icon */}
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1.5, gap: 1 }}>
                <ResourcesIcon sx={{ color: 'error.main', fontSize: 24 }} />
                <Typography
                    variant="body1"
                    sx={{ fontWeight: 700, fontSize: '0.95rem' }}
                >
                    Recursos
                </Typography>
            </Box>

            {loading ? (
                <SidebarResourcesSkeleton />
            ) : (
                <Box sx={{ position: 'relative' }}>
                    {/* Left arrow */}
                    {showLeftArrow && (
                        <IconButton
                            onClick={() => scroll('left')}
                            sx={{
                                position: 'absolute',
                                left: -6,
                                top: '35%',
                                transform: 'translateY(-50%)',
                                zIndex: 2,
                                bgcolor: 'background.paper',
                                boxShadow: 3,
                                width: 36,
                                height: 36,
                                '&:hover': { bgcolor: 'background.paper' },
                            }}
                            size="small"
                        >
                            <ArrowLeftIcon sx={{ fontSize: 16 }} />
                        </IconButton>
                    )}

                    {/* Scrollable horizontal row */}
                    <Box
                        ref={scrollRef}
                        sx={{
                            display: 'flex',
                            gap: 1.5,
                            overflowX: 'auto',
                            scrollbarWidth: 'none',
                            '&::-webkit-scrollbar': { display: 'none' },
                            py: 0.5,
                            px: 0.25,
                        }}
                    >
                        {resources.slice(0, limit).map((resource) => (
                            <ResourceShortCard
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
                                right: -6,
                                top: '35%',
                                transform: 'translateY(-50%)',
                                zIndex: 2,
                                bgcolor: 'background.paper',
                                boxShadow: 3,
                                width: 36,
                                height: 36,
                                '&:hover': { bgcolor: 'background.paper' },
                            }}
                            size="small"
                        >
                            <ArrowRightIcon sx={{ fontSize: 16 }} />
                        </IconButton>
                    )}
                </Box>
            )}
        </Box>
    );
};

export default SidebarResources;

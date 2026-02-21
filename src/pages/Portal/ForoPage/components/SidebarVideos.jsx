import React, { useState, useEffect } from 'react';
import {
    Typography,
    Box,
    Skeleton,
} from '@mui/material';
import {
    Visibility as VisibilityIcon,
    PlayArrow as PlayArrowIcon,
} from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { getAllVideos } from '../../../../core/api/videoService';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api';

const formatTimeAgo = (dateString) => {
    if (!dateString) return '';
    const now = new Date();
    const date = new Date(dateString);
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);
    const diffWeeks = Math.floor(diffDays / 7);
    const diffMonths = Math.floor(diffDays / 30);
    const diffYears = Math.floor(diffDays / 365);

    if (diffMins < 1) return 'Ahora';
    if (diffMins < 60) return `Hace ${diffMins} min`;
    if (diffHours < 24) return `Hace ${diffHours} h`;
    if (diffDays < 7) return `Hace ${diffDays} día${diffDays > 1 ? 's' : ''}`;
    if (diffWeeks < 5) return `Hace ${diffWeeks} sem`;
    if (diffMonths < 12) return `Hace ${diffMonths} mes${diffMonths > 1 ? 'es' : ''}`;
    return `Hace ${diffYears} año${diffYears > 1 ? 's' : ''}`;
};

const formatViews = (views) => {
    if (!views) return '0 vistas';
    if (views >= 1000000) return `${(views / 1000000).toFixed(1)}M vistas`;
    if (views >= 1000) return `${(views / 1000).toFixed(1)}K vistas`;
    return `${views} vistas`;
};

const SidebarVideosSkeleton = () => (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
        {[...Array(4)].map((_, i) => (
            <Box key={i} sx={{ display: 'flex', gap: 1.5 }}>
                <Skeleton
                    variant="rounded"
                    sx={{ width: 168, height: 94, borderRadius: 2, flexShrink: 0 }}
                    animation="wave"
                />
                <Box sx={{ flex: 1, py: 0.5 }}>
                    <Skeleton variant="text" width="95%" height={16} />
                    <Skeleton variant="text" width="80%" height={16} />
                    <Skeleton variant="text" width="60%" height={14} sx={{ mt: 0.5 }} />
                    <Skeleton variant="text" width="70%" height={14} />
                </Box>
            </Box>
        ))}
    </Box>
);

const VideoRecommendationCard = ({ video }) => {
    const getThumbnailUrl = () => {
        if (video.thumbnailUrl) {
            if (video.thumbnailUrl.startsWith('http')) return video.thumbnailUrl;
            return `${API_URL.replace('/api', '')}${video.thumbnailUrl}`;
        }
        return null;
    };

    const thumbnail = getThumbnailUrl();
    const authorName = video.uploadedBy?.name || video.author?.name || '';

    return (
        <Box
            component={Link}
            to={`/portal/watch/${video._id}`}
            sx={{
                display: 'flex',
                gap: 1.5,
                textDecoration: 'none',
                color: 'inherit',
                borderRadius: 2,
                p: 0.5,
                transition: 'background 0.15s ease',
                '&:hover': {
                    bgcolor: 'action.hover',
                },
            }}
        >
            {/* Thumbnail */}
            <Box
                sx={{
                    width: 168,
                    minWidth: 168,
                    height: 94,
                    borderRadius: 2,
                    overflow: 'hidden',
                    bgcolor: 'grey.900',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'relative',
                    flexShrink: 0,
                }}
            >
                {thumbnail ? (
                    <Box
                        component="img"
                        src={thumbnail}
                        alt={video.title}
                        sx={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                        }}
                    />
                ) : (
                    <PlayArrowIcon sx={{ color: 'grey.500', fontSize: 40 }} />
                )}
                {/* Duration badge */}
                {video.duration && (
                    <Box
                        sx={{
                            position: 'absolute',
                            bottom: 4,
                            right: 4,
                            bgcolor: 'rgba(0,0,0,0.8)',
                            color: 'white',
                            px: 0.75,
                            py: 0.15,
                            borderRadius: 0.5,
                            fontSize: '0.7rem',
                            fontWeight: 600,
                            lineHeight: 1.4,
                        }}
                    >
                        {video.duration}
                    </Box>
                )}
            </Box>

            {/* Info */}
            <Box sx={{ flex: 1, minWidth: 0, py: 0.25 }}>
                <Typography
                    variant="body2"
                    sx={{
                        fontWeight: 600,
                        fontSize: '0.85rem',
                        lineHeight: 1.3,
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                        mb: 0.5,
                    }}
                >
                    {video.title}
                </Typography>
                {authorName && (
                    <Typography variant="caption" color="text.secondary" noWrap sx={{ display: 'block', lineHeight: 1.4 }}>
                        {authorName}
                    </Typography>
                )}
                <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.72rem', lineHeight: 1.4 }}>
                    {formatViews(video.views)}
                    {video.createdAt && ` · ${formatTimeAgo(video.createdAt)}`}
                </Typography>
            </Box>
        </Box>
    );
};

const SidebarVideos = ({ limit = 5 }) => {
    const [videos, setVideos] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchVideos();
    }, []);

    const fetchVideos = async () => {
        try {
            const response = await getAllVideos({ limit });
            if (response.success && response.data?.length > 0) {
                setVideos(response.data);
            } else if (Array.isArray(response.data)) {
                setVideos(response.data);
            }
        } catch (err) {
            console.error('Error fetching sidebar videos:', err);
        } finally {
            setLoading(false);
        }
    };

    if (!loading && videos.length === 0) return null;

    return (
        <Box>
            {loading ? (
                <SidebarVideosSkeleton />
            ) : (
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                    {videos.slice(0, limit).map((video) => (
                        <VideoRecommendationCard key={video._id} video={video} />
                    ))}
                </Box>
            )}
        </Box>
    );
};

export default SidebarVideos;

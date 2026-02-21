import React from 'react';
import { Box, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { VIDEO_CARD_LAYOUT } from '../../../../config/constants';

const RecommendedVideoCard = ({ video }) => {
    const navigate = useNavigate();

    const formatTimeAgo = (dateString) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        const now = new Date();
        const diffInSeconds = Math.floor((now - date) / 1000);

        if (diffInSeconds < 60) return 'Hace un momento';
        if (diffInSeconds < 3600) return `Hace ${Math.floor(diffInSeconds / 60)} min`;
        if (diffInSeconds < 86400) return `Hace ${Math.floor(diffInSeconds / 3600)} h`;
        if (diffInSeconds < 604800) return `Hace ${Math.floor(diffInSeconds / 86400)} días`;
        return date.toLocaleDateString('es-ES', { month: 'short', day: 'numeric' });
    };

    const formatDuration = (seconds) => {
        if (!seconds) return '';
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${String(secs).padStart(2, '0')}`;
    };

    const thumbnail = video.thumbnailUrl || video.thumbnail || VIDEO_CARD_LAYOUT.FALLBACK_THUMBNAIL;
    const authorName = video.author?.name || video.autor_id?.name || 'Desconocido';

    return (
        <Box
            onClick={() => navigate(`/portal/watch/${video._id}`)}
            sx={{
                display: 'flex',
                gap: 1,
                cursor: 'pointer',
                borderRadius: 2,
                p: 0.5,
                transition: 'background-color 0.2s',
                '&:hover': {
                    bgcolor: 'action.hover',
                },
            }}
        >
            {/* Thumbnail */}
            <Box
                sx={{
                    position: 'relative',
                    width: '68%',
                    minWidth: 200,
                    maxWidth: 300,
                    aspectRatio: '16 / 9',
                    borderRadius: 2,
                    overflow: 'hidden',
                    bgcolor: 'grey.900',
                    flexShrink: 0,
                }}
            >
                <Box
                    component="img"
                    src={thumbnail}
                    alt={video.title}
                    sx={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                    }}
                    onError={(e) => {
                        e.target.src = VIDEO_CARD_LAYOUT.FALLBACK_THUMBNAIL;
                    }}
                />
                {video.duration && (
                    <Box
                        sx={{
                            position: 'absolute',
                            bottom: 4,
                            right: 4,
                            bgcolor: 'rgba(0,0,0,0.8)',
                            color: 'white',
                            px: 0.75,
                            py: 0.25,
                            borderRadius: 0.5,
                            fontSize: '0.7rem',
                            fontWeight: 600,
                        }}
                    >
                        {formatDuration(video.duration)}
                    </Box>
                )}
            </Box>

            {/* Info */}
            <Box sx={{ flex: 1, minWidth: 0, py: 0.25 }}>
                <Typography
                    variant="body2"
                    sx={{
                        fontWeight: 600,
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                        lineHeight: 1.3,
                        mb: 0.5,
                    }}
                >
                    {video.title || video.titulo || 'Sin título'}
                </Typography>
                <Typography variant="caption" color="text.secondary" display="block">
                    {authorName}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                    {video.views || 0} vistas • {formatTimeAgo(video.createdAt)}
                </Typography>
            </Box>
        </Box>
    );
};

export default RecommendedVideoCard;

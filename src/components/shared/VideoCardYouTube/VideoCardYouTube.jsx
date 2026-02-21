import React from 'react';
import { Box, Typography, Avatar } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { VIDEO_CARD_LAYOUT } from '../../../config/constants';
import useVideoHoverPreview from '../../../hooks/useVideoHoverPreview';

const VideoCardYouTube = ({ video }) => {
    const navigate = useNavigate();
    const videoUrl = video.videoUrl || video.url_video;
    const thumbnail = video.thumbnailUrl || video.thumbnail || VIDEO_CARD_LAYOUT.FALLBACK_THUMBNAIL;
    const authorName = video.author?.name || video.autor_id?.name || 'Desconocido';
    const authorAvatar = video.author?.profilePicture || video.autor_id?.profilePicture;

    const {
        videoRef,
        isHovering,
        isShowingPreview,
        handleMouseEnter,
        handleMouseLeave,
    } = useVideoHoverPreview(videoUrl, { delay: 600, duration: 10 });

    const formatTimeAgo = (dateString) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        const now = new Date();
        const diffInSeconds = Math.floor((now - date) / 1000);
        if (diffInSeconds < 60) return 'Hace un momento';
        if (diffInSeconds < 3600) return `Hace ${Math.floor(diffInSeconds / 60)} min`;
        if (diffInSeconds < 86400) return `Hace ${Math.floor(diffInSeconds / 3600)} h`;
        if (diffInSeconds < 604800) return `Hace ${Math.floor(diffInSeconds / 86400)} días`;
        return date.toLocaleDateString('es-ES', { month: 'short', day: 'numeric', year: 'numeric' });
    };

    const formatDuration = (seconds) => {
        if (!seconds) return '';
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${String(secs).padStart(2, '0')}`;
    };

    const getInitials = (name) => {
        if (!name) return '??';
        return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
    };

    const handleClick = () => {
        navigate(`/portal/watch/${video._id}`);
    };

    return (
        <Box
            onClick={handleClick}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            sx={{
                cursor: 'pointer',
                borderRadius: 2,
                overflow: 'hidden',
                transition: 'transform 0.2s ease',
                '&:hover': {
                    transform: 'scale(1.02)',
                },
            }}
        >
            {/* Thumbnail / Preview */}
            <Box
                sx={{
                    position: 'relative',
                    width: '100%',
                    aspectRatio: VIDEO_CARD_LAYOUT.THUMBNAIL_ASPECT_RATIO,
                    bgcolor: 'grey.900',
                    borderRadius: 2,
                    overflow: 'hidden',
                }}
            >
                {/* Static Thumbnail */}
                <Box
                    component="img"
                    src={thumbnail}
                    alt={video.title}
                    sx={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        display: 'block',
                        opacity: isShowingPreview ? 0 : 1,
                        transition: 'opacity 0.3s ease',
                    }}
                    onError={(e) => {
                        e.target.src = VIDEO_CARD_LAYOUT.FALLBACK_THUMBNAIL;
                    }}
                />

                {/* Video Preview (hidden until hover) */}
                {videoUrl && (
                    <video
                        ref={videoRef}
                        src={videoUrl}
                        muted
                        playsInline
                        preload="none"
                        style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            opacity: isShowingPreview ? 1 : 0,
                            transition: 'opacity 0.3s ease',
                        }}
                    />
                )}

                {/* Duration Chip */}
                {video.duration && !isShowingPreview && (
                    <Box
                        sx={{
                            position: 'absolute',
                            bottom: 8,
                            right: 8,
                            bgcolor: 'rgba(0,0,0,0.8)',
                            color: 'white',
                            px: 0.75,
                            py: 0.25,
                            borderRadius: 0.5,
                            fontSize: '0.75rem',
                            fontWeight: 600,
                            letterSpacing: 0.5,
                        }}
                    >
                        {formatDuration(video.duration)}
                    </Box>
                )}

                {/* Hover progress bar indicator */}
                {isShowingPreview && (
                    <Box
                        sx={{
                            position: 'absolute',
                            bottom: 0,
                            left: 0,
                            right: 0,
                            height: 3,
                            bgcolor: 'primary.main',
                            opacity: 0.8,
                        }}
                    />
                )}
            </Box>

            {/* Video Info */}
            <Box sx={{ display: 'flex', gap: 1.5, pt: 1.5 }}>
                {/* Author Avatar */}
                <Avatar
                    src={authorAvatar}
                    sx={{ width: 36, height: 36, mt: 0.25, flexShrink: 0 }}
                >
                    {getInitials(authorName)}
                </Avatar>

                {/* Text Info */}
                <Box sx={{ flex: 1, minWidth: 0 }}>
                    <Typography
                        variant="subtitle2"
                        sx={{
                            fontWeight: 600,
                            display: '-webkit-box',
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden',
                            lineHeight: 1.4,
                            mb: 0.5,
                        }}
                    >
                        {video.title || video.titulo || 'Sin título'}
                    </Typography>
                    <Typography
                        variant="caption"
                        color="text.secondary"
                        sx={{ display: 'block', lineHeight: 1.4 }}
                    >
                        {authorName}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                        {video.views || 0} vistas • {formatTimeAgo(video.createdAt)}
                    </Typography>
                </Box>
            </Box>
        </Box>
    );
};

export default VideoCardYouTube;

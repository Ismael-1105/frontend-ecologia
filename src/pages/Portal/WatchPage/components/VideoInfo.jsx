import React, { useState } from 'react';
import {
    Box,
    Typography,
    IconButton,
    Chip,
    Stack,
    Divider,
    Avatar,
    Button,
    Collapse,
} from '@mui/material';
import {
    ThumbUp,
    ThumbUpOutlined,
    ThumbDown,
    ThumbDownOutlined,
    Share as ShareIcon,
    ExpandMore as ExpandMoreIcon,
    ExpandLess as ExpandLessIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const VideoInfo = ({ video, hasLiked, hasDisliked, onLike, onDislike }) => {
    const [descExpanded, setDescExpanded] = useState(false);
    const navigate = useNavigate();

    const formatDate = (dateString) => {
        if (!dateString) return '';
        return new Date(dateString).toLocaleDateString('es-ES', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    };

    const formatTimeAgo = (dateString) => {
        const date = new Date(dateString);
        const now = new Date();
        const diffInSeconds = Math.floor((now - date) / 1000);

        if (diffInSeconds < 60) return 'Hace un momento';
        if (diffInSeconds < 3600) return `Hace ${Math.floor(diffInSeconds / 60)} min`;
        if (diffInSeconds < 86400) return `Hace ${Math.floor(diffInSeconds / 3600)} h`;
        if (diffInSeconds < 604800) return `Hace ${Math.floor(diffInSeconds / 86400)} días`;
        return formatDate(dateString);
    };

    const authorName = video.author?.name || video.autor_id?.name || 'Desconocido';
    const authorAvatar = video.author?.profilePicture || video.autor_id?.profilePicture;
    const authorId = video.author?._id || video.autor_id?._id;
    const description = video.description || video.descripcion || '';

    const getInitials = (name) => {
        if (!name) return '??';
        return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
    };

    const handleShare = () => {
        if (navigator.share) {
            navigator.share({
                title: video.title || video.titulo,
                url: window.location.href,
            }).catch(() => {});
        } else {
            navigator.clipboard.writeText(window.location.href);
        }
    };

    return (
        <Box>
            {/* Title */}
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 1.5, lineHeight: 1.3 }}>
                {video.title || video.titulo || 'Sin título'}
            </Typography>

            {/* YouTube-style row: Author (left) + Actions (right) */}
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    flexWrap: 'wrap',
                    gap: 1.5,
                    mb: 2,
                }}
            >
                {/* Left: Author info */}
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1.5,
                        cursor: authorId ? 'pointer' : 'default',
                    }}
                    onClick={() => authorId && navigate(`/portal/profile/${authorId}`)}
                >
                    <Avatar
                        src={authorAvatar}
                        sx={{ width: 44, height: 44 }}
                    >
                        {getInitials(authorName)}
                    </Avatar>
                    <Box>
                        <Typography variant="body1" sx={{ fontWeight: 700, lineHeight: 1.2, fontSize: '1rem' }}>
                            {authorName}
                        </Typography>
                        {video.author?.institution && (
                            <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.85rem' }}>
                                {video.author.institution}
                            </Typography>
                        )}
                    </Box>
                </Box>

                {/* Right: Like/Dislike + Share */}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                    {/* Like / Dislike pill */}
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            bgcolor: 'action.hover',
                            borderRadius: 10,
                            px: 1,
                            py: 0.5,
                            height: 40,
                        }}
                    >
                        <IconButton onClick={onLike} color={hasLiked ? 'primary' : 'default'} sx={{ p: 0.75 }}>
                            {hasLiked ? <ThumbUp /> : <ThumbUpOutlined />}
                        </IconButton>
                        <Typography variant="body2" sx={{ fontWeight: 600, mx: 0.5, fontSize: '0.9rem' }}>
                            {video.likeCount || video.likes?.length || 0}
                        </Typography>
                        <Divider orientation="vertical" flexItem sx={{ mx: 1 }} />
                        <IconButton onClick={onDislike} color={hasDisliked ? 'error' : 'default'} sx={{ p: 0.75 }}>
                            {hasDisliked ? <ThumbDown /> : <ThumbDownOutlined />}
                        </IconButton>
                        <Typography variant="body2" sx={{ fontWeight: 600, mx: 0.5, fontSize: '0.9rem' }}>
                            {video.dislikeCount || video.dislikes?.length || 0}
                        </Typography>
                    </Box>

                    {/* Share button */}
                    <Button
                        variant="text"
                        startIcon={<ShareIcon />}
                        onClick={handleShare}
                        sx={{
                            bgcolor: 'action.hover',
                            borderRadius: 10,
                            textTransform: 'none',
                            fontWeight: 600,
                            fontSize: '0.9rem',
                            px: 2.5,
                            py: 1,
                            height: 40,
                            color: 'text.primary',
                            '&:hover': {
                                bgcolor: 'action.selected',
                            },
                        }}
                    >
                        Compartir
                    </Button>
                </Box>
            </Box>

            {/* Description Card (with views/date inside, like YouTube) */}
            <Box
                sx={{
                    bgcolor: 'action.hover',
                    borderRadius: 3,
                    p: 2,
                    mb: 3,
                    cursor: !descExpanded && description.length > 150 ? 'pointer' : 'default',
                }}
                onClick={() => {
                    if (!descExpanded && description.length > 150) {
                        setDescExpanded(true);
                    }
                }}
            >
                {/* Views + Date */}
                <Typography variant="body2" sx={{ fontWeight: 600, mb: description ? 1 : 0 }}>
                    {video.views || 0} visualizaciones • {formatTimeAgo(video.createdAt || video.fecha_creacion)}
                    {video.category && (
                        <Chip
                            label={video.category}
                            size="small"
                            variant="outlined"
                            sx={{ borderRadius: 2, ml: 1, height: 22, fontSize: '0.7rem' }}
                        />
                    )}
                </Typography>

                {/* Description */}
                {description && (
                    <Box>
                        <Collapse in={descExpanded} collapsedSize={40}>
                            <Typography
                                variant="body2"
                                color="text.secondary"
                                sx={{ whiteSpace: 'pre-wrap', lineHeight: 1.6 }}
                            >
                                {description}
                            </Typography>
                        </Collapse>
                        {description.length > 150 && (
                            <Button
                                size="small"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setDescExpanded(!descExpanded);
                                }}
                                sx={{
                                    textTransform: 'none',
                                    fontWeight: 700,
                                    mt: 0.5,
                                    p: 0,
                                    minWidth: 'auto',
                                }}
                            >
                                {descExpanded ? 'Mostrar menos' : 'Mostrar más'}
                            </Button>
                        )}
                    </Box>
                )}
            </Box>
        </Box>
    );
};

export default VideoInfo;

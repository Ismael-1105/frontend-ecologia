import React from 'react';
import {
    Card,
    CardContent,
    CardMedia,
    Typography,
    Box,
    Chip,
    IconButton,
    Avatar,
} from '@mui/material';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import { Visibility as ViewIcon, ThumbUp as LikeIcon } from '@mui/icons-material';
import { alpha } from '@mui/material/styles';

/**
 * Public Video Card Component
 * Displays video information with author details (read-only)
 * Styled to match Dashboard VideoCard
 */
const VideoCardPublic = ({ video, onVideoSelect }) => {
    const handleCardClick = () => {
        if (onVideoSelect) {
            onVideoSelect(video._id);
        }
    };

    const getInitials = (name) => {
        if (!name) return '??';
        return name
            .split(' ')
            .map((n) => n[0])
            .join('')
            .toUpperCase()
            .slice(0, 2);
    };

    const authorName = video.author?.name || 'Anónimo';
    const authorAvatar = video.author?.profilePicture;

    return (
        <Card
            onClick={handleCardClick}
            sx={(theme) => ({
                backgroundColor: theme.palette.mode === 'dark'
                    ? alpha(theme.palette.background.paper, 0.7)
                    : theme.palette.background.paper,
                backdropFilter: 'blur(10px)',
                border: `1px solid ${theme.palette.divider}`,
                borderRadius: 3,
                transition: 'all 0.3s ease',
                cursor: 'pointer',
                position: 'relative',
                overflow: 'hidden',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: theme.palette.mode === 'dark'
                        ? `0 12px 32px ${alpha(theme.palette.primary.main, 0.2)}`
                        : `0 12px 32px ${alpha(theme.palette.primary.main, 0.15)}`,
                    borderColor: theme.palette.primary.main,
                    '& .play-icon': {
                        opacity: 1,
                        transform: 'translate(-50%, -50%) scale(1.1)',
                    },
                },
            })}
        >
            {/* Thumbnail */}
            <Box sx={{ position: 'relative' }}>
                <CardMedia
                    component="img"
                    height="200"
                    image={video.thumbnailUrl || video.thumbnail || '/placeholder-video.jpg'}
                    alt={video.title}
                    sx={{
                        objectFit: 'cover',
                        bgcolor: 'grey.200',
                    }}
                />
                <IconButton
                    className="play-icon"
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        opacity: 0.8,
                        transition: 'all 0.3s ease',
                        backgroundColor: 'rgba(0, 0, 0, 0.6)',
                        '&:hover': {
                            backgroundColor: 'rgba(0, 0, 0, 0.8)',
                        },
                    }}
                >
                    <PlayCircleOutlineIcon
                        sx={{
                            fontSize: 60,
                            color: 'primary.main',
                        }}
                    />
                </IconButton>
                {video.duration && (
                    <Chip
                        label={video.duration}
                        size="small"
                        sx={{
                            position: 'absolute',
                            bottom: 8,
                            right: 8,
                            bgcolor: 'rgba(0,0,0,0.8)',
                            color: 'white',
                            fontSize: '0.75rem',
                        }}
                    />
                )}
            </Box>

            {/* Content */}
            <CardContent sx={{ pb: 2, flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                {/* Title */}
                <Typography
                    variant="h6"
                    sx={{
                        color: 'primary.main',
                        fontWeight: 'bold',
                        mb: 1,
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                    }}
                >
                    {video.title}
                </Typography>

                {/* Author Info */}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5 }}>
                    <Avatar
                        src={authorAvatar}
                        sx={{ width: 24, height: 24, bgcolor: 'primary.main' }}
                    >
                        {getInitials(authorName)}
                    </Avatar>
                    <Typography variant="body2" color="text.secondary">
                        Por: {authorName}
                    </Typography>
                </Box>

                {/* Description */}
                {video.description && (
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
                            minHeight: '40px',
                            flexGrow: 1,
                        }}
                    >
                        {video.description}
                    </Typography>
                )}

                {/* Bottom section: Category and Stats */}
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mt: 'auto' }}>
                    {video.category && (
                        <Chip
                            label={video.category}
                            size="small"
                            sx={(theme) => ({
                                bgcolor: alpha(theme.palette.primary.main, 0.1),
                                color: 'primary.main',
                                fontWeight: 600,
                                borderRadius: 2,
                            })}
                        />
                    )}

                    <Box sx={{ display: 'flex', gap: 1.5, alignItems: 'center' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                            <ViewIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
                            <Typography variant="caption" color="text.secondary">
                                {video.views || 0}
                            </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                            <LikeIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
                            <Typography variant="caption" color="text.secondary">
                                {video.likes?.length || 0}
                            </Typography>
                        </Box>
                    </Box>
                </Box>
            </CardContent>
        </Card>
    );
};

export default VideoCardPublic;

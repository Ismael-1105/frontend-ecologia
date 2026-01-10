import React from 'react';
import {
    Card,
    CardContent,
    Box,
    Typography,
    Avatar,
    Chip,
    Stack,
    IconButton
} from '@mui/material';
import {
    Comment as CommentIcon,
    Visibility as VisibilityIcon,
    Videocam as VideocamIcon,
    MoreVert as MoreVertIcon,
    ThumbUp as ThumbUpIcon
} from '@mui/icons-material';
import { Link } from 'react-router-dom';

const PostCard = ({ post }) => {
    const getInitials = (name) => {
        if (!name) return '??';
        return name
            .split(' ')
            .map(n => n[0])
            .join('')
            .toUpperCase()
            .slice(0, 2);
    };

    // Extract author name from author object or use fallback
    const authorName = post.author?.name || 'Anónimo';
    const authorAvatar = post.author?.profilePicture;

    // Calculate stats
    const likeCount = post.likes?.length || 0;
    const commentCount = post.commentCount || 0;

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
                    {/* Avatar */}
                    <Avatar
                        src={authorAvatar}
                        sx={{
                            width: 48,
                            height: 48,
                            bgcolor: 'primary.main',
                            display: { xs: 'none', sm: 'flex' }
                        }}
                    >
                        {getInitials(authorName)}
                    </Avatar>

                    {/* Content */}
                    <Box sx={{ flex: 1, minWidth: 0 }}>
                        {/* Title and Badges */}
                        <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1, mb: 1 }}>
                            <Link
                                to={`/portal/foro/${post._id}`}
                                style={{ textDecoration: 'none', color: 'inherit', flex: 1 }}
                            >
                                <Typography
                                    variant="h6"
                                    sx={{
                                        fontWeight: 600,
                                        fontSize: '1.1rem',
                                        '&:hover': {
                                            color: 'primary.main'
                                        },
                                        transition: 'color 0.2s ease'
                                    }}
                                >
                                    {post.title}
                                </Typography>
                            </Link>
                            <IconButton size="small">
                                <MoreVertIcon fontSize="small" />
                            </IconButton>
                        </Box>

                        {/* Badges */}
                        <Stack direction="row" spacing={1} sx={{ mb: 1.5, flexWrap: 'wrap', gap: 0.5 }}>
                            {post.hasVideo && (
                                <Chip
                                    icon={<VideocamIcon />}
                                    label="Video"
                                    size="small"
                                    color="secondary"
                                    variant="outlined"
                                    sx={{ height: 24 }}
                                />
                            )}
                            {likeCount > 10 && (
                                <Chip
                                    label="🔥 Popular"
                                    size="small"
                                    color="error"
                                    sx={{ height: 24 }}
                                />
                            )}
                            <Chip
                                label={post.category}
                                size="small"
                                variant="outlined"
                                sx={{ height: 24 }}
                            />
                        </Stack>

                        {/* Author and Stats */}
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexWrap: 'wrap' }}>
                            <Typography variant="body2" color="text.secondary">
                                Por <strong>{authorName}</strong>
                            </Typography>
                            <Box sx={{ display: 'flex', gap: 2 }}>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                    <ThumbUpIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
                                    <Typography variant="caption" color="text.secondary">
                                        {likeCount} me gusta
                                    </Typography>
                                </Box>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                    <CommentIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
                                    <Typography variant="caption" color="text.secondary">
                                        {commentCount} respuestas
                                    </Typography>
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </CardContent>
        </Card>
    );
};

export default PostCard;

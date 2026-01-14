import React, { useState } from 'react';
import {
    Card,
    CardContent,
    Box,
    Typography,
    Avatar,
    Chip,
    Stack,
    IconButton,
    Tooltip
} from '@mui/material';
import {
    Comment as CommentIcon,
    Visibility as VisibilityIcon,
    Videocam as VideocamIcon,
    MoreVert as MoreVertIcon,
    ThumbUp as ThumbUpIcon,
    ThumbDown as ThumbDownIcon,
    PushPin as PushPinIcon
} from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { toggleLikePost, toggleDislikePost } from '../../../../core/api/postService';

const PostCard = ({ post }) => {
    // State for engagement metrics
    const [likeCount, setLikeCount] = useState(post.likes?.length || 0);
    const [dislikeCount, setDislikeCount] = useState(post.dislikes?.length || 0);
    const [viewCount] = useState(post.views || 0);
    const [userLiked, setUserLiked] = useState(false);
    const [userDisliked, setUserDisliked] = useState(false);

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

    // Calculate comment count
    const commentCount = post.commentCount || 0;

    // Handlers for like/dislike
    const handleLike = async (e) => {
        e.preventDefault();
        e.stopPropagation();

        try {
            const response = await toggleLikePost(post._id);
            if (response.success) {
                setLikeCount(response.data.likeCount);
                setUserLiked(response.data.liked);
                // If liked, remove dislike
                if (response.data.liked && userDisliked) {
                    setUserDisliked(false);
                    setDislikeCount(prev => Math.max(0, prev - 1));
                }
            }
        } catch (error) {
            console.error('Error toggling like:', error);
        }
    };

    const handleDislike = async (e) => {
        e.preventDefault();
        e.stopPropagation();

        try {
            const response = await toggleDislikePost(post._id);
            if (response.success) {
                setDislikeCount(response.data.dislikeCount);
                setUserDisliked(response.data.disliked);
                // If disliked, remove like
                if (response.data.disliked && userLiked) {
                    setUserLiked(false);
                    setLikeCount(prev => Math.max(0, prev - 1));
                }
            }
        } catch (error) {
            console.error('Error toggling dislike:', error);
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
                            {post.isPinned && (
                                <Chip
                                    icon={<PushPinIcon />}
                                    label="Fijado"
                                    size="small"
                                    color="warning"
                                    sx={{ height: 24 }}
                                />
                            )}
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
                            <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                                {/* Like Button */}
                                <Tooltip title="Me gusta">
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                        <IconButton
                                            size="small"
                                            onClick={handleLike}
                                            color={userLiked ? 'primary' : 'default'}
                                            sx={{ p: 0.5 }}
                                        >
                                            <ThumbUpIcon sx={{ fontSize: 18 }} />
                                        </IconButton>
                                        <Typography variant="caption" color="text.secondary">
                                            {likeCount}
                                        </Typography>
                                    </Box>
                                </Tooltip>

                                {/* Dislike Button */}
                                <Tooltip title="No me gusta">
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                        <IconButton
                                            size="small"
                                            onClick={handleDislike}
                                            color={userDisliked ? 'error' : 'default'}
                                            sx={{ p: 0.5 }}
                                        >
                                            <ThumbDownIcon sx={{ fontSize: 18 }} />
                                        </IconButton>
                                        <Typography variant="caption" color="text.secondary">
                                            {dislikeCount}
                                        </Typography>
                                    </Box>
                                </Tooltip>

                                {/* Comments */}
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                    <CommentIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
                                    <Typography variant="caption" color="text.secondary">
                                        {commentCount}
                                    </Typography>
                                </Box>

                                {/* Views */}
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                    <VisibilityIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
                                    <Typography variant="caption" color="text.secondary">
                                        {viewCount}
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

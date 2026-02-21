import React, { useState, useEffect } from 'react';
import {
    Typography,
    Box,
    Avatar,
    Chip,
    Skeleton,
} from '@mui/material';
import {
    ThumbUp as ThumbUpIcon,
    Comment as CommentIcon,
} from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { getPosts } from '../../../../core/api/postService';

const PostItemSkeleton = () => (
    <Box sx={{ display: 'flex', gap: 1.5, py: 1 }}>
        <Skeleton variant="circular" width={36} height={36} />
        <Box sx={{ flex: 1 }}>
            <Skeleton variant="text" width="90%" height={16} />
            <Skeleton variant="text" width="70%" height={16} />
            <Skeleton variant="text" width="40%" height={14} />
        </Box>
    </Box>
);

const SidebarRecentPosts = ({ excludePostId, limit = 6 }) => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchPosts();
    }, [excludePostId]);

    const fetchPosts = async () => {
        try {
            const response = await getPosts({ limit: limit + 1, sort: '-createdAt' });
            if (response.success && response.data?.length > 0) {
                // Filter out current post
                const filtered = response.data.filter(p => p._id !== excludePostId);
                setPosts(filtered.slice(0, limit));
            }
        } catch (err) {
            console.error('Error fetching recent posts:', err);
        } finally {
            setLoading(false);
        }
    };

    const getInitials = (name) => {
        if (!name) return '??';
        return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
    };

    const formatTimeAgo = (dateString) => {
        if (!dateString) return '';
        const now = new Date();
        const date = new Date(dateString);
        const diffMs = now - date;
        const diffDays = Math.floor(diffMs / 86400000);
        const diffWeeks = Math.floor(diffDays / 7);
        const diffMonths = Math.floor(diffDays / 30);

        if (diffDays < 1) return 'Hoy';
        if (diffDays === 1) return 'Ayer';
        if (diffDays < 7) return `Hace ${diffDays} días`;
        if (diffWeeks < 5) return `Hace ${diffWeeks} sem`;
        if (diffMonths < 12) return `Hace ${diffMonths} mes${diffMonths > 1 ? 'es' : ''}`;
        return new Date(dateString).toLocaleDateString('es-ES', { day: 'numeric', month: 'short' });
    };

    if (!loading && posts.length === 0) return null;

    return (
        <Box>
            {loading ? (
                <Box>
                    {[...Array(4)].map((_, i) => <PostItemSkeleton key={i} />)}
                </Box>
            ) : (
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                    {posts.map((post) => {
                        const authorName = post.author?.name || 'Anónimo';
                        const authorAvatar = post.author?.profilePicture;
                        const likeCount = post.likes?.length || post.likeCount || 0;
                        const commentCount = post.commentCount || 0;

                        return (
                            <Box
                                key={post._id}
                                component={Link}
                                to={`/portal/foro/${post._id}`}
                                sx={{
                                    display: 'flex',
                                    gap: 1.5,
                                    textDecoration: 'none',
                                    color: 'inherit',
                                    borderRadius: 2,
                                    p: 1,
                                    transition: 'background 0.15s ease',
                                    '&:hover': {
                                        bgcolor: 'action.hover',
                                    },
                                }}
                            >
                                {/* Avatar */}
                                <Avatar
                                    src={authorAvatar}
                                    sx={{
                                        width: 36,
                                        height: 36,
                                        fontSize: '0.75rem',
                                        bgcolor: 'primary.main',
                                        flexShrink: 0,
                                    }}
                                >
                                    {getInitials(authorName)}
                                </Avatar>

                                {/* Info */}
                                <Box sx={{ flex: 1, minWidth: 0 }}>
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
                                        {post.title}
                                    </Typography>
                                    <Typography variant="caption" color="text.secondary" noWrap sx={{ display: 'block', lineHeight: 1.4 }}>
                                        {authorName}
                                    </Typography>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mt: 0.25 }}>
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.3 }}>
                                            <ThumbUpIcon sx={{ fontSize: 12, color: 'text.secondary' }} />
                                            <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.7rem' }}>
                                                {likeCount}
                                            </Typography>
                                        </Box>
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.3 }}>
                                            <CommentIcon sx={{ fontSize: 12, color: 'text.secondary' }} />
                                            <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.7rem' }}>
                                                {commentCount}
                                            </Typography>
                                        </Box>
                                        <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.7rem' }}>
                                            {formatTimeAgo(post.createdAt)}
                                        </Typography>
                                    </Box>
                                </Box>

                                {/* Category chip */}
                                <Chip
                                    label={post.category || 'General'}
                                    size="small"
                                    variant="outlined"
                                    sx={{
                                        height: 22,
                                        fontSize: '0.6rem',
                                        alignSelf: 'flex-start',
                                        mt: 0.25,
                                        flexShrink: 0,
                                    }}
                                />
                            </Box>
                        );
                    })}
                </Box>
            )}
        </Box>
    );
};

export default SidebarRecentPosts;

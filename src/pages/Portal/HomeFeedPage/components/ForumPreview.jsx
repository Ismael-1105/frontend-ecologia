import React, { useState, useEffect, useRef } from 'react';
import {
    Box,
    Typography,
    Card,
    CardContent,
    Chip,
    Avatar,
    IconButton,
    Skeleton,
} from '@mui/material';
import {
    Forum as ForumIcon,
    ThumbUp as ThumbUpIcon,
    Comment as CommentIcon,
    Visibility as VisibilityIcon,
    ArrowForwardIos as ArrowRightIcon,
    ArrowBackIos as ArrowLeftIcon,
    Whatshot as WhatshotIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { getPosts, getTrendingPosts } from '../../../../core/api/postService';

const ForumPreviewCard = ({ post }) => {
    const navigate = useNavigate();
    const authorName = post.author?.name || 'Anónimo';
    const authorAvatar = post.author?.profilePicture;
    const likeCount = post.likes?.length || post.likeCount || 0;
    const commentCount = post.commentCount || 0;

    const getInitials = (name) => {
        if (!name) return '??';
        return name.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2);
    };

    return (
        <Card
            elevation={0}
            onClick={() => navigate(`/portal/foro/${post._id}`)}
            sx={{
                minWidth: 280,
                maxWidth: 280,
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
                {/* Category + Popular badge */}
                <Box sx={{ display: 'flex', gap: 0.75, mb: 1.5, flexWrap: 'wrap' }}>
                    <Chip
                        label={post.category || 'General'}
                        size="small"
                        variant="outlined"
                        color="primary"
                        sx={{ height: 22, fontSize: '0.7rem' }}
                    />
                    {likeCount > 10 && (
                        <Chip
                            icon={<WhatshotIcon sx={{ fontSize: '14px !important' }} />}
                            label="Popular"
                            size="small"
                            color="error"
                            sx={{ height: 22, fontSize: '0.7rem' }}
                        />
                    )}
                </Box>

                {/* Title */}
                <Typography
                    variant="body2"
                    sx={{
                        fontWeight: 600,
                        mb: 1.5,
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                        lineHeight: 1.3,
                        fontSize: '0.9rem',
                    }}
                >
                    {post.title}
                </Typography>

                {/* Author */}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5 }}>
                    <Avatar
                        src={authorAvatar}
                        sx={{ width: 24, height: 24, fontSize: '0.7rem', bgcolor: 'primary.main' }}
                    >
                        {getInitials(authorName)}
                    </Avatar>
                    <Typography variant="caption" color="text.secondary" noWrap>
                        {authorName}
                    </Typography>
                </Box>

                {/* Stats row */}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        <ThumbUpIcon sx={{ fontSize: 14, color: 'text.secondary' }} />
                        <Typography variant="caption" color="text.secondary">
                            {likeCount}
                        </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        <CommentIcon sx={{ fontSize: 14, color: 'text.secondary' }} />
                        <Typography variant="caption" color="text.secondary">
                            {commentCount}
                        </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        <VisibilityIcon sx={{ fontSize: 14, color: 'text.secondary' }} />
                        <Typography variant="caption" color="text.secondary">
                            {post.views || 0}
                        </Typography>
                    </Box>
                </Box>
            </CardContent>
        </Card>
    );
};

const ForumPreviewSkeleton = () => (
    <Box sx={{ display: 'flex', gap: 2, overflow: 'hidden' }}>
        {[...Array(5)].map((_, i) => (
            <Skeleton
                key={i}
                variant="rounded"
                sx={{ minWidth: 280, height: 160, borderRadius: 3, flexShrink: 0 }}
                animation="wave"
            />
        ))}
    </Box>
);

const ForumPreview = () => {
    const scrollRef = useRef(null);
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showLeftArrow, setShowLeftArrow] = useState(false);
    const [showRightArrow, setShowRightArrow] = useState(false);

    useEffect(() => {
        fetchPosts();
    }, []);

    const fetchPosts = async () => {
        try {
            // Try trending first, fall back to recent
            let response = await getTrendingPosts({ limit: 10, timeframe: 30 });
            if (response.success && response.data?.length > 0) {
                setPosts(response.data);
            } else {
                // Fallback to recent posts
                response = await getPosts({ limit: 10, sort: '-createdAt' });
                if (response.success && response.data?.length > 0) {
                    setPosts(response.data);
                }
            }
        } catch (err) {
            console.error('Error fetching forum preview:', err);
            // Try fallback on error
            try {
                const response = await getPosts({ limit: 10, sort: '-createdAt' });
                if (response.success && response.data?.length > 0) {
                    setPosts(response.data);
                }
            } catch {
                // Silent fail
            }
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
    }, [posts]);

    const scroll = (direction) => {
        const el = scrollRef.current;
        if (!el) return;
        const amount = direction === 'left' ? -500 : 500;
        el.scrollBy({ left: amount, behavior: 'smooth' });
    };

    if (!loading && posts.length === 0) return null;

    return (
        <Box sx={{ mb: 2 }}>
            {/* Header */}
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1.5, px: 0.5 }}>
                <ForumIcon sx={{ color: 'primary.main', mr: 1, fontSize: 28 }} />
                <Typography variant="h6" sx={{ fontWeight: 700, fontSize: '1.1rem' }}>
                    Discusiones del foro
                </Typography>
            </Box>

            {/* Scrollable row */}
            {loading ? (
                <ForumPreviewSkeleton />
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
                        {posts.map((post) => (
                            <ForumPreviewCard key={post._id} post={post} />
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

export default ForumPreview;

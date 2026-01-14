import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
    Container,
    Box,
    Typography,
    Paper,
    Avatar,
    Chip,
    IconButton,
    Button,
    CircularProgress,
    Alert,
    Divider,
    Stack
} from '@mui/material';
import {
    ArrowBack as ArrowBackIcon,
    ThumbUp as ThumbUpIcon,
    ThumbUpOutlined as ThumbUpOutlinedIcon,
    Comment as CommentIcon
} from '@mui/icons-material';
import { getPostById, toggleLikePost } from '../../../core/api/postService';
import CommentSection from './components/CommentSection';

const PostDetailPage = () => {
    const { postId } = useParams();
    const navigate = useNavigate();
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [liked, setLiked] = useState(false);

    useEffect(() => {
        fetchPost();
    }, [postId]);

    const fetchPost = async () => {
        try {
            setLoading(true);
            setError(null);

            const response = await getPostById(postId);

            if (response.success) {
                setPost(response.data);
                // Check if current user has liked the post
                const currentUserId = localStorage.getItem('userId');
                setLiked(response.data.likes?.includes(currentUserId));
            }
        } catch (err) {
            console.error('Error fetching post:', err);
            setError(err.response?.data?.error || 'Error al cargar la publicación');
        } finally {
            setLoading(false);
        }
    };

    const handleLike = async () => {
        try {
            const response = await toggleLikePost(postId);
            if (response.success) {
                setLiked(response.data.liked);
                setPost(prev => ({
                    ...prev,
                    likes: response.data.liked
                        ? [...(prev.likes || []), localStorage.getItem('userId')]
                        : (prev.likes || []).filter(id => id !== localStorage.getItem('userId'))
                }));
            }
        } catch (err) {
            console.error('Error toggling like:', err);
        }
    };

    const getInitials = (name) => {
        if (!name) return '??';
        return name
            .split(' ')
            .map(n => n[0])
            .join('')
            .toUpperCase()
            .slice(0, 2);
    };

    const formatDate = (date) => {
        return new Date(date).toLocaleDateString('es-ES', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    if (loading) {
        return (
            <Container maxWidth="md" sx={{ py: 4 }}>
                <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
                    <CircularProgress />
                </Box>
            </Container>
        );
    }

    if (error || !post) {
        return (
            <Container maxWidth="md" sx={{ py: 4 }}>
                <Alert severity="error" sx={{ mb: 2 }}>
                    {error || 'Publicación no encontrada'}
                </Alert>
                <Button
                    startIcon={<ArrowBackIcon />}
                    onClick={() => navigate('/portal/foro')}
                >
                    Volver al foro
                </Button>
            </Container>
        );
    }

    const authorName = post.author?.name || 'Anónimo';
    const authorAvatar = post.author?.profilePicture;
    const likeCount = post.likes?.length || 0;

    return (
        <Container maxWidth="md" sx={{ py: 0 }}>
            {/* Back Button */}
            <Box sx={{ mb: 3 }}>
                <Button
                    startIcon={<ArrowBackIcon />}
                    onClick={() => navigate('/portal/foro')}
                >
                    Volver al foro
                </Button>
            </Box>

            {/* Post Content */}
            <Paper elevation={2} sx={{ p: 3, mb: 3 }}>
                {/* Header */}
                <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2, mb: 2 }}>
                    <Avatar
                        src={authorAvatar}
                        sx={{ width: 56, height: 56, bgcolor: 'primary.main' }}
                    >
                        {getInitials(authorName)}
                    </Avatar>
                    <Box sx={{ flex: 1 }}>
                        <Typography variant="h5" sx={{ fontWeight: 700, mb: 0.5 }}>
                            {post.title}
                        </Typography>
                        <Stack direction="row" spacing={1} alignItems="center" flexWrap="wrap">
                            <Typography variant="body2" color="text.secondary">
                                Por <strong>{authorName}</strong>
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                •
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                {formatDate(post.createdAt)}
                            </Typography>
                        </Stack>
                    </Box>
                    <Chip label={post.category} color="primary" variant="outlined" />
                </Box>

                <Divider sx={{ my: 2 }} />

                {/* Content */}
                <Typography variant="body1" sx={{ mb: 3, whiteSpace: 'pre-wrap' }}>
                    {post.content}
                </Typography>

                <Divider sx={{ my: 2 }} />

                {/* Actions */}
                <Stack direction="row" spacing={2} alignItems="center">
                    <Button
                        startIcon={liked ? <ThumbUpIcon /> : <ThumbUpOutlinedIcon />}
                        onClick={handleLike}
                        color={liked ? 'primary' : 'inherit'}
                        variant={liked ? 'contained' : 'outlined'}
                    >
                        {likeCount} Me gusta
                    </Button>
                    <Button
                        startIcon={<CommentIcon />}
                        variant="outlined"
                    >
                        {post.commentCount || 0} Comentarios
                    </Button>
                </Stack>
            </Paper>

            {/* Comments Section */}
            <Paper elevation={2} sx={{ p: 3 }}>
                <CommentSection postId={postId} />
            </Paper>
        </Container>
    );
};

export default PostDetailPage;

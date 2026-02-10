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
    Stack,
    Card,
    CardContent
} from '@mui/material';
import {
    ArrowBack as ArrowBackIcon,
    ThumbUp as ThumbUpIcon,
    ThumbUpOutlined as ThumbUpOutlinedIcon,
    Comment as CommentIcon,
    Visibility as VisibilityIcon,
    Schedule as ScheduleIcon,
    Person as PersonIcon,
    Edit as EditIcon,
    Delete as DeleteIcon
} from '@mui/icons-material';
import { deletePost } from '../../../core/api/postService';
import { useAuth } from '../../../core/context/AuthContext';
import { useSnackbar } from '../../../core/context/SnackbarContext.jsx';
import { getPostById, toggleLikePost } from '../../../core/api/postService';
import CommentSection from './components/CommentSection';
import SweetAlert from '../../../components/common/SweetAlert';

const PostDetailPage = () => {
    const { postId } = useParams();
    const navigate = useNavigate();
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [liked, setLiked] = useState(false);

    const { user } = useAuth();
    const { showSuccess, showError } = useSnackbar();

    const isAdmin = user?.role === 'Administrador' || user?.role === 'SuperAdmin';
    const isAuthor = user && post && (post.author?._id === user._id || post.author?._id === user.id || post.author === user.id);
    const canManage = isAdmin || isAuthor;

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
                        ? [...(prev.likes || []), user?._id || user?.id]
                        : (prev.likes || []).filter(id => id !== (user?._id || user?.id))
                }));
            }
        } catch (err) {
            console.error('Error toggling like:', err);
        }
    };

    const handleEdit = () => {
        navigate(`/portal/foro/edit/${postId}`);
    };

    const handleDelete = async () => {
        const confirmed = await SweetAlert.showDeleteConfirmation(
            '¿Eliminar publicación?',
            '¿Estás seguro de eliminar esta publicación? Esta acción no se puede deshacer.'
        );

        if (confirmed) {
            try {
                const response = await deletePost(postId);
                if (response.success) {
                    SweetAlert.showSuccessAlert('¡Eliminado!', 'Publicación eliminada correctamente');
                    // showSuccess('Publicación eliminada correctamente');
                    navigate('/portal/foro');
                }
            } catch (err) {
                console.error('Error deleting post:', err);
                SweetAlert.showErrorAlert('Error', 'Error al eliminar la publicación');
                // showError('Error al eliminar la publicación');
            }
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
            <Box sx={{ bgcolor: 'background.default', minHeight: '100vh', py: 4 }}>
                <Container maxWidth="md">
                    <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
                        <CircularProgress size={60} thickness={4} />
                    </Box>
                </Container>
            </Box>
        );
    }

    if (error || !post) {
        return (
            <Box sx={{ bgcolor: 'background.default', minHeight: '100vh', py: 4 }}>
                <Container maxWidth="md">
                    <Alert
                        severity="error"
                        sx={{
                            mb: 2,
                            borderRadius: 3,
                            boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                        }}
                    >
                        {error || 'Publicación no encontrada'}
                    </Alert>
                    <Button
                        startIcon={<ArrowBackIcon />}
                        onClick={() => navigate('/portal/foro')}
                        variant="outlined"
                        size="large"
                        sx={{ borderRadius: 2 }}
                    >
                        Regresar
                    </Button>
                </Container>
            </Box>
        );
    }

    const authorName = post.author?.name || 'Anónimo';
    const authorAvatar = post.author?.profilePicture;
    const likeCount = post.likes?.length || 0;

    return (
        <Box sx={{ bgcolor: 'background.default', minHeight: '100vh', pb: 6 }}>
            {/* Header with gradient */}
            <Box
                sx={{
                    background: 'linear-gradient(135deg, #2E7D32 0%, #66BB6A 100%)',
                    color: 'white',
                    py: 3,
                    mb: 4
                }}
            >
                <Container maxWidth="md">
                    <Button
                        startIcon={<ArrowBackIcon />}
                        onClick={() => navigate('/portal/foro')}
                        sx={{
                            color: 'white',
                            '&:hover': {
                                bgcolor: 'rgba(255,255,255,0.1)'
                            }
                        }}
                    >
                        Volver al foro
                    </Button>
                </Container>
            </Box>

            <Container maxWidth="md">
                {/* Post Content Card */}
                <Card
                    elevation={0}
                    sx={{
                        border: '1px solid',
                        borderColor: 'divider',
                        borderRadius: 3,
                        mb: 3,
                        overflow: 'hidden'
                    }}
                >
                    <CardContent sx={{ p: { xs: 2, md: 4 } }}>
                        {/* Author Header */}
                        <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2, mb: 3 }}>
                            <Avatar
                                src={authorAvatar}
                                sx={{
                                    width: 64,
                                    height: 64,
                                    bgcolor: 'primary.main',
                                    boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
                                }}
                            >
                                {getInitials(authorName)}
                            </Avatar>
                            <Box sx={{ flex: 1 }}>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5, flexWrap: 'wrap' }}>
                                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                                        {authorName}
                                    </Typography>
                                    <Chip
                                        label={post.category}
                                        size="small"
                                        sx={{
                                            bgcolor: 'primary.main',
                                            color: 'white',
                                            fontWeight: 600
                                        }}
                                    />
                                </Box>
                                <Stack direction="row" spacing={2} alignItems="center" flexWrap="wrap" sx={{ gap: 1 }}>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                        <ScheduleIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
                                        <Typography variant="caption" color="text.secondary">
                                            {formatDate(post.createdAt)}
                                        </Typography>
                                    </Box>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                        <VisibilityIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
                                        <Typography variant="caption" color="text.secondary">
                                            {post.views || 0} vistas
                                        </Typography>
                                    </Box>
                                </Stack>
                            </Box>
                        </Box>

                        {/* Title */}
                        <Typography
                            variant="h4"
                            sx={{
                                fontWeight: 700,
                                mb: 3,
                                fontSize: { xs: '1.75rem', md: '2.125rem' },
                                lineHeight: 1.3
                            }}
                        >
                            {post.title}
                        </Typography>

                        <Divider sx={{ my: 3 }} />

                        {/* Content */}
                        <Typography
                            variant="body1"
                            sx={{
                                mb: 3,
                                whiteSpace: 'pre-wrap',
                                lineHeight: 1.8,
                                fontSize: '1.05rem',
                                color: 'text.primary'
                            }}
                        >
                            {post.content}
                        </Typography>

                        <Divider sx={{ my: 3 }} />

                        {/* Actions */}
                        <Stack
                            direction={{ xs: 'column', sm: 'row' }}
                            spacing={2}
                            alignItems={{ xs: 'stretch', sm: 'center' }}
                        >
                            <Button
                                startIcon={liked ? <ThumbUpIcon /> : <ThumbUpOutlinedIcon />}
                                onClick={handleLike}
                                size="large"
                                variant={liked ? 'contained' : 'outlined'}
                                sx={{
                                    borderRadius: 2,
                                    px: 3,
                                    py: 1.5,
                                    fontWeight: 600,
                                    boxShadow: liked ? '0 4px 12px rgba(46, 125, 50, 0.3)' : 'none',
                                    '&:hover': {
                                        transform: 'translateY(-2px)',
                                        boxShadow: liked
                                            ? '0 6px 16px rgba(46, 125, 50, 0.4)'
                                            : '0 4px 12px rgba(0,0,0,0.1)'
                                    },
                                    transition: 'all 0.3s ease'
                                }}
                            >
                                {likeCount} Me gusta
                            </Button>

                            {canManage && (
                                <>
                                    <Button
                                        startIcon={<EditIcon />}
                                        onClick={handleEdit}
                                        size="large"
                                        variant="outlined"
                                        color="primary"
                                        sx={{ borderRadius: 2, px: 3, py: 1.5, fontWeight: 600 }}
                                    >
                                        Editar
                                    </Button>
                                    <Button
                                        startIcon={<DeleteIcon />}
                                        onClick={handleDelete}
                                        size="large"
                                        variant="outlined"
                                        color="error"
                                        sx={{ borderRadius: 2, px: 3, py: 1.5, fontWeight: 600 }}
                                    >
                                        Eliminar
                                    </Button>
                                </>
                            )}
                        </Stack>
                    </CardContent>
                </Card>

                {/* Comments Section */}
                <Card
                    elevation={0}
                    sx={{
                        border: '1px solid',
                        borderColor: 'divider',
                        borderRadius: 3,
                        overflow: 'hidden'
                    }}
                >
                    <Box
                        sx={{
                            background: 'linear-gradient(135deg, #f5f5f5 0%, #e0e0e0 100%)',
                            p: 2.5,
                            borderBottom: '1px solid',
                            borderColor: 'divider'
                        }}
                    >
                        <Typography variant="h6" sx={{ fontWeight: 700, display: 'flex', alignItems: 'center', gap: 1 }}>
                            <CommentIcon />
                            Comentarios
                        </Typography>
                    </Box>
                    <CardContent sx={{ p: { xs: 2, md: 3 } }}>
                        <CommentSection postId={postId} />
                    </CardContent>
                </Card>
            </Container>
        </Box>
    );
};

export default PostDetailPage;

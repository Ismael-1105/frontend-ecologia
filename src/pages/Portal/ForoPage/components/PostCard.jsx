import React, { useState, useEffect } from 'react';
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
    PushPin as PushPinIcon,
    Delete as DeleteIcon,
    Edit as EditIcon
} from '@mui/icons-material';
import { Menu, MenuItem, ListItemIcon, ListItemText } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { deletePost, togglePinPost } from '../../../../core/api/postService';
import { useSnackbar } from '../../../../core/context/SnackbarContext.jsx';
import { Link } from 'react-router-dom';
import { toggleLikePost, toggleDislikePost } from '../../../../core/api/postService';
import PostAttachments from './PostAttachments';
import { useAuth } from '../../../../core/context/AuthContext';
import SweetAlert from '../../../../components/common/SweetAlert';

const PostCard = ({ post, onPostDeleted }) => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const { showSuccess, showError } = useSnackbar();

    // State for engagement metrics
    const [likeCount, setLikeCount] = useState(post.likes?.length || 0);
    const [dislikeCount, setDislikeCount] = useState(post.dislikes?.length || 0);
    const [viewCount] = useState(post.views || 0);
    const [userLiked, setUserLiked] = useState(false);
    const [userDisliked, setUserDisliked] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const [isPinned, setIsPinned] = useState(post.isPinned || false);

    const open = Boolean(anchorEl);
    const isAdmin = user?.role === 'Administrador' || user?.role === 'SuperAdmin';
    const isAuthor = user && (post.author?._id === user._id || post.author?._id === user.id || post.author === user.id);
    const canManage = isAdmin || isAuthor;

    // Initialize like/dislike state based on current user
    useEffect(() => {
        if (user && post) {
            const userId = user._id || user.id;
            setUserLiked(post.likes?.some(id => id === userId || id._id === userId) || false);
            setUserDisliked(post.dislikes?.some(id => id === userId || id._id === userId) || false);
        }
    }, [user, post]);

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
                // Update both counts from backend response
                setLikeCount(response.data.likeCount);
                setDislikeCount(response.data.dislikeCount || post.dislikes?.length || 0);
                setUserLiked(response.data.liked);
                // Backend handles mutual exclusivity, so update dislike state
                if (response.data.liked) {
                    setUserDisliked(false);
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
                // Update both counts from backend response
                setLikeCount(response.data.likeCount || post.likes?.length || 0);
                setDislikeCount(response.data.dislikeCount);
                setUserDisliked(response.data.disliked);
                // Backend handles mutual exclusivity, so update like state
                if (response.data.disliked) {
                    setUserLiked(false);
                }
            }
        } catch (error) {
            console.error('Error toggling dislike:', error);
        }
    };

    const handleMenuOpen = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setAnchorEl(e.currentTarget);
    };

    const handleMenuClose = (e) => {
        if (e) {
            e.preventDefault();
            e.stopPropagation();
        }
        setAnchorEl(null);
    };

    const handleEdit = (e) => {
        e.preventDefault();
        e.stopPropagation();
        navigate(`/portal/foro/edit/${post._id}`);
        handleMenuClose();
    };

    const handleDelete = async (e) => {
        e.preventDefault();
        e.stopPropagation();

        const confirmed = await SweetAlert.showDeleteConfirmation(
            '¿Eliminar publicación?',
            '¿Estás seguro de eliminar esta publicación? Esta acción no se puede deshacer.'
        );

        if (confirmed) {
            try {
                const response = await deletePost(post._id);
                if (response.success) {
                    SweetAlert.showSuccessAlert('¡Eliminado!', 'Publicación eliminada');
                    // showSuccess('Publicación eliminada');
                    if (onPostDeleted) onPostDeleted(post._id);
                }
            } catch (error) {
                SweetAlert.showErrorAlert('Error', 'Error al eliminar la publicación');
                // showError('Error al eliminar la publicación');
            }
        }
        handleMenuClose();
    };

    const handleTogglePin = async (e) => {
        e.preventDefault();
        e.stopPropagation();

        try {
            const response = await togglePinPost(post._id, !isPinned);
            if (response.success) {
                setIsPinned(!isPinned);
                showSuccess(isPinned ? 'Publicación desfijada' : 'Publicación fijada');
            }
        } catch (error) {
            showError('Error al cambiar el estado de fijación');
        }
        handleMenuClose();
    };

    return (
        <Card
            elevation={0}
            sx={{
                border: '1px solid',
                borderColor: 'divider',
                borderRadius: 3,
                mb: 2,
                overflow: 'hidden',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                '&:hover': {
                    boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
                    transform: 'translateY(-4px)',
                    borderColor: 'primary.light'
                }
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
                            {canManage && (
                                <IconButton size="small" onClick={handleMenuOpen}>
                                    <MoreVertIcon fontSize="small" />
                                </IconButton>
                            )}

                            <Menu
                                anchorEl={anchorEl}
                                open={open}
                                onClose={handleMenuClose}
                                onClick={(e) => e.stopPropagation()}
                                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                            >
                                {isAdmin && (
                                    <MenuItem onClick={handleTogglePin}>
                                        <ListItemIcon>
                                            <PushPinIcon fontSize="small" color={isPinned ? "warning" : "inherit"} />
                                        </ListItemIcon>
                                        <ListItemText>{isPinned ? 'Desfijar' : 'Fijar'}</ListItemText>
                                    </MenuItem>
                                )}
                                <MenuItem onClick={handleEdit}>
                                    <ListItemIcon>
                                        <EditIcon fontSize="small" />
                                    </ListItemIcon>
                                    <ListItemText>Editar</ListItemText>
                                </MenuItem>
                                <MenuItem onClick={handleDelete} sx={{ color: 'error.main' }}>
                                    <ListItemIcon>
                                        <DeleteIcon fontSize="small" color="error" />
                                    </ListItemIcon>
                                    <ListItemText>Eliminar</ListItemText>
                                </MenuItem>
                            </Menu>
                        </Box>

                        <Stack direction="row" spacing={1} sx={{ mb: 1.5, flexWrap: 'wrap', gap: 0.5 }}>
                            {isPinned && (
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

                        {/* File Attachments */}
                        <PostAttachments attachments={post.attachments} />
                    </Box>
                </Box>
            </CardContent>
        </Card>
    );
};

export default PostCard;

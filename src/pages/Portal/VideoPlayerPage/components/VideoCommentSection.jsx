import React, { useState, useEffect } from 'react';
import {
    Box,
    Typography,
    TextField,
    Button,
    Avatar,
    Stack,
    IconButton,
    Divider,
    CircularProgress,
    Alert,
    Collapse
} from '@mui/material';
import {
    ArrowUpward as ArrowUpwardIcon,
    ArrowDownward as ArrowDownwardIcon,
    ChatBubbleOutline as ChatBubbleOutlineIcon,
    Delete as DeleteIcon,
    Remove as RemoveIcon,
    Add as AddIcon
} from '@mui/icons-material';
import {
    getVideoComments,
    createVideoComment,
    deleteVideoComment,
    likeVideoComment
} from '../../../../core/api/videoService';

const VideoComment = ({ comment, videoId, onReply, onDelete, onLike, level = 0 }) => {
    const [showReplyForm, setShowReplyForm] = useState(false);
    const [replyText, setReplyText] = useState('');
    const [submitting, setSubmitting] = useState(false);
    const [collapsed, setCollapsed] = useState(false);

    const authorName = comment.authorId?.name || 'Anónimo';
    const authorAvatar = comment.authorId?.profilePicture;
    const likeCount = comment.likes?.length || 0;
    const currentUserId = localStorage.getItem('userId');
    const isLiked = comment.likes?.includes(currentUserId);
    const isAuthor = comment.authorId?._id === currentUserId;
    const hasReplies = comment.replies && comment.replies.length > 0;

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
        const now = new Date();
        const commentDate = new Date(date);
        const diffInSeconds = Math.floor((now - commentDate) / 1000);

        if (diffInSeconds < 60) return 'ahora';
        if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m`;
        if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h`;
        if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)}d`;

        return commentDate.toLocaleDateString('es-ES', {
            month: 'short',
            day: 'numeric'
        });
    };

    const handleSubmitReply = async () => {
        if (!replyText.trim()) return;

        try {
            setSubmitting(true);
            await onReply(comment._id, replyText);
            setReplyText('');
            setShowReplyForm(false);
        } catch (err) {
            console.error('Error submitting reply:', err);
        } finally {
            setSubmitting(false);
        }
    };

    const toggleCollapse = () => {
        setCollapsed(!collapsed);
    };

    return (
        <Box>
            <Box sx={{ display: 'flex', gap: 1.5 }}>
                {/* Collapse Line */}
                {level > 0 && (
                    <Box
                        onClick={toggleCollapse}
                        sx={{
                            width: 2,
                            bgcolor: collapsed ? 'transparent' : 'divider',
                            cursor: 'pointer',
                            '&:hover': {
                                bgcolor: 'primary.main'
                            },
                            transition: 'background-color 0.2s',
                            flexShrink: 0
                        }}
                    />
                )}

                {/* Vote Section */}
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minWidth: 40 }}>
                    <IconButton
                        size="small"
                        onClick={() => onLike(comment._id)}
                        sx={{
                            p: 0.5,
                            color: isLiked ? 'primary.main' : 'text.secondary',
                            '&:hover': {
                                bgcolor: isLiked ? 'primary.lighter' : 'action.hover'
                            }
                        }}
                    >
                        <ArrowUpwardIcon fontSize="small" />
                    </IconButton>
                    <Typography
                        variant="caption"
                        sx={{
                            fontWeight: 700,
                            color: isLiked ? 'primary.main' : 'text.secondary',
                            fontSize: '0.75rem'
                        }}
                    >
                        {likeCount > 0 ? likeCount : '•'}
                    </Typography>
                    <IconButton
                        size="small"
                        disabled
                        sx={{
                            p: 0.5,
                            color: 'text.disabled'
                        }}
                    >
                        <ArrowDownwardIcon fontSize="small" />
                    </IconButton>
                </Box>

                {/* Comment Content */}
                <Box sx={{ flex: 1, minWidth: 0 }}>
                    {/* Author Info */}
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                        <Avatar
                            src={authorAvatar}
                            sx={{ width: 20, height: 20, fontSize: '0.625rem' }}
                        >
                            {getInitials(authorName)}
                        </Avatar>
                        <Typography
                            variant="caption"
                            sx={{
                                fontWeight: 700,
                                color: 'text.primary',
                                fontSize: '0.75rem'
                            }}
                        >
                            {authorName}
                        </Typography>
                        <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.7rem' }}>
                            •
                        </Typography>
                        <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.7rem' }}>
                            {formatDate(comment.createdAt)}
                        </Typography>
                        {hasReplies && (
                            <>
                                <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.7rem' }}>
                                    •
                                </Typography>
                                <IconButton
                                    size="small"
                                    onClick={toggleCollapse}
                                    sx={{ p: 0, ml: -0.5 }}
                                >
                                    {collapsed ? <AddIcon sx={{ fontSize: 14 }} /> : <RemoveIcon sx={{ fontSize: 14 }} />}
                                </IconButton>
                            </>
                        )}
                    </Box>

                    <Collapse in={!collapsed}>
                        {/* Comment Text */}
                        <Typography
                            variant="body2"
                            sx={{
                                mb: 1,
                                whiteSpace: 'pre-wrap',
                                wordBreak: 'break-word',
                                fontSize: '0.875rem',
                                lineHeight: 1.5
                            }}
                        >
                            {comment.content}
                        </Typography>

                        {/* Actions */}
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: showReplyForm ? 2 : 0 }}>
                            <Button
                                size="small"
                                startIcon={<ChatBubbleOutlineIcon sx={{ fontSize: 14 }} />}
                                onClick={() => setShowReplyForm(!showReplyForm)}
                                sx={{
                                    textTransform: 'none',
                                    fontSize: '0.75rem',
                                    fontWeight: 700,
                                    color: showReplyForm ? 'primary.main' : 'text.secondary',
                                    minWidth: 'auto',
                                    p: 0.5,
                                    '&:hover': {
                                        bgcolor: 'transparent',
                                        color: 'primary.main'
                                    }
                                }}
                            >
                                Responder
                            </Button>

                            {isAuthor && (
                                <Button
                                    size="small"
                                    startIcon={<DeleteIcon sx={{ fontSize: 14 }} />}
                                    onClick={() => onDelete(comment._id)}
                                    sx={{
                                        textTransform: 'none',
                                        fontSize: '0.75rem',
                                        fontWeight: 700,
                                        color: 'text.secondary',
                                        minWidth: 'auto',
                                        p: 0.5,
                                        '&:hover': {
                                            bgcolor: 'transparent',
                                            color: 'error.main'
                                        }
                                    }}
                                >
                                    Eliminar
                                </Button>
                            )}
                        </Box>

                        {/* Reply Form */}
                        <Collapse in={showReplyForm}>
                            <Box sx={{ mb: 2 }}>
                                <TextField
                                    fullWidth
                                    multiline
                                    rows={2}
                                    placeholder="Escribe una respuesta..."
                                    value={replyText}
                                    onChange={(e) => setReplyText(e.target.value)}
                                    variant="outlined"
                                    size="small"
                                    sx={{
                                        mb: 1,
                                        '& .MuiOutlinedInput-root': {
                                            bgcolor: 'background.paper',
                                            fontSize: '0.875rem'
                                        }
                                    }}
                                />
                                <Box sx={{ display: 'flex', gap: 1 }}>
                                    <Button
                                        variant="contained"
                                        size="small"
                                        onClick={handleSubmitReply}
                                        disabled={!replyText.trim() || submitting}
                                        sx={{
                                            textTransform: 'none',
                                            fontWeight: 700,
                                            borderRadius: '20px',
                                            px: 2,
                                            fontSize: '0.75rem'
                                        }}
                                    >
                                        {submitting ? 'Enviando...' : 'Responder'}
                                    </Button>
                                    <Button
                                        size="small"
                                        onClick={() => {
                                            setShowReplyForm(false);
                                            setReplyText('');
                                        }}
                                        sx={{
                                            textTransform: 'none',
                                            fontWeight: 700,
                                            fontSize: '0.75rem'
                                        }}
                                    >
                                        Cancelar
                                    </Button>
                                </Box>
                            </Box>
                        </Collapse>

                        {/* Nested Replies */}
                        {hasReplies && (
                            <Box sx={{ mt: 2 }}>
                                <Stack spacing={2}>
                                    {comment.replies.map((reply) => (
                                        <VideoComment
                                            key={reply._id}
                                            comment={reply}
                                            videoId={videoId}
                                            onReply={onReply}
                                            onDelete={onDelete}
                                            onLike={onLike}
                                            level={level + 1}
                                        />
                                    ))}
                                </Stack>
                            </Box>
                        )}
                    </Collapse>
                </Box>
            </Box>
        </Box>
    );
};

const VideoCommentSection = ({ videoId }) => {
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [newComment, setNewComment] = useState('');
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        fetchComments();
    }, [videoId]);

    const fetchComments = async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await getVideoComments(videoId);
            if (response.success) {
                setComments(response.data);
            }
        } catch (err) {
            console.error('Error fetching comments:', err);
            setError('Error al cargar los comentarios');
        } finally {
            setLoading(false);
        }
    };

    const handleSubmitComment = async () => {
        if (!newComment.trim()) return;

        try {
            setSubmitting(true);
            const response = await createVideoComment(videoId, {
                content: newComment
            });

            if (response.success) {
                setComments(prev => [response.data, ...prev]);
                setNewComment('');
            }
        } catch (err) {
            console.error('Error creating comment:', err);
            setError('Error al publicar el comentario');
        } finally {
            setSubmitting(false);
        }
    };

    const handleReply = async (parentCommentId, content) => {
        try {
            const response = await createVideoComment(videoId, {
                content,
                parentComment: parentCommentId
            });

            if (response.success) {
                // Refresh comments to get updated nested structure
                fetchComments();
            }
        } catch (err) {
            console.error('Error creating reply:', err);
            setError('Error al publicar la respuesta');
        }
    };

    const handleLikeComment = async (commentId) => {
        try {
            const response = await likeVideoComment(commentId);
            if (response.success) {
                // Refresh to update likes
                fetchComments();
            }
        } catch (err) {
            console.error('Error liking comment:', err);
        }
    };

    const handleDeleteComment = async (commentId) => {
        if (!window.confirm('¿Estás seguro de eliminar este comentario?')) return;

        try {
            await deleteVideoComment(commentId);
            fetchComments();
        } catch (err) {
            console.error('Error deleting comment:', err);
            setError('Error al eliminar el comentario');
        }
    };

    const countAllComments = (comments) => {
        let count = comments.length;
        comments.forEach(comment => {
            if (comment.replies && comment.replies.length > 0) {
                count += countAllComments(comment.replies);
            }
        });
        return count;
    };

    const totalComments = countAllComments(comments);

    return (
        <Box>
            {/* Header */}
            <Box sx={{ mb: 3, pb: 2, borderBottom: '1px solid', borderColor: 'divider' }}>
                <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>
                    {totalComments} {totalComments === 1 ? 'comentario' : 'comentarios'}
                </Typography>
            </Box>

            {/* New Comment Form */}
            <Box sx={{ mb: 3 }}>
                <TextField
                    fullWidth
                    multiline
                    rows={3}
                    placeholder="Agrega un comentario..."
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    variant="outlined"
                    sx={{
                        mb: 1,
                        '& .MuiOutlinedInput-root': {
                            bgcolor: 'background.paper',
                            fontSize: '0.875rem'
                        }
                    }}
                />
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
                    <Button
                        variant="contained"
                        size="small"
                        onClick={handleSubmitComment}
                        disabled={!newComment.trim() || submitting}
                        sx={{
                            textTransform: 'none',
                            fontWeight: 700,
                            borderRadius: '20px',
                            px: 3
                        }}
                    >
                        {submitting ? 'Publicando...' : 'Comentar'}
                    </Button>
                </Box>
            </Box>

            {error && (
                <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError(null)}>
                    {error}
                </Alert>
            )}

            {/* Comments List */}
            {loading ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
                    <CircularProgress size={24} />
                </Box>
            ) : comments.length === 0 ? (
                <Box sx={{ textAlign: 'center', py: 6 }}>
                    <ChatBubbleOutlineIcon sx={{ fontSize: 48, color: 'text.disabled', mb: 1 }} />
                    <Typography variant="body2" color="text.secondary">
                        No hay comentarios aún
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                        Sé el primero en comentar
                    </Typography>
                </Box>
            ) : (
                <Stack spacing={2} divider={<Divider />}>
                    {comments.map((comment) => (
                        <VideoComment
                            key={comment._id}
                            comment={comment}
                            videoId={videoId}
                            onReply={handleReply}
                            onDelete={handleDeleteComment}
                            onLike={handleLikeComment}
                            level={0}
                        />
                    ))}
                </Stack>
            )}
        </Box>
    );
};

export default VideoCommentSection;

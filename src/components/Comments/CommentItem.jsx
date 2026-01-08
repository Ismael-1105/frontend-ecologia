import React, { useState } from 'react';
import {
    Box,
    Avatar,
    Typography,
    IconButton,
    Button,
    Menu,
    MenuItem,
    Chip,
    Collapse,
    Divider,
} from '@mui/material';
import {
    ThumbUp,
    ThumbUpOutlined,
    Reply as ReplyIcon,
    MoreVert,
    Edit,
    Delete,
    Verified,
} from '@mui/icons-material';
import { formatDistanceToNow } from 'date-fns';
import { es } from 'date-fns/locale';
import { useAuth } from '../../core/context/AuthContext';
import { BadgeList } from '../Badges';
import CommentForm from './CommentForm';

/**
 * CommentItem Component
 * Displays a single comment with actions (like, reply, edit, delete)
 * Supports nested replies recursively
 */
const CommentItem = ({
    comment,
    onReply,
    onEdit,
    onDelete,
    onLike,
    depth = 0,
    maxDepth = 3,
}) => {
    const { user } = useAuth();
    const [showReplyForm, setShowReplyForm] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const [showReplies, setShowReplies] = useState(true);

    const isAuthor = user?._id === comment.authorId?._id;
    const hasLiked = comment.likes?.includes(user?._id);
    const canReply = depth < maxDepth;

    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleEdit = () => {
        setIsEditing(true);
        handleMenuClose();
    };

    const handleDelete = () => {
        if (window.confirm('¿Estás seguro de eliminar este comentario?')) {
            onDelete(comment._id);
        }
        handleMenuClose();
    };

    const handleEditSubmit = async (content) => {
        try {
            await onEdit(comment._id, content);
            setIsEditing(false);
        } catch (error) {
            console.error('Error editing comment:', error);
        }
    };

    const handleReplySubmit = async (content) => {
        try {
            await onReply(content, comment._id);
            setShowReplyForm(false);
        } catch (error) {
            console.error('Error replying:', error);
        }
    };

    const formatDate = (date) => {
        try {
            return formatDistanceToNow(new Date(date), {
                addSuffix: true,
                locale: es,
            });
        } catch {
            return 'Hace un momento';
        }
    };

    return (
        <Box
            sx={{
                display: 'flex',
                gap: 2,
                mb: 2,
                ml: depth > 0 ? 4 : 0,
            }}
        >
            {/* Avatar */}
            <Avatar
                src={comment.authorId?.profilePicture}
                alt={comment.authorId?.name}
                sx={{ width: 40, height: 40 }}
            >
                {comment.authorId?.name?.[0]?.toUpperCase()}
            </Avatar>

            {/* Content */}
            <Box sx={{ flex: 1 }}>
                {/* Header */}
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        mb: 0.5,
                    }}
                >
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap' }}>
                        <Typography variant="subtitle2" fontWeight="bold">
                            {comment.authorId?.name || 'Usuario'}
                        </Typography>

                        {/* Verified Badge */}
                        {comment.authorId?.verified && (
                            <Verified fontSize="small" color="primary" />
                        )}

                        {/* User Badges */}
                        {comment.authorId?.badges && comment.authorId.badges.length > 0 && (
                            <BadgeList badges={comment.authorId.badges} size="small" maxDisplay={3} />
                        )}

                        <Typography variant="caption" color="text.secondary">
                            {formatDate(comment.createdAt)}
                        </Typography>
                    </Box>

                    {/* Menu */}
                    {isAuthor && (
                        <>
                            <IconButton size="small" onClick={handleMenuOpen}>
                                <MoreVert fontSize="small" />
                            </IconButton>
                            <Menu
                                anchorEl={anchorEl}
                                open={Boolean(anchorEl)}
                                onClose={handleMenuClose}
                            >
                                <MenuItem onClick={handleEdit}>
                                    <Edit fontSize="small" sx={{ mr: 1 }} />
                                    Editar
                                </MenuItem>
                                <MenuItem onClick={handleDelete} sx={{ color: 'error.main' }}>
                                    <Delete fontSize="small" sx={{ mr: 1 }} />
                                    Eliminar
                                </MenuItem>
                            </Menu>
                        </>
                    )}
                </Box>

                {/* Content or Edit Form */}
                {isEditing ? (
                    <CommentForm
                        onSubmit={handleEditSubmit}
                        onCancel={() => setIsEditing(false)}
                        placeholder="Editar comentario..."
                        autoFocus
                    />
                ) : (
                    <Typography
                        variant="body2"
                        sx={{
                            whiteSpace: 'pre-wrap',
                            wordBreak: 'break-word',
                            mb: 1,
                        }}
                    >
                        {comment.content}
                    </Typography>
                )}

                {/* Actions */}
                {!isEditing && (
                    <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                        {/* Like Button */}
                        <Button
                            size="small"
                            startIcon={hasLiked ? <ThumbUp /> : <ThumbUpOutlined />}
                            onClick={() => onLike(comment._id)}
                            sx={{
                                minWidth: 'auto',
                                color: hasLiked ? 'primary.main' : 'text.secondary',
                            }}
                        >
                            {comment.likeCount || 0}
                        </Button>

                        {/* Reply Button */}
                        {canReply && (
                            <Button
                                size="small"
                                startIcon={<ReplyIcon />}
                                onClick={() => setShowReplyForm(!showReplyForm)}
                                sx={{ minWidth: 'auto' }}
                            >
                                Responder
                            </Button>
                        )}

                        {/* Reply Count */}
                        {comment.replyCount > 0 && (
                            <Button
                                size="small"
                                onClick={() => setShowReplies(!showReplies)}
                                sx={{ minWidth: 'auto', color: 'text.secondary' }}
                            >
                                {showReplies ? 'Ocultar' : 'Ver'} {comment.replyCount}{' '}
                                {comment.replyCount === 1 ? 'respuesta' : 'respuestas'}
                            </Button>
                        )}
                    </Box>
                )}

                {/* Reply Form */}
                <Collapse in={showReplyForm}>
                    <Box sx={{ mt: 2 }}>
                        <CommentForm
                            onSubmit={handleReplySubmit}
                            parentComment={comment._id}
                            placeholder="Escribe una respuesta..."
                            onCancel={() => setShowReplyForm(false)}
                            autoFocus
                        />
                    </Box>
                </Collapse>

                {/* Nested Replies */}
                {comment.replies && comment.replies.length > 0 && (
                    <Collapse in={showReplies}>
                        <Box sx={{ mt: 2 }}>
                            <Divider sx={{ mb: 2 }} />
                            {comment.replies.map((reply) => (
                                <CommentItem
                                    key={reply._id}
                                    comment={reply}
                                    onReply={onReply}
                                    onEdit={onEdit}
                                    onDelete={onDelete}
                                    onLike={onLike}
                                    depth={depth + 1}
                                    maxDepth={maxDepth}
                                />
                            ))}
                        </Box>
                    </Collapse>
                )}
            </Box>
        </Box>
    );
};

export default CommentItem;

import React, { useState, useEffect } from 'react';
import {
    Box,
    Card,
    CardContent,
    Typography,
    TextField,
    Button,
    Avatar,
    IconButton,
    Menu,
    MenuItem,
} from '@mui/material';
import { MoreVert, Edit, Delete } from '@mui/icons-material';
import { formatDistanceToNow } from 'date-fns';
import { commentService } from '../../core/services';
import { useAuth } from '../../core/context/AuthContext';
import { useSnackbar } from '../../core/context/SnackbarContext';
import LoadingSpinner from './LoadingSpinner';
import PaginationComponent from './PaginationComponent';
import ConfirmDialog from './ConfirmDialog';

/**
 * Comment List Component
 * Displays and manages comments with pagination
 */
const CommentList = ({ videoId }) => {
    const { user, isAuthenticated } = useAuth();
    const { showSuccess, showError } = useSnackbar();

    const [comments, setComments] = useState([]);
    const [pagination, setPagination] = useState(null);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);

    const [newComment, setNewComment] = useState('');
    const [editingId, setEditingId] = useState(null);
    const [editText, setEditText] = useState('');

    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedComment, setSelectedComment] = useState(null);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

    // Load comments
    useEffect(() => {
        loadComments();
        // eslint-disable-next-line
    }, [videoId, page]);

    const loadComments = async () => {
        try {
            setLoading(true);
            const response = await commentService.getComments(videoId, { page, limit: 10 });
            setComments(response.data);
            setPagination(response.pagination);
        } catch (error) {
            showError('Failed to load comments');
        } finally {
            setLoading(false);
        }
    };

    const handleAddComment = async () => {
        if (!newComment.trim()) return;

        try {
            await commentService.createComment(videoId, newComment);
            setNewComment('');
            showSuccess('Comment added successfully');
            loadComments();
        } catch (error) {
            showError('Failed to add comment');
        }
    };

    const handleEditComment = async (commentId) => {
        if (!editText.trim()) return;

        try {
            await commentService.updateComment(videoId, commentId, editText);
            setEditingId(null);
            setEditText('');
            showSuccess('Comment updated successfully');
            loadComments();
        } catch (error) {
            showError('Failed to update comment');
        }
    };

    const handleDeleteComment = async () => {
        try {
            await commentService.deleteComment(videoId, selectedComment._id);
            setDeleteDialogOpen(false);
            setSelectedComment(null);
            showSuccess('Comment deleted successfully');
            loadComments();
        } catch (error) {
            showError('Failed to delete comment');
        }
    };

    const handleMenuOpen = (event, comment) => {
        setAnchorEl(event.currentTarget);
        setSelectedComment(comment);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const startEdit = () => {
        setEditingId(selectedComment._id);
        setEditText(selectedComment.comentario);
        handleMenuClose();
    };

    const startDelete = () => {
        setDeleteDialogOpen(true);
        handleMenuClose();
    };

    const canModifyComment = (comment) => {
        if (!user) return false;
        return (
            comment.autor_id._id === user.id ||
            user.role === 'Administrador' ||
            user.role === 'SuperAdmin'
        );
    };

    if (loading && comments.length === 0) {
        return <LoadingSpinner message="Loading comments..." />;
    }

    return (
        <Box>
            {/* Add Comment Form */}
            {isAuthenticated && (
                <Card sx={{ mb: 3 }}>
                    <CardContent>
                        <TextField
                            fullWidth
                            multiline
                            rows={3}
                            placeholder="Add a comment..."
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                            variant="outlined"
                        />
                        <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
                            <Button
                                variant="contained"
                                onClick={handleAddComment}
                                disabled={!newComment.trim()}
                            >
                                Post Comment
                            </Button>
                        </Box>
                    </CardContent>
                </Card>
            )}

            {/* Comments List */}
            <Typography variant="h6" gutterBottom>
                Comments ({pagination?.totalCount || 0})
            </Typography>

            {comments.length === 0 ? (
                <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center', py: 4 }}>
                    No comments yet. Be the first to comment!
                </Typography>
            ) : (
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    {comments.map((comment) => (
                        <Card key={comment._id}>
                            <CardContent>
                                <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                                    <Avatar>{comment.autor_id.name[0].toUpperCase()}</Avatar>

                                    <Box sx={{ flex: 1 }}>
                                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                            <Box>
                                                <Typography variant="subtitle2">{comment.autor_id.name}</Typography>
                                                <Typography variant="caption" color="text.secondary">
                                                    {formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true })}
                                                </Typography>
                                            </Box>

                                            {canModifyComment(comment) && (
                                                <IconButton size="small" onClick={(e) => handleMenuOpen(e, comment)}>
                                                    <MoreVert />
                                                </IconButton>
                                            )}
                                        </Box>

                                        {editingId === comment._id ? (
                                            <Box sx={{ mt: 2 }}>
                                                <TextField
                                                    fullWidth
                                                    multiline
                                                    rows={2}
                                                    value={editText}
                                                    onChange={(e) => setEditText(e.target.value)}
                                                    variant="outlined"
                                                    size="small"
                                                />
                                                <Box sx={{ mt: 1, display: 'flex', gap: 1 }}>
                                                    <Button size="small" onClick={() => handleEditComment(comment._id)}>
                                                        Save
                                                    </Button>
                                                    <Button size="small" onClick={() => setEditingId(null)}>
                                                        Cancel
                                                    </Button>
                                                </Box>
                                            </Box>
                                        ) : (
                                            <Typography variant="body2" sx={{ mt: 1 }}>
                                                {comment.comentario}
                                            </Typography>
                                        )}
                                    </Box>
                                </Box>
                            </CardContent>
                        </Card>
                    ))}
                </Box>
            )}

            {/* Pagination */}
            <PaginationComponent pagination={pagination} onPageChange={setPage} />

            {/* Context Menu */}
            <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
                <MenuItem onClick={startEdit}>
                    <Edit fontSize="small" sx={{ mr: 1 }} />
                    Edit
                </MenuItem>
                <MenuItem onClick={startDelete}>
                    <Delete fontSize="small" sx={{ mr: 1 }} />
                    Delete
                </MenuItem>
            </Menu>

            {/* Delete Confirmation */}
            <ConfirmDialog
                open={deleteDialogOpen}
                title="Delete Comment"
                message="Are you sure you want to delete this comment? This action cannot be undone."
                confirmText="Delete"
                severity="error"
                onConfirm={handleDeleteComment}
                onCancel={() => setDeleteDialogOpen(false)}
            />
        </Box>
    );
};

export default CommentList;

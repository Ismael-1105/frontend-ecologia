import React from 'react';
import { Box, Paper, Typography } from '@mui/material';
import useComments from '../../core/hooks/useComments';
import CommentForm from './CommentForm';
import CommentList from './CommentList';

/**
 * CommentSection Component
 * Main container for the comment system
 * Manages state and coordinates between CommentForm and CommentList
 */
const CommentSection = ({ videoId }) => {
    const {
        comments,
        loading,
        error,
        totalCount,
        hasMore,
        addComment,
        updateComment,
        removeComment,
        toggleLike,
        loadMore,
    } = useComments(videoId);

    const handleAddComment = async (content, parentComment) => {
        try {
            await addComment(content, parentComment);
        } catch (err) {
            console.error('Error adding comment:', err);
            throw err;
        }
    };

    const handleEditComment = async (commentId, content) => {
        try {
            await updateComment(commentId, content);
        } catch (err) {
            console.error('Error editing comment:', err);
            throw err;
        }
    };

    const handleDeleteComment = async (commentId) => {
        try {
            await removeComment(commentId);
        } catch (err) {
            console.error('Error deleting comment:', err);
            throw err;
        }
    };

    const handleLikeComment = async (commentId) => {
        try {
            await toggleLike(commentId);
        } catch (err) {
            console.error('Error liking comment:', err);
            throw err;
        }
    };

    return (
        <Paper elevation={0} sx={{ p: 3, mt: 3 }}>
            <Typography variant="h5" gutterBottom sx={{ mb: 3 }}>
                Comentarios
            </Typography>

            {/* Comment Form */}
            <Box sx={{ mb: 4 }}>
                <CommentForm onSubmit={handleAddComment} />
            </Box>

            {/* Comment List */}
            <CommentList
                comments={comments}
                loading={loading}
                error={error}
                totalCount={totalCount}
                hasMore={hasMore}
                onLoadMore={loadMore}
                onReply={handleAddComment}
                onEdit={handleEditComment}
                onDelete={handleDeleteComment}
                onLike={handleLikeComment}
                maxDepth={3}
            />
        </Paper>
    );
};

export default CommentSection;

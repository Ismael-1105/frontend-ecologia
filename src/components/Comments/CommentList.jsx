import React from 'react';
import {
    Box,
    Typography,
    CircularProgress,
    Button,
    Alert,
    Divider,
} from '@mui/material';
import CommentIcon from '@mui/icons-material/Comment';
import CommentItem from './CommentItem';

/**
 * CommentList Component
 * Displays a list of comments with loading and empty states
 */
const CommentList = ({
    comments = [],
    loading = false,
    error = null,
    totalCount = 0,
    hasMore = false,
    onLoadMore,
    onReply,
    onEdit,
    onDelete,
    onLike,
    maxDepth = 3,
}) => {
    if (loading && comments.length === 0) {
        return (
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    py: 8,
                }}
            >
                <CircularProgress />
            </Box>
        );
    }

    if (error) {
        return (
            <Alert severity="error" sx={{ my: 2 }}>
                {error}
            </Alert>
        );
    }

    if (comments.length === 0) {
        return (
            <Box
                sx={{
                    textAlign: 'center',
                    py: 8,
                    color: 'text.secondary',
                }}
            >
                <CommentIcon sx={{ fontSize: 48, mb: 2, opacity: 0.5 }} />
                <Typography variant="h6" gutterBottom>
                    No hay comentarios aún
                </Typography>
                <Typography variant="body2">
                    Sé el primero en comentar
                </Typography>
            </Box>
        );
    }

    return (
        <Box>
            {/* Header */}
            <Box sx={{ mb: 3 }}>
                <Typography variant="h6" gutterBottom>
                    {totalCount} {totalCount === 1 ? 'Comentario' : 'Comentarios'}
                </Typography>
                <Divider />
            </Box>

            {/* Comments */}
            <Box>
                {comments.map((comment) => (
                    <CommentItem
                        key={comment._id}
                        comment={comment}
                        onReply={onReply}
                        onEdit={onEdit}
                        onDelete={onDelete}
                        onLike={onLike}
                        depth={0}
                        maxDepth={maxDepth}
                    />
                ))}
            </Box>

            {/* Load More */}
            {hasMore && (
                <Box sx={{ textAlign: 'center', mt: 3 }}>
                    <Button
                        variant="outlined"
                        onClick={onLoadMore}
                        disabled={loading}
                    >
                        {loading ? 'Cargando...' : 'Cargar más comentarios'}
                    </Button>
                </Box>
            )}
        </Box>
    );
};

export default CommentList;

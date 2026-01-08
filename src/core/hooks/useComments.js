import { useState, useEffect, useCallback } from 'react';
import commentService from '../services/commentService';

/**
 * Custom hook for managing comments on a video
 * @param {string} videoId - Video ID
 * @returns {Object} Comments state and actions
 */
const useComments = (videoId) => {
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [totalCount, setTotalCount] = useState(0);

    /**
     * Fetch comments for the video
     */
    const fetchComments = useCallback(async (pageNum = 1, append = false) => {
        if (!videoId) return;

        setLoading(true);
        setError(null);

        try {
            const response = await commentService.getVideoComments(videoId, pageNum, 20);

            if (response.success) {
                const newComments = response.data || [];

                if (append) {
                    setComments(prev => [...prev, ...newComments]);
                } else {
                    setComments(newComments);
                }

                setTotalCount(response.pagination?.total || 0);
                setHasMore(response.pagination?.hasNextPage || false);
                setPage(pageNum);
            }
        } catch (err) {
            console.error('Error fetching comments:', err);
            setError(err.response?.data?.message || 'Error al cargar comentarios');
        } finally {
            setLoading(false);
        }
    }, [videoId]);

    /**
     * Load more comments (pagination)
     */
    const loadMore = useCallback(() => {
        if (!loading && hasMore) {
            fetchComments(page + 1, true);
        }
    }, [loading, hasMore, page, fetchComments]);

    /**
     * Add a new comment
     */
    const addComment = useCallback(async (content, parentComment = null) => {
        if (!videoId || !content.trim()) return null;

        try {
            const response = await commentService.createComment(videoId, content, parentComment);

            if (response.success) {
                const newComment = response.data;

                if (parentComment) {
                    // If it's a reply, update the parent comment's replies
                    setComments(prev =>
                        prev.map(comment =>
                            comment._id === parentComment
                                ? { ...comment, replyCount: (comment.replyCount || 0) + 1 }
                                : comment
                        )
                    );
                } else {
                    // If it's a top-level comment, add it to the list
                    setComments(prev => [newComment, ...prev]);
                    setTotalCount(prev => prev + 1);
                }

                return newComment;
            }
        } catch (err) {
            console.error('Error adding comment:', err);
            throw err;
        }
    }, [videoId]);

    /**
     * Update a comment
     */
    const updateComment = useCallback(async (commentId, content) => {
        if (!videoId || !commentId || !content.trim()) return null;

        try {
            const response = await commentService.updateComment(videoId, commentId, content);

            if (response.success) {
                const updatedComment = response.data;

                setComments(prev =>
                    prev.map(comment =>
                        comment._id === commentId ? updatedComment : comment
                    )
                );

                return updatedComment;
            }
        } catch (err) {
            console.error('Error updating comment:', err);
            throw err;
        }
    }, [videoId]);

    /**
     * Delete a comment
     */
    const removeComment = useCallback(async (commentId) => {
        if (!videoId || !commentId) return;

        try {
            await commentService.deleteComment(videoId, commentId);

            setComments(prev => prev.filter(comment => comment._id !== commentId));
            setTotalCount(prev => Math.max(0, prev - 1));
        } catch (err) {
            console.error('Error deleting comment:', err);
            throw err;
        }
    }, [videoId]);

    /**
     * Toggle like on a comment
     */
    const toggleLike = useCallback(async (commentId) => {
        if (!commentId) return;

        try {
            const response = await commentService.toggleLikeComment(commentId);

            if (response.success) {
                const updatedComment = response.data;

                setComments(prev =>
                    prev.map(comment =>
                        comment._id === commentId
                            ? { ...comment, likes: updatedComment.likes, likeCount: updatedComment.likeCount }
                            : comment
                    )
                );

                return updatedComment;
            }
        } catch (err) {
            console.error('Error toggling like:', err);
            throw err;
        }
    }, []);

    /**
     * Refresh comments
     */
    const refresh = useCallback(() => {
        fetchComments(1, false);
    }, [fetchComments]);

    // Initial fetch
    useEffect(() => {
        fetchComments(1, false);
    }, [fetchComments]);

    return {
        comments,
        loading,
        error,
        totalCount,
        hasMore,
        page,
        fetchComments,
        loadMore,
        addComment,
        updateComment,
        removeComment,
        toggleLike,
        refresh,
    };
};

export default useComments;

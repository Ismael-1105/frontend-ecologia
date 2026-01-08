import { useState, useCallback } from 'react';
import commentService from '../services/commentService';

/**
 * Custom hook for managing comment thread (nested replies)
 * @param {string} commentId - Comment ID
 * @returns {Object} Thread state and actions
 */
const useCommentThread = (commentId) => {
    const [thread, setThread] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    /**
     * Fetch comment thread with nested replies
     */
    const fetchThread = useCallback(async (maxDepth = 3) => {
        if (!commentId) return;

        setLoading(true);
        setError(null);

        try {
            const response = await commentService.getCommentThread(commentId, maxDepth);

            if (response.success) {
                setThread(response.data);
            }
        } catch (err) {
            console.error('Error fetching thread:', err);
            setError(err.response?.data?.message || 'Error al cargar respuestas');
        } finally {
            setLoading(false);
        }
    }, [commentId]);

    /**
     * Fetch replies for a comment (paginated)
     */
    const fetchReplies = useCallback(async (page = 1, limit = 10) => {
        if (!commentId) return;

        setLoading(true);
        setError(null);

        try {
            const response = await commentService.getCommentReplies(commentId, page, limit);

            if (response.success) {
                return response.data;
            }
        } catch (err) {
            console.error('Error fetching replies:', err);
            setError(err.response?.data?.message || 'Error al cargar respuestas');
            return [];
        } finally {
            setLoading(false);
        }
    }, [commentId]);

    return {
        thread,
        loading,
        error,
        fetchThread,
        fetchReplies,
    };
};

export default useCommentThread;

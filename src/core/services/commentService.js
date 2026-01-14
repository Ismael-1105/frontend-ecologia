import apiClient, { handleApiError } from '../api/client';

/**
 * Comment Service
 * Handles all comment-related API calls
 */

/**
 * Get comments for a video (top-level only)
 * @param {string} videoId - Video ID
 * @param {number} page - Page number
 * @param {number} limit - Items per page
 * @returns {Promise<Object>} Paginated comments
 */
export const getVideoComments = async (videoId, page = 1, limit = 20) => {
  try {
    const response = await apiClient.get(`/videos/${videoId}/comments`, {
      params: { page, limit },
    });
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

/**
 * Get replies to a comment
 * @param {string} commentId - Comment ID
 * @param {number} page - Page number
 * @param {number} limit - Items per page
 * @returns {Promise<Object>} Paginated replies
 */
export const getCommentReplies = async (commentId, page = 1, limit = 20) => {
  try {
    const response = await apiClient.get(`/comments/${commentId}/replies`, {
      params: { page, limit },
    });
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

/**
 * Get comment thread with nested replies
 * @param {string} commentId - Comment ID
 * @param {number} maxDepth - Maximum nesting depth
 * @returns {Promise<Object>} Comment with nested replies
 */
export const getCommentThread = async (commentId, maxDepth = 3) => {
  try {
    const response = await apiClient.get(`/comments/${commentId}/thread`, {
      params: { maxDepth },
    });
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

/**
 * Create a new comment or reply
 * @param {string} videoId - Video ID
 * @param {string} content - Comment content
 * @param {string} parentComment - Parent comment ID (optional)
 * @returns {Promise<Object>} Created comment
 */
export const createComment = async (videoId, content, parentComment = null) => {
  try {
    const response = await apiClient.post(`/videos/${videoId}/comments`, {
      content,
      parentComment,
    });
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};



/**
 * Update a comment
 * @param {string} videoId - Video ID
 * @param {string} commentId - Comment ID
 * @param {string} content - New content
 * @returns {Promise<Object>} Updated comment
 */
export const updateComment = async (videoId, commentId, content) => {
  try {
    const response = await apiClient.put(`/videos/${videoId}/comments/${commentId}`, {
      content,
    });
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

/**
 * Delete a comment
 * @param {string} videoId - Video ID
 * @param {string} commentId - Comment ID
 * @returns {Promise<Object>} Success response
 */
export const deleteComment = async (videoId, commentId) => {
  try {
    const response = await apiClient.delete(`/videos/${videoId}/comments/${commentId}`);
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

/**
 * Toggle like on a comment
 * @param {string} commentId - Comment ID
 * @returns {Promise<Object>} Updated comment
 */
export const toggleLikeComment = async (commentId) => {
  try {
    const response = await apiClient.post(`/comments/${commentId}/like`);
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

const commentService = {
  getVideoComments,
  getCommentReplies,
  getCommentThread,
  createComment,
  updateComment,
  deleteComment,
  toggleLikeComment,
};

export default commentService;

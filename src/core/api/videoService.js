import apiClient from './client';

/**
 * Get comments for a video
 * @param {string} videoId - Video ID
 * @param {Object} params - Query parameters
 * @returns {Promise} API response
 */
export const getVideoComments = async (videoId, params = {}) => {
    const { page = 1, limit = 20 } = params;
    const response = await apiClient.get(`/videos/${videoId}/comments`, {
        params: { page, limit }
    });
    return response.data;
};

/**
 * Create a comment on a video
 * @param {string} videoId - Video ID
 * @param {Object} commentData - Comment data
 * @returns {Promise} API response
 */
export const createVideoComment = async (videoId, commentData) => {
    const response = await apiClient.post(`/videos/${videoId}/comments`, commentData);
    return response.data;
};

/**
 * Update a video comment
 * @param {string} commentId - Comment ID
 * @param {Object} updateData - Updated comment data
 * @returns {Promise} API response
 */
export const updateVideoComment = async (commentId, updateData) => {
    const response = await apiClient.put(`/comments/${commentId}`, updateData);
    return response.data;
};

/**
 * Delete a video comment
 * @param {string} commentId - Comment ID
 * @returns {Promise} API response
 */
export const deleteVideoComment = async (commentId) => {
    const response = await apiClient.delete(`/comments/${commentId}`);
    return response.data;
};

/**
 * Like/unlike a video comment
 * @param {string} commentId - Comment ID
 * @returns {Promise} API response
 */
export const likeVideoComment = async (commentId) => {
    const response = await apiClient.post(`/comments/${commentId}/like`);
    return response.data;
};

export default {
    getVideoComments,
    createVideoComment,
    updateVideoComment,
    deleteVideoComment,
    likeVideoComment
};

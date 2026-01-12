import apiClient from './client';

/**
 * Post API Service
 * Handles all forum post-related API calls
 */

/**
 * Get all posts with pagination and filters
 * @param {Object} params - Query parameters
 * @param {number} params.page - Page number
 * @param {number} params.limit - Items per page
 * @param {string} params.category - Filter by category
 * @param {string} params.sort - Sort order
 * @returns {Promise} API response
 */
export const getPosts = async (params = {}) => {
    const { page = 1, limit = 20, category, sort = '-createdAt' } = params;

    const queryParams = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString(),
        sort,
    });

    if (category) {
        queryParams.append('category', category);
    }

    const response = await apiClient.get(`/posts?${queryParams.toString()}`);
    return response.data;
};

/**
 * Get single post by ID
 * @param {string} postId - Post ID
 * @returns {Promise} API response
 */
export const getPostById = async (postId) => {
    const response = await apiClient.get(`/posts/${postId}`);
    return response.data;
};

/**
 * Create a new post
 * @param {Object} postData - Post data
 * @param {string} postData.title - Post title
 * @param {string} postData.content - Post content
 * @param {string} postData.category - Post category
 * @returns {Promise} API response
 */
export const createPost = async (postData) => {
    const response = await apiClient.post('/posts', postData);
    return response.data;
};

/**
 * Update a post
 * @param {string} postId - Post ID
 * @param {Object} updateData - Data to update
 * @returns {Promise} API response
 */
export const updatePost = async (postId, updateData) => {
    const response = await apiClient.put(`/posts/${postId}`, updateData);
    return response.data;
};

/**
 * Delete a post
 * @param {string} postId - Post ID
 * @returns {Promise} API response
 */
export const deletePost = async (postId) => {
    const response = await apiClient.delete(`/posts/${postId}`);
    return response.data;
};

/**
 * Like/unlike a post
 * @param {string} postId - Post ID
 * @returns {Promise} API response
 */
export const toggleLikePost = async (postId) => {
    const response = await apiClient.post(`/posts/${postId}/like`);
    return response.data;
};

/**
 * Get posts by author
 * @param {string} authorId - Author ID
 * @param {Object} params - Query parameters
 * @returns {Promise} API response
 */
export const getPostsByAuthor = async (authorId, params = {}) => {
    const { page = 1, limit = 20, sort = '-createdAt' } = params;

    const queryParams = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString(),
        sort,
    });

    const response = await apiClient.get(`/posts/author/${authorId}?${queryParams.toString()}`);
    return response.data;
};

/**
 * Get comments for a post
 * @param {string} postId - Post ID
 * @param {Object} params - Query parameters
 * @returns {Promise} API response
 */
export const getCommentsByPost = async (postId, params = {}) => {
    const { page = 1, limit = 20, sort = 'createdAt' } = params;

    const queryParams = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString(),
        sort,
    });

    const response = await apiClient.get(`/posts/${postId}/comments?${queryParams.toString()}`);
    return response.data;
};

/**
 * Create a comment on a post
 * @param {string} postId - Post ID
 * @param {Object} commentData - Comment data
 * @param {string} commentData.content - Comment content
 * @param {string} commentData.parentComment - Parent comment ID (for replies)
 * @returns {Promise} API response
 */
export const createComment = async (postId, commentData) => {
    const response = await apiClient.post(`/posts/${postId}/comments`, commentData);
    return response.data;
};

/**
 * Update a comment
 * @param {string} commentId - Comment ID
 * @param {Object} updateData - Data to update
 * @returns {Promise} API response
 */
export const updateComment = async (commentId, updateData) => {
    const response = await apiClient.put(`/post-comments/${commentId}`, updateData);
    return response.data;
};

/**
 * Delete a comment
 * @param {string} commentId - Comment ID
 * @returns {Promise} API response
 */
export const deleteComment = async (commentId) => {
    const response = await apiClient.delete(`/post-comments/${commentId}`);
    return response.data;
};

/**
 * Like/unlike a comment
 * @param {string} commentId - Comment ID
 * @returns {Promise} API response
 */
export const toggleLikeComment = async (commentId) => {
    const response = await apiClient.post(`/post-comments/${commentId}/like`);
    return response.data;
};

export default {
    getPosts,
    getPostById,
    createPost,
    updatePost,
    deletePost,
    toggleLikePost,
    getPostsByAuthor,
    getCommentsByPost,
    createComment,
    updateComment,
    deleteComment,
    toggleLikeComment,
};

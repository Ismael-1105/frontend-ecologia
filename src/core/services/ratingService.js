import apiClient, { handleApiError } from '../api/client';

/**
 * Rating Service
 * Handles all rating-related API calls
 */

/**
 * Rate a video
 * @param {string} videoId - Video ID
 * @param {number} valoracion - Rating value (1-5)
 * @returns {Promise<Object>} Rating data and updated average
 */
export const rateVideo = async (videoId, valoracion) => {
  try {
    const response = await apiClient.post(`/videos/${videoId}/rate`, {
      valoracion,
    });
    return response.data.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

/**
 * Get video rating statistics
 * @param {string} videoId - Video ID
 * @returns {Promise<Object>} Rating statistics (average, total, distribution)
 */
export const getVideoRatingStats = async (videoId) => {
  try {
    const response = await apiClient.get(`/videos/${videoId}/rate`);
    return response.data.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

/**
 * Get current user's rating for a video
 * @param {string} videoId - Video ID
 * @returns {Promise<Object|null>} User's rating or null
 */
export const getUserRating = async (videoId) => {
  try {
    const response = await apiClient.get(`/videos/${videoId}/rate/me`);
    return response.data.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

/**
 * Delete user's rating
 * @param {string} videoId - Video ID
 * @returns {Promise<Object>} Updated average
 */
export const deleteRating = async (videoId) => {
  try {
    const response = await apiClient.delete(`/videos/${videoId}/rate`);
    return response.data.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

const ratingService = {
  rateVideo,
  getVideoRatingStats,
  getUserRating,
  deleteRating,
};

export default ratingService;

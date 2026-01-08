import apiClient, { handleApiError } from '../api/client';

/**
 * Badge Service
 * Handles all badge-related API calls
 */

/**
 * Get all badges
 * @returns {Promise<Object>} All badges
 */
export const getAllBadges = async () => {
    try {
        const response = await apiClient.get('/badges');
        return response.data;
    } catch (error) {
        throw handleApiError(error);
    }
};

/**
 * Get badge by ID
 * @param {string} badgeId - Badge ID
 * @returns {Promise<Object>} Badge details
 */
export const getBadgeById = async (badgeId) => {
    try {
        const response = await apiClient.get(`/badges/${badgeId}`);
        return response.data;
    } catch (error) {
        throw handleApiError(error);
    }
};

/**
 * Get user's badges
 * @param {string} userId - User ID
 * @returns {Promise<Object>} User's badges
 */
export const getUserBadges = async (userId) => {
    try {
        const response = await apiClient.get(`/users/${userId}/badges`);
        return response.data;
    } catch (error) {
        throw handleApiError(error);
    }
};

const badgeService = {
    getAllBadges,
    getBadgeById,
    getUserBadges,
};

export default badgeService;

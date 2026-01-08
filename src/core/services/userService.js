import apiClient, { handleApiError } from '../api/client';

/**
 * User Service
 * Handles all user-related API calls
 */

/**
 * Get current user profile
 * @returns {Promise<Object>} User profile data
 */
export const getMyProfile = async () => {
  try {
    const response = await apiClient.get('/users/me');
    return response.data.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

/**
 * Update current user profile
 * @param {Object} data - Profile data to update
 * @returns {Promise<Object>} Updated user data
 */
export const updateMyProfile = async (data) => {
  try {
    const response = await apiClient.put('/users/me', data);
    return response.data.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

/**
 * Update profile picture
 * @param {File} file - Image file
 * @returns {Promise<Object>} Updated user data
 */
export const updateProfilePicture = async (file) => {
  try {
    const formData = new FormData();
    formData.append('profilePicture', file);

    const response = await apiClient.put('/users/me/profile-picture', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

/**
 * Delete own account
 * @param {string} password - Password for confirmation
 * @returns {Promise<void>}
 */
export const deleteMyAccount = async (password) => {
  try {
    const response = await apiClient.delete('/users/me', {
      data: { password },
    });
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

/**
 * Get all users (Admin only)
 * @param {Object} params - Query parameters (page, limit, role)
 * @returns {Promise<Object>} Paginated users
 */
export const getAllUsers = async (params = {}) => {
  try {
    const response = await apiClient.get('/users', { params });
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

/**
 * Get user by ID
 * @param {string} userId - User ID
 * @returns {Promise<Object>} User data
 */
export const getUserById = async (userId) => {
  try {
    const response = await apiClient.get(`/users/${userId}`);
    return response.data.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

/**
 * Update user (Admin can update role)
 * @param {string} userId - User ID
 * @param {Object} data - Data to update
 * @returns {Promise<Object>} Updated user data
 */
export const updateUser = async (userId, data) => {
  try {
    const response = await apiClient.put(`/users/${userId}`, data);
    return response.data.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

/**
 * Delete user (Admin only)
 * @param {string} userId - User ID
 * @returns {Promise<void>}
 */
export const deleteUser = async (userId) => {
  try {
    const response = await apiClient.delete(`/users/${userId}`);
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

const userService = {
  getMyProfile,
  updateMyProfile,
  updateProfilePicture,
  deleteMyAccount,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
};

export default userService;

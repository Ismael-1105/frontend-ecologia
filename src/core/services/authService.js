import apiClient, { handleApiError } from '../api/client';

/**
 * Authentication Service
 * Handles all authentication-related API calls
 */

/**
 * Login user
 * @param {string} email - User email
 * @param {string} password - User password
 * @returns {Promise<Object>} User data and tokens
 */
export const login = async (email, password) => {
  try {
    const response = await apiClient.post('/auth/login', { email, password });
    return response.data.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

/**
 * Register new user
 * @param {Object} userData - User registration data
 * @returns {Promise<Object>} User data and tokens
 */
export const register = async (userData) => {
  try {
    const response = await apiClient.post('/auth/register', userData);
    return response.data.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

/**
 * Refresh access token
 * @param {string} refreshToken - Refresh token
 * @returns {Promise<Object>} New access token and user data
 */
export const refreshAccessToken = async (refreshToken) => {
  try {
    const response = await apiClient.post('/auth/refresh', { refreshToken });
    return response.data.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

/**
 * Logout user
 * @param {string} refreshToken - Refresh token to revoke
 * @returns {Promise<void>}
 */
export const logout = async (refreshToken) => {
  try {
    await apiClient.post('/auth/logout', { refreshToken });
  } catch (error) {
    throw handleApiError(error);
  }
};

/**
 * Logout from all devices
 * @returns {Promise<void>}
 */
export const logoutAll = async () => {
  try {
    await apiClient.post('/auth/logout-all');
  } catch (error) {
    throw handleApiError(error);
  }
};

/**
 * Change password
 * @param {string} currentPassword - Current password
 * @param {string} newPassword - New password
 * @returns {Promise<void>}
 */
export const changePassword = async (currentPassword, newPassword) => {
  try {
    const response = await apiClient.put('/auth/change-password', {
      currentPassword,
      newPassword,
    });
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

/**
 * Get current user data
 * @returns {Promise<Object>} Current user data
 */
export const getCurrentUser = async () => {
  try {
    const response = await apiClient.get('/users/me');
    return response.data.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

const authService = {
  login,
  register,
  refreshAccessToken,
  logout,
  logoutAll,
  changePassword,
  getCurrentUser,
};

export default authService;

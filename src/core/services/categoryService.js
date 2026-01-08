import apiClient, { handleApiError } from '../api/client';

/**
 * Category Service
 * Handles all category-related API calls
 */

/**
 * Get all categories
 * @returns {Promise<Object>} All categories
 */
export const getAllCategories = async () => {
    try {
        const response = await apiClient.get('/categories');
        return response.data;
    } catch (error) {
        throw handleApiError(error);
    }
};

/**
 * Get top-level categories (no parent)
 * @returns {Promise<Object>} Top-level categories
 */
export const getTopLevelCategories = async () => {
    try {
        const response = await apiClient.get('/categories/top');
        return response.data;
    } catch (error) {
        throw handleApiError(error);
    }
};

/**
 * Get category by ID
 * @param {string} categoryId - Category ID
 * @returns {Promise<Object>} Category details
 */
export const getCategoryById = async (categoryId) => {
    try {
        const response = await apiClient.get(`/categories/${categoryId}`);
        return response.data;
    } catch (error) {
        throw handleApiError(error);
    }
};

/**
 * Get category by slug
 * @param {string} slug - Category slug
 * @returns {Promise<Object>} Category details
 */
export const getCategoryBySlug = async (slug) => {
    try {
        const response = await apiClient.get(`/categories/slug/${slug}`);
        return response.data;
    } catch (error) {
        throw handleApiError(error);
    }
};

/**
 * Get subcategories of a category
 * @param {string} parentId - Parent category ID
 * @returns {Promise<Object>} Subcategories
 */
export const getSubcategories = async (parentId) => {
    try {
        const response = await apiClient.get(`/categories/${parentId}/subcategories`);
        return response.data;
    } catch (error) {
        throw handleApiError(error);
    }
};

const categoryService = {
    getAllCategories,
    getTopLevelCategories,
    getCategoryById,
    getCategoryBySlug,
    getSubcategories,
};

export default categoryService;

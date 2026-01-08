import apiClient, { handleApiError } from '../api/client';

/**
 * Video Service
 * Handles all video-related API calls
 */

/**
 * Get all public videos
 * @param {Object} params - Query parameters (page, limit, search)
 * @returns {Promise<Object>} Paginated videos
 */
export const getAllVideos = async (params = {}) => {
  try {
    const response = await apiClient.get('/videos', { params });
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

/**
 * Get video by ID
 * @param {string} videoId - Video ID
 * @returns {Promise<Object>} Video data
 */
export const getVideoById = async (videoId) => {
  try {
    const response = await apiClient.get(`/videos/${videoId}`);
    return response.data.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

/**
 * Get videos by author
 * @param {string} authorId - Author ID
 * @param {Object} params - Query parameters
 * @returns {Promise<Object>} Paginated videos
 */
export const getVideosByAuthor = async (authorId, params = {}) => {
  try {
    const response = await apiClient.get(`/videos/author/${authorId}`, { params });
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

/**
 * Get pending approval videos (Admin only)
 * @param {Object} params - Query parameters
 * @returns {Promise<Object>} Paginated pending videos
 */
export const getPendingVideos = async (params = {}) => {
  try {
    const response = await apiClient.get('/videos/pending', { params });
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

/**
 * Upload video with thumbnail (Cloudinary)
 * @param {Object} videoData - Video metadata (title, description, duration)
 * @param {File} videoFile - Video file
 * @param {File} thumbnailFile - Thumbnail image file
 * @param {Function} onProgress - Progress callback function
 * @returns {Promise<Object>} Created video data
 */
export const uploadVideo = async (videoData, videoFile, thumbnailFile, onProgress) => {
  try {
    const formData = new FormData();
    formData.append('video', videoFile);
    formData.append('thumbnail', thumbnailFile);
    formData.append('title', videoData.title);
    formData.append('description', videoData.description);
    if (videoData.duration) {
      formData.append('duration', videoData.duration);
    }

    const response = await apiClient.post('/videos', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      onUploadProgress: (progressEvent) => {
        const percentCompleted = Math.round(
          (progressEvent.loaded * 100) / progressEvent.total
        );
        if (onProgress) {
          onProgress(percentCompleted);
        }
      },
    });
    return response.data.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

/**
 * Update video
 * @param {string} videoId - Video ID
 * @param {Object} data - Data to update
 * @returns {Promise<Object>} Updated video data
 */
export const updateVideo = async (videoId, data) => {
  try {
    const response = await apiClient.put(`/videos/${videoId}`, data);
    return response.data.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

/**
 * Approve video (Admin only)
 * @param {string} videoId - Video ID
 * @returns {Promise<Object>} Approved video data
 */
export const approveVideo = async (videoId) => {
  try {
    const response = await apiClient.put(`/videos/${videoId}/approve`);
    return response.data.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

/**
 * Delete video
 * @param {string} videoId - Video ID
 * @returns {Promise<void>}
 */
export const deleteVideo = async (videoId) => {
  try {
    const response = await apiClient.delete(`/videos/${videoId}`);
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

/**
 * Search videos
 * @param {string} query - Search query
 * @param {Object} params - Additional parameters
 * @returns {Promise<Object>} Search results
 */
export const searchVideos = async (query, params = {}) => {
  try {
    const response = await apiClient.get('/videos', {
      params: { search: query, ...params },
    });
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

const videoService = {
  getAllVideos,
  getVideoById,
  getVideosByAuthor,
  getPendingVideos,
  uploadVideo,
  updateVideo,
  approveVideo,
  deleteVideo,
  searchVideos,
};

export default videoService;
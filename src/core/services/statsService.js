import { videoService } from './index';

/**
 * Stats Service
 * Provides dashboard statistics
 * Currently calculates from existing video data
 * TODO: Replace with dedicated backend endpoint when available
 */

const statsService = {
    /**
     * Get dashboard overview statistics
     * @returns {Promise<Object>} Dashboard stats
     */
    getDashboardStats: async () => {
        try {
            // TODO: Replace with API call when endpoint is available
            // const response = await api.get('/api/stats/overview');
            // return response.data;

            // For now, calculate from existing videos
            const response = await videoService.getAllVideos();
            const videos = response.data || response || [];

            const totalVideos = videos.length;
            const totalViews = videos.reduce((sum, video) => sum + (video.views || 0), 0);
            const totalComments = videos.reduce((sum, video) => {
                const comments = video.comments || [];
                return sum + comments.length;
            }, 0);

            return {
                totalVideos,
                totalViews,
                totalComments,
                activeUsers: '1.2k' // Mock data - needs backend endpoint
            };
        } catch (error) {
            console.error('Error fetching dashboard stats:', error);
            return {
                totalVideos: 0,
                totalViews: 0,
                totalComments: 0,
                activeUsers: '0'
            };
        }
    },

    /**
     * Get trending videos
     * @param {number} limit - Number of videos to return
     * @returns {Promise<Array>} Trending videos
     */
    getTrendingVideos: async (limit = 4) => {
        try {
            // TODO: Replace with API call when endpoint is available
            // const response = await api.get('/api/stats/trending', { params: { limit } });
            // return response.data;

            // For now, get all videos and sort by views
            const response = await videoService.getAllVideos();
            const videos = response.data || response || [];

            // Sort by views (descending) and take top N
            const trending = videos
                .sort((a, b) => (b.views || 0) - (a.views || 0))
                .slice(0, limit);

            return trending;
        } catch (error) {
            console.error('Error fetching trending videos:', error);
            return [];
        }
    },

    /**
     * Get activity statistics
     * @returns {Promise<Object>} Activity stats
     */
    getActivityStats: async () => {
        try {
            // TODO: Implement when backend endpoint is available
            // const response = await api.get('/api/stats/activity');
            // return response.data;

            return {
                videosThisWeek: 3,
                commentsToday: 8,
                newUsersThisMonth: 45
            };
        } catch (error) {
            console.error('Error fetching activity stats:', error);
            return {
                videosThisWeek: 0,
                commentsToday: 0,
                newUsersThisMonth: 0
            };
        }
    }
};

export default statsService;

import { videoService } from './index';
import apiClient from '../api/client';

/**
 * Stats Service
 * Provides dashboard statistics
 * Calculates stats from videos, posts, and uploads
 */

const statsService = {
    /**
     * Get dashboard overview statistics
     * @param {string} userId - Current user's ID
     * @returns {Promise<Object>} Dashboard stats
     */
    getDashboardStats: async (userId = null) => {
        try {
            // TODO: Replace with API call when endpoint is available
            // const response = await api.get('/api/stats/overview');
            // return response.data;

            // For now, calculate from existing videos
            const response = await videoService.getAllVideos();
            const allVideos = response.data || response || [];

            // Filter videos by the current user if userId is provided
            let userVideos = allVideos;
            if (userId) {
                userVideos = allVideos.filter(video => {
                    const authorId = video.author?._id || video.autor_id?._id || video.author || video.autor_id;
                    return authorId && authorId.toString() === userId.toString();
                });
            }

            // Calculate stats based on user's videos
            const totalVideos = userVideos.length;
            const totalViews = userVideos.reduce((sum, video) => sum + (video.views || 0), 0);

            // Calculate total comments on user's videos
            const totalComments = userVideos.reduce((sum, video) => {
                const comments = video.comments || [];
                return sum + comments.length;
            }, 0);

            // Calculate recent activity (last 7 days)
            const now = new Date();
            const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

            // User's videos uploaded in the last 7 days
            const recentVideos = userVideos.filter(video => {
                const createdAt = new Date(video.createdAt);
                return createdAt >= sevenDaysAgo;
            }).length;

            // Count comments made by the current user across ALL videos (not just their own)
            let userComments = 0;
            if (userId) {
                userComments = allVideos.reduce((sum, video) => {
                    const comments = video.comments || [];
                    const userCommentCount = comments.filter(comment => {
                        // Check if comment author matches userId
                        const authorId = comment.author?._id || comment.author;
                        return authorId && authorId.toString() === userId.toString();
                    }).length;
                    return sum + userCommentCount;
                }, 0);
            }

            // Calculate views growth on user's videos (comparing last 7 days vs total)
            const last7DaysViews = userVideos.reduce((sum, video) => {
                // This is a simplified calculation - ideally we'd track view timestamps
                // For now, we'll estimate based on recent videos
                const createdAt = new Date(video.createdAt);
                if (createdAt >= sevenDaysAgo) {
                    return sum + (video.views || 0);
                }
                return sum;
            }, 0);

            const viewsGrowthPercent = totalViews > 0
                ? Math.round((last7DaysViews / totalViews) * 100)
                : 0;

            // Fetch user's forum posts
            let totalPosts = 0;
            if (userId) {
                try {
                    const postsResponse = await apiClient.get(`/posts/author/${userId}`);
                    totalPosts = postsResponse.data?.data?.length || 0;
                } catch (error) {
                    console.error('Error fetching user posts:', error);
                }
            }

            // Fetch user's uploaded resources
            let totalResources = 0;
            if (userId) {
                try {
                    const uploadsResponse = await apiClient.get('/uploads');
                    const allUploads = uploadsResponse.data?.data || [];
                    // Filter uploads by user
                    totalResources = allUploads.filter(upload => {
                        const uploaderId = upload.uploadedBy?._id || upload.uploadedBy;
                        return uploaderId && uploaderId.toString() === userId.toString();
                    }).length;
                } catch (error) {
                    console.error('Error fetching user uploads:', error);
                }
            }

            // Fetch user's forum comments
            let totalForumComments = 0;
            if (userId) {
                try {
                    // Get all posts to count user's comments
                    const allPostsResponse = await apiClient.get('/posts');
                    const allPosts = allPostsResponse.data?.data || [];

                    // Count comments made by user across all posts
                    totalForumComments = allPosts.reduce((count, post) => {
                        const postComments = post.comments || [];
                        const userCommentsInPost = postComments.filter(comment => {
                            const commentAuthorId = comment.author?._id || comment.author;
                            return commentAuthorId && commentAuthorId.toString() === userId.toString();
                        });
                        return count + userCommentsInPost.length;
                    }, 0);
                } catch (error) {
                    console.error('Error fetching forum comments:', error);
                }
            }

            return {
                totalVideos,
                totalViews,
                totalComments,
                recentVideos,
                userComments,
                viewsGrowthPercent,
                totalPosts,
                totalResources,
                totalForumComments
            };
        } catch (error) {
            console.error('Error fetching dashboard stats:', error);
            return {
                totalVideos: 0,
                totalViews: 0,
                totalComments: 0,
                recentVideos: 0,
                userComments: 0,
                viewsGrowthPercent: 0,
                totalPosts: 0,
                totalResources: 0,
                totalForumComments: 0
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

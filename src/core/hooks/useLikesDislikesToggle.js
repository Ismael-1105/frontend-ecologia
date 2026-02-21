import { useCallback } from 'react';
import { videoService } from '../services';
import { useAuth } from '../context/AuthContext';
import { useSnackbar } from '../context/SnackbarContext';

/**
 * Custom hook to handle like/dislike toggle logic
 * When liking, automatically removes dislike (if present)
 * When disliking, automatically removes like (if present)
 */
export const useLikesDislikesToggle = (videos, setVideos) => {
    const { user } = useAuth();
    const { showSuccess, showError } = useSnackbar();

    /**
     * Handle like toggle
     * - If user already liked: removes the like
     * - If user has dislike: removes dislike and adds like
     * - Otherwise: adds like
     */
    const handleLike = useCallback(async (videoId) => {
        try {
            // Call API to toggle like (automatically handles dislike removal on backend)
            await videoService.toggleLike(videoId);

            // Update local state
            setVideos(prevVideos =>
                prevVideos.map(video => {
                    if (video._id === videoId) {
                        const userId = user?._id || user?.id;
                        const hasLike = video.likes?.includes(userId);
                        const hasDislike = video.dislikes?.includes(userId);

                        // Calculate new counts
                        let newLikes = [...(video.likes || [])];
                        let newDislikes = [...(video.dislikes || [])];
                        let newLikeCount = video.likeCount || 0;
                        let newDislikeCount = video.dislikeCount || 0;

                        if (hasLike) {
                            // User already liked: remove like
                            newLikes = newLikes.filter(id => id !== userId);
                            newLikeCount = Math.max(0, newLikeCount - 1);
                        } else {
                            // Add like
                            newLikes.push(userId);
                            newLikeCount = newLikeCount + 1;

                            // If user had dislike, remove it
                            if (hasDislike) {
                                newDislikes = newDislikes.filter(id => id !== userId);
                                newDislikeCount = Math.max(0, newDislikeCount - 1);
                            }
                        }

                        return {
                            ...video,
                            likes: newLikes,
                            dislikes: newDislikes,
                            likeCount: newLikeCount,
                            dislikeCount: newDislikeCount,
                        };
                    }
                    return video;
                })
            );

            showSuccess('Like toggled');
        } catch (error) {
            showError(error.message || 'Error al dar like');
        }
    }, [user, setVideos, showSuccess, showError]);

    /**
     * Handle dislike toggle
     * - If user already disliked: removes the dislike
     * - If user has like: removes like and adds dislike
     * - Otherwise: adds dislike
     */
    const handleDislike = useCallback(async (videoId) => {
        try {
            // Call API to toggle dislike (automatically handles like removal on backend)
            await videoService.toggleDislike(videoId);

            // Update local state
            setVideos(prevVideos =>
                prevVideos.map(video => {
                    if (video._id === videoId) {
                        const userId = user?._id || user?.id;
                        const hasLike = video.likes?.includes(userId);
                        const hasDislike = video.dislikes?.includes(userId);

                        // Calculate new counts
                        let newLikes = [...(video.likes || [])];
                        let newDislikes = [...(video.dislikes || [])];
                        let newLikeCount = video.likeCount || 0;
                        let newDislikeCount = video.dislikeCount || 0;

                        if (hasDislike) {
                            // User already disliked: remove dislike
                            newDislikes = newDislikes.filter(id => id !== userId);
                            newDislikeCount = Math.max(0, newDislikeCount - 1);
                        } else {
                            // Add dislike
                            newDislikes.push(userId);
                            newDislikeCount = newDislikeCount + 1;

                            // If user had like, remove it
                            if (hasLike) {
                                newLikes = newLikes.filter(id => id !== userId);
                                newLikeCount = Math.max(0, newLikeCount - 1);
                            }
                        }

                        return {
                            ...video,
                            likes: newLikes,
                            dislikes: newDislikes,
                            likeCount: newLikeCount,
                            dislikeCount: newDislikeCount,
                        };
                    }
                    return video;
                })
            );

            showSuccess('Dislike toggled');
        } catch (error) {
            showError(error.message || 'Error al dar dislike');
        }
    }, [user, setVideos, showSuccess, showError]);

    return { handleLike, handleDislike };
};

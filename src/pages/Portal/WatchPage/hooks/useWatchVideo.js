import { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import videoService from '../../../../core/services/videoService';
import { useAuth } from '../../../../core/context/AuthContext';

const useWatchVideo = () => {
    const { id: videoId } = useParams();
    const { user } = useAuth();
    const [video, setVideo] = useState(null);
    const [recommendedVideos, setRecommendedVideos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchVideo = useCallback(async () => {
        if (!videoId) return;
        try {
            setLoading(true);
            setError(null);
            const videoData = await videoService.getVideoById(videoId);
            if (!videoData) {
                setError('No se encontró el video');
                return;
            }
            setVideo(videoData);
        } catch (err) {
            console.error('Error fetching video:', err);
            setError('Error al cargar el video');
        } finally {
            setLoading(false);
        }
    }, [videoId]);

    const fetchRecommended = useCallback(async () => {
        try {
            const response = await videoService.getAllVideos({ limit: 20 });
            const allVideos = response?.data || [];
            setRecommendedVideos(allVideos.filter(v => v._id !== videoId));
        } catch (err) {
            console.error('Error fetching recommended videos:', err);
        }
    }, [videoId]);

    useEffect(() => {
        fetchVideo();
        fetchRecommended();
        // Scroll to top when video changes
        window.scrollTo(0, 0);
    }, [fetchVideo, fetchRecommended]);

    const handleLike = async () => {
        if (!user) return;
        try {
            const updatedVideo = await videoService.toggleLike(videoId);
            setVideo(prev => ({
                ...prev,
                likes: updatedVideo.likes || updatedVideo.data?.likes,
                dislikes: updatedVideo.dislikes || updatedVideo.data?.dislikes,
                likeCount: updatedVideo.likeCount || updatedVideo.data?.likeCount,
                dislikeCount: updatedVideo.dislikeCount || updatedVideo.data?.dislikeCount,
            }));
        } catch (err) {
            console.error('Error toggling like:', err);
        }
    };

    const handleDislike = async () => {
        if (!user) return;
        try {
            const updatedVideo = await videoService.toggleDislike(videoId);
            setVideo(prev => ({
                ...prev,
                likes: updatedVideo.likes || updatedVideo.data?.likes,
                dislikes: updatedVideo.dislikes || updatedVideo.data?.dislikes,
                likeCount: updatedVideo.likeCount || updatedVideo.data?.likeCount,
                dislikeCount: updatedVideo.dislikeCount || updatedVideo.data?.dislikeCount,
            }));
        } catch (err) {
            console.error('Error toggling dislike:', err);
        }
    };

    const hasLiked = video?.likes?.includes(user?._id || user?.id);
    const hasDisliked = video?.dislikes?.includes(user?._id || user?.id);

    return {
        video,
        videoId,
        recommendedVideos,
        loading,
        error,
        hasLiked,
        hasDisliked,
        handleLike,
        handleDislike,
    };
};

export default useWatchVideo;

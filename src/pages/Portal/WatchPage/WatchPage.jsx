import React, { useState } from 'react';
import {
    Box,
    Typography,
    CircularProgress,
    Alert,
    Grid,
    Divider,
    Skeleton,
} from '@mui/material';
import VideoPlayer from './components/VideoPlayer';
import VideoInfo from './components/VideoInfo';
import RecommendedVideos from './components/RecommendedVideos';
import VideoCommentSection from '../VideoPlayerPage/components/VideoCommentSection';
import useWatchVideo from './hooks/useWatchVideo';

const WatchPageSkeleton = () => (
    <Box sx={{ p: { xs: 2, md: 3 } }}>
        <Grid container spacing={3}>
            <Grid size={{ xs: 12, md: 8, lg: 9 }}>
                <Skeleton
                    variant="rounded"
                    width="100%"
                    animation="wave"
                    sx={{ aspectRatio: '16 / 9', borderRadius: 2 }}
                />
                <Skeleton variant="text" width="70%" height={36} animation="wave" sx={{ mt: 2 }} />
                <Skeleton variant="text" width="40%" height={24} animation="wave" />
                <Box sx={{ display: 'flex', gap: 1, mt: 1 }}>
                    <Skeleton variant="rounded" width={120} height={36} animation="wave" sx={{ borderRadius: 10 }} />
                </Box>
                <Skeleton variant="rounded" width="100%" height={120} animation="wave" sx={{ mt: 2, borderRadius: 3 }} />
            </Grid>
            <Grid size={{ xs: 12, md: 4, lg: 3 }}>
                {[...Array(6)].map((_, i) => (
                    <Box key={i} sx={{ display: 'flex', gap: 1.5, mb: 1.5 }}>
                        <Skeleton variant="rounded" animation="wave" sx={{ width: '60%', minWidth: 180, maxWidth: 280, aspectRatio: '16 / 9', borderRadius: 2, flexShrink: 0 }} />
                        <Box sx={{ flex: 1 }}>
                            <Skeleton variant="text" width="90%" height={20} animation="wave" />
                            <Skeleton variant="text" width="60%" height={16} animation="wave" />
                        </Box>
                    </Box>
                ))}
            </Grid>
        </Grid>
    </Box>
);

const WatchPage = () => {
    const {
        video,
        videoId,
        recommendedVideos,
        loading,
        error,
        hasLiked,
        hasDisliked,
        handleLike,
        handleDislike,
    } = useWatchVideo();

    const [isTheaterMode, setIsTheaterMode] = useState(false);
    const toggleTheater = () => setIsTheaterMode((prev) => !prev);

    if (loading) {
        return <WatchPageSkeleton />;
    }

    if (error) {
        return (
            <Box sx={{ p: 3, display: 'flex', justifyContent: 'center' }}>
                <Alert severity="error" sx={{ maxWidth: 600 }}>{error}</Alert>
            </Box>
        );
    }

    if (!video) {
        return (
            <Box sx={{ p: 3, display: 'flex', justifyContent: 'center' }}>
                <Alert severity="warning">No se encontró el video</Alert>
            </Box>
        );
    }

    // ─── Theater Mode Layout ───
    if (isTheaterMode) {
        return (
            <Box>
                {/* Video spans full width — edge to edge */}
                <Box sx={{ bgcolor: '#000' }}>
                    <Box sx={{ maxWidth: 1800, mx: 'auto' }}>
                        <VideoPlayer
                            videoUrl={video.videoUrl || video.url_video}
                            thumbnailUrl={video.thumbnailUrl || video.thumbnail}
                            title={video.title}
                            isTheaterMode={isTheaterMode}
                            onToggleTheater={toggleTheater}
                        />
                    </Box>
                </Box>

                {/* Below video: Info + Comments (left) + Recommended (right) */}
                <Box sx={{ pt: 1, px: { xs: 1.5, sm: 2, md: 3 }, pb: { xs: 1.5, sm: 2, md: 3 }, maxWidth: 1800, mx: 'auto' }}>
                    <Grid container spacing={3}>
                        <Grid size={{ xs: 12, md: 8, lg: 9 }}>
                            <Box>
                                <VideoInfo
                                    video={video}
                                    hasLiked={hasLiked}
                                    hasDisliked={hasDisliked}
                                    onLike={handleLike}
                                    onDislike={handleDislike}
                                />
                            </Box>
                            <Divider sx={{ my: 3 }} />
                            <VideoCommentSection videoId={videoId} />
                        </Grid>
                        <Grid size={{ xs: 12, md: 4, lg: 3 }}>
                            <RecommendedVideos
                                videos={recommendedVideos}
                                loading={false}
                            />
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        );
    }

    // ─── Normal Mode Layout ───
    return (
        <Box sx={{ p: { xs: 1.5, sm: 2, md: 3 }, maxWidth: 1800, mx: 'auto' }}>
            <Grid container spacing={3}>
                {/* Main Content — Video + Info + Comments */}
                <Grid size={{ xs: 12, md: 8, lg: 9 }}>
                    <VideoPlayer
                        videoUrl={video.videoUrl || video.url_video}
                        thumbnailUrl={video.thumbnailUrl || video.thumbnail}
                        title={video.title}
                        isTheaterMode={isTheaterMode}
                        onToggleTheater={toggleTheater}
                    />

                    <Box sx={{ mt: 2 }}>
                        <VideoInfo
                            video={video}
                            hasLiked={hasLiked}
                            hasDisliked={hasDisliked}
                            onLike={handleLike}
                            onDislike={handleDislike}
                        />
                    </Box>

                    <Divider sx={{ my: 3 }} />
                    <VideoCommentSection videoId={videoId} />
                </Grid>

                {/* Sidebar — Recommended Videos */}
                <Grid size={{ xs: 12, md: 4, lg: 3 }}>
                    <RecommendedVideos
                        videos={recommendedVideos}
                        loading={false}
                    />
                </Grid>
            </Grid>
        </Box>
    );
};

export default WatchPage;

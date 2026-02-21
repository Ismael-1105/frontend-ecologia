import React from 'react';
import { Box, Typography, Stack, Skeleton } from '@mui/material';
import RecommendedVideoCard from './RecommendedVideoCard';

const RecommendedVideosSkeleton = () => (
    <Stack spacing={0.5}>
        {[...Array(8)].map((_, i) => (
            <Box key={i} sx={{ display: 'flex', gap: 1 }}>
                <Skeleton variant="rounded" animation="wave" sx={{ width: '68%', minWidth: 200, maxWidth: 300, aspectRatio: '16 / 9', borderRadius: 2, flexShrink: 0 }} />
                <Box sx={{ flex: 1, py: 0.25 }}>
                    <Skeleton variant="text" width="90%" height={20} animation="wave" />
                    <Skeleton variant="text" width="60%" height={20} animation="wave" />
                    <Skeleton variant="text" width="40%" height={16} animation="wave" sx={{ mt: 0.5 }} />
                    <Skeleton variant="text" width="50%" height={16} animation="wave" />
                </Box>
            </Box>
        ))}
    </Stack>
);

const RecommendedVideos = ({ videos, loading }) => {
    if (loading) {
        return (
            <Box>
                <RecommendedVideosSkeleton />
            </Box>
        );
    }

    if (!videos || videos.length === 0) {
        return null;
    }

    return (
        <Box>
            <Stack spacing={0.25}>
                {videos.map((video) => (
                    <RecommendedVideoCard key={video._id} video={video} />
                ))}
            </Stack>
        </Box>
    );
};

export default RecommendedVideos;

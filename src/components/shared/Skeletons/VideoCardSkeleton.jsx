import React from 'react';
import {
    Card,
    CardActions,
    Skeleton,
    Box,
} from '@mui/material';
import { VIDEO_CARD_LAYOUT } from '../../../config/constants';

/**
 * VideoCardSkeleton Component
 * Loading skeleton that matches the structure of video cards
 * Used in: TrendingVideos, AllVideosPage
 */
const VideoCardSkeleton = () => {
    return (
        <Card
            elevation={0}
            sx={{
                height: VIDEO_CARD_LAYOUT.HEIGHT || 'auto',
                width: '100%',
                border: '1px solid',
                borderColor: 'divider',
                borderRadius: 2,
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
            }}
        >
            {/* Thumbnail Skeleton */}
            <Box
                sx={{
                    position: 'relative',
                    width: '100%',
                    aspectRatio: VIDEO_CARD_LAYOUT.THUMBNAIL_ASPECT_RATIO,
                    overflow: 'hidden',
                }}
            >
                <Skeleton
                    variant="rectangular"
                    width="100%"
                    height="100%"
                    animation="wave"
                    sx={{ position: 'absolute', top: 0, left: 0 }}
                />
                {/* Duration chip skeleton */}
                <Skeleton
                    variant="rounded"
                    width={56}
                    height={24}
                    animation="wave"
                    sx={{
                        position: 'absolute',
                        bottom: 8,
                        right: 8,
                        borderRadius: 12,
                    }}
                />
            </Box>

            {/* Content Skeleton */}
            <Box
                sx={{
                    p: 1.5,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    flex: 1,
                    minHeight: 0,
                }}
            >
                {/* Title (2 lines) */}
                <Box sx={{ minHeight: '2.8em' }}>
                    <Skeleton variant="text" width="90%" height={22} animation="wave" />
                    <Skeleton variant="text" width="65%" height={22} animation="wave" />
                </Box>

                {/* Category chip + views */}
                <Box sx={{ display: 'flex', gap: 2, mt: 1, alignItems: 'center' }}>
                    <Skeleton
                        variant="rounded"
                        width={72}
                        height={20}
                        animation="wave"
                        sx={{ borderRadius: 8 }}
                    />
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        <Skeleton variant="circular" width={14} height={14} animation="wave" />
                        <Skeleton variant="text" width={28} height={16} animation="wave" />
                    </Box>
                </Box>

                {/* Time ago */}
                <Skeleton variant="text" width={80} height={16} animation="wave" sx={{ mt: 0.5 }} />
            </Box>

            {/* Like/Dislike Actions Skeleton */}
            <CardActions sx={{ gap: 1, p: 1 }}>
                <Skeleton variant="circular" width={28} height={28} animation="wave" />
                <Skeleton variant="text" width={16} height={16} animation="wave" />
                <Skeleton variant="circular" width={28} height={28} animation="wave" />
                <Skeleton variant="text" width={16} height={16} animation="wave" />
            </CardActions>
        </Card>
    );
};

export default VideoCardSkeleton;

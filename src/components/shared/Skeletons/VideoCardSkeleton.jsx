import React from 'react';
import {
    Card,
    CardMedia,
    CardContent,
    Skeleton,
    Box,
    Grid,
} from '@mui/material';
import { alpha } from '@mui/material/styles';

/**
 * VideoCardSkeleton Component
 * Loading skeleton that matches the structure of VideoCard components
 * Used in: DashboardPage, VideoPlayerPage, MyVideosPage
 */
const VideoCardSkeleton = ({ variant = 'default' }) => {
    return (
        <Card
            sx={(theme) => ({
                backgroundColor: theme.palette.mode === 'dark'
                    ? alpha(theme.palette.background.paper, 0.7)
                    : theme.palette.background.paper,
                backdropFilter: 'blur(10px)',
                border: `1px solid ${theme.palette.divider}`,
                borderRadius: 3,
                overflow: 'hidden',
            })}
        >
            {/* Thumbnail Skeleton */}
            <Skeleton
                variant="rectangular"
                height={200}
                animation="wave"
                sx={{ bgcolor: 'action.hover' }}
            />

            <CardContent sx={{ pb: 2 }}>
                {/* Title Skeleton - 2 lines */}
                <Skeleton
                    variant="text"
                    height={32}
                    sx={{ mb: 1 }}
                    animation="wave"
                />
                <Skeleton
                    variant="text"
                    height={32}
                    width="80%"
                    sx={{ mb: 1 }}
                    animation="wave"
                />

                {/* Author Skeleton */}
                <Skeleton
                    variant="text"
                    height={20}
                    width="40%"
                    sx={{ mb: 1.5 }}
                    animation="wave"
                />

                {/* Description Skeleton - 2 lines (if variant includes description) */}
                {variant === 'default' && (
                    <>
                        <Skeleton
                            variant="text"
                            height={20}
                            sx={{ mb: 0.5 }}
                            animation="wave"
                        />
                        <Skeleton
                            variant="text"
                            height={20}
                            width="90%"
                            sx={{ mb: 2 }}
                            animation="wave"
                        />
                    </>
                )}

                {/* Bottom section: Chip and Stats */}
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mt: 2 }}>
                    <Skeleton
                        variant="rounded"
                        width={80}
                        height={24}
                        animation="wave"
                    />
                    <Skeleton
                        variant="text"
                        width={60}
                        height={20}
                        animation="wave"
                    />
                </Box>
            </CardContent>
        </Card>
    );
};

export default VideoCardSkeleton;

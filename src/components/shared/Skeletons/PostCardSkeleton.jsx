import React from 'react';
import {
    Card,
    CardContent,
    Box,
    Skeleton,
    Stack,
} from '@mui/material';

/**
 * PostCardSkeleton Component
 * Loading skeleton that matches the structure of PostCard component
 * Used in: ForoPage
 */
const PostCardSkeleton = () => {
    return (
        <Card
            elevation={1}
            sx={{
                transition: 'all 0.2s ease'
            }}
        >
            <CardContent>
                <Box sx={{ display: 'flex', gap: 2 }}>
                    {/* Avatar Skeleton */}
                    <Skeleton
                        variant="circular"
                        width={48}
                        height={48}
                        animation="wave"
                        sx={{ display: { xs: 'none', sm: 'block' } }}
                    />

                    {/* Content */}
                    <Box sx={{ flex: 1, minWidth: 0 }}>
                        {/* Title Skeleton */}
                        <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1, mb: 1 }}>
                            <Box sx={{ flex: 1 }}>
                                <Skeleton
                                    variant="text"
                                    height={32}
                                    width="85%"
                                    animation="wave"
                                />
                            </Box>
                            <Skeleton
                                variant="circular"
                                width={24}
                                height={24}
                                animation="wave"
                            />
                        </Box>

                        {/* Badges Skeleton */}
                        <Stack direction="row" spacing={1} sx={{ mb: 1.5, flexWrap: 'wrap', gap: 0.5 }}>
                            <Skeleton
                                variant="rounded"
                                width={70}
                                height={24}
                                animation="wave"
                            />
                            <Skeleton
                                variant="rounded"
                                width={90}
                                height={24}
                                animation="wave"
                            />
                        </Stack>

                        {/* Author and Stats Skeleton */}
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexWrap: 'wrap' }}>
                            <Skeleton
                                variant="text"
                                width={120}
                                height={20}
                                animation="wave"
                            />
                            <Box sx={{ display: 'flex', gap: 2 }}>
                                <Skeleton
                                    variant="text"
                                    width={80}
                                    height={20}
                                    animation="wave"
                                />
                                <Skeleton
                                    variant="text"
                                    width={100}
                                    height={20}
                                    animation="wave"
                                />
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </CardContent>
        </Card>
    );
};

export default PostCardSkeleton;

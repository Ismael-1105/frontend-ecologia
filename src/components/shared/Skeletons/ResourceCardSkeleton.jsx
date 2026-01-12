import React from 'react';
import {
    Card,
    CardContent,
    Box,
    Skeleton,
    Stack,
} from '@mui/material';

/**
 * ResourceCardSkeleton Component
 * Loading skeleton that matches the structure of ResourceCard component
 * Used in: RecursosPage
 */
const ResourceCardSkeleton = () => {
    return (
        <Card
            elevation={1}
            sx={{
                transition: 'all 0.2s ease'
            }}
        >
            <CardContent>
                <Box sx={{ display: 'flex', gap: 2 }}>
                    {/* Icon Skeleton */}
                    <Skeleton
                        variant="rounded"
                        width={64}
                        height={64}
                        animation="wave"
                        sx={{ borderRadius: 2 }}
                    />

                    {/* Content */}
                    <Box sx={{ flex: 1, minWidth: 0 }}>
                        {/* Title Skeleton - 2 lines */}
                        <Skeleton
                            variant="text"
                            height={24}
                            sx={{ mb: 0.5 }}
                            animation="wave"
                        />
                        <Skeleton
                            variant="text"
                            height={24}
                            width="70%"
                            sx={{ mb: 0.5 }}
                            animation="wave"
                        />

                        {/* Author Skeleton */}
                        <Skeleton
                            variant="text"
                            width="50%"
                            height={20}
                            sx={{ mb: 1 }}
                            animation="wave"
                        />

                        {/* Type Chip and Downloads */}
                        <Stack direction="row" spacing={1} alignItems="center">
                            <Skeleton
                                variant="rounded"
                                width={60}
                                height={24}
                                animation="wave"
                            />
                            <Skeleton
                                variant="text"
                                width={40}
                                height={20}
                                animation="wave"
                            />
                        </Stack>
                    </Box>

                    {/* Actions Skeleton */}
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                        <Skeleton
                            variant="circular"
                            width={32}
                            height={32}
                            animation="wave"
                        />
                        <Skeleton
                            variant="circular"
                            width={32}
                            height={32}
                            animation="wave"
                        />
                    </Box>
                </Box>
            </CardContent>
        </Card>
    );
};

export default ResourceCardSkeleton;

import React from 'react';
import {
    Card,
    CardContent,
    Box,
    Skeleton,
} from '@mui/material';

/**
 * StatsCardSkeleton Component
 * Loading skeleton that matches the structure of StatsCard component
 * Used in: DashboardStats
 */
const StatsCardSkeleton = () => {
    return (
        <Card
            elevation={2}
            sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                position: 'relative',
                overflow: 'hidden',
            }}
        >
            <CardContent sx={{ p: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    {/* Icon Box Skeleton */}
                    <Skeleton
                        variant="rounded"
                        width={48}
                        height={48}
                        animation="wave"
                        sx={{ borderRadius: 2, flexShrink: 0 }}
                    />
                    <Box sx={{ flex: 1 }}>
                        {/* Value Skeleton */}
                        <Skeleton
                            variant="text"
                            width={60}
                            height={40}
                            animation="wave"
                            sx={{ mb: 0.5 }}
                        />
                        {/* Label Skeleton */}
                        <Skeleton
                            variant="text"
                            width={100}
                            height={20}
                            animation="wave"
                        />
                    </Box>
                </Box>
                {/* Change text Skeleton */}
                <Skeleton
                    variant="text"
                    width={140}
                    height={16}
                    animation="wave"
                    sx={{ mt: 2 }}
                />
            </CardContent>
        </Card>
    );
};

export default StatsCardSkeleton;

import React from 'react';
import {
    Card,
    Skeleton,
    CardContent,
} from '@mui/material';

/**
 * VideoCardSkeleton Component
 * Simple loading skeleton for VideoCard components
 */
const VideoCardSkeleton = () => {
    return (
        <Card>
            <Skeleton variant="rectangular" width="100%" height={200} animation="wave" />
            <CardContent>
                <Skeleton variant="text" height={32} animation="wave" />
                <Skeleton variant="text" width="60%" animation="wave" />
                <Skeleton variant="text" width="40%" animation="wave" />
            </CardContent>
        </Card>
    );
};

export default VideoCardSkeleton;

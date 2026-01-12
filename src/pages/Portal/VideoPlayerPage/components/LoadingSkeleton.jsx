import React from 'react';
import { Grid } from '@mui/material';
import { VideoCardSkeleton } from '../../../../components/shared/Skeletons';

const LoadingSkeleton = ({ count = 6 }) => {
    return (
        <Grid container spacing={3}>
            {Array.from(new Array(count)).map((_, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                    <VideoCardSkeleton />
                </Grid>
            ))}
        </Grid>
    );
};

export default LoadingSkeleton;

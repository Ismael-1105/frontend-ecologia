import React from 'react';
import { Grid, Card, CardContent, Skeleton } from '@mui/material';

const LoadingSkeleton = ({ count = 6 }) => {
    return (
        <>
            {Array.from(new Array(count)).map((_, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                    <Card sx={{ borderRadius: 3 }}>
                        <Skeleton variant="rectangular" height={200} />
                        <CardContent>
                            <Skeleton variant="text" height={32} sx={{ mb: 1 }} />
                            <Skeleton variant="text" width="60%" />
                        </CardContent>
                    </Card>
                </Grid>
            ))}
        </>
    );
};

export default LoadingSkeleton;

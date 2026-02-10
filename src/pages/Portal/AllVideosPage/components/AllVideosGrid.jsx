import React from 'react';
import { Grid } from '@mui/material';
import VideoCardPublic from './VideoCardPublic';

/**
 * Video Grid Component
 * Displays videos in a responsive grid
 */
const AllVideosGrid = ({ videos, onVideoSelect }) => {
    return (
        <Grid container spacing={3} sx={{ mb: 4 }}>
            {videos.map((video) => (
                <Grid item xs={12} sm={6} md={4} key={video._id}>
                    <VideoCardPublic video={video} onVideoSelect={onVideoSelect} />
                </Grid>
            ))}
        </Grid>
    );
};

export default AllVideosGrid;

import React from 'react';
import { Grid } from '@mui/material';
import VideoCard from './VideoCard';

/**
 * VideoGrid Component
 * Displays grid of video cards
 */
const VideoGrid = ({ videos, onMenuOpen }) => {
    return (
        <Grid container spacing={3}>
            {videos.map((video) => (
                <Grid item xs={12} sm={6} md={4} key={video._id}>
                    <VideoCard video={video} onMenuOpen={onMenuOpen} />
                </Grid>
            ))}
        </Grid>
    );
};

export default VideoGrid;

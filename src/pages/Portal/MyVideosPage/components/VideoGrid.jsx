import React from 'react';
import { Grid } from '@mui/material';
import VideoCard from './VideoCard';

/**
 * VideoGrid Component
 * Displays grid of video cards with like/dislike support
 */
const VideoGrid = ({ videos, onMenuOpen, onLike, onDislike }) => {
    return (
        <Grid container spacing={3}>
            {videos.map((video) => (
                <Grid size={{ xs: 12, sm: 6, md: 4 }} key={video._id} sx={{ display: 'flex' }}>
                    <VideoCard 
                        video={video} 
                        onMenuOpen={onMenuOpen}
                        onLike={onLike}
                        onDislike={onDislike}
                    />
                </Grid>
            ))}
        </Grid>
    );
};

export default VideoGrid;

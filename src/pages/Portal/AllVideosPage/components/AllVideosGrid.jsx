import React from 'react';
import { Grid } from '@mui/material';
import VideoCardPublic from './VideoCardPublic';

/**
 * Video Grid Component
 * Displays videos in a responsive grid with like/dislike support
 */
const AllVideosGrid = ({ videos, onVideoSelect, onEdit, onDelete, onLike, onDislike }) => {
    return (
        <Grid container spacing={3} sx={{ mb: 4 }}>
            {videos.map((video) => (
                <Grid size={{ xs: 12, sm: 6, md: 4 }} key={video._id} sx={{ display: 'flex' }}>
                    <VideoCardPublic
                        video={video}
                        onVideoSelect={onVideoSelect}
                        onEdit={onEdit}
                        onDelete={onDelete}
                        onLike={onLike}
                        onDislike={onDislike}
                    />
                </Grid>
            ))}
        </Grid>
    );
};

export default AllVideosGrid;

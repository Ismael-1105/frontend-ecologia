import React from 'react';
import { Grid, Alert } from '@mui/material';
import VideoCard from './VideoCard';
import LoadingSkeleton from './LoadingSkeleton';

const VideoGrid = ({ videos, loading, onVideoPlay, onMenuOpen, formatDate }) => {
    if (loading) {
        return <LoadingSkeleton count={6} />;
    }

    if (videos.length === 0) {
        return (
            <Grid item xs={12}>
                <Alert severity="info">
                    No has subido ningún video. Únete a esta comunidad y sube tu primer video.
                </Alert>
            </Grid>
        );
    }

    return (
        <>
            {videos.map((video) => (
                <Grid item xs={12} sm={6} md={4} key={video._id || video.id} sx={{ display: 'flex' }}>
                    <VideoCard
                        video={video}
                        onPlay={onVideoPlay}
                        onMenuOpen={onMenuOpen}
                        formatDate={formatDate}
                    />
                </Grid>
            ))}
        </>
    );
};

export default VideoGrid;

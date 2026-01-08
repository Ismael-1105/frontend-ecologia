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
                    No has subido ningún video aún. ¡Sube tu primer video desde el dashboard!
                </Alert>
            </Grid>
        );
    }

    return (
        <>
            {videos.map((video) => (
                <VideoCard
                    key={video._id || video.id}
                    video={video}
                    onPlay={onVideoPlay}
                    onMenuOpen={onMenuOpen}
                    formatDate={formatDate}
                />
            ))}
        </>
    );
};

export default VideoGrid;

import React, { useState } from 'react';
import { Container, Grid } from '@mui/material';
import { VideoCardSkeleton } from '../../../components/shared/Skeletons';
import PaginationComponent from '../../../components/shared/PaginationComponent';
import { VideoPlayerModal } from '../DashboardPage/components';
import {
    PageHeader,
    EmptyState,
    AllVideosGrid,
    useAllVideos,
} from './components';

/**
 * All Videos Page
 * View all approved videos from all users
 * Now supports Admin management
 */
const AllVideosPage = () => {
    const {
        videos,
        pagination,
        loading,
        page,
        setPage,
        handleEdit,
        handleDelete,
        handleLike,
        handleDislike,
    } = useAllVideos();

    // Video player modal state
    const [selectedVideoId, setSelectedVideoId] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);

    const handleVideoSelect = (videoId) => {
        setSelectedVideoId(videoId);
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
        setSelectedVideoId(null);
    };

    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            {/* Page Header */}
            <PageHeader />

            {/* Loading State */}
            {loading && videos.length === 0 ? (
                <Grid container spacing={3} sx={{ mb: 4 }}>
                    {[...Array(6)].map((_, index) => (
                        <Grid item xs={12} sm={6} md={4} key={index}>
                            <VideoCardSkeleton />
                        </Grid>
                    ))}
                </Grid>
            ) : videos.length === 0 ? (
                /* Empty State */
                <EmptyState />
            ) : (
                /* Content: Video Grid */
                <>
                    <AllVideosGrid
                        videos={videos}
                        onVideoSelect={handleVideoSelect}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                        onLike={handleLike}
                        onDislike={handleDislike}
                    />
                    <PaginationComponent pagination={pagination} onPageChange={setPage} />
                </>
            )}

            {/* Video Player Modal */}
            <VideoPlayerModal
                open={modalOpen}
                onClose={handleCloseModal}
                videoId={selectedVideoId}
            />


        </Container>
    );
};

export default AllVideosPage;

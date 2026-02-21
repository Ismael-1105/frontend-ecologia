import React from 'react';
import { Container, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { VideoCardSkeleton } from '../../../components/shared/Skeletons';
import PaginationComponent from '../../../components/shared/PaginationComponent';
import {
    PageHeader,
    EmptyState,
    AllVideosGrid,
    useAllVideos,
} from './components';

/**
 * All Videos Page
 * View all approved videos from all users
 * Now navigates to WatchPage instead of opening a modal
 */
const AllVideosPage = () => {
    const navigate = useNavigate();
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

    const handleVideoSelect = (videoId) => {
        navigate(`/portal/watch/${videoId}`);
    };

    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            {/* Page Header */}
            <PageHeader />

            {/* Loading State */}
            {loading && videos.length === 0 ? (
                <Grid container spacing={3} sx={{ mb: 4 }}>
                    {[...Array(6)].map((_, index) => (
                        <Grid size={{ xs: 12, sm: 6, md: 4 }} key={index}>
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
        </Container>
    );
};

export default AllVideosPage;

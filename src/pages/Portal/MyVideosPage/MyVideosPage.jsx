import React from 'react';
import { Container } from '@mui/material';
import LoadingSpinner from '../../../components/shared/LoadingSpinner.jsx';
import PaginationComponent from '../../../components/shared/PaginationComponent';
import {
    PageHeader,
    EmptyState,
    VideoGrid,
    VideoActionsMenu,
    DeleteVideoDialog,
    useMyVideos,
} from './components';

/**
 * My Videos Page
 * View and manage user's uploaded videos
 * 
 * Architecture:
 * - PageHeader: Title and upload button
 * - EmptyState: Shown when no videos exist
 * - VideoGrid: Responsive grid of video cards
 * - VideoActionsMenu: Context menu for edit/delete
 * - DeleteVideoDialog: Confirmation dialog
 * - useMyVideos: Custom hook for business logic
 */
const MyVideosPage = () => {
    const {
        // State
        videos,
        pagination,
        loading,
        page,
        anchorEl,
        selectedVideo,
        deleteDialogOpen,

        // Handlers
        setPage,
        handleMenuOpen,
        handleMenuClose,
        handleEdit,
        handleDelete,
        confirmDelete,
        cancelDelete,
    } = useMyVideos();

    // Loading state
    if (loading && videos.length === 0) {
        return <LoadingSpinner fullScreen message="Loading your videos..." />;
    }

    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            {/* Page Header */}
            <PageHeader />

            {/* Content: Empty State or Video Grid */}
            {videos.length === 0 ? (
                <EmptyState />
            ) : (
                <>
                    <VideoGrid videos={videos} onMenuOpen={handleMenuOpen} />
                    <PaginationComponent pagination={pagination} onPageChange={setPage} />
                </>
            )}

            {/* Video Actions Menu */}
            <VideoActionsMenu
                anchorEl={anchorEl}
                onClose={handleMenuClose}
                onEdit={handleEdit}
                onDelete={handleDelete}
            />

            {/* Delete Confirmation Dialog */}
            <DeleteVideoDialog
                open={deleteDialogOpen}
                video={selectedVideo}
                onConfirm={confirmDelete}
                onCancel={cancelDelete}
            />
        </Container>
    );
};

export default MyVideosPage;

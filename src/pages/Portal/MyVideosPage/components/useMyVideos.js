import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { videoService } from '../../../../core/services';
import { useAuth } from '../../../../core/context/AuthContext';
import { useSnackbar } from '../../../../core/context/SnackbarContext.jsx';

/**
 * useMyVideos Hook
 * Custom hook to manage My Videos page logic
 */
export const useMyVideos = () => {
    const navigate = useNavigate();
    const { user } = useAuth();
    const { showSuccess, showError } = useSnackbar();

    // State
    const [videos, setVideos] = useState([]);
    const [pagination, setPagination] = useState(null);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedVideo, setSelectedVideo] = useState(null);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

    // Load videos on mount and page change
    useEffect(() => {
        if (user) {
            loadMyVideos();
        }
        // eslint-disable-next-line
    }, [user, page]);

    // Load videos from API
    const loadMyVideos = async () => {
        try {
            setLoading(true);
            const response = await videoService.getVideosByAuthor(user.id, { page, limit: 12 });
            setVideos(response.data);
            setPagination(response.pagination);
        } catch (error) {
            showError('Failed to load videos');
        } finally {
            setLoading(false);
        }
    };

    // Menu handlers
    const handleMenuOpen = (event, video) => {
        setAnchorEl(event.currentTarget);
        setSelectedVideo(video);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    // Action handlers
    const handleEdit = () => {
        navigate(`/portal/edit-video/${selectedVideo._id}`);
        handleMenuClose();
    };

    const handleDelete = () => {
        setDeleteDialogOpen(true);
        handleMenuClose();
    };

    const confirmDelete = async () => {
        try {
            await videoService.deleteVideo(selectedVideo._id);
            setDeleteDialogOpen(false);
            showSuccess('Video deleted successfully');
            loadMyVideos();
        } catch (error) {
            showError(error.message || 'Failed to delete video');
        }
    };

    const cancelDelete = () => {
        setDeleteDialogOpen(false);
    };

    return {
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
    };
};

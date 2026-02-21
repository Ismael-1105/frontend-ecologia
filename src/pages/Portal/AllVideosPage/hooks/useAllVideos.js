import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllVideos } from '../../../../core/api/videoService';
import { videoService } from '../../../../core/services';
import { useAuth } from '../../../../core/context/AuthContext';
import { useSnackbar } from '../../../../core/context/SnackbarContext.jsx';
import { useLikesDislikesToggle } from '../../../../core/hooks/useLikesDislikesToggle';
import SweetAlert from '../../../../components/common/SweetAlert';

/**
 * Custom hook for All Videos page
 * Fetches and manages all approved videos from all users
 * Now includes management capabilities for Admins
 */
export const useAllVideos = () => {
    const navigate = useNavigate();
    const { user } = useAuth();
    const { showSuccess, showError } = useSnackbar();

    const [videos, setVideos] = useState([]);
    const [pagination, setPagination] = useState({
        page: 1,
        limit: 12,
        total: 0,
        pages: 0,
    });
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);

    // Management state
    // const [selectedVideoId, setSelectedVideoId] = useState(null); // No longer needed
    // const [deleteDialogOpen, setDeleteDialogOpen] = useState(false); // No longer needed

    // Fetch all videos
    const fetchVideos = useCallback(async () => {
        try {
            setLoading(true);
            const response = await getAllVideos({
                page,
                limit: pagination.limit,
            });

            if (response.success) {
                setVideos(response.data);
                setPagination(response.pagination);
            }
        } catch (error) {
            console.error('Error fetching videos:', error);
            setVideos([]);
        } finally {
            setLoading(false);
        }
    }, [page, pagination.limit]);

    // Fetch videos on mount and when page changes
    useEffect(() => {
        fetchVideos();
    }, [fetchVideos]);

    // Management handlers
    const handleEdit = (video) => {
        navigate(`/portal/edit-video/${video._id}`);
    };

    const handleDelete = async (videoId) => {
        const confirmed = await SweetAlert.showDeleteConfirmation(
            '¿Eliminar video?',
            '¿Estás seguro de que deseas eliminar este video? Esta acción no se puede deshacer.'
        );

        if (confirmed) {
            try {
                await videoService.deleteVideo(videoId);
                SweetAlert.showSuccessAlert('¡Eliminado!', 'Video eliminado correctamente');
                // showSuccess('Video eliminado correctamente');
                fetchVideos();
            } catch (error) {
                SweetAlert.showErrorAlert('Error', error.message || 'Error al eliminar el video');
                // showError(error.message || 'Error al eliminar el video');
            }
        }
    };

    // Like/Dislike handlers with smart toggle (removes opposite vote)
    const { handleLike, handleDislike } = useLikesDislikesToggle(videos, setVideos);

    return {
        videos,
        pagination,
        loading,
        page,
        setPage,
        handleEdit,
        handleDelete,
        handleLike,
        handleDislike,
    };
};

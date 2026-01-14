import React, { useEffect, useState, useCallback } from 'react';
import { Container, Grid, Alert } from '@mui/material';
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';
import { videoService } from '../../../core/services';
import { useAuth } from '../../../core/context/AuthContext';
import VideoPlayerModal from '../DashboardPage/components/VideoPlayerModal.jsx';
import {
    PageHeader,
    VideoGrid,
    VideoCardMenu,
    EditVideoDialog,
    DeleteVideoDialog,
} from './components';

const MyVideosPage = () => {
    const { user } = useAuth();
    const [videos, setVideos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedVideo, setSelectedVideo] = useState(null);
    const [isPlayerModalOpen, setIsPlayerModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const [editFormData, setEditFormData] = useState({ title: '', description: '' });

    // ----------------------------------------------------
    // FIX: useCallback evita recrear la función en cada render
    // ----------------------------------------------------
    const fetchMyVideos = useCallback(async () => {
        setLoading(true);
        try {
            const response = await videoService.getAllVideos();

            const myVideos = response.data.filter(v =>
                v.author?._id === user?.id || v.autor_id?._id === user?.id
            );

            setVideos(myVideos);
            setError(null);
        } catch (err) {
            console.error('Error fetching my videos:', err);
            setError('No se pudieron cargar tus videos. Por favor, intenta de nuevo.');
        } finally {
            setLoading(false);
        }
    }, [user?.id]); // depende SOLO del usuario

    // ----------------------------------------------------
    // Se ejecuta una sola vez sin warnings
    // ----------------------------------------------------
    useEffect(() => {
        fetchMyVideos();
    }, [fetchMyVideos]);

    const handleMenuOpen = (event, video) => {
        setAnchorEl(event.currentTarget);
        setSelectedVideo(video);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handlePlayVideo = (video) => {
        setSelectedVideo(video);
        setIsPlayerModalOpen(true);
        handleMenuClose();
    };

    const handleEditClick = () => {
        setEditFormData({
            title: selectedVideo.title || selectedVideo.titulo,
            description: selectedVideo.description || selectedVideo.descripcion
        });
        setIsEditModalOpen(true);
        handleMenuClose();
    };

    const handleEditSave = async () => {
        try {
            await videoService.updateVideo(selectedVideo._id || selectedVideo.id, editFormData);
            setIsEditModalOpen(false);
            fetchMyVideos();
        } catch (err) {
            console.error('Error updating video:', err);
            alert('Error al actualizar el video');
        }
    };

    const handleDeleteClick = () => {
        setIsDeleteDialogOpen(true);
        handleMenuClose();
    };

    const handleDeleteConfirm = async () => {
        try {
            await videoService.deleteVideo(selectedVideo._id || selectedVideo.id);
            setIsDeleteDialogOpen(false);
            fetchMyVideos();
        } catch (err) {
            console.error('Error deleting video:', err);
            alert('Error al eliminar el video');
        }
    };

    const formatDate = (dateString) => {
        if (!dateString) return 'Fecha desconocida';
        const date = new Date(dateString);
        return date.toLocaleDateString('es-ES', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    return (
        <Container maxWidth="xl" sx={{ py: 4 }}>
            <PageHeader
                title="Mis Videos"
                subtitle="Gestiona y visualiza todos tus videos subidos"
                icon={VideoLibraryIcon}
            />

            {error && (
                <Alert severity="error" sx={{ mb: 3 }}>
                    {error}
                </Alert>
            )}

            <Grid container spacing={3}>
                <VideoGrid
                    videos={videos}
                    loading={loading}
                    onVideoPlay={handlePlayVideo}
                    onMenuOpen={handleMenuOpen}
                    formatDate={formatDate}
                />
            </Grid>

            <VideoCardMenu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
                onPlay={() => handlePlayVideo(selectedVideo)}
                onEdit={handleEditClick}
                onDelete={handleDeleteClick}
            />

            <EditVideoDialog
                open={isEditModalOpen}
                onClose={() => setIsEditModalOpen(false)}
                formData={editFormData}
                onChange={setEditFormData}
                onSave={handleEditSave}
            />

            <DeleteVideoDialog
                open={isDeleteDialogOpen}
                onClose={() => setIsDeleteDialogOpen(false)}
                onConfirm={handleDeleteConfirm}
            />

            <VideoPlayerModal
                open={isPlayerModalOpen}
                onClose={() => setIsPlayerModalOpen(false)}
                videoId={selectedVideo?._id || selectedVideo?.id}
            />
        </Container>
    );
};

export default MyVideosPage;

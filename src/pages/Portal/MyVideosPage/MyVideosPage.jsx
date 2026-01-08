import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Container,
    Grid,
    Card,
    CardMedia,
    CardContent,
    Typography,
    Box,
    Button,
    IconButton,
    Chip,
    Menu,
    MenuItem,
} from '@mui/material';
import { Add, MoreVert, Edit, Delete } from '@mui/icons-material';
import { videoService } from '../../../core/services';
import { useAuth } from '../../../core/context/AuthContext';
import { useSnackbar } from '../../../core/context/SnackbarContext';
import LoadingSpinner from '../../../components/shared/LoadingSpinner';
import RatingStars from '../../../components/shared/RatingStars';
import PaginationComponent from '../../../components/shared/PaginationComponent';
import ConfirmDialog from '../../../components/shared/ConfirmDialog';

/**
 * My Videos Page
 * View and manage user's uploaded videos
 */
const MyVideosPage = () => {
    const navigate = useNavigate();
    const { user } = useAuth();
    const { showSuccess, showError } = useSnackbar();

    const [videos, setVideos] = useState([]);
    const [pagination, setPagination] = useState(null);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);

    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedVideo, setSelectedVideo] = useState(null);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

    useEffect(() => {
        if (user) {
            loadMyVideos();
        }
        // eslint-disable-next-line
    }, [user, page]);

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

    const handleMenuOpen = (event, video) => {
        setAnchorEl(event.currentTarget);
        setSelectedVideo(video);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleEdit = () => {
        // Navigate to edit page (to be implemented)
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

    if (loading && videos.length === 0) {
        return <LoadingSpinner fullScreen message="Loading your videos..." />;
    }

    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h4">My Videos</Typography>
                <Button
                    variant="contained"
                    startIcon={<Add />}
                    onClick={() => navigate('/portal/upload-video')}
                >
                    Upload Video
                </Button>
            </Box>

            {videos.length === 0 ? (
                <Box sx={{ textAlign: 'center', py: 8 }}>
                    <Typography variant="h6" color="text.secondary" gutterBottom>
                        No videos yet
                    </Typography>
                    <Button
                        variant="contained"
                        startIcon={<Add />}
                        onClick={() => navigate('/portal/upload-video')}
                        sx={{ mt: 2 }}
                    >
                        Upload Your First Video
                    </Button>
                </Box>
            ) : (
                <>
                    <Grid container spacing={3}>
                        {videos.map((video) => (
                            <Grid item xs={12} sm={6} md={4} key={video._id}>
                                <Card>
                                    <CardMedia
                                        component="div"
                                        sx={{
                                            height: 200,
                                            bgcolor: 'grey.300',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                        }}
                                    >
                                        {video.thumbnail ? (
                                            <img
                                                src={video.thumbnail}
                                                alt={video.titulo}
                                                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                            />
                                        ) : (
                                            <Typography variant="h6" color="text.secondary">
                                                No Thumbnail
                                            </Typography>
                                        )}
                                    </CardMedia>

                                    <CardContent>
                                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                            <Typography variant="h6" gutterBottom noWrap sx={{ flex: 1 }}>
                                                {video.titulo}
                                            </Typography>
                                            <IconButton size="small" onClick={(e) => handleMenuOpen(e, video)}>
                                                <MoreVert />
                                            </IconButton>
                                        </Box>

                                        <Typography
                                            variant="body2"
                                            color="text.secondary"
                                            sx={{
                                                overflow: 'hidden',
                                                textOverflow: 'ellipsis',
                                                display: '-webkit-box',
                                                WebkitLineClamp: 2,
                                                WebkitBoxOrient: 'vertical',
                                                mb: 2,
                                            }}
                                        >
                                            {video.descripcion}
                                        </Typography>

                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                                            <RatingStars
                                                value={video.averageRating || 0}
                                                readOnly
                                                size="small"
                                                showValue
                                            />
                                            <Typography variant="caption" color="text.secondary">
                                                ({video.totalRatings || 0})
                                            </Typography>
                                        </Box>

                                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                            <Chip
                                                label={video.aprobado ? 'Approved' : 'Pending'}
                                                color={video.aprobado ? 'success' : 'warning'}
                                                size="small"
                                            />
                                            <Typography variant="caption" color="text.secondary">
                                                {video.views || 0} views
                                            </Typography>
                                        </Box>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>

                    <PaginationComponent pagination={pagination} onPageChange={setPage} />
                </>
            )}

            {/* Context Menu */}
            <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
                <MenuItem onClick={handleEdit}>
                    <Edit fontSize="small" sx={{ mr: 1 }} />
                    Edit
                </MenuItem>
                <MenuItem onClick={handleDelete}>
                    <Delete fontSize="small" sx={{ mr: 1 }} />
                    Delete
                </MenuItem>
            </Menu>

            {/* Delete Confirmation */}
            <ConfirmDialog
                open={deleteDialogOpen}
                title="Delete Video"
                message={`Are you sure you want to delete "${selectedVideo?.titulo}"? This action cannot be undone.`}
                confirmText="Delete"
                severity="error"
                onConfirm={confirmDelete}
                onCancel={() => setDeleteDialogOpen(false)}
            />
        </Container>
    );
};

export default MyVideosPage;

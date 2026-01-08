import React, { useState, useEffect } from 'react';
import {
    Container,
    Grid,
    Card,
    CardContent,
    CardMedia,
    Typography,
    Button,
    Box,
    Chip,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
} from '@mui/material';
import { CheckCircle, Cancel } from '@mui/icons-material';
import { videoService } from '../../../core/services';
import { useSnackbar } from '../../../core/context/SnackbarContext';
import LoadingSpinner from '../../../components/shared/LoadingSpinner';
import PaginationComponent from '../../../components/shared/PaginationComponent';

/**
 * Pending Videos Page (Admin)
 * Approve or reject pending videos
 */
const PendingVideosPage = () => {
    const { showSuccess, showError } = useSnackbar();

    const [videos, setVideos] = useState([]);
    const [pagination, setPagination] = useState(null);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);

    const [previewDialogOpen, setPreviewDialogOpen] = useState(false);
    const [selectedVideo, setSelectedVideo] = useState(null);

    useEffect(() => {
        loadPendingVideos();
        // eslint-disable-next-line
    }, [page]);

    const loadPendingVideos = async () => {
        try {
            setLoading(true);
            const response = await videoService.getPendingVideos({ page, limit: 12 });
            setVideos(response.data);
            setPagination(response.pagination);
        } catch (error) {
            showError('Failed to load pending videos');
        } finally {
            setLoading(false);
        }
    };

    const handlePreview = (video) => {
        setSelectedVideo(video);
        setPreviewDialogOpen(true);
    };

    const handleApprove = async (videoId) => {
        try {
            await videoService.approveVideo(videoId);
            showSuccess('Video approved successfully');
            loadPendingVideos();
            setPreviewDialogOpen(false);
        } catch (error) {
            showError(error.message || 'Failed to approve video');
        }
    };

    const handleReject = async (videoId) => {
        try {
            await videoService.deleteVideo(videoId);
            showSuccess('Video rejected and deleted');
            loadPendingVideos();
            setPreviewDialogOpen(false);
        } catch (error) {
            showError(error.message || 'Failed to reject video');
        }
    };

    if (loading && videos.length === 0) {
        return <LoadingSpinner fullScreen message="Loading pending videos..." />;
    }

    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            <Typography variant="h4" gutterBottom>
                Pending Videos
            </Typography>

            <Typography variant="body1" color="text.secondary" paragraph>
                Review and approve videos submitted by teachers
            </Typography>

            {videos.length === 0 ? (
                <Box sx={{ textAlign: 'center', py: 8 }}>
                    <Typography variant="h6" color="text.secondary">
                        No pending videos
                    </Typography>
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
                                        <Typography variant="h6" gutterBottom noWrap>
                                            {video.titulo}
                                        </Typography>

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

                                        <Box sx={{ mb: 2 }}>
                                            <Typography variant="caption" color="text.secondary">
                                                Uploaded by: {video.autor_id?.name || 'Unknown'}
                                            </Typography>
                                        </Box>

                                        <Chip label="Pending Approval" color="warning" size="small" sx={{ mb: 2 }} />

                                        <Box sx={{ display: 'flex', gap: 1 }}>
                                            <Button
                                                fullWidth
                                                variant="outlined"
                                                onClick={() => handlePreview(video)}
                                            >
                                                Preview
                                            </Button>
                                        </Box>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>

                    <PaginationComponent pagination={pagination} onPageChange={setPage} />
                </>
            )}

            {/* Preview Dialog */}
            <Dialog
                open={previewDialogOpen}
                onClose={() => setPreviewDialogOpen(false)}
                maxWidth="md"
                fullWidth
            >
                <DialogTitle>{selectedVideo?.titulo}</DialogTitle>
                <DialogContent>
                    <Box
                        sx={{
                            width: '100%',
                            paddingTop: '56.25%',
                            position: 'relative',
                            bgcolor: 'black',
                            mb: 2,
                        }}
                    >
                        <video
                            controls
                            style={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                width: '100%',
                                height: '100%',
                            }}
                            src={`${process.env.REACT_APP_API_URL?.replace('/api', '')}/${selectedVideo?.url}`}
                        >
                            Your browser does not support the video tag.
                        </video>
                    </Box>

                    <Typography variant="body1" paragraph>
                        {selectedVideo?.descripcion}
                    </Typography>

                    <Box sx={{ display: 'flex', gap: 2 }}>
                        <Box>
                            <Typography variant="caption" color="text.secondary">
                                Uploaded by
                            </Typography>
                            <Typography variant="body2">
                                {selectedVideo?.autor_id?.name || 'Unknown'}
                            </Typography>
                        </Box>

                        <Box>
                            <Typography variant="caption" color="text.secondary">
                                Institution
                            </Typography>
                            <Typography variant="body2">
                                {selectedVideo?.autor_id?.institution || 'N/A'}
                            </Typography>
                        </Box>

                        <Box>
                            <Typography variant="caption" color="text.secondary">
                                File Size
                            </Typography>
                            <Typography variant="body2">
                                {selectedVideo?.fileSize
                                    ? `${(selectedVideo.fileSize / (1024 * 1024)).toFixed(2)} MB`
                                    : 'N/A'}
                            </Typography>
                        </Box>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setPreviewDialogOpen(false)}>Close</Button>
                    <Button
                        startIcon={<Cancel />}
                        color="error"
                        onClick={() => handleReject(selectedVideo?._id)}
                    >
                        Reject
                    </Button>
                    <Button
                        variant="contained"
                        startIcon={<CheckCircle />}
                        color="success"
                        onClick={() => handleApprove(selectedVideo?._id)}
                    >
                        Approve
                    </Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
};

export default PendingVideosPage;

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
    Container,
    Grid,
    Card,
    CardContent,
    Typography,
    Box,
    Chip,
    Divider,
    Button,
} from '@mui/material';
import { ArrowBack, Person, CalendarToday, Visibility } from '@mui/icons-material';
import { formatDistanceToNow } from 'date-fns';
import { videoService, ratingService } from '../../core/services';
import { useAuth } from '../../core/context/AuthContext';
import { useSnackbar } from '../../core/context/SnackbarContext.jsx';
import LoadingSpinner from '../../components/shared/LoadingSpinner';
import RatingStars from '../../components/shared/RatingStars';
import CommentList from '../../components/shared/CommentList';

/**
 * Video Detail Page
 * View video with player, info, ratings, and comments
 */
const VideoDetailPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { isAuthenticated } = useAuth();
    const { showSuccess, showError } = useSnackbar();

    const [video, setVideo] = useState(null);
    const [ratingStats, setRatingStats] = useState(null);
    const [userRating, setUserRating] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadVideo();
        loadRatingStats();
        if (isAuthenticated) {
            loadUserRating();
        }
        // eslint-disable-next-line
    }, [id, isAuthenticated]);

    const loadVideo = async () => {
        try {
            setLoading(true);
            const data = await videoService.getVideoById(id);
            setVideo(data);
        } catch (error) {
            showError('Failed to load video');
            navigate('/videos');
        } finally {
            setLoading(false);
        }
    };

    const loadRatingStats = async () => {
        try {
            const stats = await ratingService.getVideoRatingStats(id);
            setRatingStats(stats);
        } catch (error) {
            console.error('Failed to load rating stats:', error);
        }
    };

    const loadUserRating = async () => {
        try {
            const rating = await ratingService.getUserRating(id);
            setUserRating(rating?.valoracion || null);
        } catch (error) {
            console.error('Failed to load user rating:', error);
        }
    };

    const handleRatingChange = async (newRating) => {
        if (!isAuthenticated) {
            showError('Please login to rate this video');
            return;
        }

        try {
            await ratingService.rateVideo(id, newRating);
            setUserRating(newRating);
            showSuccess('Rating submitted successfully');
            loadRatingStats();
        } catch (error) {
            showError('Failed to submit rating');
        }
    };

    if (loading) {
        return <LoadingSpinner fullScreen message="Loading video..." />;
    }

    if (!video) {
        return null;
    }

    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            {/* Back Button */}
            <Button
                startIcon={<ArrowBack />}
                onClick={() => navigate(-1)}
                sx={{ mb: 2 }}
            >
                Back
            </Button>

            <Grid container spacing={4}>
                {/* Video Player */}
                <Grid item xs={12} md={8}>
                    <Card>
                        <Box
                            sx={{
                                width: '100%',
                                paddingTop: '56.25%', // 16:9 aspect ratio
                                position: 'relative',
                                bgcolor: 'black',
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
                                src={`${import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080'}/${video.url}`}
                            >
                                Your browser does not support the video tag.
                            </video>
                        </Box>

                        <CardContent>
                            <Typography variant="h5" gutterBottom>
                                {video.titulo}
                            </Typography>

                            <Box sx={{ display: 'flex', gap: 2, mb: 2, flexWrap: 'wrap' }}>
                                <Chip
                                    icon={<Visibility />}
                                    label={`${video.views || 0} views`}
                                    size="small"
                                />
                                <Chip
                                    icon={<CalendarToday />}
                                    label={formatDistanceToNow(new Date(video.createdAt), { addSuffix: true })}
                                    size="small"
                                />
                            </Box>

                            <Divider sx={{ my: 2 }} />

                            <Typography variant="body1" paragraph>
                                {video.descripcion}
                            </Typography>

                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <Person />
                                <Typography variant="body2">
                                    Uploaded by <strong>{video.autor_id?.name || 'Unknown'}</strong>
                                </Typography>
                            </Box>
                        </CardContent>
                    </Card>

                    {/* Comments Section */}
                    <Box sx={{ mt: 4 }}>
                        <CommentList videoId={id} />
                    </Box>
                </Grid>

                {/* Sidebar */}
                <Grid item xs={12} md={4}>
                    {/* Rating Card */}
                    <Card sx={{ mb: 2 }}>
                        <CardContent>
                            <Typography variant="h6" gutterBottom>
                                Rating
                            </Typography>

                            {ratingStats && (
                                <Box sx={{ mb: 2 }}>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                                        <Typography variant="h4">
                                            {ratingStats.averageRating?.toFixed(1) || '0.0'}
                                        </Typography>
                                        <RatingStars
                                            value={ratingStats.averageRating || 0}
                                            readOnly
                                            size="large"
                                            showValue={false}
                                        />
                                    </Box>
                                    <Typography variant="body2" color="text.secondary">
                                        Based on {ratingStats.totalRatings || 0} ratings
                                    </Typography>
                                </Box>
                            )}

                            <Divider sx={{ my: 2 }} />

                            {isAuthenticated ? (
                                <Box>
                                    <Typography variant="body2" gutterBottom>
                                        Your Rating:
                                    </Typography>
                                    <RatingStars
                                        value={userRating || 0}
                                        onChange={handleRatingChange}
                                        size="large"
                                        showValue={false}
                                    />
                                </Box>
                            ) : (
                                <Typography variant="body2" color="text.secondary">
                                    Login to rate this video
                                </Typography>
                            )}
                        </CardContent>
                    </Card>

                    {/* Video Info Card */}
                    <Card>
                        <CardContent>
                            <Typography variant="h6" gutterBottom>
                                Video Information
                            </Typography>

                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                                <Box>
                                    <Typography variant="caption" color="text.secondary">
                                        Duration
                                    </Typography>
                                    <Typography variant="body2">
                                        {video.duration ? `${Math.floor(video.duration / 60)}:${(video.duration % 60).toString().padStart(2, '0')}` : 'N/A'}
                                    </Typography>
                                </Box>

                                <Box>
                                    <Typography variant="caption" color="text.secondary">
                                        File Size
                                    </Typography>
                                    <Typography variant="body2">
                                        {video.fileSize ? `${(video.fileSize / (1024 * 1024)).toFixed(2)} MB` : 'N/A'}
                                    </Typography>
                                </Box>

                                <Box>
                                    <Typography variant="caption" color="text.secondary">
                                        Uploaded
                                    </Typography>
                                    <Typography variant="body2">
                                        {new Date(video.createdAt).toLocaleDateString()}
                                    </Typography>
                                </Box>

                                <Box>
                                    <Typography variant="caption" color="text.secondary">
                                        Status
                                    </Typography>
                                    <Chip
                                        label={video.aprobado ? 'Approved' : 'Pending'}
                                        color={video.aprobado ? 'success' : 'warning'}
                                        size="small"
                                    />
                                </Box>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Container>
    );
};

export default VideoDetailPage;

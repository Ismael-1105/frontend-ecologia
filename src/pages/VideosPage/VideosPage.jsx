import React, { useState, useEffect } from 'react';
import {
    Container,
    Grid,
    Card,
    CardContent,
    CardMedia,
    Typography,
    TextField,
    InputAdornment,
    Box,
    Chip,
} from '@mui/material';
import { Search } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { videoService } from '../../core/services';
import { useSnackbar } from '../../core/context/SnackbarContext.jsx';
import LoadingSpinner from '../../components/shared/LoadingSpinner';
import PaginationComponent from '../../components/shared/PaginationComponent';
import RatingStars from '../../components/shared/RatingStars';

/**
 * Public Videos Page
 * Browse all approved public videos
 */
const VideosPage = () => {
    const navigate = useNavigate();
    const { showError } = useSnackbar();

    const [videos, setVideos] = useState([]);
    const [pagination, setPagination] = useState(null);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [page, setPage] = useState(1);

    useEffect(() => {
        loadVideos();
        // eslint-disable-next-line
    }, [page, searchQuery]);

    const loadVideos = async () => {
        try {
            setLoading(true);
            const params = {
                page,
                limit: 12,
                ...(searchQuery && { search: searchQuery }),
            };

            const response = await videoService.getAllVideos(params);
            setVideos(response.data);
            setPagination(response.pagination);
        } catch (error) {
            showError('Failed to load videos');
        } finally {
            setLoading(false);
        }
    };

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
        setPage(1); // Reset to first page on search
    };

    const handleVideoClick = (videoId) => {
        navigate(`/video/${videoId}`);
    };

    if (loading && videos.length === 0) {
        return <LoadingSpinner fullScreen message="Loading videos..." />;
    }

    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            {/* Header */}
            <Box sx={{ mb: 4 }}>
                <Typography variant="h4" component="h1" gutterBottom>
                    Explore Videos
                </Typography>
                <Typography variant="body1" color="text.secondary" paragraph>
                    Discover educational content about ecology and environment
                </Typography>

                {/* Search */}
                <TextField
                    fullWidth
                    placeholder="Search videos..."
                    value={searchQuery}
                    onChange={handleSearchChange}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <Search />
                            </InputAdornment>
                        ),
                    }}
                    sx={{ maxWidth: 600 }}
                />
            </Box>

            {/* Videos Grid */}
            {videos.length === 0 ? (
                <Box sx={{ textAlign: 'center', py: 8 }}>
                    <Typography variant="h6" color="text.secondary">
                        No videos found
                    </Typography>
                </Box>
            ) : (
                <>
                    <Grid container spacing={3}>
                        {videos.map((video) => (
                            <Grid item xs={12} sm={6} md={4} key={video._id}>
                                <Card
                                    sx={{
                                        cursor: 'pointer',
                                        transition: 'transform 0.2s',
                                        '&:hover': {
                                            transform: 'translateY(-4px)',
                                            boxShadow: 4,
                                        },
                                    }}
                                    onClick={() => handleVideoClick(video._id)}
                                >
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
                                                mb: 1,
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
                                            <Typography variant="caption" color="text.secondary">
                                                By {video.autor_id?.name || 'Unknown'}
                                            </Typography>
                                            <Chip label={`${video.views || 0} views`} size="small" />
                                        </Box>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>

                    {/* Pagination */}
                    <PaginationComponent pagination={pagination} onPageChange={setPage} />
                </>
            )}
        </Container>
    );
};

export default VideosPage;

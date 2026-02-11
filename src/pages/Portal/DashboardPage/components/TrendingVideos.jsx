import React, { useEffect, useState } from 'react';
import {
    Card,
    CardHeader,
    CardContent,
    CardActionArea,
    Grid,
    Box,
    Typography,
    Chip,
    CardMedia,
    IconButton,
} from '@mui/material';
import { Link } from 'react-router-dom';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { statsService } from '../../../../core/services';
import { EmptyState, ErrorState } from '../../../../components/common';
import { VideoCardSkeleton, SkeletonGrid } from '../../../../components/shared/Skeletons';
import { VIDEO_CARD_LAYOUT } from '../../../../config/constants';

const TrendingVideos = ({ onVideoSelect }) => {
    const [videos, setVideos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const handleVideoClick = (e, videoId) => {
        if (onVideoSelect) {
            e.preventDefault();
            onVideoSelect(videoId);
        }
    };

    const fetchVideos = async () => {
        try {
            setLoading(true);
            setError(null);
            const trending = await statsService.getTrendingVideos(3);
            setVideos(trending);
        } catch (err) {
            console.error('Error fetching trending videos:', err);
            setError(err.message || 'Error al cargar videos');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchVideos();
    }, []);

    const formatDuration = (seconds) => {
        if (!seconds) return '0:00';
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    const getTimeAgo = (date) => {
        if (!date) return 'Reciente';
        const now = new Date();
        const videoDate = new Date(date);
        const diffDays = Math.floor((now - videoDate) / (1000 * 60 * 60 * 24));

        if (diffDays === 0) return 'Hoy';
        if (diffDays === 1) return 'Ayer';
        if (diffDays < 7) return `Hace ${diffDays} días`;
        if (diffDays < 30) return `Hace ${Math.floor(diffDays / 7)} semanas`;
        return `Hace ${Math.floor(diffDays / 30)} meses`;
    };

    return (
        <Card elevation={2}>
            <CardHeader
                title="Videos Populares"
                action={
                    <Link to="/portal/videos" style={{ textDecoration: 'none' }}>
                        <Typography
                            variant="body2"
                            color="primary"
                            sx={{ '&:hover': { textDecoration: 'underline' } }}
                        >
                            Ver todos
                        </Typography>
                    </Link>
                }
            />
            <CardContent>
                {error ? (
                    <ErrorState
                        title="Error al cargar videos"
                        message={error}
                        onRetry={fetchVideos}
                    />
                ) : loading ? (
                    <SkeletonGrid
                        SkeletonComponent={VideoCardSkeleton}
                        count={3}
                        gridProps={{ xs: 12, sm: 6, md: 4, lg: 3 }}
                    />
                ) : videos.length === 0 ? (
                    <EmptyState
                        type="videos"
                        title="No hay videos disponibles"
                        message="Sé el primero en subir un video a la plataforma"
                        actionLabel="Subir Video"
                        onAction={() => window.location.href = '/portal/upload-video'}
                    />
                ) : (
                    <Grid container spacing={2}>
                        {videos.map((video) => (
                            <Grid item xs={12} sm={6} md={4} lg={3} key={video._id} sx={{ display: 'flex' }}>
                                <Link
                                    to={`/portal/dashboard?videoId=${video._id}`}
                                    style={{ textDecoration: 'none', color: 'inherit', width: '100%' }}
                                    onClick={(e) => handleVideoClick(e, video._id)}
                                >
                                    <Card
                                        elevation={0}
                                        sx={{
                                            height: VIDEO_CARD_LAYOUT.HEIGHT,
                                            width: '100%',
                                            border: '1px solid',
                                            borderColor: 'divider',
                                            borderRadius: 2,
                                            overflow: 'hidden',
                                            display: 'flex',
                                            flexDirection: 'column',
                                        }}
                                    >
                                        <CardActionArea sx={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'stretch' }}>
                                            <Box
                                                sx={{
                                                    position: 'relative',
                                                    width: '100%',
                                                    aspectRatio: VIDEO_CARD_LAYOUT.THUMBNAIL_ASPECT_RATIO,
                                                    overflow: 'hidden',
                                                    '&:hover .play-overlay': { opacity: 1 },
                                                    '&:hover img': { transform: 'scale(1.05)' },
                                                }}
                                            >
                                                <CardMedia
                                                    component="img"
                                                    image={video.thumbnailUrl || video.thumbnail || VIDEO_CARD_LAYOUT.FALLBACK_THUMBNAIL}
                                                    alt={video.title}
                                                    sx={{
                                                        width: '100%',
                                                        height: '100%',
                                                        objectFit: 'cover',
                                                        transition: 'transform 0.3s ease',
                                                        bgcolor: 'grey.200',
                                                    }}
                                                />

                                                <Box
                                                    className="play-overlay"
                                                    sx={{
                                                        position: 'absolute',
                                                        top: 0,
                                                        left: 0,
                                                        right: 0,
                                                        bottom: 0,
                                                        bgcolor: 'rgba(0,0,0,0.3)',
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent: 'center',
                                                        opacity: 0,
                                                        transition: 'opacity 0.3s ease'
                                                    }}
                                                >
                                                    <IconButton
                                                        sx={{
                                                            bgcolor: 'primary.main',
                                                            color: 'white',
                                                            '&:hover': { bgcolor: 'primary.dark' }
                                                        }}
                                                    >
                                                        <PlayArrowIcon />
                                                    </IconButton>
                                                </Box>

                                                {video.duration && (
                                                    <Chip
                                                        icon={<AccessTimeIcon sx={{ fontSize: 14 }} />}
                                                        label={formatDuration(video.duration)}
                                                        size="small"
                                                        sx={{
                                                            position: 'absolute',
                                                            bottom: 8,
                                                            right: 8,
                                                            bgcolor: 'rgba(0,0,0,0.7)',
                                                            color: 'white',
                                                            fontSize: '0.75rem',
                                                            height: 24
                                                        }}
                                                    />
                                                )}
                                            </Box>

                                            <Box
                                                sx={{
                                                    p: 1.5,
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                    justifyContent: 'space-between',
                                                    flex: 1,
                                                    minHeight: 0,
                                                }}
                                            >
                                                <Typography
                                                    variant="body2"
                                                    sx={{
                                                        fontWeight: 600,
                                                        overflow: 'hidden',
                                                        textOverflow: 'ellipsis',
                                                        display: '-webkit-box',
                                                        WebkitLineClamp: 2,
                                                        WebkitBoxOrient: 'vertical',
                                                        lineHeight: 1.4,
                                                        minHeight: '2.8em'
                                                    }}
                                                >
                                                    {video.title}
                                                </Typography>

                                                <Box sx={{ display: 'flex', gap: 2, mt: 1 }}>
                                                    {video.categories?.length > 0 && (
                                                        <Chip
                                                            label={video.categories[0]}
                                                            size="small"
                                                            variant="outlined"
                                                            sx={{ fontSize: '0.7rem', height: 20, maxWidth: 120 }}
                                                        />
                                                    )}

                                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                                        <VisibilityIcon sx={{ fontSize: 14, color: 'text.secondary' }} />
                                                        <Typography variant="caption" color="text.secondary">
                                                            {video.views || 0}
                                                        </Typography>
                                                    </Box>
                                                </Box>

                                                <Typography
                                                    variant="caption"
                                                    color="text.secondary"
                                                    sx={{ display: 'block', mt: 0.5 }}
                                                >
                                                    {getTimeAgo(video.createdAt)}
                                                </Typography>
                                            </Box>
                                        </CardActionArea>
                                    </Card>
                                </Link>
                            </Grid>
                        ))}
                    </Grid>
                )}
            </CardContent>
        </Card>
    );
};

export default TrendingVideos;

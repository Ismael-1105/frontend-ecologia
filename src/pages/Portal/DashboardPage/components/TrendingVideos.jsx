import React, { useEffect, useState } from 'react';
import {
    Card,
    CardHeader,
    CardContent,
    CardActionArea,
    CardActions,
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
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownOutlinedIcon from '@mui/icons-material/ThumbDownOutlined';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import { statsService } from '../../../../core/services';
import { useAuth } from '../../../../core/context/AuthContext';
import { EmptyState, ErrorState } from '../../../../components/common';
import { VideoCardSkeleton, SkeletonGrid } from '../../../../components/shared/Skeletons';
import { VIDEO_CARD_LAYOUT } from '../../../../config/constants';

const TrendingVideos = ({ onVideoSelect, onLike, onDislike, videos: externalVideos, onVideosUpdate }) => {
    const { user } = useAuth();
    const [videos, setVideos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Use external videos if provided, otherwise manage internally
    const displayVideos = externalVideos || videos;
    const updateVideos = onVideosUpdate || setVideos;

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
            const trending = await statsService.getTrendingVideos(4);
            updateVideos(trending);
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
        <Card elevation={0} sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 3 }}>
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
                        count={4}
                        gridProps={{ xs: 12, sm: 6 }}
                    />
                ) : displayVideos.length === 0 ? (
                    <EmptyState
                        type="videos"
                        title="No hay videos disponibles"
                        message="Sé el primero en subir un video a la plataforma"
                        actionLabel="Subir Video"
                        onAction={() => window.location.href = '/portal/upload-video'}
                    />
                ) : (
                    <Grid container spacing={2}>
                        {displayVideos.map((video) => (
                            <Grid size={{ xs: 12, sm: 6 }} key={video._id} sx={{ display: 'flex' }}>
                                <Link
                                    to={`/portal/dashboard?videoId=${video._id}`}
                                    style={{ textDecoration: 'none', color: 'inherit', width: '100%' }}
                                    onClick={(e) => handleVideoClick(e, video._id)}
                                >
                                    <Card
                                        elevation={0}
                                        sx={{
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
                                                    <Box
                                                        sx={{
                                                            width: 48,
                                                            height: 48,
                                                            borderRadius: '50%',
                                                            bgcolor: 'primary.main',
                                                            color: 'white',
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            justifyContent: 'center',
                                                            transition: 'background-color 0.2s ease',
                                                            '&:hover': { bgcolor: 'primary.dark' }
                                                        }}
                                                    >
                                                        <PlayArrowIcon />
                                                    </Box>
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

                                        {/* Like/Dislike Actions */}
                                        <CardActions sx={{ gap: 1, p: 1 }}>
                                            {(() => {
                                                const hasLiked = video.likes?.includes(user?._id || user?.id);
                                                const hasDisliked = video.dislikes?.includes(user?._id || user?.id);
                                                return (
                                                    <>
                                                        <IconButton
                                                            size="small"
                                                            onClick={(e) => {
                                                                e.preventDefault();
                                                                e.stopPropagation();
                                                                if (onLike) onLike(video._id);
                                                            }}
                                                            color={hasLiked ? 'primary' : 'default'}
                                                        >
                                                            {hasLiked ? <ThumbUpIcon sx={{ fontSize: 18 }} /> : <ThumbUpOutlinedIcon sx={{ fontSize: 18 }} />}
                                                        </IconButton>
                                                        <Typography variant="caption">{video.likeCount || 0}</Typography>

                                                        <IconButton
                                                            size="small"
                                                            onClick={(e) => {
                                                                e.preventDefault();
                                                                e.stopPropagation();
                                                                if (onDislike) onDislike(video._id);
                                                            }}
                                                            color={hasDisliked ? 'error' : 'default'}
                                                        >
                                                            {hasDisliked ? <ThumbDownIcon sx={{ fontSize: 18 }} /> : <ThumbDownOutlinedIcon sx={{ fontSize: 18 }} />}
                                                        </IconButton>
                                                        <Typography variant="caption">{video.dislikeCount || 0}</Typography>
                                                    </>
                                                );
                                            })()}
                                        </CardActions>
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

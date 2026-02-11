import React from 'react';
import {
    Card,
    CardMedia,
    CardContent,
    CardActions,
    Typography,
    IconButton,
    Box,
    Skeleton,
    Chip,
    Stack,
} from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import { CategoryChip } from '../../../../components/Categories';
import { VIDEO_CARD_LAYOUT } from '../../../../config/constants';

const VideoCard = ({ video, loading, onPlay, onMenuOpen, formatDate }) => {
    if (loading) {
        return (
            <Card sx={{ height: VIDEO_CARD_LAYOUT.HEIGHT, width: '100%', display: 'flex', flexDirection: 'column' }}>
                <Skeleton variant="rectangular" sx={{ width: '100%', aspectRatio: VIDEO_CARD_LAYOUT.THUMBNAIL_ASPECT_RATIO }} />
                <CardContent sx={{ flexGrow: 1 }}>
                    <Skeleton variant="text" height={32} />
                    <Skeleton variant="text" />
                    <Skeleton variant="text" width="60%" />
                </CardContent>
            </Card>
        );
    }

    const thumbnailUrl = video?.thumbnailUrl || video?.thumbnail || VIDEO_CARD_LAYOUT.FALLBACK_THUMBNAIL;
    const title = video?.title || video?.titulo || 'Sin título';
    const description = video?.description || video?.descripcion || '';
    const createdAt = video?.createdAt || video?.fecha_creacion;
    const views = video?.views || 0;
    const likeCount = video?.likeCount || 0;
    const categories = video?.categories || [];

    return (
        <Card
            sx={{
                height: VIDEO_CARD_LAYOUT.HEIGHT,
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                transition: 'transform 0.2s, box-shadow 0.2s',
                '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: 4,
                },
            }}
        >
            {/* Thumbnail */}
            <Box sx={{ position: 'relative', width: '100%', aspectRatio: VIDEO_CARD_LAYOUT.THUMBNAIL_ASPECT_RATIO, overflow: 'hidden' }}>
                <CardMedia
                    component="img"
                    image={thumbnailUrl}
                    alt={title}
                    sx={{ width: '100%', height: '100%', objectFit: 'cover', cursor: 'pointer' }}
                    onClick={() => onPlay(video)}
                />
                <IconButton
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        bgcolor: 'rgba(0, 0, 0, 0.6)',
                        color: 'white',
                        '&:hover': {
                            bgcolor: 'rgba(0, 0, 0, 0.8)',
                        },
                    }}
                    onClick={() => onPlay(video)}
                >
                    <PlayArrowIcon fontSize="large" />
                </IconButton>
            </Box>

            {/* Content */}
            <CardContent sx={{ flexGrow: 1, pb: 1 }}>
                <Typography
                    gutterBottom
                    variant="h6"
                    component="h2"
                    sx={{
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        minHeight: '3.6em',
                    }}
                >
                    {title}
                </Typography>

                {description && (
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
                            minHeight: VIDEO_CARD_LAYOUT.DESCRIPTION_MIN_HEIGHT,
                        }}
                    >
                        {description}
                    </Typography>
                )}
                {!description && <Box sx={{ minHeight: VIDEO_CARD_LAYOUT.DESCRIPTION_MIN_HEIGHT, mb: 1 }} />}

                {/* Categories */}
                {categories.length > 0 && (
                    <Stack direction="row" spacing={0.5} flexWrap="wrap" useFlexGap sx={{ mb: 1 }}>
                        {categories.slice(0, 3).map((category) => (
                            <CategoryChip
                                key={category._id || category}
                                category={typeof category === 'string' ? { _id: category, name: category } : category}
                                size="small"
                            />
                        ))}
                        {categories.length > 3 && (
                            <Chip label={`+${categories.length - 3}`} size="small" variant="outlined" />
                        )}
                    </Stack>
                )}

                {/* Stats */}
                <Stack direction="row" spacing={2} sx={{ mt: 1 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        <VisibilityIcon fontSize="small" color="action" />
                        <Typography variant="caption" color="text.secondary">
                            {views}
                        </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        <ThumbUpIcon fontSize="small" color="action" />
                        <Typography variant="caption" color="text.secondary">
                            {likeCount}
                        </Typography>
                    </Box>
                </Stack>

                {createdAt && (
                    <Typography variant="caption" color="text.secondary" display="block" sx={{ mt: 1 }}>
                        {formatDate(createdAt)}
                    </Typography>
                )}
            </CardContent>

            {/* Actions */}
            <CardActions sx={{ justifyContent: 'space-between', pt: 0, mt: 'auto' }}>
                <IconButton
                    size="small"
                    onClick={() => onPlay(video)}
                    color="primary"
                >
                    <PlayArrowIcon />
                </IconButton>
                <IconButton
                    size="small"
                    onClick={(e) => onMenuOpen(e, video)}
                >
                    <MoreVertIcon />
                </IconButton>
            </CardActions>
        </Card>
    );
};

export default VideoCard;

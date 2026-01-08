import React from 'react';
import {
    Card,
    CardMedia,
    CardContent,
    Typography,
    Chip,
    Stack,
    Box,
    IconButton,
} from '@mui/material';
import {
    PlayArrow as PlayArrowIcon,
    Visibility as VisibilityIcon,
    ThumbUp as ThumbUpIcon,
    CheckCircle as CheckCircleIcon,
    Pending as PendingIcon,
} from '@mui/icons-material';
import { CategoryChip } from '../../../../components/Categories';

const VideoCard = ({ video, onClick }) => {
    const thumbnailUrl = video?.image || video?.thumbnailUrl || video?.thumbnail || '/logo192.png';
    const title = video?.title || video?.titulo || 'Sin título';
    const description = video?.description || video?.descripcion || '';
    const author = video?.author?.name || video?.autor_id?.name || 'Autor desconocido';
    const views = video?.views || 0;
    const likes = video?.likeCount || video?.likes?.length || 0;
    const isApproved = video?.approved || video?.aprobado || false;
    const categories = video?.categories || [];

    return (
        <Card
            sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                transition: 'transform 0.2s, box-shadow 0.2s',
                cursor: 'pointer',
                borderRadius: 3,
                '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: 6,
                },
            }}
            onClick={onClick}
        >
            {/* Thumbnail with Play Button */}
            <Box sx={{ position: 'relative' }}>
                <CardMedia
                    component="img"
                    height="200"
                    image={thumbnailUrl}
                    alt={title}
                    sx={{ objectFit: 'cover' }}
                />

                {/* Play Button Overlay */}
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
                >
                    <PlayArrowIcon fontSize="large" />
                </IconButton>

                {/* Status Badge */}
                <Chip
                    icon={isApproved ? <CheckCircleIcon /> : <PendingIcon />}
                    label={isApproved ? 'Aprobado' : 'Pendiente'}
                    color={isApproved ? 'success' : 'warning'}
                    size="small"
                    sx={{
                        position: 'absolute',
                        top: 8,
                        left: 8,
                        zIndex: 1,
                    }}
                />
            </Box>

            {/* Content */}
            <CardContent sx={{ flexGrow: 1, pb: 1 }}>
                <Typography
                    variant="h6"
                    component="h2"
                    gutterBottom
                    sx={{
                        fontWeight: 'bold',
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
                            mb: 2,
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            display: '-webkit-box',
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: 'vertical',
                        }}
                    >
                        {description}
                    </Typography>
                )}

                {/* Categories */}
                {categories.length > 0 && (
                    <Stack direction="row" spacing={0.5} flexWrap="wrap" useFlexGap sx={{ mb: 1 }}>
                        {categories.slice(0, 2).map((category, index) => (
                            <CategoryChip
                                key={category._id || category || index}
                                category={typeof category === 'string' ? { _id: category, name: category } : category}
                                size="small"
                            />
                        ))}
                        {categories.length > 2 && (
                            <Chip label={`+${categories.length - 2}`} size="small" variant="outlined" />
                        )}
                    </Stack>
                )}

                {/* Stats */}
                <Stack direction="row" spacing={2} alignItems="center" sx={{ mt: 1 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        <VisibilityIcon fontSize="small" color="action" />
                        <Typography variant="caption" color="text.secondary" fontWeight="medium">
                            {views} vistas
                        </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        <ThumbUpIcon fontSize="small" color="action" />
                        <Typography variant="caption" color="text.secondary" fontWeight="medium">
                            {likes} likes
                        </Typography>
                    </Box>
                </Stack>

                {/* Author */}
                <Typography variant="caption" color="text.secondary" display="block" sx={{ mt: 1, fontWeight: 500 }}>
                    Por: <strong>{author}</strong>
                </Typography>
            </CardContent>
        </Card>
    );
};

export default VideoCard;

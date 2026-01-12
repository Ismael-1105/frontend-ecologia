import React from 'react';
import {
    Card,
    CardMedia,
    CardContent,
    Typography,
    Box,
    IconButton,
    Chip,
} from '@mui/material';
import { MoreVert } from '@mui/icons-material';
import RatingStars from '../../../../components/shared/RatingStars';

/**
 * VideoCard Component
 * Displays individual video card with thumbnail, info, and actions
 */
const VideoCard = ({ video, onMenuOpen }) => {
    return (
        <Card>
            {/* Thumbnail */}
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
                {/* Title and Actions */}
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <Typography variant="h6" gutterBottom noWrap sx={{ flex: 1 }}>
                        {video.titulo}
                    </Typography>
                    <IconButton
                        size="small"
                        onClick={(e) => onMenuOpen(e, video)}
                        aria-label="video options"
                    >
                        <MoreVert />
                    </IconButton>
                </Box>

                {/* Description */}
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

                {/* Rating */}
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

                {/* Status and Views */}
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
    );
};

export default VideoCard;

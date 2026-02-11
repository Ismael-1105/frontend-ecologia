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
import { VIDEO_CARD_LAYOUT } from '../../../../config/constants';

/**
 * VideoCard Component
 * Displays individual video card with thumbnail, info, and actions
 */
const VideoCard = ({ video, onMenuOpen }) => {
    const thumbnailUrl = video.thumbnailUrl || video.thumbnail || VIDEO_CARD_LAYOUT.FALLBACK_THUMBNAIL;
    const title = video.titulo || video.title || 'Sin titulo';
    const description = video.descripcion || video.description || '';

    return (
        <Card
            sx={{
                height: VIDEO_CARD_LAYOUT.HEIGHT,
                minHeight: VIDEO_CARD_LAYOUT.HEIGHT,
                maxHeight: VIDEO_CARD_LAYOUT.HEIGHT,
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                overflow: 'hidden',
            }}
        >
            {/* Thumbnail */}
            <CardMedia
                component="div"
                sx={{
                    width: '100%',
                    height: VIDEO_CARD_LAYOUT.THUMBNAIL_HEIGHT,
                    minHeight: VIDEO_CARD_LAYOUT.THUMBNAIL_HEIGHT,
                    maxHeight: VIDEO_CARD_LAYOUT.THUMBNAIL_HEIGHT,
                    bgcolor: 'grey.300',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    overflow: 'hidden',
                    flexShrink: 0,
                }}
            >
                <img
                    src={thumbnailUrl}
                    alt={title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
            </CardMedia>

            <CardContent sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1, minHeight: 0 }}>
                {/* Title and Actions */}
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <Typography variant="h6" gutterBottom noWrap sx={{ flex: 1, minHeight: '1.6em' }}>
                        {title}
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
                        minHeight: VIDEO_CARD_LAYOUT.DESCRIPTION_MIN_HEIGHT,
                        maxHeight: VIDEO_CARD_LAYOUT.DESCRIPTION_MIN_HEIGHT,
                    }}
                >
                    {description}
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
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 'auto' }}>
                    <Typography variant="caption" color="text.secondary">
                        {video.views || 0} views
                    </Typography>
                </Box>
            </CardContent>
        </Card>
    );
};

export default VideoCard;

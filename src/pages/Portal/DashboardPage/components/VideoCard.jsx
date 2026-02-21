import React from 'react';
import {
    Card,
    CardContent,
    CardMedia,
    Typography,
    Box,
    IconButton,
    Grid,
} from '@mui/material';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import ThumbDownOutlinedIcon from '@mui/icons-material/ThumbDownOutlined';

const VideoCard = ({ video, onClick, onLike, onDislike }) => {
    const authorName = video.author || 'Anónimo';
    const likeCount = video.likeCount || video.likes?.length || 0;
    const dislikeCount = video.dislikeCount || video.dislikes?.length || 0;

    return (
        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
            <Card>
                <CardMedia
                    component="img"
                    image={video.image || video.thumbnailUrl || video.thumbnail || '/placeholder-video.jpg'}
                    alt={video.title}
                    sx={{ width: '100%', height: 200, objectFit: 'cover', cursor: 'pointer' }}
                    onClick={() => onClick?.(video)}
                />
                <CardContent>
                    <Typography variant="h6" gutterBottom onClick={() => onClick?.(video)} sx={{ cursor: 'pointer' }}>
                        {video.title}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" gutterBottom>
                        Por: {authorName}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                        {video.views || 0} vistas
                    </Typography>
                </CardContent>

                <Box sx={{ display: 'flex', gap: 1, p: 1 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        <IconButton size="small" onClick={() => onLike?.(video._id)}>
                            <ThumbUpOutlinedIcon fontSize="small" />
                        </IconButton>
                        <Typography variant="caption">{likeCount}</Typography>
                    </Box>

                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        <IconButton size="small" onClick={() => onDislike?.(video._id)}>
                            <ThumbDownOutlinedIcon fontSize="small" />
                        </IconButton>
                        <Typography variant="caption">{dislikeCount}</Typography>
                    </Box>
                </Box>
            </Card>
        </Grid>
    );
};

export default VideoCard;

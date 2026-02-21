import React from 'react';
import {
    Card,
    CardMedia,
    CardContent,
    CardActions,
    Typography,
    IconButton,
    Box,
    Button,
} from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import ThumbDownOutlinedIcon from '@mui/icons-material/ThumbDownOutlined';
import VisibilityIcon from '@mui/icons-material/Visibility';

const VideoCard = ({ video, loading, onPlay, onMenuOpen, formatDate, onLike, onDislike }) => {
    if (loading) {
        return <Card><CardContent><Typography>Cargando...</Typography></CardContent></Card>;
    }

    const thumbnailUrl = video?.thumbnailUrl || video?.thumbnail || '/placeholder-video.jpg';
    const title = video?.title || 'Sin título';
    const views = video?.views || 0;
    const likeCount = video?.likeCount || video?.likes?.length || 0;
    const dislikeCount = video?.dislikeCount || video?.dislikes?.length || 0;

    return (
        <Card>
            <CardMedia
                component="img"
                image={thumbnailUrl}
                alt={title}
                sx={{ width: '100%', height: 200, objectFit: 'cover' }}
            />
            <CardContent>
                <Typography variant="h6" gutterBottom>
                    {title}
                </Typography>
                <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', mb: 1 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        <VisibilityIcon fontSize="small" />
                        <Typography variant="caption">{views}</Typography>
                    </Box>
                </Box>
            </CardContent>
            <CardActions>
                <Button size="small" startIcon={<PlayArrowIcon />} onClick={() => onPlay(video)}>
                    Reproducir
                </Button>
                <IconButton size="small" onClick={() => onLike?.(video._id)}>
                    <ThumbUpOutlinedIcon fontSize="small" />
                </IconButton>
                <Typography variant="caption">{likeCount}</Typography>
                <IconButton size="small" onClick={() => onDislike?.(video._id)}>
                    <ThumbDownOutlinedIcon fontSize="small" />
                </IconButton>
                <Typography variant="caption">{dislikeCount}</Typography>
                <IconButton size="small" onClick={(e) => onMenuOpen(e, video)}>
                    <MoreVertIcon fontSize="small" />
                </IconButton>
            </CardActions>
        </Card>
    );
};

export default VideoCard;

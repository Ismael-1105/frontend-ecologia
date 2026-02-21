import React from 'react';
import {
    Card,
    CardMedia,
    CardContent,
    CardActions,
    Typography,
    IconButton,
    Button,
    Box,
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownOutlinedIcon from '@mui/icons-material/ThumbDownOutlined';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import { useAuth } from '../../../../core/context/AuthContext';

const VideoCard = ({ video, onMenuOpen, onLike, onDislike }) => {
    const { user } = useAuth();
    const thumbnailUrl = video.thumbnailUrl || video.thumbnail || '/placeholder-video.jpg';
    const title = video.titulo || video.title || 'Sin titulo';
    const views = video.views || 0;
    const likeCount = video.likeCount || video.likes?.length || 0;
    const dislikeCount = video.dislikeCount || video.dislikes?.length || 0;
    
    const hasLiked = video.likes?.includes(user?._id || user?.id);
    const hasDisliked = video.dislikes?.includes(user?._id || user?.id);

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
                <Typography variant="body2" color="textSecondary">
                    {views} vistas
                </Typography>
            </CardContent>
            <CardActions>
                <IconButton size="small" onClick={() => onLike?.(video._id)} color={hasLiked ? 'primary' : 'default'}>
                    {hasLiked ? <ThumbUpIcon fontSize="small" /> : <ThumbUpOutlinedIcon fontSize="small" />}
                </IconButton>
                <Typography variant="caption">{likeCount}</Typography>
                <IconButton size="small" onClick={() => onDislike?.(video._id)} color={hasDisliked ? 'error' : 'default'}>
                    {hasDisliked ? <ThumbDownIcon fontSize="small" /> : <ThumbDownOutlinedIcon fontSize="small" />}
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

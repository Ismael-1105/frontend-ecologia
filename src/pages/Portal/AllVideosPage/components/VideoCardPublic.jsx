import React from 'react';
import {
    Card,
    CardContent,
    CardMedia,
    Typography,
    Box,
    Button,
    IconButton,
} from '@mui/material';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownOutlinedIcon from '@mui/icons-material/ThumbDownOutlined';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import { useAuth } from '../../../../core/hooks/useAuth';

const VideoCardPublic = ({ video, onVideoSelect, onEdit, onDelete, onLike, onDislike }) => {
    const { user } = useAuth();

    const canManage = user && (
        user.role === 'Administrador' ||
        user.role === 'SuperAdmin' ||
        user._id === video.author?._id ||
        user.id === video.author?._id
    );

    const authorName = video.author?.name || 'Anónimo';
    const likeCount = video.likeCount || video.likes?.length || 0;
    const dislikeCount = video.dislikeCount || video.dislikes?.length || 0;
    const hasLiked = video.likes?.includes(user?._id || user?.id);
    const hasDisliked = video.dislikes?.includes(user?._id || user?.id);

    return (
        <Card>
            <CardMedia
                component="img"
                image={video.thumbnailUrl || video.thumbnail || '/placeholder-video.jpg'}
                alt={video.title}
                sx={{ width: '100%', height: 200, objectFit: 'cover', cursor: 'pointer' }}
                onClick={() => onVideoSelect?.(video._id)}
            />
            <CardContent>
                <Typography variant="h6" gutterBottom onClick={() => onVideoSelect?.(video._id)} sx={{ cursor: 'pointer' }}>
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
                    <IconButton size="small" onClick={() => onLike?.(video._id)} color={hasLiked ? 'primary' : 'default'}>
                        {hasLiked ? <ThumbUpIcon fontSize="small" /> : <ThumbUpOutlinedIcon fontSize="small" />}
                    </IconButton>
                    <Typography variant="caption">{likeCount}</Typography>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    <IconButton size="small" onClick={() => onDislike?.(video._id)} color={hasDisliked ? 'error' : 'default'}>
                        {hasDisliked ? <ThumbDownIcon fontSize="small" /> : <ThumbDownOutlinedIcon fontSize="small" />}
                    </IconButton>
                    <Typography variant="caption">{dislikeCount}</Typography>
                </Box>

                {canManage && (
                    <Box sx={{ ml: 'auto', display: 'flex', gap: 0.5 }}>
                        <IconButton size="small" onClick={() => onEdit?.(video)}>
                            <EditIcon fontSize="small" />
                        </IconButton>
                        <IconButton size="small" onClick={() => onDelete?.(video._id)}>
                            <DeleteIcon fontSize="small" />
                        </IconButton>
                    </Box>
                )}
            </Box>
        </Card>
    );
};

export default VideoCardPublic;

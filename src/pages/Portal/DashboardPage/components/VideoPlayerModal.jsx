import React, { useState, useEffect } from 'react';
import {
    Dialog,
    DialogContent,
    DialogTitle,
    IconButton,
    Box,
    Typography,
    Chip,
    Stack,
    Divider,
    CircularProgress,
    Alert,
} from '@mui/material';
import {
    Close as CloseIcon,
    ThumbUp,
    ThumbUpOutlined,
    ThumbDown,
    ThumbDownOutlined,
    Visibility,
} from '@mui/icons-material';
import { videoService } from '../../../../core/services';
import { useAuth } from '../../../../core/context/AuthContext.jsx';
import { CommentSection } from '../../../../components/Comments';

const VideoPlayerModal = ({ open, onClose, videoId }) => {
    const { user } = useAuth();
    const [video, setVideo] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);



    const fetchVideoDetails = React.useCallback(async () => {
        if (!videoId) return;

        setLoading(true);
        setError(null);

        try {
            const videoData = await videoService.getVideoById(videoId);

            console.log('Video data received:', videoData);

            if (!videoData) {
                setError("No se encontró información del video");
                return;
            }

            setVideo(videoData);
        } catch (err) {
            console.error("Error fetching video:", err);
            setError("Error al cargar el video");
        } finally {
            setLoading(false);
        }
    }, [videoId]);

    useEffect(() => {
        console.log("VIDEO ID:", videoId);

        if (open && videoId) {
            fetchVideoDetails();
        }
    }, [open, videoId, fetchVideoDetails]);
    const handleLike = async () => {
        if (!user) {
            alert('Debes iniciar sesión para dar like');
            return;
        }

        try {
            await videoService.likeVideo(videoId);
            fetchVideoDetails();
        } catch (err) {
            console.error('Error liking video:', err);
        }
    };

    const handleDislike = async () => {
        if (!user) {
            alert('Debes iniciar sesión para dar dislike');
            return;
        }

        try {
            await videoService.dislikeVideo(videoId);
            fetchVideoDetails();
        } catch (err) {
            console.error('Error disliking video:', err);
        }
    };

    const hasLiked = video?.likes?.includes(user?._id);
    const hasDisliked = video?.dislikes?.includes(user?._id);

    return (
        <Dialog
            open={open}
            onClose={onClose}
            maxWidth="lg"
            fullWidth
            PaperProps={{
                sx: {
                    height: '90vh',
                    maxHeight: '90vh',
                },
            }}
        >
            <DialogTitle sx={{ m: 0, p: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                Reproductor de Video
                <IconButton onClick={onClose}>
                    <CloseIcon />
                </IconButton>
            </DialogTitle>

            <DialogContent dividers sx={{ p: 0, height: '100%' }}>
                {loading ? (
                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                        <CircularProgress />
                    </Box>
                ) : error ? (
                    <Alert severity="error" sx={{ m: 2 }}>
                        {error}
                    </Alert>
                ) : video ? (
                    <Box sx={{ display: 'flex', height: '100%', overflow: 'hidden' }}>
                        {/* Left Side - Video Player */}
                        <Box sx={{
                            flex: '0 0 60%',
                            bgcolor: 'black',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            position: 'relative'
                        }}>
                            <video
                                controls
                                autoPlay
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'contain',
                                }}
                                src={video.videoUrl || video.url_video}
                            >
                                Tu navegador no soporta el elemento de video.
                            </video>
                        </Box>

                        {/* Right Side - Video Info */}
                        <Box sx={{
                            flex: '0 0 40%',
                            overflow: 'auto',
                            p: 3,
                            bgcolor: 'background.paper'
                        }}>
                            {/* Video Title and Stats */}
                            <Box sx={{ mb: 3 }}>
                                <Typography variant="h5" gutterBottom fontWeight="bold">
                                    {video.title || video.titulo || 'Sin título'}
                                </Typography>

                                <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 2, flexWrap: 'wrap', gap: 1 }}>
                                    {/* Views */}
                                    <Chip
                                        icon={<Visibility />}
                                        label={`${video.views || 0} vistas`}
                                        size="small"
                                        variant="outlined"
                                    />

                                    {/* Likes */}
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                        <IconButton
                                            size="small"
                                            onClick={handleLike}
                                            color={hasLiked ? 'primary' : 'default'}
                                        >
                                            {hasLiked ? <ThumbUp /> : <ThumbUpOutlined />}
                                        </IconButton>
                                        <Typography variant="body2">{video.likeCount || video.likes?.length || 0}</Typography>
                                    </Box>

                                    {/* Dislikes */}
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                        <IconButton
                                            size="small"
                                            onClick={handleDislike}
                                            color={hasDisliked ? 'error' : 'default'}
                                        >
                                            {hasDisliked ? <ThumbDown /> : <ThumbDownOutlined />}
                                        </IconButton>
                                        <Typography variant="body2">{video.dislikeCount || video.dislikes?.length || 0}</Typography>
                                    </Box>

                                    {/* Approval Status */}
                                    <Chip
                                        label={video.approved || video.aprobado ? 'Aprobado' : 'Pendiente'}
                                        color={video.approved || video.aprobado ? 'success' : 'warning'}
                                        size="small"
                                    />
                                </Stack>

                                {/* Description */}
                                {(video.description || video.descripcion) && (
                                    <Box sx={{ mb: 2 }}>
                                        <Divider sx={{ my: 2 }} />
                                        <Typography variant="subtitle2" gutterBottom fontWeight="bold">
                                            Descripción
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary" sx={{ whiteSpace: 'pre-wrap' }}>
                                            {video.description || video.descripcion}
                                        </Typography>
                                    </Box>
                                )}

                                {/* Author */}
                                <Divider sx={{ my: 2 }} />
                                <Box sx={{ mb: 2 }}>
                                    <Typography variant="body2" color="text.secondary">
                                        <strong>Autor:</strong> {video.author?.name || video.autor_id?.name || 'Desconocido'}
                                    </Typography>
                                    {video.author?.institution && (
                                        <Typography variant="caption" color="text.secondary" display="block">
                                            {video.author.institution}
                                        </Typography>
                                    )}
                                </Box>

                                {/* Duration */}
                                {video.duration && (
                                    <Typography variant="caption" color="text.secondary" display="block">
                                        <strong>Duración:</strong> {Math.floor(video.duration / 60)}:{String(video.duration % 60).padStart(2, '0')} min
                                    </Typography>
                                )}

                                {/* Created Date */}
                                {(video.createdAt || video.fecha_creacion) && (
                                    <Typography variant="caption" color="text.secondary" display="block">
                                        <strong>Publicado:</strong> {new Date(video.createdAt || video.fecha_creacion).toLocaleDateString('es-ES', {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric'
                                        })}
                                    </Typography>
                                )}
                            </Box>

                            {/* Comments Section */}
                            <Divider sx={{ my: 3 }} />
                            <CommentSection videoId={videoId} />
                        </Box>
                    </Box>
                ) : null}
            </DialogContent>
        </Dialog>
    );
};

export default VideoPlayerModal;

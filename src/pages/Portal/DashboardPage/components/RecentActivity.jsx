import React, { useState, useEffect } from 'react';
import {
    Card,
    CardContent,
    Typography,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Box,
    Chip,
} from '@mui/material';
import {
    VideoLibrary as VideoIcon,
    Forum as ForumIcon,
    Comment as CommentIcon,
    UploadFile as UploadIcon,
    AccessTime as TimeIcon
} from '@mui/icons-material';
import { useAuth } from '../../../../core/context/AuthContext';
import apiClient from '../../../../core/api/client';
import { ActivityListSkeleton } from '../../../../components/shared/Skeletons';

const RecentActivity = () => {
    const { user } = useAuth();
    const [activities, setActivities] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchRecentActivity = async () => {
            try {
                setLoading(true);
                const allActivities = [];

                // Fetch recent videos
                try {
                    const videosResponse = await apiClient.get('/videos', {
                        params: { userId: user._id, limit: 3 }
                    });
                    const videos = videosResponse.data?.data || [];
                    videos.forEach(video => {
                        allActivities.push({
                            type: 'video',
                            icon: VideoIcon,
                            color: 'primary',
                            title: 'Subió un video',
                            subtitle: video.title,
                            time: video.createdAt
                        });
                    });
                } catch (error) {
                    console.error('Error fetching videos:', error);
                }

                // Fetch recent posts
                try {
                    const postsResponse = await apiClient.get(`/posts/author/${user._id}`);
                    const posts = (postsResponse.data?.data || []).slice(0, 3);
                    posts.forEach(post => {
                        allActivities.push({
                            type: 'post',
                            icon: ForumIcon,
                            color: 'secondary',
                            title: 'Creó una discusión',
                            subtitle: post.title,
                            time: post.createdAt
                        });
                    });
                } catch (error) {
                    console.error('Error fetching posts:', error);
                }

                // Fetch recent uploads
                try {
                    const uploadsResponse = await apiClient.get('/uploads');
                    const allUploads = uploadsResponse.data?.data || [];
                    const userUploads = allUploads
                        .filter(upload => {
                            const uploaderId = upload.uploadedBy?._id || upload.uploadedBy;
                            return uploaderId && uploaderId.toString() === user._id.toString();
                        })
                        .slice(0, 3);

                    userUploads.forEach(upload => {
                        allActivities.push({
                            type: 'upload',
                            icon: UploadIcon,
                            color: 'warning',
                            title: 'Compartió un recurso',
                            subtitle: upload.title,
                            time: upload.createdAt
                        });
                    });
                } catch (error) {
                    console.error('Error fetching uploads:', error);
                }

                // Sort by time and take top 5
                allActivities.sort((a, b) => new Date(b.time) - new Date(a.time));
                setActivities(allActivities.slice(0, 5));
            } catch (error) {
                console.error('Error fetching recent activity:', error);
            } finally {
                setLoading(false);
            }
        };

        if (user?._id) {
            fetchRecentActivity();
        }
    }, [user]);

    const formatTimeAgo = (dateString) => {
        const date = new Date(dateString);
        const now = new Date();
        const diffInSeconds = Math.floor((now - date) / 1000);

        if (diffInSeconds < 60) return 'Hace un momento';
        if (diffInSeconds < 3600) return `Hace ${Math.floor(diffInSeconds / 60)} min`;
        if (diffInSeconds < 86400) return `Hace ${Math.floor(diffInSeconds / 3600)} h`;
        if (diffInSeconds < 604800) return `Hace ${Math.floor(diffInSeconds / 86400)} días`;
        return date.toLocaleDateString();
    };

    return (
        <Card
            elevation={0}
            sx={{
                border: '1px solid',
                borderColor: 'divider',
                borderRadius: 3
            }}
        >
            <CardContent sx={{ p: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2.5 }}>
                    <TimeIcon sx={{ mr: 1.5, color: 'primary.main', fontSize: 28 }} />
                    <Typography variant="h6" sx={{ fontWeight: 700, fontSize: '1.15rem' }}>
                        Mi Actividad Reciente
                    </Typography>
                </Box>

                {loading ? (
                    <ActivityListSkeleton count={5} />
                ) : activities.length === 0 ? (
                    <Box sx={{ textAlign: 'center', py: 4 }}>
                        <Typography variant="body2" color="text.secondary">
                            No hay actividad reciente
                        </Typography>
                    </Box>
                ) : (
                    <List disablePadding>
                        {activities.map((activity, index) => {
                            const Icon = activity.icon;
                            return (
                                <ListItem
                                    key={index}
                                    sx={{
                                        px: 0,
                                        py: 2,
                                        borderBottom: index < activities.length - 1 ? '1px solid' : 'none',
                                        borderColor: 'divider'
                                    }}
                                >
                                    <ListItemIcon sx={{ minWidth: 44 }}>
                                        <Icon color={activity.color} />
                                    </ListItemIcon>
                                    <ListItemText
                                        primary={
                                            <Typography variant="body2" sx={{ fontWeight: 600 }}>
                                                {activity.title}
                                            </Typography>
                                        }
                                        secondaryTypographyProps={{ component: 'div' }}
                                        secondary={
                                            <Box>
                                                <Typography
                                                    variant="body2"
                                                    color="text.secondary"
                                                    sx={{
                                                        display: 'block',
                                                        overflow: 'hidden',
                                                        textOverflow: 'ellipsis',
                                                        whiteSpace: 'nowrap',
                                                        fontSize: '0.85rem',
                                                        mt: 0.25
                                                    }}
                                                >
                                                    {activity.subtitle}
                                                </Typography>
                                                <Typography variant="caption" color="text.disabled" sx={{ fontSize: '0.75rem', mt: 0.5, display: 'block' }}>
                                                    {formatTimeAgo(activity.time)}
                                                </Typography>
                                            </Box>
                                        }
                                    />
                                </ListItem>
                            );
                        })}
                    </List>
                )}
            </CardContent>
        </Card>
    );
};

export default RecentActivity;

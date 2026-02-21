import React, { useState, useEffect } from 'react';
import {
    Card,
    CardContent,
    Typography,
    List,
    ListItem,
    ListItemText,
    ListItemAvatar,
    Avatar,
    Chip,
    Box,
} from '@mui/material';
import {
    Whatshot as WhatshotIcon,
    TrendingUp as TrendingUpIcon,
    Visibility as VisibilityIcon
} from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { TrendingPostSkeleton } from '../../../../components/shared/Skeletons';
import { getTrendingPosts } from '../../../../core/api/postService';

const TrendingPosts = ({ timeframe = 7, limit = 5, category = null }) => {
    const [trendingPosts, setTrendingPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchTrendingPosts();

        // Refresh every 5 minutes
        const interval = setInterval(fetchTrendingPosts, 5 * 60 * 1000);
        return () => clearInterval(interval);
    }, [timeframe, limit, category]);

    const fetchTrendingPosts = async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await getTrendingPosts({ limit, timeframe, category });
            if (response.success) {
                setTrendingPosts(response.data);
            }
        } catch (err) {
            console.error('Error fetching trending posts:', err);
            setError('Error al cargar posts trending');
        } finally {
            setLoading(false);
        }
    };

    const cardSx = { border: '1px solid', borderColor: 'divider', borderRadius: 3 };

    if (loading) {
        return (
            <Card elevation={0} sx={cardSx}>
                <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        <WhatshotIcon sx={{ color: 'error.main', mr: 1, fontSize: 28 }} />
                        <Typography variant="h6" fontWeight="bold">
                            Trending
                        </Typography>
                    </Box>
                    <TrendingPostSkeleton count={3} />
                </CardContent>
            </Card>
        );
    }

    if (error || trendingPosts.length === 0) {
        return (
            <Card elevation={0} sx={cardSx}>
                <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        <WhatshotIcon sx={{ color: 'error.main', mr: 1, fontSize: 28 }} />
                        <Typography variant="h6" fontWeight="bold">
                            Trending
                        </Typography>
                    </Box>
                    <Box sx={{ textAlign: 'center', py: 3 }}>
                        <Typography variant="body2" color="text.secondary">
                            No hay posts trending aún
                        </Typography>
                    </Box>
                </CardContent>
            </Card>
        );
    }

    return (
        <Card elevation={0} sx={cardSx}>
            <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <WhatshotIcon sx={{ color: 'error.main', mr: 1, fontSize: 28 }} />
                    <Typography variant="h6" fontWeight="bold">
                        Trending
                    </Typography>
                    <Chip
                        label={`${timeframe} días`}
                        size="small"
                        sx={{ ml: 'auto' }}
                        variant="outlined"
                    />
                </Box>

                <List disablePadding>
                    {trendingPosts.map((post, index) => (
                        <ListItem
                            key={post._id}
                            component={Link}
                            to={`/portal/foro/${post._id}`}
                            sx={{
                                textDecoration: 'none',
                                color: 'inherit',
                                '&:hover': {
                                    bgcolor: 'action.hover'
                                },
                                borderRadius: 1,
                                mb: 1,
                                p: 1.5
                            }}
                        >
                            <ListItemAvatar>
                                <Avatar
                                    sx={{
                                        bgcolor: index === 0 ? 'error.main' : 'primary.main',
                                        fontWeight: 'bold'
                                    }}
                                >
                                    {index + 1}
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText
                                primary={post.title}
                                secondaryTypographyProps={{ component: 'div' }}
                                secondary={
                                    <Box sx={{ display: 'flex', gap: 1, mt: 0.5, flexWrap: 'wrap' }}>
                                        <Chip
                                            icon={<TrendingUpIcon />}
                                            label={`${post.likeCount || 0} likes`}
                                            size="small"
                                            variant="outlined"
                                            color="primary"
                                        />
                                        <Chip
                                            icon={<VisibilityIcon />}
                                            label={`${post.views || 0} vistas`}
                                            size="small"
                                            variant="outlined"
                                        />
                                    </Box>
                                }
                                primaryTypographyProps={{
                                    fontWeight: 500,
                                    noWrap: true,
                                    fontSize: '0.95rem'
                                }}
                            />
                        </ListItem>
                    ))}
                </List>
            </CardContent>
        </Card>
    );
};

export default TrendingPosts;

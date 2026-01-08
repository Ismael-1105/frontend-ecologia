import React from 'react';
import {
    Card,
    CardContent,
    Avatar,
    Typography,
    Box,
    Stack,
    Chip,
    Divider,
} from '@mui/material';
import {
    VideoLibrary as VideoIcon,
    Visibility as ViewsIcon,
    ThumbUp as LikesIcon,
    Comment as CommentIcon,
    EmojiEvents as TrophyIcon,
} from '@mui/icons-material';
import { BadgeList } from '../Badges';

/**
 * UserProfileCard Component
 * Displays user profile information with stats and badges
 */
const UserProfileCard = ({ user, showStats = true, showBadges = true }) => {
    if (!user) return null;

    const stats = [
        { icon: <VideoIcon />, label: 'Videos', value: user.videoCount || 0 },
        { icon: <ViewsIcon />, label: 'Vistas', value: user.totalViews || 0 },
        { icon: <LikesIcon />, label: 'Likes', value: user.totalLikes || 0 },
        { icon: <CommentIcon />, label: 'Comentarios', value: user.commentCount || 0 },
    ];

    return (
        <Card sx={{ borderRadius: 3 }}>
            <CardContent>
                {/* User Header */}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                    <Avatar
                        src={user.profilePicture || user.avatar}
                        alt={user.name}
                        sx={{ width: 80, height: 80 }}
                    >
                        {user.name?.[0]?.toUpperCase()}
                    </Avatar>

                    <Box sx={{ flex: 1 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                            <Typography variant="h5" fontWeight="bold">
                                {user.name}
                            </Typography>
                            {user.verified && (
                                <Chip
                                    icon={<TrophyIcon />}
                                    label="Verificado"
                                    size="small"
                                    color="primary"
                                    variant="outlined"
                                />
                            )}
                        </Box>

                        {user.email && (
                            <Typography variant="body2" color="text.secondary">
                                {user.email}
                            </Typography>
                        )}

                        {user.role && (
                            <Chip
                                label={user.role}
                                size="small"
                                sx={{ mt: 1 }}
                                color={user.role === 'Administrador' ? 'error' : 'default'}
                            />
                        )}
                    </Box>
                </Box>

                {/* Bio */}
                {user.bio && (
                    <>
                        <Divider sx={{ my: 2 }} />
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                            {user.bio}
                        </Typography>
                    </>
                )}

                {/* Additional Info */}
                {(user.location || user.website) && (
                    <>
                        <Divider sx={{ my: 2 }} />
                        <Stack spacing={0.5}>
                            {user.location && (
                                <Typography variant="caption" color="text.secondary">
                                    📍 {user.location}
                                </Typography>
                            )}
                            {user.website && (
                                <Typography variant="caption" color="text.secondary">
                                    🔗 {user.website}
                                </Typography>
                            )}
                        </Stack>
                    </>
                )}

                {/* Stats */}
                {showStats && (
                    <>
                        <Divider sx={{ my: 2 }} />
                        <Stack direction="row" spacing={3} justifyContent="space-around">
                            {stats.map((stat, index) => (
                                <Box key={index} sx={{ textAlign: 'center' }}>
                                    <Box sx={{ color: 'primary.main', mb: 0.5 }}>{stat.icon}</Box>
                                    <Typography variant="h6" fontWeight="bold">
                                        {stat.value}
                                    </Typography>
                                    <Typography variant="caption" color="text.secondary">
                                        {stat.label}
                                    </Typography>
                                </Box>
                            ))}
                        </Stack>
                    </>
                )}

                {/* Badges */}
                {showBadges && user.badges && user.badges.length > 0 && (
                    <>
                        <Divider sx={{ my: 2 }} />
                        <Box>
                            <Typography variant="subtitle2" gutterBottom>
                                Logros
                            </Typography>
                            <BadgeList badges={user.badges} maxDisplay={6} />
                        </Box>
                    </>
                )}
            </CardContent>
        </Card>
    );
};

export default UserProfileCard;

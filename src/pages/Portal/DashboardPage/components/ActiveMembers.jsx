import React, { useState, useEffect } from 'react';
import {
    Card,
    CardHeader,
    CardContent,
    List,
    ListItem,
    Avatar,
    Box,
    Typography,
    Chip,
    Skeleton
} from '@mui/material';
import { TrendingUp as TrendingUpIcon } from '@mui/icons-material';
import userService from '../../../../core/services/userService';

const ActiveMembers = () => {
    const [members, setMembers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchActiveMembers = async () => {
            try {
                const response = await userService.getAllUsers();
                const users = response.data || response || [];

                // Map and sort by postCount (most active first), take top 5
                const sorted = users
                    .map(user => ({
                        id: user._id,
                        name: user.name,
                        role: user.role,
                        profilePicture: user.profilePicture,
                        posts: user.postCount || 0,
                    }))
                    .sort((a, b) => b.posts - a.posts)
                    .slice(0, 5);

                setMembers(sorted);
            } catch (error) {
                console.error('Error al cargar miembros activos:', error);
                setMembers([]);
            } finally {
                setLoading(false);
            }
        };

        fetchActiveMembers();
    }, []);

    const getInitials = (name) => {
        return name
            .split(' ')
            .map(n => n[0])
            .join('')
            .toUpperCase();
    };

    return (
        <Card elevation={0} sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 3 }}>
            <CardHeader
                avatar={<TrendingUpIcon color="primary" />}
                title="Miembros Activos"
                titleTypographyProps={{ variant: 'h6', fontWeight: 700 }}
            />
            <CardContent sx={{ pt: 0 }}>
                <List sx={{ py: 0 }}>
                    {loading ? (
                        Array.from(new Array(5)).map((_, index) => (
                            <ListItem
                                key={index}
                                sx={{
                                    px: 0,
                                    py: 1.5,
                                    borderBottom: index < 4 ? '1px solid' : 'none',
                                    borderColor: 'divider'
                                }}
                            >
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, width: '100%' }}>
                                    <Skeleton variant="text" width={20} />
                                    <Skeleton variant="circular" width={36} height={36} />
                                    <Box sx={{ flex: 1 }}>
                                        <Skeleton variant="text" width="70%" />
                                        <Skeleton variant="text" width="40%" height={14} />
                                    </Box>
                                </Box>
                            </ListItem>
                        ))
                    ) : members.length === 0 ? (
                        <Box sx={{ textAlign: 'center', py: 3 }}>
                            <Typography variant="body2" color="text.secondary">
                                No hay miembros aún
                            </Typography>
                        </Box>
                    ) : (
                        members.map((member, index) => (
                            <ListItem
                                key={member.id}
                                sx={{
                                    px: 0,
                                    py: 1.5,
                                    borderBottom: index < members.length - 1 ? '1px solid' : 'none',
                                    borderColor: 'divider'
                                }}
                            >
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, width: '100%' }}>
                                    <Typography
                                        variant="body2"
                                        color="text.secondary"
                                        sx={{ fontWeight: 600, minWidth: 20 }}
                                    >
                                        {index + 1}
                                    </Typography>
                                    <Avatar
                                        src={member.profilePicture}
                                        sx={{
                                            width: 36,
                                            height: 36,
                                            bgcolor: 'primary.main',
                                            fontSize: '0.875rem'
                                        }}
                                    >
                                        {getInitials(member.name)}
                                    </Avatar>
                                    <Box sx={{ flex: 1, minWidth: 0 }}>
                                        <Typography
                                            variant="body2"
                                            sx={{
                                                fontWeight: 600,
                                                overflow: 'hidden',
                                                textOverflow: 'ellipsis',
                                                whiteSpace: 'nowrap'
                                            }}
                                        >
                                            {member.name}
                                        </Typography>
                                        <Typography variant="caption" color="text.secondary">
                                            {member.role}
                                        </Typography>
                                    </Box>
                                    <Chip
                                        label={`${member.posts} posts`}
                                        size="small"
                                        variant="outlined"
                                        sx={{ fontSize: '0.7rem', height: 24 }}
                                    />
                                </Box>
                            </ListItem>
                        ))
                    )}
                </List>
            </CardContent>
        </Card>
    );
};

export default ActiveMembers;

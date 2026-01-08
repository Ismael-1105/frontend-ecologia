import React from 'react';
import {
    Card,
    CardHeader,
    CardContent,
    List,
    ListItem,
    Avatar,
    Box,
    Typography,
    Chip
} from '@mui/material';
import { TrendingUp as TrendingUpIcon } from '@mui/icons-material';

const mockMembers = [
    { name: 'Carlos Mendoza', avatar: '/avatars/carlos.jpg', posts: 45, role: 'Docente' },
    { name: 'Ana Córdova', avatar: '/avatars/ana.jpg', posts: 38, role: 'Docente' },
    { name: 'Luis Armijos', avatar: '/avatars/luis.jpg', posts: 32, role: 'Estudiante' },
    { name: 'Rosa Palacios', avatar: '/avatars/rosa.jpg', posts: 28, role: 'Docente' },
    { name: 'Pedro Sánchez', avatar: '/avatars/pedro.jpg', posts: 25, role: 'Estudiante' }
];

const ActiveMembers = () => {
    const getInitials = (name) => {
        return name
            .split(' ')
            .map(n => n[0])
            .join('')
            .toUpperCase();
    };

    return (
        <Card elevation={2}>
            <CardHeader
                avatar={<TrendingUpIcon color="primary" />}
                title="Miembros Activos"
                titleTypographyProps={{ variant: 'h6', fontWeight: 700 }}
            />
            <CardContent sx={{ pt: 0 }}>
                <List sx={{ py: 0 }}>
                    {mockMembers.map((member, index) => (
                        <ListItem
                            key={member.name}
                            sx={{
                                px: 0,
                                py: 1.5,
                                borderBottom: index < mockMembers.length - 1 ? '1px solid' : 'none',
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
                    ))}
                </List>
            </CardContent>
        </Card>
    );
};

export default ActiveMembers;

import React from 'react';
import {
    Card,
    CardContent,
    Box,
    Typography,
    Avatar,
    Chip,
    Button,
    Stack
} from '@mui/material';
import {
    Videocam as VideocamIcon,
    Comment as CommentIcon,
    Star as StarIcon
} from '@mui/icons-material';

const MemberCard = ({ member }) => {
    const getInitials = (name) => {
        return name
            .split(' ')
            .map(n => n[0])
            .join('')
            .toUpperCase()
            .slice(0, 2);
    };

    const getRoleColor = (role) => {
        switch (role) {
            case 'Docente':
                return 'primary';
            case 'Estudiante':
                return 'secondary';
            case 'Administrador':
                return 'error';
            default:
                return 'default';
        }
    };

    return (
        <Card
            elevation={1}
            sx={{
                '&:hover': {
                    boxShadow: 3,
                    transform: 'translateY(-2px)'
                },
                transition: 'all 0.2s ease'
            }}
        >
            <CardContent>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                    {/* Avatar */}
                    <Avatar
                        sx={{
                            width: 80,
                            height: 80,
                            bgcolor: 'primary.main',
                            fontSize: '1.5rem',
                            mb: 2
                        }}
                    >
                        {getInitials(member.name)}
                    </Avatar>

                    {/* Name */}
                    <Typography variant="h6" sx={{ fontWeight: 600, mb: 0.5 }}>
                        {member.name}
                    </Typography>

                    {/* Role */}
                    <Chip
                        label={member.role}
                        color={getRoleColor(member.role)}
                        size="small"
                        sx={{ mb: 2 }}
                    />

                    {/* Institution */}
                    {member.institution && (
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                            {member.institution}
                        </Typography>
                    )}

                    {/* Stats */}
                    <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
                        <Box sx={{ textAlign: 'center' }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, justifyContent: 'center' }}>
                                <VideocamIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
                                <Typography variant="h6" sx={{ fontWeight: 700 }}>
                                    {member.videos}
                                </Typography>
                            </Box>
                            <Typography variant="caption" color="text.secondary">
                                Videos
                            </Typography>
                        </Box>
                        <Box sx={{ textAlign: 'center' }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, justifyContent: 'center' }}>
                                <CommentIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
                                <Typography variant="h6" sx={{ fontWeight: 700 }}>
                                    {member.posts}
                                </Typography>
                            </Box>
                            <Typography variant="caption" color="text.secondary">
                                Posts
                            </Typography>
                        </Box>
                    </Stack>

                    {/* Action Button */}
                    <Button
                        variant="outlined"
                        size="small"
                        fullWidth
                        sx={{ borderRadius: 2 }}
                    >
                        Ver Perfil
                    </Button>
                </Box>
            </CardContent>
        </Card>
    );
};

export default MemberCard;

import React, { useState, useEffect } from 'react';
import { Card, CardContent, Box, Avatar, Button, Typography, Chip } from '@mui/material';
import { PhotoCamera, VerifiedUser, School } from '@mui/icons-material';

const ProfileHeader = ({ user, onOpenUploadModal }) => {
    const [imageTimestamp, setImageTimestamp] = useState(Date.now());

    // Update timestamp when profilePicture changes to bust cache
    useEffect(() => {
        if (user.profilePicture) {
            setImageTimestamp(Date.now());
        }
    }, [user.profilePicture]);

    return (
        <Card sx={{ borderRadius: 3, overflow: 'hidden', boxShadow: 3 }}>
            {/* Cover Image / Gradient */}
            <Box
                sx={{
                    height: 120,
                    background: 'linear-gradient(135deg, #2E7D32 0%, #81c784 100%)',
                    position: 'relative'
                }}
            />

            <CardContent sx={{ textAlign: 'center', pt: 0, mt: -6 }}>
                <Box sx={{ position: 'relative', display: 'inline-block' }}>
                    <Avatar
                        sx={{
                            width: 120,
                            height: 120,
                            mx: 'auto',
                            border: '4px solid white',
                            boxShadow: 2,
                            bgcolor: 'primary.main',
                            fontSize: '3rem'
                        }}
                        src={user.profilePicture ? `${user.profilePicture}?t=${imageTimestamp}` : undefined}
                    >
                        {user.name?.[0]?.toUpperCase()}
                    </Avatar>
                </Box>

                <Box sx={{ mt: 2 }}>
                    <Typography variant="h5" fontWeight="bold" gutterBottom>
                        {user.name}
                    </Typography>

                    <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1, flexWrap: 'wrap', mb: 2 }}>
                        <Chip
                            icon={<VerifiedUser sx={{ fontSize: 16 }} />}
                            label={user.role}
                            color="primary"
                            variant="outlined"
                            size="small"
                        />
                        {user.institution && (
                            <Chip
                                icon={<School sx={{ fontSize: 16 }} />}
                                label={user.institution}
                                variant="outlined"
                                size="small"
                            />
                        )}
                    </Box>

                    <Button
                        variant="outlined"
                        startIcon={<PhotoCamera />}
                        onClick={onOpenUploadModal}
                        size="small"
                        sx={{ mt: 1 }}
                    >
                        Cambiar Foto
                    </Button>
                </Box>
            </CardContent>
        </Card>
    );
};

export default ProfileHeader;

import React, { useState, useEffect } from 'react';
import { Card, CardContent, Box, Avatar, IconButton, Typography, Chip } from '@mui/material';
import { PhotoCamera, VerifiedUser, School } from '@mui/icons-material';

const ProfileHeader = ({ user, onProfilePictureChange }) => {
    const [imageTimestamp, setImageTimestamp] = useState(Date.now());

    // Update timestamp when profilePicture changes to bust cache
    useEffect(() => {
        if (user.profilePicture) {
            const newTimestamp = Date.now();
            setImageTimestamp(newTimestamp);
            console.log('🖼️ ProfileHeader: Profile picture updated');
            console.log('URL:', user.profilePicture);
            console.log('Cache-bust timestamp:', newTimestamp);
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
                    <input
                        accept="image/*"
                        style={{ display: 'none' }}
                        id="profile-picture-upload"
                        type="file"
                        onChange={onProfilePictureChange}
                    />
                    <label htmlFor="profile-picture-upload">
                        <IconButton
                            component="span"
                            sx={{
                                position: 'absolute',
                                bottom: 5,
                                right: 5,
                                bgcolor: 'white',
                                color: 'primary.main',
                                boxShadow: 2,
                                '&:hover': { bgcolor: 'grey.100' },
                                width: 36,
                                height: 36
                            }}
                            size="small"
                        >
                            <PhotoCamera fontSize="small" />
                        </IconButton>
                    </label>
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
                </Box>
            </CardContent>
        </Card>
    );
};

export default ProfileHeader;

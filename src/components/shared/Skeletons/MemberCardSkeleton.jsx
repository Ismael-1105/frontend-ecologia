import React from 'react';
import {
    Card,
    CardContent,
    Box,
    Skeleton,
} from '@mui/material';

/**
 * MemberCardSkeleton Component
 * Loading skeleton that matches the structure of MemberCard component
 * Used in: ComunidadPage
 */
const MemberCardSkeleton = () => {
    return (
        <Card
            elevation={1}
            sx={{
                transition: 'all 0.2s ease',
                textAlign: 'center'
            }}
        >
            <CardContent>
                {/* Avatar Skeleton */}
                <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
                    <Skeleton
                        variant="circular"
                        width={80}
                        height={80}
                        animation="wave"
                    />
                </Box>

                {/* Name Skeleton */}
                <Skeleton
                    variant="text"
                    height={28}
                    sx={{ mb: 0.5, mx: 'auto' }}
                    width="70%"
                    animation="wave"
                />

                {/* Role Skeleton */}
                <Skeleton
                    variant="text"
                    height={20}
                    width="50%"
                    sx={{ mb: 0.5, mx: 'auto' }}
                    animation="wave"
                />

                {/* Institution Skeleton */}
                <Skeleton
                    variant="text"
                    height={20}
                    width="80%"
                    sx={{ mb: 2, mx: 'auto' }}
                    animation="wave"
                />

                {/* Stats Skeleton */}
                <Box sx={{ display: 'flex', justifyContent: 'space-around', mt: 2 }}>
                    <Box sx={{ textAlign: 'center' }}>
                        <Skeleton
                            variant="text"
                            width={40}
                            height={32}
                            sx={{ mx: 'auto' }}
                            animation="wave"
                        />
                        <Skeleton
                            variant="text"
                            width={50}
                            height={20}
                            sx={{ mx: 'auto' }}
                            animation="wave"
                        />
                    </Box>
                    <Box sx={{ textAlign: 'center' }}>
                        <Skeleton
                            variant="text"
                            width={40}
                            height={32}
                            sx={{ mx: 'auto' }}
                            animation="wave"
                        />
                        <Skeleton
                            variant="text"
                            width={50}
                            height={20}
                            sx={{ mx: 'auto' }}
                            animation="wave"
                        />
                    </Box>
                </Box>
            </CardContent>
        </Card>
    );
};

export default MemberCardSkeleton;

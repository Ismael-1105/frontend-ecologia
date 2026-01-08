import React from 'react';
import { Box, Tooltip, Typography } from '@mui/material';

/**
 * BadgeIcon Component
 * Displays a badge with icon and tooltip
 */
const BadgeIcon = ({ badge, size = 'medium', showName = false }) => {
    if (!badge) return null;

    const sizes = {
        small: 24,
        medium: 40,
        large: 56,
    };

    const iconSize = sizes[size] || sizes.medium;

    const badgeContent = (
        <Box
            sx={{
                display: 'inline-flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 0.5,
            }}
        >
            <Box
                sx={{
                    width: iconSize,
                    height: iconSize,
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: iconSize * 0.6,
                    background: badge.color || 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    boxShadow: 2,
                    transition: 'transform 0.2s',
                    '&:hover': {
                        transform: 'scale(1.1)',
                    },
                }}
            >
                {badge.icon || '🏆'}
            </Box>
            {showName && (
                <Typography variant="caption" sx={{ textAlign: 'center', maxWidth: iconSize * 1.5 }}>
                    {badge.name}
                </Typography>
            )}
        </Box>
    );

    return (
        <Tooltip
            title={
                <Box>
                    <Typography variant="subtitle2" fontWeight="bold">
                        {badge.name}
                    </Typography>
                    <Typography variant="caption">{badge.description}</Typography>
                    {badge.tier && (
                        <Typography variant="caption" display="block" sx={{ mt: 0.5, opacity: 0.8 }}>
                            Nivel: {badge.tier}
                        </Typography>
                    )}
                </Box>
            }
            arrow
        >
            {badgeContent}
        </Tooltip>
    );
};

export default BadgeIcon;

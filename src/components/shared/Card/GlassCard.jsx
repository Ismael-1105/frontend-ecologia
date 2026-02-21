import React from 'react';
import { Card as MuiCard, useTheme } from '@mui/material';

/**
 * GlassCard - Reusable card component with glassmorphism effect
 * Adapts to light/dark theme automatically.
 */
const GlassCard = ({
    elevation = 3,
    hover = true,
    gradient,
    className = '',
    sx = {},
    children,
    ...rest
}) => {
    const theme = useTheme();
    const isDark = theme.palette.mode === 'dark';

    const defaultSx = {
        backgroundColor: isDark
            ? 'rgba(39, 39, 39, 0.85)'
            : 'rgba(255, 255, 255, 0.75)',
        backdropFilter: 'blur(10px)',
        border: isDark
            ? '1px solid rgba(255, 255, 255, 0.1)'
            : '1px solid rgba(0, 0, 0, 0.08)',
        borderRadius: '15px',
        transition: 'all 0.3s ease-in-out',
        ...(hover && {
            '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: isDark
                    ? '0 10px 24px rgba(65, 171, 93, 0.25)'
                    : '0 10px 24px rgba(0, 0, 0, 0.12)',
            },
        }),
        ...(gradient && {
            background: gradient,
        }),
        ...sx,
    };

    return (
        <MuiCard
            elevation={elevation}
            className={className}
            sx={defaultSx}
            {...rest}
        >
            {children}
        </MuiCard>
    );
};

export default GlassCard;

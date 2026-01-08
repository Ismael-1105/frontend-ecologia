import React from 'react';
import { Card as MuiCard } from '@mui/material';

/**
 * GlassCard - Reusable card component with glassmorphism effect
 * 
 * @param {object} props
 * @param {number} props.elevation - Shadow elevation (default: 3)
 * @param {boolean} props.hover - Enable hover effects (default: true)
 * @param {string} props.gradient - Optional gradient background
 * @param {string} props.className - Additional CSS classes
 * @param {object} props.sx - Additional MUI sx props
 * @param {React.ReactNode} props.children - Card content
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
    const defaultSx = {
        backgroundColor: 'rgba(30, 36, 45, 0.6)',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        borderRadius: '15px',
        transition: 'all 0.3s ease-in-out',
        ...(hover && {
            '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: '0 10px 24px rgba(134, 167, 137, 0.25)',
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

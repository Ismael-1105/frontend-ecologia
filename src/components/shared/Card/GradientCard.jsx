import React from 'react';
import { Box, Card, CardContent } from '@mui/material';

/**
 * GradientCard - Card with gradient border effect
 * 
 * @param {object} props
 * @param {string} props.gradient - Gradient for border effect
 * @param {number} props.elevation - Card elevation (default: 8)
 * @param {boolean} props.hover - Enable hover effects (default: true)
 * @param {object} props.sx - Additional sx props for card
 * @param {object} props.contentSx - Additional sx props for content
 * @param {React.ReactNode} props.children - Card content
 */
const GradientCard = ({
    gradient = 'linear-gradient(135deg, #2e7d32 0%, #66bb6a 100%)',
    elevation = 8,
    hover = true,
    sx = {},
    contentSx = {},
    children,
    ...rest
}) => {
    return (
        <Box 
            sx={{ 
                position: 'relative', 
                height: '100%',
                '&:hover': hover ? {
                    '& .gradient-border': {
                        opacity: 0.8,
                    },
                } : {},
            }}
        >
            {/* Gradient Border Effect */}
            <Box
                className="gradient-border"
                sx={{
                    position: 'absolute',
                    inset: -2,
                    background: gradient,
                    borderRadius: 4,
                    opacity: 0.6,
                    transition: 'opacity 0.3s ease',
                    zIndex: 0,
                }}
            />

            {/* Main Card */}
            <Card
                elevation={elevation}
                sx={{
                    position: 'relative',
                    height: '100%',
                    borderRadius: 4,
                    transition: 'all 0.3s ease',
                    zIndex: 1,
                    ...(hover && {
                        '&:hover': {
                            transform: 'translateY(-8px)',
                            boxShadow: 12,
                        },
                    }),
                    ...sx,
                }}
                {...rest}
            >
                <CardContent sx={{ position: 'relative', zIndex: 1, ...contentSx }}>
                    {children}
                </CardContent>
            </Card>
        </Box>
    );
};

export default GradientCard;

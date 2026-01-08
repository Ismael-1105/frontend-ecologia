import React from 'react';
import { Box, Typography, Chip } from '@mui/material';
import { GradientCard, IconAvatar } from '..';
import { alpha } from '@mui/material/styles';

/**
 * MissionVisionCard - Specialized card for Mission/Vision display
 * 
 * @param {object} props
 * @param {string} props.title - Card title (e.g., "Misión")
 * @param {string} props.description - Card description text
 * @param {React.ReactNode} props.icon - Icon component
 * @param {string} props.gradient - Gradient for border
 * @param {string} props.chipLabel - Chip label text
 * @param {object} props.chipProps - Additional chip props
 * @param {object} props.gridPosition - Grid positioning props
 */
const CardText = ({
    title,
    description,
    icon,
    gradient,
    chipLabel,
    chipProps = {},
    gridPosition = {},
}) => {
    return (
        <Box
            sx={{
                position: 'relative',
                height: '100%',
                ...gridPosition,
            }}
        >
            <GradientCard
                gradient={gradient}
                contentSx={(theme) => ({
                    p: { xs: 3, md: 4 },
                    height: '100%',
                    background:
                        theme.palette.mode === 'dark'
                            ? 'rgba(18, 23, 30, 0.85)'
                            : 'rgba(255, 255, 255, 0.8)',
                    backdropFilter: 'blur(20px)',
                    border: `1px solid ${alpha(theme.palette.primary.main, 0.15)}`,
                })}
                sx={{
                    '&:hover': {
                        '& .decorative-element': {
                            transform: 'scale(1.1) rotate(5deg)',
                            opacity: 0.7,
                        },
                    },
                }}
            >
                {/* Decorative Background Element */}
                <Box
                    className="decorative-element"
                    sx={(theme) => ({
                        position: 'absolute',
                        top: 0,
                        right: 0,
                        width: 120,
                        height: 120,
                        background: `radial-gradient(circle, ${alpha(theme.palette.primary.light, 0.15)} 0%, transparent 70%)`,
                        borderRadius: '0 0 0 100%',
                        transition: 'all 0.4s ease',
                    })}
                />

                {/* Glow Effect */}
                <Box
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: '80%',
                        height: '80%',
                        background: gradient,
                        opacity: 0.03,
                        borderRadius: '50%',
                        filter: 'blur(60px)',
                        pointerEvents: 'none',
                    }}
                />

                <Box sx={{ position: 'relative', zIndex: 1 }}>
                    {/* Title with Icon */}
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2.5 }}>
                        <IconAvatar
                            icon={icon}
                            gradient={gradient}
                            sx={{
                                boxShadow: '0 4px 20px rgba(102, 187, 106, 0.3)',
                            }}
                        />
                        <Typography
                            variant="h4"
                            component="h3"
                            fontWeight="bold"
                            color="text.primary"
                            sx={{
                                ml: 2,
                                fontSize: { xs: '1.5rem', md: '1.75rem' },
                                textShadow: '0 2px 10px rgba(0,0,0,0.3)',
                            }}
                        >
                            {title}
                        </Typography>
                    </Box>

                    {/* Divider */}
                    <Box
                        sx={{
                            width: 60,
                            height: 3,
                            background: gradient,
                            borderRadius: 2,
                            mb: 2.5,
                            boxShadow: '0 2px 10px rgba(102, 187, 106, 0.3)',
                        }}
                    />

                    {/* Description */}
                    <Typography
                        variant="body1"
                        color="text.primary"
                        sx={{
                            fontSize: { xs: '0.95rem', md: '1rem' },
                            lineHeight: 1.8,
                            mb: 3,
                            opacity: 0.95,
                        }}
                    >
                        {description}
                    </Typography>

                    {/* Chip */}
                    <Chip
                        label={chipLabel}
                        sx={(theme) => ({
                            fontWeight: 600,
                            boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
                            transition: 'all 0.3s ease',
                            '&:hover': {
                                transform: 'translateY(-2px)',
                                boxShadow: `0 4px 12px ${alpha(theme.palette.primary.main, 0.3)}`,
                            },
                        })}
                        {...chipProps}
                    />
                </Box>
            </GradientCard>
        </Box>
    );
};

export default CardText;

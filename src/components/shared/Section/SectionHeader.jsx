import React from 'react';
import { Box, Typography, Avatar } from '@mui/material';

/**
 * SectionHeader - Reusable section header component
 * 
 * @param {object} props
 * @param {string} props.title - Main title text
 * @param {string} props.subtitle - Optional subtitle text
 * @param {React.ReactNode} props.icon - Optional icon component
 * @param {string} props.dividerColor - Color for divider line (default: 'primary.main')
 * @param {boolean} props.showDivider - Show/hide divider (default: true)
 * @param {string} props.align - Text alignment (default: 'center')
 * @param {object} props.sx - Additional sx props
 * @param {string} props.className - Additional CSS classes
 */
const SectionHeader = ({
    title,
    subtitle,
    icon,
    dividerColor = 'primary.main',
    showDivider = true,
    align = 'center',
    sx = {},
    className = '',
    ...rest
}) => {
    return (
        <Box
            sx={{
                textAlign: align,
                mb: { xs: 6, md: 8 },
                ...sx,
            }}
            className={className}
            {...rest}
        >
            {icon && (
                <Avatar
                    sx={(theme) => ({
                        width: { xs: 64, md: 80 },
                        height: { xs: 64, md: 80 },
                        background: `linear-gradient(135deg, ${theme.palette.primary.dark} 0%, ${theme.palette.primary.light} 100%)`,
                        mx: 'auto',
                        mb: 3,
                        boxShadow: 4,
                    })}
                >
                    {icon}
                </Avatar>
            )}

            <Typography
                variant="h3"
                component="h2"
                fontWeight="bold"
                color="text.primary"
                gutterBottom
                sx={{
                    fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
                    mb: 2,
                }}
            >
                {title}
            </Typography>

            {showDivider && (
                <Box
                    sx={{
                        width: { xs: 80, md: 100 },
                        height: 4,
                        background: `linear-gradient(90deg, ${dividerColor} 0%, ${dividerColor} 100%)`,
                        borderRadius: 3,
                        mx: 'auto',
                        mb: subtitle ? 3 : 0,
                    }}
                />
            )}

            {subtitle && (
                <Typography
                    variant="h6"
                    component="p"
                    color="text.secondary"
                    sx={{
                        maxWidth: 800,
                        mx: 'auto',
                        fontSize: { xs: '1rem', md: '1.25rem' },
                        lineHeight: 1.6,
                        mt: 3,
                    }}
                >
                    {subtitle}
                </Typography>
            )}
        </Box>
    );
};

export default SectionHeader;

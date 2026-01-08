import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';

/**
 * StatCard - Reusable statistics display card
 * 
 * @param {object} props
 * @param {string|number} props.value - The statistic value to display
 * @param {string} props.label - The label/description
 * @param {string} props.color - MUI color for the value (default: 'success.dark')
 * @param {number} props.elevation - Card elevation (default: 4)
 * @param {boolean} props.hover - Enable hover effects (default: true)
 * @param {object} props.sx - Additional sx props
 */
const StatCard = ({
    value,
    label,
    color = 'success.dark',
    elevation = 4,
    hover = true,
    sx = {},
    ...rest
}) => {
    return (
        <Card
            elevation={elevation}
            sx={{
                textAlign: 'center',
                p: { xs: 3, md: 3 },
                borderRadius: 3,
                transition: 'all 0.3s ease',
                ...(hover && {
                    '&:hover': {
                        transform: 'translateY(-4px)',
                        boxShadow: 8,
                    },
                }),
                ...sx,
            }}
            {...rest}
        >
            <CardContent sx={{ p: 0, '&:last-child': { pb: 0 } }}>
                <Typography
                    variant="h3"
                    component="div"
                    fontWeight="bold"
                    color={color}
                    sx={{ mb: 1, fontSize: { xs: '1.75rem', md: '2rem' } }}
                >
                    {value}
                </Typography>
                <Typography
                    variant="body2"
                    color="text.secondary"
                    fontWeight={500}
                    sx={{ fontSize: { xs: '0.875rem', md: '0.95rem' } }}
                >
                    {label}
                </Typography>
            </CardContent>
        </Card>
    );
};

export default StatCard;

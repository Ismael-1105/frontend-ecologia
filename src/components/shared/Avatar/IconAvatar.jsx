import React from 'react';
import { Avatar as MuiAvatar } from '@mui/material';

/**
 * IconAvatar - Reusable avatar component with gradient background
 * 
 * @param {object} props
 * @param {React.ReactNode} props.icon - Icon component to display
 * @param {string} props.gradient - Gradient background (default: green gradient)
 * @param {object} props.size - Size object with xs and md values
 * @param {object} props.iconSize - Icon size object with xs and md values
 * @param {object} props.sx - Additional sx props
 */
const IconAvatar = ({
    icon,
    gradient = 'linear-gradient(135deg, #2e7d32 0%, #4caf50 100%)',
    size = { xs: 48, md: 56 },
    iconSize = { xs: 24, md: 28 },
    sx = {},
    ...rest
}) => {
    return (
        <MuiAvatar
            sx={{
                width: size,
                height: size,
                background: gradient,
                boxShadow: 3,
                transition: 'all 0.3s ease',
                '&:hover': {
                    transform: 'scale(1.05)',
                    boxShadow: 6,
                },
                ...sx,
            }}
            {...rest}
        >
            {React.isValidElement(icon) ? React.cloneElement(icon, {
                sx: { fontSize: iconSize, color: 'white' },
            }) : icon}
        </MuiAvatar>
    );
};

export default IconAvatar;

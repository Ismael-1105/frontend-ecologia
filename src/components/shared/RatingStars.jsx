import React, { useState } from 'react';
import { Box, Rating, Typography } from '@mui/material';
import { Star, StarBorder } from '@mui/icons-material';

/**
 * Rating Stars Component
 * Interactive star rating with display mode
 */
const RatingStars = ({
    value = 0,
    onChange,
    readOnly = false,
    size = 'medium',
    showValue = true,
    precision = 1,
}) => {
    const [hover, setHover] = useState(-1);

    const getSizeValue = () => {
        switch (size) {
            case 'small':
                return 20;
            case 'large':
                return 40;
            default:
                return 30;
        }
    };

    return (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Rating
                value={value}
                onChange={(event, newValue) => {
                    if (onChange && !readOnly) {
                        onChange(newValue);
                    }
                }}
                onChangeActive={(event, newHover) => {
                    if (!readOnly) {
                        setHover(newHover);
                    }
                }}
                precision={precision}
                readOnly={readOnly}
                size={size}
                icon={<Star fontSize="inherit" />}
                emptyIcon={<StarBorder fontSize="inherit" />}
                sx={{
                    fontSize: getSizeValue(),
                }}
            />
            {showValue && (
                <Typography variant="body2" color="text.secondary">
                    {hover !== -1 ? hover.toFixed(1) : value.toFixed(1)}
                </Typography>
            )}
        </Box>
    );
};

export default RatingStars;

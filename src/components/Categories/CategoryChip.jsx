import React from 'react';
import { Chip } from '@mui/material';

/**
 * CategoryChip Component
 * Displays a category as a chip with icon and color
 */
const CategoryChip = ({
    category,
    onClick,
    selected = false,
    size = 'small',
    variant = 'outlined',
    ...props
}) => {
    if (!category) return null;

    const handleClick = () => {
        if (onClick) {
            onClick(category);
        }
    };

    return (
        <Chip
            label={
                <span>
                    {category.icon && <span style={{ marginRight: 4 }}>{category.icon}</span>}
                    {category.name}
                </span>
            }
            onClick={handleClick}
            size={size}
            variant={selected ? 'filled' : variant}
            color={selected ? 'primary' : 'default'}
            sx={{
                borderColor: category.color || undefined,
                color: selected ? undefined : category.color || undefined,
                '&:hover': {
                    backgroundColor: category.color ? `${category.color}20` : undefined,
                },
                cursor: onClick ? 'pointer' : 'default',
            }}
            {...props}
        />
    );
};

export default CategoryChip;

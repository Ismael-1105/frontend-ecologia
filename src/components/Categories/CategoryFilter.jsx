import React from 'react';
import { Box, Typography, Stack } from '@mui/material';
import CategoryChip from './CategoryChip';

/**
 * CategoryFilter Component
 * Displays a list of category chips for filtering
 */
const CategoryFilter = ({
    categories = [],
    selectedCategory = null,
    onChange,
    showAll = true,
    title = 'Categorías',
}) => {
    const handleCategoryClick = (category) => {
        if (onChange) {
            // If clicking the same category, deselect it
            if (selectedCategory?._id === category._id) {
                onChange(null);
            } else {
                onChange(category);
            }
        }
    };

    const handleAllClick = () => {
        if (onChange) {
            onChange(null);
        }
    };

    if (categories.length === 0) {
        return null;
    }

    return (
        <Box sx={{ mb: 3 }}>
            {title && (
                <Typography variant="subtitle2" gutterBottom sx={{ mb: 1 }}>
                    {title}
                </Typography>
            )}

            <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                {showAll && (
                    <CategoryChip
                        category={{ _id: 'all', name: 'Todas', icon: '📚' }}
                        selected={!selectedCategory}
                        onClick={handleAllClick}
                    />
                )}

                {categories.map((category) => (
                    <CategoryChip
                        key={category._id}
                        category={category}
                        selected={selectedCategory?._id === category._id}
                        onClick={handleCategoryClick}
                    />
                ))}
            </Stack>
        </Box>
    );
};

export default CategoryFilter;

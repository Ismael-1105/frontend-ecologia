import React from 'react';
import { Box, Chip, Stack } from '@mui/material';

const categories = [
    { id: null, name: 'Todas', color: 'default' },
    { id: 'flora-nativa', name: 'Flora Nativa', color: 'success' },
    { id: 'fauna-local', name: 'Fauna Local', color: 'warning' },
    { id: 'conservacion', name: 'Conservación', color: 'info' },
    { id: 'reciclaje', name: 'Reciclaje', color: 'secondary' },
    { id: 'agua', name: 'Agua', color: 'primary' }
];

const CategoryFilter = ({ selectedCategory, onCategoryChange }) => {
    return (
        <Box sx={{ overflowX: 'auto', pb: 1 }}>
            <Stack direction="row" spacing={1} sx={{ minWidth: 'fit-content' }}>
                {categories.map((category) => (
                    <Chip
                        key={category.id || 'all'}
                        label={category.name}
                        color={category.color}
                        variant={selectedCategory === category.id ? 'filled' : 'outlined'}
                        onClick={() => onCategoryChange(category.id)}
                        sx={{
                            cursor: 'pointer',
                            fontWeight: selectedCategory === category.id ? 600 : 400,
                            '&:hover': {
                                transform: 'translateY(-2px)',
                                boxShadow: 2
                            },
                            transition: 'all 0.2s ease'
                        }}
                    />
                ))}
            </Stack>
        </Box>
    );
};

export default CategoryFilter;

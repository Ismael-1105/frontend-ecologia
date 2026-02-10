import React from 'react';
import { Box, Typography, List, ListItem, ListItemText } from '@mui/material';
import { Circle as CircleIcon } from '@mui/icons-material';

const categories = [
    { name: 'Flora Nativa', slug: 'flora-nativa', color: '#4caf50' },
    { name: 'Fauna Local', slug: 'fauna-local', color: '#ff9800' },
    { name: 'Conservación', slug: 'conservacion', color: '#2196f3' },
    { name: 'Reciclaje', slug: 'reciclaje', color: '#9c27b0' },
    { name: 'Agua', slug: 'agua', color: '#00bcd4' }
];

const CategoryList = () => {
    return (
        <Box sx={{ pt: 3, borderTop: '1px solid', borderColor: 'divider' }}>
            <Typography
                variant="caption"
                sx={{
                    px: 2,
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: 0.5,
                    color: 'text.secondary',
                    display: 'block',
                    mb: 1.5
                }}
            >
                Categorías
            </Typography>
            <List sx={{ py: 0 }}>
                {categories.map((category) => (
                    <ListItem key={category.slug} disablePadding>
                        <Box
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                py: 1,
                                px: 2,
                                borderRadius: 1.5,
                                mx: 1,
                                mb: 0.5,
                                width: '100%'
                            }}
                        >
                            <CircleIcon
                                sx={{
                                    fontSize: 8,
                                    color: category.color,
                                    mr: 1.5
                                }}
                            />
                            <ListItemText
                                primary={category.name}
                                primaryTypographyProps={{
                                    variant: 'body2',
                                    sx: { fontWeight: 400 }
                                }}
                            />
                        </Box>
                    </ListItem>
                ))}
            </List>
        </Box>
    );
};

export default CategoryList;

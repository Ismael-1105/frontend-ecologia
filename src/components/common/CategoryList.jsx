import React from 'react';
import { Box, Typography, List, ListItem, ListItemButton, ListItemText } from '@mui/material';
import { Circle as CircleIcon } from '@mui/icons-material';
import { Link, useLocation } from 'react-router-dom';

const categories = [
    { name: 'Flora Nativa', slug: 'flora-nativa', color: '#4caf50' },
    { name: 'Fauna Local', slug: 'fauna-local', color: '#ff9800' },
    { name: 'Conservación', slug: 'conservacion', color: '#2196f3' },
    { name: 'Reciclaje', slug: 'reciclaje', color: '#9c27b0' },
    { name: 'Agua', slug: 'agua', color: '#00bcd4' }
];

const CategoryList = () => {
    const location = useLocation();

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
                {categories.map((category) => {
                    const isActive = location.search.includes(category.slug);
                    return (
                        <ListItem key={category.slug} disablePadding>
                            <ListItemButton
                                component={Link}
                                to={`/portal/video-player?categoria=${category.slug}`}
                                sx={{
                                    py: 1,
                                    px: 2,
                                    borderRadius: 1.5,
                                    mx: 1,
                                    mb: 0.5,
                                    bgcolor: isActive ? 'action.selected' : 'transparent',
                                    '&:hover': {
                                        bgcolor: 'action.hover'
                                    }
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
                                        sx: { fontWeight: isActive ? 600 : 400 }
                                    }}
                                />
                            </ListItemButton>
                        </ListItem>
                    );
                })}
            </List>
        </Box>
    );
};

export default CategoryList;

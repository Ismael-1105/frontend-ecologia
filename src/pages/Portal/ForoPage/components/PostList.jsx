import React from 'react';
import { Stack, Typography, Box } from '@mui/material';
import PostCard from './PostCard';

// Mock data for forum posts
const mockPosts = [
    {
        id: 1,
        title: 'Descubrimiento de nueva especie de orquídea en Podocarpus',
        author: 'Dr. Carlos Mendoza',
        category: 'Flora Nativa',
        replies: 34,
        views: 892,
        hasVideo: true,
        isHot: true
    },
    {
        id: 2,
        title: 'Guía completa: Compostaje doméstico en clima andino',
        author: 'María García',
        category: 'Reciclaje',
        replies: 28,
        views: 654,
        hasVideo: true,
        isHot: false
    },
    {
        id: 3,
        title: 'Avistamiento de oso de anteojos cerca de Vilcabamba',
        author: 'Luis Armijos',
        category: 'Fauna Local',
        replies: 45,
        views: 1203,
        hasVideo: false,
        isHot: true
    },
    {
        id: 4,
        title: 'Proyecto escolar: Huertos urbanos en instituciones educativas',
        author: 'Ana Córdova',
        category: 'Conservación',
        replies: 19,
        views: 445,
        hasVideo: true,
        isHot: false
    },
    {
        id: 5,
        title: 'Técnicas de purificación de agua en zonas rurales',
        author: 'Pedro Sánchez',
        category: 'Agua',
        replies: 23,
        views: 567,
        hasVideo: false,
        isHot: false
    }
];

const PostList = ({ selectedCategory }) => {
    // Filter posts by category
    const filteredPosts = selectedCategory
        ? mockPosts.filter(post =>
            post.category.toLowerCase().replace(' ', '-') === selectedCategory
        )
        : mockPosts;

    return (
        <Box>
            {filteredPosts.length === 0 ? (
                <Box sx={{ textAlign: 'center', py: 8 }}>
                    <Typography variant="h6" color="text.secondary">
                        No hay publicaciones en esta categoría
                    </Typography>
                </Box>
            ) : (
                <Stack spacing={2}>
                    {filteredPosts.map((post) => (
                        <PostCard key={post.id} post={post} />
                    ))}
                </Stack>
            )}
        </Box>
    );
};

export default PostList;

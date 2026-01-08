import React, { useState } from 'react';
import {
    Container,
    Box,
    Typography,
    Button,
    Grid,
    Stack,
    Chip
} from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import { PostList, CategoryFilter } from './components';

const ForoPage = () => {
    const [selectedCategory, setSelectedCategory] = useState(null);

    const handleCreatePost = () => {
        // TODO: Navigate to create post page or open modal
        console.log('Create post');
    };

    return (
        <Container maxWidth="xl" sx={{ py: 0 }}>
            {/* Header */}
            <Box sx={{ mb: 4 }}>
                <Stack
                    direction={{ xs: 'column', sm: 'row' }}
                    justifyContent="space-between"
                    alignItems={{ xs: 'flex-start', sm: 'center' }}
                    spacing={2}
                >
                    <Box>
                        <Typography variant="h4" sx={{ fontWeight: 700, mb: 0.5 }}>
                            Foro de Discusión
                        </Typography>
                        <Typography variant="body1" color="text.secondary">
                            Comparte ideas y aprende con la comunidad
                        </Typography>
                    </Box>
                    <Button
                        variant="contained"
                        startIcon={<AddIcon />}
                        onClick={handleCreatePost}
                        sx={{ whiteSpace: 'nowrap' }}
                    >
                        Nueva Discusión
                    </Button>
                </Stack>
            </Box>

            {/* Category Filter */}
            <Box sx={{ mb: 3 }}>
                <CategoryFilter
                    selectedCategory={selectedCategory}
                    onCategoryChange={setSelectedCategory}
                />
            </Box>

            {/* Post List */}
            <PostList selectedCategory={selectedCategory} />
        </Container>
    );
};

export default ForoPage;

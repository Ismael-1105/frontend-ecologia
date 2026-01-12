import React, { useState, useRef } from 'react';
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
import PostList from './components/PostList';
import CategoryFilter from './components/CategoryFilter';
import CreatePostModal from './components/CreatePostModal';


const ForoPage = () => {
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const postListRef = useRef();

    const handleCreatePost = () => {
        setModalOpen(true);
    };

    const handlePostCreated = (newPost) => {
        // Refresh the post list
        if (postListRef.current && postListRef.current.refreshPosts) {
            postListRef.current.refreshPosts();
        }
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
            <PostList
                ref={postListRef}
                selectedCategory={selectedCategory}
            />

            {/* Create Post Modal */}
            <CreatePostModal
                open={modalOpen}
                onClose={() => setModalOpen(false)}
                onPostCreated={handlePostCreated}
            />
        </Container>
    );
};

export default ForoPage;

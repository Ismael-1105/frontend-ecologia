import React, { useState, useRef } from 'react';
import {
    Container,
    Box,
    Typography,
    Button,
    Grid,
    Stack,
    Fade
} from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import PostList from './components/PostList';
import CreatePostModal from './components/CreatePostModal';
import SearchBar from './components/SearchBar';
import TrendingPosts from './components/TrendingPosts';


const ForoPage = () => {
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
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
        <Fade in={true} timeout={500}>
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
                                Comparte ideas, aprende y conecta con la comunidad ecológica
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

                {/* Main Content */}
                <Grid container spacing={3}>
                    {/* Left Column - Posts */}
                    <Grid size={{ xs: 12, md: 8 }}>
                        {/* Search Bar */}
                        <SearchBar
                            onSearch={setSearchQuery}
                            onCategoryChange={setSelectedCategory}
                            selectedCategory={selectedCategory}
                        />

                        {/* Post List */}
                        <PostList
                            ref={postListRef}
                            selectedCategory={selectedCategory}
                            searchQuery={searchQuery}
                        />
                    </Grid>

                    {/* Right Column - Sidebar */}
                    <Grid size={{ xs: 12, md: 4 }}>
                        <Box sx={{ position: 'sticky', top: 80 }}>
                            <TrendingPosts limit={5} timeframe={7} />
                        </Box>
                    </Grid>
                </Grid>

                {/* Create Post Modal */}
                <CreatePostModal
                    open={modalOpen}
                    onClose={() => setModalOpen(false)}
                    onPostCreated={handlePostCreated}
                />
            </Container>
        </Fade>
    );
};

export default ForoPage;

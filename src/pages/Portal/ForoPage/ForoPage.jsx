import React, { useState, useRef } from 'react';
import {
    Container,
    Box,
    Typography,
    Button,
    Grid,
    Stack
} from '@mui/material';
import { Add as AddIcon, Forum as ForumIcon } from '@mui/icons-material';
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
        <Box sx={{ bgcolor: 'background.default', minHeight: '100vh' }}>
            {/* Hero Header with Gradient */}
            <Box
                sx={{
                    background: 'linear-gradient(135deg, #2E7D32 0%, #66BB6A 50%, #81C784 100%)',
                    color: 'white',
                    py: { xs: 4, md: 6 },
                    mb: 4,
                    position: 'relative',
                    overflow: 'hidden',
                    '&::before': {
                        content: '""',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'0.05\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
                        opacity: 0.1
                    }
                }}
            >
                <Container maxWidth="xl">
                    <Stack
                        direction={{ xs: 'column', sm: 'row' }}
                        justifyContent="space-between"
                        alignItems={{ xs: 'flex-start', sm: 'center' }}
                        spacing={3}
                        sx={{ position: 'relative', zIndex: 1 }}
                    >
                        <Box>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
                                <ForumIcon sx={{ fontSize: 40 }} />
                                <Typography
                                    variant="h3"
                                    sx={{
                                        fontWeight: 800,
                                        fontSize: { xs: '2rem', md: '2.5rem' },
                                        textShadow: '2px 2px 4px rgba(0,0,0,0.2)'
                                    }}
                                >
                                    Foro de Discusión
                                </Typography>
                            </Box>
                            <Typography
                                variant="h6"
                                sx={{
                                    opacity: 0.95,
                                    fontWeight: 400,
                                    fontSize: { xs: '1rem', md: '1.1rem' }
                                }}
                            >
                                Comparte ideas, aprende y conecta con la comunidad ecológica
                            </Typography>
                        </Box>
                        <Button
                            variant="contained"
                            size="large"
                            startIcon={<AddIcon />}
                            onClick={handleCreatePost}
                            sx={{
                                bgcolor: 'white',
                                color: 'primary.main',
                                px: 4,
                                py: 1.5,
                                fontWeight: 600,
                                fontSize: '1rem',
                                boxShadow: '0 4px 14px rgba(0,0,0,0.2)',
                                '&:hover': {
                                    bgcolor: 'grey.100',
                                    transform: 'translateY(-2px)',
                                    boxShadow: '0 6px 20px rgba(0,0,0,0.25)'
                                },
                                transition: 'all 0.3s ease'
                            }}
                        >
                            Nueva Discusión
                        </Button>
                    </Stack>
                </Container>
            </Box>

            {/* Main Content */}
            <Container maxWidth="xl" sx={{ pb: 6 }}>
                <Grid container spacing={3}>
                    {/* Left Column - Posts */}
                    <Grid item xs={12} lg={8}>
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
                    <Grid item xs={12} lg={4}>
                        <Box sx={{ position: 'sticky', top: 80 }}>
                            <TrendingPosts limit={5} timeframe={7} />
                        </Box>
                    </Grid>
                </Grid>
            </Container>

            {/* Create Post Modal */}
            <CreatePostModal
                open={modalOpen}
                onClose={() => setModalOpen(false)}
                onPostCreated={handlePostCreated}
            />
        </Box>
    );
};

export default ForoPage;

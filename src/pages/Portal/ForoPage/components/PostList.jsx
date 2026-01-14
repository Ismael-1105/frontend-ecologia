import React, { useState, useEffect, forwardRef, useImperativeHandle, useCallback } from 'react';
import { Stack, Typography, Box, CircularProgress, Alert, Pagination } from '@mui/material';
import PostCard from './PostCard';
import { getPosts, searchPosts } from '../../../../core/api/postService';

const PostList = forwardRef(({ selectedCategory, searchQuery }, ref) => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isSearching, setIsSearching] = useState(false);
    const [pagination, setPagination] = useState({
        page: 1,
        limit: 20,
        total: 0,
        pages: 1
    });

    useEffect(() => {
        fetchPosts();
    }, [selectedCategory, pagination.page, searchQuery]);

    const fetchPosts = async () => {
        try {
            setLoading(true);
            setError(null);

            const params = {
                page: pagination.page,
                limit: pagination.limit,
            };

            let response;

            if (searchQuery && searchQuery.trim()) {
                // Use search endpoint
                response = await searchPosts(searchQuery, {
                    ...params,
                    category: selectedCategory
                });
                setIsSearching(true);
            } else {
                // Use regular getPosts
                params.sort = '-createdAt';
                if (selectedCategory) {
                    params.category = selectedCategory;
                }
                response = await getPosts(params);
                setIsSearching(false);
            }

            if (response.success) {
                setPosts(response.data);
                setPagination(prev => ({
                    ...prev,
                    ...response.pagination
                }));
            }
        } catch (err) {
            console.error('Error fetching posts:', err);
            setError(err.response?.data?.error || 'Error al cargar las publicaciones');
        } finally {
            setLoading(false);
        }
    };

    // Expose refresh method to parent
    useImperativeHandle(ref, () => ({
        refreshPosts: () => {
            setPagination(prev => ({ ...prev, page: 1 }));
            fetchPosts();
        }
    }));

    const handlePageChange = (event, value) => {
        setPagination(prev => ({ ...prev, page: value }));
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
                <CircularProgress />
            </Box>
        );
    }

    if (error) {
        return (
            <Box sx={{ py: 4 }}>
                <Alert severity="error" onClose={() => setError(null)}>
                    {error}
                </Alert>
            </Box>
        );
    }

    return (
        <Box>
            {isSearching && (
                <Box sx={{ mb: 2 }}>
                    <Typography variant="body2" color="text.secondary">
                        Resultados de búsqueda para: <strong>{searchQuery}</strong>
                    </Typography>
                </Box>
            )}

            {posts.length === 0 ? (
                <Box sx={{ textAlign: 'center', py: 8 }}>
                    <Typography variant="h6" color="text.secondary">
                        {isSearching
                            ? 'No se encontraron publicaciones'
                            : 'No hay publicaciones en esta categoría'
                        }
                    </Typography>
                </Box>
            ) : (
                <>
                    <Stack spacing={2}>
                        {posts.map((post) => (
                            <PostCard key={post._id} post={post} />
                        ))}
                    </Stack>

                    {/* Pagination */}
                    {pagination.pages > 1 && (
                        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                            <Pagination
                                count={pagination.pages}
                                page={pagination.page}
                                onChange={handlePageChange}
                                color="primary"
                                size="large"
                            />
                        </Box>
                    )}
                </>
            )}
        </Box>
    );
});

PostList.displayName = 'PostList';

export default PostList;

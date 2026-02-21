import { useState, useEffect, useCallback, useRef } from 'react';
import videoService from '../../../../core/services/videoService';

/**
 * Hook for HomeFeedPage with infinite scroll.
 * @param {string} search - Search query from PortalLayout's AppBar (via Outlet context)
 */
const useHomeFeed = (search = '') => {
    const [videos, setVideos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [loadingMore, setLoadingMore] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const [page, setPage] = useState(1);
    const [debouncedSearch, setDebouncedSearch] = useState('');
    const debounceRef = useRef(null);
    const observerRef = useRef(null);

    // Debounce the external search input
    useEffect(() => {
        if (debounceRef.current) {
            clearTimeout(debounceRef.current);
        }
        debounceRef.current = setTimeout(() => {
            setDebouncedSearch(search);
            // Reset on new search
            setVideos([]);
            setPage(1);
            setHasMore(true);
        }, 400);

        return () => {
            if (debounceRef.current) {
                clearTimeout(debounceRef.current);
            }
        };
    }, [search]);

    const fetchVideos = useCallback(async (pageNum, isLoadMore = false) => {
        try {
            if (isLoadMore) {
                setLoadingMore(true);
            } else {
                setLoading(true);
            }

            const params = { page: pageNum, limit: 12 };
            if (debouncedSearch.trim()) {
                params.search = debouncedSearch.trim();
            }

            const response = await videoService.getAllVideos(params);
            const newVideos = response?.data || [];
            const pagination = response?.pagination || { page: pageNum, pages: 1 };

            if (isLoadMore) {
                setVideos(prev => [...prev, ...newVideos]);
            } else {
                setVideos(newVideos);
            }

            // Check if there are more pages
            setHasMore(pagination.page < pagination.pages);
        } catch (err) {
            console.error('Error fetching videos for home feed:', err);
            if (!isLoadMore) {
                setVideos([]);
            }
        } finally {
            setLoading(false);
            setLoadingMore(false);
        }
    }, [debouncedSearch]);

    // Initial load and search changes
    useEffect(() => {
        fetchVideos(1, false);
    }, [debouncedSearch, fetchVideos]);

    // Load more when page increments (triggered by intersection observer)
    useEffect(() => {
        if (page > 1) {
            fetchVideos(page, true);
        }
    }, [page, fetchVideos]);

    // Intersection Observer for infinite scroll
    const lastVideoRef = useCallback((node) => {
        if (loading || loadingMore) return;

        if (observerRef.current) {
            observerRef.current.disconnect();
        }

        observerRef.current = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting && hasMore && !loadingMore) {
                setPage(prev => prev + 1);
            }
        }, { threshold: 0.1 });

        if (node) {
            observerRef.current.observe(node);
        }
    }, [loading, loadingMore, hasMore]);

    // Cleanup observer on unmount
    useEffect(() => {
        return () => {
            if (observerRef.current) {
                observerRef.current.disconnect();
            }
        };
    }, []);

    return {
        videos,
        loading,
        loadingMore,
        hasMore,
        lastVideoRef,
    };
};

export default useHomeFeed;

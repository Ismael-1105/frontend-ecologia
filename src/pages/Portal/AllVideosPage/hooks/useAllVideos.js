import { useState, useEffect, useCallback } from 'react';
import { getAllVideos } from '../../../../core/api/videoService';

/**
 * Custom hook for All Videos page
 * Fetches and manages all approved videos from all users
 */
export const useAllVideos = () => {
    const [videos, setVideos] = useState([]);
    const [pagination, setPagination] = useState({
        page: 1,
        limit: 12,
        total: 0,
        pages: 0,
    });
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);

    // Fetch all videos
    const fetchVideos = useCallback(async () => {
        try {
            setLoading(true);
            const response = await getAllVideos({
                page,
                limit: pagination.limit,
            });

            if (response.success) {
                setVideos(response.data);
                setPagination(response.pagination);
            }
        } catch (error) {
            console.error('Error fetching videos:', error);
            setVideos([]);
        } finally {
            setLoading(false);
        }
    }, [page, pagination.limit]);

    // Fetch videos on mount and when page changes
    useEffect(() => {
        fetchVideos();
    }, [fetchVideos]);

    return {
        videos,
        pagination,
        loading,
        page,
        setPage,
    };
};

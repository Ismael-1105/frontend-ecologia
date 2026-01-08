import { useState, useEffect, useCallback } from 'react';
import badgeService from '../services/badgeService';

/**
 * Custom hook for managing badges
 * @param {string} userId - Optional user ID to fetch user-specific badges
 * @returns {Object} Badges state and actions
 */
const useBadges = (userId = null) => {
    const [badges, setBadges] = useState([]);
    const [userBadges, setUserBadges] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    /**
     * Fetch all badges
     */
    const fetchBadges = useCallback(async () => {
        setLoading(true);
        setError(null);

        try {
            const response = await badgeService.getAllBadges();

            if (response.success) {
                setBadges(response.data || []);
            }
        } catch (err) {
            console.error('Error fetching badges:', err);
            setError(err.message || 'Error al cargar badges');
        } finally {
            setLoading(false);
        }
    }, []);

    /**
     * Fetch user's badges
     */
    const fetchUserBadges = useCallback(async (uid) => {
        if (!uid) return;

        setLoading(true);
        setError(null);

        try {
            const response = await badgeService.getUserBadges(uid);

            if (response.success) {
                setUserBadges(response.data || []);
            }
        } catch (err) {
            console.error('Error fetching user badges:', err);
            setError(err.message || 'Error al cargar badges del usuario');
        } finally {
            setLoading(false);
        }
    }, []);

    /**
     * Check if user has a specific badge
     */
    const hasBadge = useCallback((badgeId) => {
        return userBadges.some(badge =>
            (typeof badge === 'string' ? badge : badge._id) === badgeId
        );
    }, [userBadges]);

    /**
     * Get badge by ID
     */
    const findBadgeById = useCallback((badgeId) => {
        return badges.find(badge => badge._id === badgeId);
    }, [badges]);

    /**
     * Get badges by tier
     */
    const getBadgesByTier = useCallback((tier) => {
        return badges.filter(badge => badge.tier === tier);
    }, [badges]);

    // Initial fetch
    useEffect(() => {
        fetchBadges();
    }, [fetchBadges]);

    // Fetch user badges when userId changes
    useEffect(() => {
        if (userId) {
            fetchUserBadges(userId);
        }
    }, [userId, fetchUserBadges]);

    return {
        badges,
        userBadges,
        loading,
        error,
        fetchBadges,
        fetchUserBadges,
        hasBadge,
        findBadgeById,
        getBadgesByTier,
    };
};

export default useBadges;

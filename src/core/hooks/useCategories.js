import { useState, useEffect, useCallback } from 'react';
import categoryService from '../services/categoryService';

/**
 * Custom hook for managing categories
 * @returns {Object} Categories state and actions
 */
const useCategories = () => {
    const [categories, setCategories] = useState([]);
    const [topLevelCategories, setTopLevelCategories] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    /**
     * Fetch all categories
     */
    const fetchCategories = useCallback(async () => {
        setLoading(true);
        setError(null);

        try {
            const response = await categoryService.getAllCategories();

            if (response.success) {
                setCategories(response.data || []);
            }
        } catch (err) {
            console.error('Error fetching categories:', err);
            setError(err.message || 'Error al cargar categorías');
        } finally {
            setLoading(false);
        }
    }, []);

    /**
     * Fetch top-level categories
     */
    const fetchTopLevelCategories = useCallback(async () => {
        setLoading(true);
        setError(null);

        try {
            const response = await categoryService.getTopLevelCategories();

            if (response.success) {
                setTopLevelCategories(response.data || []);
            }
        } catch (err) {
            console.error('Error fetching top-level categories:', err);
            setError(err.message || 'Error al cargar categorías');
        } finally {
            setLoading(false);
        }
    }, []);

    /**
     * Get category tree structure
     * Organizes flat categories into hierarchical tree
     */
    const getCategoryTree = useCallback(() => {
        const categoryMap = new Map();
        const tree = [];

        // Create a map of all categories
        categories.forEach(category => {
            categoryMap.set(category._id, { ...category, children: [] });
        });

        // Build tree structure
        categories.forEach(category => {
            const node = categoryMap.get(category._id);

            if (category.parentCategory) {
                const parent = categoryMap.get(category.parentCategory);
                if (parent) {
                    parent.children.push(node);
                }
            } else {
                tree.push(node);
            }
        });

        return tree;
    }, [categories]);

    /**
     * Find category by ID
     */
    const findCategoryById = useCallback((categoryId) => {
        return categories.find(cat => cat._id === categoryId);
    }, [categories]);

    /**
     * Find category by slug
     */
    const findCategoryBySlug = useCallback((slug) => {
        return categories.find(cat => cat.slug === slug);
    }, [categories]);

    /**
     * Get breadcrumb path for a category
     */
    const getCategoryBreadcrumb = useCallback((categoryId) => {
        const breadcrumb = [];
        let current = findCategoryById(categoryId);

        while (current) {
            breadcrumb.unshift(current);
            current = current.parentCategory ? findCategoryById(current.parentCategory) : null;
        }

        return breadcrumb;
    }, [categories, findCategoryById]);

    // Initial fetch
    useEffect(() => {
        fetchCategories();
    }, [fetchCategories]);

    return {
        categories,
        topLevelCategories,
        loading,
        error,
        fetchCategories,
        fetchTopLevelCategories,
        getCategoryTree,
        findCategoryById,
        findCategoryBySlug,
        getCategoryBreadcrumb,
    };
};

export default useCategories;

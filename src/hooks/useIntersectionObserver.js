import { useEffect, useRef, useState } from 'react';

/**
 * Intersection Observer hook for lazy loading
 * @param {Object} options - IntersectionObserver options
 * @returns {Array} [ref, isIntersecting] - Ref to attach and intersection state
 */
export const useIntersectionObserver = (options = {}) => {
    const [isIntersecting, setIsIntersecting] = useState(false);
    const [hasIntersected, setHasIntersected] = useState(false);
    const targetRef = useRef(null);

    useEffect(() => {
        const target = targetRef.current;
        if (!target) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsIntersecting(entry.isIntersecting);

                // Once intersected, keep it true (for lazy loading)
                if (entry.isIntersecting && !hasIntersected) {
                    setHasIntersected(true);
                }
            },
            {
                threshold: 0.1,
                rootMargin: '50px',
                ...options,
            }
        );

        observer.observe(target);

        return () => {
            observer.disconnect();
        };
    }, [options, hasIntersected]);

    return [targetRef, isIntersecting, hasIntersected];
};

export default useIntersectionObserver;

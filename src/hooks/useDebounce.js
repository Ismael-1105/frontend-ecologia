import { useState, useEffect } from 'react';

/**
 * Debounce hook for search inputs and other frequent updates
 * @param {any} value - The value to debounce
 * @param {number} delay - Delay in milliseconds (default: 500)
 * @returns {any} Debounced value
 */
export const useDebounce = (value, delay = 500) => {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        // Set up timeout to update debounced value
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        // Cleanup timeout if value changes before delay
        return () => {
            clearTimeout(handler);
        };
    }, [value, delay]);

    return debouncedValue;
};

export default useDebounce;

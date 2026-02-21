import { useState, useRef, useCallback, useEffect } from 'react';

/**
 * Hook for managing video hover preview behavior (YouTube-like)
 * Shows a muted video preview after hovering for `delay` ms, plays for `duration` seconds then loops
 */
const useVideoHoverPreview = (videoUrl, options = {}) => {
    const { delay = 600, duration = 10 } = options;
    const videoRef = useRef(null);
    const timerRef = useRef(null);
    const [isHovering, setIsHovering] = useState(false);
    const [isPreviewReady, setIsPreviewReady] = useState(false);

    const handleMouseEnter = useCallback(() => {
        setIsHovering(true);
        if (!videoUrl) return;

        timerRef.current = setTimeout(() => {
            const videoEl = videoRef.current;
            if (videoEl) {
                videoEl.currentTime = 0;
                videoEl.muted = true;
                const playPromise = videoEl.play();
                if (playPromise !== undefined) {
                    playPromise
                        .then(() => setIsPreviewReady(true))
                        .catch(() => setIsPreviewReady(false));
                }
            }
        }, delay);
    }, [videoUrl, delay]);

    const handleMouseLeave = useCallback(() => {
        setIsHovering(false);
        setIsPreviewReady(false);

        if (timerRef.current) {
            clearTimeout(timerRef.current);
            timerRef.current = null;
        }

        const videoEl = videoRef.current;
        if (videoEl) {
            videoEl.pause();
            videoEl.currentTime = 0;
        }
    }, []);

    // Handle duration limit - loop after `duration` seconds
    useEffect(() => {
        const videoEl = videoRef.current;
        if (!videoEl || !isPreviewReady) return;

        const handleTimeUpdate = () => {
            if (videoEl.currentTime >= duration) {
                videoEl.currentTime = 0;
            }
        };

        videoEl.addEventListener('timeupdate', handleTimeUpdate);
        return () => videoEl.removeEventListener('timeupdate', handleTimeUpdate);
    }, [isPreviewReady, duration]);

    // Cleanup on unmount
    useEffect(() => {
        return () => {
            if (timerRef.current) {
                clearTimeout(timerRef.current);
            }
        };
    }, []);

    return {
        videoRef,
        isHovering,
        isShowingPreview: isHovering && isPreviewReady,
        handleMouseEnter,
        handleMouseLeave,
    };
};

export default useVideoHoverPreview;

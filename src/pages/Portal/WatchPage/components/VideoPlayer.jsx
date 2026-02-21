import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Box, IconButton, Slider, Typography, CircularProgress, Tooltip } from '@mui/material';
import {
    PlayArrow as PlayIcon,
    Pause as PauseIcon,
    VolumeUp as VolumeUpIcon,
    VolumeOff as VolumeMuteIcon,
    Fullscreen as FullscreenIcon,
    FullscreenExit as FullscreenExitIcon,
    Replay10 as Replay10Icon,
    Forward10 as Forward10Icon,
    Crop169 as TheaterIcon,
    ViewSidebar as DefaultViewIcon,
} from '@mui/icons-material';
import { VIDEO_CARD_LAYOUT } from '../../../../config/constants';

const formatTime = (seconds) => {
    if (!seconds || isNaN(seconds)) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
};

const VideoPlayer = ({ videoUrl, thumbnailUrl, title, isTheaterMode, onToggleTheater }) => {
    const videoRef = useRef(null);
    const containerRef = useRef(null);
    const controlsTimerRef = useRef(null);
    const progressRef = useRef(null);

    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [buffered, setBuffered] = useState(0);
    const [volume, setVolume] = useState(1);
    const [isMuted, setIsMuted] = useState(false);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [showControls, setShowControls] = useState(true);
    const [isBuffering, setIsBuffering] = useState(false);
    const [isSeeking, setIsSeeking] = useState(false);
    const [showBigPlay, setShowBigPlay] = useState(true);

    // ─── Auto-hide controls ───
    const resetControlsTimer = useCallback(() => {
        setShowControls(true);
        clearTimeout(controlsTimerRef.current);
        if (isPlaying) {
            controlsTimerRef.current = setTimeout(() => {
                setShowControls(false);
            }, 3000);
        }
    }, [isPlaying]);

    useEffect(() => {
        return () => clearTimeout(controlsTimerRef.current);
    }, []);

    useEffect(() => {
        if (!isPlaying) {
            setShowControls(true);
            clearTimeout(controlsTimerRef.current);
        } else {
            resetControlsTimer();
        }
    }, [isPlaying, resetControlsTimer]);

    // ─── Video event handlers ───
    const handleLoadedMetadata = () => {
        if (videoRef.current) {
            setDuration(videoRef.current.duration);
        }
    };

    const handleTimeUpdate = () => {
        if (videoRef.current && !isSeeking) {
            setCurrentTime(videoRef.current.currentTime);
            // Update buffered
            const buf = videoRef.current.buffered;
            if (buf.length > 0) {
                setBuffered(buf.end(buf.length - 1));
            }
        }
    };

    const handlePlay = () => {
        setIsPlaying(true);
        setShowBigPlay(false);
    };
    const handlePause = () => setIsPlaying(false);
    const handleWaiting = () => setIsBuffering(true);
    const handleCanPlay = () => setIsBuffering(false);

    // ─── Controls ───
    const togglePlay = () => {
        if (!videoRef.current) return;
        if (videoRef.current.paused) {
            videoRef.current.play();
        } else {
            videoRef.current.pause();
        }
    };

    const toggleMute = () => {
        if (!videoRef.current) return;
        videoRef.current.muted = !isMuted;
        setIsMuted(!isMuted);
    };

    const handleVolumeChange = (_, newValue) => {
        if (!videoRef.current) return;
        const vol = newValue / 100;
        videoRef.current.volume = vol;
        setVolume(vol);
        if (vol === 0) {
            videoRef.current.muted = true;
            setIsMuted(true);
        } else if (isMuted) {
            videoRef.current.muted = false;
            setIsMuted(false);
        }
    };

    const handleSeek = (_, newValue) => {
        if (!videoRef.current) return;
        const time = (newValue / 100) * duration;
        videoRef.current.currentTime = time;
        setCurrentTime(time);
    };

    const handleSeekStart = () => setIsSeeking(true);
    const handleSeekEnd = (_, newValue) => {
        setIsSeeking(false);
        if (!videoRef.current) return;
        const time = (newValue / 100) * duration;
        videoRef.current.currentTime = time;
    };

    const skip = (seconds) => {
        if (!videoRef.current) return;
        videoRef.current.currentTime = Math.max(0, Math.min(videoRef.current.currentTime + seconds, duration));
    };

    const toggleFullscreen = async () => {
        try {
            if (!document.fullscreenElement) {
                await containerRef.current?.requestFullscreen();
                setIsFullscreen(true);
            } else {
                await document.exitFullscreen();
                setIsFullscreen(false);
            }
        } catch (err) {
            console.error('Fullscreen error:', err);
        }
    };

    useEffect(() => {
        const handleFsChange = () => {
            setIsFullscreen(!!document.fullscreenElement);
        };
        document.addEventListener('fullscreenchange', handleFsChange);
        return () => document.removeEventListener('fullscreenchange', handleFsChange);
    }, []);

    // Keyboard shortcuts
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
            switch (e.key) {
                case ' ':
                case 'k':
                    e.preventDefault();
                    togglePlay();
                    break;
                case 'ArrowLeft':
                    e.preventDefault();
                    skip(-10);
                    break;
                case 'ArrowRight':
                    e.preventDefault();
                    skip(10);
                    break;
                case 'm':
                    toggleMute();
                    break;
                case 'f':
                    toggleFullscreen();
                    break;
                case 't':
                    onToggleTheater?.();
                    break;
                default:
                    break;
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [duration, isMuted]);

    const progress = duration > 0 ? (currentTime / duration) * 100 : 0;
    const bufferedProgress = duration > 0 ? (buffered / duration) * 100 : 0;

    return (
        <Box
            ref={containerRef}
            onMouseMove={resetControlsTimer}
            onMouseLeave={() => isPlaying && setShowControls(false)}
            onClick={(e) => {
                // Only toggle play if clicking the video area, not controls
                if (e.target === videoRef.current || e.target.closest('.video-overlay-click')) {
                    togglePlay();
                    resetControlsTimer();
                }
            }}
            sx={{
                position: 'relative',
                width: '100%',
                bgcolor: '#000',
                borderRadius: isFullscreen ? 0 : (isTheaterMode ? 0 : 2),
                overflow: 'hidden',
                // Theater: fixed height, title + author row + description peek visible below
                // Normal: always 16:9 container, video uses object-fit:contain (like YouTube)
                ...(isTheaterMode && !isFullscreen
                    ? {
                        height: 'calc(100vh - 64px - 160px)',
                        maxHeight: '80vh',
                        minHeight: 300,
                    }
                    : {
                        aspectRatio: VIDEO_CARD_LAYOUT.THUMBNAIL_ASPECT_RATIO,
                    }
                ),
                cursor: showControls ? 'default' : 'none',
                userSelect: 'none',
            }}
        >
            {/* Video Element */}
            <video
                ref={videoRef}
                src={videoUrl}
                poster={thumbnailUrl || VIDEO_CARD_LAYOUT.FALLBACK_THUMBNAIL}
                onLoadedMetadata={handleLoadedMetadata}
                onTimeUpdate={handleTimeUpdate}
                onPlay={handlePlay}
                onPause={handlePause}
                onWaiting={handleWaiting}
                onCanPlay={handleCanPlay}
                style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'contain',
                    display: 'block',
                }}
                title={title}
                playsInline
            />

            {/* Click overlay for play/pause */}
            <Box
                className="video-overlay-click"
                sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: '56px',
                }}
            />

            {/* Big center play button (shown initially & when paused) */}
            {(showBigPlay || (!isPlaying && !isBuffering)) && (
                <Box
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        zIndex: 2,
                        pointerEvents: 'none',
                    }}
                >
                    <Box
                        sx={{
                            width: 68,
                            height: 68,
                            borderRadius: '50%',
                            bgcolor: 'rgba(0,0,0,0.6)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            backdropFilter: 'blur(4px)',
                        }}
                    >
                        <PlayIcon sx={{ fontSize: 40, color: '#fff' }} />
                    </Box>
                </Box>
            )}

            {/* Buffering spinner */}
            {isBuffering && (
                <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 3 }}>
                    <CircularProgress size={48} sx={{ color: '#fff' }} />
                </Box>
            )}

            {/* Bottom gradient + controls */}
            <Box
                sx={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    background: 'linear-gradient(transparent, rgba(0,0,0,0.85))',
                    pt: 6,
                    pb: 0.5,
                    px: 1.5,
                    opacity: showControls ? 1 : 0,
                    transition: 'opacity 0.3s ease',
                    zIndex: 4,
                }}
                onClick={(e) => e.stopPropagation()}
            >
                {/* Progress bar */}
                <Box sx={{ px: 0.5, mb: -0.5 }}>
                    <Slider
                        value={progress}
                        onChange={handleSeek}
                        onChangeCommitted={handleSeekEnd}
                        onMouseDown={handleSeekStart}
                        sx={{
                            color: 'primary.main',
                            height: 3,
                            p: '6px 0',
                            '&:hover': { height: 5 },
                            '& .MuiSlider-thumb': {
                                width: 14,
                                height: 14,
                                transition: 'width 0.2s, height 0.2s',
                                '&:hover, &.Mui-focusVisible': {
                                    boxShadow: '0 0 0 6px rgba(76,175,80,0.16)',
                                },
                                '&.Mui-active': {
                                    width: 18,
                                    height: 18,
                                },
                            },
                            '& .MuiSlider-rail': {
                                opacity: 0.3,
                                bgcolor: 'rgba(255,255,255,0.3)',
                            },
                            '& .MuiSlider-track': {
                                border: 'none',
                            },
                        }}
                    />
                </Box>

                {/* Controls row */}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    {/* Play/Pause */}
                    <IconButton onClick={togglePlay} sx={{ color: '#fff', p: 0.75 }}>
                        {isPlaying ? <PauseIcon sx={{ fontSize: 28 }} /> : <PlayIcon sx={{ fontSize: 28 }} />}
                    </IconButton>

                    {/* Skip backward */}
                    <IconButton onClick={() => skip(-10)} sx={{ color: '#fff', p: 0.75 }}>
                        <Replay10Icon sx={{ fontSize: 22 }} />
                    </IconButton>

                    {/* Skip forward */}
                    <IconButton onClick={() => skip(10)} sx={{ color: '#fff', p: 0.75 }}>
                        <Forward10Icon sx={{ fontSize: 22 }} />
                    </IconButton>

                    {/* Volume */}
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, '&:hover .volume-slider': { width: 80, opacity: 1 } }}>
                        <IconButton onClick={toggleMute} sx={{ color: '#fff', p: 0.75 }}>
                            {isMuted || volume === 0 ? <VolumeMuteIcon sx={{ fontSize: 22 }} /> : <VolumeUpIcon sx={{ fontSize: 22 }} />}
                        </IconButton>
                        <Box className="volume-slider" sx={{ width: 0, opacity: 0, overflow: 'hidden', transition: 'width 0.2s, opacity 0.2s' }}>
                            <Slider
                                value={isMuted ? 0 : volume * 100}
                                onChange={handleVolumeChange}
                                size="small"
                                sx={{
                                    color: '#fff',
                                    width: 70,
                                    '& .MuiSlider-thumb': { width: 12, height: 12 },
                                    '& .MuiSlider-rail': { opacity: 0.3 },
                                }}
                            />
                        </Box>
                    </Box>

                    {/* Time */}
                    <Typography variant="caption" sx={{ color: '#fff', fontSize: '0.8rem', ml: 0.5, fontVariantNumeric: 'tabular-nums' }}>
                        {formatTime(currentTime)} / {formatTime(duration)}
                    </Typography>

                    <Box sx={{ flexGrow: 1 }} />

                    {/* Theater mode toggle */}
                    <Tooltip title={isTheaterMode ? 'Vista normal (t)' : 'Modo teatro (t)'} placement="top">
                        <IconButton onClick={onToggleTheater} sx={{ color: '#fff', p: 0.75 }}>
                            {isTheaterMode
                                ? <DefaultViewIcon sx={{ fontSize: 22 }} />
                                : <TheaterIcon sx={{ fontSize: 22 }} />
                            }
                        </IconButton>
                    </Tooltip>

                    {/* Fullscreen */}
                    <Tooltip title="Pantalla completa (f)" placement="top">
                        <IconButton onClick={toggleFullscreen} sx={{ color: '#fff', p: 0.75 }}>
                            {isFullscreen ? <FullscreenExitIcon sx={{ fontSize: 26 }} /> : <FullscreenIcon sx={{ fontSize: 26 }} />}
                        </IconButton>
                    </Tooltip>
                </Box>
            </Box>
        </Box>
    );
};

export default VideoPlayer;

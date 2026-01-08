import React, { useRef, useEffect, useState } from 'react';
import {
    Box,
    IconButton,
    Slider,
    Typography,
    Select,
    MenuItem,
    FormControl,
    Tooltip,
    Paper,
    Alert,
} from '@mui/material';
import {
    PlayArrow,
    Pause,
    VolumeUp,
    VolumeOff,
    Fullscreen,
    FullscreenExit,
    Download,
    Settings,
} from '@mui/icons-material';

/**
 * Simple Video Player Component (Fallback without HLS)
 * 
 * This is a simplified version that works with progressive sources only.
 * Use this if you're having issues with hls.js
 */
const SimpleVideoPlayer = ({
    progressiveSources = [],
    poster = '',
    title = 'Video',
    autoPlay = false,
}) => {
    const videoRef = useRef(null);
    const containerRef = useRef(null);

    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [volume, setVolume] = useState(1);
    const [isMuted, setIsMuted] = useState(false);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [selectedQuality, setSelectedQuality] = useState('');
    const [showControls, setShowControls] = useState(true);

    // Initialize video player
    useEffect(() => {
        const video = videoRef.current;
        if (!video || progressiveSources.length === 0) return;

        // Select highest quality by default
        const defaultSource = progressiveSources.find(s => s.quality === '1080p') || progressiveSources[0];
        setSelectedQuality(defaultSource.url);
        video.src = defaultSource.url;
    }, [progressiveSources]);

    // Video event listeners
    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        const handleTimeUpdate = () => setCurrentTime(video.currentTime);
        const handleDurationChange = () => setDuration(video.duration);
        const handlePlay = () => setIsPlaying(true);
        const handlePause = () => setIsPlaying(false);
        const handleVolumeChange = () => {
            setVolume(video.volume);
            setIsMuted(video.muted);
        };

        video.addEventListener('timeupdate', handleTimeUpdate);
        video.addEventListener('durationchange', handleDurationChange);
        video.addEventListener('play', handlePlay);
        video.addEventListener('pause', handlePause);
        video.addEventListener('volumechange', handleVolumeChange);

        return () => {
            video.removeEventListener('timeupdate', handleTimeUpdate);
            video.removeEventListener('durationchange', handleDurationChange);
            video.removeEventListener('play', handlePlay);
            video.removeEventListener('pause', handlePause);
            video.removeEventListener('volumechange', handleVolumeChange);
        };
    }, []);

    // Control functions
    const togglePlayPause = () => {
        const video = videoRef.current;
        if (video.paused) {
            video.play();
        } else {
            video.pause();
        }
    };

    const handleSeek = (event, newValue) => {
        const video = videoRef.current;
        video.currentTime = newValue;
        setCurrentTime(newValue);
    };

    const handleVolumeChange = (event, newValue) => {
        const video = videoRef.current;
        video.volume = newValue;
        setVolume(newValue);
    };

    const toggleMute = () => {
        const video = videoRef.current;
        video.muted = !video.muted;
        setIsMuted(!isMuted);
    };

    const toggleFullscreen = () => {
        const container = containerRef.current;
        if (!document.fullscreenElement) {
            container.requestFullscreen();
        } else {
            document.exitFullscreen();
        }
    };

    const handleQualityChange = (event) => {
        const newQuality = event.target.value;
        const video = videoRef.current;
        const currentTime = video.currentTime;
        const wasPlaying = !video.paused;

        video.src = newQuality;
        video.currentTime = currentTime;
        setSelectedQuality(newQuality);

        if (wasPlaying) {
            video.play();
        }
    };

    const handleDownload = () => {
        const video = videoRef.current;
        const link = document.createElement('a');
        link.href = video.src;
        link.download = `${title}.mp4`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const formatTime = (seconds) => {
        if (isNaN(seconds)) return '0:00';
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    if (progressiveSources.length === 0) {
        return (
            <Paper elevation={3} sx={{ p: 4, textAlign: 'center' }}>
                <Alert severity="warning">
                    No hay fuentes de video disponibles
                </Alert>
            </Paper>
        );
    }

    return (
        <Paper
            ref={containerRef}
            elevation={3}
            sx={{
                position: 'relative',
                width: '100%',
                maxWidth: '1200px',
                margin: '0 auto',
                borderRadius: 2,
                overflow: 'hidden',
                backgroundColor: '#000',
                aspectRatio: '16/9',
            }}
        >
            {/* Video Element */}
            <video
                ref={videoRef}
                poster={poster}
                autoPlay={autoPlay}
                style={{
                    width: '100%',
                    height: '100%',
                    display: 'block',
                }}
                onClick={togglePlayPause}
            />

            {/* Controls Overlay */}
            <Box
                sx={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 100%)',
                    padding: 2,
                    opacity: showControls ? 1 : 0,
                    transition: 'opacity 0.3s ease',
                }}
                onMouseEnter={() => setShowControls(true)}
                onMouseLeave={() => setShowControls(false)}
            >
                {/* Progress Bar */}
                <Slider
                    value={currentTime}
                    max={duration || 100}
                    onChange={handleSeek}
                    sx={{
                        color: 'primary.main',
                        '& .MuiSlider-thumb': {
                            width: 16,
                            height: 16,
                        },
                    }}
                />

                {/* Time Display */}
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="caption" sx={{ color: 'white' }}>
                        {formatTime(currentTime)} / {formatTime(duration)}
                    </Typography>
                </Box>

                {/* Control Buttons */}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    {/* Play/Pause */}
                    <Tooltip title={isPlaying ? 'Pausar' : 'Reproducir'}>
                        <IconButton onClick={togglePlayPause} sx={{ color: 'white' }}>
                            {isPlaying ? <Pause /> : <PlayArrow />}
                        </IconButton>
                    </Tooltip>

                    {/* Volume */}
                    <Tooltip title={isMuted ? 'Activar sonido' : 'Silenciar'}>
                        <IconButton onClick={toggleMute} sx={{ color: 'white' }}>
                            {isMuted || volume === 0 ? <VolumeOff /> : <VolumeUp />}
                        </IconButton>
                    </Tooltip>

                    <Slider
                        value={isMuted ? 0 : volume}
                        max={1}
                        step={0.01}
                        onChange={handleVolumeChange}
                        sx={{
                            width: 100,
                            color: 'white',
                            '& .MuiSlider-thumb': {
                                width: 12,
                                height: 12,
                            },
                        }}
                    />

                    <Box sx={{ flexGrow: 1 }} />

                    {/* Quality Selector */}
                    {progressiveSources.length > 1 && (
                        <FormControl size="small" sx={{ minWidth: 100 }}>
                            <Select
                                value={selectedQuality}
                                onChange={handleQualityChange}
                                sx={{
                                    color: 'white',
                                    '& .MuiOutlinedInput-notchedOutline': {
                                        borderColor: 'rgba(255,255,255,0.3)',
                                    },
                                    '& .MuiSvgIcon-root': {
                                        color: 'white',
                                    },
                                }}
                                startAdornment={<Settings sx={{ mr: 1, fontSize: 20 }} />}
                            >
                                {progressiveSources.map((source) => (
                                    <MenuItem key={source.url} value={source.url}>
                                        {source.quality}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    )}

                    {/* Download */}
                    <Tooltip title="Descargar video">
                        <IconButton onClick={handleDownload} sx={{ color: 'white' }}>
                            <Download />
                        </IconButton>
                    </Tooltip>

                    {/* Fullscreen */}
                    <Tooltip title={isFullscreen ? 'Salir de pantalla completa' : 'Pantalla completa'}>
                        <IconButton onClick={toggleFullscreen} sx={{ color: 'white' }}>
                            {isFullscreen ? <FullscreenExit /> : <Fullscreen />}
                        </IconButton>
                    </Tooltip>
                </Box>
            </Box>
        </Paper>
    );
};

export default SimpleVideoPlayer;

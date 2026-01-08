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
} from '@mui/material';
import {
    PlayArrow,
    Pause,
    VolumeUp,
    VolumeOff,
    Fullscreen,
    FullscreenExit,
    ClosedCaption,
    ClosedCaptionDisabled,
    Download,
    Settings,
} from '@mui/icons-material';
import Hls from 'hls.js';

/**
 * Advanced Video Player Component
 * 
 * Features:
 * - HLS streaming with hls.js fallback
 * - Progressive MP4/WebM support
 * - Quality selection (1080p, 720p, 480p)
 * - WebVTT subtitles
 * - Fullscreen mode
 * - Download functionality
 * - Startup time measurement
 * - Material-UI styled controls
 */
const VideoPlayer = ({
    progressiveSources = [],
    webmSources = [],
    hlsSource = null,
    vttTracks = [],
    poster = '',
    title = 'Video',
    autoPlay = false,
}) => {
    const videoRef = useRef(null);
    const hlsRef = useRef(null);
    const containerRef = useRef(null);
    const startTimeRef = useRef(null);

    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [volume, setVolume] = useState(1);
    const [isMuted, setIsMuted] = useState(false);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [showCaptions, setShowCaptions] = useState(false);
    const [selectedQuality, setSelectedQuality] = useState('auto');
    const [availableQualities, setAvailableQualities] = useState([]);
    const [showControls, setShowControls] = useState(true);
    const [isLoading, setIsLoading] = useState(true);
    const [startupTime, setStartupTime] = useState(null);
    const [useHls, setUseHls] = useState(false);
    const [error, setError] = useState(null);

    // Initialize video player
    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        startTimeRef.current = performance.now();

        try {
            // Check if HLS is supported
            if (hlsSource && Hls && Hls.isSupported && Hls.isSupported()) {
                setUseHls(true);
                const hls = new Hls({
                    enableWorker: true,
                    lowLatencyMode: false,
                    backBufferLength: 90,
                });

                hlsRef.current = hls;
                hls.loadSource(hlsSource.url);
                hls.attachMedia(video);

                hls.on(Hls.Events.MANIFEST_PARSED, (event, data) => {
                    console.log('HLS manifest loaded, found ' + data.levels.length + ' quality levels');

                    // Set available qualities from HLS levels
                    const qualities = data.levels.map((level, index) => ({
                        label: `${level.height}p`,
                        value: index,
                        height: level.height,
                    }));
                    setAvailableQualities([{ label: 'Auto', value: 'auto' }, ...qualities]);
                    setSelectedQuality('auto');
                });

                hls.on(Hls.Events.ERROR, (event, data) => {
                    console.error('HLS error:', data);
                    if (data.fatal) {
                        switch (data.type) {
                            case Hls.ErrorTypes.NETWORK_ERROR:
                                console.log('Network error, trying to recover...');
                                hls.startLoad();
                                break;
                            case Hls.ErrorTypes.MEDIA_ERROR:
                                console.log('Media error, trying to recover...');
                                hls.recoverMediaError();
                                break;
                            default:
                                console.log('Fatal error, cannot recover');
                                setError('Error al cargar el video HLS');
                                hls.destroy();
                                break;
                        }
                    }
                });
            } else if (hlsSource && video.canPlayType && video.canPlayType('application/vnd.apple.mpegurl')) {
                // Native HLS support (Safari)
                setUseHls(true);
                video.src = hlsSource.url;
            } else {
                // Fallback to progressive sources
                setUseHls(false);
                const sources = [...progressiveSources, ...webmSources];
                if (sources.length > 0) {
                    // Set available qualities from progressive sources
                    const qualities = sources.map((source) => ({
                        label: source.quality,
                        value: source.url,
                        quality: source.quality,
                    }));
                    setAvailableQualities(qualities);

                    // Select highest quality by default
                    const defaultSource = sources.find(s => s.quality === '1080p') || sources[0];
                    setSelectedQuality(defaultSource.url);
                    video.src = defaultSource.url;
                } else {
                    setError('No hay fuentes de video disponibles');
                }
            }

            // Add subtitle tracks
            if (vttTracks && vttTracks.length > 0) {
                vttTracks.forEach((track) => {
                    const trackElement = document.createElement('track');
                    trackElement.kind = track.kind || 'subtitles';
                    trackElement.label = track.label;
                    trackElement.srclang = track.srclang;
                    trackElement.src = track.src;
                    trackElement.default = track.default || false;
                    video.appendChild(trackElement);
                });
            }
        } catch (err) {
            console.error('Error initializing video player:', err);
            setError(`Error al inicializar el reproductor: ${err.message}`);
        }

        return () => {
            if (hlsRef.current) {
                try {
                    hlsRef.current.destroy();
                } catch (err) {
                    console.error('Error destroying HLS instance:', err);
                }
            }
        };
    }, [hlsSource, progressiveSources, webmSources, vttTracks]);

    // Measure startup time
    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        const handleCanPlay = () => {
            setIsLoading(false);
            if (startTimeRef.current) {
                const startup = performance.now() - startTimeRef.current;
                setStartupTime(startup);
                console.log(`Video startup time: ${startup.toFixed(2)}ms`);
            }
        };

        video.addEventListener('canplay', handleCanPlay);
        return () => video.removeEventListener('canplay', handleCanPlay);
    }, []);

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

    // Fullscreen change listener
    useEffect(() => {
        const handleFullscreenChange = () => {
            setIsFullscreen(!!document.fullscreenElement);
        };

        document.addEventListener('fullscreenchange', handleFullscreenChange);
        return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
    }, []);

    // Auto-hide controls
    useEffect(() => {
        let timeout;
        const handleMouseMove = () => {
            setShowControls(true);
            clearTimeout(timeout);
            timeout = setTimeout(() => {
                if (isPlaying) setShowControls(false);
            }, 3000);
        };

        const container = containerRef.current;
        if (container) {
            container.addEventListener('mousemove', handleMouseMove);
            return () => {
                container.removeEventListener('mousemove', handleMouseMove);
                clearTimeout(timeout);
            };
        }
    }, [isPlaying]);

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
        if (newValue === 0) {
            setIsMuted(true);
        } else if (isMuted) {
            setIsMuted(false);
        }
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

    const toggleCaptions = () => {
        const video = videoRef.current;
        const tracks = video.textTracks;

        if (tracks.length > 0) {
            for (let i = 0; i < tracks.length; i++) {
                tracks[i].mode = showCaptions ? 'hidden' : 'showing';
            }
            setShowCaptions(!showCaptions);
        }
    };

    const handleQualityChange = (event) => {
        const newQuality = event.target.value;
        setSelectedQuality(newQuality);

        if (useHls && hlsRef.current) {
            // HLS quality change
            if (newQuality === 'auto') {
                hlsRef.current.currentLevel = -1; // Auto quality
            } else {
                hlsRef.current.currentLevel = newQuality;
            }
        } else {
            // Progressive quality change
            const video = videoRef.current;
            const currentTime = video.currentTime;
            const wasPlaying = !video.paused;

            video.src = newQuality;
            video.currentTime = currentTime;

            if (wasPlaying) {
                video.play();
            }
        }
    };

    const handleDownload = () => {
        if (useHls) {
            alert('HLS streams cannot be downloaded directly. Please use a progressive source.');
            return;
        }

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

    return (
        <Paper
            ref={containerRef}
            elevation={8}
            sx={{
                position: 'relative',
                width: '100%',
                maxWidth: '1200px',
                margin: '0 auto',
                borderRadius: 3,
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

            {/* Loading Indicator */}
            {isLoading && !error && (
                <Box
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        color: 'white',
                    }}
                >
                    <Typography variant="h6">Cargando video...</Typography>
                </Box>
            )}

            {/* Error Display */}
            {error && (
                <Box
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        color: 'white',
                        textAlign: 'center',
                        p: 3,
                        bgcolor: 'rgba(255, 0, 0, 0.2)',
                        borderRadius: 2,
                        maxWidth: '80%',
                    }}
                >
                    <Typography variant="h6" color="error" gutterBottom>
                        ⚠️ Error
                    </Typography>
                    <Typography variant="body2">
                        {error}
                    </Typography>
                </Box>
            )}

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
                    pointerEvents: showControls ? 'auto' : 'none',
                }}
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
                    {startupTime && (
                        <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.6)' }}>
                            Startup: {startupTime.toFixed(0)}ms
                        </Typography>
                    )}
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

                    {/* Time */}
                    <Typography variant="body2" sx={{ color: 'white', mx: 1 }}>
                        {formatTime(currentTime)}
                    </Typography>

                    <Box sx={{ flexGrow: 1 }} />

                    {/* Quality Selector */}
                    {availableQualities.length > 0 && (
                        <FormControl size="small" sx={{ minWidth: 100 }}>
                            <Select
                                value={selectedQuality}
                                onChange={handleQualityChange}
                                sx={{
                                    color: 'white',
                                    '& .MuiOutlinedInput-notchedOutline': {
                                        borderColor: 'rgba(255,255,255,0.3)',
                                    },
                                    '&:hover .MuiOutlinedInput-notchedOutline': {
                                        borderColor: 'rgba(255,255,255,0.5)',
                                    },
                                    '& .MuiSvgIcon-root': {
                                        color: 'white',
                                    },
                                }}
                                startAdornment={<Settings sx={{ mr: 1, fontSize: 20 }} />}
                            >
                                {availableQualities.map((quality) => (
                                    <MenuItem key={quality.value} value={quality.value}>
                                        {quality.label}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    )}

                    {/* Captions */}
                    {vttTracks.length > 0 && (
                        <Tooltip title={showCaptions ? 'Ocultar subtítulos' : 'Mostrar subtítulos'}>
                            <IconButton onClick={toggleCaptions} sx={{ color: 'white' }}>
                                {showCaptions ? <ClosedCaption /> : <ClosedCaptionDisabled />}
                            </IconButton>
                        </Tooltip>
                    )}

                    {/* Download */}
                    {!useHls && (
                        <Tooltip title="Descargar video">
                            <IconButton onClick={handleDownload} sx={{ color: 'white' }}>
                                <Download />
                            </IconButton>
                        </Tooltip>
                    )}

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

export default VideoPlayer;

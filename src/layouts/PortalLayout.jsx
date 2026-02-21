import React, { useState, useEffect } from 'react';
import {
    Box,
    AppBar,
    Toolbar,
    IconButton,
    TextField,
    InputAdornment,
    useTheme,
    useMediaQuery,
} from '@mui/material';
import {
    Menu as MenuIcon,
    LightMode as LightModeIcon,
    DarkMode as DarkModeIcon,
    Search as SearchIcon,
    EnergySavingsLeaf as EcoIcon,
} from '@mui/icons-material';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useThemeMode } from '../core/context/ThemeContext';
import { Sidebar, UserMenu, DRAWER_WIDTH } from '../components/common';
import { MINI_DRAWER_WIDTH } from '../components/common/Sidebar';

const PortalLayout = ({ children }) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('lg'));
    const [mobileOpen, setMobileOpen] = useState(false);
    const [sidebarExpanded, setSidebarExpanded] = useState(false);
    const { mode, toggleTheme } = useThemeMode();
    const location = useLocation();
    const navigate = useNavigate();

    // Search state — shared with HomeFeedPage via Outlet context
    const [searchQuery, setSearchQuery] = useState('');

    const isWatchPage = location.pathname.startsWith('/portal/watch');
    const isHomePage = location.pathname === '/portal/home';

    /**
     * Sidebar mode (YouTube-like behavior):
     * - Watch page → 'hidden': no permanent sidebar, hamburger opens overlay
     * - All other pages → 'mini' by default, hamburger TRANSFORMS to 'full' (pushes content)
     */
    const sidebarMode = isWatchPage ? 'hidden' : (sidebarExpanded ? 'full' : 'mini');

    // Reset sidebar expansion when navigating
    useEffect(() => {
        setSidebarExpanded(false);
    }, [location.pathname]);

    const handleDrawerToggle = () => {
        if (isWatchPage || isMobile) {
            // Watch page & mobile: overlay drawer
            setMobileOpen(!mobileOpen);
        } else {
            // All other desktop pages: transform mini ↔ full (same sidebar expands)
            setSidebarExpanded((prev) => !prev);
        }
    };

    // Calculate the effective drawer width for main content margin
    const effectiveDrawerWidth = sidebarMode === 'hidden'
        ? 0
        : sidebarMode === 'mini'
            ? MINI_DRAWER_WIDTH
            : DRAWER_WIDTH;

    return (
        <Box sx={{ display: 'flex', minHeight: '100vh' }}>
            {/* Top Header */}
            <AppBar
                position="fixed"
                elevation={0}
                sx={{
                    zIndex: (theme) => theme.zIndex.drawer + 1,
                    bgcolor: 'background.paper',
                    color: 'text.primary',
                    borderBottom: '1px solid',
                    borderColor: (theme) =>
                        theme.palette.mode === 'dark'
                            ? 'rgba(255,255,255,0.06)'
                            : 'rgba(0,0,0,0.06)',
                }}
            >
                <Toolbar sx={{ gap: 1 }}>
                    {/* Hamburger menu button — always visible like YouTube */}
                    <IconButton
                        color="inherit"
                        edge="start"
                        onClick={handleDrawerToggle}
                    >
                        <MenuIcon />
                    </IconButton>

                    {/* EcoLearn Logo — clickable → Home */}
                    <Box
                        onClick={() => navigate('/portal/home')}
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 1,
                            mr: 2,
                            flexShrink: 0,
                            cursor: 'pointer',
                            '&:hover': { opacity: 0.8 },
                            transition: 'opacity 0.2s',
                        }}
                    >
                        <Box
                            sx={{
                                width: 32,
                                height: 32,
                                borderRadius: 1.5,
                                bgcolor: 'primary.main',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}
                        >
                            <EcoIcon sx={{ color: '#ffffff', fontSize: 18 }} />
                        </Box>
                        <Box
                            sx={{
                                fontWeight: 700,
                                fontSize: '1.1rem',
                                lineHeight: 1,
                                display: { xs: 'none', sm: 'block' },
                                userSelect: 'none',
                            }}
                        >
                            EcoLearn
                        </Box>
                    </Box>

                    {/* Center: Search bar (only on Home page) */}
                    {isHomePage ? (
                        <Box sx={{ flex: 1, display: 'flex', justifyContent: 'center', mx: { xs: 0, sm: 2 } }}>
                            <TextField
                                placeholder="Buscar videos..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                size="small"
                                sx={{
                                    width: '100%',
                                    maxWidth: 560,
                                    '& .MuiOutlinedInput-root': {
                                        borderRadius: 10,
                                        bgcolor: (theme) =>
                                            theme.palette.mode === 'dark'
                                                ? 'rgba(255,255,255,0.06)'
                                                : 'rgba(0,0,0,0.04)',
                                        '&:hover': {
                                            bgcolor: (theme) =>
                                                theme.palette.mode === 'dark'
                                                    ? 'rgba(255,255,255,0.1)'
                                                    : 'rgba(0,0,0,0.06)',
                                        },
                                        '& fieldset': {
                                            borderColor: 'divider',
                                        },
                                    },
                                }}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <SearchIcon sx={{ color: 'text.secondary', fontSize: 20 }} />
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        </Box>
                    ) : (
                        <Box sx={{ flexGrow: 1 }} />
                    )}

                    {/* Right side actions */}
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, flexShrink: 0 }}>
                        {/* Theme toggle */}
                        <IconButton onClick={toggleTheme} color="inherit" size="small">
                            {mode === 'dark' ? <LightModeIcon /> : <DarkModeIcon />}
                        </IconButton>

                        {/* User Menu */}
                        <UserMenu />
                    </Box>
                </Toolbar>
            </AppBar>

            {/* Sidebar */}
            <Sidebar
                mobileOpen={mobileOpen}
                onMobileClose={handleDrawerToggle}
                mode={sidebarMode}
            />

            {/* Main Content */}
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    p: sidebarMode === 'hidden' ? { xs: 0 } : { xs: 2, sm: 3 },
                    width: { lg: `calc(100% - ${effectiveDrawerWidth}px)` },
                    ml: { lg: `${effectiveDrawerWidth}px` },
                    mt: '64px',
                    minHeight: 'calc(100vh - 64px)',
                    bgcolor: 'background.default',
                    transition: theme.transitions.create(['margin', 'width'], {
                        easing: theme.transitions.easing.sharp,
                        duration: theme.transitions.duration.enteringScreen,
                    }),
                }}
            >
                {children || <Outlet context={{ searchQuery, setSearchQuery }} />}
            </Box>
        </Box>
    );
};

export default PortalLayout;

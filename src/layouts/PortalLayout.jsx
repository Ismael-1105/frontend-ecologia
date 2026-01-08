import React, { useState } from 'react';
import { Box, AppBar, Toolbar, IconButton, useTheme, useMediaQuery } from '@mui/material';
import { Menu as MenuIcon, LightMode as LightModeIcon, DarkMode as DarkModeIcon } from '@mui/icons-material';
import { Outlet } from 'react-router-dom';
import { useThemeMode } from '../core/context/ThemeContext';
import { Sidebar, SearchBar, NotificationBell, UserMenu, DRAWER_WIDTH } from '../components/common';

const PortalLayout = ({ children }) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('lg'));
    const [mobileOpen, setMobileOpen] = useState(false);
    const { mode, toggleTheme } = useThemeMode();

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

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
                    borderColor: 'divider'
                }}
            >
                <Toolbar sx={{ gap: 2 }}>
                    {/* Mobile menu button */}
                    <IconButton
                        color="inherit"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ display: { lg: 'none' } }}
                    >
                        <MenuIcon />
                    </IconButton>

                    {/* Search Bar */}
                    <Box sx={{ display: { xs: 'none', md: 'block' }, flex: 1, maxWidth: 600 }}>
                        <SearchBar />
                    </Box>

                    <Box sx={{ flexGrow: 1 }} />

                    {/* Right side actions */}
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        {/* Theme toggle */}
                        <IconButton onClick={toggleTheme} color="inherit">
                            {mode === 'dark' ? <LightModeIcon /> : <DarkModeIcon />}
                        </IconButton>

                        {/* Notifications */}
                        <NotificationBell />

                        {/* User Menu */}
                        <UserMenu />
                    </Box>
                </Toolbar>
            </AppBar>

            {/* Sidebar */}
            <Sidebar
                mobileOpen={mobileOpen}
                onMobileClose={handleDrawerToggle}
            />

            {/* Main Content */}
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    p: { xs: 2, sm: 3 },
                    width: { lg: `calc(100% - ${DRAWER_WIDTH}px)` },
                    ml: { lg: `${DRAWER_WIDTH}px` },
                    mt: '64px', // AppBar height
                    minHeight: 'calc(100vh - 64px)',
                    bgcolor: 'background.default'
                }}
            >
                {children || <Outlet />}
            </Box>
        </Box>
    );
};

export default PortalLayout;

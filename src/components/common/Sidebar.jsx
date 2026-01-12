import React from 'react';
import {
    Drawer,
    Box,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Badge,
    Button,
    Divider,
    useMediaQuery,
    useTheme
} from '@mui/material';
import {
    Dashboard as DashboardIcon,
    VideoLibrary as VideoLibraryIcon,
    Forum as ForumIcon,
    MenuBook as MenuBookIcon,
    People as PeopleIcon,
    CloudUpload as CloudUploadIcon,
    Logout as LogoutIcon,
    EnergySavingsLeaf as EcoIcon
} from '@mui/icons-material';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../core/context/AuthContext';
import CategoryList from './CategoryList';

const DRAWER_WIDTH = 260;

const navigationItems = [
    { name: 'Inicio', path: '/portal/dashboard', icon: DashboardIcon },
    { name: 'Videos', path: '/portal/video-player', icon: VideoLibraryIcon },
    { name: 'Foro', path: '/portal/foro', icon: ForumIcon, badge: 12 },
    { name: 'Recursos', path: '/portal/recursos', icon: MenuBookIcon },
];

const Sidebar = ({ mobileOpen, onMobileClose }) => {
    const location = useLocation();
    const navigate = useNavigate();
    const { logout } = useAuth();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('lg'));

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const drawerContent = (
        <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
            {/* Logo */}
            <Box
                sx={{
                    p: 2.5,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1.5
                }}
            >
                <Box
                    sx={{
                        width: 36,
                        height: 36,
                        borderRadius: 2,
                        bgcolor: 'primary.main',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                >
                    <EcoIcon sx={{ color: 'primary.contrastText', fontSize: 20 }} />
                </Box>
                <Box>
                    <Box sx={{ fontWeight: 700, fontSize: '1.125rem', lineHeight: 1.2 }}>
                        EcoLearn
                    </Box>
                    <Box sx={{ fontSize: '0.75rem', color: 'text.secondary', lineHeight: 1.2 }}>
                        Loja
                    </Box>
                </Box>
            </Box>

            <Divider />

            {/* Navigation */}
            <Box sx={{ flex: 1, overflowY: 'auto', py: 2 }}>
                <List sx={{ px: 1.5 }}>
                    {navigationItems.map((item) => {
                        const isActive = location.pathname === item.path ||
                            location.pathname.startsWith(item.path + '/');
                        return (
                            <ListItem key={item.name} disablePadding sx={{ mb: 0.5 }}>
                                <ListItemButton
                                    component={Link}
                                    to={item.path}
                                    onClick={isMobile ? onMobileClose : undefined}
                                    sx={{
                                        borderRadius: 2,
                                        py: 1.25,
                                        px: 1.5,
                                        bgcolor: isActive ? 'primary.main' : 'transparent',
                                        color: isActive ? 'primary.contrastText' : 'text.primary',
                                        '&:hover': {
                                            bgcolor: isActive ? 'primary.dark' : 'action.hover'
                                        }
                                    }}
                                >
                                    <ListItemIcon
                                        sx={{
                                            minWidth: 40,
                                            color: isActive ? 'primary.contrastText' : 'text.secondary'
                                        }}
                                    >
                                        <item.icon fontSize="small" />
                                    </ListItemIcon>
                                    <ListItemText
                                        primary={item.name}
                                        primaryTypographyProps={{
                                            variant: 'body2',
                                            fontWeight: isActive ? 600 : 500
                                        }}
                                    />
                                    {item.badge && (
                                        <Badge
                                            badgeContent={item.badge}
                                            color={isActive ? 'secondary' : 'primary'}
                                            sx={{
                                                '& .MuiBadge-badge': {
                                                    fontSize: '0.625rem',
                                                    height: 18,
                                                    minWidth: 18,
                                                    bgcolor: isActive ? 'rgba(255,255,255,0.2)' : undefined
                                                }
                                            }}
                                        />
                                    )}
                                </ListItemButton>
                            </ListItem>
                        );
                    })}
                </List>

                {/* Categories */}
                <CategoryList />
            </Box>

            {/* Logout */}
            <Box sx={{ p: 2, borderTop: '1px solid', borderColor: 'divider' }}>
                <Button
                    fullWidth
                    variant="text"
                    startIcon={<LogoutIcon />}
                    onClick={handleLogout}
                    sx={{
                        justifyContent: 'flex-start',
                        color: 'text.secondary',
                        '&:hover': {
                            color: 'text.primary'
                        }
                    }}
                >
                    Cerrar Sesión
                </Button>
            </Box>
        </Box>
    );

    return (
        <>
            {/* Mobile Drawer */}
            <Drawer
                variant="temporary"
                open={mobileOpen}
                onClose={onMobileClose}
                ModalProps={{
                    keepMounted: true // Better mobile performance
                }}
                sx={{
                    display: { xs: 'block', lg: 'none' },
                    '& .MuiDrawer-paper': {
                        width: DRAWER_WIDTH,
                        boxSizing: 'border-box'
                    }
                }}
            >
                {drawerContent}
            </Drawer>

            {/* Desktop Drawer */}
            <Drawer
                variant="permanent"
                sx={{
                    display: { xs: 'none', lg: 'block' },
                    '& .MuiDrawer-paper': {
                        width: DRAWER_WIDTH,
                        boxSizing: 'border-box',
                        borderRight: '1px solid',
                        borderColor: 'divider'
                    }
                }}
                open
            >
                {drawerContent}
            </Drawer>
        </>
    );
};

export default Sidebar;
export { DRAWER_WIDTH };

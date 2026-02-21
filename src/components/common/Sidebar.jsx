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
    Divider,
    Typography,
    Tooltip,
    useMediaQuery,
    useTheme
} from '@mui/material';
import {
    Home as HomeFilled,
    HomeOutlined,
    Dashboard as DashboardFilled,
    DashboardOutlined,
    VideoFile as VideoFileFilled,
    VideoFileOutlined,
    Forum as ForumFilled,
    ForumOutlined,
    MenuBook as MenuBookFilled,
    MenuBookOutlined,
    People as PeopleFilled,
    PeopleOutlined,
    EnergySavingsLeaf as EcoIcon
} from '@mui/icons-material';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../core/context/AuthContext';

const DRAWER_WIDTH = 260;
const MINI_DRAWER_WIDTH = 72;

const navigationItems = [
    { name: 'Inicio', path: '/portal/home', icon: HomeFilled, iconOutlined: HomeOutlined },
    { name: 'Foro', path: '/portal/foro', icon: ForumFilled, iconOutlined: ForumOutlined },
    { name: 'Recursos', path: '/portal/recursos', icon: MenuBookFilled, iconOutlined: MenuBookOutlined },
    { name: 'Mis Videos', path: '/portal/video-player', icon: VideoFileFilled, iconOutlined: VideoFileOutlined },
    { name: 'Mi Panel', path: '/portal/dashboard', icon: DashboardFilled, iconOutlined: DashboardOutlined },
];

const adminNavigationItems = [
    { name: 'Gestión de Usuarios', path: '/portal/admin/users', icon: PeopleFilled, iconOutlined: PeopleOutlined },
];

const Sidebar = ({ mobileOpen, onMobileClose, mode = 'full' }) => {
    const location = useLocation();
    const { user } = useAuth();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('lg'));

    const isMini = mode === 'mini';
    const isHidden = mode === 'hidden';

    const currentDrawerWidth = isMini ? MINI_DRAWER_WIDTH : DRAWER_WIDTH;

    // ─── Shared navigation list ───
    const navigationList = (closeOnClick) => (
        <>
            <List sx={{ px: 1.5 }}>
                {navigationItems.map((item) => {
                    const isActive = location.pathname === item.path ||
                        location.pathname.startsWith(item.path + '/');
                    return (
                        <ListItem key={item.name} disablePadding sx={{ mb: 0.5 }}>
                            <ListItemButton
                                component={Link}
                                to={item.path}
                                onClick={closeOnClick ? onMobileClose : undefined}
                                sx={{
                                    borderRadius: 2,
                                    py: 1.25,
                                    px: 1.5,
                                    bgcolor: isActive ? 'primary.main' : 'transparent',
                                    color: isActive ? '#fff' : 'text.primary',
                                    '&:hover': {
                                        bgcolor: isActive ? 'primary.dark' : 'action.hover'
                                    }
                                }}
                            >
                                <ListItemIcon sx={{ minWidth: 40, color: isActive ? '#fff' : 'text.primary' }}>
                                    {isActive ? <item.icon fontSize="small" /> : <item.iconOutlined fontSize="small" />}
                                </ListItemIcon>
                                <ListItemText primary={item.name} primaryTypographyProps={{ variant: 'body2', fontWeight: isActive ? 600 : 500 }} />
                                {item.badge && (
                                    <Badge badgeContent={item.badge} color={isActive ? 'secondary' : 'primary'}
                                        sx={{ '& .MuiBadge-badge': { fontSize: '0.625rem', height: 18, minWidth: 18, bgcolor: isActive ? 'rgba(255,255,255,0.2)' : undefined } }}
                                    />
                                )}
                            </ListItemButton>
                        </ListItem>
                    );
                })}
            </List>

            {(user?.role === 'Administrador' || user?.role === 'SuperAdmin') && (
                <>
                    <Divider sx={{ my: 2 }} />
                    <Typography variant="caption" sx={{ px: 2.5, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 0.5, color: 'text.secondary', display: 'block', mb: 1.5 }}>
                        Administración
                    </Typography>
                    <List sx={{ px: 1.5 }}>
                        {adminNavigationItems.map((item) => {
                            const isActive = location.pathname === item.path || location.pathname.startsWith(item.path + '/');
                            return (
                                <ListItem key={item.name} disablePadding sx={{ mb: 0.5 }}>
                                    <ListItemButton component={Link} to={item.path} onClick={closeOnClick ? onMobileClose : undefined}
                                        sx={{ borderRadius: 2, py: 1.25, px: 1.5, bgcolor: isActive ? 'error.main' : 'transparent', color: isActive ? 'error.contrastText' : 'text.primary', '&:hover': { bgcolor: isActive ? 'error.dark' : 'action.hover' } }}
                                    >
                                        <ListItemIcon sx={{ minWidth: 40, color: isActive ? 'error.contrastText' : 'text.secondary' }}>
                                            {isActive ? <item.icon fontSize="small" /> : <item.iconOutlined fontSize="small" />}
                                        </ListItemIcon>
                                        <ListItemText primary={item.name} primaryTypographyProps={{ variant: 'body2', fontWeight: isActive ? 600 : 500 }} />
                                    </ListItemButton>
                                </ListItem>
                            );
                        })}
                    </List>
                </>
            )}

        </>
    );

    // ─── Temporary drawer content (with logo — for hamburger overlay) ───
    const temporaryDrawerContent = (
        <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
            <Box sx={{ p: 2.5, display: 'flex', alignItems: 'center', gap: 1.5 }}>
                <Box sx={{ width: 36, height: 36, borderRadius: 2, bgcolor: 'primary.main', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <EcoIcon sx={{ color: '#ffffff', fontSize: 20 }} />
                </Box>
                <Box>
                    <Box sx={{ fontWeight: 700, fontSize: '1.125rem', lineHeight: 1.2 }}>EcoLearn</Box>
                    <Box sx={{ fontSize: '0.75rem', color: 'text.secondary', lineHeight: 1.2 }}>Loja</Box>
                </Box>
            </Box>
            <Divider />
            <Box sx={{ flex: 1, overflowY: 'auto', py: 2 }}>
                {navigationList(true)}
            </Box>
        </Box>
    );

    // ─── Permanent full content (no logo, starts right at top) ───
    const permanentFullContent = (
        <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
            <Box sx={{ flex: 1, overflowY: 'auto', pt: 1, pb: 2 }}>
                {navigationList(false)}
            </Box>
        </Box>
    );

    // ─── Permanent mini content (icons only) ───
    const permanentMiniContent = (
        <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%', alignItems: 'center' }}>
            <Box sx={{ flex: 1, overflowY: 'auto', pt: 0.5, pb: 1.5, width: '100%' }}>
                <List sx={{ px: 0.5 }}>
                    {navigationItems.map((item) => {
                        const isActive = location.pathname === item.path ||
                            location.pathname.startsWith(item.path + '/');
                        return (
                            <Tooltip key={item.name} title={item.name} placement="right" arrow>
                                <ListItem disablePadding sx={{ mb: 0.5, display: 'flex', justifyContent: 'center' }}>
                                    <ListItemButton
                                        component={Link}
                                        to={item.path}
                                        sx={{
                                            borderRadius: 2, py: 1.5, px: 0, minWidth: 0, mx: 0.5,
                                            flexDirection: 'column', alignItems: 'center', gap: 0.5,
                                            bgcolor: isActive ? 'primary.main' : 'transparent',
                                            color: isActive ? '#fff' : 'text.primary',
                                            '&:hover': { bgcolor: isActive ? 'primary.dark' : 'action.hover' }
                                        }}
                                    >
                                        <Badge badgeContent={item.badge || 0} color="primary" invisible={!item.badge}
                                            sx={{ '& .MuiBadge-badge': { fontSize: '0.55rem', height: 15, minWidth: 15 } }}
                                        >
                                            {isActive
                                                ? <item.icon sx={{ fontSize: 22, color: '#fff' }} />
                                                : <item.iconOutlined sx={{ fontSize: 22, color: 'text.primary' }} />
                                            }
                                        </Badge>
                                        <Typography variant="caption" sx={{
                                            fontSize: '0.6rem', lineHeight: 1.1,
                                            fontWeight: isActive ? 600 : 400,
                                            color: isActive ? '#fff' : 'text.primary',
                                            textAlign: 'center', maxWidth: 60,
                                            overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                                        }}>
                                            {item.name}
                                        </Typography>
                                    </ListItemButton>
                                </ListItem>
                            </Tooltip>
                        );
                    })}
                </List>
            </Box>
        </Box>
    );

    return (
        <>
            {/* Temporary Drawer — always available (hamburger overlay) */}
            <Drawer
                variant="temporary"
                open={mobileOpen}
                onClose={onMobileClose}
                ModalProps={{ keepMounted: true }}
                sx={{
                    '& .MuiDrawer-paper': {
                        width: DRAWER_WIDTH,
                        boxSizing: 'border-box'
                    }
                }}
            >
                {temporaryDrawerContent}
            </Drawer>

            {/* Desktop Permanent Drawer — only when mode is NOT 'hidden' */}
            {!isHidden && (
                <Drawer
                    variant="permanent"
                    sx={{
                        display: { xs: 'none', lg: 'block' },
                        '& .MuiDrawer-paper': {
                            width: currentDrawerWidth,
                            boxSizing: 'border-box',
                            borderRight: '1px solid',
                            borderColor: 'divider',
                            overflowX: 'hidden',
                            top: 64,
                            height: 'calc(100vh - 64px)',
                            transition: theme.transitions.create('width', {
                                easing: theme.transitions.easing.sharp,
                                duration: theme.transitions.duration.enteringScreen,
                            }),
                        }
                    }}
                    open
                >
                    {isMini ? permanentMiniContent : permanentFullContent}
                </Drawer>
            )}
        </>
    );
};

export default Sidebar;
export { DRAWER_WIDTH, MINI_DRAWER_WIDTH };

import {
    IconButton,
    Menu,
    MenuItem,
    Avatar,
    Box,
    Typography,
    Divider,
    ListItemIcon,
    Tooltip
} from '@mui/material';
import {
    Person as PersonIcon,
    Settings as SettingsIcon,
    Logout as LogoutIcon,
    AdminPanelSettings as AdminPanelSettingsIcon
} from '@mui/icons-material';
import { useAuth } from '../../core/context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useState } from "react";


const UserMenu = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleProfile = () => {
        navigate('/portal/profile');
        handleClose();
    };

    const handleSettings = () => {
        navigate('/portal/configuracion');
        handleClose();
    };

    const handleLogout = () => {
        logout();
        navigate('/login');
        handleClose();
    };

    const getInitials = (name) => {
        if (!name) return 'U';
        return name
            .split(' ')
            .map(n => n[0])
            .join('')
            .toUpperCase()
            .slice(0, 2);
    };

    return (
        <>
            <Tooltip title="Mi cuenta" arrow>
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1.5,
                        pl: 2,
                        borderLeft: '1px solid',
                        borderColor: 'divider',
                        cursor: 'pointer'
                    }}
                    onClick={handleClick}
                >
                    <Avatar
                        src={user?.profilePicture}
                        sx={{
                            width: 32,
                            height: 32,
                            bgcolor: 'primary.main',
                            fontSize: '0.875rem'
                        }}
                    >
                        {getInitials(user?.name)}
                    </Avatar>
                    <Box sx={{ display: { xs: 'none', md: 'block' } }}>
                        <Typography variant="body2" sx={{ fontWeight: 600, lineHeight: 1.2 }}>
                            {user?.name || 'Usuario'}
                        </Typography>
                        <Typography variant="caption" color="text.secondary" sx={{ lineHeight: 1.2 }}>
                            {user?.role || 'Estudiante'}
                        </Typography>
                    </Box>
                </Box>
            </Tooltip>

            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                PaperProps={{
                    sx: {
                        width: 220,
                        mt: 1
                    }
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
                <Box sx={{ px: 2, py: 1.5, display: 'flex', alignItems: 'center', gap: 1.5 }}>
                    <Avatar
                        src={user?.profilePicture}
                        sx={{
                            width: 48,
                            height: 48,
                            bgcolor: 'primary.main'
                        }}
                    >
                        {getInitials(user?.name)}
                    </Avatar>
                    <Box sx={{ flex: 1 }}>
                        <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
                            {user?.name || 'Usuario'}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                            {user?.email}
                        </Typography>
                    </Box>
                </Box>
                <Divider />

                <MenuItem onClick={handleProfile}>
                    <ListItemIcon>
                        <PersonIcon fontSize="small" />
                    </ListItemIcon>
                    Mi Perfil
                </MenuItem>

                {['Administrador', 'SuperAdmin'].includes(user?.role) && (
                    <MenuItem onClick={() => {
                        navigate('/portal/admin/users');
                        handleClose();
                    }}>
                        <ListItemIcon>
                            <AdminPanelSettingsIcon fontSize="small" />
                        </ListItemIcon>
                        Gestión de Usuarios
                    </MenuItem>
                )}


                <Divider />

                <MenuItem onClick={handleLogout}>
                    <ListItemIcon>
                        <LogoutIcon fontSize="small" color="error" />
                    </ListItemIcon>
                    <Typography color="error">Cerrar Sesión</Typography>
                </MenuItem>
            </Menu>
        </>
    );
};

export default UserMenu;

import React, { useState } from 'react';
import {
    IconButton,
    Badge,
    Menu,
    MenuItem,
    Typography,
    Box,
    Divider,
    Button
} from '@mui/material';
import {
    Notifications as NotificationsIcon,
    Circle as CircleIcon
} from '@mui/icons-material';

const mockNotifications = [
    {
        id: 1,
        title: 'Nuevo comentario en tu video',
        message: 'María comentó: "Excelente explicación sobre..."',
        time: 'Hace 5 min',
        read: false
    },
    {
        id: 2,
        title: 'Tu video fue aprobado',
        message: 'El video "Flora del Podocarpus" está ahora público',
        time: 'Hace 1 hora',
        read: false
    },
    {
        id: 3,
        title: 'Nueva respuesta en el foro',
        message: 'Carlos respondió a tu pregunta sobre reciclaje',
        time: 'Hace 3 horas',
        read: true
    }
];

const NotificationBell = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const unreadCount = mockNotifications.filter(n => !n.read).length;

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <>
            <IconButton
                onClick={handleClick}
                sx={{
                    position: 'relative'
                }}
            >
                <Badge
                    badgeContent={unreadCount}
                    color="error"
                    sx={{
                        '& .MuiBadge-badge': {
                            fontSize: '0.625rem',
                            height: 18,
                            minWidth: 18
                        }
                    }}
                >
                    <NotificationsIcon />
                </Badge>
            </IconButton>

            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                PaperProps={{
                    sx: {
                        width: 360,
                        maxHeight: 400,
                        mt: 1
                    }
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
                <Box sx={{ px: 2, py: 1.5 }}>
                    <Typography variant="h6" sx={{ fontWeight: 700 }}>
                        Notificaciones
                    </Typography>
                </Box>
                <Divider />

                {mockNotifications.map((notification) => (
                    <MenuItem
                        key={notification.id}
                        onClick={handleClose}
                        sx={{
                            py: 1.5,
                            px: 2,
                            bgcolor: notification.read ? 'transparent' : 'action.hover',
                            '&:hover': {
                                bgcolor: 'action.selected'
                            }
                        }}
                    >
                        <Box sx={{ display: 'flex', gap: 1.5, width: '100%' }}>
                            {!notification.read && (
                                <CircleIcon
                                    sx={{
                                        fontSize: 8,
                                        color: 'primary.main',
                                        mt: 0.5
                                    }}
                                />
                            )}
                            <Box sx={{ flex: 1, minWidth: 0 }}>
                                <Typography
                                    variant="body2"
                                    sx={{
                                        fontWeight: notification.read ? 400 : 600,
                                        mb: 0.5
                                    }}
                                >
                                    {notification.title}
                                </Typography>
                                <Typography
                                    variant="caption"
                                    color="text.secondary"
                                    sx={{
                                        display: 'block',
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis',
                                        whiteSpace: 'nowrap'
                                    }}
                                >
                                    {notification.message}
                                </Typography>
                                <Typography
                                    variant="caption"
                                    color="text.secondary"
                                    sx={{ display: 'block', mt: 0.5 }}
                                >
                                    {notification.time}
                                </Typography>
                            </Box>
                        </Box>
                    </MenuItem>
                ))}

                <Divider />
                <Box sx={{ p: 1 }}>
                    <Button
                        fullWidth
                        size="small"
                        onClick={handleClose}
                    >
                        Ver todas las notificaciones
                    </Button>
                </Box>
            </Menu>
        </>
    );
};

export default NotificationBell;

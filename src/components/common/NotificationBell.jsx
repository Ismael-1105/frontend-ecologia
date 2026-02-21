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
    NotificationsNone as NotificationsNoneIcon,
    Circle as CircleIcon
} from '@mui/icons-material';

const NotificationBell = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const [notifications] = useState([]);
    const open = Boolean(anchorEl);

    const unreadCount = notifications.filter(n => !n.read).length;

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

                {notifications.length === 0 ? (
                    <Box sx={{ py: 4, px: 2, textAlign: 'center' }}>
                        <NotificationsNoneIcon sx={{ fontSize: 48, color: 'text.secondary', mb: 1 }} />
                        <Typography variant="body2" color="text.secondary">
                            No tienes notificaciones
                        </Typography>
                    </Box>
                ) : (
                    notifications.map((notification) => (
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
                    ))
                )}

                {notifications.length > 0 && (
                    <>
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
                    </>
                )}
            </Menu>
        </>
    );
};

export default NotificationBell;

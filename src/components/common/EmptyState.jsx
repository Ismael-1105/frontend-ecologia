import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import {
    Inbox as InboxIcon,
    VideoLibrary as VideoIcon,
    Forum as ForumIcon,
    MenuBook as ResourceIcon,
    People as PeopleIcon
} from '@mui/icons-material';

const iconMap = {
    videos: VideoIcon,
    posts: ForumIcon,
    resources: ResourceIcon,
    members: PeopleIcon,
    default: InboxIcon
};

const EmptyState = ({
    type = 'default',
    title,
    message,
    actionLabel,
    onAction
}) => {
    const Icon = iconMap[type] || iconMap.default;

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                py: 8,
                px: 2,
                textAlign: 'center'
            }}
        >
            <Icon
                sx={{
                    fontSize: 80,
                    color: 'text.disabled',
                    mb: 2,
                    opacity: 0.5
                }}
            />
            <Typography
                variant="h6"
                color="text.secondary"
                sx={{ mb: 1, fontWeight: 600 }}
            >
                {title || 'No hay elementos'}
            </Typography>
            {message && (
                <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mb: 3, maxWidth: 400 }}
                >
                    {message}
                </Typography>
            )}
            {actionLabel && onAction && (
                <Button
                    variant="contained"
                    onClick={onAction}
                    sx={{ mt: 1 }}
                >
                    {actionLabel}
                </Button>
            )}
        </Box>
    );
};

export default EmptyState;

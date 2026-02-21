import React from 'react';
import {
    Box,
    Skeleton,
    List,
    ListItem,
    ListItemIcon,
} from '@mui/material';

/**
 * ActivityListSkeleton Component
 * Loading skeleton that matches the structure of RecentActivity list items
 * Used in: RecentActivity
 */
const ActivityListSkeleton = ({ count = 5 }) => {
    return (
        <List disablePadding>
            {Array.from(new Array(count)).map((_, index) => (
                <ListItem
                    key={index}
                    sx={{
                        px: 0,
                        py: 1.5,
                        borderBottom: index < count - 1 ? '1px solid' : 'none',
                        borderColor: 'divider',
                    }}
                >
                    <ListItemIcon sx={{ minWidth: 40 }}>
                        <Skeleton variant="circular" width={24} height={24} animation="wave" />
                    </ListItemIcon>
                    <Box sx={{ flex: 1 }}>
                        {/* Title */}
                        <Skeleton variant="text" width="40%" height={22} animation="wave" />
                        {/* Subtitle */}
                        <Skeleton variant="text" width="70%" height={18} animation="wave" />
                        {/* Time */}
                        <Skeleton variant="text" width={80} height={16} animation="wave" />
                    </Box>
                </ListItem>
            ))}
        </List>
    );
};

export default ActivityListSkeleton;

import React from 'react';
import {
    Box,
    Skeleton,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
} from '@mui/material';

/**
 * TrendingPostSkeleton Component
 * Loading skeleton that matches the structure of TrendingPosts list items
 * Used in: TrendingPosts (Foro)
 */
const TrendingPostSkeleton = ({ count = 5 }) => {
    return (
        <List disablePadding>
            {Array.from(new Array(count)).map((_, index) => (
                <ListItem
                    key={index}
                    sx={{
                        borderRadius: 1,
                        mb: 1,
                        p: 1.5,
                    }}
                >
                    <ListItemAvatar>
                        <Skeleton variant="circular" width={40} height={40} animation="wave" />
                    </ListItemAvatar>
                    <ListItemText
                        primary={
                            <Skeleton variant="text" width="80%" height={24} animation="wave" />
                        }
                        secondaryTypographyProps={{ component: 'div' }}
                        secondary={
                            <Box sx={{ display: 'flex', gap: 1, mt: 0.5 }}>
                                <Skeleton
                                    variant="rounded"
                                    width={80}
                                    height={22}
                                    animation="wave"
                                    sx={{ borderRadius: 8 }}
                                />
                                <Skeleton
                                    variant="rounded"
                                    width={72}
                                    height={22}
                                    animation="wave"
                                    sx={{ borderRadius: 8 }}
                                />
                            </Box>
                        }
                    />
                </ListItem>
            ))}
        </List>
    );
};

export default TrendingPostSkeleton;

import React from 'react';
import { Box, Typography, Grid, Paper } from '@mui/material';
import BadgeIcon from './BadgeIcon';

/**
 * BadgeGrid Component
 * Displays a grid of badges
 */
const BadgeGrid = ({ badges = [], title = 'Logros', emptyMessage = 'No hay logros aún' }) => {
    if (badges.length === 0) {
        return (
            <Box sx={{ textAlign: 'center', py: 4 }}>
                <Typography variant="body2" color="text.secondary">
                    {emptyMessage}
                </Typography>
            </Box>
        );
    }

    return (
        <Box>
            {title && (
                <Typography variant="h6" gutterBottom sx={{ mb: 2 }}>
                    {title}
                </Typography>
            )}

            <Grid container spacing={2}>
                {badges.map((badge) => (
                    <Grid item key={badge._id || badge.id} xs={6} sm={4} md={3}>
                        <Paper
                            elevation={0}
                            sx={{
                                p: 2,
                                textAlign: 'center',
                                border: '1px solid',
                                borderColor: 'divider',
                                borderRadius: 2,
                                transition: 'all 0.2s',
                                '&:hover': {
                                    borderColor: 'primary.main',
                                    boxShadow: 2,
                                },
                            }}
                        >
                            <BadgeIcon badge={badge} size="large" showName />
                        </Paper>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default BadgeGrid;

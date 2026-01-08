import React from 'react';
import { Card, CardContent, Box, Typography } from '@mui/material';

const StatsCard = ({ icon: Icon, label, value, change, color = 'primary' }) => {
    return (
        <Card
            elevation={2}
            sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                position: 'relative',
                overflow: 'hidden',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: 6
                }
            }}
        >
            <CardContent sx={{ p: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Box
                        sx={{
                            width: 48,
                            height: 48,
                            borderRadius: 2,
                            bgcolor: `${color}.lighter`,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
                    >
                        <Icon sx={{ color: `${color}.main`, fontSize: 24 }} />
                    </Box>
                    <Box sx={{ flex: 1 }}>
                        <Typography variant="h4" sx={{ fontWeight: 700, mb: 0.5 }}>
                            {value}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {label}
                        </Typography>
                    </Box>
                </Box>
                {change && (
                    <Typography
                        variant="caption"
                        sx={{
                            mt: 2,
                            display: 'block',
                            color: 'primary.main',
                            fontWeight: 600
                        }}
                    >
                        {change}
                    </Typography>
                )}
            </CardContent>
        </Card>
    );
};

export default StatsCard;

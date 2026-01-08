import React from 'react';
import { Box, Typography } from '@mui/material';

const PageHeader = ({ title, subtitle, icon: Icon }) => {
    return (
        <Box sx={{ mb: 4 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <Icon sx={{ fontSize: 40, color: 'primary.main', mr: 2 }} />
                <Typography variant="h4" component="h1" fontWeight="bold" color="primary">
                    {title}
                </Typography>
            </Box>
            <Typography variant="subtitle1" color="text.secondary">
                {subtitle}
            </Typography>
        </Box>
    );
};

export default PageHeader;

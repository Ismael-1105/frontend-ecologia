import React from 'react';
import { Box, Chip } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';

const VideoStats = ({ views, likes, dislikes }) => {
    return (
        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
            <Chip
                icon={<VisibilityIcon />}
                label={views}
                size="small"
                variant="outlined"
            />
            <Chip
                icon={<ThumbUpIcon />}
                label={likes}
                size="small"
                variant="outlined"
                color="success"
            />
            <Chip
                icon={<ThumbDownIcon />}
                label={dislikes}
                size="small"
                variant="outlined"
                color="error"
            />
        </Box>
    );
};

export default VideoStats;

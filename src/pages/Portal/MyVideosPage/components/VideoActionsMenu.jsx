import React from 'react';
import { Menu, MenuItem } from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';

/**
 * VideoActionsMenu Component
 * Context menu for video actions (Edit/Delete)
 */
const VideoActionsMenu = ({ anchorEl, onClose, onEdit, onDelete }) => {
    return (
        <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={onClose}
        >
            <MenuItem onClick={onEdit}>
                <Edit fontSize="small" sx={{ mr: 1 }} />
                Edit
            </MenuItem>
            <MenuItem onClick={onDelete}>
                <Delete fontSize="small" sx={{ mr: 1 }} />
                Delete
            </MenuItem>
        </Menu>
    );
};

export default VideoActionsMenu;

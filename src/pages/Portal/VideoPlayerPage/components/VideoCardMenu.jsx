import React from 'react';
import { Menu, MenuItem } from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const VideoCardMenu = ({ anchorEl, open, onClose, onPlay, onEdit, onDelete }) => {
    return (
        <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={onClose}
        >
            <MenuItem onClick={onPlay}>
                <PlayArrowIcon sx={{ mr: 1 }} /> Reproducir
            </MenuItem>
            <MenuItem onClick={onEdit}>
                <EditIcon sx={{ mr: 1 }} /> Editar
            </MenuItem>
            <MenuItem onClick={onDelete} sx={{ color: 'error.main' }}>
                <DeleteIcon sx={{ mr: 1 }} /> Eliminar
            </MenuItem>
        </Menu>
    );
};

export default VideoCardMenu;

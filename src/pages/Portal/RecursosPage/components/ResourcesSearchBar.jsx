import React from 'react';
import {
    Box,
    TextField,
    InputAdornment,
} from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';

const ResourcesSearchBar = ({ searchQuery, onSearchChange }) => {
    return (
        <Box sx={{ mb: 4 }}>
            <TextField
                fullWidth
                placeholder="Buscar recursos..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <SearchIcon />
                        </InputAdornment>
                    )
                }}
                sx={{ maxWidth: 600 }}
            />
        </Box>
    );
};

export default ResourcesSearchBar;

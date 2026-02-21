import React, { useState, useEffect } from 'react';
import {
    Box,
    TextField,
    InputAdornment,
    IconButton,
    FormControl,
    InputLabel,
    Select,
    MenuItem
} from '@mui/material';
import { Search as SearchIcon, Clear as ClearIcon } from '@mui/icons-material';
import { useDebounce } from '../../../../hooks/useDebounce';

const RESOURCE_CATEGORIES = [
    'Biodiversidad',
    'Conservación',
    'Educación Ambiental',
    'Recursos Naturales',
];

const ResourcesSearchBar = ({ onSearch, onCategoryChange, selectedCategory }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const debouncedSearch = useDebounce(searchQuery, 500);

    useEffect(() => {
        if (debouncedSearch || debouncedSearch === '') {
            onSearch(debouncedSearch);
        }
    }, [debouncedSearch, onSearch]);

    const handleClear = () => {
        setSearchQuery('');
        onSearch('');
    };

    return (
        <Box sx={{ display: 'flex', gap: 2, mb: 3, flexWrap: { xs: 'wrap', sm: 'nowrap' } }}>
            <TextField
                fullWidth
                placeholder="Buscar recursos..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <SearchIcon />
                        </InputAdornment>
                    ),
                    endAdornment: searchQuery && (
                        <InputAdornment position="end">
                            <IconButton size="small" onClick={handleClear}>
                                <ClearIcon />
                            </IconButton>
                        </InputAdornment>
                    ),
                }}
                sx={{
                    '& .MuiOutlinedInput-root': {
                        bgcolor: 'background.paper'
                    }
                }}
            />
            <FormControl sx={{ minWidth: { xs: '100%', sm: 200 } }}>
                <InputLabel>Categoría</InputLabel>
                <Select
                    value={selectedCategory || ''}
                    onChange={(e) => onCategoryChange(e.target.value)}
                    label="Categoría"
                    sx={{ bgcolor: 'background.paper' }}
                >
                    <MenuItem value="">Todas</MenuItem>
                    {RESOURCE_CATEGORIES.map((category) => (
                        <MenuItem key={category} value={category}>
                            {category}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </Box>
    );
};

export default ResourcesSearchBar;

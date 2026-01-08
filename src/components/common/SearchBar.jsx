import React, { useState } from 'react';
import { InputBase, Paper, IconButton } from '@mui/material';
import { Search as SearchIcon, Close as CloseIcon } from '@mui/icons-material';
import { alpha } from '@mui/material/styles';

const SearchBar = ({ placeholder = "Buscar en el foro, recursos, usuarios..." }) => {
    const [searchValue, setSearchValue] = useState('');
    const [isFocused, setIsFocused] = useState(false);

    const handleClear = () => {
        setSearchValue('');
    };

    return (
        <Paper
            elevation={0}
            sx={{
                display: 'flex',
                alignItems: 'center',
                width: '100%',
                maxWidth: 600,
                bgcolor: (theme) => theme.palette.mode === 'dark' ? 'background.paper' : 'grey.100',
                border: '1px solid',
                borderColor: isFocused ? 'primary.main' : 'transparent',
                borderRadius: 2,
                px: 2,
                py: 0.5,
                transition: 'all 0.2s ease'
            }}
        >
            <SearchIcon sx={{ color: 'text.secondary', mr: 1 }} />
            <InputBase
                placeholder={placeholder}
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                sx={{
                    flex: 1,
                    fontSize: '0.875rem'
                }}
            />
            {searchValue && (
                <IconButton
                    size="small"
                    onClick={handleClear}
                    sx={{ ml: 1 }}
                >
                    <CloseIcon fontSize="small" />
                </IconButton>
            )}
        </Paper>
    );
};

export default SearchBar;

import React, { useState } from 'react';
import {
    Container,
    Box,
    Typography,
    TextField,
    InputAdornment,
    Stack
} from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';
import { MemberList } from './components';

const ComunidadPage = () => {
    const [searchQuery, setSearchQuery] = useState('');

    return (
        <Container maxWidth="xl" sx={{ py: 0 }}>
            {/* Header */}
            <Box sx={{ mb: 4 }}>
                <Typography variant="h4" sx={{ fontWeight: 700, mb: 0.5 }}>
                    Comunidad
                </Typography>
                <Typography variant="body1" color="text.secondary">
                    Conoce a los miembros activos de EcoLearn Loja
                </Typography>
            </Box>

            {/* Search Bar */}
            <Box sx={{ mb: 4 }}>
                <TextField
                    fullWidth
                    placeholder="Buscar miembros..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
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

            {/* Member List */}
            <MemberList searchQuery={searchQuery} />
        </Container>
    );
};

export default ComunidadPage;

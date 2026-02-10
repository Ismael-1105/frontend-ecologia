import React from 'react';
import { Box, Container } from '@mui/material';
import Hero from './components/Hero.jsx';

const HomePage = () => {
  return (
    <Box
      sx={{
        backgroundImage: 'url(/Fondo.jpg)', // Use the exact case from the file system
        backgroundColor: '#333', // Fallback color
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        minHeight: '100vh',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Container maxWidth="lg" sx={{ flex: 1, display: 'flex', flexDirection: 'column', position: 'relative', zIndex: 1 }}>
        <Hero />
      </Container>
    </Box>
  );
};

export default HomePage;
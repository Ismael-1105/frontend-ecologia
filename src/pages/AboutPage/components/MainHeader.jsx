import React from 'react';
import { Typography, Box, Container } from '@mui/material';
import { alpha } from '@mui/material/styles';

const MainHeader = () => {
  return (
    <Box
      component="section"
      className="fade-in"
      sx={(theme) => ({
        textAlign: 'center',
        // Increased padding for more breathing room
        py: { xs: 10, md: 16 },
        px: 2,
        position: 'relative', 
        overflow: 'hidden',
        // Deeper, more sophisticated gradient
        background: `linear-gradient(135deg, ${theme.palette.primary.dark} 0%, ${theme.palette.primary.main} 40%, ${theme.palette.secondary.dark} 100%)`,
        color: '#fff',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          // Subtle texture pattern overlay
          backgroundImage: 'radial-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px)',
          backgroundSize: '30px 30px',
          opacity: 0.3,
          pointerEvents: 'none',
        },
        '&::after': {
          content: '""',
          position: 'absolute',
          top: '-50%',
          left: '-50%',
          width: '200%',
          height: '200%',
          background: `radial-gradient(circle, ${alpha(theme.palette.secondary.main, 0.2)} 0%, transparent 60%)`,
          animation: 'pulse 15s infinite ease-in-out',
          pointerEvents: 'none',
        },
      })}
    >
      <Container maxWidth="md" sx={{ position: 'relative', zIndex: 1 }}>
        <Typography
          variant="h1" // Upgraded from h2 for better semantics and size control
          component="h1"
          fontWeight="800"
          gutterBottom
          sx={{
            fontSize: { xs: '2.5rem', sm: '3.5rem', md: '4.5rem' },
            lineHeight: 1.1,
            mb: 4,
            // Enhanced text shadow for readability against gradient
            textShadow: '0 4px 30px rgba(0, 0, 0, 0.4)',
            letterSpacing: '-0.02em',
          }}
        >
          EcoLearn{' '}
          <Box component="span" sx={{ color: '#86A789' }}>Loja</Box>
        </Typography>

        <Typography
          variant="h5"
          component="p"
          sx={{
            maxWidth: 800,
            mx: 'auto',
            fontSize: { xs: '1.1rem', md: '1.4rem' },
            lineHeight: 1.6,
            opacity: 0.9,
            fontWeight: 300,
            textShadow: '0 2px 10px rgba(0,0,0,0.2)',
            mb: 5,
          }}
        >
          Transformando la conciencia ambiental universitaria.
          <Box component="span" sx={{ display: 'block', mt: 1, fontWeight: 500 }}>
            Únete a la red colaborativa que impulsa el futuro sostenible de nuestra región.
          </Box>
        </Typography>
      </Container>
    </Box>
  );
};

export default MainHeader;
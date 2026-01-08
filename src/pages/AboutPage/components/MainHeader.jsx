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
        py: { xs: 8, md: 12 },
        px: 2,
        position: 'relative',
        overflow: 'hidden',
        background: `linear-gradient(135deg, ${theme.palette.primary.dark} 0%, ${theme.palette.primary.main} 50%, ${theme.palette.secondary.main} 100%)`,
        color: '#fff',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `radial-gradient(circle at 30% 50%, ${alpha('#fff', 0.1)} 0%, transparent 50%), radial-gradient(circle at 70% 80%, ${alpha('#fff', 0.08)} 0%, transparent 50%)`,
          pointerEvents: 'none',
        },
      })}
    >
      <Container maxWidth="md" sx={{ position: 'relative', zIndex: 1 }}>
        <Typography
          variant="h2"
          component="h1"
          fontWeight="bold"
          gutterBottom
          sx={{
            fontSize: { xs: '2rem', sm: '2.5rem', md: '3.5rem' },
            mb: 3,
            textShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
            background: 'linear-gradient(135deg, #fff 0%, rgba(255, 255, 255, 0.9) 100%)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          Sobre EcoLearn Loja
        </Typography>
        <Typography
          variant="h6"
          component="p"
          sx={{
            maxWidth: 800,
            mx: 'auto',
            fontSize: { xs: '1rem', md: '1.25rem' },
            lineHeight: 1.8,
            opacity: 0.95,
            fontWeight: 400,
          }}
        >
          Una plataforma colaborativa universitaria dedicada a promover la sostenibilidad y la conciencia ambiental en Loja.
        </Typography>
      </Container>
    </Box>
  );
};

export default MainHeader;
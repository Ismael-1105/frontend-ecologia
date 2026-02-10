import React from 'react';
import { Box, Typography, Button, Container } from '@mui/material';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <Box
      sx={{
        minHeight: { xs: '60vh', md: '70vh' },
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        py: { xs: 6, md: 8 },
        px: 2,
      }}
    >
      <Container maxWidth="md">
        <Typography
          variant="h2"
          component="h1"
          gutterBottom
          className="fade-in"
          sx={{
            color: '#fff', // White text for better contrast
            fontWeight: 'bold',
            fontSize: { xs: '2.5rem', sm: '3.5rem', md: '4rem' },
            mb: 2,
            textShadow: '0 2px 4px rgba(0,0,0,0.3)', // Add shadow for better readability
          }}
        >
          EcoLearn Loja
        </Typography>
        <Typography
          variant="h6"
          component="p"
          className="slide-up-delay-1"
          sx={{
            mb: 4,
            color: 'rgba(255, 255, 255, 0.9)', // Light text
            fontSize: { xs: '1.1rem', md: '1.4rem' },
            px: { xs: 2, md: 0 },
            maxWidth: '800px',
            mx: 'auto',
            textShadow: '0 1px 2px rgba(0,0,0,0.3)',
          }}
        >
          Plataforma colaborativa universitaria sobre sostenibilidad
        </Typography>
        <Box
          className="slide-up-delay-2"
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            gap: 2,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Button
            variant="contained"
            color="primary"
            size="large"
            component={Link}
            to="/portal/dashboard"
            sx={{
              px: { xs: 4, md: 5 },
              py: 1.5,
              minWidth: { xs: '200px', sm: 'auto' },
            }}
          >
            Explorar Contenido
          </Button>
          <Button
            variant="outlined"
            color="primary"
            size="large"
            component={Link}
            to="/#about"
            sx={{
              px: { xs: 4, md: 5 },
              py: 1.5,
              minWidth: { xs: '200px', sm: 'auto' },
            }}
          >
            Sobre Nosotros
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default Hero;
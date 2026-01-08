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
            color: 'primary.main',
            fontWeight: 'bold',
            fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
            mb: 2,
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
            color: 'text.secondary',
            fontSize: { xs: '1rem', md: '1.25rem' },
            px: { xs: 2, md: 0 },
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
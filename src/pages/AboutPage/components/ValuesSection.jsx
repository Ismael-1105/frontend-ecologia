import React from 'react';
import { Box, Container, Typography, Paper, useTheme } from '@mui/material';
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';
import HandshakeIcon from '@mui/icons-material/Handshake';
import PsychologyIcon from '@mui/icons-material/Psychology';
import NaturePeopleIcon from '@mui/icons-material/NaturePeople';
import { SectionHeader } from '../../../components/shared';
import { alpha } from '@mui/material/styles';

const ValuesSection = () => {
  const theme = useTheme();

  const values = [
    {
      Icon: NaturePeopleIcon,
      title: 'Sostenibilidad',
      description: 'Promovemos prácticas que satisfacen las necesidades del presente sin comprometer las futuras generaciones.',
      color: theme.palette.primary.main,
      lightColor: theme.palette.primary.light,
      darkColor: theme.palette.primary.dark,
      position: 'top-left',
    },
    {
      Icon: HandshakeIcon,
      title: 'Colaboración',
      description: 'Fomentamos el trabajo en equipo entre universidades, estudiantes y docentes para lograr un impacto mayor.',
      color: theme.palette.primary.main,
      lightColor: theme.palette.primary.light,
      darkColor: theme.palette.primary.dark,
      position: 'top-right',
    },
    {
      Icon: PsychologyIcon,
      title: 'Innovación',
      description: 'Buscamos constantemente nuevas soluciones creativas para los desafíos ambientales de nuestra región.',
      color: theme.palette.primary.main,
      lightColor: theme.palette.primary.light,
      darkColor: theme.palette.primary.dark,
      position: 'bottom-left',
    },
    {
      Icon: VolunteerActivismIcon,
      title: 'Compromiso',
      description: 'Actuamos con responsabilidad y dedicación en cada proyecto para generar un cambio real y duradero.',
      color: theme.palette.primary.main,
      lightColor: theme.palette.primary.light,
      darkColor: theme.palette.primary.dark,
      position: 'bottom-right',
    },
  ];

  // Función para obtener el delay de animación basado en el índice
  const getAnimationDelay = (index) => {
    const delays = ['0.1s', '0.3s', '0.5s', '0.7s'];
    return delays[index] || '0.1s';
  };

  // Función para obtener el transform inicial basado en la posición
  const getInitialTransform = (position) => {
    const transforms = {
      'top-left': 'translate(-50px, -50px) rotate(-5deg)',
      'top-right': 'translate(50px, -50px) rotate(5deg)',
      'bottom-left': 'translate(-50px, 50px) rotate(-5deg)',
      'bottom-right': 'translate(50px, 50px) rotate(5deg)',
    };
    return transforms[position] || 'translateY(50px)';
  };

  return (
    <Box
      component="section"
      sx={(theme) => ({
        position: 'relative',
        py: { xs: 10, md: 15 },
        px: 2,
        overflow: 'hidden',
        // Standardized background
        background: theme.palette.mode === 'dark'
          ? `linear-gradient(180deg, ${theme.palette.background.paper} 0%, ${theme.palette.background.default} 100%)`
          : `linear-gradient(180deg, #F9FAFB 0%, #F3F4F6 100%)`,
      })}
    >
      <Container maxWidth="xl" sx={{ position: 'relative', zIndex: 1 }}>
        {/* Header */}
        <Box className="fade-in" sx={{ mb: { xs: 8, md: 10 }, textAlign: 'center' }}>
          <SectionHeader
            title="Nuestros Valores Fundamentales"
            subtitle="Los pilares éticos que construyen nuestra comunidad"
            dividerColor="primary.main"
          />
        </Box>

        {/* Values Grid - Interactive Cards */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: '1fr',
              sm: 'repeat(2, 1fr)',
              md: 'repeat(4, 1fr)'
            },
            gap: 4,
            perspective: '1000px',
          }}
        >
          {values.map((value, index) => {
            const IconComponent = value.Icon;
            return (
              <Paper
                key={index}
                elevation={0}
                className={`slide-up-delay-${index + 1}`}
                sx={{
                  position: 'relative',
                  p: 4,
                  borderRadius: 6,
                  overflow: 'hidden',
                  background: theme.palette.mode === 'dark'
                    ? alpha(theme.palette.background.paper, 0.4)
                    : '#fff',
                  border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                  transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center',
                  height: '100%',

                  '&:hover': {
                    transform: 'translateY(-12px)',
                    boxShadow: `0 20px 40px ${alpha(value.color, 0.2)}`,
                    borderColor: alpha(value.color, 0.5),

                    '& .icon-wrapper': {
                      transform: 'scale(1.1) rotate(10deg)',
                      background: value.color,
                      color: '#fff',
                      boxShadow: `0 10px 20px ${alpha(value.color, 0.4)}`,
                    },
                    '& .value-title': {
                      color: value.color,
                    }
                  },
                }}
              >
                {/* Decorative Background Blob */}
                <Box
                  sx={{
                    position: 'absolute',
                    top: -50,
                    right: -50,
                    width: 150,
                    height: 150,
                    borderRadius: '50%',
                    background: `radial-gradient(circle, ${alpha(value.color, 0.1)} 0%, transparent 70%)`,
                    pointerEvents: 'none',
                    zIndex: 0,
                  }}
                />

                {/* Icon Wrapper */}
                <Box
                  className="icon-wrapper"
                  sx={{
                    width: 70,
                    height: 70,
                    borderRadius: '24px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mb: 3,
                    color: value.color,
                    background: alpha(value.color, 0.1),
                    transition: 'all 0.4s ease',
                    position: 'relative',
                    zIndex: 1,
                  }}
                >
                  <IconComponent sx={{ fontSize: 32 }} />
                </Box>

                <Typography
                  variant="h5"
                  component="h3"
                  className="value-title"
                  sx={{
                    fontWeight: 800,
                    mb: 2,
                    fontSize: '1.25rem',
                    transition: 'color 0.3s ease',
                    position: 'relative',
                    zIndex: 1,
                  }}
                >
                  {value.title}
                </Typography>

                <Typography
                  variant="body2"
                  sx={{
                    color: 'text.secondary',
                    lineHeight: 1.6,
                    position: 'relative',
                    zIndex: 1,
                  }}
                >
                  {value.description}
                </Typography>
              </Paper>
            );
          })}
        </Box>
      </Container>
    </Box>
  );
};

export default ValuesSection;

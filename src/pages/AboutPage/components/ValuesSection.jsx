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
      sx={{
        position: 'relative',
        py: { xs: 10, md: 15 },
        px: 2,
        overflow: 'hidden',
        background: `linear-gradient(135deg, ${theme.palette.background.default} 0%, ${theme.palette.background.paper} 50%, ${theme.palette.background.default} 100%)`,
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `radial-gradient(circle at 20% 50%, ${alpha(theme.palette.primary.dark, 0.1)} 0%, transparent 50%), radial-gradient(circle at 80% 80%, ${alpha(theme.palette.primary.light, 0.08)} 0%, transparent 50%)`,
          pointerEvents: 'none',
        },
      }}
    >
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        {/* Header */}
        <Box className="fade-in" sx={{ mb: { xs: 8, md: 12 }, textAlign: 'center' }}>
          <SectionHeader
            title="Nuestros Valores"
            subtitle="Los principios fundamentales que guían cada acción y decisión en EcoLearn Loja"
            dividerColor="primary.main"
          />
        </Box>

        {/* Valores en Grid Asimétrico con Efecto Staggered */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: '1fr',
              sm: 'repeat(2, 1fr)',
              md: 'repeat(2, 1fr)'
            },
            gap: { xs: 4, sm: 4, md: 6 },
            position: 'relative',
          }}
        >
          {/* Línea conectora decorativa para desktop */}
          <Box
            sx={{
              display: { xs: 'none', md: 'block' },
              position: 'absolute',
              top: '50%',
              left: '10%',
              right: '10%',
              height: 2,
              background: `linear-gradient(90deg, 
                transparent 0%, 
                ${alpha(theme.palette.primary.main, 0.3)} 25%, 
                ${alpha(theme.palette.info.main, 0.3)} 50%, 
                ${alpha(theme.palette.warning.main, 0.3)} 75%, 
                transparent 100%)`,
              transform: 'translateY(-50%)',
              zIndex: 0,
              '&::before': {
                content: '""',
                position: 'absolute',
                top: '50%',
                left: '50%',
                width: 12,
                height: 12,
                borderRadius: '50%',
                background: `radial-gradient(circle, ${alpha(theme.palette.primary.main, 0.6)} 0%, transparent 70%)`,
                transform: 'translate(-50%, -50%)',
                animation: 'pulse 2s ease-in-out infinite',
              },
            }}
          />

          {values.map((value, index) => {
            const IconComponent = value.Icon;
            const delay = getAnimationDelay(index);
            const initialTransform = getInitialTransform(value.position);

            return (
              <Paper
                key={index}
                elevation={0}
                sx={{
                  position: 'relative',
                  p: { xs: 4, md: 5 },
                  borderRadius: 4,
                  overflow: 'visible',
                  background: theme.palette.mode === 'dark'
                    ? `linear-gradient(135deg, 
                        ${alpha(value.darkColor, 0.15)} 0%, 
                        ${alpha(value.color, 0.08)} 50%, 
                        ${alpha(value.darkColor, 0.15)} 100%)`
                    : `linear-gradient(135deg, 
                        ${alpha(value.lightColor, 0.1)} 0%, 
                        ${alpha('#fff', 0.9)} 50%, 
                        ${alpha(value.lightColor, 0.1)} 100%)`,
                  border: `2px solid ${alpha(value.color, 0.2)}`,
                  backdropFilter: 'blur(20px)',
                  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                  opacity: 0,
                  transform: initialTransform,
                  animation: `slideUp 0.8s ease-out ${delay} forwards`,
                  zIndex: 1,

                  // Efecto de hover con transformación 3D
                  '&:hover': {
                    transform: 'translateY(-12px) scale(1.02)',
                    borderColor: alpha(value.color, 0.5),
                    boxShadow: `0 20px 60px ${alpha(value.color, 0.3)}, 
                                0 0 40px ${alpha(value.color, 0.15)}`,

                    // Animación del icono en hover
                    '& .value-icon': {
                      transform: 'scale(1.15) rotate(5deg)',
                      filter: `drop-shadow(0 0 20px ${alpha(value.color, 0.8)})`,
                    },

                    // Animación del glow background
                    '& .value-glow': {
                      opacity: 0.4,
                      transform: 'scale(1.2)',
                    },

                    // Animación de la línea decorativa
                    '& .value-divider': {
                      width: '100%',
                      boxShadow: `0 0 20px ${alpha(value.color, 0.6)}`,
                    },
                  },

                  // Efecto de glow background animado
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    width: '200%',
                    height: '200%',
                    background: `radial-gradient(circle, ${alpha(value.color, 0.15)} 0%, transparent 70%)`,
                    transform: 'translate(-50%, -50%)',
                    transition: 'all 0.6s ease',
                    zIndex: -1,
                    pointerEvents: 'none',
                  },
                }}
                className="value-glow"
              >
                {/* Icono grande con efecto especial */}
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    mb: 3,
                    position: 'relative',
                  }}
                >
                  <Box
                    className="value-icon"
                    sx={{
                      width: { xs: 80, md: 100 },
                      height: { xs: 80, md: 100 },
                      borderRadius: '50%',
                      background: `linear-gradient(135deg, ${value.color} 0%, ${value.lightColor} 100%)`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: `0 8px 32px ${alpha(value.color, 0.4)}, 
                                  inset 0 2px 10px ${alpha('#fff', 0.2)}`,
                      transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                      position: 'relative',
                      '&::after': {
                        content: '""',
                        position: 'absolute',
                        inset: -4,
                        borderRadius: '50%',
                        background: `linear-gradient(135deg, ${value.lightColor}, ${value.color})`,
                        opacity: 0,
                        transition: 'opacity 0.4s ease',
                        zIndex: -1,
                        filter: 'blur(8px)',
                      },
                    }}
                  >
                    <IconComponent
                      sx={{
                        fontSize: { xs: 40, md: 50 },
                        color: '#fff',
                        filter: 'drop-shadow(0 2px 8px rgba(0,0,0,0.3))',
                      }}
                    />
                  </Box>

                  {/* Partículas decorativas alrededor del icono */}
                  {[0, 1, 2, 3].map((particle) => (
                    <Box
                      key={particle}
                      sx={{
                        position: 'absolute',
                        width: 8,
                        height: 8,
                        borderRadius: '50%',
                        background: value.lightColor,
                        top: '50%',
                        left: '50%',
                        transform: `translate(-50%, -50%) rotate(${particle * 90}deg) translateY(-60px)`,
                        opacity: 0.6,
                        animation: 'float 3s ease-in-out infinite',
                        animationDelay: `${particle * 0.2}s`,
                        boxShadow: `0 0 12px ${alpha(value.color, 0.6)}`,
                      }}
                    />
                  ))}
                </Box>

                {/* Título */}
                <Typography
                  variant="h5"
                  component="h3"
                  fontWeight="bold"
                  sx={{
                    textAlign: 'center',
                    mb: 2,
                    color: 'text.primary',
                    fontSize: { xs: '1.5rem', md: '1.75rem' },
                    background: `linear-gradient(135deg, ${value.color} 0%, ${value.lightColor} 100%)`,
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    position: 'relative',
                  }}
                >
                  {value.title}
                </Typography>

                {/* Divider animado */}
                <Box
                  className="value-divider"
                  sx={{
                    width: '60%',
                    height: 3,
                    mx: 'auto',
                    mb: 3,
                    background: `linear-gradient(90deg, transparent, ${value.color}, transparent)`,
                    borderRadius: 2,
                    transition: 'all 0.4s ease',
                    boxShadow: `0 0 10px ${alpha(value.color, 0.3)}`,
                  }}
                />

                {/* Descripción */}
                <Typography
                  variant="body1"
                  sx={{
                    textAlign: 'center',
                    color: 'text.secondary',
                    lineHeight: 1.8,
                    fontSize: { xs: '0.95rem', md: '1.05rem' },
                    px: { xs: 1, md: 2 },
                  }}
                >
                  {value.description}
                </Typography>

                {/* Badge decorativo en la esquina */}
                <Box
                  sx={{
                    position: 'absolute',
                    top: 16,
                    right: 16,
                    width: 40,
                    height: 40,
                    borderRadius: '50%',
                    background: `linear-gradient(135deg, ${alpha(value.color, 0.2)} 0%, ${alpha(value.lightColor, 0.1)} 100%)`,
                    border: `1px solid ${alpha(value.color, 0.3)}`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'rotate(180deg) scale(1.1)',
                      background: `linear-gradient(135deg, ${alpha(value.color, 0.3)} 0%, ${alpha(value.lightColor, 0.2)} 100%)`,
                    },
                  }}
                >
                  <Box
                    sx={{
                      width: 8,
                      height: 8,
                      borderRadius: '50%',
                      background: value.color,
                      boxShadow: `0 0 12px ${alpha(value.color, 0.8)}`,
                    }}
                  />
                </Box>
              </Paper>
            );
          })}
        </Box>

        {/* Texto decorativo adicional */}
        <Box
          sx={{
            textAlign: 'center',
            mt: { xs: 6, md: 8 },
            opacity: 0.7,
          }}
          className="fade-in"
        >
          <Typography
            variant="body2"
            sx={{
              fontStyle: 'italic',
              color: 'text.secondary',
              fontSize: { xs: '0.875rem', md: '1rem' },
            }}
          >
            "Estos valores no son solo palabras, son el compromiso que guía cada proyecto y cada colaboración en nuestra comunidad universitaria."
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default ValuesSection;

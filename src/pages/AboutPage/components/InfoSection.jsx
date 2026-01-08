import React from 'react';
import { Container, Box, Typography, Paper, useTheme } from '@mui/material';
import EmojiNatureIcon from '@mui/icons-material/EmojiNature';
import SchoolIcon from '@mui/icons-material/School';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import PublicIcon from '@mui/icons-material/Public';
import { SectionHeader } from '../../../components/shared';
import { alpha } from '@mui/material/styles';

const InfoSection = () => {
  const theme = useTheme();

  const features = [
    {
      icon: SchoolIcon,
      title: 'Colaboración Universitaria',
      description: 'Conectamos estudiantes y docentes de UIDE, UTPL y UNL para trabajar juntos en proyectos ambientales.',
    },
    {
      icon: MenuBookIcon,
      title: 'Educación Activa',
      description: 'Promovemos el aprendizaje práctico a través de proyectos reales que impactan positivamente en la comunidad.',
    },
    {
      icon: PublicIcon,
      title: 'Sostenibilidad Regional',
      description: 'Enfocados en los desafíos ambientales específicos de Loja y la región sur del Ecuador.',
    },
  ];

  return (
    <Box
      component="section"
      sx={(theme) => ({
        background: `linear-gradient(135deg, ${theme.palette.background.default} 0%, ${theme.palette.background.paper} 50%, ${theme.palette.background.default} 100%)`,
        py: { xs: 8, md: 10 },
        px: 2,
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background:
            `radial-gradient(circle at 20% 50%, ${alpha(theme.palette.primary.dark, 0.1)} 0%, transparent 50%), radial-gradient(circle at 80% 80%, ${alpha(theme.palette.primary.light, 0.08)} 0%, transparent 50%)`,
          pointerEvents: 'none',
        },
      })}
    >
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        <Box className="fade-in" sx={{ mb: { xs: 6, md: 8 } }}>
          <SectionHeader
            title="¿Qué es EcoLearn Loja?"
            subtitle="Plataforma colaborativa universitaria para sostenibilidad en Loja"
            icon={<EmojiNatureIcon sx={{ fontSize: { xs: 32, md: 40 } }} />}
            dividerColor="primary.main"
          />
        </Box>

        {/* Main Description Card */}
        <Box className="slide-up-delay-1" sx={{ mb: { xs: 6, md: 8 } }}>
          <Box
            sx={(theme) => ({
              maxWidth: 900,
              mx: 'auto',
              p: { xs: 4, md: 5 },
              border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
              backdropFilter: 'blur(10px)',
              background:
                theme.palette.mode === 'dark'
                  ? 'rgba(18, 23, 30, 0.75)'
                  : 'rgba(255, 255, 255, 0.85)',
              borderRadius: 4,
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: `0 12px 40px ${alpha(theme.palette.primary.main, 0.15)}`,
                border: `1px solid ${alpha(theme.palette.primary.main, 0.3)}`,
              },
            })}
          >
            <Typography
              variant="body1"
              sx={{
                fontSize: { xs: '1rem', md: '1.125rem' },
                lineHeight: 1.8,
                color: 'text.primary',
                textAlign: 'center',
                mb: 0,
              }}
            >
              EcoLearn Loja busca unir el conocimiento ecológico de las universidades de Loja (UIDE, UTPL, UNL),
              ofreciendo un espacio donde estudiantes y docentes colaboran para desarrollar proyectos sostenibles,
              compartir investigaciones y fomentar la educación ambiental activa.
            </Typography>
          </Box>
        </Box>

        {/* Features Grid */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' },
            gap: { xs: 3, md: 4 },
          }}
        >
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            const delayClass = index === 0 ? 'slide-up-delay-1' : index === 1 ? 'slide-up-delay-2' : 'slide-up-delay-3';
            return (
              <Box key={index} className={delayClass} sx={{ height: '100%' }}>
                <Paper
                  elevation={0}
                  sx={{
                    position: 'relative',
                    p: { xs: 4, md: 5 },
                    borderRadius: 4,
                    overflow: 'visible',
                    height: '100%',
                    background: theme.palette.mode === 'dark'
                      ? `linear-gradient(135deg, 
                          ${alpha(theme.palette.primary.dark, 0.15)} 0%, 
                          ${alpha(theme.palette.primary.main, 0.08)} 50%, 
                          ${alpha(theme.palette.primary.dark, 0.15)} 100%)`
                      : `linear-gradient(135deg, 
                          ${alpha(theme.palette.primary.light, 0.1)} 0%, 
                          ${alpha('#fff', 0.9)} 50%, 
                          ${alpha(theme.palette.primary.light, 0.1)} 100%)`,
                    border: `2px solid ${alpha(theme.palette.primary.main, 0.2)}`,
                    backdropFilter: 'blur(20px)',
                    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',

                    '&:hover': {
                      transform: 'translateY(-12px) scale(1.02)',
                      borderColor: alpha(theme.palette.primary.main, 0.5),
                      boxShadow: `0 20px 60px ${alpha(theme.palette.primary.main, 0.3)}, 
                                  0 0 40px ${alpha(theme.palette.primary.main, 0.15)}`,

                      '& .icon-box': {
                        transform: 'scale(1.15) rotate(5deg)',
                        filter: `drop-shadow(0 0 20px ${alpha(theme.palette.primary.main, 0.8)})`,
                      },
                      '& .divider': {
                        width: '100%',
                        boxShadow: `0 0 20px ${alpha(theme.palette.primary.main, 0.6)}`,
                      },
                    },
                  }}
                >
                  <Box
                    className="icon-box"
                    sx={{
                      width: { xs: 80, md: 100 },
                      height: { xs: 80, md: 100 },
                      borderRadius: '50%',
                      background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.light} 100%)`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mx: 'auto',
                      mb: 3,
                      boxShadow: `0 8px 32px ${alpha(theme.palette.primary.main, 0.4)}`,
                      transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                    }}
                  >
                    <IconComponent sx={{ fontSize: { xs: 40, md: 50 }, color: '#fff' }} />
                  </Box>

                  <Typography
                    variant="h5"
                    component="h3"
                    fontWeight="bold"
                    sx={{
                      textAlign: 'center',
                      mb: 2,
                      background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.light} 100%)`,
                      backgroundClip: 'text',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                    }}
                  >
                    {feature.title}
                  </Typography>

                  <Box
                    className="divider"
                    sx={{
                      width: '60%',
                      height: 3,
                      mx: 'auto',
                      mb: 3,
                      background: `linear-gradient(90deg, transparent, ${theme.palette.primary.main}, transparent)`,
                      borderRadius: 2,
                      transition: 'all 0.4s ease',
                    }}
                  />

                  <Typography
                    variant="body1"
                    sx={{
                      textAlign: 'center',
                      color: 'text.secondary',
                      lineHeight: 1.8,
                    }}
                  >
                    {feature.description}
                  </Typography>
                </Paper>
              </Box>
            );
          })}
        </Box>
      </Container>
    </Box>
  );
};

export default InfoSection;
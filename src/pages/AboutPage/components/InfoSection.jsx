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
        // Lighter background to contrast with header
        background: theme.palette.mode === 'dark'
          ? `linear-gradient(180deg, ${theme.palette.background.paper} 0%, ${theme.palette.background.default} 100%)`
          : `linear-gradient(180deg, #F9FAFB 0%, #F3F4F6 100%)`,
        py: { xs: 6, md: 12 }, // Reduced mobile padding
        px: 2,
        position: 'relative',
        overflow: 'hidden',
      })}
    >
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        <Box className="fade-in" sx={{ mb: { xs: 6, md: 10 } }}> {/* Reduced mobile margin */}
          <SectionHeader
            title="¿Por qué EcoLearn?"
            subtitle="Conectando el conocimiento académico con la acción ambiental real"
            icon={<EmojiNatureIcon sx={{ fontSize: { xs: 32, md: 40 } }} />}
            dividerColor="primary.main"
          />
        </Box>

        {/* Bento Grid Layout */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' },
            gap: { xs: 2.5, md: 3 },
            autoRows: 'minmax(250px, auto)', // Ensure consistent height
          }}
        >
          {/* Item 1: Main Description (Large) */}
          <Box
            className="slide-up-delay-1"
            sx={{
              gridColumn: { xs: 'span 1', md: 'span 2' },
              display: 'flex',
            }}
          >
            <Box
              sx={(theme) => ({
                width: '100%',
                p: { xs: 3, md: 5 },
                border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
                background: theme.palette.mode === 'dark'
                  ? `linear-gradient(135deg, ${alpha(theme.palette.primary.dark, 0.4)} 0%, ${alpha(theme.palette.background.paper, 0.6)} 100%)`
                  : `linear-gradient(135deg, ${alpha(theme.palette.primary.light, 0.2)} 0%, #fff 100%)`,
                backdropFilter: 'blur(20px)',
                borderRadius: 5,
                boxShadow: theme.palette.mode === 'dark'
                  ? '0 8px 32px rgba(0, 0, 0, 0.2)'
                  : '0 20px 40px rgba(0, 0, 0, 0.05)',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: `0 20px 40px ${alpha(theme.palette.primary.main, 0.15)}`,
                },
              })}
            >
              <Typography
                variant="h5"
                component="h3"
                sx={{
                  fontWeight: 800,
                  mb: 2,
                  background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                  backgroundClip: 'text',
                  textFillColor: 'transparent',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                Acción Local, Impacto Global
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  fontSize: { xs: '1rem', md: '1.15rem' },
                  lineHeight: 1.7,
                  color: 'text.primary',
                  fontWeight: 500,
                }}
              >
                EcoLearn Loja es el puente digital entre las principales universidades de la región
                <Box component="span" sx={{ color: 'primary.main', fontWeight: 700 }}> (UIDE, UTPL, UNL)</Box>.
                Transformamos la investigación académica en proyectos sostenibles tangibles que benefician directamente a nuestra comunidad.
              </Typography>
            </Box>
          </Box>

          {/* Features Mapped to Grid */}
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            // Determine span based on index to create "Mosaic" pattern
            // Index 0 (Feature 1) -> Span 1 (Row 1, Col 3)
            // Index 1 (Feature 2) -> Span 1 (Row 2, Col 1)
            // Index 2 (Feature 3) -> Span 2 (Row 2, Col 2-3)
            const gridColumn = index === 2 ? { xs: 'span 1', md: 'span 2' } : 'span 1';
            const gradientBg = index % 2 === 0;

            return (
              <Box
                key={index}
                className={`slide-up-delay-${index + 2}`}
                sx={{
                  gridColumn,
                  display: 'flex'
                }}
              >
                <Paper
                  elevation={0}
                  sx={{
                    width: '100%',
                    position: 'relative',
                    p: { xs: 3, md: 4 },
                    borderRadius: 5,
                    background: theme.palette.mode === 'dark'
                      ? alpha(theme.palette.background.paper, 0.4)
                      : '#fff',
                    border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    justifyContent: 'space-between',
                    overflow: 'hidden',

                    '&:hover': {
                      transform: 'translateY(-4px)',
                      borderColor: alpha(theme.palette.primary.main, 0.3),
                      boxShadow: `0 15px 30px ${alpha(theme.palette.primary.main, 0.1)}`,

                      '& .icon-box': {
                        transform: 'scale(1.1) rotate(5deg)',
                      },
                    },
                  }}
                >
                  <Box
                    className="icon-box"
                    sx={{
                      width: 50,
                      height: 50,
                      borderRadius: '16px',
                      background: alpha(theme.palette.primary.main, 0.1),
                      color: theme.palette.primary.main,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mb: 2,
                      transition: 'all 0.3s ease',
                    }}
                  >
                    <IconComponent sx={{ fontSize: 28 }} />
                  </Box>

                  <Box>
                    <Typography
                      variant="h6"
                      component="h3"
                      fontWeight="700"
                      sx={{ mb: 1, fontSize: '1.1rem' }}
                    >
                      {feature.title}
                    </Typography>

                    <Typography
                      variant="body2"
                      sx={{
                        color: 'text.secondary',
                        lineHeight: 1.6,
                        fontSize: '0.95rem',
                      }}
                    >
                      {feature.description}
                    </Typography>
                  </Box>
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
import React from 'react';
import { Box, Container, Paper, Typography, useTheme } from '@mui/material';
import EmojiNatureIcon from '@mui/icons-material/EmojiNature';
import VisibilityIcon from '@mui/icons-material/Visibility';
import TrackChangesIcon from '@mui/icons-material/TrackChanges';
import { SectionHeader, StatCard } from '../../../components/shared';
import { alpha } from '@mui/material/styles';

const MissionVisionSection = () => {
  const theme = useTheme();
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
          background: `radial-gradient(circle at 20% 50%, ${alpha(theme.palette.primary.dark, 0.1)} 0%, transparent 50%), radial-gradient(circle at 80% 80%, ${alpha(theme.palette.primary.light, 0.08)} 0%, transparent 50%)`,
          pointerEvents: 'none',
        },
      })}
    >
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        {/* Header Section */}
        <Box className="fade-in" sx={{ mb: { xs: 6, md: 8 } }}>
          <SectionHeader
            title="Nuestra Misión y Visión"
            subtitle="Comprometidos con la excelencia ambiental y el desarrollo sostenible"
            icon={<TrackChangesIcon sx={{ fontSize: { xs: 32, md: 40 } }} />}
            dividerColor="#66bb6a"
          />
        </Box>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: { xs: 5, md: 7 } }}>
          {/* Stats Row */}
          <Box
            className="slide-up-delay-1"
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', sm: 'repeat(3, 1fr)' },
              gap: { xs: 2.5, md: 3 },
            }}
          >
            <StatCard
              value="100%"
              label="Compromiso Ambiental"
              sx={(theme) => ({
                background: `linear-gradient(135deg, ${alpha(theme.palette.primary.dark, 0.15)} 0%, ${alpha(theme.palette.primary.dark, 0.1)} 100%)`,
                border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
                backdropFilter: 'blur(10px)',
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-6px) scale(1.02)',
                  boxShadow: `0 12px 32px ${alpha(theme.palette.primary.main, 0.2)}`,
                },
              })}
            />
            <StatCard
              value="Sostenible"
              label="Desarrollo Regional"
              sx={(theme) => ({
                background: `linear-gradient(135deg, ${alpha(theme.palette.primary.dark, 0.15)} 0%, ${alpha(theme.palette.primary.dark, 0.1)} 100%)`,
                border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
                backdropFilter: 'blur(10px)',
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-6px) scale(1.02)',
                  boxShadow: `0 12px 32px ${alpha(theme.palette.primary.main, 0.2)}`,
                },
              })}
            />
            <StatCard
              value="Líder"
              label="Red Universitaria"
              sx={(theme) => ({
                background: `linear-gradient(135deg, ${alpha(theme.palette.primary.dark, 0.15)} 0%, ${alpha(theme.palette.primary.dark, 0.1)} 100%)`,
                border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
                backdropFilter: 'blur(10px)',
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-6px) scale(1.02)',
                  boxShadow: `0 12px 32px ${alpha(theme.palette.primary.main, 0.2)}`,
                },
              })}
            />
          </Box>

          {/* Mission & Vision Row */}
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
              gap: { xs: 3, md: 4 },
              alignItems: 'stretch',
            }}
          >
            {/* Mission Card */}
            <Box className="slide-in-left" sx={{ height: '100%' }}>
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
                  <EmojiNatureIcon sx={{ fontSize: { xs: 40, md: 50 }, color: '#fff' }} />
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
                  Misión
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
                  Impulsar la educación ambiental en el ámbito universitario, promoviendo proyectos y acciones que contribuyan al desarrollo sostenible de la región.
                </Typography>
              </Paper>
            </Box>

            {/* Vision Card */}
            <Box className="slide-in-right" sx={{ height: '100%' }}>
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
                  <VisibilityIcon sx={{ fontSize: { xs: 40, md: 50 }, color: '#fff' }} />
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
                  Visión
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
                  Ser la red universitaria líder en sostenibilidad de Loja, inspirando un cambio positivo hacia una sociedad más ecológica, consciente y responsable.
                </Typography>
              </Paper>
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default MissionVisionSection;
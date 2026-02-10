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
        background: theme.palette.mode === 'dark'
          ? `linear-gradient(180deg, ${theme.palette.background.paper} 0%, ${theme.palette.background.default} 100%)`
          : `linear-gradient(180deg, #F9FAFB 0%, #F3F4F6 100%)`,
        py: { xs: 10, md: 14 },
        px: 2,
        position: 'relative',
        overflow: 'hidden',
      })}
    >
      <Container maxWidth="xl" sx={{ px: { xs: 2, md: 4 } }}>
        {/* Header Section */}
        <Box className="fade-in" sx={{ mb: { xs: 6, md: 8 }, textAlign: 'center' }}>
          <SectionHeader
            title="Nuestra Misión y Visión"
            subtitle="El norte que guía nuestros esfuerzos hacia un campus y una ciudad más sostenible"
            icon={<TrackChangesIcon sx={{ fontSize: { xs: 32, md: 40 } }} />}
            dividerColor="#66bb6a"
          />
        </Box>


        {/* Split Layout: Mission & Vision */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
            borderRadius: 8,
            overflow: 'hidden',
            boxShadow: theme.palette.mode === 'dark'
              ? '0 20px 40px rgba(0,0,0,0.2)'
              : '0 20px 40px rgba(0,0,0,0.1)',
          }}
        >
          {/* Left: Mission (Light/Soft) */}
          <Box
            className="slide-in-left"
            sx={{
              p: { xs: 4, md: 8 },
              background: theme.palette.mode === 'dark'
                ? alpha(theme.palette.background.paper, 0.6)
                : '#fff',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              position: 'relative',
            }}
          >
            <Box sx={{
              width: 60,
              height: 60,
              borderRadius: '50%',
              bgcolor: alpha(theme.palette.primary.main, 0.1),
              color: theme.palette.primary.main,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              mb: 3
            }}>
              <EmojiNatureIcon fontSize="large" />
            </Box>
            <Typography variant="h3" component="h3" fontWeight="800" gutterBottom sx={{ color: 'text.primary' }}>
              Misión
            </Typography>
            <Typography variant="body1" sx={{ fontSize: '1.1rem', lineHeight: 1.8, color: 'text.secondary' }}>
              Impulsar la educación ambiental universitaria mediante la colaboración interinstitucional, fomentando proyectos prácticos que generen impacto real en la sostenibilidad de Loja.
            </Typography>
          </Box>

          {/* Right: Vision (Accent/Dark) */}
          <Box
            className="slide-in-right"
            sx={{
              p: { xs: 4, md: 8 },
              background: `linear-gradient(135deg, ${theme.palette.primary.dark} 0%, ${theme.palette.primary.main} 100%)`,
              color: '#fff',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              position: 'relative',
              '&::before': {
                content: '""',
                position: 'absolute',
                top: 0, left: 0, right: 0, bottom: 0,
                backgroundImage: 'radial-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px)',
                backgroundSize: '20px 20px',
                opacity: 0.2,
              }
            }}
          >
            <Box sx={{
              width: 60,
              height: 60,
              borderRadius: '50%',
              bgcolor: 'rgba(255,255,255,0.2)',
              color: '#fff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              mb: 3,
              backdropFilter: 'blur(10px)'
            }}>
              <VisibilityIcon fontSize="large" />
            </Box>
            <Typography variant="h3" component="h3" fontWeight="800" gutterBottom sx={{ color: '#fff' }}>
              Visión
            </Typography>
            <Typography variant="body1" sx={{ fontSize: '1.1rem', lineHeight: 1.8, color: alpha('#fff', 0.9) }}>
              Ser la red de referencia en Ecuador donde la academia y la comunidad se unen para liderar la innovación ecológica y crear ciudades resilientes y conscientes.
            </Typography>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default MissionVisionSection;
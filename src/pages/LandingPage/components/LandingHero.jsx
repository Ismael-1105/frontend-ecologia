import React from 'react';
import { Box, Container, Typography, Button, alpha, useTheme } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import SchoolIcon from '@mui/icons-material/School';
import { useNavigate } from 'react-router-dom';

const LandingHero = () => {
    const theme = useTheme();
    const navigate = useNavigate();

    return (
        <Box
            sx={{
                position: 'relative',
                height: { xs: '70vh', md: '80vh' },
                minHeight: '775px',
                display: 'flex',
                alignItems: 'center',
                overflow: 'hidden',
                // Dynamic background with image and gradient overlay
                backgroundImage: `linear-gradient(135deg, ${alpha(theme.palette.primary.dark, 0.9)} 0%, ${alpha(theme.palette.primary.main, 0.8)} 100%), url('/Fondo.jpg')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundAttachment: 'fixed',
                color: '#fff',
            }}
        >
            {/* Decorative Elements */}
            <Box
                sx={{
                    position: 'absolute',
                    top: -100,
                    right: -100,
                    width: 400,
                    height: 400,
                    borderRadius: '50%',
                    background: `radial-gradient(circle, ${alpha(theme.palette.secondary.main, 0.4)} 0%, transparent 70%)`,
                    filter: 'blur(60px)',
                    animation: 'pulse 15s infinite ease-in-out',
                }}
            />

            <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
                <Box sx={{ maxWidth: 800 }}>

                    <Typography
                        variant="h1"
                        className="slide-up"
                        sx={{
                            fontSize: { xs: '2.5rem', md: '4.5rem' },
                            fontWeight: 800,
                            lineHeight: 1.1,
                            mb: 3,
                            textShadow: '0 4px 20px rgba(0,0,0,0.3)',
                        }}
                    >
                        Impulsando la <Box component="span" sx={{ color: theme.palette.secondary.light }}>Conciencia Ambiental</Box> desde las Aulas
                    </Typography>

                    <Typography
                        variant="h5"
                        className="slide-up-delay-1"
                        sx={{
                            fontSize: { xs: '1.1rem', md: '1.4rem' },
                            fontWeight: 300,
                            lineHeight: 1.6,
                            mb: 5,
                            opacity: 0.9,
                            maxWidth: 600,
                        }}
                    >
                        Únete a EcoLearn Loja, la plataforma donde estudiantes y docentes colaboran para crear un futuro más sostenible en nuestra región.
                    </Typography>

                    <Box
                        className="slide-up-delay-2"
                        sx={{
                            display: 'flex',
                            flexDirection: { xs: 'column', sm: 'row' },
                            gap: 2
                        }}
                    >
                        <Button
                            variant="contained"
                            size="large"
                            onClick={() => navigate('/login')}
                            endIcon={<ArrowForwardIcon />}
                            sx={{
                                py: 1.8,
                                px: 4,
                                borderRadius: 50,
                                fontSize: '1.1rem',
                                fontWeight: 700,
                                bgcolor: 'white',
                                color: 'primary.main',
                                '&:hover': {
                                    bgcolor: alpha('#fff', 0.9),
                                    transform: 'translateY(-2px)',
                                },
                                transition: 'all 0.3s ease',
                            }}
                        >
                            Comenzar Ahora
                        </Button>

                        <Button
                            variant="outlined"
                            size="large"
                            href="#about"
                            sx={{
                                py: 1.8,
                                px: 4,
                                borderRadius: 50,
                                fontSize: '1.1rem',
                                fontWeight: 600,
                                color: 'white',
                                borderColor: 'white',
                                borderWidth: 2,
                                '&:hover': {
                                    borderWidth: 2,
                                    bgcolor: 'rgba(255,255,255,0.1)',
                                    borderColor: 'white',
                                },
                            }}
                        >
                            Conocer Más
                        </Button>
                    </Box>
                </Box>
            </Container>

            {/* Scroll Down Indicator */}
            <Box
                sx={{
                    position: 'absolute',
                    bottom: 40,
                    left: '50%',
                    transform: 'translateX(-50%)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: 1,
                    opacity: 0.8,
                    animation: 'bounce 2s infinite',
                }}
            >
                <Typography variant="caption" sx={{ letterSpacing: 2 }}>SCROLL</Typography>
                <Box
                    sx={{
                        width: 20,
                        height: 35,
                        borderRadius: 10,
                        border: '2px solid white',
                        position: 'relative',
                        '&::after': {
                            content: '""',
                            position: 'absolute',
                            top: 5,
                            left: '50%',
                            transform: 'translateX(-50%)',
                            width: 4,
                            height: 4,
                            borderRadius: '50%',
                            bgcolor: 'white',
                            animation: 'scrollDown 1.5s infinite',
                        }
                    }}
                />
            </Box>

            {/* Keyframe Animations via Global CSS or integrated here if needed, 
          assuming global 'fade-in' etc classes exist based on previous files.
          Adding small style block just in case for specific animations */}
            <style>
                {`
          @keyframes scrollDown {
            0% { top: 5px; opacity: 1; }
            100% { top: 20px; opacity: 0; }
          }
        `}
            </style>
        </Box>
    );
};

export default LandingHero;

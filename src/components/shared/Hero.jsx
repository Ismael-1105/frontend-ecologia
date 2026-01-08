import React from 'react';
import { Box, Container, Typography, Button, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { PlayCircleOutline, VideoLibrary } from '@mui/icons-material';

/**
 * Hero Component
 * Landing page hero section
 */
const Hero = () => {
    const navigate = useNavigate();

    return (
        <Box
            sx={{
                minHeight: '80vh',
                display: 'flex',
                alignItems: 'center',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: 'white',
                py: 8,
            }}
        >
            <Container maxWidth="lg">
                <Grid container spacing={4} alignItems="center">
                    <Grid item xs={12} md={6}>
                        <Typography
                            variant="h2"
                            component="h1"
                            gutterBottom
                            sx={{
                                fontWeight: 800,
                                fontSize: { xs: '2.5rem', md: '3.5rem' },
                            }}
                        >
                            EcoLearn Loja
                        </Typography>
                        <Typography
                            variant="h5"
                            paragraph
                            sx={{
                                mb: 4,
                                opacity: 0.95,
                                fontSize: { xs: '1.1rem', md: '1.5rem' },
                            }}
                        >
                            Plataforma educativa de videos sobre ecología y medio ambiente
                        </Typography>
                        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                            <Button
                                variant="contained"
                                size="large"
                                startIcon={<VideoLibrary />}
                                onClick={() => navigate('/videos')}
                                sx={{
                                    bgcolor: 'white',
                                    color: 'primary.main',
                                    fontWeight: 600,
                                    px: 4,
                                    py: 1.5,
                                    '&:hover': {
                                        bgcolor: 'grey.100',
                                        transform: 'translateY(-2px)',
                                        boxShadow: 4,
                                    },
                                    transition: 'all 0.3s ease',
                                }}
                            >
                                Explorar Videos
                            </Button>
                            <Button
                                variant="outlined"
                                size="large"
                                startIcon={<PlayCircleOutline />}
                                onClick={() => navigate('/login')}
                                sx={{
                                    borderColor: 'white',
                                    color: 'white',
                                    fontWeight: 600,
                                    px: 4,
                                    py: 1.5,
                                    '&:hover': {
                                        borderColor: 'white',
                                        bgcolor: 'rgba(255, 255, 255, 0.1)',
                                        transform: 'translateY(-2px)',
                                    },
                                    transition: 'all 0.3s ease',
                                }}
                            >
                                Comenzar Ahora
                            </Button>
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}
                        >
                            <VideoLibrary
                                sx={{
                                    fontSize: { xs: 200, md: 300 },
                                    opacity: 0.2,
                                }}
                            />
                        </Box>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
};

export default Hero;

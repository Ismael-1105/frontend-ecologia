import React, { useState } from 'react';
import {
  Typography,
  Box,
  Container,
  Grid,
  Link,
  Paper,
  IconButton,
} from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';
import { alpha } from '@mui/material/styles';

const ContactSection = () => {
  // eslint-disable-next-line no-unused-vars
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    interes: '',
    mensaje: ''
  });

  // eslint-disable-next-line no-unused-vars
  const [openSnackbar, setOpenSnackbar] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [errors, setErrors] = useState({});

  const contactInfo = [
    {
      icon: EmailIcon,
      title: 'Correo Electrónico',
      content: 'esgonzalezca.edu.ec',
      link: 'mailto:contacto@ecolearnloja.edu.ec',
    },
    {
      icon: PhoneIcon,
      title: 'Teléfono',
      content: '+593 07 123 4567',
      link: 'tel:+593071234567',
    },
    {
      icon: LocationOnIcon,
      title: 'Ubicación',
      content: 'Loja, Ecuador',
      link: null,
    },
  ];

  const socialLinks = [
    {
      icon: FacebookIcon,
      name: 'Facebook',
      link: 'https://facebook.com/ecolearnloja',
      color: '#1877F2',
    },
    {
      icon: InstagramIcon,
      name: 'Instagram',
      link: 'https://instagram.com/ecolearnloja',
      color: '#E4405F',
    },
    {
      icon: LinkedInIcon,
      name: 'LinkedIn',
      link: 'https://linkedin.com/company/ecolearnloja',
      color: '#0A66C2',
    },
  ];

  // eslint-disable-next-line no-unused-vars
  const interestOptions = [
    'Voluntariado Ambiental',
    'Proyectos de Investigación',
    'Talleres Educativos',
    'Reforestación',
    'Gestión de Residuos',
    'Educación Comunitaria',
    'Otro'
  ];

  // eslint-disable-next-line no-unused-vars
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Limpiar error del campo cuando el usuario empieza a escribir
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.nombre.trim()) {
      newErrors.nombre = 'El nombre es requerido';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'El email es requerido';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email inválido';
    }

    if (!formData.telefono.trim()) {
      newErrors.telefono = 'El teléfono es requerido';
    }

    if (!formData.interes) {
      newErrors.interes = 'Seleccione un área de interés';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // eslint-disable-next-line no-unused-vars
  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      // Aquí iría la lógica para enviar el formulario
      console.log('Formulario enviado:', formData);
      setOpenSnackbar(true);

      // Limpiar formulario
      setFormData({
        nombre: '',
        email: '',
        telefono: '',
        interes: '',
        mensaje: ''
      });
    }
  };

  return (
    <Box
      component="section"
      sx={(theme) => ({
        background: theme.palette.mode === 'dark'
          ? 'linear-gradient(180deg, #0f172a 0%, #1e293b 100%)'
          : 'linear-gradient(180deg, #f8fafc 0%, #e2e8f0 100%)',
        py: { xs: 8, md: 12 },
        px: 2,
        position: 'relative',
        overflow: 'hidden',
      })}
    >
      {/* Decorative background */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          opacity: 0.03,
          backgroundImage: 'radial-gradient(circle, currentColor 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        {/* Header */}
        <Box sx={{ textAlign: 'center', mb: { xs: 6, md: 8 } }}>
          <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
            <Box
              sx={(theme) => ({
                p: 2,
                borderRadius: '50%',
                background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
                display: 'inline-flex',
                boxShadow: `0 8px 24px ${alpha(theme.palette.primary.main, 0.3)}`,
              })}
            >
              <VolunteerActivismIcon sx={{ fontSize: 40, color: 'white' }} />
            </Box>
          </Box>

          <Typography
            variant="h3"
            component="h2"
            sx={{
              fontWeight: 800,
              mb: 2,
              fontSize: { xs: '2rem', md: '2.75rem' },
            }}
          >
            Nuestros Contactos
          </Typography>
        </Box>

        <Grid container spacing={4}>


          {/* Información de Contacto */}
          <Grid item xs={12} lg={5}>
            <Grid container spacing={3}>
              {/* Contact Info Cards */}
              {contactInfo.map((item, index) => {
                const IconComponent = item.icon;
                return (
                  <Grid item xs={12} key={index}>
                    <Paper
                      elevation={0}
                      sx={(theme) => ({
                        p: 3,
                        borderRadius: 3,
                        background: theme.palette.mode === 'dark'
                          ? alpha('#1e293b', 0.6)
                          : alpha('#ffffff', 0.9),
                        backdropFilter: 'blur(10px)',
                        border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                        display: 'flex',
                        alignItems: 'center',
                        gap: 2,
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          transform: 'translateX(8px)',
                          boxShadow: `0 8px 24px ${alpha(theme.palette.primary.main, 0.12)}`,
                          border: `1px solid ${alpha(theme.palette.primary.main, 0.3)}`,
                        },
                      })}
                    >
                      <Box
                        sx={(theme) => ({
                          width: 56,
                          height: 56,
                          borderRadius: 2,
                          background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.light} 100%)`,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0,
                          boxShadow: `0 4px 12px ${alpha(theme.palette.primary.main, 0.3)}`,
                        })}
                      >
                        <IconComponent sx={{ fontSize: 28, color: '#fff' }} />
                      </Box>

                      <Box sx={{ flex: 1, minWidth: 0 }}>
                        <Typography
                          variant="subtitle2"
                          color="text.secondary"
                          sx={{
                            fontWeight: 600,
                            fontSize: '0.8rem',
                            textTransform: 'uppercase',
                            letterSpacing: 0.5,
                            mb: 0.5,
                          }}
                        >
                          {item.title}
                        </Typography>
                        {item.link ? (
                          <Link
                            href={item.link}
                            underline="hover"
                            sx={{
                              fontWeight: 600,
                              fontSize: '1rem',
                              color: 'text.primary',
                              wordBreak: 'break-word',
                              '&:hover': {
                                color: 'primary.main',
                              },
                            }}
                          >
                            {item.content}
                          </Link>
                        ) : (
                          <Typography
                            variant="body1"
                            sx={{
                              fontWeight: 600,
                              color: 'text.primary',
                            }}
                          >
                            {item.content}
                          </Typography>
                        )}
                      </Box>
                    </Paper>
                  </Grid>
                );
              })}

              {/* Social Media */}
              <Grid item xs={12}>
                <Paper
                  elevation={0}
                  sx={(theme) => ({
                    p: 3,
                    borderRadius: 3,
                    background: theme.palette.mode === 'dark'
                      ? alpha('#1e293b', 0.6)
                      : alpha('#ffffff', 0.9),
                    backdropFilter: 'blur(10px)',
                    border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                    textAlign: 'center',
                  })}
                >
                  <Typography
                    variant="subtitle2"
                    color="text.secondary"
                    sx={{
                      fontWeight: 600,
                      fontSize: '0.8rem',
                      textTransform: 'uppercase',
                      letterSpacing: 0.5,
                      mb: 2,
                    }}
                  >
                    Síguenos en Redes Sociales
                  </Typography>

                  <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
                    {socialLinks.map((social, index) => {
                      const IconComponent = social.icon;
                      return (
                        <IconButton
                          key={index}
                          component="a"
                          href={social.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          sx={{
                            width: 48,
                            height: 48,
                            background: `linear-gradient(135deg, ${social.color} 0%, ${alpha(social.color, 0.8)} 100%)`,
                            color: '#fff',
                            transition: 'all 0.3s ease',
                            '&:hover': {
                              transform: 'translateY(-4px) scale(1.1)',
                              boxShadow: `0 8px 20px ${alpha(social.color, 0.4)}`,
                            },
                          }}
                          aria-label={social.name}
                        >
                          <IconComponent sx={{ fontSize: 24 }} />
                        </IconButton>
                      );
                    })}
                  </Box>
                </Paper>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default ContactSection;
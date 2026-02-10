import React from 'react';
import {
  Typography,
  Box,
  Container,
  Grid,
  Link,
  Paper,
  IconButton,
  useTheme
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
  const theme = useTheme();

  const contactInfo = [
    {
      icon: EmailIcon,
      title: 'Correo Electrónico',
      content: 'contacto@ecolearnloja.edu.ec',
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

  return (
    <Box
      component="footer"
      sx={{
        background: theme.palette.mode === 'dark'
          ? `linear-gradient(180deg, ${theme.palette.background.paper} 0%, ${theme.palette.background.default} 100%)`
          : `linear-gradient(180deg, #F9FAFB 0%, #F3F4F6 100%)`,
        color: '#fff',
        py: 6,
        px: 2,
        mt: 'auto',
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4} justifyContent="space-between" alignItems="flex-start">

          {/* Brand & Description */}
          <Grid item xs={12} md={4}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
              <VolunteerActivismIcon sx={{ fontSize: 28, color: theme.palette.primary.main }} />
              <Typography variant="h6" fontWeight="700" sx={{ color: 'text.primary' }}>
                EcoLearn
              </Typography>
            </Box>
            <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.6, maxWidth: 300 }}>
              Construyendo un futuro sostenible a través de la educación, la innovación y la colaboración comunitaria en Loja.
            </Typography>
          </Grid>

          {/* Contact Info - Compact List */}
          <Grid item xs={12} md={4}>
            <Typography variant="subtitle1" fontWeight="700" sx={{ mb: 2, color: 'text.primary' }}>
              Contacto
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {contactInfo.map((item, index) => {
                const IconComponent = item.icon;
                return (
                  <Box key={index} sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                    <IconComponent sx={{ fontSize: 20, color: theme.palette.primary.main }} />
                    {item.link ? (
                      <Link
                        href={item.link}
                        underline="hover"
                        sx={{ color: 'text.secondary', fontSize: '0.9rem', '&:hover': { color: 'primary.main' } }}
                      >
                        {item.content}
                      </Link>
                    ) : (
                      <Typography variant="body2" sx={{ color: 'text.secondary', fontSize: '0.9rem' }}>
                        {item.content}
                      </Typography>
                    )}
                  </Box>
                );
              })}
            </Box>
          </Grid>

          {/* Social Links */}
          <Grid item xs={12} md={3}>
            <Typography variant="subtitle1" fontWeight="700" sx={{ mb: 2, color: 'text.primary' }}>
              Síguenos
            </Typography>
            <Box sx={{ display: 'flex', gap: 1.5 }}>
              {socialLinks.map((social, index) => (
                <IconButton
                  key={index}
                  component="a"
                  href={social.link}
                  target="_blank"
                  size="small"
                  sx={{
                    bgcolor: alpha(theme.palette.text.primary, 0.05),
                    color: 'text.secondary',
                    transition: 'all 0.2s',
                    '&:hover': {
                      bgcolor: social.color,
                      color: '#fff',
                      transform: 'translateY(-3px)'
                    }
                  }}
                >
                  <social.icon fontSize="small" />
                </IconButton>
              ))}
            </Box>
            <Typography variant="caption" sx={{ display: 'block', mt: 3, color: 'text.disabled' }}>
              © {new Date().getFullYear()} EcoLearn Loja.
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default ContactSection;
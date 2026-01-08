import React, { useState } from 'react';
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Alert,
  CircularProgress,
  Link,
  IconButton,
} from '@mui/material';
import { useNavigate, Link as RouterLink, useLocation } from 'react-router-dom';
import { useAuth } from '../../core/context/AuthContext';
import { GlassCard } from '../../components/shared';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const LoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError(''); // Limpiar error al escribir
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setLoading(true);

    try {
      const result = await login(formData.email, formData.password);

      if (result.success) {
        // Redirect to intended page or dashboard
        const from = location.state?.from?.pathname || '/portal/dashboard';
        navigate(from, { replace: true });
      } else {
        setError(result.error || 'Error al iniciar sesión. Por favor, intenta nuevamente.');
      }
    } catch (err) {
      setError(err.message || 'Error al iniciar sesión. Por favor, intenta nuevamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="xs" sx={{ height: 'calc(100vh - 64px)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <GlassCard
        className="scale-in"
        sx={{
          p: 4,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          width: '100%',
          position: 'relative',
        }}
      >
        {/* Botón de regreso */}
        <IconButton
          onClick={() => navigate('/')}
          sx={{
            position: 'absolute',
            top: 16,
            left: 16,
            color: 'primary.main',
            '&:hover': {
              backgroundColor: 'rgba(255, 215, 0, 0.1)',
              transform: 'translateX(-4px)',
            },
            transition: 'all 0.3s ease',
          }}
          aria-label="Volver al inicio"
        >
          <ArrowBackIcon />
        </IconButton>

        <Typography component="h1" variant="h5" sx={{ mb: 3, color: 'primary.main' }}>
          Iniciar Sesión
        </Typography>

        {error && (
          <Alert severity="error" sx={{ width: '100%', mb: 2 }}>
            {error}
          </Alert>
        )}

        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1, width: '100%' }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Correo Electrónico"
            name="email"
            type="email"
            autoComplete="email"
            autoFocus
            variant="filled"
            value={formData.email}
            onChange={handleChange}
            disabled={loading}
            sx={{ input: { color: 'white' }, label: { color: '#b0b0b0' } }}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Contraseña"
            type="password"
            id="password"
            autoComplete="current-password"
            variant="filled"
            value={formData.password}
            onChange={handleChange}
            disabled={loading}
            sx={{ input: { color: 'white' }, label: { color: '#b0b0b0' } }}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            disabled={loading}
            sx={{
              mt: 3,
              mb: 2,
              '&:hover': {
                boxShadow: '0 0 15px 5px rgba(255, 215, 0, 0.7)',
              },
            }}
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : 'Entrar'}
          </Button>

          <Box sx={{ textAlign: 'center', mt: 2 }}>
            <Typography variant="body2" sx={{ color: '#b0b0b0' }}>
              ¿No tienes una cuenta?{' '}
              <Link component={RouterLink} to="/register" sx={{ color: 'primary.main', textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>
                Regístrate aquí
              </Link>
            </Typography>
          </Box>
        </Box>
      </GlassCard>
    </Container>
  );
};

export default LoginPage;
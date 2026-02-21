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
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  IconButton,
  useTheme,
} from '@mui/material';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { useAuth } from '../../core/context/AuthContext';
import { GlassCard } from '../../components/shared';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const RegisterPage = () => {
  const navigate = useNavigate();
  const { register } = useAuth();
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    institution: '',
    role: 'Estudiante',
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

  const validateForm = () => {
    if (!formData.name || !formData.email || !formData.password) {
      setError('Por favor, completa todos los campos requeridos.');
      return false;
    }

    if (formData.password.length < 8) {
      setError('La contraseña debe tener al menos 8 caracteres.');
      return false;
    }

    // Validar complejidad de la contraseña
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/;
    if (!passwordRegex.test(formData.password)) {
      setError('La contraseña debe contener al menos una mayúscula, una minúscula, un número y un carácter especial (@$!%*?&).');
      return false;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Las contraseñas no coinciden.');
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError('Por favor, ingresa un email válido.');
      return false;
    }

    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      const { confirmPassword, ...registerData } = formData;
      // Si institution está vacío, no lo enviamos
      if (!registerData.institution) {
        delete registerData.institution;
      }

      const result = await register(registerData);

      if (result.success) {
        // Redirect to dashboard after successful registration
        navigate('/portal/dashboard', { replace: true });
      } else {
        setError(result.error || 'Error al registrar usuario. Por favor, intenta nuevamente.');
      }
    } catch (err) {
      setError(err.message || 'Error al registrar usuario. Por favor, intenta nuevamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ py: 4, minHeight: 'calc(100vh - 64px)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <GlassCard
        className="scale-in"
        sx={{
          p: 4,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          width: '100%',
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
              backgroundColor: isDark ? 'rgba(255, 215, 0, 0.1)' : 'rgba(65, 171, 93, 0.1)',
              transform: 'translateX(-4px)',
            },
            transition: 'all 0.3s ease',
          }}
          aria-label="Volver al inicio"
        >
          <ArrowBackIcon />
        </IconButton>

        <Typography component="h1" variant="h5" sx={{ mb: 3, color: 'primary.main' }}>
          Crear Cuenta
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
            id="name"
            label="Nombre Completo"
            name="name"
            autoComplete="name"
            autoFocus
            variant="filled"
            value={formData.name}
            onChange={handleChange}
            disabled={loading}
            sx={{ input: { color: 'text.primary' }, label: { color: 'text.secondary' } }}
          />

          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Correo Electrónico"
            name="email"
            type="email"
            autoComplete="email"
            variant="filled"
            value={formData.email}
            onChange={handleChange}
            disabled={loading}
            sx={{ input: { color: 'text.primary' }, label: { color: 'text.secondary' } }}
          />

          <TextField
            margin="normal"
            fullWidth
            id="institution"
            label="Institución (Opcional)"
            name="institution"
            variant="filled"
            value={formData.institution}
            onChange={handleChange}
            disabled={loading}
            sx={{ input: { color: 'text.primary' }, label: { color: 'text.secondary' } }}
          />

          <FormControl fullWidth margin="normal" variant="filled" disabled={loading}>
            <InputLabel id="role-label" sx={{ color: 'text.secondary' }}>Rol</InputLabel>
            <Select
              labelId="role-label"
              name="role"
              value={formData.role}
              onChange={handleChange}
              sx={{
                color: 'text.primary',
                backgroundColor: isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.04)',
                '& .MuiSvgIcon-root': { color: 'text.primary' },
                '&:hover': {
                  backgroundColor: isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.06)',
                },
                '&.Mui-focused': {
                  backgroundColor: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.08)',
                },
              }}
            >
              <MenuItem value="Estudiante">Estudiante</MenuItem>
              <MenuItem value="Docente">Docente</MenuItem>
            </Select>
          </FormControl>

          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Contraseña"
            type="password"
            id="password"
            autoComplete="new-password"
            variant="filled"
            value={formData.password}
            onChange={handleChange}
            disabled={loading}
            helperText="Mínimo 8 caracteres, debe incluir mayúscula, minúscula, número y carácter especial"
            sx={{ input: { color: 'text.primary' }, label: { color: 'text.secondary' }, '& .MuiFormHelperText-root': { color: 'text.secondary' } }}
          />

          <TextField
            margin="normal"
            required
            fullWidth
            name="confirmPassword"
            label="Confirmar Contraseña"
            type="password"
            id="confirmPassword"
            variant="filled"
            value={formData.confirmPassword}
            onChange={handleChange}
            disabled={loading}
            sx={{ input: { color: 'text.primary' }, label: { color: 'text.secondary' } }}
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
                boxShadow: isDark
                  ? '0 0 15px 5px rgba(65, 171, 93, 0.5)'
                  : '0 0 15px 5px rgba(65, 171, 93, 0.35)',
              },
            }}
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : 'Registrarse'}
          </Button>

          <Box sx={{ textAlign: 'center', mt: 2 }}>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              ¿Ya tienes una cuenta?{' '}
              <Link component={RouterLink} to="/login" sx={{ color: 'primary.main', textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>
                Inicia sesión aquí
              </Link>
            </Typography>
          </Box>
        </Box>
      </GlassCard>
    </Container>
  );
};

export default RegisterPage;


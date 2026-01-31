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

} from '@mui/material';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { useAuth } from '../../core/context/AuthContext';
import { GlassCard } from '../../components/shared';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const RegisterPage = () => {
  const navigate = useNavigate();
  const { register } = useAuth();
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
            sx={{ input: { color: 'white' }, label: { color: '#b0b0b0' } }}
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
            sx={{ input: { color: 'white' }, label: { color: '#b0b0b0' } }}
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
            sx={{ input: { color: 'white' }, label: { color: '#b0b0b0' } }}
          />

          <FormControl fullWidth margin="normal" variant="filled" disabled={loading}>
            <InputLabel id="role-label" sx={{ color: '#b0b0b0' }}>Rol</InputLabel>
            <Select
              labelId="role-label"
              name="role"
              value={formData.role}
              onChange={handleChange}
              sx={{
                color: 'white',
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                '& .MuiSvgIcon-root': { color: 'white' },
                '&:before': { borderColor: 'rgba(255, 255, 255, 0.23)' },
                '&:hover:before': { borderColor: 'rgba(255, 255, 255, 0.5)' },
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.08)',
                },
                '&.Mui-focused': {
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                },
              }}
              MenuProps={{
                PaperProps: {
                  sx: {
                    backgroundColor: 'rgba(30, 36, 45, 0.95)',
                    backdropFilter: 'blur(10px)',
                    '& .MuiMenuItem-root': {
                      color: 'white',
                      '&:hover': {
                        backgroundColor: 'rgba(255, 255, 255, 0.1)',
                      },
                      '&.Mui-selected': {
                        backgroundColor: 'rgba(134, 167, 137, 0.3)',
                        '&:hover': {
                          backgroundColor: 'rgba(134, 167, 137, 0.4)',
                        },
                      },
                    },
                  },
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
            sx={{ input: { color: 'white' }, label: { color: '#b0b0b0' }, '& .MuiFormHelperText-root': { color: '#b0b0b0' } }}
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
            {loading ? <CircularProgress size={24} color="inherit" /> : 'Registrarse'}
          </Button>

          <Box sx={{ textAlign: 'center', mt: 2 }}>
            <Typography variant="body2" sx={{ color: '#b0b0b0' }}>
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


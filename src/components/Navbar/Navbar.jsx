import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box, IconButton } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../core/context/AuthContext';
import { useThemeMode } from '../../core/context/ThemeContext';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';

const Navbar = () => {
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useAuth();
  const { mode, toggleTheme } = useThemeMode();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <AppBar
      position="sticky"
      sx={(theme) => ({
        backgroundColor: theme.palette.mode === 'dark'
          ? 'rgba(18, 23, 30, 0.85)'
          : 'rgba(255, 255, 255, 0.85)',
        backdropFilter: 'blur(12px)',
        borderBottom: theme.palette.mode === 'dark'
          ? '1px solid rgba(255, 255, 255, 0.1)'
          : '1px solid rgba(0, 0, 0, 0.08)',
        boxShadow: theme.palette.mode === 'dark'
          ? '0 4px 6px -1px rgba(0, 0, 0, 0.3)'
          : '0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      })}
    >
      <Toolbar sx={{ maxWidth: 1400, mx: 'auto', width: '100%', px: 2 }}>
        <Typography
          variant="h6"
          component={Link}
          to="/"
          sx={(theme) => ({
            flexGrow: 1,
            textDecoration: 'none',
            color: 'primary.main',
            fontWeight: 700,
            transition: 'color 0.2s ease',
            '&:hover': {
              color: 'primary.light',
            }
          })}
        >
          EcoLearn Loja
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          <Button
            component={Link}
            to="/"
            sx={(theme) => ({
              color: theme.palette.mode === 'dark'
                ? 'rgba(255, 255, 255, 0.9)'
                : 'rgba(0, 0, 0, 0.87)',
              fontWeight: 500,
              '&:hover': {
                backgroundColor: theme.palette.mode === 'dark'
                  ? 'rgba(255, 255, 255, 0.08)'
                  : 'rgba(0, 0, 0, 0.04)',
              }
            })}
          >
            Inicio
          </Button>

          <Button
            component={Link}
            to="/#about"
            sx={(theme) => ({
              color: theme.palette.mode === 'dark'
                ? 'rgba(255, 255, 255, 0.9)'
                : 'rgba(0, 0, 0, 0.87)',
              fontWeight: 500,
              '&:hover': {
                backgroundColor: theme.palette.mode === 'dark'
                  ? 'rgba(255, 255, 255, 0.08)'
                  : 'rgba(0, 0, 0, 0.04)',
              }
            })}
          >
            Sobre Nosotros
          </Button>

          {!isAuthenticated ? (
            <>
              <Button
                component={Link}
                to="/login"
                sx={(theme) => ({
                  ml: 1,
                  color: theme.palette.mode === 'dark'
                    ? 'rgba(255, 255, 255, 0.9)'
                    : 'rgba(0, 0, 0, 0.87)',
                  fontWeight: 500,
                  borderRadius: 2,
                  '&:hover': {
                    backgroundColor: theme.palette.mode === 'dark'
                      ? 'rgba(255, 255, 255, 0.08)'
                      : 'rgba(0, 0, 0, 0.04)',
                  }
                })}
              >
                Iniciar Sesión
              </Button>

              <Button
                variant="contained"
                color="primary"
                component={Link}
                to="/register"
                sx={{
                  ml: 1,
                  fontWeight: 600,
                  borderRadius: 2,
                  px: 2.5,
                  boxShadow: 2,
                  '&:hover': {
                    boxShadow: 4,
                  }
                }}
              >
                Registrarse
              </Button>
            </>
          ) : (
            <>
              <Button
                component={Link}
                to="/portal/dashboard"
                sx={(theme) => ({
                  ml: 1,
                  color: theme.palette.mode === 'dark'
                    ? 'rgba(255, 255, 255, 0.9)'
                    : 'rgba(0, 0, 0, 0.87)',
                  fontWeight: 500,
                  borderRadius: 2,
                  '&:hover': {
                    backgroundColor: theme.palette.mode === 'dark'
                      ? 'rgba(255, 255, 255, 0.08)'
                      : 'rgba(0, 0, 0, 0.04)',
                  }
                })}
              >
                Dashboard
              </Button>

              <Button
                variant="contained"
                color="primary"
                onClick={handleLogout}
                sx={{
                  ml: 1,
                  fontWeight: 600,
                  borderRadius: 2,
                  px: 2.5,
                  boxShadow: 2,
                  '&:hover': {
                    boxShadow: 4,
                  }
                }}
              >
                Cerrar Sesión
              </Button>
            </>
          )}

          <IconButton
            aria-label="Cambiar tema"
            onClick={toggleTheme}
            sx={(theme) => ({
              ml: 1,
              color: theme.palette.mode === 'dark'
                ? 'rgba(255, 255, 255, 0.9)'
                : 'rgba(0, 0, 0, 0.87)',
              '&:hover': {
                backgroundColor: theme.palette.mode === 'dark'
                  ? 'rgba(255, 255, 255, 0.08)'
                  : 'rgba(0, 0, 0, 0.04)',
              }
            })}
          >
            {mode === 'dark' ? <LightModeIcon /> : <DarkModeIcon />}
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
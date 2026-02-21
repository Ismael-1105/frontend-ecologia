import { createTheme } from '@mui/material/styles';

const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#41ab5d',
      light: '#6bc17d',
      dark: '#328a48',
    },
    secondary: {
      main: '#5a9e6a',
      light: '#82b88e',
      dark: '#3d7a4c',
    },
    success: {
      main: '#41ab5d',
    },
    info: {
      main: '#0288D1',
    },
    warning: {
      main: '#F9A825',
    },
    error: {
      main: '#D32F2F',
    },
    background: {
      default: '#ffffff',
      paper: '#e6ebf9',
    },
    text: {
      primary: '#1A1A1A',
      secondary: '#5F6368',
    },
    divider: 'rgba(0, 0, 0, 0.08)'
  },
  shape: {
    borderRadius: 12,
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 700,
      fontSize: '3rem',
      letterSpacing: '-0.02em',
    },
    h2: {
      fontWeight: 700,
      fontSize: '2rem',
    },
    h3: {
      fontSize: '1.5rem',
      fontWeight: 600,
    },
    body1: {
      fontSize: '1.0625rem',
      lineHeight: 1.7,
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          overflowY: 'auto',
          transition: 'background-color 0.3s ease, color 0.3s ease',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          textTransform: 'none',
          fontWeight: 600,
          transition: 'all 0.25s ease',
        },
        containedPrimary: {
          boxShadow: '0 6px 16px rgba(65, 171, 93, 0.25)',
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: '0 10px 24px rgba(65, 171, 93, 0.35)',
          },
        },
        outlinedPrimary: {
          borderWidth: 2,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          transition: 'all 0.25s ease',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
          '&:hover': {
            boxShadow: '0 8px 24px rgba(0, 0, 0, 0.12)',
            transform: 'translateY(-4px)',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          transition: 'all 0.25s ease',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backdropFilter: 'blur(8px)',
          borderBottom: '1px solid rgba(0,0,0,0.06)'
        },
      },
    },
  },
});

export default lightTheme;
